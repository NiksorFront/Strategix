import { createError } from 'h3';
import { readStoredToken } from '../../utils/cmsToken';
import {
  allowedContentRoots,
  extractChangedPaths,
  findInvalidPaths,
  runGit,
  uniqueList,
} from '../../utils/git';

const normalizeRemoteUrl = (remote: string) => {
  if (remote.startsWith('git@github.com:')) {
    const path = remote.replace('git@github.com:', '');
    return `https://github.com/${path}`;
  }

  return remote;
};

const attachTokenToUrl = (remote: string, token: string) => {
  const httpsRemote = normalizeRemoteUrl(remote);

  try {
    const url = new URL(httpsRemote);
    url.username = token;
    url.password = '';
    return url.toString();
  } catch {
    return `https://${token}@${httpsRemote.replace(/^https?:\/\//, '')}`;
  }
};

const sanitizeUrl = (url: string) => {
  try {
    const parsed = new URL(url);
    parsed.username = '';
    parsed.password = '';
    return parsed.toString();
  } catch {
    return url.replace(/https?:\/\/[^@]+@/, 'https://');
  }
};

export default defineEventHandler(async () => {
  const token = (await readStoredToken()) || process.env.CMS_GITHUB_TOKEN || '';

  if (!token) {
    throw createError({ statusCode: 401, statusMessage: 'GitHub token is missing' });
  }

  const statusOutput = await runGit(['status', '--porcelain']);
  const changedPaths = extractChangedPaths(statusOutput);

  if (changedPaths.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'Нет изменений для отправки' });
  }

  const invalidPaths = findInvalidPaths(changedPaths);

  if (invalidPaths.length > 0) {
    return {
      ok: false,
      invalidPaths: uniqueList(invalidPaths),
    };
  }

  const targets = allowedContentRoots
    .filter((root) => changedPaths.some((path) => path.startsWith(root)))
    .map((root) => root.replace(/\/$/, ''));

  if (targets.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'Нет разрешённых изменений' });
  }

  await runGit(['add', ...targets]);

  try {
    await runGit(['commit', '-m', `CMS: update content ${new Date().toISOString()}`]);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : '';
    if (message.includes('nothing to commit')) {
      throw createError({ statusCode: 400, statusMessage: 'Нет изменений для коммита' });
    }
    throw error;
  }

  const branch = await runGit(['rev-parse', '--abbrev-ref', 'HEAD']);
  const remote = await runGit(['config', '--get', 'remote.origin.url']);

  if (!remote) {
    throw createError({ statusCode: 500, statusMessage: 'Не удалось определить remote.origin.url' });
  }

  const pushUrlWithToken = attachTokenToUrl(remote, token);
  const sanitizedRemote = sanitizeUrl(pushUrlWithToken);

  await runGit(['push', pushUrlWithToken, branch]);

  return {
    ok: true,
    branch,
    remote: sanitizedRemote,
  };
});

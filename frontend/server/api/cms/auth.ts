import { createError, getMethod, readBody } from 'h3';
import { clearToken, readStoredToken, saveToken } from '../../utils/cmsToken';

type GitHubUserResponse = {
  login?: string;
  name?: string;
  avatar_url?: string;
};

const fetchGitHubUser = async (token: string) => {
  const response = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${token}`,
      'User-Agent': 'strategix-cms',
    },
  });

  if (!response.ok) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid GitHub token',
    });
  }

  const data = (await response.json()) as GitHubUserResponse;

  return {
    login: data.login || '',
    name: data.name || data.login || '',
    avatarUrl: data.avatar_url || '',
  };
};

export default defineEventHandler(async (event) => {
  const method = getMethod(event).toUpperCase();

  if (method === 'GET') {
    const token = await readStoredToken();
    if (!token) {
      return { hasToken: false };
    }

    try {
      const user = await fetchGitHubUser(token);
      return { hasToken: true, user };
    } catch {
      return { hasToken: true };
    }
  }

  if (method === 'POST') {
    const body = await readBody(event);
    const token = typeof body?.token === 'string' ? body.token.trim() : '';

    if (!token) {
      throw createError({ statusCode: 400, statusMessage: 'Token is required' });
    }

    const user = await fetchGitHubUser(token);
    await saveToken(token);

    return { ok: true, hasToken: true, user };
  }

  if (method === 'DELETE') {
    await clearToken();
    return { ok: true, hasToken: false };
  }

  throw createError({
    statusCode: 405,
    statusMessage: 'Method not allowed',
  });
});

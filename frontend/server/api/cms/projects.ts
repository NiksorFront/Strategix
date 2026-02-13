import { existsSync } from 'node:fs';
import { readFile, rename, unlink, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { createError, getMethod, readBody } from 'h3';

type SlugRename = { from?: string; to?: string };

const normalizeSlug = (value: unknown) => (typeof value === 'string' ? value.trim() : '');

const isInvalidSlug = (slug: string) => !slug || slug.includes('/') || slug.includes('\\');

const renameProjectFiles = async (renames: SlugRename[]) => {
  if (!renames.length) return { renamed: [], skipped: [] };

  const baseDir = join(process.cwd(), 'src/content/pages/project');
  const renamed: string[] = [];
  const skipped: string[] = [];
  const tasks: Array<{ from: string; to: string; fromPath: string; toPath: string }> = [];

  for (const entry of renames) {
    const from = normalizeSlug(entry?.from);
    const to = normalizeSlug(entry?.to);

    if (!from || !to || from === to) {
      skipped.push(`${from || '(empty)'}=>${to || '(empty)'}`);
      continue;
    }

    if (isInvalidSlug(from) || isInvalidSlug(to)) {
      skipped.push(`${from}=>${to}`);
      continue;
    }

    const fromPath = join(baseDir, `${from}.json`);
    const toPath = join(baseDir, `${to}.json`);

    if (!existsSync(fromPath)) {
      skipped.push(`${from}=>${to}`);
      continue;
    }

    tasks.push({ from, to, fromPath, toPath });
  }

  for (const task of tasks) {
    if (existsSync(task.toPath)) {
      throw createError({
        statusCode: 409,
        statusMessage: `Файл ${task.to}.json уже существует`,
      });
    }
  }

  for (const task of tasks) {
    try {
      const raw = await readFile(task.fromPath, 'utf-8');
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        parsed.id = task.to;
        await writeFile(task.toPath, JSON.stringify(parsed, null, 4), 'utf-8');
        await unlink(task.fromPath);
        renamed.push(`${task.from}=>${task.to}`);
        continue;
      }
    } catch {
      // fallback to rename below
    }

    await rename(task.fromPath, task.toPath);
    renamed.push(`${task.from}=>${task.to}`);
  }

  return { renamed, skipped };
};

export default defineEventHandler(async (event) => {
  const method = getMethod(event).toUpperCase();

  if (!['PUT', 'PATCH'].includes(method)) {
    return { ok: true, message: 'Use PUT/PATCH with JSON body to overwrite projects.json' };
  }

  const body = await readBody(event);

  if (!body || typeof body !== 'object') {
    throw createError({ statusCode: 400, statusMessage: 'Invalid payload' });
  }

  const renames = Array.isArray((body as any)?.renames) ? (body as any).renames as SlugRename[] : [];
  const payloadSource = (body as any)?.payload && typeof (body as any).payload === 'object'
    ? (body as any).payload
    : body;
  if (!payloadSource || typeof payloadSource !== 'object') {
    throw createError({ statusCode: 400, statusMessage: 'Invalid payload' });
  }

  const payload = { ...(payloadSource as Record<string, unknown>) };
  if ('renames' in payload) {
    delete (payload as Record<string, unknown>).renames;
  }

  const targetPath = join(process.cwd(), 'src/content/pages/projects.json');
  const content = JSON.stringify(payload, null, 4);

  const renameResult = await renameProjectFiles(renames);
  await writeFile(targetPath, content, 'utf-8');

  return { ok: true, path: targetPath, renames: renameResult };
});

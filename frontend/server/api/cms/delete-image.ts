import { createError, defineEventHandler, readBody } from 'h3';
import { unlink } from 'node:fs/promises';
import { basename, join } from 'node:path';

export default defineEventHandler(async (event) => {
  if (event.node.req.method?.toUpperCase() !== 'POST') {
    throw createError({ statusCode: 405, statusMessage: 'Use POST' });
  }

  const body = await readBody<{ src?: string }>(event);
  if (!body?.src || typeof body.src !== 'string') {
    throw createError({ statusCode: 400, statusMessage: 'src is required' });
  }

  if (!body.src.startsWith('/images/')) {
    return { ok: true, skipped: true };
  }

  const publicDir = join(process.cwd(), 'public', 'images');
  const filePath = join(publicDir, basename(body.src));

  await unlink(filePath).catch(() => {});

  return { ok: true };
});

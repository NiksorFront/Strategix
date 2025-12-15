import { createError, defineEventHandler, readMultipartFormData } from 'h3';
import { randomUUID } from 'node:crypto';
import { mkdir, unlink, writeFile } from 'node:fs/promises';
import { basename, extname, join } from 'node:path';

export default defineEventHandler(async (event) => {
  if (event.node.req.method?.toUpperCase() !== 'POST') {
    throw createError({ statusCode: 405, statusMessage: 'Use POST for uploads' });
  }

  const form = await readMultipartFormData(event);
  const file = form?.find((item) => item.name === 'file' && item.filename && item.data);
  if (!file) {
    throw createError({ statusCode: 400, statusMessage: 'File is required' });
  }

  const ext = extname(file.filename || '').toLowerCase() || '.jpg';
  const safeExt = ['.jpg', '.jpeg', '.png', '.webp'].includes(ext) ? ext : '.jpg';
  const filename = `${Date.now()}-${randomUUID()}${safeExt}`;

  const publicDir = join(process.cwd(), 'public', 'images');
  await mkdir(publicDir, { recursive: true });

  const filePath = join(publicDir, filename);
  await writeFile(filePath, file.data);

  const oldSrc = form.find((item) => item.name === 'oldSrc');
  const oldValue = oldSrc?.data?.toString('utf-8') || '';
  if (oldValue && oldValue.startsWith('/images/')) {
    const oldPath = join(publicDir, basename(oldValue));
    await unlink(oldPath).catch(() => {});
  }

  return { ok: true, path: `/images/${filename}` };
});

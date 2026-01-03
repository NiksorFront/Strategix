import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { createError, getMethod, readBody } from 'h3';

type LocaleConfig = { code: string; name: string; iso?: string };

export default defineEventHandler(async (event) => {
  const method = getMethod(event).toUpperCase();
  const targetPath = join(process.cwd(), 'src/content/locales.json');

  if (method === 'GET') {
    const content = await readFile(targetPath, 'utf-8');
    return JSON.parse(content);
  }

  if (!['PUT', 'PATCH'].includes(method)) {
    return { ok: true, message: 'Use GET to read, PUT/PATCH to overwrite locales.json' };
  }

  const body = await readBody(event);

  if (!body || typeof body !== 'object') {
    throw createError({ statusCode: 400, statusMessage: 'Invalid payload' });
  }

  const locales = Array.isArray((body as any).locales) ? (body as any).locales : [];

  const sanitized = locales
    .map((locale: any) => ({
      code: String(locale?.code || '').trim(),
      name: String(locale?.name || '').trim() || String(locale?.code || '').trim(),
      iso: typeof locale?.iso === 'string' ? locale.iso : '',
    }))
    .filter((locale: LocaleConfig) => locale.code);

  const unique: LocaleConfig[] = [];
  const seen = new Set<string>();

  sanitized.forEach((locale) => {
    if (seen.has(locale.code)) return;
    seen.add(locale.code);
    unique.push(locale);
  });

  if (!unique.length) {
    throw createError({ statusCode: 400, statusMessage: 'No locales provided' });
  }

  const requiredCodes = ['ru', 'en'];
  const missingRequired = requiredCodes.filter((code) => !seen.has(code));

  if (missingRequired.length) {
    throw createError({
      statusCode: 400,
      statusMessage: `Отсутствуют обязательные языки: ${missingRequired.join(', ')}`,
    });
  }

  const defaultLocale = typeof (body as any).default === 'string' && (body as any).default
    ? (body as any).default
    : unique[0].code;

  const content = JSON.stringify({ default: defaultLocale, locales: unique }, null, 4);

  await writeFile(targetPath, content, 'utf-8');

  return { ok: true, count: unique.length, path: targetPath };
});

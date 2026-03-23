const normalizeBase = (base: string) => {
  if (!base || base === '/') return '';
  return base.endsWith('/') ? base.slice(0, -1) : base;
};

export const resolveMediaSrc = (src: string | null | undefined, baseURL: string) => {
  const raw = src?.trim() ?? '';
  if (!raw) return '';

  if (/^(https?:)?\/\//i.test(raw) || raw.startsWith('data:') || raw.startsWith('blob:')) {
    return raw;
  }

  const base = normalizeBase(baseURL);
  if (!base) {
    return raw.startsWith('/') ? raw : `/${raw}`;
  }

  if (raw === base || raw.startsWith(`${base}/`)) {
    return raw;
  }

  return raw.startsWith('/') ? `${base}${raw}` : `${base}/${raw}`;
};

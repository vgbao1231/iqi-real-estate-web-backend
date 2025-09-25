export function collectPublicIds(obj: unknown, acc: string[] = []): string[] {
  if (!obj || typeof obj !== 'object') return acc;

  // kiểm tra object có publicId
  if (
    typeof (obj as { publicId?: unknown }).publicId === 'string' &&
    typeof (obj as { url?: unknown }).url === 'string'
  ) {
    acc.push((obj as { publicId: string }).publicId);
  }

  for (const val of Object.values(obj as Record<string, unknown>)) {
    collectPublicIds(val, acc);
  }

  return acc;
}

export function safeParse(value: any): any {
  if (typeof value === 'string') {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }
  return value;
}

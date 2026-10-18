export function externalHref(value?: string): string | undefined {
  if (!value?.trim()) return undefined;
  try {
    const url = new URL(value);
    if (
      !["https:", "http:"].includes(url.protocol) ||
      url.username ||
      url.password
    )
      return undefined;
    return url.href;
  } catch {
    return undefined;
  }
}

export function publicEmail(value?: string): string | undefined {
  const email = value?.trim();
  return email &&
    /^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+$/.test(email) &&
    !/[\r\n?&#]/.test(email)
    ? email
    : undefined;
}

export function resumeHref(value?: string): string | undefined {
  if (
    value?.startsWith("/") &&
    !value.startsWith("//") &&
    !/[\\\r\n]/.test(value)
  )
    return value;
  return externalHref(value);
}

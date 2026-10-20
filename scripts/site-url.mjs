export function normalizeSiteUrl(value) {
  if (!value?.trim()) return undefined
  let url
  try {
    url = new URL(value.trim())
  } catch {
    throw new Error('SITE_URL must be a valid absolute HTTPS URL.')
  }
  if (
    url.protocol !== 'https:' ||
    url.username ||
    url.password ||
    url.search ||
    url.hash ||
    url.pathname !== '/'
  ) {
    throw new Error(
      'SITE_URL must be an HTTPS origin without credentials, a subpath, query, or fragment.',
    )
  }
  return url.origin
}

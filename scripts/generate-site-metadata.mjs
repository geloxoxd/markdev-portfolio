import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { loadEnv } from 'vite'
import { normalizeSiteUrl } from './site-url.mjs'

const env = loadEnv('production', process.cwd(), '')
const origin = normalizeSiteUrl(process.env.SITE_URL || env.SITE_URL)
const html = await readFile('dist/index.html', 'utf8')
const routes = [
  {
    path: '/',
    title: 'Mark Angelo Dela Cruz — Full-Stack Developer',
    description:
      'Mark Angelo Dela Cruz — third-year BSIT student and aspiring full-stack web developer. Explore selected work, skills, and the journey behind the code.',
  },
  {
    path: '/projects/closetiq',
    title: 'ClosetIQ — Mark Angelo Dela Cruz',
    description:
      'ClosetIQ: a full-stack clothing management application with a React interface, session-based accounts, and a PostgreSQL data layer.',
  },
  {
    path: '/projects/markdev-portfolio',
    title: 'MarkDev Portfolio — Mark Angelo Dela Cruz',
    description:
      'An original monochrome developer portfolio built with React, TypeScript, and Vite, with accessible interactions and responsive project case studies.',
  },
]
const escape = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
function setMeta(page, attribute, name, value) {
  const pattern = new RegExp(`<meta[^>]*${attribute}="${name}"[^>]*>`, 'i')
  return page.replace(pattern, `<meta ${attribute}="${name}" content="${escape(value)}" />`)
}
for (const route of routes) {
  let page = html.replace(/<title>[^<]*<\/title>/, `<title>${escape(route.title)}</title>`)
  page = setMeta(page, 'name', 'description', route.description)
  page = setMeta(page, 'property', 'og:title', route.title)
  page = setMeta(page, 'property', 'og:description', route.description)
  if (origin) {
    const absoluteUrl = `${origin}${route.path}`
    page = page
      .replace('content="/social-preview.png"', `content="${origin}/social-preview.png"`)
      .replace(
        '</head>',
        `    <link rel="canonical" href="${absoluteUrl}" />\n    <meta property="og:url" content="${absoluteUrl}" />\n  </head>`,
      )
  }
  const dir = route.path === '/' ? 'dist' : `dist${route.path}`
  await mkdir(dir, { recursive: true })
  await writeFile(`${dir}/index.html`, page)
}
await writeFile(
  'dist/robots.txt',
  `User-agent: *\nAllow: /\n${origin ? `\nSitemap: ${origin}/sitemap.xml\n` : ''}`,
)
if (origin) {
  const locations = routes
    .map(({ path }) => `  <url><loc>${escape(`${origin}${path}`)}</loc></url>`)
    .join('\n')
  await writeFile(
    'dist/sitemap.xml',
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${locations}\n</urlset>\n`,
  )
  console.log('Generated canonical URLs, route metadata, robots.txt, and sitemap.xml.')
} else
  console.log(
    'Generated route metadata and robots.txt. Set SITE_URL before publishing for absolute social URLs, canonical URLs, and sitemap.xml.',
  )

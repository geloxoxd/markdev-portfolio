import { mkdir, writeFile } from 'node:fs/promises'
import sharp from 'sharp'

await mkdir('public/icons', { recursive: true })
const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><rect width="512" height="512" rx="112" fill="#111111"/><path d="M112 352V160h48l96 109 96-109h48v192h-53V244l-91 99-91-99v108z" fill="#efefe8"/><circle cx="400" cy="399" r="15" fill="#92928a"/></svg>`
await writeFile('public/favicon.svg', icon)
for (const [file, size] of [
  ['icon-32.png', 32],
  ['apple-touch-icon.png', 180],
  ['icon-192.png', 192],
  ['icon-512.png', 512],
]) {
  await sharp(Buffer.from(icon)).resize(size, size).png().toFile(`public/icons/${file}`)
}
const grid =
  Array.from({ length: 25 }, (_, index) => `<path d="M${index * 52} 0v630"/>`).join('') +
  Array.from({ length: 13 }, (_, index) => `<path d="M0 ${index * 52}h1200"/>`).join('')
const preview = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#080808"/><g stroke="#ffffff" stroke-opacity=".045">${grid}</g><rect x="64" y="52" width="1072" height="526" rx="8" fill="none" stroke="#33332d"/><text x="104" y="113" fill="#99998e" font-size="19" font-family="Arial,sans-serif" letter-spacing="3">MARK.DEV / PERSONAL PORTFOLIO</text><text x="100" y="271" fill="#f1f1e9" font-family="Arial,sans-serif" font-size="92" font-weight="700" letter-spacing="-5">Mark Angelo</text><text x="100" y="372" fill="#93938a" font-family="Arial,sans-serif" font-size="92" font-weight="700" letter-spacing="-5">Dela Cruz.</text><path d="M104 433h992" stroke="#34342c"/><text x="104" y="490" fill="#d2d2c3" font-size="20" font-family="Arial,sans-serif">FULL-STACK DEVELOPER</text><text x="104" y="526" fill="#8b8b7e" font-size="14" font-family="Arial,sans-serif" letter-spacing="2">THIRD-YEAR BSIT STUDENT / ICCT COLLEGES</text><path d="M1030 304v-55h-55m55 0-90 90" fill="none" stroke="#b3b3a4" stroke-width="4"/></svg>`
await sharp(Buffer.from(preview)).png().toFile('public/social-preview.png')
await writeFile(
  'public/site.webmanifest',
  `${JSON.stringify(
    {
      name: 'Mark Angelo Dela Cruz — Portfolio',
      short_name: 'MarkDev',
      start_url: '/',
      display: 'standalone',
      background_color: '#080808',
      theme_color: '#080808',
      icons: [
        { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
        { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      ],
    },
    null,
    2,
  )}\n`,
)
console.log('Generated original favicon, app icons, and social preview.')

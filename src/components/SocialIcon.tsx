import type { SVGProps } from 'react'

type SocialIconProps = SVGProps<SVGSVGElement> & {
  platform: 'instagram' | 'tiktok' | 'facebook'
  size?: number
}

export default function SocialIcon({ platform, size = 14, ...props }: SocialIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {platform === 'instagram' && (
        <>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.7" fill="currentColor" stroke="none" />
        </>
      )}
      {platform === 'tiktok' && (
        <path d="M14 3h3a5 5 0 0 0 4 4v3a8 8 0 0 1-4-1v7a6 6 0 1 1-7-5.92V14a3 3 0 1 0 4 2.83V3Z" />
      )}
      {platform === 'facebook' && (
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3Z" />
      )}
    </svg>
  )
}

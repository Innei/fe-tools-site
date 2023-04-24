import '../assets/css/globals.css'
import '../assets/css/tw-vars.css'
import { Analytics } from '@vercel/analytics/react'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-Hans">
      <body>{children}</body>

      <Analytics />
    </html>
  )
}

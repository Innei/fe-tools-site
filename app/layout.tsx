import '../assets/css/globals.css'
import '../assets/css/tw-vars.css'
import Providers from './providers'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-Hans">
      <Providers>
        <body>{children}</body>
      </Providers>
    </html>
  )
}

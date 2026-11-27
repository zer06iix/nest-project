import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { AuthProvider } from '@/lib/auth'

export const metadata: Metadata = {
	title: 'روک‌تین | مقایسه قیمت و فروشگاه‌های آنلاین',
	description: 'روک‌تین؛ ساده‌ترین راه برای پیدا کردن بهترین قیمت از معتبرترین فروشگاه‌های ایران.',
	generator: 'v0.app',
	icons: {
		icon: [
			{ url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
			{ url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
			{ url: '/icon.svg', type: 'image/svg+xml' },
		],
		apple: '/apple-icon.png',
	},
}

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 1,
	colorScheme: 'light',
	themeColor: '#a52f47',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html
			lang='fa'
			dir='rtl'
		>
			<body className='antialiased'>
				<AuthProvider>{children}</AuthProvider>
				{process.env.NODE_ENV === 'production' && <Analytics />}
			</body>
		</html>
	)
}

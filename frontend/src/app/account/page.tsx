'use client'
import Link from 'next/link'
import { useAuth } from '@/lib/auth'
import { Header } from '@/components/marketplace'
export default function AccountPage() {
	const { user, application, loading } = useAuth()
	if (loading)
		return (
			<>
				<Header />
				<main className='container section'>در حال بارگذاری...</main>
			</>
		)
	if (!user)
		return (
			<>
				<Header />
				<main className='container section'>
					<h1 className='text-2xl font-black'>برای مشاهده حساب وارد شوید.</h1>
					<Link
						href='/login'
						className='primary-btn mt-5'
					>
						ورود
					</Link>
				</main>
			</>
		)
	return (
		<>
			<Header />
			<main className='container section'>
				<p className='eyebrow'>حساب کاربری</p>
				<h1 className='mt-2 text-3xl font-black'>سلام، {user.fullName}</h1>
				<div className='mt-8 grid gap-4 md:grid-cols-3'>
					<div className='register-card'>
						<b>اطلاعات شخصی</b>
						<p className='mt-4 text-sm leading-8 text-slate-500'>
							شماره موبایل: {user.phone}
							<br />
							ایمیل: {user.email || 'ثبت نشده'}
						</p>
						<button className='secondary-btn mt-4'>ویرایش اطلاعات</button>
					</div>
					<div className='register-card'>
						<b>امنیت حساب</b>
						<p className='mt-4 text-sm leading-8 text-slate-500'>
							رمز عبور خود را مدیریت کنید و حساب امن‌تری داشته باشید.
						</p>
						<button className='secondary-btn mt-4'>تغییر رمز عبور</button>
					</div>
					<div className='register-card'>
						<b>فروشندگی</b>
						{application ? (
							<p className='mt-4 text-sm leading-8 text-amber-700'>
								درخواست فروشندگی شما در حال بررسی است.
							</p>
						) : (
							<>
								<p className='mt-4 text-sm leading-8 text-slate-500'>
									فروشگاه خود را به روک‌تین اضافه کنید.
								</p>
								<Link
									href='/seller/register'
									className='primary-btn mt-4'
								>
									ثبت درخواست فروشندگی
								</Link>
							</>
						)}
					</div>
				</div>
			</main>
		</>
	)
}

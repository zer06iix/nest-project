import Link from 'next/link'
import { ArrowLeft, Check, Sparkles } from 'lucide-react'
import { products, shops } from '@/lib/mock-data'
import {
	CategoryGrid,
	Header,
	ProductCard,
	SectionHeading,
	ShopCard,
	StatsBar,
	TrustBadges,
} from '@/components/marketplace'

export default function Home() {
	return (
		<>
			<Header />
			<main>
				<section className='hero'>
					<div className='container grid items-center gap-10 lg:grid-cols-[1.1fr_.9fr]'>
						<div>
							<p className='eyebrow text-primary-foreground/70'>بازار آنلاین ایران</p>
							<h1>
								فروشگاهی به وسعت <span>ایران</span>
							</h1>
							<p className='hero-lede'>هزاران محصول، صدها فروشگاه، بهترین قیمت در یک جا</p>
							<p className='hero-copy'>
								محصول مورد نظرت رو پیدا کن، قیمت فروشگاه‌های مختلف رو مقایسه کن و با اطمینان بهترین
								انتخاب رو داشته باش.
							</p>
							<div className='flex flex-wrap gap-3'>
								<Link
									href='/search'
									className='hero-btn'
								>
									شروع جستجوی محصولات <ArrowLeft className='size-4' />
								</Link>
								<Link
									href='/register-shop'
									className='hero-btn secondary'
								>
									ثبت فروشگاه
								</Link>
							</div>
						</div>
						<div className='hero-visual'>
							<div className='hero-orb' />
							<div className='floating-card top'>
								<span>بهترین قیمت</span>
								<b>۲۴٬۵۰۰٬۰۰۰ تومان</b>
								<small>در ۱۲ فروشگاه</small>
							</div>
							<div className='floating-card bottom'>
								<span className='check'>
									<Check className='size-4' />
								</span>
								<div>
									<b>انتخاب هوشمندانه</b>
									<small>با روک‌تین مقایسه کن</small>
								</div>
							</div>
						</div>
					</div>
				</section>
				<div className='container -mt-10 relative z-10'>
					<StatsBar />
				</div>
				<section className='container section'>
					<SectionHeading
						eyebrow='پیدا کن، مقایسه کن'
						title='دسته‌بندی‌های محبوب'
					/>
					<CategoryGrid />
				</section>
				<section className='section bg-slate-50'>
					<div className='container'>
						<SectionHeading
							eyebrow='منتخب کاربران'
							title='محصولات پرطرفدار'
							href='/search?sort=popular'
						/>
						<div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
							{products.slice(0, 4).map(p => (
								<ProductCard
									product={p}
									key={p.id}
								/>
							))}
						</div>
					</div>
				</section>
				<section className='container section'>
					<SectionHeading
						eyebrow='اعتماد، انتخاب، خرید'
						title='چرا روک‌تین؟'
					/>
					<TrustBadges />
				</section>
				<section className='container section'>
					<div className='app-banner'>
						<div>
							<p className='eyebrow text-primary-foreground/70'>تجربه بهتر در موبایل</p>
							<h2>همیشه بهترین قیمت‌ها رو پیدا کن!</h2>
							<p>با روک‌تین سریع‌تر محصولات مورد نظرت رو پیدا و مقایسه کن.</p>
						</div>
						<Link
							href='/search'
							className='hero-btn secondary'
						>
							شروع جستجو <ArrowLeft className='size-4' />
						</Link>
						<Sparkles className='app-sparkle' />
					</div>
				</section>
				<section className='section bg-slate-50'>
					<div className='container'>
						<SectionHeading
							eyebrow='فروشنده‌های منتخب'
							title='فروشگاه‌های برتر'
							href='/search'
						/>
						<div className='grid gap-3 md:grid-cols-2 lg:grid-cols-3'>
							{shops.slice(0, 6).map(s => (
								<ShopCard
									shopId={s.id}
									key={s.id}
								/>
							))}
						</div>
					</div>
				</section>
			</main>
			<footer className='site-footer'>
				<div className='container grid gap-8 md:grid-cols-[1.4fr_1fr_1fr]'>
					<div>
						<div className='mb-4'>
							<span className='brand-mark'>ر</span>
						</div>
						<p>روک‌تین، راه ساده‌تر برای مقایسه قیمت و انتخاب بهترین فروشگاه.</p>
					</div>
					<div>
						<b>دسترسی سریع</b>
						<div className='footer-links'>
							<Link href='/search'>جستجوی محصولات</Link>
							<Link href='/register-shop'>ثبت فروشگاه</Link>
							<Link href='/shop/digikala'>فروشگاه‌های برتر</Link>
						</div>
					</div>
					<div>
						<b>راهنما</b>
						<div className='footer-links'>
							<span>درباره روک‌تین</span>
							<span>تماس با ما</span>
							<span>قوانین و حریم خصوصی</span>
						</div>
					</div>
				</div>
				<div className='container footer-bottom'>
					© ۱۴۰۳ روک‌تین · مقایسه کن، هوشمندانه انتخاب کن
				</div>
			</footer>
		</>
	)
}

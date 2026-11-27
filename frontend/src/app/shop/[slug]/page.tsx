import { Header, ProductCard, SectionHeading } from '@/components/marketplace'
import { getShop, products } from '@/lib/mock-data'
import { Check, Star } from 'lucide-react'
export default async function ShopPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	const shop = getShop(slug)
	return (
		<>
			<Header />
			<main className='container section'>
				<div className='shop-hero'>
					<span className='shop-logo large'>{shop.logo}</span>
					<div>
						<div className='flex flex-wrap items-center gap-3'>
							<h1>{shop.name}</h1>
							{shop.verified && (
								<span className='verified'>
									<Check className='size-3' /> تایید شده
								</span>
							)}
						</div>
						<div className='mt-3 flex flex-wrap gap-4 text-sm text-slate-500'>
							<span className='flex items-center gap-1 text-amber-500'>
								<Star className='size-4 fill-current' /> {shop.rating} امتیاز
							</span>
							<span>{shop.products.toLocaleString('fa-IR')} محصول</span>
							<span>عضو از ۱۴۰۱</span>
						</div>
					</div>
					<a
						href='https://example.com'
						className='primary-btn mr-auto hidden sm:inline-flex'
					>
						مشاهده وب‌سایت
					</a>
				</div>
				<p className='my-8 max-w-2xl leading-8 text-slate-500'>
					{shop.description} در این صفحه می‌توانید محصولات این فروشگاه را ببینید و قیمت آن‌ها را با
					دیگر فروشندگان مقایسه کنید.
				</p>
				<SectionHeading
					title='محصولات فروشگاه'
					eyebrow='منتخب کالاها'
				/>
				<div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
					{products.slice(0, 4).map(p => (
						<ProductCard
							product={p}
							key={p.id}
						/>
					))}
				</div>
			</main>
		</>
	)
}

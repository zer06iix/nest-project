export type AdminRole =
	'super_admin' | 'admin' | 'product_manager' | 'seller_manager' | 'support_manager' | 'analyst'
export type EntityKey =
	| 'users'
	| 'sellers'
	| 'shops'
	| 'applications'
	| 'products'
	| 'categories'
	| 'brands'
	| 'offers'
	| 'reviews'
	| 'content'
	| 'admins'
export type AdminRow = {
	id: string
	name: string
	subtitle: string
	status: string
	meta: string
	value: string
}
export const adminRoleLabels: Record<AdminRole, string> = {
	super_admin: 'مدیر ارشد',
	admin: 'مدیر کل',
	product_manager: 'مدیر محصولات',
	seller_manager: 'مدیر فروشندگان',
	support_manager: 'مدیر پشتیبانی',
	analyst: 'تحلیل‌گر',
}
export const adminUser = {
	id: 'admin-1',
	name: 'مدیر سیستم',
	email: 'admin@rookteen.com',
	role: 'super_admin' as AdminRole,
}
export const adminMetrics = [
	{
		label: 'تعداد کاربران',
		value: '۲۳٬۸۴۰',
		change: '+۱۲.۴٪',
		tone: 'blue',
		data: [12, 16, 14, 19, 24, 22, 28],
	},
	{
		label: 'تعداد فروشگاه‌ها',
		value: '۴۸۶',
		change: '+۸.۶٪',
		tone: 'purple',
		data: [8, 12, 10, 16, 14, 20, 25],
	},
	{
		label: 'تعداد محصولات',
		value: '۱۳۷٬۷۷۱',
		change: '+۱۸.۲٪',
		tone: 'orange',
		data: [14, 12, 20, 18, 24, 29, 32],
	},
	{
		label: 'پیشنهادهای فعال',
		value: '۸۹٬۴۲۰',
		change: '+۹.۸٪',
		tone: 'green',
		data: [20, 18, 22, 24, 21, 28, 31],
	},
	{
		label: 'کلیک خروجی',
		value: '۱٬۲۸۴٬۶۶۰',
		change: '+۲۱.۷٪',
		tone: 'red',
		data: [10, 18, 14, 22, 25, 30, 35],
	},
	{
		label: 'فروش ثبت‌شده',
		value: 'داده‌ای موجود نیست',
		change: 'ارجاعی',
		tone: 'slate',
		data: [8, 8, 8, 8, 8, 8, 8],
	},
	{
		label: 'درآمد پلتفرم',
		value: 'داده‌ای موجود نیست',
		change: 'ارجاعی',
		tone: 'slate',
		data: [8, 8, 8, 8, 8, 8, 8],
	},
]
const names = {
	users: [
		'سارا محمدی',
		'علی احمدی',
		'نگار کریمی',
		'محمد رضایی',
		'الهام موسوی',
		'رضا اکبری',
		'ترانه حسینی',
	],
	sellers: ['تکنولایف', 'دیجی‌کالا', 'کالاتیک', 'موبایل ۱۴۰', 'فروشگاه آریا'],
	shops: ['دیجی‌کالا', 'تکنولایف', 'ایمالز', 'کالاتیک', 'موبایل ۱۴۰'],
	applications: ['فروشگاه دیجیتال آریا', 'خانه مدرن', 'پوشاک ترمه', 'گالری نور'],
	products: [
		'Samsung Galaxy A56',
		'Apple iPhone 15 Pro Max',
		'MacBook Air M3',
		'Sony Alpha a6400',
		'Nike Air Max 270',
		'Galaxy Watch 6',
		'AirPods Pro 2',
	],
	categories: ['موبایل و تبلت', 'لپ‌تاپ و کامپیوتر', 'پوشاک', 'خانه و آشپزخانه', 'دوربین و صوتی'],
	brands: ['Samsung', 'Apple', 'Sony', 'Nike', 'Xiaomi'],
	offers: [
		'Galaxy A56 · دیجی‌کالا',
		'iPhone 15 · تکنولایف',
		'MacBook Air · کالاتیک',
		'AirPods Pro · ایمالز',
	],
	reviews: ['نظر درباره Galaxy A56', 'نظر درباره دیجی‌کالا', 'گزارش محتوای نامناسب'],
	content: ['بنر تابستانه', 'محصولات منتخب هفته', 'فروشگاه‌های پیشنهادی'],
	admins: ['آرمان رضایی', 'سحر نادری', 'کیان توکلی'],
}
export function rowsFor(entity: EntityKey): AdminRow[] {
	return (names[entity] || names.products).map((name, i) => ({
		id: `${entity}-${i + 1}`,
		name,
		subtitle:
			entity === 'users'
				? `۰۹۱۲۳۴۵۶۷${i} · ${i % 2 ? 'مشتری' : 'فروشنده'}`
				: entity === 'offers'
					? `قیمت: ${['۲۴٬۵۰۰٬۰۰۰', '۸۵٬۹۰۰٬۰۰۰', '۶۶٬۵۰۰٬۰۰۰'][i % 3]} تومان`
					: `ثبت شده در ۱۴۰۳/۰${i + 1}/۱${i + 1}`,
		status:
			i === 2 ? 'در انتظار بررسی' : i === 4 ? 'تعلیق شده' : i % 3 === 0 ? 'فعال' : 'تأیید شده',
		meta:
			entity === 'products'
				? `${120 + i * 34} پیشنهاد فعال`
				: entity === 'shops'
					? `${840 + i * 320} محصول`
					: 'آخرین فعالیت امروز',
		value:
			entity === 'products'
				? `${24 + i * 9}K بازدید`
				: entity === 'users'
					? `${i + 1}۴ فعالیت`
					: 'مشاهده جزئیات',
	}))
}
export const activity = [
	['کاربر جدید ثبت‌نام کرد', 'سارا محمدی به جمع کاربران روک‌تین پیوست', '۲ دقیقه پیش', 'blue'],
	['درخواست فروشگاه جدید', 'فروشگاه دیجیتال آریا منتظر بررسی است', '۱۸ دقیقه پیش', 'orange'],
	['تغییر قیمت شناسایی شد', 'قیمت Galaxy A56 در ۳ فروشگاه تغییر کرد', '۴۵ دقیقه پیش', 'red'],
	['محصول جدید ثبت شد', 'لپ‌تاپ MacBook Air M3 به کاتالوگ اضافه شد', '۱ ساعت پیش', 'green'],
	['فروشگاه تأیید شد', 'تکنولایف نشان تأیید را دریافت کرد', '۲ ساعت پیش', 'purple'],
] as const
export const chartData = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'].map(
	(day, i) => ({
		day,
		users: 120 + i * 35 + (i % 2) * 28,
		shops: 18 + i * 4,
		clicks: 1800 + i * 450,
		products: 90 + i * 18,
	})
)
export const permissions: Record<AdminRole, EntityKey[]> = {
	super_admin: [
		'users',
		'sellers',
		'shops',
		'applications',
		'products',
		'categories',
		'brands',
		'offers',
		'reviews',
		'content',
		'admins',
	],
	admin: ['users', 'sellers', 'shops', 'applications', 'products', 'offers', 'reviews', 'content'],
	product_manager: ['products', 'categories', 'brands', 'offers'],
	seller_manager: ['sellers', 'shops', 'applications'],
	support_manager: ['users', 'reviews'],
	analyst: [],
}

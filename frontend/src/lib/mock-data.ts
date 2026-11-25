export type Category = { id: string; name: string; icon: string };
export type Shop = {
  id: string;
  name: string;
  logo: string;
  rating: number;
  products: number;
  verified: boolean;
  description: string;
};
export type Offer = {
  shopId: string;
  price: number;
  rating: number;
  warranty: string;
  available: boolean;
};
export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  offers: Offer[];
  specs: [string, string][];
  history: { date: string; price: number }[];
};

const imgs = {
  phone:
    "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=600&q=85",
  laptop:
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=85",
  camera:
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=85",
  shoe: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=85",
  watch:
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=85",
  headphones:
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=85",
};

export const categories: Category[] = [
  { id: "mobile", name: "موبایل و تبلت", icon: "▣" },
  { id: "laptop", name: "لپ‌تاپ و کامپیوتر", icon: "⌘" },
  { id: "home", name: "لوازم خانگی", icon: "⌂" },
  { id: "fashion", name: "پوشاک", icon: "◇" },
  { id: "beauty", name: "آرایشی و بهداشتی", icon: "✦" },
  { id: "sport", name: "ورزش و سفر", icon: "⚑" },
  { id: "camera", name: "دوربین و صوتی", icon: "◉" },
  { id: "kitchen", name: "خانه و آشپزخانه", icon: "▤" },
];

export const shops: Shop[] = [
  {
    id: "digikala",
    name: "دیجی‌کالا",
    logo: "د",
    rating: 4.8,
    products: 4900,
    verified: true,
    description:
      "یکی از بزرگ‌ترین فروشگاه‌های آنلاین ایران با تنوع بالای محصولات.",
  },
  {
    id: "technolife",
    name: "تکنولایف",
    logo: "ت",
    rating: 4.7,
    products: 2100,
    verified: true,
    description: "مرجع تخصصی کالاهای دیجیتال با ارسال سریع.",
  },
  {
    id: "emalls",
    name: "ایمالز",
    logo: "ا",
    rating: 4.5,
    products: 1680,
    verified: true,
    description: "فروشگاه تخصصی لوازم دیجیتال و خانه.",
  },
  {
    id: "mobile140",
    name: "موبایل ۱۴۰",
    logo: "۱۴۰",
    rating: 4.4,
    products: 840,
    verified: false,
    description: "تخصصی‌ترین فروشگاه موبایل و لوازم جانبی.",
  },
  {
    id: "kalatik",
    name: "کالاتیک",
    logo: "ک",
    rating: 4.3,
    products: 1230,
    verified: true,
    description: "فروش آنلاین کالای دیجیتال با تضمین اصالت.",
  },
];

const offerSet = (base: number): Offer[] =>
  shops.map((shop, i) => ({
    shopId: shop.id,
    price: base + i * Math.round(base * (i % 2 ? 0.035 : 0.018)),
    rating: shop.rating - (i > 3 ? 0.2 : 0),
    warranty: i % 3 === 0 ? "۱۸ ماه گارانتی" : "۷ روز مهلت تست",
    available: i !== 4,
  }));
const product = (
  id: string,
  name: string,
  brand: string,
  category: string,
  image: string,
  base: number,
  specs: [string, string][],
): Product => ({
  id,
  name,
  brand,
  category,
  image,
  offers: offerSet(base),
  specs,
  history: ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور"].map(
    (date, i) => ({ date, price: Math.round(base * (1.1 - i * 0.02)) }),
  ),
});

export const products: Product[] = [
  product(
    "a56",
    "گوشی موبایل سامسونگ Galaxy A56 5G",
    "Samsung",
    "mobile",
    imgs.phone,
    24500000,
    [
      ["حافظه داخلی", "۲۵۶ گیگابایت"],
      ["رم", "۸ گیگابایت"],
      ["اندازه نمایشگر", "۶.۷ اینچ"],
      ["شبکه ارتباطی", "5G"],
    ],
  ),
  product(
    "iphone15",
    "گوشی موبایل اپل iPhone 15 Pro Max",
    "Apple",
    "mobile",
    imgs.phone,
    85900000,
    [
      ["حافظه داخلی", "۲۵۶ گیگابایت"],
      ["رم", "۸ گیگابایت"],
      ["دوربین", "۴۸ مگاپیکسل"],
      ["جنس بدنه", "تیتانیوم"],
    ],
  ),
  product(
    "macbook",
    "لپ‌تاپ اپل MacBook Air M3",
    "Apple",
    "laptop",
    imgs.laptop,
    66500000,
    [
      ["پردازنده", "Apple M3"],
      ["رم", "۸ گیگابایت"],
      ["حافظه", "۲۵۶ گیگابایت SSD"],
      ["نمایشگر", "۱۳.۶ اینچ"],
    ],
  ),
  product(
    "sony",
    "دوربین دیجیتال سونی Alpha a6400",
    "Sony",
    "camera",
    imgs.camera,
    48500000,
    [
      ["نوع حسگر", "APS-C"],
      ["رزولوشن", "۲۴ مگاپیکسل"],
      ["فیلم‌برداری", "4K"],
      ["وزن", "۴۰۳ گرم"],
    ],
  ),
  product(
    "nike",
    "کفش ورزشی نایکی Air Max 270",
    "Nike",
    "fashion",
    imgs.shoe,
    8900000,
    [
      ["جنس رویه", "مش"],
      ["سایز", "۳۶ تا ۴۵"],
      ["مناسب برای", "دویدن"],
      ["رنگ", "قرمز و سفید"],
    ],
  ),
  product(
    "watch",
    "ساعت هوشمند سامسونگ Galaxy Watch 6",
    "Samsung",
    "mobile",
    imgs.watch,
    11900000,
    [
      ["صفحه نمایش", "Super AMOLED"],
      ["مقاومت", "ضد آب"],
      ["GPS", "دارد"],
      ["باتری", "۴۰ ساعت"],
    ],
  ),
  product(
    "airpods",
    "هدفون بی‌سیم اپل AirPods Pro 2",
    "Apple",
    "mobile",
    imgs.headphones,
    10900000,
    [
      ["نوع اتصال", "بی‌سیم"],
      ["نویز کنسلینگ", "دارد"],
      ["شارژدهی", "۶ ساعت"],
      ["وزن", "۵.۳ گرم"],
    ],
  ),
];

function firstOrThrow<T>(items: T[], label: string): T {
  const first = items[0];
  if (!first) throw new Error(`${label} data is empty`);
  return first;
}

export const getProduct = (id: string): Product =>
  products.find((p) => p.id === id) ?? firstOrThrow(products, "Product");
export const getShop = (id: string): Shop =>
  shops.find((s) => s.id === id) ?? firstOrThrow(shops, "Shop");
export const toman = (n: number) =>
  new Intl.NumberFormat("fa-IR").format(n) + " تومان";

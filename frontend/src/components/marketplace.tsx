"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  BarChart3,
  ChevronDown,
  CircleUserRound,
  ExternalLink,
  Menu,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Star,
  Store,
  Tag,
  TrendingDown,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  categories,
  getShop,
  products,
  toman,
  type Product,
} from "@/lib/mock-data";
import { useAuth } from "@/lib/auth";

export function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-3 font-black text-slate-950"
    >
      <span className="brand-mark">ر</span>
      <span className="text-lg">روک‌تین</span>
    </Link>
  );
}
export function Header() {
  const [menu, setMenu] = useState(false);
  const { user, application, logout } = useAuth();
  const sellerReady =
    user?.role === "seller" && application?.status === "approved";
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="container flex min-h-20 items-center gap-5 py-3">
        <button
          onClick={() => setMenu(!menu)}
          className="icon-button lg:hidden"
          aria-label="نمایش منو"
        >
          {menu ? <X /> : <Menu />}
        </button>
        <Logo />
        <div className="hidden flex-1 lg:block">
          <SearchBar />
        </div>
        <nav className="mr-auto hidden items-center gap-5 text-sm font-bold text-slate-600 lg:flex">
          <Link href="/search">محصولات</Link>
          <Link href="/shop/digikala">فروشگاه‌ها</Link>
          {sellerReady && (
            <Link href="/seller/dashboard" className="text-primary">
              داشبورد فروشنده
            </Link>
          )}
        </nav>
        {user ? (
          <div className="hidden items-center gap-3 sm:flex">
            <Link
              href={sellerReady ? "/seller/dashboard" : "/account"}
              className="flex items-center gap-2 text-sm font-bold text-slate-600"
            >
              <CircleUserRound className="size-5" /> {user.fullName}
            </Link>
            <button onClick={logout} className="text-xs text-slate-400">
              خروج
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="hidden items-center gap-2 text-sm font-bold text-slate-600 sm:flex"
          >
            <CircleUserRound className="size-5" /> ورود / ثبت‌نام
          </Link>
        )}
      </div>
      {menu && (
        <div className="border-t border-slate-100 bg-white p-4 lg:hidden">
          <SearchBar />
          <div className="mt-4 flex flex-col gap-4 font-bold">
            <Link href="/search">محصولات</Link>
            <Link href="/shop/digikala">فروشگاه‌ها</Link>
            {sellerReady && (
              <Link href="/seller/dashboard">داشبورد فروشنده</Link>
            )}
            {user ? (
              <>
                <Link href="/account">حساب کاربری</Link>
                <button onClick={logout} className="text-right text-red-600">
                  خروج
                </button>
              </>
            ) : (
              <Link href="/login">ورود / ثبت‌نام</Link>
            )}
          </div>
        </div>
      )}
      <div className="hidden border-t border-slate-100 lg:block">
        <div className="container flex h-11 items-center gap-8 text-sm font-bold text-slate-600">
          <Link href="/search" className="flex items-center gap-2">
            <Tag className="size-4 text-primary" /> دسته‌بندی کالاها
          </Link>
          <Link href="/search?sort=popular">محصولات پرفروش</Link>
          <Link href="/shop/digikala">فروشگاه‌های برتر</Link>
          {!user && <Link href="/login">برای فروشنده‌ها</Link>}
          <span className="mr-auto text-xs text-slate-400">
            مقایسه کن، هوشمندانه انتخاب کن
          </span>
        </div>
      </div>
    </header>
  );
}
export function SearchBar() {
  return (
    <form action="/search" className="relative">
      <input
        name="q"
        className="search-input"
        placeholder="نام محصول، برند یا مدل را جستجو کنید"
        aria-label="جستجوی محصول"
      />
      <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
    </form>
  );
}
export function SectionHeading({
  title,
  eyebrow,
  href,
}: {
  title: string;
  eyebrow?: string;
  href?: string;
}) {
  return (
    <div className="mb-6 flex items-end justify-between">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="section-title">{title}</h2>
      </div>
      {href && (
        <Link
          href={href}
          className="flex items-center gap-1 text-sm font-bold text-primary"
        >
          مشاهده همه <ArrowLeft className="size-4" />
        </Link>
      )}
    </div>
  );
}
export function CategoryGrid() {
  return (
    <div className="scroll-row md:grid md:grid-cols-4 lg:grid-cols-8">
      {categories.map((c) => (
        <Link
          href={`/search?category=${c.id}`}
          key={c.id}
          className="category-item"
        >
          <span>{c.icon}</span>
          <b>{c.name}</b>
        </Link>
      ))}
    </div>
  );
}
export function ProductCard({ product }: { product: Product }) {
  const min = Math.min(...product.offers.map((o) => o.price));
  return (
    <article className="product-card">
      <Link href={`/product/${product.id}`}>
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="flex flex-col gap-2 p-4">
          <p className="text-xs text-slate-400">{product.brand}</p>
          <h3 className="line-clamp-2 min-h-12 text-sm font-bold leading-6 text-slate-800">
            {product.name}
          </h3>
          <div className="mt-2 flex items-end justify-between gap-2">
            <div>
              <p className="text-xs text-slate-400">بهترین قیمت از</p>
              <strong className="text-base text-primary">{toman(min)}</strong>
            </div>
            <span className="text-xs text-slate-500">
              {product.offers.length} فروشگاه
            </span>
          </div>
        </div>
      </Link>
      <Link href={`/product/${product.id}`} className="compare-btn">
        مقایسه قیمت‌ها <ArrowLeft className="size-4" />
      </Link>
    </article>
  );
}
export function ShopCard({ shopId }: { shopId: string }) {
  const shop = getShop(shopId);
  return (
    <Link href={`/shop/${shop.id}`} className="shop-card">
      <span className="shop-logo">{shop.logo}</span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <b className="truncate">{shop.name}</b>
          {shop.verified && (
            <ShieldCheck className="size-4 shrink-0 text-primary" />
          )}
        </div>
        <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
          <span className="flex items-center gap-1 text-amber-500">
            <Star className="size-3.5 fill-current" /> {shop.rating}
          </span>
          <span>·</span>
          <span>{shop.products.toLocaleString("fa-IR")} کالا</span>
        </div>
      </div>
      <ArrowLeft className="size-4 text-slate-400" />
    </Link>
  );
}
export function StatsBar() {
  return (
    <div className="stats-grid">
      <div>
        <b>+۱۳٬۷۷۱</b>
        <span>محصول فعال</span>
      </div>
      <div>
        <b>+۲٬۰۰۰</b>
        <span>فروشگاه معتبر</span>
      </div>
      <div>
        <b>+۲</b>
        <span>برند موجود</span>
      </div>
    </div>
  );
}
export function TrustBadges() {
  const trustItems: Array<[string, string, LucideIcon]> = [
    ["مقایسه قیمت", "یک محصول، چندین پیشنهاد قیمت", BarChart3],
    ["فروشگاه معتبر", "انتخاب آگاهانه با امتیاز کاربران", ShieldCheck],
    ["به‌روزرسانی قیمت", "اطلاعات قیمت به‌روز فروشگاه‌ها", TrendingDown],
    ["جستجوی هوشمند", "سریع‌تر به انتخاب مناسب برسید", Search],
  ];
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {trustItems.map(([title, text, Icon]) => (
        <div className="trust-item" key={title as string}>
          <span className="trust-icon">
            <Icon className="size-5" />
          </span>
          <div>
            <b>{title as string}</b>
            <p>{text as string}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
export function PriceRow({
  product,
  offer,
  cheapest,
}: {
  product: Product;
  offer: Product["offers"][number];
  cheapest?: boolean;
}) {
  const shop = getShop(offer.shopId);
  return (
    <div
      className={`offer-row ${cheapest ? "cheapest" : ""}`}
      data-product-id={product.id}
    >
      <div className="flex items-center gap-3">
        <span className="shop-logo small">{shop.logo}</span>
        <div>
          <b>{shop.name}</b>
          {cheapest && <span className="best-badge">ارزان‌ترین</span>}
        </div>
      </div>
      <span className="flex items-center gap-1 text-sm text-amber-500">
        <Star className="size-3.5 fill-current" />
        {offer.rating}
      </span>
      <span className="hidden text-sm text-slate-500 md:block">
        {offer.warranty}
      </span>
      <strong className="mr-auto text-primary">{toman(offer.price)}</strong>
      <a
        href="https://example.com"
        target="_blank"
        rel="noreferrer"
        className="visit-btn"
      >
        مشاهده <ExternalLink className="size-3.5" />
      </a>
    </div>
  );
}
export function PriceComparison({ product }: { product: Product }) {
  const offers = [...product.offers].sort((a, b) => a.price - b.price);
  return (
    <div className="comparison-box">
      <div className="comparison-head">
        <div>
          <h2 className="text-lg font-black">مقایسه قیمت فروشگاه‌ها</h2>
          <p className="mt-1 text-sm text-slate-500">
            قیمت‌ها از ارزان‌ترین به گران‌ترین مرتب شده‌اند
          </p>
        </div>
        <span className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-sm font-bold">
          <Store className="size-4" /> {offers.length} فروشگاه
        </span>
      </div>
      <div className="hidden grid-cols-[2fr_.6fr_1fr_1.2fr_auto] gap-4 border-b border-slate-100 px-5 py-3 text-xs text-slate-400 md:grid">
        <span>فروشگاه</span>
        <span>امتیاز</span>
        <span>گارانتی</span>
        <span>قیمت</span>
        <span />
      </div>
      {offers.map((offer, i) => (
        <PriceRow
          key={offer.shopId}
          product={product}
          offer={offer}
          cheapest={i === 0}
        />
      ))}
    </div>
  );
}
export function Filters({ onClose }: { onClose?: () => void }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <b>فیلترها</b>
        {onClose && (
          <button onClick={onClose} aria-label="بستن فیلترها">
            <X />
          </button>
        )}
      </div>
      <label>
        حداقل قیمت
        <input className="filter-input" placeholder="مثلاً ۱۰۰٬۰۰۰" />
      </label>
      <label>
        حداکثر قیمت
        <input className="filter-input" placeholder="مثلاً ۵۰٬۰۰۰٬۰۰۰" />
      </label>
      <div className="filter-section">
        <b>برند</b>
        {["Apple", "Samsung", "Sony", "Nike"].map((b) => (
          <label key={b} className="check-row">
            <input type="checkbox" /> {b}
          </label>
        ))}
      </div>
      <div className="filter-section">
        <b>وضعیت فروشنده</b>
        <label className="check-row">
          <input type="checkbox" /> فقط فروشگاه‌های تاییدشده
        </label>
        <label className="check-row">
          <input type="checkbox" /> کالاهای موجود
        </label>
      </div>
      <button className="primary-btn" onClick={onClose}>
        اعمال فیلتر
      </button>
    </div>
  );
}
export function MobileFilter({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="secondary-btn lg:hidden" onClick={() => setOpen(true)}>
        <SlidersHorizontal className="size-4" /> فیلترها
      </button>
      {open && (
        <div className="mobile-drawer">
          <div className="drawer-panel">{children}</div>
        </div>
      )}
    </>
  );
}
export function PriceHistory({ product }: { product: Product }) {
  const max = Math.max(...product.history.map((h) => h.price));
  const min = Math.min(...product.history.map((h) => h.price));
  return (
    <div className="comparison-box">
      <div className="comparison-head">
        <div>
          <h2 className="text-lg font-black">روند تغییر قیمت</h2>
          <p className="mt-1 text-sm text-slate-500">
            تاریخچه قیمت در ۶ ماه گذشته
          </p>
        </div>
        <TrendingDown className="size-5 text-emerald-600" />
      </div>
      <div className="flex h-48 items-end gap-3 px-6 pb-6 pt-4">
        {product.history.map((h) => (
          <div
            className="flex h-full flex-1 flex-col items-center justify-end gap-2"
            key={h.date}
          >
            <div
              className="w-full rounded-t-md bg-primary/80"
              style={{
                height: `${Math.max(18, ((h.price - min) / (max - min)) * 100)}%`,
              }}
              title={toman(h.price)}
            />
            <span className="text-xs text-slate-400">{h.date}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-between border-t border-slate-100 px-6 py-4 text-xs text-slate-500">
        <span>
          کمترین: <b>{toman(min)}</b>
        </span>
        <span>
          بیشترین: <b>{toman(max)}</b>
        </span>
      </div>
    </div>
  );
}
export function ProductDetail({ product }: { product: Product }) {
  return (
    <>
      <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
        <div className="product-detail-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div>
          <p className="eyebrow">
            {product.brand} / {product.category}
          </p>
          <h1 className="mt-2 text-2xl font-black leading-10 md:text-3xl">
            {product.name}
          </h1>
          <p className="mt-4 max-w-2xl leading-8 text-slate-500">
            قیمت و مشخصات این محصول را در فروشگاه‌های معتبر مقایسه کنید و بهترین
            انتخاب را با اطمینان انجام دهید.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="stat-chip">
              <Store className="size-4" /> {product.offers.length} فروشگاه
            </span>
            <span className="stat-chip">
              <Star className="size-4 fill-amber-400 text-amber-400" /> ۴.۸
              امتیاز محصول
            </span>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <PriceComparison product={product} />
      </div>
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <PriceHistory product={product} />
        <div className="comparison-box">
          <div className="comparison-head">
            <h2 className="text-lg font-black">مشخصات فنی</h2>
          </div>
          <div>
            {product.specs.map(([k, v]) => (
              <div className="spec-row" key={k}>
                <span>{k}</span>
                <b>{v}</b>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
export function SearchResults() {
  const [query] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const shown = useMemo(
    () =>
      products.filter(
        (p) =>
          !query ||
          `${p.name} ${p.brand}`.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );
  return (
    <>
      <div className="page-intro">
        <p className="eyebrow">جستجو در بازار ایران</p>
        <h1>نتایج جستجو {query && `برای «${query}»`}</h1>
        <p>مقایسه قیمت و انتخاب بهترین فروشگاه برای خرید شما</p>
        <div className="mt-5 max-w-2xl">
          <SearchBar />
        </div>
      </div>
      <div className="container section-grid">
        <aside className="filter-sidebar">
          <Filters />
        </aside>
        <main>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <b>{shown.length.toLocaleString("fa-IR")} محصول پیدا شد</b>
            <div className="flex items-center gap-2">
              <MobileFilter>
                <Filters />
              </MobileFilter>
              <select className="sort-select" defaultValue="cheap">
                <option value="cheap">ارزان‌ترین</option>
                <option>گران‌ترین</option>
                <option>بیشترین فروشگاه</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {shown.map((p) => (
              <div className="result-card" key={p.id}>
                <div className="flex gap-4">
                  <Link href={`/product/${p.id}`} className="result-image">
                    <img src={p.image} alt={p.name} />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <Link href={`/product/${p.id}`}>
                      <p className="text-xs text-slate-400">{p.brand}</p>
                      <h2 className="mt-1 text-base font-black leading-7">
                        {p.name}
                      </h2>
                    </Link>
                    <p className="mt-2 text-sm text-slate-500">
                      موجود در {p.offers.length} فروشگاه · اختلاف قیمت تا{" "}
                      {toman(
                        Math.max(...p.offers.map((o) => o.price)) -
                          Math.min(...p.offers.map((o) => o.price)),
                      )}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                      <strong className="text-lg text-primary">
                        از {toman(Math.min(...p.offers.map((o) => o.price)))}
                      </strong>
                      <button
                        className="compare-btn inline-flex"
                        onClick={() =>
                          setExpanded(expanded === p.id ? null : p.id)
                        }
                      >
                        {expanded === p.id
                          ? "بستن پیشنهادها"
                          : "مشاهده قیمت فروشگاه‌ها"}{" "}
                        <ChevronDown className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>
                {expanded === p.id && (
                  <div className="mt-5 border-t border-slate-100 pt-2">
                    {p.offers
                      .slice(0, 3)
                      .sort((a, b) => a.price - b.price)
                      .map((o, i) => (
                        <PriceRow
                          key={o.shopId}
                          product={p}
                          offer={o}
                          cheapest={i === 0}
                        />
                      ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}

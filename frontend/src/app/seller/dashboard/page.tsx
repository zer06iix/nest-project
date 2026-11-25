"use client";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { Header } from "@/components/marketplace";
import { BarChart3, Package, Store, Tag, type LucideIcon } from "lucide-react";
const sellerCards: Array<[LucideIcon, string, string]> = [
  [Store, "فروشگاه من", "مدیریت اطلاعات"],
  [Package, "محصولات", "۰ محصول فعال"],
  [Tag, "قیمت‌ها", "به‌روزرسانی پیشنهادها"],
  [BarChart3, "آمار فروشگاه", "مشاهده عملکرد"],
];

export default function SellerDashboard() {
  const { user, application, loading } = useAuth();
  if (loading)
    return (
      <>
        <Header />
        <main className="container section">در حال بارگذاری...</main>
      </>
    );
  if (!user)
    return (
      <>
        <Header />
        <main className="container section">
          <h1 className="text-2xl font-black">ابتدا وارد حساب شوید.</h1>
          <Link href="/login" className="primary-btn mt-5">
            ورود
          </Link>
        </main>
      </>
    );
  if (!application || application.status !== "approved")
    return (
      <>
        <Header />
        <main className="container section">
          <div className="register-card max-w-xl">
            <p className="eyebrow">دسترسی فروشنده</p>
            <h1 className="mt-2 text-2xl font-black">داشبورد هنوز فعال نیست</h1>
            <p className="mt-4 leading-8 text-slate-500">
              {application
                ? "درخواست فروشندگی شما در حال بررسی است. پس از تایید، امکانات مدیریت فروشگاه فعال می‌شود."
                : "برای دسترسی به داشبورد ابتدا درخواست فروشندگی ثبت کنید."}
            </p>
            <Link href="/seller/register" className="primary-btn mt-5">
              ثبت درخواست
            </Link>
          </div>
        </main>
      </>
    );
  return (
    <>
      <Header />
      <main className="container section">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">مدیریت فروشگاه</p>
            <h1 className="mt-2 text-3xl font-black">داشبورد فروشنده</h1>
          </div>
          <Link href="/" className="secondary-btn">
            مشاهده فروشگاه
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sellerCards.map(([Icon, title, text]) => (
            <div className="register-card" key={title as string}>
              <Icon className="text-primary" />
              <b className="mt-4 block">{title as string}</b>
              <p className="mt-2 text-sm text-slate-500">{text as string}</p>
              <button className="secondary-btn mt-4 w-full">مدیریت</button>
            </div>
          ))}
        </div>
        <div className="comparison-box mt-8 p-6">
          <h2 className="text-lg font-black">شروع کار با فروشگاه</h2>
          <p className="mt-3 leading-8 text-slate-500">
            برای شروع، اطلاعات فروشگاه و اولین محصولات خود را اضافه کنید. این
            بخش پس از اتصال به پنل مدیریت واقعی تکمیل می‌شود.
          </p>
        </div>
      </main>
    </>
  );
}

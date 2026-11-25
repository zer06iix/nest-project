"use client";
import { useState } from "react";
import { Check, Store } from "lucide-react";
import { Header } from "@/components/marketplace";
export default function RegisterShop() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <Header />
      <main className="container section">
        <div className="register-layout">
          <div>
            <p className="eyebrow">شروع یک همکاری تازه</p>
            <h1>فروشگاهت رو به هزاران خریدار معرفی کن</h1>
            <p className="mt-5 leading-8 text-slate-500">
              محصولاتت رو ثبت کن، در معرض دید مشتریان قرار بگیر و فروشگاهت رو به
              شبکه فروشندگان ما اضافه کن.
            </p>
            <div className="mt-8 flex flex-col gap-4">
              {[
                "دیده‌شدن در کنار فروشگاه‌های معتبر",
                "دسترسی به مشتریان آماده خرید",
                "داشبورد ساده برای مدیریت محصولات",
              ].map((t) => (
                <div className="flex items-center gap-3 font-bold" key={t}>
                  <span className="check">
                    <Check className="size-4" />
                  </span>
                  {t}
                </div>
              ))}
            </div>
          </div>
          <div className="register-card">
            {sent ? (
              <div className="success-state">
                <span className="success-icon">
                  <Check />
                </span>
                <h2>درخواست شما ثبت شد</h2>
                <p>کارشناسان روک‌تین به‌زودی با شما تماس می‌گیرند.</p>
                <button
                  onClick={() => setSent(false)}
                  className="secondary-btn"
                >
                  ثبت درخواست جدید
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <div className="form-icon">
                  <Store />
                </div>
                <h2>اطلاعات فروشگاه</h2>
                <p className="mb-6 text-sm text-slate-500">
                  فرم زیر را تکمیل کنید تا با شما تماس بگیریم.
                </p>
                <label>
                  نام فروشگاه
                  <input required placeholder="مثلاً فروشگاه دیجیتال من" />
                </label>
                <label>
                  آدرس وب‌سایت
                  <input
                    required
                    type="url"
                    placeholder="https://example.com"
                  />
                </label>
                <label>
                  شماره موبایل
                  <input
                    required
                    pattern="09[0-9]{9}"
                    placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                  />
                </label>
                <div className="grid gap-3 sm:grid-cols-2">
                  <label>
                    تعداد محصولات
                    <input required type="number" placeholder="مثلاً ۱۰۰" />
                  </label>
                  <label>
                    دسته‌بندی فعالیت
                    <select required defaultValue="">
                      <option value="" disabled>
                        انتخاب کنید
                      </option>
                      <option>کالای دیجیتال</option>
                      <option>پوشاک</option>
                      <option>خانه و آشپزخانه</option>
                    </select>
                  </label>
                </div>
                <button className="primary-btn mt-2 w-full" type="submit">
                  ارسال درخواست همکاری
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

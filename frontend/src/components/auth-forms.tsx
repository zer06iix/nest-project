'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Store, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '@/lib/auth'

export function AuthShell({
  title,
  eyebrow,
  children,
}: {
  title: string
  eyebrow: string
  children: React.ReactNode
}) {
  return (
    <main className='min-h-[calc(100vh-80px)] bg-slate-50 px-4 py-10'>
      <div className='mx-auto max-w-md'>
        <Link
          href='/'
          className='mb-8 flex items-center justify-center gap-3 font-black'
        >
          <span className='brand-mark'>ر</span>
          <span>روک‌تین</span>
        </Link>
        <div className='register-card'>
          <p className='eyebrow'>{eyebrow}</p>
          <h1 className='mt-2 text-2xl font-black'>{title}</h1>
          {children}
        </div>
      </div>
    </main>
  )
}

export function SignupForm() {
  const { signup } = useAuth()
  const router = useRouter()
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')

  const [data, setData] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    confirm: '',
    terms: false,
  })

  const update = (key: string, value: string | boolean) =>
    setData({ ...data, [key]: value })

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!data.fullName || !/^09\d{9}$/.test(data.phone)) {
      return setError('نام و شماره موبایل معتبر وارد کنید.')
    }

    if (data.password.length < 8) {
      return setError('رمز عبور باید حداقل ۸ کاراکتر باشد.')
    }

    if (data.password !== data.confirm) {
      return setError('تکرار رمز عبور صحیح نیست.')
    }

    if (!data.terms) {
      return setError('پذیرش قوانین برای ادامه الزامی است.')
    }

    await signup(data)
    router.push('/account')
  }

  return (
    <AuthShell eyebrow='ایجاد حساب جدید' title='به روک‌تین خوش آمدید'>
      <form onSubmit={submit} className='mt-6 flex flex-col gap-4'>
        <label>
          نام و نام خانوادگی
          <input
            className='filter-input'
            value={data.fullName}
            onChange={(e) => update('fullName', e.target.value)}
            placeholder='مثلاً سارا محمدی'
          />
        </label>

        <label>
          شماره موبایل
          <input
            className='filter-input'
            dir='ltr'
            value={data.phone}
            onChange={(e) => update('phone', e.target.value)}
            placeholder='09123456789'
          />
        </label>

        <label>
          ایمیل <span className='text-xs text-slate-400'>(اختیاری)</span>
          <input
            className='filter-input'
            dir='ltr'
            value={data.email}
            onChange={(e) => update('email', e.target.value)}
            placeholder='you@example.com'
          />
        </label>

        <label>
          رمز عبور
          <div className='relative'>
            <input
              className='filter-input w-full pl-12'
              dir='ltr'
              type={show ? 'text' : 'password'}
              value={data.password}
              onChange={(e) => update('password', e.target.value)}
            />
            <button
              type='button'
              className='absolute left-3 top-2.5 text-slate-400'
              onClick={() => setShow(!show)}
            >
              {show ? (
                <EyeOff className='size-5' />
              ) : (
                <Eye className='size-5' />
              )}
            </button>
          </div>
          {data.password && (
            <span className='mt-1 block text-xs text-slate-400'>
              قدرت رمز: {data.password.length < 8 ? 'ضعیف' : 'مناسب'}
            </span>
          )}
        </label>

        <label>
          تکرار رمز عبور
          <input
            className='filter-input'
            dir='ltr'
            type='password'
            value={data.confirm}
            onChange={(e) => update('confirm', e.target.value)}
          />
        </label>

        <label className='check-row'>
          <input
            type='checkbox'
            checked={data.terms}
            onChange={(e) => update('terms', e.target.checked)}
          />{' '}
          قوانین و حریم خصوصی روک‌تین را می‌پذیرم.
        </label>

        {error && <p className='text-sm text-red-600'>{error}</p>}

        <button className='primary-btn' type='submit'>
          ثبت‌نام
        </button>

        <p className='text-center text-sm text-slate-500'>
          حساب دارید؟{' '}
          <Link className='font-bold text-primary' href='/login'>
            وارد شوید
          </Link>
        </p>
      </form>
    </AuthShell>
  )
}

export function LoginForm() {
  const { login } = useAuth()
  const router = useRouter()

  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()

    const isDemoLoginAttempt = !identifier.trim() && !password.trim()

    if (!isDemoLoginAttempt && (!identifier.trim() || !password.trim())) {
      return setError('نام کاربری و رمز عبور را وارد کنید.')
    }

    const submittedPassword = password.trim() ? password : ''

    try {
      const authenticatedUser = await login(
        identifier.trim(),
        submittedPassword
      )

      router.push(authenticatedUser.role === 'admin' ? '/admin' : '/account')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'ورود ناموفق بود.')
    }
  }

  return (
    <AuthShell eyebrow='ورود به حساب' title='دوباره خوش آمدید'>
      <form onSubmit={submit} className='mt-6 flex flex-col gap-4'>
        <label>
          موبایل یا ایمیل
          <input
            className='filter-input'
            dir='ltr'
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
        </label>

        <label>
          رمز عبور
          <input
            className='filter-input'
            dir='ltr'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <div className='flex items-center justify-between text-sm'>
          <label className='check-row'>
            <input type='checkbox' /> مرا به خاطر بسپار
          </label>
          <button type='button' className='text-primary'>
            فراموشی رمز عبور
          </button>
        </div>

        {error && <p className='text-sm text-red-600'>{error}</p>}

        <button className='primary-btn' type='submit'>
          ورود
        </button>

        <p className='text-center text-sm text-slate-500'>
          حساب ندارید؟{' '}
          <Link className='font-bold text-primary' href='/signup'>
            ثبت‌نام کنید
          </Link>
        </p>
      </form>
    </AuthShell>
  )
}

export function SellerRegisterForm() {
  const { user, application, applyAsSeller } = useAuth()
  const [done, setDone] = useState(!!application)

  const [data, setData] = useState({
    shopName: '',
    websiteUrl: '',
    contactPhone: '',
    category: 'کالای دیجیتال',
    productCount: '',
    description: '',
  })

  if (!user) {
    return (
      <AuthShell eyebrow='ثبت درخواست فروشندگی' title='ابتدا وارد حساب شوید'>
        <div className='mt-6 flex flex-col gap-4'>
          <p className='leading-8 text-slate-500'>
            برای ثبت فروشگاه باید ابتدا یک حساب کاربری داشته باشید.
          </p>
          <Link href='/login' className='primary-btn'>
            ورود به حساب
          </Link>
        </div>
      </AuthShell>
    )
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    applyAsSeller(data)
    setDone(true)
  }

  if (done) {
    return (
      <AuthShell eyebrow='درخواست فروشندگی' title='درخواست شما ثبت شد'>
        <div className='success-state'>
          <CheckCircle2 className='success-icon' />
          <p className='font-bold'>درخواست فروشندگی شما در حال بررسی است</p>
          <p className='text-sm leading-7 text-slate-500'>
            پس از بررسی اطلاعات، نتیجه در حساب کاربری شما نمایش داده می‌شود.
          </p>
          <Link href='/account' className='primary-btn'>
            مشاهده حساب کاربری
          </Link>
        </div>
      </AuthShell>
    )
  }

  return (
    <AuthShell eyebrow='ساخت فروشگاه' title='فروشنده شوید'>
      <form onSubmit={submit} className='mt-6 flex flex-col gap-4'>
        <label>
          نام فروشگاه
          <input
            className='filter-input'
            required
            value={data.shopName}
            onChange={(e) => setData({ ...data, shopName: e.target.value })}
          />
        </label>

        <label>
          آدرس سایت
          <input
            className='filter-input'
            dir='ltr'
            value={data.websiteUrl}
            onChange={(e) => setData({ ...data, websiteUrl: e.target.value })}
          />
        </label>

        <label>
          شماره تماس
          <input
            className='filter-input'
            required
            dir='ltr'
            value={data.contactPhone}
            onChange={(e) => setData({ ...data, contactPhone: e.target.value })}
          />
        </label>

        <label>
          دسته‌بندی
          <select
            className='filter-input'
            value={data.category}
            onChange={(e) => setData({ ...data, category: e.target.value })}
          >
            <option>کالای دیجیتال</option>
            <option>پوشاک</option>
            <option>خانه و آشپزخانه</option>
            <option>آرایشی و بهداشتی</option>
          </select>
        </label>

        <label>
          تعداد تقریبی محصولات
          <input
            className='filter-input'
            required
            value={data.productCount}
            onChange={(e) => setData({ ...data, productCount: e.target.value })}
          />
        </label>

        <label>
          درباره فروشگاه
          <textarea
            className='filter-input min-h-28 py-3'
            required
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
          />
        </label>

        <button className='primary-btn' type='submit'>
          <Store className='size-4' /> ارسال درخواست
        </button>
      </form>
    </AuthShell>
  )
}

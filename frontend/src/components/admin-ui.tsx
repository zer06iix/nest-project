'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import {
  Activity,
  BarChart3,
  Bell,
  Boxes,
  ChevronDown,
  ChevronLeft,
  CircleDollarSign,
  ClipboardList,
  FileText,
  LayoutDashboard,
  Menu,
  MoreHorizontal,
  Package,
  PanelRightClose,
  PanelRightOpen,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Store,
  Tag,
  Trash2,
  TrendingUp,
  Users,
  X,
} from 'lucide-react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  adminMetrics,
  adminRoleLabels,
  adminUser,
  activity,
  chartData,
  permissions,
  rowsFor,
  type AdminRole,
  type EntityKey,
} from '@/lib/admin-data'
import { useAuth } from '@/lib/auth'

const navGroups = [
  {
    label: 'داشبورد',
    items: [
      ['نمای کلی', '/admin', 'dashboard', LayoutDashboard],
      ['گزارش‌های تحلیلی', '/admin/analytics', 'analytics', BarChart3],
    ],
  },
  {
    label: 'مدیریت کاربران',
    items: [
      ['همه کاربران', '/admin/users', 'users', Users],
      ['فروشندگان', '/admin/sellers', 'sellers', Store],
      ['مدیران سیستم', '/admin/admins', 'admins', ShieldCheck],
    ],
  },
  {
    label: 'مدیریت فروشگاه‌ها',
    items: [
      ['همه فروشگاه‌ها', '/admin/shops', 'shops', Store],
      [
        'درخواست‌های ثبت فروشگاه',
        '/admin/seller-applications',
        'applications',
        ClipboardList,
      ],
    ],
  },
  {
    label: 'مدیریت محصولات',
    items: [
      ['همه محصولات', '/admin/products', 'products', Package],
      ['دسته‌بندی‌ها', '/admin/categories', 'categories', Boxes],
      ['برندها', '/admin/brands', 'brands', Tag],
    ],
  },
  {
    label: 'قیمت و پیشنهادها',
    items: [
      ['همه پیشنهادهای فروش', '/admin/offers', 'offers', CircleDollarSign],
      ['تغییرات قیمت', '/admin/price-history', 'offers', TrendingUp],
    ],
  },
  {
    label: 'مدیریت محتوا',
    items: [
      ['بنرها و صفحات', '/admin/content', 'content', FileText],
      ['نظرات و امتیازها', '/admin/reviews', 'reviews', ShieldCheck],
    ],
  },
  {
    label: 'گزارش‌ها و آمار',
    items: [
      ['آمار بازدید', '/admin/analytics', 'analytics', BarChart3],
      ['گزارش‌های مالی', '/admin/financial', 'financial', CircleDollarSign],
    ],
  },
  {
    label: 'تنظیمات',
    items: [
      ['تنظیمات عمومی', '/admin/settings', 'settings', Settings],
      ['گزارش فعالیت مدیران', '/admin/audit-logs', 'audit', Activity],
    ],
  },
] as const

function AdminSidebar({
  collapsed,
  setCollapsed,
  mobile,
  setMobile,
  role,
}: {
  collapsed: boolean
  setCollapsed: (v: boolean) => void
  mobile: boolean
  setMobile: (v: boolean) => void
  role: AdminRole
}) {
  const path = usePathname()
  const { logout } = useAuth()

  return (
    <aside
      className={`admin-sidebar ${collapsed ? 'collapsed' : ''} ${mobile ? 'open' : ''}`}
    >
      <div className='admin-brand'>
        <span className='brand-mark'>ر</span>
        {!collapsed && (
          <div>
            <b>روک‌تین</b>
            <small>پنل مدیریت</small>
          </div>
        )}
        <button
          className='sidebar-toggle'
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <PanelRightOpen /> : <PanelRightClose />}
        </button>
      </div>

      <div className='admin-nav'>
        {navGroups.map((group) => (
          <div className='admin-nav-group' key={group.label}>
            <span className='admin-nav-label'>{!collapsed && group.label}</span>
            {group.items.map(([label, href, key, Icon]) => {
              const allowed =
                key === 'dashboard' ||
                key === 'analytics' ||
                key === 'financial' ||
                key === 'settings' ||
                key === 'audit' ||
                permissions[role].includes(key as EntityKey)

              if (!allowed) return null

              return (
                <Link
                  onClick={() => setMobile(false)}
                  className={`admin-nav-item ${path === href ? 'active' : ''}`}
                  href={href}
                  key={href}
                >
                  <Icon />
                  <span>{!collapsed && label}</span>
                  {!collapsed && key === 'applications' && <em>۴</em>}
                </Link>
              )
            })}
          </div>
        ))}
      </div>

      <div className='admin-sidebar-footer'>
        {!collapsed && <span>نسخه آزمایشی ۱.۰</span>}
        <button onClick={logout}>
          <X />
          <span>{!collapsed && 'خروج از حساب'}</span>
        </button>
      </div>
    </aside>
  )
}

function AdminHeader({
  title,
  onMenu,
  adminName,
  role,
}: {
  title: string
  onMenu: () => void
  adminName: string
  role: AdminRole
}) {
  return (
    <header className='admin-header'>
      <button className='mobile-menu' onClick={onMenu}>
        <Menu />
      </button>

      <div>
        <div className='admin-breadcrumb'>
          مدیریت روک‌تین <ChevronLeft /> <b>{title}</b>
        </div>
        <h1>{title}</h1>
      </div>

      <div className='admin-header-actions'>
        <label className='admin-search'>
          <Search />
          <input placeholder='جستجو در پنل...' />
        </label>

        <button className='admin-header-icon'>
          <Bell />
          <i>۳</i>
        </button>

        <div className='admin-profile'>
          <span>آ</span>
          <div>
            <b>{adminName}</b>
            <small>{adminRoleLabels[role]}</small>
          </div>
          <ChevronDown />
        </div>
      </div>
    </header>
  )
}

function AdminFrame({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobile, setMobile] = useState(false)
  const { user } = useAuth()

  const role: AdminRole = user?.role === 'admin' ? 'admin' : adminUser.role

  return (
    <div className='admin-frame'>
      <AdminSidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobile={mobile}
        setMobile={setMobile}
        role={role}
      />

      <div className='admin-main'>
        <AdminHeader
          title={title}
          onMenu={() => setMobile(!mobile)}
          adminName={user?.fullName ?? adminUser.name}
          role={role}
        />
        <main className='admin-content'>{children}</main>
      </div>
    </div>
  )
}

function PageHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string
  title: string
  description?: string
  action?: React.ReactNode
}) {
  return (
    <div className='admin-page-heading'>
      <div>
        {eyebrow && <span className='admin-eyebrow'>{eyebrow}</span>}
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {action}
    </div>
  )
}

function Sparkline({ data, color }: { data: number[]; color: string }) {
  return (
    <div className='sparkline'>
      <ResponsiveContainer width='100%' height='100%'>
        <AreaChart data={data.map((v, i) => ({ i, v }))}>
          <Area
            type='monotone'
            dataKey='v'
            stroke={color}
            fill={color}
            fillOpacity={0.12}
            strokeWidth={2}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

function MetricCards() {
  return (
    <div className='admin-metrics'>
      {adminMetrics.map((m) => (
        <div className={`admin-metric ${m.tone}`} key={m.label}>
          <div className='metric-top'>
            <span>{m.label}</span>
            <TrendingUp />
          </div>
          <strong>{m.value}</strong>
          <div className='metric-bottom'>
            <b>{m.change}</b>
            <small>نسبت به ماه قبل</small>
          </div>
          <Sparkline
            data={m.data}
            color={m.tone === 'slate' ? '#94a3b8' : 'currentColor'}
          />
        </div>
      ))}
    </div>
  )
}

function Overview() {
  const [range, setRange] = useState('۳۰ روز گذشته')

  return (
    <AdminFrame title='نمای کلی'>
      <PageHeading
        eyebrow='سلام آرمان، روز بخیر'
        title='نمای کلی پلتفرم'
        description='تصویری زنده از عملکرد بازار مقایسه‌ای روک‌تین'
        action={
          <select
            className='admin-select'
            value={range}
            onChange={(e) => setRange(e.target.value)}
          >
            <option>امروز</option>
            <option>۷ روز گذشته</option>
            <option>۳۰ روز گذشته</option>
            <option>۹۰ روز گذشته</option>
          </select>
        }
      />

      <MetricCards />

      <div className='admin-grid-two'>
        <div className='admin-panel chart-panel'>
          <div className='panel-head'>
            <div>
              <b>رشد بازار</b>
              <span>کاربران، فروشگاه‌ها و کلیک‌های خروجی</span>
            </div>
            <div className='chart-legend'>
              <i className='blue' />
              کاربران <i className='purple' />
              فروشگاه‌ها <i className='orange' />
              کلیک خروجی
            </div>
          </div>

          <ResponsiveContainer width='100%' height={280}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id='blueFill' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor='#5975e8' stopOpacity={0.28} />
                  <stop offset='95%' stopColor='#5975e8' stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray='3 3'
                vertical={false}
                stroke='#edf0f5'
              />
              <XAxis dataKey='day' axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip />
              <Area
                type='monotone'
                dataKey='users'
                stroke='#5975e8'
                fill='url(#blueFill)'
                strokeWidth={3}
              />
              <Area
                type='monotone'
                dataKey='shops'
                stroke='#9d68e9'
                fill='transparent'
                strokeWidth={2}
              />
              <Area
                type='monotone'
                dataKey='clicks'
                stroke='#e99a59'
                fill='transparent'
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>

          <div className='chart-note'>
            <span>
              <TrendingUp /> داده‌ها نسبت به دوره قبل رشد داشته‌اند
            </span>
            <small>{range}</small>
          </div>
        </div>

        <div className='admin-panel'>
          <div className='panel-head'>
            <div>
              <b>پراکندگی دسته‌بندی</b>
              <span>بر اساس تعداد محصولات</span>
            </div>
            <MoreHorizontal />
          </div>

          <div className='donut-wrap'>
            <ResponsiveContainer width='100%' height={230}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'دیجیتال', value: 42 },
                    { name: 'خانه', value: 23 },
                    { name: 'پوشاک', value: 18 },
                    { name: 'سایر', value: 17 },
                  ]}
                  innerRadius={65}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey='value'
                >
                  <Cell fill='#a52f47' />
                  <Cell fill='#5975e8' />
                  <Cell fill='#e99a59' />
                  <Cell fill='#d8dde7' />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            <div className='donut-center'>
              <b>۱۳۷K</b>
              <small>محصول</small>
            </div>
          </div>

          <div className='category-legend'>
            <span>
              <i style={{ background: '#a52f47' }} />
              کالای دیجیتال <b>۴۲٪</b>
            </span>
            <span>
              <i style={{ background: '#5975e8' }} />
              خانه و آشپزخانه <b>۲۳٪</b>
            </span>
            <span>
              <i style={{ background: '#e99a59' }} />
              پوشاک <b>۱۸٪</b>
            </span>
          </div>
        </div>
      </div>

      <div className='admin-grid-two lower'>
        <ActivityFeed />
        <TopEntities />
      </div>
    </AdminFrame>
  )
}

function ActivityFeed() {
  return (
    <div className='admin-panel'>
      <div className='panel-head'>
        <div>
          <b>فعالیت‌های اخیر</b>
          <span>رویدادهای مهم پلتفرم</span>
        </div>
        <Link href='/admin/audit-logs'>مشاهده همه</Link>
      </div>

      <div className='activity-list'>
        {activity.map(([title, desc, time, tone]) => (
          <div className='activity-item' key={title}>
            <i className={tone} />
            <div>
              <b>{title}</b>
              <p>{desc}</p>
            </div>
            <time>{time}</time>
          </div>
        ))}
      </div>
    </div>
  )
}

function TopEntities() {
  return (
    <div className='admin-panel'>
      <div className='panel-head'>
        <div>
          <b>برترین فروشگاه‌ها</b>
          <span>بر اساس کلیک خروجی</span>
        </div>
        <Link href='/admin/shops'>مشاهده همه</Link>
      </div>

      <div className='rank-list'>
        {['دیجی‌کالا', 'تکنولایف', 'کالاتیک', 'ایمالز', 'موبایل ۱۴۰'].map(
          (name, i) => (
            <div className='rank-row' key={name}>
              <b>{i + 1}</b>
              <span className='rank-logo'>{name.slice(0, 1)}</span>
              <div>
                <strong>{name}</strong>
                <small>{['۲۸۴K', '۱۹۸K', '۱۴۲K', '۹۶K', '۷۴K'][i]} کلیک</small>
              </div>
              <em>+{[24, 18, 12, 9, 6][i]}٪</em>
            </div>
          )
        )}
      </div>
    </div>
  )
}

function Analytics() {
  return (
    <AdminFrame title='گزارش‌های تحلیلی'>
      <PageHeading
        eyebrow='هوش تجاری'
        title='تحلیل عملکرد بازار'
        description='داده‌های رفتاری و عملیاتی بازار مقایسه‌ای؛ کلیک خروجی خرید قطعی نیست.'
        action={
          <select className='admin-select'>
            <option>۳۰ روز گذشته</option>
            <option>۹۰ روز گذشته</option>
          </select>
        }
      />

      <div className='analytics-kpis'>
        <div>
          <span>جستجوی محصولات</span>
          <b>۲۸۴٬۶۰۰</b>
          <em>+۲۴٪</em>
        </div>
        <div>
          <span>مشاهده جزئیات</span>
          <b>۱۹۸٬۴۲۰</b>
          <em>+۱۸٪</em>
        </div>
        <div>
          <span>مقایسه پیشنهادها</span>
          <b>۸۶٬۹۱۰</b>
          <em>+۳۱٪</em>
        </div>
        <div>
          <span>کلیک خروجی</span>
          <b>۴۲٬۸۸۰</b>
          <em>+۲۱٪</em>
        </div>
      </div>

      <div className='admin-panel chart-panel'>
        <div className='panel-head'>
          <div>
            <b>قیف نیت خرید</b>
            <span>از جستجو تا کلیک خروجی؛ بدون ادعای فروش قطعی</span>
          </div>
        </div>

        <div className='funnel'>
          <div>
            <b>۲۸۴٬۶۰۰</b>
            <span>جستجو</span>
          </div>
          <div>
            <b>۱۹۸٬۴۲۰</b>
            <span>مشاهده محصول</span>
          </div>
          <div>
            <b>۸۶٬۹۱۰</b>
            <span>مقایسه پیشنهادها</span>
          </div>
          <div>
            <b>۴۲٬۸۸۰</b>
            <span>کلیک خروجی</span>
          </div>
        </div>
      </div>

      <div className='admin-grid-two'>
        <div className='admin-panel chart-panel'>
          <div className='panel-head'>
            <div>
              <b>فعالیت بازار</b>
              <span>کلیک خروجی و محصولات جدید</span>
            </div>
          </div>

          <ResponsiveContainer width='100%' height={280}>
            <BarChart data={chartData}>
              <CartesianGrid
                strokeDasharray='3 3'
                vertical={false}
                stroke='#edf0f5'
              />
              <XAxis dataKey='day' axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey='clicks' fill='#a52f47' radius={[5, 5, 0, 0]} />
              <Bar dataKey='products' fill='#e99a59' radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className='admin-panel'>
          <div className='panel-head'>
            <div>
              <b>محصولات با بیشترین اختلاف قیمت</b>
            </div>
          </div>

          {[
            'iPhone 15 Pro Max',
            'Galaxy A56',
            'MacBook Air M3',
            'AirPods Pro 2',
          ].map((p, i) => (
            <div className='price-gap' key={p}>
              <span>{p}</span>
              <b>{[18, 12, 9, 7][i]}٪</b>
              <div>
                <i style={{ width: `${[80, 62, 48, 36][i]}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminFrame>
  )
}

function CrudTable({ entity, title }: { entity: EntityKey; title: string }) {
  const [rows, setRows] = useState(() => rowsFor(entity))
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<string[]>([])
  const [modal, setModal] = useState(false)

  const filtered = useMemo(
    () => rows.filter((r) => `${r.name} ${r.subtitle}`.includes(query)),
    [rows, query]
  )

  const remove = (id: string) => setRows((v) => v.filter((r) => r.id !== id))

  const add = () => {
    const id = `${entity}-${Date.now()}`

    setRows((v) => [
      {
        id,
        name:
          entity === 'products'
            ? 'محصول جدید'
            : entity === 'shops'
              ? 'فروشگاه جدید'
              : 'رکورد جدید',
        subtitle: 'رکورد آزمایشی اضافه شده توسط مدیر',
        status: 'فعال',
        meta: 'همین حالا',
        value: 'مشاهده جزئیات',
      },
      ...v,
    ])

    setModal(false)
  }

  return (
    <AdminFrame title={title}>
      <PageHeading
        eyebrow='مدیریت داده‌ها'
        title={title}
        description='مدیریت، بررسی و ویرایش رکوردهای پلتفرم'
        action={
          <button className='primary-btn' onClick={() => setModal(true)}>
            <Plus /> افزودن مورد جدید
          </button>
        }
      />

      <div className='admin-panel table-panel'>
        <div className='table-toolbar'>
          <label className='admin-search'>
            <Search />
            <input
              placeholder='جستجو در این فهرست...'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>

          <div className='toolbar-actions'>
            <select className='admin-select'>
              <option>همه وضعیت‌ها</option>
              <option>فعال</option>
              <option>در انتظار بررسی</option>
              <option>تعلیق شده</option>
            </select>

            {selected.length > 0 && (
              <button
                className='secondary-btn'
                onClick={() =>
                  setRows((v) => v.filter((r) => !selected.includes(r.id)))
                }
              >
                <Trash2 /> حذف انتخاب‌شده‌ها
              </button>
            )}
          </div>
        </div>

        <div className='table-scroll'>
          <table className='admin-table'>
            <thead>
              <tr>
                <th>
                  <input
                    type='checkbox'
                    checked={
                      selected.length === filtered.length && filtered.length > 0
                    }
                    onChange={(e) =>
                      setSelected(
                        e.target.checked ? filtered.map((r) => r.id) : []
                      )
                    }
                  />
                </th>
                <th>نام / عنوان</th>
                <th>وضعیت</th>
                <th>اطلاعات تکمیلی</th>
                <th>شاخص عملکرد</th>
                <th>عملیات</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((row) => (
                <tr key={row.id}>
                  <td>
                    <input
                      type='checkbox'
                      checked={selected.includes(row.id)}
                      onChange={(e) =>
                        setSelected(
                          e.target.checked
                            ? [...selected, row.id]
                            : selected.filter((id) => id !== row.id)
                        )
                      }
                    />
                  </td>

                  <td>
                    <div className='table-name'>
                      <span className='table-avatar'>
                        {row.name.slice(0, 1)}
                      </span>
                      <div>
                        <b>{row.name}</b>
                        <small>{row.subtitle}</small>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span
                      className={`status-badge ${row.status === 'فعال' || row.status === 'تأیید شده' ? 'success' : row.status === 'در انتظار بررسی' ? 'warning' : 'danger'}`}
                    >
                      {row.status}
                    </span>
                  </td>

                  <td>{row.meta}</td>
                  <td className='table-value'>{row.value}</td>

                  <td>
                    <div className='row-actions'>
                      <button title='ویرایش'>ویرایش</button>
                      <button title='حذف' onClick={() => remove(row.id)}>
                        <Trash2 />
                      </button>
                      <button title='جزئیات'>
                        <MoreHorizontal />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className='table-footer'>
          <span>
            نمایش {filtered.length} از {rows.length} رکورد
          </span>
          <div>
            <button>قبلی</button>
            <b>۱</b>
            <button>بعدی</button>
          </div>
        </div>
      </div>

      {modal && (
        <div className='admin-modal-backdrop'>
          <div className='admin-modal'>
            <button className='modal-close' onClick={() => setModal(false)}>
              <X />
            </button>

            <span className='form-icon'>
              <Plus />
            </span>
            <h3>افزودن {title}</h3>
            <p>این فرم نمونه برای ثبت عملیات CRUD آماده است.</p>

            <label>
              نام / عنوان
              <input
                className='filter-input'
                autoFocus
                placeholder='نام مورد جدید'
              />
            </label>

            <label>
              توضیحات
              <textarea
                className='filter-input min-h-24 py-3'
                placeholder='توضیحات کوتاه'
              />
            </label>

            <div className='modal-actions'>
              <button className='secondary-btn' onClick={() => setModal(false)}>
                انصراف
              </button>
              <button className='primary-btn' onClick={add}>
                ثبت رکورد
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminFrame>
  )
}

function AuditLogs() {
  return (
    <AdminFrame title='گزارش فعالیت مدیران'>
      <PageHeading
        eyebrow='امنیت و شفافیت'
        title='گزارش فعالیت مدیران'
        description='این گزارش فقط خواندنی است و تغییرات حساس را ثبت می‌کند.'
      />

      <div className='admin-panel table-panel'>
        <div className='audit-list'>
          {[
            [
              'آرمان رضایی',
              'فروشگاه تکنولایف را تأیید کرد',
              'فروشگاه',
              '۲ دقیقه پیش',
            ],
            [
              'سحر نادری',
              'قیمت پیشنهاد Galaxy A56 را تغییر داد',
              'پیشنهاد فروش',
              '۳۵ دقیقه پیش',
            ],
            ['آرمان رضایی', 'محصول جدیدی اضافه کرد', 'محصول', '۱ ساعت پیش'],
            [
              'کیان توکلی',
              'درخواست فروشگاه آریا را رد کرد',
              'درخواست فروشندگی',
              '۲ ساعت پیش',
            ],
            [
              'آرمان رضایی',
              'دسترسی مدیر جدید را تغییر داد',
              'مدیر سیستم',
              'دیروز',
            ],
          ].map((r) => (
            <div className='audit-row' key={r[1]}>
              <span className='table-avatar'>{r[0]?.slice(0, 1) ?? ''}</span>
              <div>
                <b>{r[0]}</b>
                <p>{r[1]}</p>
              </div>
              <span>{r[2]}</span>
              <time>{r[3]}</time>
            </div>
          ))}
        </div>
      </div>
    </AdminFrame>
  )
}

function PriceHistory() {
  return (
    <AdminFrame title='تاریخچه قیمت'>
      <PageHeading
        eyebrow='پایش بازار'
        title='تغییرات قیمت'
        description='رصد تغییرات قیمت و اختلاف پیشنهادها در فروشگاه‌های متصل.'
        action={
          <select className='admin-select'>
            <option>۲۴ ساعت گذشته</option>
            <option>۷ روز گذشته</option>
            <option>۳۰ روز گذشته</option>
          </select>
        }
      />

      <div className='analytics-kpis'>
        <div>
          <span>تغییرات امروز</span>
          <b>۲٬۴۸۰</b>
          <em>+۱۸٪</em>
        </div>
        <div>
          <span>کاهش قیمت</span>
          <b>۱٬۱۲۰</b>
          <em>+۲۲٪</em>
        </div>
        <div>
          <span>افزایش قیمت</span>
          <b>۸۴۰</b>
          <em>+۹٪</em>
        </div>
        <div>
          <span>نیازمند بررسی</span>
          <b>۵۲۰</b>
          <em>ارجاعی</em>
        </div>
      </div>

      <div className='admin-panel table-panel'>
        <div className='table-toolbar'>
          <div>
            <b>آخرین تغییرات قیمت</b>
            <p className='panel-subtitle'>
              هشدارها بر اساس رفتار ثبت‌شده فروشگاه‌ها
            </p>
          </div>
          <button className='secondary-btn'>خروجی CSV</button>
        </div>

        <div className='table-scroll'>
          <table className='admin-table'>
            <thead>
              <tr>
                <th>محصول</th>
                <th>فروشگاه</th>
                <th>قیمت قبلی</th>
                <th>قیمت جدید</th>
                <th>تغییر</th>
                <th>زمان</th>
              </tr>
            </thead>

            <tbody>
              {[
                [
                  'Samsung Galaxy A56',
                  'دیجی‌کالا',
                  '۲۵٬۱۰۰٬۰۰۰',
                  '۲۴٬۵۰۰٬۰۰۰',
                  '-۲.۴٪',
                ],
                [
                  'iPhone 15 Pro Max',
                  'تکنولایف',
                  '۸۳٬۹۰۰٬۰۰۰',
                  '۸۵٬۹۰۰٬۰۰۰',
                  '+۲.۳٪',
                ],
                [
                  'MacBook Air M3',
                  'کالاتیک',
                  '۶۸٬۲۰۰٬۰۰۰',
                  '۶۶٬۵۰۰٬۰۰۰',
                  '-۲.۵٪',
                ],
                [
                  'AirPods Pro 2',
                  'ایمالز',
                  '۱۱٬۲۰۰٬۰۰۰',
                  '۱۰٬۹۰۰٬۰۰۰',
                  '-۲.۶٪',
                ],
              ].map((r) => (
                <tr key={`${r[0] ?? ''}${r[1] ?? ''}`}>
                  {r.map((x = '', i) => (
                    <td
                      className={
                        i === 4
                          ? x.startsWith('-')
                            ? 'table-value'
                            : 'text-red-600'
                          : ''
                      }
                      key={x}
                    >
                      {x}
                    </td>
                  ))}
                  <td>امروز، ۱۲:۴۰</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminFrame>
  )
}

function FinancialReport() {
  return (
    <AdminFrame title='گزارش‌های مالی'>
      <PageHeading
        eyebrow='گزارش ارجاعی'
        title='عملکرد مالی پلتفرم'
        description='روک‌تین درآمد قطعی فروشگاه‌ها را ثبت نمی‌کند؛ این صفحه فقط شاخص‌های قابل مشاهده را نشان می‌دهد.'
        action={<button className='secondary-btn'>دریافت گزارش</button>}
      />

      <div className='admin-panel empty-financial'>
        <CircleDollarSign />
        <h3>داده مالی مستقیم موجود نیست</h3>
        <p>
          فروش و درآمد نهایی داخل سیستم فروشگاه‌ها انجام می‌شود. برای تحلیل
          مالی، گزارش کلیک خروجی، ارجاع و کمپین‌ها را بررسی کنید.
        </p>

        <div className='analytics-kpis'>
          <div>
            <span>کلیک خروجی</span>
            <b>۱٬۲۸۴٬۶۶۰</b>
          </div>
          <div>
            <span>ارجاع موفق</span>
            <b>۸۶٬۹۱۰</b>
          </div>
          <div>
            <span>کمپین فعال</span>
            <b>۱۲</b>
          </div>
        </div>
      </div>
    </AdminFrame>
  )
}

function SettingsPage() {
  const [saved, setSaved] = useState(false)

  return (
    <AdminFrame title='تنظیمات عمومی'>
      <PageHeading
        eyebrow='پیکربندی پلتفرم'
        title='تنظیمات عمومی'
        description='کنترل رفتارهای عمومی، اعلان‌ها و دسترسی‌های پیش‌فرض.'
        action={saved && <span className='status-badge success'>ذخیره شد</span>}
      />

      <div className='admin-settings-grid'>
        <div className='admin-panel'>
          <div className='panel-head'>
            <div>
              <b>تنظیمات عمومی</b>
              <span>اطلاعات نمایش‌داده‌شده در سایت</span>
            </div>
          </div>

          <label className='setting-row'>
            <span>نام پلتفرم</span>
            <input className='filter-input' defaultValue='روک‌تین' />
          </label>

          <label className='setting-row'>
            <span>توضیح کوتاه</span>
            <textarea
              className='filter-input min-h-24 py-3'
              defaultValue='مقایسه کن، هوشمندانه انتخاب کن'
            />
          </label>

          <label className='setting-row'>
            <span>نمایش آمار عمومی</span>
            <input type='checkbox' defaultChecked />
          </label>

          <button className='primary-btn' onClick={() => setSaved(true)}>
            ذخیره تغییرات
          </button>
        </div>

        <div className='admin-panel'>
          <div className='panel-head'>
            <div>
              <b>اعلان‌ها و امنیت</b>
              <span>کنترل رویدادهای حساس</span>
            </div>
          </div>

          {[
            'اعلان درخواست فروشگاه جدید',
            'اعلان تغییرات قیمت شدید',
            'ورود دومرحله‌ای مدیران',
            'ثبت همه فعالیت‌های مدیریتی',
          ].map((x, i) => (
            <label className='setting-toggle' key={x}>
              <span>
                {x}
                <small>
                  {i < 2 ? 'ارسال برای مدیران مربوطه' : 'توصیه‌شده برای امنیت'}
                </small>
              </span>
              <input type='checkbox' defaultChecked />
            </label>
          ))}
        </div>
      </div>
    </AdminFrame>
  )
}

export function AdminRouter({ section = 'dashboard' }: { section?: string }) {
  const router = useRouter()
  const { user, loading } = useAuth()
  const authorized = user?.role === 'admin'

  useEffect(() => {
    if (loading) return

    if (section === 'login') {
      router.replace(authorized ? '/admin' : '/login')
      return
    }

    if (!authorized) router.replace('/login')
  }, [authorized, loading, section, router])

  if (loading || !authorized || section === 'login') {
    return <div className='admin-loading'>در حال بررسی دسترسی...</div>
  }

  if (section === 'dashboard') return <Overview />
  if (section === 'analytics') return <Analytics />
  if (section === 'audit') return <AuditLogs />
  if (section === 'price-history') return <PriceHistory />
  if (section === 'financial') return <FinancialReport />
  if (section === 'settings') return <SettingsPage />

  const map: Record<string, [EntityKey, string]> = {
    users: ['users', 'همه کاربران'],
    sellers: ['sellers', 'مدیریت فروشندگان'],
    shops: ['shops', 'مدیریت فروشگاه‌ها'],
    applications: ['applications', 'درخواست‌های ثبت فروشگاه'],
    products: ['products', 'مدیریت محصولات'],
    categories: ['categories', 'دسته‌بندی‌ها'],
    brands: ['brands', 'مدیریت برندها'],
    offers: ['offers', 'پیشنهادهای فروش و قیمت‌ها'],
    reviews: ['reviews', 'نظرات و گزارش‌ها'],
    content: ['content', 'مدیریت محتوا'],
    admins: ['admins', 'مدیران سیستم'],
    financial: ['offers', 'گزارش‌های مالی'],
    settings: ['content', 'تنظیمات عمومی'],
  }

  const [entity, title] = map[section] || ['products', 'مدیریت محصولات']

  return <CrudTable entity={entity} title={title} />
}

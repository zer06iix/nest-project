'use client'

import {
	createContext,
	useContext,
	useCallback,
	useEffect,
	useMemo,
	useState,
	type ReactNode,
} from 'react'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000/api/v1'

export type UserRole = 'customer' | 'seller' | 'admin'
export type SellerApplicationStatus = 'pending' | 'approved' | 'rejected'

export interface User {
	id: string
	fullName: string
	email?: string
	phone: string
	role: UserRole
	avatar?: string
}

export interface SellerApplication {
	id: string
	userId: string
	shopName: string
	websiteUrl: string
	contactPhone: string
	category: string
	productCount: string
	description: string
	status: SellerApplicationStatus
	createdAt: string
}

type AuthContextValue = {
	user: User | null
	application: SellerApplication | null
	loading: boolean
	login: (identifier: string, password: string) => Promise<User>
	signup: (data: {
		fullName: string
		phone: string
		email?: string
		password: string
	}) => Promise<void>
	logout: () => void
	applyAsSeller: (data: Omit<SellerApplication, 'id' | 'userId' | 'status' | 'createdAt'>) => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export const USER_KEY = 'rookteen_user'
const APP_KEY = 'rookteen_seller_application'
export const TOKEN_KEY = 'rookteen_access_token'

function mapUser(payload: unknown, fallbackPhone?: string): User {
	const p = payload as Record<string, unknown> | undefined
	const backendRole = p?.role

	return {
		id: String(p?.id ?? p?.sub ?? p?.userId ?? crypto.randomUUID()),
		fullName: String(p?.displayName ?? p?.display_name ?? p?.fullName ?? p?.name ?? 'کاربر'),
		phone: String(p?.phoneNumber ?? p?.phone_number ?? p?.phone ?? fallbackPhone ?? ''),
		email: p?.email ? String(p.email) : undefined,
		role: backendRole === 'admin' ? 'admin' : backendRole === 'seller' ? 'seller' : 'customer',
		avatar: p?.avatar ? String(p.avatar) : undefined,
	}
}

interface AuthResponse<T = unknown> {
	success?: boolean
	statusCode?: number
	message?: string
	data?: T
}

async function fetchJson<T>(input: string, init?: RequestInit): Promise<T> {
	const res = await fetch(input, {
		...init,
		credentials: 'include',
		headers: { 'Content-Type': 'application/json', ...(init?.headers ?? {}) },
	})

	if (!res.ok) {
		const body = (await res.json().catch(() => ({}))) as Record<string, unknown>
		const msg = body?.message ?? body?.error ?? res.statusText
		throw new Error(typeof msg === 'string' ? msg : res.statusText)
	}

	return (await res.json()) as T
}

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null)
	const [application, setApplication] = useState<SellerApplication | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		try {
			const raw = localStorage.getItem(USER_KEY)
			if (raw) setUser(JSON.parse(raw))

			const appRaw = localStorage.getItem(APP_KEY)
			if (appRaw) setApplication(JSON.parse(appRaw))
		} finally {
			setLoading(false)
		}
	}, [])

	const persist = useCallback(
		(next: User | null, app = application) => {
			setUser(next)

			if (next) {
				localStorage.setItem(USER_KEY, JSON.stringify(next))
			} else {
				localStorage.removeItem(USER_KEY)
			}

			if (app) {
				localStorage.setItem(APP_KEY, JSON.stringify(app))
			}
		},
		[application]
	)

	const login = useCallback(
		async (identifier: string, password: string) => {
			const json = await fetchJson<AuthResponse<{ payload?: unknown; accessToken?: string }>>(
				`${API_URL}/auth/login`,
				{ method: 'POST', body: JSON.stringify({ phoneNumber: identifier, password }) }
			)

			const data = json.data ?? {}
			const token = data.accessToken

			if (!token) {
				throw new Error('توکن احراز هویت از سرور دریافت نشد.')
			}

			const payload: User = mapUser(data.payload, identifier)

			localStorage.setItem(TOKEN_KEY, token)
			persist(payload)

			return payload
		},
		[persist]
	)

	const signup = useCallback(
		async (data: { fullName: string; phone: string; email?: string; password: string }) => {
			const json = await fetchJson<AuthResponse<{ payload?: unknown; accessToken?: string }>>(
				`${API_URL}/auth/register`,
				{
					method: 'POST',
					body: JSON.stringify({
						phoneNumber: data.phone,
						displayName: data.fullName,
						password: data.password,
					}),
				}
			)

			const responseData = json.data ?? {}
			const token = responseData.accessToken

			if (!token) {
				throw new Error('توکن احراز هویت از سرور دریافت نشد.')
			}

			const payload: User = mapUser(responseData.payload, data.phone)

			localStorage.setItem(TOKEN_KEY, token)
			persist(payload)
		},
		[persist]
	)

	const logout = useCallback(() => {
		const token = localStorage.getItem(TOKEN_KEY)

		localStorage.removeItem(TOKEN_KEY)
		persist(null)
		setApplication(null)
		localStorage.removeItem(APP_KEY)

		void fetch(`${API_URL}/auth/logout`, {
			method: 'POST',
			credentials: 'include',
			headers: token ? { Authorization: `Bearer ${token}` } : undefined,
		}).catch(() => {})
	}, [persist])

	const applyAsSeller = useCallback(
		(data: Omit<SellerApplication, 'id' | 'userId' | 'status' | 'createdAt'>) => {
			if (!user) return

			const next: SellerApplication = {
				...data,
				id: crypto.randomUUID(),
				userId: user.id,
				status: 'pending',
				createdAt: new Date().toISOString(),
			}

			setApplication(next)
			localStorage.setItem(APP_KEY, JSON.stringify(next))
		},
		[user]
	)

	const value = useMemo<AuthContextValue>(
		() => ({ user, application, loading, login, signup, logout, applyAsSeller }),
		[user, application, loading, login, signup, logout, applyAsSeller]
	)

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
	const value = useContext(AuthContext)

	if (!value) {
		throw new Error('useAuth must be used inside AuthProvider')
	}

	return value
}

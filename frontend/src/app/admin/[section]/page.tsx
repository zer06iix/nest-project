import { AdminRouter } from '@/components/admin-ui'
export default async function AdminSectionPage({
	params,
}: {
	params: Promise<{ section: string }>
}) {
	const { section } = await params
	return <AdminRouter section={section} />
}

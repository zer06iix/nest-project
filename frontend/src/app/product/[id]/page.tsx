import {
  Header,
  ProductDetail,
  SectionHeading,
  ProductCard,
} from "@/components/marketplace";
import { getProduct, products } from "@/lib/mock-data";
export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProduct(id);
  return (
    <>
      <Header />
      <main className="container section">
        <ProductDetail product={product} />
        <div className="mt-12">
          <SectionHeading title="محصولات مشابه" href="/search" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {products
              .filter((p) => p.id !== product.id)
              .slice(0, 4)
              .map((p) => (
                <ProductCard product={p} key={p.id} />
              ))}
          </div>
        </div>
      </main>
    </>
  );
}

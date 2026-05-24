import ProductDetailView from '@/app/components/productDetails/ProductDetailView'
import { products } from '@/app/data/products'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

type ProductDetailsPageProps = {
  params: Promise<{ slug: string }>
}

const getProduct = (slug: string) =>
  products.find((product) => product.slug === slug)

export const generateStaticParams = () =>
  products.map((product) => ({
    slug: product.slug,
  }))

export const generateMetadata = async ({
  params,
}: ProductDetailsPageProps): Promise<Metadata> => {
  const { slug } = await params
  const product = getProduct(slug)

  if (!product) {
    return {
      title: 'Product Not Found | Prime Sentinel Insurance',
    }
  }

  return {
    title: `${product.title} | Prime Sentinel Insurance`,
    description: product.summary,
  }
}

const ProductDetailsPage = async ({ params }: ProductDetailsPageProps) => {
  const { slug } = await params
  const product = getProduct(slug)

  if (!product) {
    notFound()
  }

  return <ProductDetailView catalog={products} product={product} />
}

export default ProductDetailsPage

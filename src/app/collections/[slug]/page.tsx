import { notFound } from "next/navigation";
import { CollectionView } from "@/components/collection-view";
import type { Gender, ProductCategory } from "@/lib/catalog";

const collectionContent = {
  men: {
    title: "The men’s edit.",
    eyebrow: "Goat Mode · Men",
    description: "Everyday training concepts for the work, the pause, and everything between.",
  },
  women: {
    title: "The women’s edit.",
    eyebrow: "Goat Mode · Women",
    description: "A considered first look at movement-led pieces, shaped around your own rhythm.",
  },
  all: {
    title: "The collection.",
    eyebrow: "Goat Mode · Preview",
    description: "A first look at the Goat Mode direction. Explore the pieces as the collection takes shape.",
  },
} as const;

const validCategories: ProductCategory[] = ["Shirts", "Shorts", "Hoodies", "Leggings", "Tops"];

export function generateStaticParams() {
  return Object.keys(collectionContent).map((slug) => ({ slug }));
}

export default async function CollectionPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  if (!(slug in collectionContent)) notFound();
  const content = collectionContent[slug as keyof typeof collectionContent];
  const initialCategory = validCategories.find((category) => category.toLowerCase() === query.category?.toLowerCase());
  const gender: Gender | "all" = slug === "all" ? "all" : slug as Gender;

  return <CollectionView {...content} gender={gender} initialCategory={initialCategory} initialQuery={query.q || ""} />;
}

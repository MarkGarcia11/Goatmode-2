import { CollectionView } from "@/components/collection-view";

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  return <CollectionView title={q ? `Results for “${q}”.` : "Search the collection."} eyebrow="Goat Mode · Search" description="Explore the preview collection. Product details and prices are illustrative placeholders." gender="all" initialQuery={q} />;
}

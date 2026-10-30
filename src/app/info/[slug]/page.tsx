import { InfoContent } from "@/components/info-content";

const pages = ["faqs", "size-guide", "shipping", "returns", "privacy", "terms"];

export function generateStaticParams() {
  return pages.map((slug) => ({ slug }));
}

export default async function InformationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <InfoContent slug={slug} />;
}

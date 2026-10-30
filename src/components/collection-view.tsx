"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { products, type Gender, type Product, type ProductCategory } from "@/lib/catalog";
import { ProductCard } from "@/components/product-card";
import { Icon } from "@/components/icons";

const categories: ProductCategory[] = ["Shirts", "Shorts", "Hoodies", "Leggings", "Tops"];
const sizes = ["XS", "S", "M", "L", "XL"];
const priceCeiling = 100;

type CollectionViewProps = {
  title: string;
  eyebrow: string;
  description: string;
  gender?: Gender | "all";
  initialCategory?: ProductCategory;
  initialQuery?: string;
};

export function CollectionView({ title, eyebrow, description, gender = "all", initialCategory, initialQuery = "" }: CollectionViewProps) {
  const [selectedCategories, setSelectedCategories] = useState<ProductCategory[]>(initialCategory ? [initialCategory] : []);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(priceCeiling);
  const [sort, setSort] = useState("featured");
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(initialQuery);

  const availableColors = useMemo(() => {
    const base = gender === "all" ? products : products.filter((product) => product.gender === gender);
    return Array.from(new Set(base.flatMap((product) => product.colors.map((color) => color.name))));
  }, [gender]);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = searchTerm.trim().toLowerCase();
    const result = products.filter((product) => {
      if (gender !== "all" && product.gender !== gender) return false;
      if (selectedCategories.length && !selectedCategories.includes(product.category)) return false;
      if (selectedSizes.length && !selectedSizes.some((size) => product.sizes.includes(size))) return false;
      if (selectedColors.length && !product.colors.some((color) => selectedColors.includes(color.name))) return false;
      if (product.price > maxPrice) return false;
      if (normalizedQuery && !`${product.name} ${product.category} ${product.gender}`.toLowerCase().includes(normalizedQuery)) return false;
      return true;
    });
    if (sort === "price-low") result.sort((a, b) => a.price - b.price);
    if (sort === "price-high") result.sort((a, b) => b.price - a.price);
    if (sort === "name") result.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "newest") result.sort((a, b) => Number(Boolean(b.isNew)) - Number(Boolean(a.isNew)));
    return result;
  }, [gender, selectedCategories, selectedSizes, selectedColors, maxPrice, searchTerm, sort]);

  function toggleValue<T extends string>(value: T, values: T[], setter: (next: T[]) => void) {
    setter(values.includes(value) ? values.filter((item) => item !== value) : [...values, value]);
  }

  function clearFilters() {
    setSelectedCategories([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setMaxPrice(priceCeiling);
    setSearchTerm("");
  }

  const filterContent = (
    <>
      <div className="filter-panel__heading"><span>Refine your edit</span><button type="button" onClick={clearFilters}>Clear all</button></div>
      <details className="filter-group" open>
        <summary>Category <span>+</span></summary>
        <div className="filter-options">
          {categories.map((category) => (
            <label key={category} className="filter-option"><input type="checkbox" checked={selectedCategories.includes(category)} onChange={() => toggleValue(category, selectedCategories, setSelectedCategories)} /><span>{category}</span></label>
          ))}
        </div>
      </details>
      <details className="filter-group">
        <summary>Size <span>+</span></summary>
        <div className="filter-size-options">
          {sizes.map((size) => <button type="button" key={size} className={selectedSizes.includes(size) ? "is-selected" : ""} onClick={() => toggleValue(size, selectedSizes, setSelectedSizes)} aria-pressed={selectedSizes.includes(size)}>{size}</button>)}
        </div>
      </details>
      <details className="filter-group">
        <summary>Color <span>+</span></summary>
        <div className="filter-options">
          {availableColors.map((color) => <label key={color} className="filter-option"><input type="checkbox" checked={selectedColors.includes(color)} onChange={() => toggleValue(color, selectedColors, setSelectedColors)} /><span>{color}</span></label>)}
        </div>
      </details>
      <details className="filter-group" open>
        <summary>Sample price <span>+</span></summary>
        <div className="price-filter"><input type="range" min="40" max={priceCeiling} step="2" value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))} aria-label="Maximum sample price" /><div><span>$40</span><span>Up to ${maxPrice}</span></div></div>
      </details>
    </>
  );

  const heroImage = gender === "women" ? "/images/goat-mode-women.jpg" : gender === "men" ? "/images/goat-mode-men.jpg" : "/images/goat-mode-campaign.jpg";

  return (
    <main className="collection-page">
      <section className="collection-hero">
        <Image src={heroImage} alt="Goat Mode collection preview" fill priority sizes="100vw" className="collection-hero__image" />
        <div className="collection-hero__shade" />
        <div className="collection-hero__content page-gutter">
          <p className="eyebrow eyebrow--light">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{description}</p>
          <span className="collection-hero__note">A first look at the Goat Mode direction</span>
        </div>
        <span className="collection-hero__index">GOAT MODE · COLLECTION STUDY</span>
      </section>

      <section className="collection-products page-gutter">
        <div className="collection-intro">
          <div>
            <p className="eyebrow">The collection</p>
            <h2>Find your <em>form.</em></h2>
          </div>
          <p className="collection-intro__note">Product names, imagery, options and prices are sample placeholders for this preview.</p>
        </div>
        <div className="collection-toolbar">
          <div className="collection-toolbar__left">
            <button type="button" className="filter-toggle" onClick={() => setFilterOpen(true)} aria-expanded={filterOpen}><Icon name="plus" /> Filters <span className="filter-count">{selectedCategories.length + selectedSizes.length + selectedColors.length || ""}</span></button>
            <span className="product-count">{filteredProducts.length} pieces</span>
          </div>
          <label className="sort-control"><span>Sort by</span><select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort products"><option value="featured">Featured</option><option value="newest">New arrivals</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="name">Name</option></select></label>
        </div>
        {searchTerm && <div className="search-term-row">Showing results for “{searchTerm}” <button type="button" onClick={() => setSearchTerm("")}>Clear search</button></div>}
        <div className="collection-layout">
          <aside className="filter-panel filter-panel--desktop" aria-label="Product filters">{filterContent}</aside>
          <div className="collection-grid-wrap">
            {filteredProducts.length ? (
              <div className="product-grid product-grid--collection">
                {filteredProducts.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}
              </div>
            ) : (
              <div className="empty-results"><span className="eyebrow">A quieter moment</span><h3>No pieces found.</h3><p>Try a different combination or clear your filters to see the complete edit.</p><button type="button" className="text-link" onClick={clearFilters}>Clear filters <Icon name="arrow" /></button></div>
            )}
          </div>
        </div>
        <div className="collection-bottom-note"><span>GOAT MODE</span><span>Concept preview · sample product details</span></div>
      </section>

      <div className={`filter-backdrop ${filterOpen ? "is-open" : ""}`} onClick={() => setFilterOpen(false)} aria-hidden={!filterOpen} />
      <aside className={`filter-drawer ${filterOpen ? "is-open" : ""}`} aria-label="Mobile product filters" aria-hidden={!filterOpen}>
        <div className="filter-drawer__top"><span>Filters</span><button type="button" onClick={() => setFilterOpen(false)} aria-label="Close filters"><Icon name="close" /></button></div>
        {filterContent}
        <button type="button" className="button button--dark filter-drawer__apply" onClick={() => setFilterOpen(false)}>Show {filteredProducts.length} pieces <Icon name="arrow" /></button>
      </aside>
      <div className="collection-afterword"><Link href="/info/size-guide">Need a size guide? <Icon name="arrow" /></Link></div>
    </main>
  );
}

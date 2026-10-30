"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { formatPrice, type Product } from "@/lib/catalog";
import { useStore } from "@/components/store-provider";
import { Icon } from "@/components/icons";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addToCart } = useStore();
  const [quickOpen, setQuickOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(product.colors[0].name);

  function addQuickly() {
    if (!selectedSize) {
      setQuickOpen(true);
      return;
    }
    addToCart(product, selectedSize, selectedColor);
    setQuickOpen(false);
    setSelectedSize("");
  }

  return (
    <article className="product-card reveal" style={{ "--reveal-delay": `${Math.min(index % 4, 3) * 90}ms` } as React.CSSProperties}>
      <div className="product-card__visual">
        <Link href={`/products/${product.slug}`} className="product-card__image-link" aria-label={`View ${product.name}`}>
          <Image
            src={product.images[0]}
            alt={`${product.name} concept photography`}
            fill
            sizes="(max-width: 640px) 48vw, (max-width: 1024px) 30vw, 25vw"
            className="product-card__image"
          />
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt=""
              fill
              sizes="(max-width: 640px) 48vw, (max-width: 1024px) 30vw, 25vw"
              className="product-card__image product-card__image--alternate"
              aria-hidden="true"
            />
          )}
        </Link>
        <span className="product-card__preview">Preview</span>
        <button
          type="button"
          className="product-card__quick-trigger"
          onClick={() => setQuickOpen((open) => !open)}
          aria-expanded={quickOpen}
          aria-label={`Choose a size for ${product.name}`}
        >
          {quickOpen ? "Close" : "Quick add"}<Icon name={quickOpen ? "close" : "plus"} />
        </button>
        {quickOpen && (
          <div className="quick-size-panel" aria-label={`Choose a size for ${product.name}`}>
            <div className="quick-size-panel__top"><span>Select a preview size</span><button type="button" onClick={() => setQuickOpen(false)} aria-label="Close size selection"><Icon name="close" /></button></div>
            <div className="quick-size-panel__sizes">
              {product.sizes.map((size) => (
                <button
                  type="button"
                  key={size}
                  className={selectedSize === size ? "is-selected" : ""}
                  onClick={() => setSelectedSize(size)}
                  aria-pressed={selectedSize === size}
                >{size}</button>
              ))}
            </div>
            <button type="button" className="quick-size-panel__add" disabled={!selectedSize} onClick={addQuickly}>
              {selectedSize ? "Add to bag" : "Choose a size first"}<Icon name="arrow" />
            </button>
          </div>
        )}
      </div>
      <div className="product-card__meta">
        <div className="product-card__title-row">
          <div>
            <p className="product-card__category">{product.gender} / {product.category}</p>
            <Link href={`/products/${product.slug}`} className="product-card__name">{product.name}</Link>
          </div>
          <p className="product-card__price">{formatPrice(product.price)}<span>sample</span></p>
        </div>
        <div className="product-card__swatches" aria-label={`Color concepts for ${product.name}`}>
          {product.colors.map((color) => (
            <button
              key={color.name}
              type="button"
              aria-label={`${color.name} concept color`}
              aria-pressed={selectedColor === color.name}
              title={color.name}
              onClick={() => setSelectedColor(color.name)}
              className={`color-swatch ${selectedColor === color.name ? "is-selected" : ""}`}
              style={{ "--swatch": color.hex } as React.CSSProperties}
            />
          ))}
          <span className="product-card__color-name">{selectedColor}</span>
        </div>
      </div>
    </article>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/catalog";
import { formatPrice } from "@/lib/catalog";
import { useStore } from "@/components/store-provider";
import { Icon } from "@/components/icons";

export function ProductDetail({ product }: { product: Product }) {
  const { addToCart } = useStore();
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(product.colors[0].name);
  const [quantity, setQuantity] = useState(1);

  function handleAdd() {
    if (!selectedSize) return;
    addToCart(product, selectedSize, selectedColor, quantity);
  }

  return (
    <main className="product-detail-page">
      <div className="product-breadcrumb page-gutter"><Link href="/">Home</Link><span>/</span><Link href={`/collections/${product.gender}`}>{product.gender}</Link><span>/</span><span>{product.name}</span></div>
      <section className="product-detail page-gutter">
        <div className="product-gallery">
          <div className="product-gallery__main"><Image src={product.images[activeImage] || product.images[0]} alt={`${product.name} concept image ${activeImage + 1}`} fill priority sizes="(max-width: 800px) 100vw, 58vw" /></div>
          <div className="product-gallery__thumbs" aria-label="Product images">
            {product.images.map((image, index) => <button type="button" key={image} onClick={() => setActiveImage(index)} className={activeImage === index ? "is-active" : ""} aria-label={`View image ${index + 1}`} aria-pressed={activeImage === index}><Image src={image} alt="" fill sizes="100px" /></button>)}
          </div>
          <span className="product-gallery__index">CONCEPT IMAGE / 0{activeImage + 1}</span>
        </div>

        <div className="product-info">
          <div className="product-info__topline"><p className="eyebrow">{product.gender} / {product.category}</p><span className="preview-stamp">PREVIEW PIECE</span></div>
          <h1>{product.name}</h1>
          <div className="product-info__price">{formatPrice(product.price)} <span>sample price</span></div>
          <p className="product-info__description">{product.description}</p>
          <p className="product-concept-note">This is an illustrative product concept. Final product specifications, pricing and availability have not yet been confirmed.</p>

          <div className="product-option-group">
            <div className="product-option-heading"><span>Color</span><span>{selectedColor}</span></div>
            <div className="product-color-options">{product.colors.map((color) => <button type="button" key={color.name} style={{ "--swatch": color.hex } as React.CSSProperties} className={`color-swatch color-swatch--large ${selectedColor === color.name ? "is-selected" : ""}`} onClick={() => setSelectedColor(color.name)} aria-pressed={selectedColor === color.name} aria-label={`Select ${color.name}`} title={color.name} />)}</div>
          </div>

          <div className="product-option-group">
            <div className="product-option-heading"><span>Preview size</span><Link href="/info/size-guide">Size guide <Icon name="arrow" /></Link></div>
            <div className="product-size-options" role="group" aria-label="Select a size">
              {product.sizes.map((size) => <button type="button" key={size} className={selectedSize === size ? "is-selected" : ""} onClick={() => setSelectedSize(size)} aria-pressed={selectedSize === size}>{size}</button>)}
            </div>
            {!selectedSize && <p className="size-helper">Choose a size to add this preview piece to your bag.</p>}
          </div>

          <div className="product-buy-row"><div className="quantity-stepper quantity-stepper--large"><button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Decrease quantity"><Icon name="minus" /></button><span>{quantity}</span><button type="button" onClick={() => setQuantity((value) => Math.min(10, value + 1))} aria-label="Increase quantity"><Icon name="plus" /></button></div><button type="button" className="button button--dark product-add-button" onClick={handleAdd} disabled={!selectedSize}>Add to bag <Icon name="arrow" /></button></div>
          <p className="product-payment-note">Checkout is not active in this preview. Adding to your bag does not place an order.</p>

          <div className="product-accordions">
            <details open><summary>About this concept <Icon name="plus" /></summary><p>{product.description} All visible product colors and selections are creative placeholders while the range is being developed.</p></details>
            <details><summary>Fit & product details <Icon name="plus" /></summary><p>Final size measurements, fit notes, materials and care information will be added once verified. The current options are for interface demonstration only.</p></details>
            <details><summary>Shipping & returns <Icon name="plus" /></summary><p>No orders are being accepted yet. Shipping and return information will be published before the store opens.</p></details>
          </div>
          <div className="product-detail-footnote"><span>GOAT MODE · PRODUCT STUDY</span><span>DETAILS SUBJECT TO CONFIRMATION</span></div>
        </div>
      </section>
      <section className="product-related page-gutter"><p className="eyebrow">The wider edit</p><h2>More to <em>explore.</em></h2><Link className="text-link" href={`/collections/${product.gender}`}>View the {product.gender} collection <Icon name="arrow" /></Link></section>
      <div className="mobile-product-add"><div><span>{product.name}</span><strong>{formatPrice(product.price)} <small>sample</small></strong></div><button type="button" className="button button--dark" disabled={!selectedSize} onClick={handleAdd}>Add to bag <Icon name="arrow" /></button></div>
    </main>
  );
}

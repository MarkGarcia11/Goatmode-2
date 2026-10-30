"use client";

import Image from "next/image";
import Link from "next/link";
import { getProduct, formatPrice } from "@/lib/catalog";
import { useStore } from "@/components/store-provider";
import { Icon } from "@/components/icons";

export function CartPage() {
  const { items, updateQuantity, removeItem } = useStore();
  const lines = items.map((item) => ({ item, product: getProduct(item.productSlug) })).filter((line): line is { item: typeof items[number]; product: NonNullable<ReturnType<typeof getProduct>> } => Boolean(line.product));
  const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.item.quantity, 0);

  return (
    <main className="cart-page page-gutter">
      <div className="cart-page__intro"><p className="eyebrow">A few things for the journey</p><h1>Your <em>bag.</em></h1><span>{lines.reduce((count, line) => count + line.item.quantity, 0)} preview pieces</span></div>
      {lines.length ? (
        <div className="cart-page__layout">
          <section className="cart-page__items" aria-label="Items in your bag">
            {lines.map(({ item, product }) => (
              <article className="cart-line" key={item.lineId}>
                <Link href={`/products/${product.slug}`} className="cart-line__image"><Image src={product.images[0]} alt={product.name} fill sizes="170px" /></Link>
                <div className="cart-line__info"><p className="eyebrow">{product.gender} / {product.category}</p><Link href={`/products/${product.slug}`} className="cart-line__name">{product.name}</Link><p className="cart-line__variant">{item.color} · Preview size {item.size}</p><span className="cart-line__unit">{formatPrice(product.price)} <small>sample</small></span><div className="cart-line__controls"><div className="quantity-stepper"><button type="button" onClick={() => updateQuantity(item.lineId, item.quantity - 1)} aria-label={`Decrease ${product.name} quantity`}><Icon name="minus" /></button><span>{item.quantity}</span><button type="button" onClick={() => updateQuantity(item.lineId, item.quantity + 1)} aria-label={`Increase ${product.name} quantity`}><Icon name="plus" /></button></div><button className="cart-line__remove" type="button" onClick={() => removeItem(item.lineId)}>Remove</button></div></div>
                <strong className="cart-line__total">{formatPrice(product.price * item.quantity)}</strong>
              </article>
            ))}
            <Link className="text-link cart-page__continue" href="/collections/all">Continue exploring <Icon name="arrow" /></Link>
          </section>
          <aside className="cart-summary"><p className="eyebrow">The overview</p><div className="cart-summary__row"><span>Sample subtotal</span><strong>{formatPrice(subtotal)}</strong></div><div className="cart-summary__row cart-summary__row--muted"><span>Shipping</span><span>Details to come</span></div><p className="cart-summary__note">These prices and product details are illustrative only. No payment will be taken.</p><Link className="button button--dark cart-summary__checkout" href="/checkout">Continue to checkout <Icon name="arrow" /></Link><span className="cart-summary__secure">Checkout will be available when a payment provider is configured.</span></aside>
        </div>
      ) : (
        <div className="cart-empty"><span className="cart-empty__icon"><Icon name="bag" /></span><h2>Room for something good.</h2><p>Your bag is empty for now. Take a look around the preview collection.</p><Link className="button button--dark" href="/collections/all">Explore the collection <Icon name="arrow" /></Link></div>
      )}
    </main>
  );
}

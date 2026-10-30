"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, ReactNode, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { products, formatPrice, getProduct } from "@/lib/catalog";
import { StoreProvider, useStore } from "@/components/store-provider";
import { Icon } from "@/components/icons";

function AnnouncementBar() {
  const pathname = usePathname();
  const anchor = pathname === "/" ? "#new-arrivals" : "/#new-arrivals";
  return (
    <div className="announcement-bar">
      <span className="announcement-bar__dot" aria-hidden="true" />
      <p>A first look at Goat Mode <span>·</span> concept preview</p>
      <Link href={anchor}>Explore <Icon name="arrow" /></Link>
    </div>
  );
}

function Header() {
  const pathname = usePathname();
  const { itemCount, openCart } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const isHome = pathname === "/";
  const searchMatches = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return [];
    return products.filter((product) => `${product.name} ${product.gender} ${product.category}`.toLowerCase().includes(query)).slice(0, 4);
  }, [searchTerm]);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 28);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = searchTerm.trim();
    if (!query) return;
    window.location.href = `/search?q=${encodeURIComponent(query)}`;
  }

  const closeMenu = () => setMenuOpen(false);
  const headerClass = `site-header ${isHome && !scrolled ? "site-header--over-hero" : "site-header--solid"} ${scrolled ? "site-header--scrolled" : ""}`;

  return (
    <>
      <AnnouncementBar />
      <header className={headerClass}>
        <div className="site-header__inner page-gutter">
          <button className="header-icon header-icon--menu" type="button" onClick={() => setMenuOpen(true)} aria-label="Open navigation" aria-expanded={menuOpen}><Icon name="menu" /></button>
          <Link href="/" className="site-logo" aria-label="Goat Mode home">
            <Image src="/TY.svg" alt="Goat Mode" width={220} height={81} priority className="site-logo__image" />
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            <Link href="/collections/men">Men</Link>
            <Link href="/collections/women">Women</Link>
            <Link href="/#new-arrivals">New arrivals</Link>
            <Link href="/#story">Our story</Link>
            <Link href="/contact">Contact</Link>
          </nav>
          <div className="header-actions">
            <button className="header-icon" type="button" aria-label="Search products" onClick={() => setSearchOpen(true)}><Icon name="search" /></button>
            <Link className="header-icon header-icon--account" href="/account" aria-label="Account"><Icon name="user" /></Link>
            <button className="header-icon header-icon--bag" type="button" onClick={openCart} aria-label={`Shopping bag, ${itemCount} items`}>
              <Icon name="bag" />{itemCount > 0 && <span className="bag-count" key={itemCount}>{itemCount}</span>}
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <div className="mobile-menu__top"><Link href="/" onClick={closeMenu}><Image src="/TY.svg" alt="Goat Mode" width={164} height={61} /></Link><button type="button" onClick={closeMenu} aria-label="Close navigation"><Icon name="close" /></button></div>
        <nav aria-label="Mobile navigation">
          <Link href="/collections/men" onClick={closeMenu}><span>01</span>Men<Icon name="arrow" /></Link>
          <Link href="/collections/women" onClick={closeMenu}><span>02</span>Women<Icon name="arrow" /></Link>
          <Link href="/#new-arrivals" onClick={closeMenu}><span>03</span>New arrivals<Icon name="arrow" /></Link>
          <Link href="/#story" onClick={closeMenu}><span>04</span>Our story<Icon name="arrow" /></Link>
          <Link href="/contact" onClick={closeMenu}><span>05</span>Contact<Icon name="arrow" /></Link>
        </nav>
        <p className="mobile-menu__note">A practice of showing up, in your own way.</p>
      </div>
      <button className={`mobile-menu-scrim ${menuOpen ? "is-open" : ""}`} onClick={closeMenu} aria-label="Close navigation" tabIndex={menuOpen ? 0 : -1} />

      <div className={`search-overlay ${searchOpen ? "is-open" : ""}`} aria-hidden={!searchOpen}>
        <div className="search-overlay__inner">
          <div className="search-overlay__top"><span className="eyebrow">Search the collection</span><button type="button" onClick={() => setSearchOpen(false)} aria-label="Close search"><Icon name="close" /></button></div>
          <form className="search-form" onSubmit={submitSearch}>
            <label htmlFor="site-search" className="sr-only">Search Goat Mode</label>
            <input id="site-search" type="search" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="What are you looking for?" autoComplete="off" />
            <button type="submit" aria-label="Submit search"><Icon name="arrow" /></button>
          </form>
          {searchTerm.trim() ? (
            <div className="search-suggestions" aria-live="polite">
              <p>{searchMatches.length ? "Matching preview pieces" : "No matching pieces yet"}</p>
              {searchMatches.map((product) => <Link href={`/products/${product.slug}`} key={product.id} onClick={() => setSearchOpen(false)}><span>{product.name}</span><span>{product.gender} / {product.category}</span><Icon name="arrow" /></Link>)}
              {searchMatches.length === 0 && <Link href={`/search?q=${encodeURIComponent(searchTerm)}`} onClick={() => setSearchOpen(false)}>Search all collections <Icon name="arrow" /></Link>}
            </div>
          ) : <p className="search-hint">Try “leggings”, “shorts”, or “training tee”.</p>}
        </div>
      </div>

      <CartDrawer />
    </>
  );
}

function CartDrawer() {
  const { items, isCartOpen, closeCart, updateQuantity, removeItem } = useStore();
  const lines = items.map((item) => ({ item, product: getProduct(item.productSlug) })).filter((line): line is { item: typeof items[number]; product: NonNullable<ReturnType<typeof getProduct>> } => Boolean(line.product));
  const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.item.quantity, 0);

  useEffect(() => {
    if (!isCartOpen) return;
    function onKeyDown(event: KeyboardEvent) { if (event.key === "Escape") closeCart(); }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isCartOpen, closeCart]);

  return (
    <>
      <button className={`cart-scrim ${isCartOpen ? "is-open" : ""}`} onClick={closeCart} aria-label="Close shopping bag" tabIndex={isCartOpen ? 0 : -1} />
      <aside className={`cart-drawer ${isCartOpen ? "is-open" : ""}`} aria-label="Shopping bag" aria-hidden={!isCartOpen}>
        <div className="cart-drawer__head"><div><span className="eyebrow">Your selection</span><h2>Shopping bag <span>({items.reduce((count, item) => count + item.quantity, 0)})</span></h2></div><button type="button" onClick={closeCart} aria-label="Close shopping bag"><Icon name="close" /></button></div>
        {lines.length ? (
          <>
            <div className="cart-drawer__items">
              {lines.map(({ item, product }) => (
                <article className="mini-cart-line" key={item.lineId}>
                  <Link href={`/products/${product.slug}`} onClick={closeCart} className="mini-cart-line__image"><Image src={product.images[0]} alt={product.name} fill sizes="90px" /></Link>
                  <div className="mini-cart-line__details"><Link href={`/products/${product.slug}`} onClick={closeCart}>{product.name}</Link><p>{item.color} · Size {item.size}</p><div className="mini-cart-line__bottom"><div className="quantity-stepper"><button type="button" onClick={() => updateQuantity(item.lineId, item.quantity - 1)} aria-label={`Decrease ${product.name} quantity`}><Icon name="minus" /></button><span>{item.quantity}</span><button type="button" onClick={() => updateQuantity(item.lineId, item.quantity + 1)} aria-label={`Increase ${product.name} quantity`}><Icon name="plus" /></button></div><span>{formatPrice(product.price * item.quantity)}</span></div><button type="button" className="mini-cart-line__remove" onClick={() => removeItem(item.lineId)}>Remove</button></div>
                </article>
              ))}
            </div>
            <div className="cart-drawer__foot"><div className="cart-subtotal"><span>Sample subtotal</span><span>{formatPrice(subtotal)}</span></div><p>Preview prices only. Checkout is not active yet.</p><Link className="button button--dark" href="/cart" onClick={closeCart}>View bag <Icon name="arrow" /></Link><Link className="cart-drawer__continue" href="/collections/all" onClick={closeCart}>Continue exploring</Link></div>
          </>
        ) : (
          <div className="cart-drawer__empty"><div className="cart-drawer__empty-mark"><Icon name="bag" /></div><h3>Your bag is taking a breath.</h3><p>There’s nothing in it just yet. Explore the collection when you’re ready.</p><Link className="button button--dark" href="/collections/all" onClick={closeCart}>Explore the collection <Icon name="arrow" /></Link></div>
        )}
      </aside>
    </>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__top page-gutter">
        <div className="site-footer__brand"><Link href="/" className="footer-logo"><Image src="/TY.svg" alt="Goat Mode" width={225} height={83} /></Link><p>Move with intention.<br />Make the journey your own.</p><span className="footer-brand-index">GOAT MODE · EST. IN THE MAKING</span></div>
        <div className="footer-column"><h2>Shop</h2><Link href="/collections/men">Men</Link><Link href="/collections/women">Women</Link><Link href="/collections/all">All products</Link><Link href="/#new-arrivals">New arrivals</Link></div>
        <div className="footer-column"><h2>Discover</h2><Link href="/#story">Our story</Link><Link href="/info/faqs">FAQs</Link><Link href="/info/size-guide">Size guide</Link><Link href="/contact">Contact</Link></div>
        <div className="footer-column"><h2>Customer care</h2><Link href="/info/shipping">Shipping</Link><Link href="/info/returns">Returns</Link><Link href="/info/privacy">Privacy</Link><Link href="/info/terms">Terms</Link></div>
        <div className="footer-column footer-column--social"><h2>Stay in the loop</h2><p>Social channels coming soon.</p><span><Icon name="instagram" /> Instagram</span><span><Icon name="tiktok" /> TikTok</span></div>
      </div>
      <div className="site-footer__bottom page-gutter"><span>© {new Date().getFullYear()} Goat Mode</span><span>Product imagery and pricing in this preview are illustrative.</span><span>Made for the long game <b>↗</b></span></div>
    </footer>
  );
}

function PageLoader() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const timeout = window.setTimeout(() => setVisible(false), 850);
    return () => window.clearTimeout(timeout);
  }, []);
  return (
    <div className={`page-loader ${visible ? "is-visible" : "is-hidden"}`} aria-hidden={!visible}>
      <div className="page-loader__content"><Image src="/TY.svg" alt="Goat Mode" width={240} height={88} priority className="page-loader__logo" /><span className="page-loader__caption">FIND YOUR OWN MODE</span><span className="page-loader__track"><i /></span></div>
    </div>
  );
}

function SiteChrome({ children }: { children: ReactNode }) {
  return <><PageLoader /><Header /><div className="site-content">{children}</div><Footer /></>;
}

export function SiteShell({ children }: { children: ReactNode }) {
  return <StoreProvider><SiteChrome>{children}</SiteChrome></StoreProvider>;
}

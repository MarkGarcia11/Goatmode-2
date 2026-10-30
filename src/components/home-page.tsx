"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { newArrivals, sampleEdit } from "@/lib/catalog";
import { ProductCard } from "@/components/product-card";
import { NewsletterForm } from "@/components/newsletter-form";
import { Icon } from "@/components/icons";

const categories = [
  { label: "Men’s shirts", note: "01 / The training layer", image: "/images/product-training-tee.jpg", href: "/collections/men?category=Shirts" },
  { label: "Men’s shorts", note: "02 / Move freely", image: "/images/product-training-short.jpg", href: "/collections/men?category=Shorts" },
  { label: "Men’s hoodies", note: "03 / Take it slower", image: "/images/product-hoodie.jpg", href: "/collections/men?category=Hoodies" },
  { label: "Women’s leggings", note: "04 / Find your form", image: "/images/product-leggings.jpg", href: "/collections/women?category=Leggings" },
  { label: "Women’s tops", note: "05 / The studio edit", image: "/images/goat-mode-women.jpg", href: "/collections/women?category=Tops" },
  { label: "Women’s shorts", note: "06 / Everyday movement", image: "/images/goat-mode-community.jpg", href: "/collections/women?category=Shorts" },
];

const galleryImages = [
  { src: "/images/goat-mode-community.jpg", alt: "A quiet moment before a training session", caption: "Before the first move" },
  { src: "/images/goat-mode-men.jpg", alt: "Men’s collection concept in warm studio light", caption: "A study in everyday form" },
  { src: "/images/goat-mode-story.jpg", alt: "A pause after movement in early morning light", caption: "Space to find your rhythm" },
  { src: "/images/goat-mode-women.jpg", alt: "Women’s collection concept in a sunlit studio", caption: "Movement, your way" },
  { src: "/images/product-hoodie.jpg", alt: "Softly lit hoodie concept against warm stone", caption: "The slower hours" },
];

export function HomePage() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    const revealNodes = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) {
      revealNodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    revealNodes.forEach((node) => observer.observe(node));

    const parallaxNodes = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    let frame = 0;
    const updateParallax = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const height = window.innerHeight || 1;
        parallaxNodes.forEach((node) => {
          const bounds = node.getBoundingClientRect();
          if (bounds.bottom < 0 || bounds.top > height) return;
          const progress = (height - bounds.top) / (height + bounds.height) - 0.5;
          node.style.setProperty("--parallax-y", `${Math.round(progress * -18)}px`);
        });
      });
    };
    window.addEventListener("scroll", updateParallax, { passive: true });
    updateParallax();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateParallax);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (lightbox === null) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setLightbox(null);
      if (event.key === "ArrowRight") setLightbox((value) => value === null ? null : (value + 1) % galleryImages.length);
      if (event.key === "ArrowLeft") setLightbox((value) => value === null ? null : (value + galleryImages.length - 1) % galleryImages.length);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  return (
    <main className="home-page">
      <section className="hero" aria-labelledby="hero-title">
        <Image src="/images/goat-mode-hero.jpg" alt="Two athletes in a quiet, sunlit architectural setting" fill priority sizes="100vw" className="hero__image" />
        <div className="hero__wash" />
        <div className="hero__copy page-gutter">
          <p className="eyebrow eyebrow--light hero__eyebrow"><span className="eyebrow-line" /> An activewear study · 01</p>
          <h1 id="hero-title" className="hero__title"><span className="hero__line"><span>Built for</span></span><span className="hero__line hero__line--serif"><span>your journey.</span></span></h1>
          <p className="hero__intro">Move with confidence. Find your rhythm.<br className="desktop-only" /> Make every movement your own.</p>
          <div className="hero__actions"><Link className="button button--light" href="/collections/all">Explore the collection <Icon name="arrow" /></Link><Link className="hero__text-link" href="#story">A little about us <span>↓</span></Link></div>
        </div>
        <div className="hero__side-note"><span>GOAT MODE</span><i /> <span>EVERY MOVE, YOURS</span></div>
        <div className="hero__bottom page-gutter"><span>01 — 06 / A PRACTICE, NOT A FINISH LINE</span><a href="#collections">Scroll to explore <span>↓</span></a></div>
      </section>

      <section className="collections-section page-gutter" id="collections">
        <div className="section-heading section-heading--split reveal">
          <div><p className="eyebrow">Made for every kind of movement</p><h2>Find your <em>mode.</em></h2></div>
          <p>Two collections. One common thread: showing up in a way that feels like yours.</p>
        </div>
        <div className="collection-panels">
          <Link href="/collections/men" className="collection-panel collection-panel--men reveal">
            <Image src="/images/goat-mode-men.jpg" alt="Men’s collection concept in a sunlit concrete studio" fill sizes="(max-width: 760px) 100vw, 50vw" />
            <span className="collection-panel__number">01 / MEN</span><div className="collection-panel__bottom"><div><span className="eyebrow eyebrow--light">The men’s collection</span><h3>Move with<br /><em>intention.</em></h3><p>Everyday pieces for the work, the pause, and everything between.</p></div><span className="round-arrow"><Icon name="arrow" /></span></div>
          </Link>
          <Link href="/collections/women" className="collection-panel collection-panel--women reveal">
            <Image src="/images/goat-mode-women.jpg" alt="Women’s collection concept in warm studio light" fill sizes="(max-width: 760px) 100vw, 50vw" />
            <span className="collection-panel__number">02 / WOMEN</span><div className="collection-panel__bottom"><div><span className="eyebrow eyebrow--light">The women’s collection</span><h3>Find your<br /><em>own rhythm.</em></h3><p>Quiet confidence for wherever your day takes you.</p></div><span className="round-arrow"><Icon name="arrow" /></span></div>
          </Link>
        </div>
      </section>

      <section className="arrivals-section page-gutter" id="new-arrivals">
        <div className="section-heading section-heading--arrivals reveal">
          <div><p className="eyebrow">A first look · sample edit</p><h2>New to the <em>rotation.</em></h2></div>
          <div className="arrivals-heading-side"><p>Early concepts for the pieces that make getting there feel like part of the day.</p><Link className="text-link" href="/collections/all">Explore all pieces <Icon name="arrow" /></Link></div>
        </div>
        <div className="product-grid product-grid--home">{newArrivals.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}</div>
        <div className="demo-note"><span className="demo-note__mark">i</span><span>Product names, imagery, available options and prices are illustrative placeholders for this concept preview.</span></div>
      </section>

      <section className="story-section page-gutter" id="story">
        <div className="story-layout">
          <div className="story-image-frame reveal">
            <Image src="/images/goat-mode-story.jpg" alt="A thoughtful pause after movement in early morning light" fill sizes="(max-width: 800px) 100vw, 58vw" data-parallax />
            <span className="story-image-caption">A moment to come back to yourself · 06:12 AM</span>
            <span className="story-image-index">STUDY 002 / THE PAUSE</span>
          </div>
          <div className="story-copy reveal">
            <p className="eyebrow">A point of view, still taking shape</p>
            <h2>More than<br />what you <em>wear.</em></h2>
            <p className="story-copy__lead">Every journey begins somewhere. Every movement brings you closer to who you want to become.</p>
            <p>We believe what you wear should move with you, support your rhythm, and help you feel like yourself along the way. No finish line required.</p>
            <Link className="text-link" href="/our-story">Discover our story <Icon name="arrow" /></Link>
            <span className="story-copy__signature">YOUR PACE. YOUR JOURNEY.</span>
          </div>
        </div>
      </section>

      <section className="campaign-section">
        <Image src="/images/goat-mode-campaign.jpg" alt="Two athletes moving together along a quiet coastal path" fill sizes="100vw" className="campaign-section__image" data-parallax />
        <div className="campaign-section__wash" />
        <div className="campaign-section__content page-gutter reveal">
          <p className="eyebrow eyebrow--light">A reminder to keep your own pace</p>
          <h2>There is no<br /><em>one way.</em></h2>
          <Link className="button button--light" href="/collections/all">Find your everyday <Icon name="arrow" /></Link>
        </div>
        <span className="campaign-section__vertical">THE JOURNEY IS THE POINT · GOAT MODE</span>
        <span className="campaign-section__caption">CAMPAIGN STUDY 003 / OUTSIDE, IN YOUR OWN TIME</span>
      </section>

      <section className="category-section page-gutter">
        <div className="category-heading reveal"><div><p className="eyebrow">Take the route that feels right</p><h2>Shop by <em>category.</em></h2></div><span>06 EDITS<br />01 DIRECTION</span></div>
        <div className="category-grid">
          {categories.map((category, index) => (
            <Link href={category.href} key={category.label} className={`category-card category-card--${index + 1} reveal`} style={{ "--reveal-delay": `${(index % 3) * 80}ms` } as React.CSSProperties}>
              <div className="category-card__image"><Image src={category.image} alt={`${category.label} concept`} fill sizes="(max-width: 700px) 50vw, 25vw" /></div>
              <div className="category-card__meta"><span>{category.note}</span><span className="category-card__arrow"><Icon name="arrow" /></span></div>
              <h3>{category.label}</h3>
            </Link>
          ))}
        </div>
      </section>

      <section className="core-edit-section">
        <div className="core-edit-section__inner page-gutter">
          <div className="core-edit-copy reveal"><p className="eyebrow eyebrow--light">An early edit · not sales-ranked</p><h2>Keep what<br />keeps you <em>moving.</em></h2><p>A sample selection of everyday concepts. These pieces are not ranked by sales; product details will evolve before launch.</p><Link href="/collections/all" className="button button--outline-light">See the full preview <Icon name="arrow" /></Link><span className="core-edit-index">GOAT MODE / SAMPLE EDIT 002</span></div>
          <div className="core-edit-products">{sampleEdit.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}</div>
        </div>
      </section>

      <section className="values-section page-gutter">
        <div className="values-heading reveal"><p className="eyebrow">A few things we believe</p><h2>Good days are<br /><em>built, not found.</em></h2></div>
        <div className="values-list">
          <article className="value-item reveal"><span>01</span><div><h3>Your movement, your measure.</h3><p>There is no single right way to begin. The important part is making it your own.</p></div><Icon name="arrow" /></article>
          <article className="value-item reveal"><span>02</span><div><h3>Room for the everyday.</h3><p>Make space for the small rituals that help you feel more like yourself.</p></div><Icon name="arrow" /></article>
          <article className="value-item reveal"><span>03</span><div><h3>Keep showing up.</h3><p>Progress has its own pace. Give it a little room to unfold.</p></div><Icon name="arrow" /></article>
        </div>
        <p className="values-disclaimer">Brand principles shown for direction; product-specific performance and material claims will only be added once verified.</p>
      </section>

      <section className="community-section page-gutter">
        <div className="community-heading reveal"><div><p className="eyebrow">The journey doesn't stop here</p><h2>In good <em>company.</em></h2></div><p>Campaign moments, quiet rituals, and everyday movement. A community is something we’ll build together.</p></div>
        <div className="community-gallery">
          {galleryImages.map((image, index) => <button type="button" className={`community-tile community-tile--${index + 1} reveal`} key={image.src} onClick={() => setLightbox(index)} aria-label={`Open image: ${image.caption}`}><Image src={image.src} alt={image.alt} fill sizes="(max-width: 650px) 50vw, 20vw" /><span>{image.caption}<Icon name="arrow" /></span></button>)}
        </div>
        <div className="community-follow"><span>GOAT MODE / A COMMUNITY IN THE MAKING</span><p>Social channels coming soon.</p></div>
      </section>

      <section className="newsletter-section page-gutter" id="newsletter">
        <div className="newsletter-section__content reveal"><p className="eyebrow">A note from the beginning</p><h2>Be part of<br />what’s <em>next.</em></h2><p>First access to collection news, launches, and the little things we’re learning along the way.</p></div>
        <div className="newsletter-section__form reveal"><NewsletterForm /><span className="newsletter-orbit">GOAT MODE<br />YOUR NEXT CHAPTER</span></div>
      </section>

      {lightbox !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Campaign image preview" onClick={() => setLightbox(null)}><button type="button" className="lightbox__close" onClick={() => setLightbox(null)} aria-label="Close image"><Icon name="close" /></button><div className="lightbox__image" onClick={(event) => event.stopPropagation()}><Image src={galleryImages[lightbox].src} alt={galleryImages[lightbox].alt} fill sizes="90vw" /><p>{galleryImages[lightbox].caption}</p></div><button type="button" className="lightbox__nav lightbox__nav--prev" onClick={(event) => { event.stopPropagation(); setLightbox((lightbox + galleryImages.length - 1) % galleryImages.length); }} aria-label="Previous image">←</button><button type="button" className="lightbox__nav lightbox__nav--next" onClick={(event) => { event.stopPropagation(); setLightbox((lightbox + 1) % galleryImages.length); }} aria-label="Next image">→</button></div>}
    </main>
  );
}

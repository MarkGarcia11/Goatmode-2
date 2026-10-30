import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/icons";

export default function OurStoryPage() {
  return (
    <main className="our-story-page">
      <section className="our-story-hero page-gutter"><p className="eyebrow">A story still being written</p><h1>We’re not here<br />to tell you <em>who to be.</em></h1><p>We’re here to make a little more room for you to become.</p></section>
      <section className="our-story-body page-gutter"><div className="our-story-image"><Image src="/images/goat-mode-story.jpg" alt="A quiet moment of reflection after movement" fill sizes="(max-width: 800px) 100vw, 55vw" /></div><div className="our-story-copy"><p className="eyebrow">A beginning, not a biography</p><h2>Every journey<br />starts <em>somewhere.</em></h2><p>Goat Mode began with a simple belief: showing up for yourself should feel personal. Not a competition. Not a finish line. Just the next movement, at a pace that belongs to you.</p><p>This brand is being built from the ground up, one considered choice at a time. The collection shown here is a creative preview; product details will follow as they’re confirmed.</p><Link href="/collections/all" className="text-link">See the collection taking shape <Icon name="arrow" /></Link></div></section>
      <section className="our-story-quote page-gutter"><span>GOAT MODE / A NOTE TO SELF</span><blockquote>“Your pace.<br /><em>Your journey.</em>”</blockquote><Link className="button button--light" href="/contact">Be part of what’s next <Icon name="arrow" /></Link></section>
    </main>
  );
}

import Link from "next/link";
import { Icon } from "@/components/icons";

const infoPages: Record<string, { label: string; title: string; intro: string; sections: { heading: string; body: string }[] }> = {
  faqs: {
    label: "A few useful things",
    title: "Questions, for now.",
    intro: "Goat Mode is taking shape. These answers reflect the current concept preview, not a live store.",
    sections: [
      { heading: "Can I place an order?", body: "Not yet. This site is a brand and shopping experience preview. Checkout is intentionally not connected to a payment provider." },
      { heading: "Are the products and prices final?", body: "No. Product names, images, colors, size options and prices are illustrative placeholders while the collection is being developed." },
      { heading: "Where can I find material and fit details?", body: "Verified product specifications are not available yet. We’ll publish fit, fabric and care information once those details are confirmed." },
      { heading: "How can I stay up to date?", body: "Join the newsletter for collection news and launch updates. You can unsubscribe from future emails at any time." },
    ],
  },
  "size-guide": {
    label: "Finding your fit",
    title: "A size guide, soon.",
    intro: "Accurate measurements matter. We’re waiting for confirmed product samples before publishing sizing advice.",
    sections: [
      { heading: "Why isn’t there a chart yet?", body: "The sizes shown on preview products are for interface demonstration only. No measurements or fit claims have been verified." },
      { heading: "What should I do before ordering?", body: "The store is not accepting orders. A detailed, product-specific size guide will be available before launch." },
    ],
  },
  shipping: {
    label: "Getting it to you",
    title: "Shipping details, soon.",
    intro: "Shipping regions, methods, costs and delivery estimates have not been set for this preview.",
    sections: [{ heading: "No orders are being fulfilled", body: "Checkout is not active and no shipping promises are being made. Complete shipping information will be published before the store opens." }],
  },
  returns: {
    label: "A little peace of mind",
    title: "Returns & exchanges.",
    intro: "The final returns and exchanges policy is still to come.",
    sections: [{ heading: "Before the store opens", body: "No orders are currently being accepted. Return windows, conditions and exchange steps will be clearly published before launch." }],
  },
  privacy: {
    label: "Your information",
    title: "Privacy, with care.",
    intro: "This preview only collects information when you choose to submit the newsletter or contact form.",
    sections: [{ heading: "What happens to a submission?", body: "Newsletter email addresses and contact messages are stored so the brand team can follow up. They are not used to create an account or place an order. A final privacy notice will be published before launch." }],
  },
  terms: {
    label: "The small print",
    title: "Terms to follow.",
    intro: "This concept experience is not an active retail store and does not accept orders or payments.",
    sections: [{ heading: "Preview content", body: "Product images, names, colors, size options and prices are illustrative and subject to change. Final terms will be published before any products are offered for sale." }],
  },
};

export function InfoContent({ slug }: { slug: string }) {
  const content = infoPages[slug];
  if (!content) {
    return <main className="info-page page-gutter"><p className="eyebrow">A page in progress</p><h1>That page is still <em>taking shape.</em></h1><p>Head back to the collection preview and keep exploring.</p><Link className="text-link" href="/collections/all">Explore the collection <Icon name="arrow" /></Link></main>;
  }
  return (
    <main className="info-page page-gutter">
      <div className="info-page__intro"><p className="eyebrow">{content.label}</p><h1>{content.title.split(",")[0]}{content.title.includes(",") ? <><br /><em>{content.title.slice(content.title.indexOf(",") + 1).trim()}</em></> : <em />}</h1><p>{content.intro}</p></div>
      <div className="info-page__body">{content.sections.map((section, index) => <article className="info-page__row" key={section.heading}><span>0{index + 1}</span><div><h2>{section.heading}</h2><p>{section.body}</p></div></article>)}<Link className="text-link" href="/contact">Still have a question? Get in touch <Icon name="arrow" /></Link></div>
    </main>
  );
}

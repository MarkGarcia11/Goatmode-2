import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <main className="contact-page page-gutter">
      <section className="contact-page__intro"><p className="eyebrow">A line is open</p><h1>Say <em>hello.</em></h1><p>No contact details to invent — just leave a note and we’ll have a way to get back to you.</p><span>GOAT MODE / CONTACT</span></section>
      <section className="contact-page__form-wrap"><div className="contact-page__form-intro"><span className="eyebrow">A note from you</span><p>Questions, ideas, a little curiosity? We’d be glad to hear it.</p></div><ContactForm /></section>
    </main>
  );
}

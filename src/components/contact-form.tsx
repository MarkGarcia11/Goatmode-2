"use client";

import { FormEvent, useState } from "react";
import { Icon } from "@/components/icons";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setStatus("loading");
    setMessage("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formData.get("name"), email: formData.get("email"), message: formData.get("message") }),
      });
      const result = await response.json() as { message?: string };
      if (!response.ok) throw new Error(result.message || "Your note could not be sent. Please try again.");
      form.reset();
      setStatus("success");
      setMessage(result.message || "Thanks for reaching out. Your note is with us.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Your note could not be sent. Please try again.");
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>Your name<input name="name" type="text" autoComplete="name" required minLength={2} maxLength={100} placeholder="How should we address you?" /></label>
      <label>Email address<input name="email" type="email" autoComplete="email" required maxLength={255} placeholder="you@example.com" /></label>
      <label>Your note<textarea name="message" rows={5} required minLength={8} maxLength={3000} placeholder="Tell us what’s on your mind…" /></label>
      <button className="button button--dark" type="submit" disabled={status === "loading"}>{status === "loading" ? "Sending…" : "Send your note"}<Icon name="arrow" /></button>
      <p className={`form-message ${status === "error" ? "is-error" : "is-success"}`} role="status" aria-live="polite">{message}</p>
      <p className="contact-form__privacy">Your details are used only to respond to your message. Please don’t include sensitive information.</p>
    </form>
  );
}

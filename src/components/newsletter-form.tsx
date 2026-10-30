"use client";

import { FormEvent, useState } from "react";
import { Icon } from "@/components/icons";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const result = await response.json() as { message?: string };
      if (!response.ok) throw new Error(result.message || "Something went wrong. Please try again.");
      setStatus("success");
      setMessage(result.message || "You’re on the list. See you soon.");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <div className="newsletter-form-wrap">
      <form className="newsletter-form" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="newsletter-email">Email address</label>
        <input
          id="newsletter-email"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="Your email address"
          value={email}
          onChange={(event) => { setEmail(event.target.value); if (status !== "loading") setStatus("idle"); }}
          required
          maxLength={255}
          aria-describedby="newsletter-message newsletter-privacy"
        />
        <button type="submit" disabled={status === "loading"} aria-label="Subscribe to the Goat Mode newsletter">
          {status === "loading" ? "Joining…" : status === "success" ? "You’re in" : "Keep me in the loop"}
          {status === "success" ? <Icon name="check" /> : <Icon name="arrow" />}
        </button>
      </form>
      <p id="newsletter-privacy" className="newsletter-privacy">A quiet note when there’s something worth sharing. Unsubscribe any time.</p>
      <p id="newsletter-message" className={`form-message ${status === "error" ? "is-error" : "is-success"}`} role="status" aria-live="polite">
        {message}
      </p>
    </div>
  );
}

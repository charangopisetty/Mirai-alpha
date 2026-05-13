"use client";

import { type FormEvent, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function HeroWaitlist() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const email = String(fd.get("email") ?? "").trim();
    if (!email) {
      setStatus("error");
      setMessage("Enter your email.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const json: unknown = await res.json().catch(() => ({}));
      const errMsg =
        typeof json === "object" &&
        json !== null &&
        "error" in json &&
        typeof (json as { error: unknown }).error === "string"
          ? (json as { error: string }).error
          : "Something went wrong.";

      if (!res.ok) {
        setStatus("error");
        setMessage(errMsg);
        return;
      }

      setStatus("success");
      setMessage("You’re on the list. We’ll be in touch.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Network error. Try again.");
    }
  }

  const loading = status === "loading";

  return (
    <form
      id="capture"
      className="hero-waitlist"
      onSubmit={onSubmit}
      noValidate
      aria-busy={loading}
    >
      <label className="form-label" htmlFor="hero-email">
        Email
      </label>
      <div className="hero-waitlist-row">
        <input
          type="email"
          id="hero-email"
          className="form-input hero-email-input"
          placeholder="you@gmail.com"
          autoComplete="email"
          inputMode="email"
          name="email"
          required
          disabled={loading}
        />
        <button type="submit" className="btn btn-premium btn-lg" disabled={loading}>
          {loading ? "Sending…" : "Join the waitlist"}
          {!loading ? (
            <em style={{ fontFamily: "Georgia, serif", fontSize: "18px" }}></em>
          ) : null}
        </button>
      </div>
      {message ? (
        <p
          className={`hero-waitlist-feedback${status === "success" ? " hero-waitlist-feedback--success" : ""}${status === "error" ? " hero-waitlist-feedback--error" : ""}`}
          role="status"
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}

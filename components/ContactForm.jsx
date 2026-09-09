"use client";

import { useState } from "react";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  details: ""
};

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const update = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (status !== "idle") {
      setStatus("idle");
      setMessage("");
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error(result.message || "Unable to send message.");
      }

      setStatus("success");
      setMessage("Message sent. Datz Logistics will get back to you soon.");

      if (typeof window !== "undefined" && typeof window.gtag === "function") {
        window.gtag("event", "generate_lead", {
          form_name: "contact_form",
          lead_source: "website"
        });
      }

      setForm(initialForm);
    } catch (error) {
      setStatus("error");
      setMessage(
        error?.message ||
        "We could not send your message. Please try again."
      );
    }
  };

  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="field-row">
        <label>
          <span>01 / NAME</span>
          <input
            required
            name="name"
            value={form.name}
            onChange={update}
            placeholder="Your name"
          />
        </label>

        <label>
          <span>02 / EMAIL</span>
          <input
            required
            type="email"
            name="email"
            value={form.email}
            onChange={update}
            placeholder="you@email.com"
          />
        </label>
      </div>

      <label>
        <span>03 / PHONE</span>
        <input
          name="phone"
          value={form.phone}
          onChange={update}
          placeholder="Optional"
        />
      </label>

      <label>
        <span>04 / DELIVERY DETAILS</span>
        <textarea
          required
          name="details"
          value={form.details}
          onChange={update}
          rows="6"
          placeholder="Pickup, destination, timing, and anything else we should know."
        />
      </label>

      <button
        className="submit-button"
        type="submit"
        disabled={status === "sending"}
      >
        <span>{status === "sending" ? "Sending..." : "Send inquiry"}</span>
        <span>{status === "sending" ? "…" : "↗"}</span>
      </button>

      <div
        className={`form-status ${
          status === "success" ? "is-success" :
          status === "error" ? "is-error" : ""
        }`}
        aria-live="polite"
      >
        {message}
      </div>
    </form>
  );
}

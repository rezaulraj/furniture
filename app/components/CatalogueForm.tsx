"use client";

import { useState } from "react";
import { Choice, DISTRICTS, Field, SelectField, SubmitButton, SuccessCard, useFakeSubmit } from "./forms";

export default function CatalogueForm() {
  const { status, submit, reset } = useFakeSubmit();
  const [format, setFormat] = useState("print");

  if (status === "done") {
    return (
      <SuccessCard
        title={format === "print" ? "Your catalogue is on its way" : "Check your inbox"}
        text={
          format === "print"
            ? "Thank you! We'll post the Winter Catalogue to you as soon as it's printed — usually within 7–10 working days."
            : "Thank you! We've emailed you a link to download the Winter Catalogue as a PDF."
        }
        onReset={reset}
        resetLabel="Request another"
      />
    );
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <div onChange={(e) => setFormat((e.target as HTMLInputElement).value)}>
        <span className="mb-3 block text-[12px] font-semibold uppercase tracking-[0.14em] text-charcoal">How would you like it?</span>
        <Choice
          name="format"
          defaultValue="print"
          options={[
            { value: "print", label: "Printed copy", hint: "Free delivery to your door" },
            { value: "digital", label: "Digital PDF", hint: "Instantly, by email" },
          ]}
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" name="name" placeholder="Your name" />
        <Field label="Phone" name="phone" type="tel" placeholder="01XXXXXXXXX" />
      </div>
      <Field label="Email" name="email" type="email" placeholder="you@example.com" />
      {format === "print" && (
        <div className="fade-up grid gap-5 sm:grid-cols-[2fr_1fr]">
          <Field label="Address" name="address" placeholder="House, road, area" />
          <SelectField label="District" name="district" options={DISTRICTS} />
        </div>
      )}
      <label className="flex items-start gap-3 text-[14px] text-muted">
        <input type="checkbox" name="news" defaultChecked className="mt-1 h-4 w-4 accent-red" />
        Send me news about new collections and exclusive offers.
      </label>
      <SubmitButton loading={status === "loading"}>Request my catalogue</SubmitButton>
    </form>
  );
}

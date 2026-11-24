"use client";

import { Choice, Field, SelectField, SubmitButton, SuccessCard, useFakeSubmit } from "./forms";

export default function ProjectEnquiryForm() {
  const { status, submit, reset } = useFakeSubmit();

  if (status === "done") {
    return (
      <SuccessCard
        title="Thank you — we'll be in touch"
        text="A member of our design team will call you within one working day to arrange a free consultation."
        onReset={reset}
        resetLabel="Send another enquiry"
      />
    );
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <div>
        <span className="mb-3 block text-[12px] font-semibold uppercase tracking-[0.14em] text-charcoal">I&apos;m enquiring as</span>
        <Choice
          name="type"
          defaultValue="home"
          options={[
            { value: "home", label: "Homeowner", hint: "Apartment, house or villa" },
            { value: "business", label: "Business", hint: "Office, hotel, clinic or school" },
          ]}
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" name="name" placeholder="Your name" />
        <Field label="Phone" name="phone" type="tel" placeholder="01XXXXXXXXX" />
      </div>
      <Field label="Email" name="email" type="email" placeholder="you@example.com" />
      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField label="Project type" name="project" options={["Full home", "Single room", "Kitchen", "Office", "Hotel / restaurant", "Healthcare", "Education", "Other"]} />
        <SelectField label="Budget" name="budget" options={["Under ৳5 lakh", "৳5–15 lakh", "৳15–50 lakh", "Above ৳50 lakh", "Not sure yet"]} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Area (sq ft)" name="area" type="number" required={false} placeholder="e.g. 1800" />
        <SelectField label="Start" name="timeline" options={["As soon as possible", "Within 3 months", "3–6 months", "Just exploring"]} />
      </div>
      <Field label="Tell us about your project" name="message" type="textarea" required={false} placeholder="Location, rooms, style you love…" />
      <SubmitButton loading={status === "loading"}>Book a free consultation</SubmitButton>
    </form>
  );
}

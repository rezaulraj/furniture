"use client";

import { Field, SelectField, SubmitButton, SuccessCard, useFakeSubmit } from "./forms";

export default function TradeForm() {
  const { status, submit, reset } = useFakeSubmit();

  if (status === "done") {
    return (
      <SuccessCard
        title="Application received"
        text="Thank you! Our trade team reviews applications within two working days. Your account manager will be in touch to welcome you."
        onReset={reset}
        resetLabel="Submit another"
      />
    );
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" name="name" placeholder="Your name" />
        <Field label="Company" name="company" placeholder="Studio or company name" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Email" name="email" type="email" placeholder="you@studio.com" />
        <Field label="Phone" name="phone" type="tel" placeholder="01XXXXXXXXX" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField label="Profession" name="profession" options={["Interior designer", "Architect", "Developer", "Hotel / hospitality", "Corporate buyer", "Contractor", "Other"]} />
        <SelectField label="Yearly spend" name="spend" options={["Under ৳5 lakh", "৳5–20 lakh", "৳20–50 lakh", "Above ৳50 lakh"]} />
      </div>
      <Field label="Website or portfolio" name="website" type="url" required={false} placeholder="https://" />
      <Field label="Trade licence / BIN" name="licence" required={false} placeholder="Helps us verify you faster" />
      <SubmitButton loading={status === "loading"}>Apply for a trade account</SubmitButton>
    </form>
  );
}

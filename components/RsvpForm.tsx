"use client";

import { useState, type FormEvent } from "react";
import { submitRsvp } from "@/lib/supabase";

type Status = "idle" | "sending" | "done" | "error";

export default function RsvpForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [attending, setAttending] = useState<"yes" | "no">("yes");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = new FormData(e.currentTarget);
    setStatus("sending");
    try {
      await submitRsvp({
        full_name: String(form.get("full_name") ?? "").trim(),
        guests: Number(form.get("guests") ?? 1),
        attending: attending === "yes",
        message: String(form.get("message") ?? "").trim() || null,
      });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div
        role="status"
        className="text-center py-10 px-6 flex flex-col items-center gap-4"
      >
        <p className="font-display gold-text text-3xl leading-relaxed">شكراً لكم</p>
        <p className="font-body text-ink-soft text-lg leading-loose">
          {attending === "yes"
            ? "سعدنا بتأكيد حضوركم، وننتظر تشريفكم بفارغ الصبر"
            : "نشكر لكم لطفكم، ونأمل أن تجمعنا مناسبات قادمة"}
        </p>
        <div className="hairline w-24" />
      </div>
    );
  }

  const inputCls =
    "w-full rounded-sm border border-gold/40 bg-paper/70 px-4 py-3 font-body text-ink placeholder:text-ink-soft/50 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/50 transition-colors";

  return (
    <form onSubmit={handleSubmit} aria-label="نموذج تأكيد الحضور" className="flex flex-col gap-5">
      <div>
        <label htmlFor="rsvp-name" className="block mb-2 font-body text-ink font-bold">
          الاسم الكريم
        </label>
        <input
          id="rsvp-name"
          name="full_name"
          type="text"
          required
          autoComplete="name"
          placeholder="الاسم الكامل"
          className={inputCls}
        />
      </div>

      <fieldset>
        <legend className="mb-2 font-body text-ink font-bold">تشريفكم</legend>
        <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="تأكيد أو اعتذار">
          {(
            [
              { v: "yes", label: "يشرفني الحضور" },
              { v: "no", label: "أعتذر عن الحضور" },
            ] as const
          ).map((opt) => (
            <button
              key={opt.v}
              type="button"
              role="radio"
              aria-checked={attending === opt.v}
              onClick={() => setAttending(opt.v)}
              className={`rounded-sm border px-4 py-3 font-body transition-all duration-300 ${
                attending === opt.v
                  ? "border-gold bg-gold/15 text-ink shadow-sm"
                  : "border-gold/30 text-ink-soft hover:border-gold/60"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="rsvp-guests" className="block mb-2 font-body text-ink font-bold">
          عدد الحضور
        </label>
        <select id="rsvp-guests" name="guests" defaultValue="1" className={inputCls}>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="rsvp-message" className="block mb-2 font-body text-ink font-bold">
          رسالة للعروسين <span className="font-normal text-ink-soft/70">(اختياري)</span>
        </label>
        <textarea
          id="rsvp-message"
          name="message"
          rows={3}
          placeholder="كلمات من القلب..."
          className={`${inputCls} resize-none`}
        />
      </div>

      {status === "error" && (
        <p role="alert" className="text-red-800 font-body text-sm">
          عذراً، حدث خطأ أثناء الإرسال. الرجاء المحاولة مرة أخرى.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        aria-label="إرسال تأكيد الحضور"
        className="mt-2 rounded-sm bg-ink text-paper font-body text-lg py-3.5 px-8 tracking-wide transition-all duration-300 hover:bg-ink-soft disabled:opacity-60 cursor-pointer shadow-[0_12px_24px_-10px_rgba(30,59,64,0.5)]"
      >
        {status === "sending" ? "جارٍ الإرسال..." : "إرسال التأكيد"}
      </button>
    </form>
  );
}

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Enter your name"),
  email: z.string().email("Enter a valid email"),
  message: z.string().min(10, "Message should be at least 10 characters"),
});

type FormValues = z.infer<typeof schema>;

export default function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    setState("sending");
    try {
      // TODO: replace with a real endpoint — e.g. a Next.js API route at
      // /api/contact that sends via Resend/SendGrid/Nodemailer, or a
      // form backend like Formspree. Currently this call will 404.
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setState("sent");
      reset();
    } catch {
      setState("error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label htmlFor="name" className="font-mono text-xs text-ink-dim">
          Name
        </label>
        <input
          id="name"
          {...register("name")}
          className="mt-2 w-full rounded-md border border-base-line bg-base-panel/60 px-4 py-3 text-sm text-ink placeholder:text-ink-faint focus:border-accent-cyan/60 focus:outline-none"
          placeholder="Your name"
        />
        {errors.name && (
          <p className="mt-1.5 flex items-center gap-1 text-xs text-status-down">
            <AlertCircle size={12} /> {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="font-mono text-xs text-ink-dim">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className="mt-2 w-full rounded-md border border-base-line bg-base-panel/60 px-4 py-3 text-sm text-ink placeholder:text-ink-faint focus:border-accent-cyan/60 focus:outline-none"
          placeholder="you@example.com"
        />
        {errors.email && (
          <p className="mt-1.5 flex items-center gap-1 text-xs text-status-down">
            <AlertCircle size={12} /> {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="font-mono text-xs text-ink-dim">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          {...register("message")}
          className="mt-2 w-full resize-none rounded-md border border-base-line bg-base-panel/60 px-4 py-3 text-sm text-ink placeholder:text-ink-faint focus:border-accent-cyan/60 focus:outline-none"
          placeholder="What would you like to talk about?"
        />
        {errors.message && (
          <p className="mt-1.5 flex items-center gap-1 text-xs text-status-down">
            <AlertCircle size={12} /> {errors.message.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={state === "sending"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-accent-blue px-5 py-3 font-mono text-sm font-medium text-white shadow-glow transition-all hover:bg-accent-blue/90 hover:shadow-glow-cyan disabled:opacity-60 sm:w-auto"
      >
        <Send size={15} />
        {state === "sending" ? "Sending..." : "Send message"}
      </button>

      {state === "sent" && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-1.5 font-mono text-xs text-status-up"
        >
          <CheckCircle2 size={14} /> Message sent — thanks for reaching out.
        </motion.p>
      )}
      {state === "error" && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-1.5 font-mono text-xs text-status-down"
        >
          <AlertCircle size={14} /> The contact endpoint isn&apos;t wired up yet — email
          directly for now.
        </motion.p>
      )}
    </form>
  );
}

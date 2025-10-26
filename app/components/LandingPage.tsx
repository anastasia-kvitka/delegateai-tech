"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [error, setError] = useState("");

  function validateEmail(e: string) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(e);
  }

  async function handleSubmit(ev: { preventDefault: () => void }) {
    ev.preventDefault();
    setError("");
    if (!validateEmail(email)) {
      setError("Please enter a valid business email.");
      return;
    }

    setStatus("sending");
    try {
      await new Promise((res) => setTimeout(res, 900));
      setStatus("success");
    } catch (e) {
      setStatus("error");
      setError("Something went wrong — please try again.");
    }
  }

  return (
    <div className="w-screen min-h-screen bg-linear-to-b from-black via-slate-900 to-[#041023] text-white flex flex-col overflow-x-hidden">
      {/* Header */}
      <header className="py-6 px-6 sm:px-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-linear-to-br from-cyan-400 to-violet-500 flex items-center justify-center shadow-lg">
            <span className="font-bold text-black tracking-tight">AI</span>
          </div>
          <div className="text-xl font-extrabold tracking-tight">
            DelegateAI
          </div>
        </div>
        <nav className="text-sm opacity-80">
          <a href="#contact" className="hover:underline">
            Contact
          </a>
        </nav>
      </header>

      {/* Hero */}
      <main className="flex-1 flex items-center justify-center px-6 sm:px-12">
        <section className="max-w-3xl w-full text-center">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight"
          >
            ChatGPT is working instead of{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-violet-500">
              you
            </span>
            .
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-6 text-lg sm:text-xl opacity-80 max-w-2xl mx-auto"
          >
            Connect your business systems to ChatGPT via secure MSP servers —
            automate support, emails, workflows, and more without writing a
            single line of code.
          </motion.p>

          {/* Email CTA */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, scale: 0.995 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="mt-10 flex items-center justify-center"
            aria-label="Signup form"
          >
            <div className="w-full max-w-xl">
              <div className="flex gap-3 bg-slate-800/60 rounded-lg p-1 shadow-sm">
                <label htmlFor="email" className="sr-only">
                  Business email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Please leave your email"
                  className="flex-1 bg-transparent px-4 py-3 outline-none placeholder:opacity-60"
                  aria-required
                />

                <button
                  type="submit"
                  disabled={status === "sending" || status === "success"}
                  className="inline-flex items-center gap-2 rounded-md px-5 py-2 text-sm font-semibold bg-linear-to-r from-cyan-400 to-violet-500 text-black shadow-lg hover:brightness-105 disabled:opacity-60"
                >
                  {status === "sending"
                    ? "Sending..."
                    : status === "success"
                    ? "Thanks — Sent"
                    : "Get Early Access"}
                </button>
              </div>

              <div className="mt-3 text-left text-sm">
                {error && <p className="text-rose-400">{error}</p>}
                {status === "success" && (
                  <p className="text-emerald-400">
                    Thanks! We’ll reach out soon to set up your connection.
                  </p>
                )}
                <p className="mt-2 opacity-60">
                  We only use business emails. No spam. Your data is secure.
                </p>
              </div>
            </div>
          </motion.form>

          {/* Feature blurbs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm"
          >
            <div className="p-4 bg-slate-800/40 rounded-lg">
              <div className="font-semibold">Instant Integration</div>
              <div className="mt-1 opacity-70">
                Connect via MSP — minutes, not weeks.
              </div>
            </div>
            <div className="p-4 bg-slate-800/40 rounded-lg">
              <div className="font-semibold">Custom Automations</div>
              <div className="mt-1 opacity-70">
                Tailored prompts and flows for your business needs.
              </div>
            </div>
            <div className="p-4 bg-slate-800/40 rounded-lg">
              <div className="font-semibold">Secure & Scalable</div>
              <div className="mt-1 opacity-70">
                Enterprise-grade security and SLA-backed servers.
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer
        id="contact"
        className="py-6 px-6 sm:px-12 text-center border-t border-slate-800/60"
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm">
            © {new Date().getFullYear()} DelegateAI — All rights reserved.
          </div>
          <div className="text-sm opacity-70">Privacy · Terms</div>
        </div>
      </footer>
    </div>
  );
}

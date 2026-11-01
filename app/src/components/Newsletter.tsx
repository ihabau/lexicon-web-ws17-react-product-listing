import { useState } from "react";
import type { FormEvent } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="mt-12 bg-slate-900 py-16 text-white overflow-hidden relative">
      <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-blue-600/20 blur-3xl"></div>
      <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center lg:flex-row lg:text-left lg:justify-between gap-10">
          <div className="max-w-xl space-y-4">
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl uppercase italic">
              Join the LITE.CLUB
            </h2>
            <p className="text-slate-400 font-medium leading-relaxed">
              Subscribe to our newsletter and get{" "}
              <span className="text-white font-bold underline decoration-blue-500 decoration-2 underline-offset-4">
                15% off
              </span>{" "}
              your first order. Be the first to know about new arrivals and
              exclusive sales.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full max-w-md">
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="flex-1 rounded-[1rem] bg-white/5 border border-white/10 px-5 py-4 text-sm font-medium text-white placeholder:text-slate-500 outline-none transition-all focus:bg-white/10 focus:ring-2 focus:ring-blue-500/50"
              />
              <button
                type="submit"
                className="rounded-[1rem] bg-blue-600 px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] active:scale-95"
              >
                Subscribe
              </button>
            </div>
            <p className="mt-3 text-[10px] text-slate-500 italic">
              By subscribing, you agree to our Privacy Policy and Terms of
              Service.
            </p>
            {submitted && (
              <p className="mt-2 text-xs font-bold text-blue-300">
                Thanks for subscribing!
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;

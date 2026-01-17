"use client";

import { useMemo, useState } from "react";

type FeedEvent = {
  type: "info" | "success" | "warning" | "error" | "critique" | "synthesis";
  message: string;
  channel: "simple" | "advanced";
};

export default function Home() {
  const gumroadUrl = process.env.NEXT_PUBLIC_GUMROAD_URL || "#";
  const [showFullDetails, setShowFullDetails] = useState(false);

  const allEvents: FeedEvent[] = useMemo(
    () => [
      { type: "info", message: "Mission started → traceId created instantly", channel: "simple" },
      { type: "success", message: "Agents spinning up • roles assigned", channel: "simple" },
      { type: "warning", message: "Constraint check • keeping output safe + readable", channel: "simple" },
      { type: "success", message: "Synthesis phase • clear summary forming", channel: "simple" },

      // Full Details (advanced)
      { type: "critique", message: "Risk scan: potential hallucination vector flagged (handled)", channel: "advanced" },
      { type: "critique", message: "Quality gate: output trimmed for clarity + usefulness", channel: "advanced" },
      { type: "synthesis", message: "Final summary: actionable plan + next steps produced", channel: "advanced" },
    ],
    []
  );

  const visibleEvents = useMemo(() => {
    if (showFullDetails) return allEvents;
    return allEvents.filter((e) => e.channel === "simple");
  }, [allEvents, showFullDetails]);

  const badgeClasses = (t: FeedEvent["type"]) => {
    switch (t) {
      case "success":
        return "border-emerald-800/60 bg-emerald-950/30 text-emerald-200";
      case "warning":
        return "border-amber-800/60 bg-amber-950/30 text-amber-200";
      case "error":
        return "border-red-800/60 bg-red-950/30 text-red-200";
      case "critique":
        return "border-fuchsia-800/60 bg-fuchsia-950/30 text-fuchsia-200";
      case "synthesis":
        return "border-indigo-800/60 bg-indigo-950/30 text-indigo-200";
      default:
        return "border-zinc-700/60 bg-zinc-900/30 text-zinc-200";
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50">
      {/* Sticky Top Bar */}
      <header className="sticky top-0 z-50 border-b border-zinc-800/60 bg-zinc-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 shadow-lg shadow-fuchsia-500/10" />
            <div>
              <div className="text-sm font-semibold leading-none">Nexus Nebula</div>
              <div className="text-xs text-zinc-400">Built by warrenet</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#demo"
              className="hidden rounded-lg border border-zinc-800 px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-900 sm:inline-flex"
            >
              See Demo Flow
            </a>
            <a
              href={gumroadUrl}
              className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-zinc-200"
            >
              Get Pro
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          {/* Left */}
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/30 px-3 py-1 text-xs text-zinc-300">
              Real-time streaming • Simple View by default • Full Details toggle
            </p>

            {/* Headline: keeps "watch work" together */}
            <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              The AI Team you can{" "}
              <span className="inline-flex items-baseline whitespace-nowrap">
                <span className="bg-gradient-to-r from-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">
                  watch
                </span>
                <span className="ml-2">work.</span>
              </span>
            </h1>

            <p className="mt-4 text-base leading-relaxed text-zinc-300 sm:text-lg">
              Nexus Nebula streams an AI “team” through clear phases so non-technical humans can follow what’s happening
              without getting blasted by raw internals.
            </p>

            <div className="mt-6 grid gap-3 text-sm text-zinc-300 sm:grid-cols-2">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/20 p-4">
                <div className="font-semibold text-zinc-100">Simple View (default)</div>
                <div className="mt-1 text-zinc-400">Clean + calm output designed for clarity.</div>
              </div>
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/20 p-4">
                <div className="font-semibold text-zinc-100">Full Details (optional)</div>
                <div className="mt-1 text-zinc-400">Toggle deeper events when you want transparency.</div>
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={gumroadUrl}
                className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950 hover:bg-zinc-200"
              >
                Try Demo → Upgrade to Pro
              </a>
              <a
                href="#pricing"
                className="inline-flex items-center justify-center rounded-xl border border-zinc-800 px-5 py-3 text-sm text-zinc-200 hover:bg-zinc-900"
              >
                Pricing & tiers
              </a>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-zinc-400">
              <span className="rounded-full border border-zinc-800 bg-zinc-900/20 px-3 py-1">Web / PWA-first</span>
              <span className="rounded-full border border-zinc-800 bg-zinc-900/20 px-3 py-1">Live streaming feel</span>
              <span className="rounded-full border border-zinc-800 bg-zinc-900/20 px-3 py-1">Demo-first funnel</span>
              <span className="rounded-full border border-zinc-800 bg-zinc-900/20 px-3 py-1">Built for clarity</span>
            </div>
          </div>

          {/* Right: Live Feed Demo */}
          <div className="rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900/60 to-zinc-950 p-4 shadow-2xl">
            <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950/60 px-4 py-3">
              <div>
                <div className="text-sm font-semibold">Live Swarm Feed</div>
                <div className="mt-0.5 text-xs text-zinc-500">Interactive demo (toggle details)</div>
              </div>

              <button
                onClick={() => setShowFullDetails((v) => !v)}
                className="group inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/20 px-3 py-2 text-xs text-zinc-200 hover:bg-zinc-900"
                aria-label="Toggle Full Details"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-30" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                {showFullDetails ? "Full Details" : "Simple View"}
                <span className="text-zinc-500 group-hover:text-zinc-300">↔</span>
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {visibleEvents.map((e, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-zinc-800 bg-zinc-950/40 px-4 py-3"
                >
                  <div className="flex items-center justify-between">
                    <div className={`rounded-full border px-2 py-0.5 text-[11px] ${badgeClasses(e.type)}`}>
                      {e.type.toUpperCase()}
                    </div>
                    <div className="text-xs text-zinc-500">streaming…</div>
                  </div>
                  <div className="mt-2 text-sm text-zinc-200">{e.message}</div>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-900/20 p-4 text-sm text-zinc-300">
              <div className="font-semibold text-zinc-100">Pro unlock spine (evolving)</div>
              <div className="mt-2 text-zinc-400">
                History + replay, user-scoped traces, proof-of-value summaries, template packs.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="text-2xl font-semibold tracking-tight">What you get</h2>
        <p className="mt-2 max-w-2xl text-zinc-300">
          Clean by default, deep when you want it. Built for non-technical clarity first.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {[
            {
              title: "Real-time streaming timeline",
              desc: "Watch an AI Team collaborate phase-by-phase instead of waiting on a mystery blob.",
            },
            {
              title: "Simple View (default)",
              desc: "A calm UI normal humans can use without feeling like they opened a cockpit.",
            },
            {
              title: "Full Details toggle",
              desc: "Turn on critique + deeper events when you want transparency.",
            },
            {
              title: "Demo-first funnel",
              desc: "Try it immediately, then unlock Pro when it proves its value.",
            },
          ].map((f, i) => (
            <div key={i} className="rounded-2xl border border-zinc-800 bg-zinc-900/20 p-6">
              <div className="text-base font-semibold">{f.title}</div>
              <div className="mt-2 text-sm leading-relaxed text-zinc-300">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Pricing & tiers</h2>
            <p className="mt-2 max-w-2xl text-zinc-300">
              Start with Demo. Upgrade when you feel the difference. Gumroad-friendly and simple.
            </p>
          </div>

          <a
            href={gumroadUrl}
            className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950 hover:bg-zinc-200"
          >
            View Pro on Gumroad
          </a>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {/* Demo */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/20 p-6">
            <div className="text-sm font-semibold text-zinc-100">Demo</div>
            <div className="mt-2 text-3xl font-semibold">Free</div>
            <div className="mt-2 text-sm text-zinc-400">Try the live feed + core flow.</div>

            <ul className="mt-5 space-y-2 text-sm text-zinc-300">
              <li>• Simple View default</li>
              <li>• Watch phases stream</li>
              <li>• Proof-of-value feel</li>
            </ul>

            <a
              href="#demo"
              className="mt-6 inline-flex w-full items-center justify-center rounded-xl border border-zinc-800 px-4 py-3 text-sm text-zinc-200 hover:bg-zinc-900"
            >
              Try Demo
            </a>
          </div>

          {/* Pro */}
          <div className="rounded-2xl border border-indigo-700/40 bg-gradient-to-b from-indigo-950/30 to-zinc-950 p-6 shadow-xl shadow-indigo-500/10">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-zinc-100">Pro</div>
              <span className="rounded-full border border-indigo-800/40 bg-indigo-950/30 px-3 py-1 text-xs text-indigo-200">
                Recommended
              </span>
            </div>

            <div className="mt-2 text-3xl font-semibold">Unlock</div>
            <div className="mt-2 text-sm text-zinc-400">The spine that makes it sticky.</div>

            <ul className="mt-5 space-y-2 text-sm text-zinc-300">
              <li>• Persistence (history + replay)</li>
              <li>• User-scoped traces</li>
              <li>• Cleaner summaries + payoff panel</li>
              <li>• Better support UX (copy debug)</li>
            </ul>

            <a
              href={gumroadUrl}
              className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-white px-4 py-3 text-sm font-semibold text-zinc-950 hover:bg-zinc-200"
            >
              Get Pro
            </a>
          </div>

          {/* Pro + Packs */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/20 p-6">
            <div className="text-sm font-semibold text-zinc-100">Pro + Packs</div>
            <div className="mt-2 text-3xl font-semibold">Best value</div>
            <div className="mt-2 text-sm text-zinc-400">Templates, missions, upgrades.</div>

            <ul className="mt-5 space-y-2 text-sm text-zinc-300">
              <li>• Everything in Pro</li>
              <li>• Template packs (repeatable wins)</li>
              <li>• New missions + updates</li>
              <li>• Roadmap drops</li>
            </ul>

            <a
              href={gumroadUrl}
              className="mt-6 inline-flex w-full items-center justify-center rounded-xl border border-zinc-800 px-4 py-3 text-sm text-zinc-200 hover:bg-zinc-900"
            >
              Get Pro + Packs
            </a>
          </div>
        </div>
      </section>

      {/* DEMO FLOW */}
      <section id="demo" className="mx-auto max-w-6xl px-6 py-14">
        <div className="rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900/40 to-zinc-950 p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Demo flow in 10 seconds</h2>
              <p className="mt-2 max-w-2xl text-zinc-300">
                This is the “aha”: it feels alive, but stays readable.
              </p>

              <ol className="mt-4 space-y-2 text-sm text-zinc-300">
                <li>1) Start mission</li>
                <li>2) Get traceId instantly</li>
                <li>3) Watch live events stream</li>
                <li>4) Toggle Full Details when needed</li>
                <li>5) Walk away with a usable synthesis</li>
              </ol>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={gumroadUrl}
                  className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950 hover:bg-zinc-200"
                >
                  Try Demo → Upgrade to Pro
                </a>
                <a
                  href="#faq"
                  className="inline-flex items-center justify-center rounded-xl border border-zinc-800 px-5 py-3 text-sm text-zinc-200 hover:bg-zinc-900"
                >
                  FAQ
                </a>
              </div>
            </div>

            {/* Video/GIF placeholder */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4 lg:w-[420px]">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-zinc-100">Demo video (placeholder)</div>
                <div className="text-xs text-zinc-500">60–90s recommended</div>
              </div>
              <div className="mt-3 aspect-video w-full rounded-xl border border-zinc-800 bg-zinc-900/30" />
              <p className="mt-3 text-xs text-zinc-400">
                Swap this box for a GIF or short clip once your flow is final. Conversions love video.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="text-2xl font-semibold tracking-tight">FAQ</h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[
            {
              q: "Is this friendly for non-technical users?",
              a: "Yes. Simple View is the default. Full Details is optional.",
            },
            {
              q: "Is this just a UI toy?",
              a: "No. The point is clarity + trust: see the process, then get the synthesis.",
            },
            {
              q: "What makes it different?",
              a: "You can watch the AI Team work in real time instead of trusting a black box blob.",
            },
            {
              q: "What does Pro add?",
              a: "Persistence, replay, better summaries, user-scoped traces, and template pack upgrades as they ship.",
            },
          ].map((item, i) => (
            <div key={i} className="rounded-2xl border border-zinc-800 bg-zinc-900/20 p-6">
              <div className="text-sm font-semibold">{item.q}</div>
              <div className="mt-2 text-sm leading-relaxed text-zinc-300">{item.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="border-t border-zinc-800/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-zinc-400">
            © {new Date().getFullYear()} Nexus Nebula • Built by warrenet
          </div>
          <a
            href={gumroadUrl}
            className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950 hover:bg-zinc-200"
          >
            Get Pro
          </a>
        </div>
      </footer>

      {/* Sticky Bottom CTA */}
      <div className="pointer-events-none fixed bottom-4 left-0 right-0 z-50">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-2xl border border-zinc-800 bg-zinc-950/85 px-4 py-3 shadow-2xl shadow-black/40 backdrop-blur pointer-events-auto mx-4 sm:mx-auto">
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-zinc-100">Nexus Nebula</div>
            <div className="truncate text-xs text-zinc-400">
              Demo-first. Upgrade when you feel the difference.
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFullDetails((v) => !v)}
              className="hidden rounded-xl border border-zinc-800 bg-zinc-900/30 px-3 py-2 text-xs text-zinc-200 hover:bg-zinc-900 sm:inline-flex"
              aria-label="Toggle Full Details (Sticky CTA)"
            >
              {showFullDetails ? "Full Details: ON" : "Simple View: ON"}
            </button>
            <a
              href={gumroadUrl}
              className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-zinc-200"
            >
              Get Pro
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

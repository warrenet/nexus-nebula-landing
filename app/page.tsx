"use client";

import { useEffect, useMemo, useState } from "react";

type FeedEvent = {
  type: "info" | "success" | "warning" | "error" | "critique" | "synthesis";
  message: string;
  channel: "simple" | "advanced";
};

function isValidUrl(url: string) {
  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

function buildMailto(email: string, subject: string, body: string) {
  const s = encodeURIComponent(subject);
  const b = encodeURIComponent(body);
  return `mailto:${email}?subject=${s}&body=${b}`;
}

export default function Home() {
  // ✅ Your current waitlist contact email (easy to change later)
  const contactEmail = "contactwarrentrepp@gmail.com";

  // ✅ Optional env vars (add later when ready)
  // NEXT_PUBLIC_GUMROAD_URL=https://...
  // NEXT_PUBLIC_WAITLIST_URL=https://...  (Google Form / Typeform / whatever)
  const envGumroadUrl = (process.env.NEXT_PUBLIC_GUMROAD_URL || "").trim();
  const envWaitlistUrl = (process.env.NEXT_PUBLIC_WAITLIST_URL || "").trim();

  const hasGumroad = isValidUrl(envGumroadUrl);
  const hasWaitlistForm = isValidUrl(envWaitlistUrl);

  const [showFullDetails, setShowFullDetails] = useState(false);
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [copied, setCopied] = useState<null | "email" | "template" | "link">(null);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  const waitlistTemplate = useMemo(() => {
    return [
      "Hey Warren,",
      "",
      "I'd like Nexus Nebula Pro access.",
      "",
      "Name:",
      "Use-case:",
      "What I want Pro to solve:",
      "",
      "Thanks!",
    ].join("\n");
  }, []);

  const mailtoHref = useMemo(() => {
    return buildMailto(contactEmail, "Nexus Nebula Pro Waitlist", waitlistTemplate);
  }, [contactEmail, waitlistTemplate]);

  const allEvents: FeedEvent[] = useMemo(
    () => [
      { type: "info", message: "Mission started → traceId created instantly", channel: "simple" },
      { type: "success", message: "Agents spinning up • roles assigned", channel: "simple" },
      { type: "warning", message: "Constraint check • keeping output safe + readable", channel: "simple" },
      { type: "success", message: "Synthesis phase • clear summary forming", channel: "simple" },

      { type: "critique", message: "Risk scan: possible hallucination vector flagged (handled)", channel: "advanced" },
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

  const openWaitlist = () => {
    setCopied(null);
    setWaitlistOpen(true);
  };

  const closeWaitlist = () => {
    setCopied(null);
    setWaitlistOpen(false);
  };

  const copyToClipboard = async (kind: "email" | "template" | "link") => {
    try {
      let text = "";
      if (kind === "email") text = contactEmail;
      if (kind === "template") text = waitlistTemplate;
      if (kind === "link") text = window.location.href;

      await navigator.clipboard.writeText(text);
      setCopied(kind);
      window.setTimeout(() => setCopied(null), 1400);
    } catch {
      setCopied(null);
    }
  };

  const openWaitlistForm = () => {
    if (!hasWaitlistForm) return;
    window.open(envWaitlistUrl, "_blank", "noopener,noreferrer");
  };

  // ✅ QOL: ESC closes modal + prevents background scroll when modal open
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeWaitlist();
    };

    if (waitlistOpen) {
      document.addEventListener("keydown", onKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [waitlistOpen]);

  // ✅ CTA routing:
  // - If Gumroad exists -> go there
  // - Else open waitlist modal (no 404)
  const onProClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (hasGumroad) return;
    e.preventDefault();
    openWaitlist();
  };

  const faq = [
    {
      q: "What is Nexus Nebula?",
      a: "A web/PWA experience that streams an AI “team” working in phases. Simple view by default, full details when you want them.",
    },
    {
      q: "Is this for non-technical people?",
      a: "Yes. The whole point is clarity. You can keep it calm and readable, and only toggle deeper details when needed.",
    },
    {
      q: "What does Pro unlock?",
      a: "The Pro spine: history + replay, user-scoped traces, proof-of-value summaries, and template packs (evolving).",
    },
    {
      q: "Why waitlist instead of buying now?",
      a: "Gumroad is being set up. Waitlist ensures early users get smooth onboarding and the best version of the experience.",
    },
  ];

  return (
    <main className="min-h-screen scroll-smooth bg-zinc-950 text-zinc-50">
      {/* Announcement bar */}
      <div className="border-b border-zinc-800/60 bg-gradient-to-r from-indigo-500/10 to-fuchsia-500/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-6 py-2">
          <p className="text-xs text-zinc-300">
            Waitlist is open • Early adopters get the cleanest onboarding
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => copyToClipboard("link")}
              className="rounded-full border border-zinc-800 bg-zinc-900/20 px-3 py-1 text-xs text-zinc-200 hover:bg-zinc-900"
            >
              {copied === "link" ? "Copied link" : "Copy link"}
            </button>
            <button
              onClick={openWaitlist}
              className="rounded-full border border-zinc-800 bg-zinc-900/20 px-3 py-1 text-xs text-zinc-200 hover:bg-zinc-900"
            >
              Join waitlist
            </button>
          </div>
        </div>
      </div>

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
              href={hasGumroad ? envGumroadUrl : "#waitlist"}
              onClick={onProClick}
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
                <div className="mt-1 text-zinc-400">Calm, readable output designed for clarity.</div>
              </div>
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/20 p-4">
                <div className="font-semibold text-zinc-100">Full Details (optional)</div>
                <div className="mt-1 text-zinc-400">Toggle deeper events when you want transparency.</div>
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                onClick={openWaitlist}
                className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950 hover:bg-zinc-200"
              >
                Get Pro (Waitlist)
              </button>

              <button
                onClick={() => copyToClipboard("link")}
                className="inline-flex items-center justify-center rounded-xl border border-zinc-800 px-5 py-3 text-sm text-zinc-200 hover:bg-zinc-900"
              >
                {copied === "link" ? "Link copied" : "Copy share link"}
              </button>
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
                <div key={i} className="rounded-xl border border-zinc-800 bg-zinc-950/40 px-4 py-3">
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

      {/* “Video” placeholder (fast credibility boost) */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900/40 to-zinc-950 p-8">
          <h2 className="text-2xl font-semibold tracking-tight">1-minute demo (coming)</h2>
          <p className="mt-2 max-w-2xl text-zinc-300">
            Drop a Loom or YouTube link here later. This section massively increases trust and conversion.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              { k: "Instant traceId", v: "No waiting. Mission starts immediately." },
              { k: "Streaming events", v: "See progress as it happens." },
              { k: "Readable synthesis", v: "Walk away with something usable." },
            ].map((x, i) => (
              <div key={i} className="rounded-2xl border border-zinc-800 bg-zinc-900/20 p-5">
                <div className="text-sm font-semibold text-zinc-100">{x.k}</div>
                <div className="mt-2 text-sm text-zinc-300">{x.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ (conversion + clarity) */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="text-2xl font-semibold tracking-tight">FAQ</h2>
        <div className="mt-6 space-y-3">
          {faq.map((item, idx) => {
            const open = faqOpen === idx;
            return (
              <button
                key={idx}
                onClick={() => setFaqOpen(open ? null : idx)}
                className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/20 p-5 text-left hover:bg-zinc-900/30"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="text-sm font-semibold text-zinc-100">{item.q}</div>
                  <div className="text-zinc-500">{open ? "–" : "+"}</div>
                </div>
                {open && <div className="mt-3 text-sm text-zinc-300">{item.a}</div>}
              </button>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-zinc-400">© {new Date().getFullYear()} Nexus Nebula • Built by warrenet</div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => copyToClipboard("link")}
              className="rounded-xl border border-zinc-800 px-4 py-2 text-sm text-zinc-200 hover:bg-zinc-900"
            >
              {copied === "link" ? "Copied" : "Copy link"}
            </button>
            <button
              onClick={openWaitlist}
              className="rounded-xl bg-white px-5 py-2 text-sm font-semibold text-zinc-950 hover:bg-zinc-200"
            >
              Get Pro (Waitlist)
            </button>
          </div>
        </div>
      </footer>

      {/* Sticky Bottom CTA */}
      <div className="pointer-events-none fixed bottom-4 left-0 right-0 z-50">
        <div className="pointer-events-auto mx-4 flex max-w-6xl items-center justify-between gap-3 rounded-2xl border border-zinc-800 bg-zinc-950/85 px-4 py-3 shadow-2xl shadow-black/40 backdrop-blur sm:mx-auto">
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-zinc-100">Nexus Nebula</div>
            <div className="truncate text-xs text-zinc-400">Waitlist is open • Gumroad drops soon</div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => copyToClipboard("link")}
              className="hidden rounded-xl border border-zinc-800 bg-zinc-900/30 px-3 py-2 text-xs text-zinc-200 hover:bg-zinc-900 sm:inline-flex"
            >
              {copied === "link" ? "Copied" : "Copy link"}
            </button>
            <button
              onClick={openWaitlist}
              className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-zinc-200"
            >
              Join
            </button>
          </div>
        </div>
      </div>

      {/* Waitlist Modal */}
      {waitlistOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 px-4"
          onClick={closeWaitlist}
        >
          <div
            className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-lg font-semibold">Join the Pro waitlist</div>
                <div className="mt-1 text-sm text-zinc-400">
                  Gumroad isn’t live yet. For now, request access directly.
                </div>
              </div>

              <button
                onClick={closeWaitlist}
                className="rounded-lg border border-zinc-800 bg-zinc-900/30 px-3 py-1.5 text-xs text-zinc-200 hover:bg-zinc-900"
              >
                Close
              </button>
            </div>

            <div className="mt-5 rounded-xl border border-zinc-800 bg-zinc-900/20 p-4">
              <div className="text-xs text-zinc-400">Contact</div>
              <div className="mt-1 flex items-center justify-between gap-2">
                <div className="truncate text-sm font-semibold text-zinc-100">{contactEmail}</div>
                <button
                  onClick={() => copyToClipboard("email")}
                  className="rounded-lg border border-zinc-800 bg-zinc-900/30 px-3 py-1.5 text-xs text-zinc-200 hover:bg-zinc-900"
                >
                  {copied === "email" ? "Copied" : "Copy email"}
                </button>
              </div>

              <div className="mt-4 text-xs text-zinc-400">Request template</div>
              <div className="mt-1 flex items-center justify-between gap-2">
                <div className="truncate text-sm text-zinc-300">“I’d like Nexus Nebula Pro access…”</div>
                <button
                  onClick={() => copyToClipboard("template")}
                  className="rounded-lg border border-zinc-800 bg-zinc-900/30 px-3 py-1.5 text-xs text-zinc-200 hover:bg-zinc-900"
                >
                  {copied === "template" ? "Copied" : "Copy template"}
                </button>
              </div>

              <div className="mt-4 text-xs text-zinc-400">Share</div>
              <div className="mt-1 flex items-center justify-between gap-2">
                <div className="truncate text-sm text-zinc-300">Copy the site link</div>
                <button
                  onClick={() => copyToClipboard("link")}
                  className="rounded-lg border border-zinc-800 bg-zinc-900/30 px-3 py-1.5 text-xs text-zinc-200 hover:bg-zinc-900"
                >
                  {copied === "link" ? "Copied" : "Copy link"}
                </button>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
              {hasWaitlistForm ? (
                <button
                  onClick={openWaitlistForm}
                  className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-zinc-200"
                >
                  Open Waitlist Form
                </button>
              ) : (
                <a
                  href={mailtoHref}
                  className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-zinc-200"
                >
                  Email Warren
                </a>
              )}

              <button
                onClick={closeWaitlist}
                className="inline-flex items-center justify-center rounded-xl border border-zinc-800 px-4 py-2 text-sm text-zinc-200 hover:bg-zinc-900"
              >
                Not now
              </button>
            </div>

            <p className="mt-4 text-xs text-zinc-500">
              Tip: when Gumroad is ready, set{" "}
              <span className="text-zinc-300">NEXT_PUBLIC_GUMROAD_URL</span> and all “Get Pro” buttons will automatically route
              there.
            </p>
          </div>
        </div>
      )}
    </main>
  );
}

# MercyLand Parish — Website Plan (Impeccable `shape` brief + build plan)

> Status: PLANNING. No site code has been written. This document is the confirmed design
> brief + execution plan. Building begins only after the user approves this plan.

## 1. Job & audience (shape: Phase 3.1)

- **Who arrives:** Lagos/Lekki residents — new movers, seekers, neighbours — plus current members and giving partners. Mobile-first; many arrive via a shared link or "church near me Lekki" search.
- **Context & state of mind:** Curious, sometimes anxious about a first visit. They need reassurance and the practical facts fast.
- **Visitor mode:** Home = **Persuade** (visit / give / pray) blended with **Experience** (the warmth should lead from the first viewport). Interior pages: About = Read, Service Times = Operate, Sermons = Read, Ministries = Read/Experience, Events = Persuade/Operate, Give = Operate, Prayer = Operate, Contact = Operate.

## 2. Outcome & proof (shape: Phase 3.2)

- **Primary task:** A first-time visitor decides to attend and knows exactly when/where/how. Secondary: give, submit a prayer request, find a sermon/ministry.
- **Success:** Within ~5 seconds a visitor knows (a) what this is, (b) the next service time, (c) the address, (d) how to visit or get in touch.
- **Real evidence carried:** real name, real phone, real Lekki address, real service rhythm. Everything else is a marked placeholder.
- **Product-specific truth:** the exact Lekki Atlantic Garden location + the unusual midweek Tue/Thu 6:30–8pm rhythm — surfaced, not buried.

## 3. Selected direction (shape: Phase 3.3)

- **Visual authority:** Warm & inviting — modern, friendly, light, welcoming (user-confirmed).
- **Anti-slop guard:** avoid the category default the skill warns about — warm cream ground + serif display + terracotta accent. We will NOT land there by reflex. The build phase runs `concept-seed.mjs` to derive a concrete visual world; palette will be a considered warm system (e.g. warm ivory/sand ground + a single committed warm accent chosen for resonance, not cliché — candidates: a reverent deep rose/garnet OR a calm golden amber, decided at build via the seed roll).
- **Structural thesis:** a "plan your visit" path that is always one tap away (sticky Visit CTA in nav + a visit block on Home), with service times and map prominent — not the generic hero-then-cards church template.
- **Focal moment:** the Home first viewport demonstrates welcome + the next service, not a stock photo behind a verse.
- **Type (proposed, finalised at build):** warm humanist sans for body (e.g. Plus Jakarta Sans / Outfit); a display serif chosen for genuine warmth (Fraunces is defensibly "soft/warm by design," not just "church = serif"). No system sans as the display voice.

## 4. Scope & boundaries (shape: Phase 3.4)

- **Fidelity:** production-ready static site, responsive desktop + mobile, accessible.
- **Breadth:** 9 sections (see §6). Single language (English).
- **Interactivity:** mobile nav toggle, Prayer Requests + Contact form (client-side validation, mailto/`formspree`-style handler slot — no backend), smooth in-page anchors, optional light reveal motion (one authored moment, not scattered).
- **Explicit anti-goals:** no CMS, no live payment, no admin login, no multi-language, no custom domain yet, no invented history/testimonials.
- **Untouched:** real facts (name/phone/address/times) must never be altered or "improved."

## 5. States & ranges (shape: Phase 3.5)

- **Content ranges:** service times 1–2 Sunday services + 2 midweek; sermons 0→N placeholder cards; events 0→N; ministries 0→N (all placeholder copy marked REPLACE).
- **Material states to handle:** empty (no events/sermons yet → graceful "check back" state, not a broken grid), form empty/error/success, loading not needed (static), mobile nav open/closed, keyboard focus, reduced-motion.

## 6. Pages & content map

| Page | Mode | Key sections | Content source |
|---|---|---|---|
| Home | Persuade/Experience | Hero (welcome + next service), Plan-your-visit block, What we believe (short), Sermons teaser, Events teaser, Give/Pray CTAs, Map | Real facts + placeholders |
| About / Our Story | Read | Welcome, Our story (REPLACE), Beliefs/values, (Leadership placeholder) | Story = placeholder |
| Service Times & Location | Operate | Weekly schedule table, Address, Embedded map, What to expect (parking, kids, etc. REPLACE) | Real schedule + address |
| Sermons / Messages | Read | Latest messages grid (notes placeholder), structured for future audio/video embed | Placeholder cards |
| Ministries | Read/Experience | Ministry cards (REPLACE descriptions) | Placeholder |
| Events | Persuade/Operate | Upcoming events list (empty-state handled) | Placeholder |
| Give | Operate | Why give, Bank details (REPLACE acct), Donation-link slot (REPLACE), no backend | Info-only |
| Prayer Requests | Operate | Short form (name optional, request, submit) | Form, no backend |
| Contact | Operate | Phone, address, email slot (REPLACE), map, simple form | Real phone/address |

## 7. Interaction & layout (shape: Phase 3.6)

- **Hierarchy:** Visit/Service-times and Location are the spine; everything routes back to them.
- **Topology:** sticky top nav with a persistent "Visit" CTA; footer with real contact + service times + placeholder social slots.
- **Responsiveness:** mobile-first; nav collapses to a toggle; schedule table becomes stacked cards on mobile.
- **Affordances/feedback:** themed focus rings, button hover/active states, form success/error messages, reduced-motion respected.
- **Motion:** one authored entrance/scroll moment in the world's grammar; exponential ease-out; no identical entrance on every section.

## 8. Constraints & open decisions (shape: Phase 3.7)

- **Platform/delivery:** static site → GitHub Pages, repo `mercyland-parish.github.io` (serves at root, free). No build pipeline required.
- **Accessibility:** WCAG 2.1 AA target (see PRODUCT.md).
- **Open decisions (do NOT invent):** exact Sunday start times; real photos/logo; live-donation provider; custom domain; social links; pastor/leadership names.

## 9. Build phases (Impeccable new-work → build → finish)

0. **init** — `PRODUCT.md` written (this folder). ✅ done as planning.
1. **shape** — this brief. (pending user approval)
2. **new-work / direction** — run `node .agents/skills/impeccable/scripts/concept-seed.mjs --scope direction --mode <mode>` to derive + assign the concrete visual world; choose committed warm palette + type; write the direction contract as the body-leading HTML comment at finish.
3. **build Home first, committed** — render first viewport, screenshot, self-check against the brief; then build remaining 8 pages inside the same world.
4. **mechanical pass** — `node .agents/skills/impeccable/scripts/detect.mjs --json` on changed files; fix tells (AI-slop, contrast, depth, spacing, type).
5. **finish review** — batched desktop + mobile screenshots; critique against the direction contract; fix in ≤2 rounds.
6. **document** — write `DESIGN.md` from the built world (ground truth).
7. **deploy** — push to GitHub `mercyland-parish.github.io`; GitHub Pages from `main` root (or `/docs` if repo is `mercyland-parish`); verify live URL + health check.
8. **verify** — open live URL, screenshot desktop + mobile, confirm contrast/a11y, confirm all real facts present and all placeholders visibly marked.

## 10. Verification plan

- `detect.mjs --json` clean (or only acknowledged items) before deploy.
- Desktop + mobile screenshots captured to `.impeccable/review/`.
- Manual: every nav link works, forms validate, map embed loads, no broken images, real phone/address correct.
- Live: `curl -I https://mercyland-parish.github.io` returns 200.

## 11. Deployment & rollback

- **Target:** GitHub Pages, free, repo `mercyland-parish.github.io`.
- **Artifacts:** static HTML/CSS/JS + `assets/` (css, js, images/placeholders).
- **Env:** no secrets (info-only Give, no backend). Form handler slot is a config constant to fill later.
- **Rollback:** revert the deploying commit; GitHub Pages redeploys previous version within ~1 min.
- **Health check:** HTTP 200 + homepage contains "MercyLand Parish" and the real address.

## 12. Known limitations (at launch)

- Logo, building, pastor, congregation photos = placeholders (clearly marked).
- Service start times within the Sunday window = editable placeholder until church confirms.
- Sermons/Events/Ministries = placeholder content until church supplies real data.
- Live donations deferred (info-only page).
- Custom domain deferred.

# Cade Barnes Brand Site — Rebuild Design Spec

**Date:** 2026-05-18
**Status:** Approved direction, pending spec review
**Source documents:** `Cade_Visual_Creative_Identity.docx` (visual brand guide), `Cade_Personal_Brand_Strategy (1).pdf` (brand & content strategy)

## 1. Goal

Rebuild the existing single-page site (`index.html`) so it is an accurate expression of Cade's brand. The current site is built on a visual identity that conflicts with the brand guide on nearly every point (wrong fonts, gold/guru accent, gradients, glow, italics) and is positioned narrowly as a solar lead-gen page. The rebuild repositions it as the **front door to Cade's personal brand** — a sales operator and team builder who teaches the concepts behind the skill — and brings every visual decision into spec.

The site is the hub people land on from social and the link-in-bio: it introduces Cade, shows proof, explains what he teaches, demonstrates the teaching style, points at what's coming (course, coaching, syndicate), and collects warm leads onto a list.

## 2. Positioning & Voice

**Positioning.** Cade is a sales operator and team builder who has had real success — built and led teams to partnership-level results, earns well, invests — and made plenty of mistakes along the way. He is not a guru and does not announce himself as anyone's mentor. He is simply a guy who figured a lot out the hard way and wants to hand the real lessons down to the guys coming up who don't have someone to ask.

**The "earned confidence" principle stays unspoken.** It drives the design; it never appears as copy.

**Voice** (from the strategy doc — applied to all copy):
- Big-brother energy: direct, warm, no bullshit. Second person ("you," "the guys").
- Concept-first: teach the why, not the script.
- Proof over bragging: numbers are evidence for a point, never a status flex.
- Open, not closed: "still figuring plenty out" is a feature. No claimed mastery.
- Personality folded in, never performed.

**Three core messages** (used structurally, not as slogans):
1. Concepts compound. Scripts plateau.
2. The moment you claim to be the best, you stop being the best.
3. Big brother, not guru.

**Income/success handling.** Cade earns well (over $1M across two years, several properties this year). This is real and may be referenced as understated proof inside prose — never as a hero number, never as a "$1M" stat callout. The old-money-flex rule applies: visible in the details, never announced.

## 3. Information Architecture

Single-page scroll, ten content sections plus footer:

1. **Nav** — sticky, wordmark + anchor links
2. **Hero** — declaration + support + soft CTA
3. **Proof bar** — four proof stats
4. **About** — origin story
5. **POV band** — single core-message statement
6. **What I Teach** — three content-pillar cards
7. **Frameworks** — *the one light section* — a Bold Frames comparison graphic
8. **Work With Me** — three forthcoming offers, waitlist CTAs
9. **Lifestyle** — Instagram grid
10. **Connect** — follow links + waitlist form
11. **Footer**

## 4. Visual System

All values are taken directly from the visual brand guide. The site is dark-default (Off-Black); exactly one section (Frameworks) is light (Clean White), per the guide's rule that light is reserved for teaching frameworks.

### 4.1 Typography

Three typefaces, loaded from CDNs:
- **General Sans** (Fontshare) — weights 600, 700. Headlines, hooks, card headlines, ALL CAPS.
- **Satoshi** (Fontshare) — weights 400, 500. All body, descriptions, captions.
- **Space Grotesk** (Google Fonts) — weights 500, 700. Stat numbers, step numbers, category/eyebrow labels, timestamps.

Load via:
- `https://api.fontshare.com/v2/css?f[]=general-sans@600,700&f[]=satoshi@400,500&display=swap`
- `https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&display=swap`

Type scale (web-adapted from the guide's spec table):

| Role | Font / weight | Size | Tracking | Line height | Case |
|---|---|---|---|---|---|
| Hero headline | General Sans 700 | `clamp(2.75rem, 6vw, 5rem)` | -0.02em | 1.05 | ALL CAPS |
| Section headline | General Sans 700 | `clamp(2rem, 4vw, 3.2rem)` | -0.015em | 1.1 | ALL CAPS |
| Card / offer headline | General Sans 600 | 1.25–1.4rem | -0.01em | 1.15 | ALL CAPS |
| Subheadline | Satoshi 500 | 1.2–1.5rem | 0 | 1.4 | Sentence |
| Body | Satoshi 400 | 1rem–1.125rem | 0 | 1.55 | Sentence |
| Stat number | Space Grotesk 700 | `clamp(3rem, 5vw, 4.5rem)` | +0.01em | 1 | — |
| Eyebrow / category label | Space Grotesk 500 | 0.72rem | +0.07em | 1 | UPPERCASE |
| Footer / watermark micro | Space Grotesk 500 | 0.72rem | +0.04em | 1 | — |

**Typographic rules:** ALL CAPS for hooks/headlines/declarations; sentence case for all body and teaching copy. Never title case, never all-lowercase, never italic. Declarations end with periods; fragments are encouraged and each gets a period.

### 4.2 Color

CSS custom properties:

```
--off-black:   #111110   /* primary dark canvas, body text on light */
--warm-dark:   #1E1C19   /* cards on dark, secondary dark layering */
--clean-white: #F7F4F0   /* primary light, text on dark, Frameworks bg */
--soft-gray:   #E8E4DF   /* cards on light, subtle backgrounds */
--warm-tan:    #C4B49A   /* signature accent: labels, step numbers, accent line */
--bright-tan:  #D9C9AD   /* hover/active states only, sparingly */
--warm-stone:  #8A8279   /* muted text, captions, secondary copy */
--warm-red:    #B85C4A   /* form validation errors only — never decorative */
```

Proportions: black + white foundation ~80%; Warm Tan accent 10–15%; Stone/muted 5–10%. Warm Tan is **never** a background fill (it loses signal power).

### 4.3 Components

- **Accent line** — the signature element and the *only* decorative element. 2–3px tall, ~40px wide, Warm Tan. Appears in every section, marking the transition from headline to supporting content. On scroll-in it draws left-to-right (`transform: scaleX(0)` → `1`, `transform-origin: left`, ~0.25s) — the one element allowed visible direction.
- **Card** — 16px corner radius; background Warm Dark on dark sections / Soft Gray on the light section; internal padding 28–32px; 1px hairline border (`rgba` of the foreground at low alpha); a Warm Tan accent line at the top edge. No glow, no shadow on hover.
- **Buttons** — Primary: Warm Tan background, Off-Black text, no border. Secondary: transparent, 1px Warm Stone border, foreground text. Both: General Sans 600, uppercase, ~0.8rem, generous padding, 16px radius to match cards. Hover = background/text shifts toward Bright Tan. **No** shimmer sweep, **no** glow shadow, **no** translate/scale on hover.
- **Comparison graphic** — two equal-width columns divided by a single 2–3px vertical Warm Tan line. Both columns get identical visual treatment — no color-coding a "right" answer. Column labels in General Sans Bold uppercase.
- **Stat block** — oversized Space Grotesk number, small Space Grotesk uppercase label beneath.

### 4.4 Layout

- Section horizontal padding: ~5rem desktop, ~3rem tablet, ~1.5rem mobile. Minimum 36px gutter always.
- Left-aligned by default. Centered only for the single-line POV declaration. Never right-aligned, never centered body paragraphs.
- Statement-and-proof order in every section: headline (loud) → accent line (transition) → supporting copy (conversational) → quiet zone.
- A deliberately quiet bottom zone on each major section — generous whitespace, no content crowded to edges.

### 4.5 Motion

- Scroll-in: **opacity-only** fade (0.5–0.7s ease). No `translateY`, no slide, no scale — the guide explicitly prohibits slide-in entrances.
- Hero: staggered opacity fades on eyebrow → headline → accent line → support → CTAs (~0.1s stagger).
- Accent line: `scaleX` draw, left origin, ~0.25s.
- Proof stats: subtle count-up for numeric values when scrolled into view; holds once complete.
- Nav: background fades to translucent Off-Black with blur after ~50px scroll.
- `prefers-reduced-motion`: disable all fades, the count-up, and the accent-line draw — render everything in final state.
- Prohibited: bounce, elastic, spin, rotation, slide-in, scale-on-text, speed ramps, glitch, looping background animation.

## 5. Section-by-Section Spec

Copy below is the implementation copy. Proof figures marked ⚠ need confirmation from Cade before launch (see §9).

### 5.1 Nav
Wordmark `CADE BARNES` (General Sans 600). Links: About · Teaching · Frameworks · Work With Me · Connect. Transparent over hero; translucent Off-Black + blur + hairline bottom border on scroll. Mobile: hamburger → full-screen Off-Black overlay menu.

### 5.2 Hero
Two-column (text left, image right); stacks on tablet.
- Eyebrow: `SALES · LEADERSHIP · INVESTING`
- Headline: `I LEARNED THIS THE HARD WAY`
- Accent line
- Support (Satoshi): "Built and led the teams. Made the money, made the mistakes, still figuring plenty out. Here's what's held up — for the guys who don't have someone to ask."
- CTAs: primary "Get on the list" → `#connect`; secondary "What I teach" → `#teaching`
- Image: `images/hero.jpg`, warm-toned, object-fit cover. No gradient overlay on the image — it sits clean in its column against the Off-Black canvas.
- Quiet bottom zone (no scroll-indicator gimmick).

### 5.3 Proof Bar
Full-width row, four stat blocks divided by hairline borders. Proof, not flex — no dollar figures.
- `7` — Years on the doors ⚠
- `2×` — Promoted at V3 ⚠
- `Partnership` — Teams built and led to it ⚠
- `Today` — Still selling in the field

### 5.4 About
Two-column (prose left, portrait/environment image right — reuse an existing `images/ig*.jpg` or `hero` crop).
- Eyebrow: `ABOUT`
- Headline: `NOBODY HANDED ME A ROADMAP`
- Accent line
- Prose (3 short paragraphs, sentence case), covering the origin beats:
  1. Young guy, no older brother, learned everything the hard way; found door-to-door sales and fell in love with the skill.
  2. Hit partnership, built and led teams to real numbers; the money followed — referenced plainly and briefly, not as a flex — but what's worth talking about is what it cost to learn.
  3. Saw the people at the top either burn out or get full of themselves; wanted neither. Decided to be the person he wishes he'd had, and to share the work in the open while he's still doing it.

### 5.5 POV Band
Full-width Off-Black band, centered, generous vertical padding.
- Centered accent line above
- Statement (General Sans, large, ALL CAPS): `THE MOMENT YOU CLAIM TO BE THE BEST, YOU STOP BEING THE BEST.`
- One quiet support line (Satoshi, Warm Stone): "Closed systems calcify. Open ones compound. Everything here starts from that."

### 5.6 What I Teach
Eyebrow `WHAT I TEACH`, headline `THE SKILL STACK`, accent line, then a three-card grid. Each card: Space Grotesk step number (Warm Tan), General Sans headline, Satoshi description, top accent line.
- `01` **SALES & LEADERSHIP** — "The skill of selling and leading people, taught at the concept level — why it works, not just what to say. Frameworks that hold up in any room."
- `02` **MINDSET & RELATIONSHIPS** — "The inner game behind the outer wins. Identity, ego, staying level when you start winning, and keeping the people who matter."
- `03` **MONEY & INVESTING** — "What to actually do with money once it starts coming in. Income versus assets, taxes, and the moves school never taught you."

### 5.7 Frameworks (light section)
The only Clean White section. Background `--clean-white`, text `--off-black`, cards `--soft-gray`. Demonstrates the Bold Frames system and the concept-first teaching style.
- Eyebrow: `HOW I TEACH`
- Headline: `CONCEPTS, NOT SCRIPTS`
- Accent line
- Intro line (Satoshi): "Here's one. Same conversation, two completely different outcomes."
- Comparison graphic — two equal columns, single vertical Warm Tan divider, identical treatment on both sides (no color-coding):
  - Left label `TRANSACTIONAL` — lines: "Leads with the script." / "Manages the number." / "Owns the rep's results." / "Wins the month."
  - Right label `TRANSFORMATIONAL` — lines: "Leads with the concept." / "Develops the person." / "Hands the rep ownership." / "Builds a career."
- Caption beneath (Satoshi, Stone): "One plateaus. One compounds. The course goes deep on the second one."

### 5.8 Work With Me
Eyebrow `WHAT'S COMING`, headline `WORK WITH ME`, accent line. Three offer cards — all forthcoming, all soft CTAs pointing to `#connect`. A quiet line under the headline: "Nothing's for sale yet. The list is how you hear first."
- **THE COURSE** — "Sales and psychology training — the principles underneath the scripts, the part most reps never get taught. In development now." CTA: "Join the waitlist"
- **COACHING** — "Group and one-on-one. Direct work on your sales, your team, and how you lead. Opening to a small group first." CTA: "Request a spot"
- **THE SYNDICATE** — "Access to real investment deals, qualification-gated — built for guys serious about turning income into assets. On the way." CTA: "Get the details"

### 5.9 Lifestyle
Eyebrow `OFF THE CLOCK`, headline `THERE'S MORE TO IT`, accent line. Instagram-style grid of the five existing `images/ig*.jpg`, first tile spanning 2×2. Link to `@mccadebarnes`. Candid, warm — old-money-flex rule respected (no staged or performative shots).

### 5.10 Connect
Two-column. Left: eyebrow `GET ON THE LIST`, headline `LET'S CONNECT`, accent line, short copy ("Course, coaching, the syndicate, or you just want to follow the build — get on the list and you'll hear first. No spam, no pitch-slapping."), and an Instagram follow link. Right: waitlist form in a card.
- Form fields: First name, Last name, Email, "What are you here for?" select (Sales course / Coaching / The syndicate / Just following along), optional Message.
- Submit button: "Get on the list".
- Submission stays a client-side confirmation stub (as today). Wiring to a real capture backend is out of scope (§8).
- Validation errors use `--warm-red`.

### 5.11 Footer
Wordmark `CADE BARNES`, Instagram link, copyright `© 2026 Cade Barnes`. One quiet line (Space Grotesk micro, Stone): "Build it right. Have fun with it."

## 6. What Gets Removed (current brand violations)

- Playfair Display + DM Sans → replaced entirely.
- Copper/gold accent `#c8956c` and all `--gold`/`--accent-*` variants → deleted (this is the "guru gold" the guide forbids).
- All gradients: button shimmer sweep, hero image overlays, radial glows in the quote section, gradient card underlines.
- All glow box-shadows (accent-colored shadows on buttons, cards, stats).
- Italic accent words in headlines.
- The giant decorative `"` quote mark in the About section.
- The grain/noise body overlay.
- `translateY` slide-up scroll entrances → opacity-only.
- The vertical scroll-indicator gimmick.
- Emoji used as design elements (the value-card icons) → removed; pillars use Space Grotesk step numbers instead.

## 7. Technical Approach

- Remains a single static `index.html` with inline `<style>` and `<script>`. No build step, no framework — correct for a one-page brand site and matches the current Vercel static deployment.
- Images reused from `images/`. No new assets required for the rebuild.
- Vanilla JS only: nav scroll state, mobile menu, smooth anchor scroll, IntersectionObserver fade-ins, stat count-up, form stub.
- Semantic HTML, descriptive `alt` text, visible focus states (Warm Tan focus ring), `prefers-reduced-motion` honored.

## 8. Out of Scope

- Wiring the contact form to a real backend / email capture service (stays a client-side stub).
- Multi-page expansion, blog, or CMS.
- New or reshot photography (the brand guide flags a future content shoot; the rebuild uses existing images).
- Separate landing pages for the course / coaching / syndicate (they are forthcoming; the site only collects interest).
- Analytics, SEO meta beyond a correct `<title>`/description, favicon work — unless requested.

## 9. Open Content Items (verify with Cade before launch)

- Exact proof-bar figures: years on the doors, number of promotions at V3, the right framing for "partnership" (pest control vs V3). Current values are best-effort from the strategy doc and marked ⚠.
- Whether the origin paragraph may reference the income/properties at all, and how lightly.
- Confirmation of the Instagram handle `@mccadebarnes` as the canonical link.
- Final offer names ("The Course", "The Syndicate") and whether waitlist language is accurate to current plans.

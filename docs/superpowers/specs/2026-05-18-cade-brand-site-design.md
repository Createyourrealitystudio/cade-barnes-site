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

**Income/success handling.** Money stays off the site entirely for now — no income figures and no earnings references anywhere, including in prose. Money is only ever surfaced later, with real context (e.g. investment-property photos Cade will supply). Until then, credibility is carried by experience, role, and the quality of the teaching — never by numbers about money.

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
Full-width row, four stat blocks divided by hairline borders. Proof, not flex — no dollar figures. Each block is a short Space Grotesk token (the loud word/number) over a small uppercase label.
- `7` — Years on the doors ⚠ (exact figure pending — see §9)
- `2×` — Promoted at the solar company (confirmed)
- `Partner` — Reached it in pest control, before this (confirmed)
- `Daily` — Still selling on the doors himself (confirmed) — the ICP's single most important credibility filter

### 5.4 About
Two-column (prose left, portrait/environment image right — reuse an existing `images/ig*.jpg` or `hero` crop).
- Eyebrow: `ABOUT`
- Headline: `NOBODY HANDED ME A ROADMAP`
- Accent line
- Prose (3 short paragraphs, sentence case), covering the origin beats:
  1. Young guy, no older brother, learned everything the hard way; found door-to-door sales and fell in love with the skill.
  2. Worked his way up to partner at a pest control company, then into solar — two of the hardest doors in door-to-door — building and leading sales teams the whole way, and learning what that actually takes, mistakes included.
  3. Saw the people at the top either burn out or get full of themselves; wanted neither. Today he still leads a sales downline and still sells on the doors himself — sharing the work in the open as he does it, being the person he wishes he'd had.

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
Eyebrow `WHAT'S COMING`, headline `WORK WITH ME`, accent line. Three offer cards — all forthcoming. A quiet line under the headline: "Nothing's for sale yet. The list is how you hear first." Each card carries a small `COMING SOON` tag (Space Grotesk uppercase, Warm Tan). Each CTA scrolls to the Connect form (§5.10) and pre-selects the matching option in the form's "What are you here for?" dropdown.
- **THE COURSE** — "Sales and psychology training — the principles underneath the scripts, the part most reps never get taught. In development now." CTA: "Join the waitlist" (pre-selects *Sales course*)
- **COACHING** — "Group and one-on-one. Direct work on your sales, your team, and how you lead. Opening to a small group first." CTA: "Request a spot" (pre-selects *Coaching*)
- **THE SYNDICATE** — "Access to real investment deals, qualification-gated — built for guys serious about turning income into assets. On the way." CTA: "Get the details" (pre-selects *The syndicate*)

### 5.9 Lifestyle
Eyebrow `OFF THE CLOCK`, headline `THERE'S MORE TO IT`, accent line. Instagram-style grid of the five existing `images/ig*.jpg`, first tile spanning 2×2. Link to `@mccadebarnes`. Candid, warm — old-money-flex rule respected (no staged or performative shots).

### 5.10 Connect
Two-column. Left: eyebrow `GET ON THE LIST`, headline `LET'S CONNECT`, accent line, short copy ("Course, coaching, the syndicate, or you just want to follow the build — get on the list and you'll hear first. No spam, no pitch-slapping."), and an Instagram follow link. Right: a working waitlist form in a card.
- Form fields: First name, Last name, Email, "What are you here for?" select (Sales course / Coaching / The syndicate / Just following along), optional Message.
- Submit button: "Get on the list".
- The form is **functional** — on submit, JS POSTs the fields to a Google Apps Script web-app endpoint (§7.2). That script appends a timestamped row to a Google Sheet Cade owns, emails Cade a notification with the lead details, and emails the submitter a short confirmation.
- Client behavior: required-field validation (errors styled with `--warm-red`); on submit the button shows a sending state, then an inline success message ("You're on the list. Check your email."); the form resets.
- Graceful pre-deploy behavior: the endpoint lives in a single JS constant `FORM_ENDPOINT`. While it still holds the placeholder value, the form skips the network POST and shows the success state anyway, so the site is fully usable before the script is wired. Once the real `/exec` URL is pasted in, submissions post for real.

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

### 7.1 Site
- Remains a single static `index.html` with inline `<style>` and `<script>`. No build step, no framework — correct for a one-page brand site and matches the current Vercel static deployment.
- Images reused from `images/`. No new assets required for the rebuild.
- Vanilla JS only: nav scroll state, mobile menu, smooth anchor scroll, IntersectionObserver fade-ins, stat count-up, Work-With-Me CTA → form pre-select, and the form submit/validation handler.
- Semantic HTML, descriptive `alt` text, visible focus states (Warm Tan focus ring), `prefers-reduced-motion` honored.

### 7.2 Form backend (Google Apps Script → Google Sheet)
- Delivered as a separate file `apps-script.gs` in the repo, plus setup instructions at `docs/form-setup.md`.
- The script's `doPost(e)` reads the submitted fields, appends a row `[timestamp, first name, last name, email, interest, message]` to the bound Google Sheet, sends Cade a notification email with the lead details, and sends the submitter a short confirmation email. It returns a JSON `ContentService` response.
- Cade's notification address and the confirmation email copy live in clearly marked constants at the top of the script.
- Client posts via `fetch` with a `FormData` body (a "simple request" — no CORS preflight). The success state is shown on request completion.
- One-time manual setup by Cade/the team (documented in `form-setup.md`): create a Google Sheet → Extensions → Apps Script → paste `apps-script.gs` → set the notification email → Deploy as Web app (Execute as: Me; Access: Anyone) → copy the `/exec` URL → paste it into the `FORM_ENDPOINT` constant in `index.html`. This step needs Cade's Google account and cannot be done for him.

## 8. Out of Scope

- The one-time Google account setup itself — creating the Sheet and deploying the Apps Script (the spec delivers the script and step-by-step instructions; the deploy is Cade's to run).
- Money / income content — confirmed figures exist ($1M+ over two years, sub-2% effective tax rate) but stay off the site for now per direction; to be added later only with real context (e.g. investment-property photos Cade will supply).
- Peer / network proof that isn't Cade's to claim on his own site — colleague endorsements (e.g. a set closer saying he'd follow Cade anywhere) and named high-earner connections belong in collab content, not on the site.
- Multi-page expansion, blog, or CMS.
- New or reshot photography (the brand guide flags a future content shoot; the rebuild uses existing images).
- Separate landing pages for the course / coaching / syndicate (they are forthcoming; the site only collects interest).
- Analytics, SEO meta beyond a correct `<title>`/description, favicon work — unless requested.

## 9. Open Content Items (verify with Cade before launch)

- Exact proof-bar values: real years on the doors, and ideally a concrete number for the solar downline (e.g. team/rep count) to replace a word-token with a stronger stat.
- Whether to name the solar company explicitly (e.g. "V3") or keep it generic as "a solar company." Draft copy keeps it generic.
- Cade's email address for form notifications, and the wording of the submitter confirmation email.
- Confirmation of the Instagram handle `@mccadebarnes` as the canonical link.
- Final offer names ("The Course", "The Syndicate") and whether the waitlist language matches current plans.

## 10. Deliverables

- `index.html` — the rebuilt single-page site.
- `apps-script.gs` — the Google Apps Script form backend.
- `docs/form-setup.md` — step-by-step setup/deploy instructions for the form.

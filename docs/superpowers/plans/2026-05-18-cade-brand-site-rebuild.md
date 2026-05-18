# Cade Barnes Brand Site Rebuild — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `index.html` as a brand-accurate single-page site for Cade Barnes, and add a working Google Apps Script backend for the waitlist form.

**Architecture:** A single static `index.html` with one inline `<style>` block and one inline `<script>` block — no build step, deployed as-is on Vercel. The page is assembled section by section; each section task inserts HTML before a `<!-- INSERT SECTIONS ABOVE -->` marker and CSS before a `/* INSERT SECTION CSS ABOVE */` marker, so sections land in document order. The waitlist form POSTs to a Google Apps Script web app (`apps-script.gs`) that appends rows to a Google Sheet and sends email.

**Tech Stack:** HTML5, vanilla CSS (custom properties, grid, clamp), vanilla JS (IntersectionObserver, fetch), Google Apps Script. Fonts: General Sans + Satoshi (Fontshare CDN), Space Grotesk (Google Fonts).

**Reference spec:** `docs/superpowers/specs/2026-05-18-cade-brand-site-design.md` — read it before starting.

**Verification note:** This is a static site with no test framework. "Verify" steps mean loading `index.html` in a browser via the Playwright MCP tools (`browser_navigate`, `browser_snapshot`, `browser_take_screenshot`, `browser_console_messages`) and confirming the stated observable result. The file URL is `file:///Users/christophercagle/Projects/cade-barnes-site/index.html`.

**Branch:** Work happens on the existing `cade-brand-rebuild` branch. Commit after every task.

---

## Task 1: Scaffold + design system

Replace the entire current `index.html` with a fresh scaffold: document head, font loading, and the complete design-system CSS (tokens, reset, typography, shared components, motion). No page sections yet — just empty insertion markers.

**Files:**
- Modify (full overwrite): `index.html`

- [ ] **Step 1: Overwrite `index.html` with the scaffold**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cade Barnes — Sales Operator & Team Builder</title>
  <meta name="description" content="Cade Barnes — sales operator and team builder. The concepts behind the skill, taught by someone still doing the work.">
  <link rel="preconnect" href="https://api.fontshare.com" crossorigin>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://api.fontshare.com/v2/css?f[]=general-sans@600,700&f[]=satoshi@400,500&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">
  <style>
    *,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
    :root{
      --off-black:#111110;--warm-dark:#1E1C19;--clean-white:#F7F4F0;--soft-gray:#E8E4DF;
      --warm-tan:#C4B49A;--bright-tan:#D9C9AD;--warm-stone:#8A8279;--warm-red:#B85C4A;
      --font-display:'General Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
      --font-body:'Satoshi',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
      --font-data:'Space Grotesk',ui-monospace,SFMono-Regular,monospace;
      --pad-x:clamp(1.5rem,5vw,5rem);
      --maxw:1280px;
    }
    html{scroll-behavior:smooth;-webkit-text-size-adjust:100%;}
    body{
      font-family:var(--font-body);font-weight:400;line-height:1.55;
      background:var(--off-black);color:var(--clean-white);
      -webkit-font-smoothing:antialiased;overflow-x:hidden;
    }
    img{display:block;max-width:100%;}
    a{color:inherit;text-decoration:none;}
    ul{list-style:none;}
    ::selection{background:var(--warm-tan);color:var(--off-black);}
    :focus-visible{outline:2px solid var(--warm-tan);outline-offset:3px;}
    section[id]{scroll-margin-top:88px;}

    /* layout */
    .section{padding:clamp(4.5rem,9vw,8rem) var(--pad-x);}
    .inner{max-width:var(--maxw);margin:0 auto;}
    .section-light{background:var(--clean-white);color:var(--off-black);}

    /* typography */
    .eyebrow{
      font-family:var(--font-data);font-weight:500;font-size:.72rem;
      letter-spacing:.07em;text-transform:uppercase;color:var(--warm-tan);
    }
    .headline{
      font-family:var(--font-display);font-weight:700;text-transform:uppercase;
      letter-spacing:-.015em;line-height:1.1;font-size:clamp(2rem,4vw,3.2rem);
    }
    .section-light .headline{color:var(--off-black);}

    /* accent line — the only decorative element */
    .accent-line{
      width:42px;height:3px;background:var(--warm-tan);transform-origin:left;
      transition:transform .35s cubic-bezier(.16,1,.3,1) .05s;
    }

    /* section header block */
    .section-head{display:flex;flex-direction:column;gap:1.1rem;margin-bottom:3rem;max-width:640px;}

    /* buttons */
    .btn{
      display:inline-flex;align-items:center;justify-content:center;gap:.5rem;
      font-family:var(--font-display);font-weight:600;font-size:.82rem;
      letter-spacing:.02em;text-transform:uppercase;
      padding:1rem 1.75rem;border-radius:14px;border:1px solid transparent;
      cursor:pointer;text-decoration:none;
      transition:background .25s ease,color .25s ease,border-color .25s ease;
    }
    .btn-primary{background:var(--warm-tan);color:var(--off-black);}
    .btn-primary:hover{background:var(--bright-tan);}
    .btn-primary:disabled{opacity:.6;cursor:default;}
    .btn-secondary{background:transparent;color:var(--clean-white);border-color:var(--warm-stone);}
    .btn-secondary:hover{border-color:var(--bright-tan);color:var(--bright-tan);}
    .section-light .btn-secondary{color:var(--off-black);}
    .section-light .btn-secondary:hover{color:var(--off-black);border-color:var(--off-black);}

    /* card */
    .card{
      background:var(--warm-dark);border:1px solid rgba(247,244,240,.07);
      border-radius:16px;padding:2rem;
    }
    .section-light .card{background:var(--soft-gray);border-color:rgba(17,17,16,.08);}

    /* motion — opacity-only fades, no slide/scale on content */
    .js .pre-reveal{opacity:0;}
    .js .accent-line.pre-reveal{opacity:1;transform:scaleX(0);}
    .reveal{transition:opacity .7s ease;}
    .is-revealed{opacity:1!important;}
    .accent-line.is-revealed{transform:scaleX(1);}
    @media (prefers-reduced-motion:reduce){
      html{scroll-behavior:auto;}
      .reveal,.accent-line{transition:none!important;}
      .pre-reveal{opacity:1!important;}
      .accent-line.pre-reveal{transform:none!important;}
    }

    /* INSERT SECTION CSS ABOVE */
  </style>
</head>
<body>
  <!-- INSERT NAV -->
  <main>
    <!-- INSERT SECTIONS ABOVE -->
  </main>
  <!-- INSERT FOOTER -->
  <!-- INSERT SCRIPT -->
</body>
</html>
```

- [ ] **Step 2: Verify the scaffold loads**

Use Playwright: `browser_navigate` to `file:///Users/christophercagle/Projects/cade-barnes-site/index.html`, then `browser_take_screenshot`.
Expected: a blank dark page with background `#111110`. `browser_console_messages` shows no errors.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "Rebuild scaffold: brand design-system CSS and document head"
```

---

## Task 2: Navigation

A fixed top nav: wordmark left, anchor links right, hamburger on mobile. Transparent over the hero, translucent Off-Black with blur after scrolling.

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Insert the nav HTML** — replace the `<!-- INSERT NAV -->` line with:

```html
  <nav class="nav" id="nav">
    <a href="#top" class="nav-logo">CADE BARNES</a>
    <ul class="nav-links" id="navLinks">
      <li><a href="#about">About</a></li>
      <li><a href="#teaching">Teaching</a></li>
      <li><a href="#frameworks">Frameworks</a></li>
      <li><a href="#work">Work With Me</a></li>
      <li><a href="#connect">Connect</a></li>
    </ul>
    <button class="nav-toggle" id="navToggle" aria-label="Open menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </nav>
```

- [ ] **Step 2: Insert the nav CSS** — immediately before the `/* INSERT SECTION CSS ABOVE */` marker:

```css
    .nav{
      position:fixed;top:0;left:0;right:0;z-index:100;
      display:flex;align-items:center;justify-content:space-between;
      padding:1.25rem var(--pad-x);
      transition:background .3s ease,padding .3s ease,border-color .3s ease;
      border-bottom:1px solid transparent;
    }
    .nav.scrolled{
      background:rgba(17,17,16,.88);backdrop-filter:blur(16px);
      -webkit-backdrop-filter:blur(16px);
      padding-top:.85rem;padding-bottom:.85rem;
      border-bottom-color:rgba(247,244,240,.08);
    }
    .nav-logo{
      font-family:var(--font-display);font-weight:700;font-size:1rem;
      letter-spacing:.01em;color:var(--clean-white);
    }
    .nav-links{display:flex;gap:2rem;}
    .nav-links a{
      font-family:var(--font-data);font-weight:500;font-size:.74rem;
      letter-spacing:.06em;text-transform:uppercase;color:var(--warm-stone);
      transition:color .2s ease;
    }
    .nav-links a:hover{color:var(--bright-tan);}
    .nav-toggle{
      display:none;flex-direction:column;gap:5px;
      background:none;border:none;cursor:pointer;padding:4px;z-index:120;
    }
    .nav-toggle span{width:24px;height:2px;background:var(--clean-white);transition:all .25s ease;}
    .nav-toggle.open span:nth-child(1){transform:translateY(7px) rotate(45deg);}
    .nav-toggle.open span:nth-child(2){opacity:0;}
    .nav-toggle.open span:nth-child(3){transform:translateY(-7px) rotate(-45deg);}
    @media (max-width:860px){
      .nav-toggle{display:flex;}
      .nav-links{
        position:fixed;inset:0;background:var(--off-black);
        flex-direction:column;align-items:center;justify-content:center;gap:2.25rem;
        transform:translateX(100%);transition:transform .3s ease;
      }
      .nav-links.open{transform:translateX(0);}
      .nav-links a{font-size:1.1rem;}
    }
```

- [ ] **Step 3: Verify**

Reload the file in Playwright. `browser_take_screenshot`.
Expected: nav bar visible at top with "CADE BARNES" left and five links right. Resize to 500px wide (`browser_resize`) — links hide, hamburger shows. (Hamburger won't open yet; JS arrives in Task 12.)

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "Add fixed navigation with mobile menu markup"
```

---

## Task 3: Hero

Two-column hero: declaration + support + CTAs left, photo right. Full viewport height, quiet bottom zone, no gradient overlay on the image.

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Insert the hero HTML** — immediately before `<!-- INSERT SECTIONS ABOVE -->`:

```html
    <header class="hero" id="top">
      <div class="hero-text">
        <p class="eyebrow">Sales · Leadership · Investing</p>
        <h1 class="hero-headline">I Learned This<br>The Hard Way</h1>
        <div class="accent-line"></div>
        <p class="hero-support">Built and led the teams. Made the mistakes, kept the lessons, still figuring plenty out. Here's what's held up — for the guys who don't have someone to ask.</p>
        <div class="hero-cta">
          <a href="#connect" class="btn btn-primary">Get on the list</a>
          <a href="#teaching" class="btn btn-secondary">What I teach</a>
        </div>
      </div>
      <div class="hero-photo">
        <img src="images/hero.jpg" alt="Cade Barnes" loading="eager">
      </div>
    </header>
```

- [ ] **Step 2: Insert the hero CSS** — before `/* INSERT SECTION CSS ABOVE */`:

```css
    .hero{
      display:grid;grid-template-columns:1.05fr .95fr;
      min-height:100vh;align-items:center;
    }
    .hero-text{
      display:flex;flex-direction:column;align-items:flex-start;gap:1.5rem;
      padding:8rem var(--pad-x) 9rem;
    }
    .hero-headline{
      font-family:var(--font-display);font-weight:700;text-transform:uppercase;
      font-size:clamp(2.75rem,6vw,5rem);line-height:1.05;letter-spacing:-.02em;
    }
    .hero-support{
      font-size:clamp(1rem,1.4vw,1.15rem);color:var(--warm-stone);
      max-width:34rem;line-height:1.6;
    }
    .hero-cta{display:flex;gap:1rem;flex-wrap:wrap;margin-top:.5rem;}
    .hero-photo{position:relative;height:100vh;}
    .hero-photo img{width:100%;height:100%;object-fit:cover;object-position:center top;}
    @media (max-width:860px){
      .hero{grid-template-columns:1fr;min-height:auto;}
      .hero-text{padding:7.5rem var(--pad-x) 4rem;order:2;}
      .hero-photo{height:62vh;order:1;}
    }
```

- [ ] **Step 3: Verify**

Reload in Playwright. `browser_take_screenshot` (full page).
Expected: left column has the tan eyebrow, large ALL-CAPS "I LEARNED THIS THE HARD WAY", a short tan accent line, the support paragraph in muted stone, and two buttons (tan filled "Get on the list", outlined "What I teach"). Right column shows `images/hero.jpg` filling full height, no gradient wash over it. No console errors.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "Add hero section"
```

---

## Task 4: Proof bar

A full-width four-item band of proof stats with hairline dividers. Numeric values count up later (Task 12).

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Insert the proof HTML** — before `<!-- INSERT SECTIONS ABOVE -->`:

```html
    <section class="proof" aria-label="Track record">
      <div class="proof-item">
        <span class="proof-tick"></span>
        <span class="proof-num">7</span>
        <span class="proof-label">Years on the doors</span>
      </div>
      <div class="proof-item">
        <span class="proof-tick"></span>
        <span class="proof-num">2&times;</span>
        <span class="proof-label">Promoted in solar</span>
      </div>
      <div class="proof-item">
        <span class="proof-tick"></span>
        <span class="proof-num">Partner</span>
        <span class="proof-label">Reached it in pest control</span>
      </div>
      <div class="proof-item">
        <span class="proof-tick"></span>
        <span class="proof-num">Daily</span>
        <span class="proof-label">Still on the doors himself</span>
      </div>
    </section>
```

- [ ] **Step 2: Insert the proof CSS** — before `/* INSERT SECTION CSS ABOVE */`:

```css
    .proof{
      display:grid;grid-template-columns:repeat(4,1fr);
      border-top:1px solid rgba(247,244,240,.08);
      border-bottom:1px solid rgba(247,244,240,.08);
    }
    .proof-item{
      display:flex;flex-direction:column;gap:.6rem;
      padding:clamp(2.25rem,4vw,3.25rem) clamp(1.25rem,2.5vw,2.25rem);
      border-right:1px solid rgba(247,244,240,.08);
    }
    .proof-item:last-child{border-right:none;}
    .proof-tick{width:34px;height:3px;background:var(--warm-tan);}
    .proof-num{
      font-family:var(--font-data);font-weight:700;
      font-size:clamp(2.5rem,4.5vw,4rem);line-height:1;letter-spacing:.01em;
      color:var(--clean-white);
    }
    .proof-label{
      font-family:var(--font-data);font-weight:500;font-size:.74rem;
      letter-spacing:.05em;text-transform:uppercase;color:var(--warm-stone);
    }
    @media (max-width:680px){
      .proof{grid-template-columns:1fr 1fr;}
      .proof-item:nth-child(2){border-right:none;}
      .proof-item:nth-child(1),.proof-item:nth-child(2){border-bottom:1px solid rgba(247,244,240,.08);}
    }
```

- [ ] **Step 3: Verify**

Reload in Playwright. `browser_take_screenshot`.
Expected: four cells directly under the hero, each with a small tan tick, a large Space Grotesk value (`7`, `2×`, `Partner`, `Daily`), and an uppercase muted label. Hairline dividers between cells.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "Add proof bar"
```

---

## Task 5: About

Two-column section: origin-story prose left, portrait right.

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Insert the about HTML** — before `<!-- INSERT SECTIONS ABOVE -->`:

```html
    <section class="section about" id="about">
      <div class="inner about-grid">
        <div class="about-text reveal">
          <p class="eyebrow">About</p>
          <h2 class="headline">Nobody Handed Me<br>A Roadmap</h2>
          <div class="accent-line"></div>
          <p>I grew up without an older brother to show me how any of this worked, so I learned it the hard way — by doing it. Door-to-door sales is where it clicked, and I fell in love with the skill of it.</p>
          <p>I worked my way up to partner at a pest control company, then into solar — two of the hardest doors in door-to-door. I built and led sales teams the whole way, and learned what that actually takes. Mistakes included.</p>
          <p>I watched the guys at the top either burn out or get full of themselves. I wanted neither. So now I lead a sales downline, still sell on the doors myself, and put the real lessons out in the open — the older brother I wish I'd had.</p>
        </div>
        <div class="about-photo reveal">
          <img src="images/ig5.jpg" alt="Cade Barnes" loading="lazy">
        </div>
      </div>
    </section>
```

- [ ] **Step 2: Insert the about CSS** — before `/* INSERT SECTION CSS ABOVE */`:

```css
    .about-grid{display:grid;grid-template-columns:1.1fr .9fr;gap:clamp(2.5rem,5vw,5rem);align-items:center;}
    .about-text{display:flex;flex-direction:column;align-items:flex-start;gap:1.25rem;}
    .about-text .accent-line{margin:.3rem 0 .5rem;}
    .about-text h2{margin-top:.3rem;}
    .about-text p{color:var(--warm-stone);font-size:1.05rem;line-height:1.65;}
    .about-photo img{width:100%;aspect-ratio:4/5;object-fit:cover;border-radius:16px;}
    @media (max-width:860px){
      .about-grid{grid-template-columns:1fr;}
      .about-photo{order:-1;}
      .about-photo img{aspect-ratio:3/2;}
    }
```

- [ ] **Step 3: Verify**

Reload in Playwright, scroll to `#about`, `browser_take_screenshot`.
Expected: left column — "About" eyebrow, ALL-CAPS headline, tan accent line, three prose paragraphs in muted stone. Right column — `images/ig5.jpg` with 16px rounded corners.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "Add about section"
```

---

## Task 6: POV band

A centered single-statement band carrying the brand's core belief.

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Insert the POV HTML** — before `<!-- INSERT SECTIONS ABOVE -->`:

```html
    <section class="pov">
      <div class="inner pov-inner reveal">
        <div class="accent-line pov-line"></div>
        <p class="pov-statement">The moment you claim to be the best, you stop being the best.</p>
        <p class="pov-support">Closed systems calcify. Open ones compound. Everything here starts from that.</p>
      </div>
    </section>
```

- [ ] **Step 2: Insert the POV CSS** — before `/* INSERT SECTION CSS ABOVE */`:

```css
    .pov{background:var(--warm-dark);padding:clamp(4.5rem,9vw,7.5rem) var(--pad-x);}
    .pov-inner{display:flex;flex-direction:column;align-items:center;text-align:center;gap:1.5rem;}
    .pov-line{align-self:center;}
    .pov-statement{
      font-family:var(--font-display);font-weight:700;text-transform:uppercase;
      font-size:clamp(1.6rem,3.4vw,2.8rem);line-height:1.2;letter-spacing:-.015em;
      max-width:60rem;
    }
    .pov-support{color:var(--warm-stone);font-size:1rem;max-width:34rem;}
```

- [ ] **Step 3: Verify**

Reload in Playwright, scroll to the POV band, `browser_take_screenshot`.
Expected: a slightly lighter (`#1E1C19`) full-width band, centered tan accent line, the ALL-CAPS statement centered, and a muted support line beneath.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "Add POV band"
```

---

## Task 7: What I Teach

Section header plus a three-card grid of content pillars. Each card: top accent line, Space Grotesk step number, headline, description.

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Insert the teach HTML** — before `<!-- INSERT SECTIONS ABOVE -->`:

```html
    <section class="section teach" id="teaching">
      <div class="inner">
        <div class="section-head reveal">
          <p class="eyebrow">What I Teach</p>
          <h2 class="headline">The Skill Stack</h2>
          <div class="accent-line"></div>
        </div>
        <div class="teach-grid">
          <article class="card teach-card reveal">
            <div class="accent-line"></div>
            <span class="teach-num">01</span>
            <h3 class="teach-title">Sales &amp; Leadership</h3>
            <p>The skill of selling and leading people, taught at the concept level — why it works, not just what to say. Frameworks that hold up in any room.</p>
          </article>
          <article class="card teach-card reveal">
            <div class="accent-line"></div>
            <span class="teach-num">02</span>
            <h3 class="teach-title">Mindset &amp; Relationships</h3>
            <p>The inner game behind the outer wins. Identity, ego, staying level when you start winning, and keeping the people who matter.</p>
          </article>
          <article class="card teach-card reveal">
            <div class="accent-line"></div>
            <span class="teach-num">03</span>
            <h3 class="teach-title">Money &amp; Investing</h3>
            <p>What to actually do with money once it starts coming in. Income versus assets, taxes, and the moves school never taught you.</p>
          </article>
        </div>
      </div>
    </section>
```

- [ ] **Step 2: Insert the teach CSS** — before `/* INSERT SECTION CSS ABOVE */`:

```css
    .teach-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem;}
    .teach-card{display:flex;flex-direction:column;align-items:flex-start;gap:1rem;}
    .teach-num{
      font-family:var(--font-data);font-weight:700;font-size:1.4rem;
      color:var(--warm-tan);letter-spacing:.02em;
    }
    .teach-title{
      font-family:var(--font-display);font-weight:600;text-transform:uppercase;
      font-size:1.3rem;letter-spacing:-.01em;line-height:1.15;
    }
    .teach-card p{color:var(--warm-stone);font-size:.98rem;line-height:1.6;}
    @media (max-width:860px){.teach-grid{grid-template-columns:1fr;}}
```

- [ ] **Step 3: Verify**

Reload in Playwright, scroll to `#teaching`, `browser_take_screenshot`.
Expected: section header ("What I Teach" eyebrow, "THE SKILL STACK" headline, accent line) and three Warm-Dark rounded cards side by side, each with a tan top line, tan step number, uppercase title, muted description.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "Add What I Teach section"
```

---

## Task 8: Frameworks (light section)

The single Clean White section — demonstrates the Bold Frames system with a Transactional vs Transformational comparison graphic (two equal columns, one vertical Warm Tan divider, identical treatment on both sides).

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Insert the frameworks HTML** — before `<!-- INSERT SECTIONS ABOVE -->`:

```html
    <section class="section section-light frameworks" id="frameworks">
      <div class="inner">
        <div class="section-head reveal">
          <p class="eyebrow">How I Teach</p>
          <h2 class="headline">Concepts, Not Scripts</h2>
          <div class="accent-line"></div>
          <p class="frameworks-intro">Here's one. Same conversation, two completely different outcomes.</p>
        </div>
        <div class="compare reveal">
          <div class="compare-col">
            <p class="compare-label">Transactional</p>
            <ul class="compare-list">
              <li>Leads with the script.</li>
              <li>Manages the number.</li>
              <li>Owns the rep's results.</li>
              <li>Wins the month.</li>
            </ul>
          </div>
          <div class="compare-divider" aria-hidden="true"></div>
          <div class="compare-col">
            <p class="compare-label">Transformational</p>
            <ul class="compare-list">
              <li>Leads with the concept.</li>
              <li>Develops the person.</li>
              <li>Hands the rep ownership.</li>
              <li>Builds a career.</li>
            </ul>
          </div>
        </div>
        <p class="frameworks-caption">One plateaus. One compounds. The course goes deep on the second one.</p>
      </div>
    </section>
```

- [ ] **Step 2: Insert the frameworks CSS** — before `/* INSERT SECTION CSS ABOVE */`:

```css
    .frameworks-intro{color:var(--warm-stone);font-size:1.05rem;line-height:1.6;}
    .compare{
      display:grid;grid-template-columns:1fr 3px 1fr;
      background:var(--soft-gray);border:1px solid rgba(17,17,16,.08);
      border-radius:16px;overflow:hidden;
    }
    .compare-col{display:flex;flex-direction:column;gap:1.25rem;padding:clamp(1.75rem,3.5vw,2.75rem);}
    .compare-divider{background:var(--warm-tan);}
    .compare-label{
      font-family:var(--font-display);font-weight:700;text-transform:uppercase;
      font-size:1.05rem;letter-spacing:.01em;color:var(--off-black);
    }
    .compare-list{display:flex;flex-direction:column;gap:.85rem;}
    .compare-list li{
      font-size:1rem;line-height:1.5;color:#3a372f;
      padding-bottom:.85rem;border-bottom:1px solid rgba(17,17,16,.1);
    }
    .compare-list li:last-child{border-bottom:none;padding-bottom:0;}
    .frameworks-caption{
      margin-top:1.75rem;color:var(--warm-stone);font-size:.95rem;
    }
    @media (max-width:680px){
      .compare{grid-template-columns:1fr;}
      .compare-divider{height:3px;width:100%;}
    }
```

- [ ] **Step 3: Verify**

Reload in Playwright, scroll to `#frameworks`, `browser_take_screenshot`.
Expected: a Clean White (`#F7F4F0`) section with dark text. A two-column comparison card with a vertical tan divider down the middle; both columns styled identically (no green/red, no highlight on either side). Caption beneath in muted stone.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "Add Frameworks light section with comparison graphic"
```

---

## Task 9: Work With Me

Section header plus three "Coming Soon" offer cards. Each CTA gets a `data-interest` value used later (Task 12) to pre-select the form dropdown.

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Insert the work HTML** — before `<!-- INSERT SECTIONS ABOVE -->`:

```html
    <section class="section work" id="work">
      <div class="inner">
        <div class="section-head reveal">
          <p class="eyebrow">What's Coming</p>
          <h2 class="headline">Work With Me</h2>
          <div class="accent-line"></div>
          <p class="work-note">Nothing's for sale yet. The list is how you hear first.</p>
        </div>
        <div class="work-grid">
          <article class="card work-card reveal">
            <span class="tag">Coming Soon</span>
            <h3 class="work-title">The Course</h3>
            <p>Sales and psychology training — the principles underneath the scripts, the part most reps never get taught. In development now.</p>
            <button type="button" class="btn btn-secondary work-cta" data-interest="Sales course">Join the waitlist</button>
          </article>
          <article class="card work-card reveal">
            <span class="tag">Coming Soon</span>
            <h3 class="work-title">Coaching</h3>
            <p>Group and one-on-one. Direct work on your sales, your team, and how you lead. Opening to a small group first.</p>
            <button type="button" class="btn btn-secondary work-cta" data-interest="Coaching">Request a spot</button>
          </article>
          <article class="card work-card reveal">
            <span class="tag">Coming Soon</span>
            <h3 class="work-title">The Syndicate</h3>
            <p>Access to real investment deals, qualification-gated — built for guys serious about turning income into assets. On the way.</p>
            <button type="button" class="btn btn-secondary work-cta" data-interest="The syndicate">Get the details</button>
          </article>
        </div>
      </div>
    </section>
```

- [ ] **Step 2: Insert the work CSS** — before `/* INSERT SECTION CSS ABOVE */`:

```css
    .work-note{color:var(--warm-stone);font-size:1.05rem;}
    .work-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem;}
    .work-card{display:flex;flex-direction:column;align-items:flex-start;gap:1rem;}
    .tag{
      font-family:var(--font-data);font-weight:500;font-size:.66rem;
      letter-spacing:.08em;text-transform:uppercase;color:var(--warm-tan);
      border:1px solid rgba(196,180,154,.35);border-radius:999px;
      padding:.35rem .7rem;
    }
    .work-title{
      font-family:var(--font-display);font-weight:600;text-transform:uppercase;
      font-size:1.3rem;letter-spacing:-.01em;
    }
    .work-card p{color:var(--warm-stone);font-size:.98rem;line-height:1.6;flex-grow:1;}
    .work-cta{margin-top:.25rem;}
    @media (max-width:860px){.work-grid{grid-template-columns:1fr;}}
```

- [ ] **Step 3: Verify**

Reload in Playwright, scroll to `#work`, `browser_take_screenshot`.
Expected: section header and three cards, each with a pill-shaped "Coming Soon" tag, an uppercase title, a description, and an outlined button. (Buttons do nothing yet — JS arrives in Task 12.)

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "Add Work With Me section"
```

---

## Task 10: Lifestyle

Section header plus an Instagram-style image grid (first tile spans 2×2) linking to Cade's profile.

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Insert the lifestyle HTML** — before `<!-- INSERT SECTIONS ABOVE -->`:

```html
    <section class="section life" id="lifestyle">
      <div class="inner">
        <div class="section-head reveal">
          <p class="eyebrow">Off The Clock</p>
          <h2 class="headline">There's More To It</h2>
          <div class="accent-line"></div>
        </div>
        <div class="life-grid reveal">
          <a class="life-tile life-tile-lead" href="https://www.instagram.com/mccadebarnes/" target="_blank" rel="noopener">
            <img src="images/ig1.jpg" alt="Cade Barnes off the clock" loading="lazy">
          </a>
          <a class="life-tile" href="https://www.instagram.com/mccadebarnes/" target="_blank" rel="noopener">
            <img src="images/ig2.jpg" alt="Cade Barnes off the clock" loading="lazy">
          </a>
          <a class="life-tile" href="https://www.instagram.com/mccadebarnes/" target="_blank" rel="noopener">
            <img src="images/ig3.jpg" alt="Cade Barnes off the clock" loading="lazy">
          </a>
          <a class="life-tile" href="https://www.instagram.com/mccadebarnes/" target="_blank" rel="noopener">
            <img src="images/ig4.jpg" alt="Cade Barnes off the clock" loading="lazy">
          </a>
          <a class="life-tile" href="https://www.instagram.com/mccadebarnes/" target="_blank" rel="noopener">
            <img src="images/ig5.jpg" alt="Cade Barnes off the clock" loading="lazy">
          </a>
        </div>
        <a class="ig-link" href="https://www.instagram.com/mccadebarnes/" target="_blank" rel="noopener">@mccadebarnes &rarr;</a>
      </div>
    </section>
```

- [ ] **Step 2: Insert the lifestyle CSS** — before `/* INSERT SECTION CSS ABOVE */`:

```css
    .life-grid{
      display:grid;grid-template-columns:repeat(4,1fr);
      grid-auto-rows:1fr;gap:1rem;
    }
    .life-tile{
      position:relative;overflow:hidden;border-radius:16px;
      aspect-ratio:1;background:var(--warm-dark);
    }
    .life-tile-lead{grid-column:span 2;grid-row:span 2;aspect-ratio:auto;}
    .life-tile img{
      width:100%;height:100%;object-fit:cover;
      transition:filter .3s ease;
    }
    .life-tile:hover img{filter:brightness(1.08);}
    .ig-link{
      display:inline-block;margin-top:1.75rem;
      font-family:var(--font-data);font-weight:500;font-size:.8rem;
      letter-spacing:.05em;text-transform:uppercase;color:var(--warm-tan);
      transition:color .2s ease;
    }
    .ig-link:hover{color:var(--bright-tan);}
    @media (max-width:680px){
      .life-grid{grid-template-columns:1fr 1fr;}
      .life-tile-lead{grid-column:span 2;grid-row:span 1;aspect-ratio:16/10;}
    }
```

- [ ] **Step 3: Verify**

Reload in Playwright, scroll to `#lifestyle`, `browser_take_screenshot`.
Expected: section header and a five-image grid — the first image large (2×2), the other four to its right — all with 16px rounded corners, plus an `@mccadebarnes →` link beneath in tan.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "Add lifestyle grid section"
```

---

## Task 11: Connect + Footer

Two-column connect section: copy + Instagram link left, waitlist form right. Then the footer. The form is markup only here; submission is wired in Task 12.

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Insert the connect HTML** — before `<!-- INSERT SECTIONS ABOVE -->`:

```html
    <section class="section connect" id="connect">
      <div class="inner connect-grid">
        <div class="connect-text reveal">
          <p class="eyebrow">Get On The List</p>
          <h2 class="headline">Let's Connect</h2>
          <div class="accent-line"></div>
          <p>Course, coaching, the syndicate, or you just want to follow the build — get on the list and you'll hear first. No spam, no pitch-slapping.</p>
          <a class="ig-link" href="https://www.instagram.com/mccadebarnes/" target="_blank" rel="noopener">@mccadebarnes &rarr;</a>
        </div>
        <div class="connect-form-wrap reveal">
          <form class="connect-form" id="waitlistForm" novalidate>
            <div class="form-row">
              <div class="field">
                <label for="firstName">First name</label>
                <input id="firstName" name="firstName" type="text" autocomplete="given-name" required>
              </div>
              <div class="field">
                <label for="lastName">Last name</label>
                <input id="lastName" name="lastName" type="text" autocomplete="family-name" required>
              </div>
            </div>
            <div class="field">
              <label for="email">Email</label>
              <input id="email" name="email" type="email" autocomplete="email" required>
            </div>
            <div class="field">
              <label for="interest">What are you here for?</label>
              <select id="interest" name="interest" required>
                <option value="" disabled selected>Pick one</option>
                <option>Sales course</option>
                <option>Coaching</option>
                <option>The syndicate</option>
                <option>Just following along</option>
              </select>
            </div>
            <div class="field">
              <label for="message">Anything else? <span class="optional">(optional)</span></label>
              <textarea id="message" name="message" rows="3"></textarea>
            </div>
            <button type="submit" class="btn btn-primary form-submit">Get on the list</button>
            <p class="form-status" id="formStatus" role="status" aria-live="polite"></p>
          </form>
        </div>
      </div>
    </section>
```

- [ ] **Step 2: Replace the `<!-- INSERT FOOTER -->` line** with:

```html
  <footer class="footer">
    <span class="footer-logo">CADE BARNES</span>
    <div class="footer-meta">
      <a href="https://www.instagram.com/mccadebarnes/" target="_blank" rel="noopener">Instagram</a>
      <span>&copy; 2026 Cade Barnes</span>
      <span class="footer-tag">Build it right. Have fun with it.</span>
    </div>
  </footer>
```

- [ ] **Step 3: Insert the connect + footer CSS** — before `/* INSERT SECTION CSS ABOVE */`:

```css
    .connect-grid{display:grid;grid-template-columns:1fr 1fr;gap:clamp(2.5rem,5vw,5rem);align-items:start;}
    .connect-text{display:flex;flex-direction:column;align-items:flex-start;gap:1.2rem;}
    .connect-text .accent-line{margin:.3rem 0 .4rem;}
    .connect-text p{color:var(--warm-stone);font-size:1.05rem;line-height:1.65;max-width:30rem;}
    .connect-form{
      background:var(--warm-dark);border:1px solid rgba(247,244,240,.07);
      border-radius:16px;padding:clamp(1.75rem,3.5vw,2.5rem);
      display:flex;flex-direction:column;gap:1.1rem;
    }
    .form-row{display:grid;grid-template-columns:1fr 1fr;gap:1rem;}
    .field{display:flex;flex-direction:column;gap:.45rem;}
    .field label{
      font-family:var(--font-data);font-weight:500;font-size:.7rem;
      letter-spacing:.06em;text-transform:uppercase;color:var(--warm-stone);
    }
    .field .optional{text-transform:none;letter-spacing:0;opacity:.7;}
    .field input,.field select,.field textarea{
      font-family:var(--font-body);font-size:.98rem;color:var(--clean-white);
      background:var(--off-black);border:1px solid rgba(247,244,240,.12);
      border-radius:12px;padding:.85rem .9rem;width:100%;
      transition:border-color .2s ease;
    }
    .field textarea{resize:vertical;min-height:84px;}
    .field input:focus,.field select:focus,.field textarea:focus{
      outline:none;border-color:var(--warm-tan);
    }
    .field input.invalid,.field select.invalid{border-color:var(--warm-red);}
    .form-submit{width:100%;margin-top:.35rem;}
    .form-status{font-size:.9rem;min-height:1.2em;}
    .form-status.ok{color:var(--warm-tan);}
    .form-status.err{color:var(--warm-red);}
    .footer{
      display:flex;align-items:center;justify-content:space-between;gap:1.5rem;
      flex-wrap:wrap;
      padding:2.5rem var(--pad-x);
      border-top:1px solid rgba(247,244,240,.08);
    }
    .footer-logo{font-family:var(--font-display);font-weight:700;font-size:.95rem;}
    .footer-meta{
      display:flex;align-items:center;gap:1.5rem;flex-wrap:wrap;
      font-family:var(--font-data);font-weight:500;font-size:.72rem;
      letter-spacing:.04em;color:var(--warm-stone);
    }
    .footer-meta a:hover{color:var(--bright-tan);}
    .footer-tag{color:var(--warm-tan);}
    @media (max-width:860px){
      .connect-grid{grid-template-columns:1fr;}
    }
    @media (max-width:680px){
      .form-row{grid-template-columns:1fr;}
      .footer{flex-direction:column;align-items:flex-start;}
    }
```

- [ ] **Step 4: Verify**

Reload in Playwright, scroll to `#connect`, `browser_take_screenshot`.
Expected: left column copy + tan IG link; right column a Warm-Dark form card with first/last name row, email, a select, a textarea, and a tan "Get on the list" button. Footer below with wordmark and meta line. Submitting does nothing yet.

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "Add connect section, waitlist form markup, and footer"
```

---

## Task 12: JavaScript behaviors

One inline `<script>` providing every interaction: `js` class flag, nav scroll state, mobile menu, scroll reveals, accent-line draw, stat count-up, Work-With-Me CTA → form pre-select, and the form submit handler. All behaviors are defensive (null-checked) and respect `prefers-reduced-motion`.

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Replace the `<!-- INSERT SCRIPT -->` line** with:

```html
  <script>
    (function(){
      var docEl = document.documentElement;
      docEl.classList.add('js');
      var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      /* nav scroll state */
      var nav = document.getElementById('nav');
      function onScroll(){ if(nav) nav.classList.toggle('scrolled', window.scrollY > 40); }
      onScroll();
      window.addEventListener('scroll', onScroll, {passive:true});

      /* mobile menu */
      var navToggle = document.getElementById('navToggle');
      var navLinks = document.getElementById('navLinks');
      if(navToggle && navLinks){
        navToggle.addEventListener('click', function(){
          var open = navLinks.classList.toggle('open');
          navToggle.classList.toggle('open', open);
          navToggle.setAttribute('aria-expanded', String(open));
        });
        navLinks.querySelectorAll('a').forEach(function(a){
          a.addEventListener('click', function(){
            navLinks.classList.remove('open');
            navToggle.classList.remove('open');
            navToggle.setAttribute('aria-expanded','false');
          });
        });
      }

      /* scroll reveals + accent-line draw */
      var revealEls = document.querySelectorAll('.reveal, .accent-line');
      if(!reduceMotion && 'IntersectionObserver' in window){
        revealEls.forEach(function(el){ el.classList.add('pre-reveal'); });
        var io = new IntersectionObserver(function(entries){
          entries.forEach(function(e){
            if(e.isIntersecting){
              e.target.classList.add('is-revealed');
              io.unobserve(e.target);
            }
          });
        }, {threshold:0.15, rootMargin:'0px 0px -40px 0px'});
        revealEls.forEach(function(el){ io.observe(el); });
      }

      /* stat count-up */
      var proof = document.querySelector('.proof');
      if(proof && !reduceMotion && 'IntersectionObserver' in window){
        var po = new IntersectionObserver(function(entries){
          entries.forEach(function(e){
            if(e.isIntersecting){ countUp(); po.disconnect(); }
          });
        }, {threshold:0.4});
        po.observe(proof);
      }
      function countUp(){
        document.querySelectorAll('.proof-num').forEach(function(el){
          var raw = el.textContent.trim();
          var m = raw.match(/^(\d+)(\D*)$/);
          if(!m) return;
          var target = parseInt(m[1],10), suffix = m[2], cur = 0;
          var step = Math.max(1, Math.ceil(target/30));
          var timer = setInterval(function(){
            cur += step;
            if(cur >= target){ cur = target; clearInterval(timer); }
            el.textContent = cur + suffix;
          }, 28);
        });
      }

      /* Work With Me CTA -> pre-select form interest */
      var interestSelect = document.getElementById('interest');
      document.querySelectorAll('.work-cta').forEach(function(btn){
        btn.addEventListener('click', function(){
          var val = btn.getAttribute('data-interest');
          if(interestSelect && val) interestSelect.value = val;
          var connect = document.getElementById('connect');
          if(connect) connect.scrollIntoView({behavior: reduceMotion ? 'auto' : 'smooth'});
        });
      });

      /* waitlist form */
      var FORM_ENDPOINT = 'REPLACE_WITH_APPS_SCRIPT_URL';
      var form = document.getElementById('waitlistForm');
      if(form){
        var statusEl = document.getElementById('formStatus');
        var required = ['firstName','lastName','email','interest'];
        form.addEventListener('submit', function(e){
          e.preventDefault();
          var ok = true;
          required.forEach(function(name){
            var el = form.elements[name];
            if(!el) return;
            var bad = !el.value || (el.type === 'email' && !/^\S+@\S+\.\S+$/.test(el.value));
            el.classList.toggle('invalid', bad);
            if(bad) ok = false;
          });
          if(!ok){
            statusEl.textContent = 'Fill in the required fields so I can actually reach you.';
            statusEl.className = 'form-status err';
            return;
          }
          var btn = form.querySelector('.form-submit');
          var label = btn.textContent;
          btn.disabled = true; btn.textContent = 'Sending…';
          statusEl.textContent = ''; statusEl.className = 'form-status';

          function done(success){
            btn.disabled = false; btn.textContent = label;
            if(success){
              statusEl.textContent = "You're on the list. Check your email.";
              statusEl.className = 'form-status ok';
              form.reset();
            } else {
              statusEl.textContent = 'Something went wrong — try again, or DM me on Instagram.';
              statusEl.className = 'form-status err';
            }
          }

          if(FORM_ENDPOINT.indexOf('REPLACE_WITH') === 0){
            done(true); /* not wired yet — confirm optimistically */
            return;
          }
          fetch(FORM_ENDPOINT, {method:'POST', mode:'no-cors', body:new FormData(form)})
            .then(function(){ done(true); })
            .catch(function(){ done(false); });
        });
      }
    })();
  </script>
```

- [ ] **Step 2: Verify behaviors**

Reload in Playwright (`browser_navigate`). Then:
- `browser_console_messages` — expected: no errors.
- Scroll down the page — the nav background turns translucent/blurred; section content fades in; the proof numbers count up (the `7` animates from a low number to 7).
- `browser_resize` to 500px wide, `browser_click` the hamburger — full-screen menu opens; click a link — menu closes and the page scrolls to that section.
- Scroll to `#work`, `browser_click` "Join the waitlist" — page scrolls to `#connect` and the interest `<select>` shows "Sales course" (verify via `browser_snapshot`).
- Scroll to `#connect`, click "Get on the list" with empty fields — inline error appears and required fields get red borders. Fill First name, Last name, a valid Email, pick an interest, submit — button shows "Sending…" then the success message "You're on the list. Check your email." appears and the form resets.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "Add JavaScript: nav, menu, reveals, count-up, form handling"
```

---

## Task 13: Responsive + reduced-motion pass

Verify the breakpoints baked into earlier tasks (`860px`, `680px`) actually hold up, and confirm reduced-motion behavior. Fix any layout breakage found.

**Files:**
- Modify: `index.html` (only if issues are found)

- [ ] **Step 1: Desktop check**

`browser_resize` to 1440×900, `browser_navigate` to the file, full-page `browser_take_screenshot`.
Expected: no horizontal scrollbar; all sections centered within the 1280px max-width; hero is two columns.

- [ ] **Step 2: Tablet check**

`browser_resize` to 768×1024, reload, full-page `browser_take_screenshot`.
Expected: hero stacks (photo above text); about and connect become single column; teach and work card grids become single column; nav shows the hamburger. No horizontal overflow.

- [ ] **Step 3: Mobile check**

`browser_resize` to 390×844, reload, full-page `browser_take_screenshot`.
Expected: proof bar is 2×2; lifestyle grid is 2-column with the lead tile spanning both; comparison graphic stacks with a horizontal tan divider; form name row stacks; footer stacks left-aligned. No horizontal overflow, no text touching screen edges (≥1.5rem gutter).

- [ ] **Step 4: Reduced-motion check**

In Playwright, emulate reduced motion: call `browser_run_code` with
`async () => { /* no-op marker */ }`
then re-navigate using an emulated media feature — if the Playwright MCP build does not support media emulation, instead verify by reading the CSS: confirm the `@media (prefers-reduced-motion:reduce)` block exists and that `.pre-reveal` is overridden to `opacity:1`. Confirm in the JS that `reduceMotion` gates the reveal observer, the count-up, and uses `behavior:'auto'` for scrolling.
Expected: with reduced motion, all content is visible without fades and no count-up runs.

- [ ] **Step 5: Fix and commit (only if changes were needed)**

If any breakage was fixed:

```bash
git add index.html
git commit -m "Fix responsive layout issues from breakpoint pass"
```

If nothing needed fixing, skip the commit and note "no changes required" in the task record.

---

## Task 14: Apps Script form backend

Create the Google Apps Script that receives form POSTs, appends rows to the bound Google Sheet, and sends notification + confirmation emails.

**Files:**
- Create: `apps-script.gs`

- [ ] **Step 1: Create `apps-script.gs`**

```javascript
/**
 * Cade Barnes — waitlist form backend (Google Apps Script).
 *
 * This script is bound to a Google Sheet and deployed as a Web app.
 * It receives POSTs from the site's waitlist form, appends a row to the
 * sheet, emails Cade a notification, and emails the submitter a confirmation.
 *
 * Full setup instructions: docs/form-setup.md
 */

/* ---- CONFIG: edit these two values before deploying ---- */
var NOTIFY_EMAIL = 'REPLACE_WITH_CADE_EMAIL'; // where new-lead alerts are sent
var SHEET_NAME   = 'Waitlist';                // tab the rows are written to
/* -------------------------------------------------------- */

function doPost(e) {
  try {
    var p = (e && e.parameter) ? e.parameter : {};
    var first    = String(p.firstName || '').trim();
    var last     = String(p.lastName  || '').trim();
    var email    = String(p.email     || '').trim();
    var interest = String(p.interest  || '').trim();
    var message  = String(p.message   || '').trim();
    var now      = new Date();

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(['Timestamp', 'First name', 'Last name', 'Email', 'Interest', 'Message']);
    }
    sheet.appendRow([now, first, last, email, interest, message]);

    // Notify Cade
    if (NOTIFY_EMAIL && NOTIFY_EMAIL.indexOf('REPLACE_WITH') !== 0) {
      MailApp.sendEmail({
        to: NOTIFY_EMAIL,
        subject: 'New waitlist signup — ' + (first || 'someone') + ' ' + last,
        body: [
          'New signup from the site:',
          '',
          'Name:     ' + first + ' ' + last,
          'Email:    ' + email,
          'Here for: ' + interest,
          'Message:  ' + (message || '(none)'),
          'Time:     ' + now
        ].join('\n')
      });
    }

    // Confirm to the submitter
    if (/^\S+@\S+\.\S+$/.test(email)) {
      MailApp.sendEmail({
        to: email,
        subject: "You're on the list",
        body: [
          'Hey ' + (first || 'there') + ',',
          '',
          "You're on the list. When there's something real to share — the course, "
            + 'coaching, or the syndicate — you’ll be among the first to hear.',
          '',
          'Talk soon,',
          'Cade'
        ].join('\n')
      });
    }

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput('Cade Barnes waitlist endpoint is live.');
}
```

- [ ] **Step 2: Verify the script is syntactically sound**

Run: `node --check apps-script.gs`
Expected: no output, exit code 0 (the file is valid JavaScript — Apps Script's `SpreadsheetApp`/`MailApp`/`ContentService` globals are provided by Google's runtime, not needed for the syntax check).

- [ ] **Step 3: Commit**

```bash
git add apps-script.gs
git commit -m "Add Google Apps Script waitlist form backend"
```

---

## Task 15: Form setup documentation

Write the step-by-step guide Cade follows to deploy the Apps Script and wire the site to it.

**Files:**
- Create: `docs/form-setup.md`

- [ ] **Step 1: Create `docs/form-setup.md`**

```markdown
# Waitlist Form Setup

The site's waitlist form sends submissions to a Google Sheet and emails
Cade each new lead. Wiring it up is a one-time job (~5 minutes) and needs
Cade's Google account. Until it's done, the form still works on the site —
it just shows the success message without recording anything.

## 1. Create the Google Sheet

1. Go to <https://sheets.google.com> and create a new blank spreadsheet.
2. Name it something like **Cade — Waitlist**.
3. Leave it open; the next step happens from inside it.

## 2. Add the script

1. In the spreadsheet menu: **Extensions → Apps Script**.
2. Delete whatever code is in the editor.
3. Open `apps-script.gs` from this repository, copy its entire contents,
   and paste them into the Apps Script editor.
4. Near the top of the script, set `NOTIFY_EMAIL` to the email address that
   should receive new-lead alerts, e.g.:

   ```javascript
   var NOTIFY_EMAIL = 'cade@example.com';
   ```

5. Click the **Save** icon.

## 3. Deploy it as a Web app

1. In the Apps Script editor, click **Deploy → New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Set:
   - **Description:** `Waitlist form`
   - **Execute as:** `Me`
   - **Who has access:** `Anyone`
4. Click **Deploy**.
5. Google will ask you to authorize the script — approve it (it needs
   permission to edit the sheet and send email from your account).
6. Copy the **Web app URL**. It ends in `/exec`.

## 4. Connect the site to it

1. Open `index.html` in this repository.
2. Find this line inside the `<script>` block:

   ```javascript
   var FORM_ENDPOINT = 'REPLACE_WITH_APPS_SCRIPT_URL';
   ```

3. Replace the placeholder with the Web app URL you copied:

   ```javascript
   var FORM_ENDPOINT = 'https://script.google.com/macros/s/XXXXX/exec';
   ```

4. Save, commit, and redeploy the site to Vercel.

## 5. Test it

1. On the live site, fill in the waitlist form and submit.
2. Confirm a new row appears in the **Waitlist** tab of the spreadsheet.
3. Confirm the notification email arrives at `NOTIFY_EMAIL`.
4. Confirm the address you submitted with receives the confirmation email.

## Updating the script later

If you change `apps-script.gs`, you must redeploy: **Deploy → Manage
deployments → (edit, the pencil icon) → Version: New version → Deploy**.
The `/exec` URL stays the same, so no site change is needed.

## Notes

- Free Gmail accounts can send roughly 100 emails/day via Apps Script —
  far more than this form will need.
- Submissions are also stored in the sheet even if an email ever fails,
  so no lead is lost.
```

- [ ] **Step 2: Verify**

Run: `cat docs/form-setup.md`
Expected: the file contents print cleanly with all five numbered sections present.

- [ ] **Step 3: Commit**

```bash
git add docs/form-setup.md
git commit -m "Add waitlist form setup documentation"
```

---

## Task 16: Final full-page verification

A whole-site review against the spec and the brand guide.

**Files:** none (review only)

- [ ] **Step 1: Full-page screenshot review**

`browser_resize` to 1440×900, `browser_navigate` to the file, full-page `browser_take_screenshot`. Confirm against `docs/superpowers/specs/2026-05-18-cade-brand-site-design.md`:
- All eleven blocks present in order: nav, hero, proof bar, about, POV band, What I Teach, Frameworks, Work With Me, lifestyle, connect, footer.
- Only General Sans / Satoshi / Space Grotesk fonts in use — no serif, no Inter/Jakarta.
- Dark default; exactly one light section (Frameworks).
- Warm Tan accent line present in every section; no gradients, no glow shadows, no italic headlines, no decorative shapes.

- [ ] **Step 2: Console + link check**

`browser_console_messages` — expected: no errors, no failed font/image requests. Confirm all five images (`hero.jpg`, `ig1`–`ig5`) render.

- [ ] **Step 3: Brand-violation sweep**

Search the file for regressions from the old build:
Run: `grep -nE "Playfair|DM Sans|#c8956c|linear-gradient|radial-gradient|box-shadow|font-style:\s*italic" index.html`
Expected: no matches (empty output). If anything matches, remove it and re-verify.

- [ ] **Step 4: Commit any fixes**

If Step 3 or earlier steps required changes:

```bash
git add index.html
git commit -m "Final verification fixes"
```

If nothing needed fixing, note "no changes required" — the plan is complete.

---

## Done

When all tasks are checked off: `index.html` is rebuilt to the brand guide, `apps-script.gs` + `docs/form-setup.md` cover the form backend, and everything is committed on `cade-brand-rebuild`. Remaining before launch (tracked in the spec §9, not blockers for this plan): real proof-bar numbers, and Cade running the one-time form deploy from `docs/form-setup.md`.

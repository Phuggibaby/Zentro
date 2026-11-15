# ZENTRO Technologies — Website Code

> Building the foundation of tomorrow.

Standalone code folder for the ZENTRO Technologies website, prepared for
William on 2026-11-15. It matches the current live Muse-hosted version
exactly — the same code, split into separate HTML / CSS / JS files so any
human engineer can open it in VS Code, put it on GitHub, or host it
anywhere (Vercel, Netlify, Hostinger, a VPS, …) without the original
build tool.

## What the site is

A single-page company website for ZENTRO Technologies (founder-led
technology company, Founder & CEO: Abdul Hadi): Hero, Introduction,
Services (4 pillars), Why ZENTRO, About, Our Work (one small KGN Premium
Bikes card), Process (Discover → Plan → Design → Build → Launch →
Support), Founder & CEO, Contact (enquiry form), and Footer.

## Technology — deliberately simple

| Layer | Technology | Why |
|---|---|---|
| Structure | HTML5, semantic tags (`header`, `nav`, `main`, `section`, `footer`) | Every engineer knows it, no build step needed |
| Styling | CSS3 in one file (`css/styles.css`), brand colours as CSS variables in `:root` at the top | Change the theme in one place |
| Behaviour | Vanilla JavaScript (`js/main.js`), no framework | Navigation, mobile menu, scroll reveal, contact-form handling |
| Fonts | Space Grotesk (headings) + Inter (body), from Google Fonts | As specified in the brand brief — the only external dependency |
| Backend | None | Brochure + enquiry site (see “Contact form” note below) |

No build tools, no package manager, no database, no environment
variables. If the Google Fonts CDN is unreachable the site still works,
falling back to system sans-serif fonts.

## Folder structure

```
zentro-technologies-website-code/
  README.md            <- this file
  index.html           <- all content: Home, About, Services, Work,
                          Process, Founder & CEO, Contact (commented sections)
  css/
    styles.css         <- ALL styling; brand variables in :root at the top
  js/
    main.js            <- ALL behaviour; small commented blocks
  assets/
    architecture.jpg   <- hero image
    founder-ceo.png    <- Abdul Hadi's photo (Founder & CEO section)
    kgn-homepage.png   <- KGN Premium Bikes home page screenshot (Our Work)
```

Only the images the live site actually uses are included. (Three older
stock images from removed concept-project cards were left out on
purpose — nothing on the page references them.)

## Run it locally

- Easiest: double-click `index.html` — it opens in any browser.
- Or serve the folder (better — matches real hosting):
  - Python: `python3 -m http.server 8000` then open http://localhost:8000
  - Node: `npx serve .`
  - VS Code: “Live Server” extension → Open with Live Server

## How to host on Vercel

The site is fully static, so Vercel hosting is free and needs **no build
settings at all**.

### Route A — GitHub import (recommended; updates are automatic)

1. Create a GitHub repository and upload the **contents** of this folder
   (`index.html`, `css/`, `js/`, `assets/`, `README.md`) to it
   (GitHub → New repository → “uploading an existing file”, or `git push`).
2. Go to https://vercel.com → sign in → **Add New… → Project**.
3. Import your GitHub repository.
4. In “Configure Project”, set:
   - **Framework Preset:** `Other`
   - **Build Command:** leave empty (none)
   - **Output Directory:** leave empty (root — Vercel serves `index.html`
     and the folders next to it automatically)
   - **Install Command:** leave empty / default
5. Click **Deploy**. Vercel gives you a live URL like
   `your-project.vercel.app`.
6. **Custom domain (when ZENTRO has one):** Project → Settings → Domains
   → add the domain → Vercel shows the DNS records to set at your domain
   registrar (usually an A record and/or CNAME) → HTTPS certificate is
   issued automatically.
7. **Future changes:** edit the files, commit/push to GitHub — Vercel
   redeploys automatically within about a minute.

### Route B — Vercel CLI (no GitHub)

1. Install Node.js, then: `npm i -g vercel`
2. In this folder: `vercel` → log in, accept the defaults (framework
   “Other”, no build command) → you get a preview URL.
3. For production: `vercel --prod` → your live URL.
4. Add a custom domain later in the Vercel dashboard (Settings →
   Domains), same as step 6 above.

## How to host elsewhere

Upload the **contents of this folder** (not the folder itself) to the
host's public web root and enable HTTPS:

- **Netlify:** drag the folder onto https://app.netlify.com/drop — done.
- **GitHub Pages:** push the folder contents to a repo → Settings →
  Pages → deploy from the `main` branch, root folder.
- **Hostinger / cPanel hosting:** upload the contents into `public_html`
  via File Manager or FTP.
- **VPS (Nginx/Apache):** copy the contents into the site root
  (e.g. `/var/www/html`) and point the domain + HTTPS (e.g. Certbot) at it.

## Design standard

Premium / elite presentation is a top priority — ZENTRO is an elite
company. Keep the site refined, minimal and architectural, with generous
whitespace and polished typography. Do not make it flashy or generic:
no excessive gradients/glow, and preserve the premium feel in any edits.

Brand variables (already at the top of `css/styles.css`):

```css
:root {
  --obsidian: #090B0F;
  --platinum: #C6CBD2;
  --electric-blue: #397BFF;
  --off-white: #F5F6F8;
}
```

## How an engineer makes common changes

1. **Text / headlines** — search in `index.html` for the wording; each
   section is commented (`<!-- Services -->`, `<!-- Process -->`, etc.).
2. **Services** — edit the four service blocks in the Services section
   of `index.html`: 01 Digital Presence, 02 Brand & Digital Experience,
   03 Business Technology, 04 Growth Infrastructure. Keep the contact
   form's service `<option>` list in sync.
3. **Colours / fonts** — edit the `:root` variables at the top of
   `css/styles.css`; font links are in the `<head>` of `index.html`.
4. **Founder photo** — replace `assets/founder-ceo.png` with the new
   portrait (same filename) — no other change needed. Never use a stock
   photo of another person.
5. **New page / section** — copy an existing `<section>` block in
   `index.html`, add a link in the `<nav>`, reuse existing CSS classes.

## How to add a new project to “Our Work” in future

Current state: Our Work contains one real project — **KGN Premium
Bikes**, shown as a **small card** (William's instruction, 2026-11-15):
just the site's home page screenshot, the site name, and one short
“why it works” line. No detailed case study or metrics.

**Easiest way (no coding):** tell Terry in chat — “I finished a project,
add it to Our Work” — and give: (1) site/project name, (2) one short
line on why it works, (3) a screenshot of the site's home page.

**If an engineer edits the code directly:**
1. Open `index.html` and find the `<!-- Our Work -->` section (the HTML
   comment there also explains this).
2. Copy the whole KGN Premium Bikes small-card block, paste it after,
   and change only: the screenshot image, the site name, and the
   “why it works” line.
3. Put the new screenshot in `assets/` and update the card's image path
   (relative path, e.g. `assets/my-project-homepage.png`).
4. Keep the same CSS classes — the new card matches the design
   automatically. Do not add detail lists or new styles.

## Contact form — important note

The form is currently **front-end only**: it validates the fields and
shows a success panel with an enquiry summary, but it does **not** send
the enquiry to anyone yet, because ZENTRO's business email is not
confirmed. To make enquiries arrive by email, point the submit handler
in `js/main.js` (marked `TODO: form endpoint`) at a form service such
as Formspree or Web3Forms, or at your own API endpoint, using the
confirmed business email.

## Contact details

No business email, phone number, or social links were confirmed in the
brief, so **none were invented or added**. When they are confirmed, add
them in the Contact section and footer of `index.html` (search the file
for `ADD CONTACT DETAILS HERE`).

## Still pending owner confirmation (from the brief)

- Official domain name and hosting provider
- Business email, phone number, social media handles
- Pricing / packages and testimonials

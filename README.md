# SealPoint Consulting

Static site for the MGS 351 group project — a Salesforce-based operations system built for The Real Seal Co.

Aesthetic: Xbox 360 NXE dashboard — dark green ambient blobs, tile grid, sliding tab indicator, achievement popup on load.

## Files

- `index.html` — markup, all three sections (Home, Team, Links)
- `styles.css` — full theme, animations, responsive rules
- `script.js` — tab switching, indicator slide, keyboard shortcuts, achievement toast

No build step. Pure HTML/CSS/JS. Open `index.html` in a browser to preview locally.

## Before publishing — fill in real links

Open `index.html` and replace the three `href="#"` placeholders in the **Links** section:

```html
<a class="link-tile" href="#" ...>     <!-- Salesforce Application -->
<a class="link-tile" href="#" ...>     <!-- Access Database -->
<a class="link-tile" href="#" ...>     <!-- Project Presentation -->
```

## Deploy to Vercel via GitHub (recommended)

```bash
# from the project folder
git init
git add .
git commit -m "Initial site"

# create a new empty repo on github.com first, then:
git remote add origin https://github.com/YOUR_USERNAME/sealpoint.git
git branch -M main
git push -u origin main
```

Then on Vercel:
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import the repo
3. Framework preset: **Other** (it's static — Vercel auto-detects)
4. Click **Deploy**

Every `git push` to `main` redeploys automatically.

## Deploy via Vercel CLI (faster)

```bash
npm i -g vercel
vercel        # follow prompts, choose this folder
vercel --prod # promote to production
```

## Keyboard shortcuts (built in)

- `←` / `→` or `A` / `D` — switch tabs
- `1` / `2` / `3` — jump to Home / Team / Links

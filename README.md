# Key West Pro Guides website

The keywestproguides.com site, moved off the Wix editor. It is built with Eleventy and hosted on Netlify. SWM hosts it and makes all edits; there is no client editing setup.

## Where things live

| What | File |
| --- | --- |
| Phone, email, address, booking link, Tripadvisor rating and review count, top strip line, GTM ID | `src/_data/site.json` |
| Trips: names, card photos and blurbs, VallyPro booking links, **prices**, which guides show on each trip | `src/_data/trips.json` |
| Boats, what's included, what to bring (shown on every trip page) | `src/_data/tripinfo.json` |
| Captains: bios, boat specs, photos, reviews | `src/_data/captains.json` |
| Hand-picked reviews on Home and Reviews | `src/_data/featuredReviews.json` |
| Menu | `src/_data/nav.json` |
| Sponsor logos | `src/_data/sponsors.json` and `src/images/sponsors/` |
| Home page | `src/index.njk` |
| Trip pages (copy) | `src/our-trips/*.njk` (layout: `src/_includes/trip.njk`) |
| Captain pages | `src/our-guides/captain.njk` (one template for all nine) |
| Rates, Contact, Reviews and other pages | `src/*.njk`, `src/fishing-info/*.njk` |
| Fishing reports and blog posts | `src/posts/*.html` (one file per post, address `/post/<slug>`) |
| Styles | `src/assets/css/site.css` (inlined into every page at build time) |
| Photos | `src/images/` (resized and converted to WebP automatically at build time) |
| Redirects and Netlify settings | `netlify.toml` |
| Launch notes, price flags, GTM tag list, open items | `docs/LAUNCH-NOTES.md` |

To change a price, edit the number in `src/_data/trips.json`; the trip page and the Rates page both update.

## Page addresses

Every page keeps its Wix address (for example `/our-trips/backcountry-fishing`, no trailing slash). Each page is built as `name.html` and Netlify serves it at `/name`.

## Add a fishing report

Copy a file in `src/posts/`, change the front matter (`title`, `description`, `date`, `permalink: post/<slug>.html`, `category: Fishing Report`, `ogImage`), put the photos in `src/images/`, and write the report below the `---`. Follow the SWM Fishing Report Playbook v3.

## Build and preview

```bash
npm install
```

```bash
npm start
```

`npm run build` writes the finished site to `_site/`. Netlify runs that same command on every change to `main`.

## Tracking

Only the Google Tag Manager container (GTM-NQP6TTK) is in the code, loaded on the visitor's first scroll, tap, click or key press, or 4 seconds after load. Every other tag lives in GTM. See `docs/LAUNCH-NOTES.md` for the tag list.

## Contact form

The Contact page form uses Netlify Forms and sends visitors to `/confirmation` after submitting. In Netlify, open Forms, then Form notifications, and add an email notification to info@keywestproguides.com before launch.

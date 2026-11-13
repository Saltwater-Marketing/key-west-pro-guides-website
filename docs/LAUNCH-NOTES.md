# Key West Pro Guides: launch notes (Nov 13, 2026)

Move from the Wix editor to GitHub + Netlify, built to the approved design canvas (home desktop and phone, Backcountry trip pattern, Capt. Austin captain pattern).

## 1. Prices: VallyPro vs the live Wix pages

Every price on the new site comes from VallyPro (book.vallypro.com/p/key-west-pro-guides, read Nov 13, 2026). These live pages differ:

| Page | Live Wix page shows | VallyPro (now on the new site) |
| --- | --- | --- |
| Tarpon Fishing | Old tarpon list: 1/2 day $750, 5/8 $800, 3/4 $900, Full $1,100, Marquesas $1,200, Split $1,300, Sunset $650. These are the tarpon rates Paul asked to delete (9-30-25 edits). | Split Tarpon $1,400 (8 hrs, 6–10am and 5–9pm), Sunset Tarpon $750 (4 hrs, 5–9pm), March 1 to July 31 only |
| Backcountry Fishing | Full Day Marquesas $1,300, Sunset Tarpon $800 | Marquesas $1,200, Sunset Tarpon $750 (other backcountry rates match) |
| Rates | Marquesas $1,300, Sunset Tarpon $800; no Shark, Family or Way West prices; Specialty $2,000 only | Marquesas $1,200, Sunset $750; Shark $750/$800/$900/$1,100; Family $750/$800; Gulf Wreck, Tower, Shrimp Boat $2,000; Way West $2,300 |
| Offshore Fishing | $1,000 / $1,100 / $1,300 / $1,500 | $1,100 / $1,250 / $1,400 / $1,700 |
| Family Fishing | No prices | 1/2 day $750 (4 hrs), 5/8 day $800 (5 hrs) |
| Specialty Trips | $2,000 for all | Gulf trips $2,000; Way West $2,300 |

Matching: Wreck & Reef, Shark, Marquesas, Mutton Spawn ($1,200, 3–8pm, April–June). The Master Knowledge Bank 2025/26 rates are out of date. VallyPro also lists an inactive Swordfish trip, not shown.

Tarpon page copy also says "The half-day trip gives you four hours of fishing…", but VallyPro only sells Split and Sunset tarpon trips. Paul to confirm.

## 2. Tracking (GTM only)

In the code: Google Tag Manager **GTM-NQP6TTK** only, with SWM's delayed loader. Verified: no `fbq`, `gtag(` or Clarity in the built site; gtm.js loads on first interaction and a GA4 page_view follows.

What the live Wix site loads today, and what to do in GTM:

| Tag | Where it is now | Action |
| --- | --- | --- |
| GA4 G-BJB201100V | In GTM (Google tag) **and** hard-coded by Wix's marketing integration | Keep in GTM. The Wix copy goes away with Wix. |
| Google Ads AW-11006676794: conversion linker, phone-call conversion (305-747-4650) and 3 conversion tags | In GTM | Keep. Point the form-lead conversion at a page view of `/confirmation` (the new form's thank-you page). |
| Google call tracking (`gstatic.com/call-tracking`, `wcm/loader.js`) | Loaded by the Ads call-conversion tag | Keep (part of the tag above). |
| Universal Analytics UA-246084748-1 | In GTM | Delete (shut off by Google in 2023). |
| Custom HTML "wpcf7mailsent" listener | In GTM (left from the WordPress site) | Delete. |
| LeadConnector (GHL) chat widget ("Hi there, have a question? Text us now.") | Hard-coded on Wix, not in GTM | Not in the new code. If the client wants the text-us chat, add it as a Custom HTML tag in GTM. |
| Meta Pixel, Bing, Clarity | Not found | None to move. |

Embeds dropped per the approved changes: CommonNinja Google-reviews widget, Tripadvisor Certificate of Excellence badges (2012–2018), EmbedSocial hashtag feed, Google and Facebook 5-star badges. Kept: weatherwidget.io (loads when scrolled near).

## 3. Placeholders left on purpose (do not invent)

Shown with a tan highlight on the staging site:

- Official Tripadvisor logo (Home and Reviews).
- "As seen on" logos: ESPN, ESPN2, River Monsters / Animal Planet, George Poveromo's World of Saltwater Fishing.
- Hand-picked Tripadvisor reviews: the Jason R. review (rest of the text), the Capt. Tyson review with the kids, the Capt. David Lamb review, plus two reviews on each trip page. Tripadvisor blocks automated access, so these need to be copied by hand.
- Review dates and sources on captain pages (the reviews themselves are the live Wix testimonials, word for word).
- Backcountry FAQ answers (3 of 4). The Tarpon FAQ has real answers from the live page.

**What to bring:** each trip page uses the client's own "What to Bring" text from the VallyPro listings, word for word (the same on every trip). Paul to confirm per trip; it is one list in `src/_data/tripinfo.json`.

## 4. Open items for Paul

1. Is 305-296-6602 (Contact page, "fishing within the next 10 days") still current?
2. What to bring on each trip (see above).
3. Files: Tripadvisor logo; the four "As seen on" logos; better originals of the Marquesas, Backcountry and Wreck & Reef card photos; Capt. Austin's boat photo without the FishingBooker watermark (also in his gallery); real photos for the phone banner (it is a crop of the flattened graphic).
4. Capt. Austin's bio ends with fishing at Spindrift Fishing Charters. Kept word for word for now; keep or cut? (His two reviews naming Spindrift and Capt. Justin's two naming Live Action Sportfishing were dropped.)
5. Add a Tarpon card to the home page? (It's in the menu and on Our Trips.)
6. Which trips does each captain run? Only Austin, Justin and Ryan (backcountry) are confirmed, so only they show trip links and appear in "Your guides". Other captains' page titles say "Key West Fishing Guide".
7. Copy to fix on the live text (kept word for word for now):
   - Tarpon page: "The existing Key West Pro Guides approach includes…" and "The existing page specifically identifies mullet and pinfish…" read like drafting notes.
   - Rates gas note says "since 1997"; the home intro says "Since 1998".
   - Group page says "trusted in Key West for over 26 years".
   - Family page meta description lists an old phone number (1-866-259-4205); Offshore's meta description talks about shark and backcountry trips.
   - Testimonials page: "Capt. Ryon" spelling and a few email fragments that sit under the wrong letter on the live page.

## 5. Content triage (Site Quality Guardrails §6), for the account owner

Nothing was merged or rewritten during the move. Pages to look at after launch:

- **/our-trips/corporate-group-fishing**: older page, not in the menu, overlaps /our-trips/group-fishing. Candidate to merge and 301.
- **Fishing reports:** Aug/Sep 2025 and Aug/Sep 2026 open with the same paragraph (near-duplicates). March 2008 report is very old. All reports keep one author ("Key West Pro Guides", as on Wix); Playbook v3 prefers one named author.
- **The Seaweed and the Fishing** post: the home callout was removed (approved); the post stays at its address.
- **Links** page: an old link directory to unrelated sites; low value.
- **Species and Glossary:** long reference pages; first-hand detail is good but check Search Console before changing.
- Blog category pages `/fishing-reports/categories/fishing-info` and `/fishing-reports/categories/fishing-reports` now 301 to the matching section of /fishing-reports (one reports page).

## 6. Redirects (netlify.toml)

From the Wix redirect manager (exported Nov 13, 2026): `/reservation.cfm` → `/contact-us`, `/capt_veach.shtml` → `/our-guides/captain-tyson-veach`, `/archived_reports` → `/fishing-reports`, `/fishing_report.shtml` → `/fishing-reports`. Plus Wix blog-only paths (categories, paging, hashtags, feed, `/blog`). After launch, add any old addresses Search Console reports as Not found.

## 7. Liberties taken (beyond the approved changes)

- Fonts and colors match the live site, not the canvas stand-ins: Spectral SemiBold headings (self-hosted), Helvetica body, navy #040A2A, blue #045184, cyan #00BCE4. Buttons use navy text on cyan (white on cyan fails contrast).
- Trip H1s follow the canvas pattern ("Backcountry Fishing in Key West"); captain H1s add a role ("…, Key West Backcountry Guide"); captain pages other than Austin get "About Capt. X" as the section heading.
- Section headings drop the trailing "…" (as the canvas does).
- New meta descriptions where Wix had none (Our Guides, Fishing Info, FAQ, Photo Gallery, Fishing Reports) and for posts (from each post's first paragraph).
- Info pages end with a "Ready to Fish Key West?" Book Now band.
- Contact form: same fields as the Wix form, plus consent wording (needs client OK): "By submitting this form, you agree that Key West Pro Guides may contact you by phone, text message or email about your inquiry… Reply STOP to opt out of texts at any time." The comments placeholder typo "Add you comments" is fixed. Confirm-email must match.
- Contact page: the "Contact Us:" link that pointed to Tillamook Bay, Oregon now points to the Google Maps listing; added a map of Hurricane Hole Marina.
- Sponsors: the 17 sponsor logos from the Wix footer, shown as a wrapping row (the canvas strip image would be cut off on phones).
- Logo: Paul's original file from Drive ("Pro Guides logo.jpg"), converted from CMYK.
- Wix-only features replaced: Wix Forms → Netlify Forms; Wix Blog → posts in the repo at the same `/post/<slug>` addresses.
- Captain photos with no alt text in Wix got descriptive alt text.

## 8. Checks run (local build)

- `npm run build`: 62 files (59 pages, 404, sitemap), all 61 live addresses covered (59 pages + 2 redirects).
- Screenshots of every page at 390px and 1280px, plus 1366×650: no sideways scroll, no broken images, faces visible in every banner, Book Now in the phone header.
- Lighthouse (local server): Home phone 100/100/100/100, desktop 100s; Backcountry phone 99/100/100/100, desktop 100s. Re-run PageSpeed on the live domain after launch.

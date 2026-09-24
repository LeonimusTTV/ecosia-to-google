# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
The author, for personal use. They keep Ecosia as their default search engine and reach for Google when Ecosia's results (especially images) fall short.

## Product Purpose
A Chrome (Manifest V3) extension that keeps Ecosia as the default and gives a one-click escape to Google for the same query. Success: switching to Google from an Ecosia results page takes no retyping.

## Positioning
Keep Ecosia, escape to Google. It is an escape hatch on top of Ecosia, not a replacement search engine and not an Ecosia reskin.

## Operating Context
Runs only on `https://www.ecosia.org/*`. A content script (content.js) adds a "Go to Google" item to Ecosia's search navigation, rewrites the Images tab link to Google Images (`udm=2`), and renames "Ecosia" to "Google" in result titles. The toolbar popup only reports whether the current tab is an Ecosia page.

## Capabilities and Constraints
- Plain static HTML/CSS/JS, no build step, no framework; loaded unpacked.
- Permissions: `activeTab`, `scripting`; content script matches ecosia.org only.
- The popup stays tiny (about 300px wide): status at a glance, no settings.
- Current popup copy: "Active on this tab" / "Inactive — open ecosia.org"; three behaviours listed (image searches open in Google, web searches fall back to Google, result branding reads "Google").
- Undecided: publishing to the Chrome Web Store.

## Brand Commitments
Name: "Ecosia to Google". An existing leaf-G icon set lives in `icons/` (source `logo.jpeg`); not declared binding.

## Evidence on Hand
Icons in `icons/` (16/32/48/128) and `logo.jpeg`. No screenshots, users, testimonials or metrics exist; do not invent any.

## Product Principles
- Stay out of the way: it is a helper, never the destination.
- One glance, one answer: the popup states whether it is working.
- Never add permissions or data collection beyond ecosia.org.
- Simple over configurable: no settings unless a real need appears.

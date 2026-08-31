# Blog post drafts — editorial reference

Source markdown for the five fleet guides published in
`src/data/blogPosts.js`. These are **not** used at build time; the site
renders from `blogPosts.js` only. They're kept because each one carries a
**Sources** section that the published post deliberately does not — those
notes are an internal review record, not something a reader should see.

## Why the Sources notes matter

The drafts were AI-written, and several carry specific, checkable claims.
Each Sources section sorts them by how well they stand up.

**Verified against multiple independent outlets** (post 4 — safe):
- Import levy cut, new 20%→10% and used 15%→5%, effective 1 July 2026
- Passenger vehicle duty cut 70%→40%, effective 1 April 2026, with a
  90-day grace period for existing Form M holders
- Green Tax Surcharge on higher engine capacity; mass transit buses and
  EVs exempted from import duty

Confirmed via Channels TV, TVC News, Businessday and Nigeria Customs
statements, all tracing to the same Ministry of Finance announcement.

**Single-source, not corroborated** (posts 3 and 4):
- "FRSC impounded 150,000 vehicles nationwide in 2025 for expired
  documents, 45,000 in Lagos, up 20%, fines ₦5,000–₦15,000"

Traces only to an SEO content site. No FRSC release or newsroom found
carrying it, and the reporting that does exist is far smaller (143
vehicles in one Lagos crackdown; ~1,293 over three weeks in an older
report). It appears in **both** posts — that is one unverified claim
repeated, not two confirmations. Published as-is by decision: fees and
enforcement data in Nigeria have no authoritative live source, and
readers work from what is publicly circulating regardless.

**Weakest sourcing — procedural, so highest real-world impact** (post 1):
The FRSC document list traces to an Australian healthcare company's blog.
Unlike a statistic, readers act on this: showing up at FRSC with the
wrong documents costs a wasted trip. The LASDRI "Lagos only" claim rests
on a content site too. Worth checking against lasdri.org and FRSC's own
pages before this gets promoted anywhere.

## If you edit a post

Change `src/data/blogPosts.js` — that is what ships. Update the matching
draft here too so the sourcing record stays honest, and keep Sources
sections out of the published copy.

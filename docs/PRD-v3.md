# imagency.io — Product Requirements Document v3.0
**Date:** 2026-04-03
**Status:** Active — Pivoted to Fully Synthetic
**Previous:** PRD v2.0 (human likeness marketplace — shelved)
**Owner:** Jerry C. / MrMagoochi

---

## The Pivot

PRD v2 included a real human talent marketplace. That's shelved.

**Why:** Legal exposure (right of publicity, SAG-AFTRA, Coogan Law for minors), onboarding friction, consent complexity, talent management overhead. Too much for an MVP.

**New direction:** imagency is a **fully synthetic AI talent agency** — a stock library for AI-generated characters. Every face, every voice, every character profile is 100% machine-generated. No real person involved anywhere. Clean IP, zero talent wrangling, instant licensing.

---

## What imagency Is

A production-ready library of AI-generated digital actors — diverse, consistent, fully licensed — that filmmakers, advertisers, content creators, and corporate video producers can buy and use immediately in their work.

Think: Shutterstock for characters. But every character has a face, a voice, a backstory, and a production kit.

**The gap nobody has filled:**
- HeyGen has 230+ avatars → platform-locked, can't export for external editing
- Synthesia has 240+ avatars → enterprise-only, opaque
- ElevenLabs has 160+ voices → voice only, no visual
- Nobody sells pre-curated character bundles with face + voice + profile + multi-format delivery

That's imagency.

---

## The Three Layers

### Layer 1: The Character Library
A growing catalog of AI-generated characters. Each one is a complete "digital actor":
- 12+ reference images (multiple angles, expressions, lighting, wardrobe)
- 1 unique synthetic voice (generated, not cloned)
- Character profile: name, age, backstory, archetype, personality, sample dialogue
- Suggested use cases: what kinds of roles and productions this character fits
- Production formats: PNG (alpha channel), MP3 voice samples, PDF character sheet, JSON manifest

### Layer 2: The Population Builder (internal pipeline)
An automated daily batch that generates new characters and queues them for admin review before going live.

**Daily target:** 10 new characters/day at MVP, 30/day at scale
**Mix:** Male / female / nonbinary, age range rotation (child through senior), ethnicity systematically rotated, style variation (contemporary, period, genre-specific)

### Layer 3: The Marketplace
Where buyers browse, configure, and license characters for their productions.

**Buyer types:**
- Independent filmmakers and content creators (short films, YouTube, social)
- Ad agencies and brand studios (commercials, corporate video)
- Corporate L&D / training video producers ($10K–$100K+/year budgets)
- Podcast producers, audiobook publishers, e-learning platforms (voice-focused)
- Radio/audio production (spots, narration, IVR)

---

## Product Features (Full Scope)

### Character Catalog
- Browse by: gender, age range, ethnicity, voice type, archetype, industry fit, mood/energy, use case
- Search: "cast me 4 diverse professionals" natural language → filtered results
- Preview: watermarked image set + voice sample before purchase
- Character detail page: full profile, all images, voice demo, license options, suggested roles

### Character Bundles (Primary Revenue Driver)
Pre-curated packs of 4–8 matching characters for specific production contexts.

**Bundle concepts:**
- Office Drama Pack — 6 characters, diverse professional archetypes
- Healthcare & Wellness Pack — 5 characters, medical/clinical settings
- Tech Startup Pack — 4 characters, modern, diverse, millennial-senior range
- Sci-Fi Crew Pack — 6 characters, futuristic, gender/ethnicity diverse
- Retail & Hospitality Pack — 5 characters, service-industry archetypes
- Family Pack — 6 characters, multi-generational, two adults, teens, child
- Villain & Antagonist Pack — 4 characters, darker archetypes

Bundles increase average order value 40–50% vs individual purchases.

### License Tiers

| Tier | Price | Scope |
|---|---|---|
| Preview | Free | Watermarked samples only |
| Scene | $29–$79 | 1 scene, 1 project, 30 days, digital only |
| Project | $99–$299 | Full project, 90 days, multiple scenes, digital + print |
| Commercial | $299–$799 | Commercial use, 1 year, broadcast + digital |
| Enterprise / Exclusive | Custom | Exclusivity, multi-year, white-label |
| Bundle (4–6 chars) | $249–$499 | Project scope, all characters in pack |

**Pricing multipliers:**
- Broadcast / radio: 1.5x
- Global geography: 2x
- Exclusivity: 5–10x (character locked to one buyer)
- AI training use: Not permitted at launch

### Character Kit (What Buyers Download)
```
/[character-id]-kit/
  /images/
    - reference-front.png (alpha channel, 4K)
    - reference-3quarter.png
    - reference-profile.png
    - expression-neutral.png
    - expression-smile.png
    - expression-serious.png
    - expression-surprised.png
    - wardrobe-formal.png
    - wardrobe-casual.png
    + 3 additional angles/variants
  /voice/
    - voice-sample-neutral.mp3 (48kHz, broadcast quality)
    - voice-sample-warm.mp3
    - voice-sample-authoritative.mp3
    - elevenlabs-voice-id.txt (for generation via ElevenLabs API)
  /profile/
    - character-profile.pdf
    - character-profile.json
  /license/
    - license-certificate-[id].pdf
    - usage-guide.pdf
  README.md (quick start for common tools)
```

### Production Tool Integration (README + Guide)
Each character kit includes a quick-start guide for:
- **HeyGen** — how to use reference images to create an avatar
- **Runway / Kling / Pika** — how to use reference images in video generation
- **ElevenLabs** — how to use the voice ID to generate unlimited speech
- **Adobe Premiere / After Effects** — compositing with alpha-channel PNGs
- **DaVinci Resolve** — color matching with ICC profiles

---

## Technical Stack

### Character Generation Pipeline

**Image generation:**
- Primary: Replicate FLUX 1.1 Pro ($0.04/image)
- Consistency layer: InstantID + IP-Adapter (95%+ face consistency across 20+ images)
- Pose/expression control: ControlNet
- Cost per character image set (12 images): ~$0.50

**Voice generation:**
- Primary: ElevenLabs Voice Design API (synthetic voice from description, not cloning)
- Backup: Cartesia Sonic-3 (lower latency, good quality)
- Cost per character voice: ~$2–3

**Character profile generation:**
- GPT-4o Vision: looks at generated face → outputs name, backstory, archetype, dialogue, use cases
- Cost: ~$0.02/character

**Total COGS per character: ~$3.00**
**Retail price: $29–$799 per character / $249–$499 per bundle**
**Margin: 90%+**

### Automation Pipeline (n8n)
8-step daily batch:
1. Cron trigger (2 AM daily)
2. GPT-4o: generate character seed (diversity parameters + personality brief)
3. Replicate FLUX: generate base portrait
4. InstantID: generate consistency image set (12 images, varied poses/expressions)
5. ElevenLabs Voice Design: generate synthetic voice matching character
6. GPT-4o Vision: generate full character profile from images
7. Package assets (ZIP structure above)
8. Upload to S3 + write metadata to Supabase → admin review queue

Runtime: 7–10 min per character. Parallel execution for batch.
Monthly ops cost (30 characters/month): ~$283

### Storage & Delivery
- AWS S3 (character asset storage)
- CloudFront CDN (delivery)
- Signed URLs (48hr expiry, re-downloadable via account)
- Supabase PostgreSQL (metadata, search, license tracking)
- Cost: ~$5/month at MVP scale

### Application Stack
- Next.js (App Router) — existing codebase
- Supabase — database + auth
- Stripe — payments + license management
- AWS S3 + CloudFront — asset storage/delivery
- n8n — pipeline orchestration (self-hosted or $25/month cloud)
- Replicate API — image generation
- ElevenLabs API — voice generation

---

## Platform Architecture (Pages)

### Public / Marketing
- `/` — Homepage: hero, featured characters, bundles, pricing, how it works
- `/browse` — Full character catalog with filters
- `/bundles` — Pre-curated character packs
- `/pricing` — License tier explainer
- `/how-it-works` — Buyer guide
- `/character/[id]` — Individual character detail + licensing

### Buyer Flow
- `/browse` or `/bundles` → `/character/[id]` → `/license` → `/checkout` → `/dashboard`
- `/dashboard` — Active licenses, downloads, usage history

### Admin (Internal)
- `/admin` — Dashboard: pipeline status, review queue, catalog stats
- `/admin/review` — Character review queue (approve / reject / regenerate)
- `/admin/pipeline` — n8n batch status, errors, logs
- `/admin/catalog` — Full character management

### Future: Creator Accounts (Phase 3)
- Creators can build and submit their own AI characters
- Platform reviews, approves, and sells them
- Creator earns 60% of each license (platform takes 40%)
- Think: Envato / Adobe Stock but for AI characters

---

## Legal Position

**AI-generated images:** Not copyrightable under current US Copyright Office stance (Jan 2025 guidance). imagency licenses them contractually, not via copyright.

**Synthetic voices:** Same — no copyright in AI-generated audio. Licensed contractually.

**Platform IP:** imagency owns the character designs, profiles, and associated assets. Buyers get a limited commercial license. No transfer of ownership.

**No real person involved:** Zero right-of-publicity exposure. No GDPR biometric data. No SAG-AFTRA implications.

**License structure:**
- Every purchase generates a unique license certificate with scope, duration, buyer info
- Commercial use terms explicit in every license
- Exclusivity available at premium pricing
- AI training use: not permitted (protects future platform value)

**Recommend:** E&O insurance, clear DMCA policy, ToS prohibiting deepfakes of real identifiable people using purchased characters.

---

## Revenue Model

### Pricing
| Product | Price | Est. Monthly Volume | Monthly Revenue |
|---|---|---|---|
| Scene license (individual) | $49 avg | 20 | $980 |
| Project license (individual) | $199 avg | 15 | $2,985 |
| Commercial license | $599 avg | 5 | $2,995 |
| Bundle — Project scope | $349 avg | 10 | $3,490 |
| Bundle — Commercial scope | $699 avg | 5 | $3,495 |
| Enterprise (custom) | $2,500 avg | 1 | $2,500 |
| **Month 6 total** | | | **~$16,445** |

**Year 1 conservative:** $174K revenue, $79K net profit
**Break-even:** Month 4–5 at modest volume

### COGS
- Character generation: $3/character × 30/month = $90
- Infrastructure (S3, CDN, n8n, Supabase): ~$193/month
- **Total monthly ops: ~$283**

---

## Build Roadmap

### Phase 1 — Foundation (Weeks 1–4) ← CURRENT
- [x] Core platform (Next.js + Supabase)
- [x] Buyer browse + profile pages
- [x] Creator registration flow (shelved but code exists)
- [x] Pricing section on homepage
- [x] Deploy to Vercel (fixed)
- [ ] Strip real-human registration flow from public UI
- [ ] Seed 10 hand-crafted synthetic characters manually (no pipeline yet)
- [ ] Basic character detail page
- [ ] Basic checkout (Stripe)

### Phase 2 — Population Builder (Weeks 5–8)
- [ ] n8n pipeline: FLUX → InstantID → ElevenLabs → GPT-4o → S3 → Supabase
- [ ] Admin review UI
- [ ] Character kit packaging (ZIP + signed URL delivery)
- [ ] Buyer dashboard with downloads
- [ ] 30 characters live in catalog
- [ ] First paying customers

### Phase 3 — Bundles + Scale (Weeks 9–12)
- [ ] Bundle product pages + bundle checkout
- [ ] Search with natural language filter ("4 diverse professionals")
- [ ] Production tool integration guides in character kit
- [ ] ElevenLabs voice ID in kit (so buyers can generate unlimited speech)
- [ ] Pipeline running automatically at 10 chars/day

### Phase 4 — Creator Accounts (Month 4+)
- [ ] Creator submission portal
- [ ] Creator review + approval workflow
- [ ] Creator earnings dashboard (60% split)
- [ ] "Verified Creator" badge system

### Phase 5 — Enterprise + API (Month 6+)
- [ ] API access tier for studios
- [ ] Bulk licensing / seat licenses
- [ ] Custom character commissions
- [ ] White-label options

---

## Immediate Next Steps

1. **Remove real-human registration from public UI** — creator/register flow should be gated or hidden until Phase 4
2. **Manually create 10 seed characters** — hand-craft them using FLUX + ElevenLabs directly, no pipeline yet. Get 10 real characters in the catalog.
3. **Build character detail page** — `/character/[id]` with full image set, voice player, profile, license selector
4. **Stripe checkout** — basic one-time payment, license cert generation
5. **Start n8n pipeline build** — can run in parallel with above

---

## Open Questions

1. **Child characters** — synthetic children (under 18-looking) for family films, educational content. Legally clean (no real minors) but platform policy question. Include with age-appropriate use restrictions?
2. **"Villain" archetypes** — are there content policy restrictions on selling a character who looks menacing? Probably fine with clear ToS.
3. **Deepfake misuse** — buyer could theoretically use a purchased face to impersonate someone. ToS prohibition + E&O insurance is the mitigation. No technical prevention possible.
4. **Exclusivity mechanics** — when a character is licensed exclusively, do other buyers see it as "unavailable"? Or hidden entirely? How long can exclusivity last?
5. **Video reference clips** — should character kits include short video clips (15-30s, generated via Runway or Kling) not just stills? Adds cost (~$5-10/character) but significantly more useful for video productions.

---

*PRD v3.0 — Pivoted to fully synthetic AI talent agency*
*Based on 6 scout reports compiled 2026-04-03*
*Supersedes PRD v2.0*

# imagency.io — Product Requirements Document v2.0
**Date:** 2026-04-03
**Status:** Active
**Owner:** Jerry C. / MrMagoochi

---

## What This Is

imagency is a **casting agency for the AI era** — a two-sided marketplace where:

1. **Real humans** register their likeness and voice, set their own terms, and earn royalties every time someone licenses an AI-generated representation of them
2. **AI-generated synthetic entities** (the Population Builder) are created daily — diverse digital actors with consistent look, voice, and character profile — available for immediate licensing
3. **Buyers** (filmmakers, advertisers, content creators, casting directors) license what they need — a face, a voice, a full character kit — and get everything required to put that entity in their production

Nobody has built this combination. ElevenLabs does voice only. HeyGen does avatars but no marketplace. Synthesia pays talent but it's enterprise-locked. We own the intersection.

---

## The Three Products Inside imagency

### Product 1: Human Talent Marketplace
Real people selling real access to their likeness and voice under explicit consent and legal terms.

**Creator side:**
- Register with ID verification + liveness check
- Upload photo set (12+ angles, expressions, lighting conditions)
- Record voice samples (5+ minutes across scripts)
- Set terms: what they allow (ads, film, AI training, streaming), geography, exclusivity
- Earn 70% of every license. Platform takes 30%.
- Dashboard: active licenses, earnings, usage tracking, approval queue

**Buyer side:**
- Search by: age range, ethnicity, gender, voice type, accent, archetype/energy, permitted use
- Preview watermarked samples before purchase
- Configure license scope: use case + geography + duration + volume
- Pay once, receive a packaged character kit
- Use within scope. Tracked by usage token.

---

### Product 2: Population Builder (Synthetic Entity Library)
An automated daily pipeline that generates 10 new diverse AI entities — fully synthetic, no real person involved, immediately licensable.

**Each entity includes:**
- 12+ reference images (multiple angles, expressions, lighting)
- 1 unique synthetic voice (ElevenLabs-generated, character-matched)
- Character profile: name, age range, archetype, backstory, personality traits, sample dialogue
- Usage guide: suggested roles (lead, supporting, extra, background), genre fits, style notes
- License: immediately available, no approval needed (fully synthetic)

**Daily drop cadence:**
- 10 entities per day
- Mix: male / female / nonbinary / trans representation
- Age range rotation: infant, child, teen, adult, middle-aged, senior
- Ethnicity: systematically rotated across full diversity spectrum
- Style: realistic, stylized, period-appropriate, genre-specific (sci-fi, fantasy, contemporary, period drama)

**Pipeline stack:**
- Replicate FLUX 1.1 Pro → image generation ($0.04/image)
- FLUX Pro Fine-tuner → character consistency training ($1.50 one-time per character)
- ElevenLabs API → voice generation ($0.07/character)
- n8n → orchestration (9-step daily batch, ~20 min runtime)
- AWS S3 + CloudFront → storage and delivery
- Supabase → metadata, search indexing, license tracking
- Cost per entity: ~$0.24 at MVP scale

**Cost model:**
- Generate cost: $0.24/entity
- License price: $29–$4,999 depending on scope
- Margin: 99%+

---

### Product 3: Buyer Production Toolkit
Everything a buyer needs to use what they paid for — not just files, but context.

**What's in a Character Kit (download package):**
- `/images/` — full reference photo set (12+ images, multiple angles/expressions)
- `/voice/` — voice samples + ElevenLabs voice ID for generation
- `/profile/` — character profile PDF (name, archetype, backstory, personality, sample dialogue)
- `/usage/` — license certificate, scope summary, permitted use guide
- `/instructions/` — how to use the voice in ElevenLabs, how to use reference images in video tools (HeyGen, Runway, Kling), scene guidance
- `README.md` — quick start

**License tiers:**
| Tier | Price Range | Scope |
|---|---|---|
| Scene Extra | $29–$149 | 1 scene, 1 project, 30 days |
| Supporting Role | $299–$799 | Multiple scenes, 1 project, 90 days |
| Lead Character | $999–$4,999 | Unlimited scenes, commercial, 1 year |
| Perpetual / Exclusive | Custom | Negotiated direct |

**Pricing multipliers:**
- Commercial use: 2x
- Global geography: 3x
- AI training use: 4x (explicit opt-in required)
- Exclusivity: 5–10x

---

## Usage Control (Post-Purchase)

This is the hardest problem. Once a file is downloaded, technical DRM is largely unenforceable. The real answer is layered:

**Layer 1 — Legal (primary)**
- Every license is a binding contract with explicit scope
- Violations = breach of contract + right of publicity claims (for real talent)
- Jurisdiction: California (strongest talent protections)
- Auto-generated license certificate per purchase with unique ID

**Layer 2 — Technical (deterrence)**
- C2PA provenance metadata embedded in all images (survives most edits)
- Perceptual hash fingerprinting on all entity images (searchable in reverse image search)
- Voice fingerprinting on all audio assets
- Signed download URLs (expire after 48hrs, re-downloadable via account)
- No bulk download. One project, one kit. Re-purchase required for new project.

**Layer 3 — Platform (enforcement)**
- Usage token tied to each license — if a buyer builds an AI training dataset from purchased assets, the token traces back to their account
- AI training use requires explicit opt-in and higher-tier license
- Violation reporting system for talent
- Automated reverse image search monitoring (weekly batch)

**The honest answer:** You can't fully prevent misuse after delivery. But you can make it legally costly, technically traceable, and reputationally risky. That's what every stock platform does.

---

## What Makes imagency Different

| Feature | ElevenLabs | HeyGen | Synthesia | imagency |
|---|---|---|---|---|
| Real human talent marketplace | ❌ | ❌ | Partial | ✅ |
| AI-generated entity library | ❌ | ❌ | ❌ | ✅ |
| Voice + visual bundled | ❌ | ❌ | ❌ | ✅ |
| Daily new character drops | ❌ | ❌ | ❌ | ✅ |
| Production toolkit / character kit | ❌ | ❌ | ❌ | ✅ |
| Transparent creator revenue split | 70% | Unknown | Unknown | 70% |
| Open to all buyers (not enterprise) | ✅ | ✅ | ❌ | ✅ |
| Diverse synthetic cast | ❌ | ❌ | ❌ | ✅ |

---

## User Types

### Creator (Human Talent)
- Actors, models, voice artists, everyday people wanting passive income
- Earns royalties without being on set
- Full control over permitted uses

### Synthetic Entity (Platform-owned)
- AI-generated, platform owns IP
- No approval needed, instant licensing
- Replenished daily by Population Builder

### Buyer — Independent Creator
- YouTubers, short filmmakers, content creators
- Needs affordable access to diverse cast
- Primary use: b-roll, background, supporting characters

### Buyer — Commercial Producer
- Ad agencies, brands, corporate video
- Needs licensed talent for commercials
- Primary use: lead roles, spokesperson, spokesperson voice

### Buyer — Casting Director / Studio
- Film/TV production, higher budget
- Needs full character development support
- Primary use: pre-visualization, storyboarding, test casting

---

## Platform Pages (Full Site Map)

**Marketing / Public**
- `/` — Homepage (marketplace pitch + featured entities + pricing)
- `/browse` — Full talent + entity catalog with filters
- `/pricing` — License tier explainer
- `/how-it-works` — For creators AND buyers
- `/about` — Mission + team

**Buyer Flow**
- `/browse` → `/profile/[id]` → `/license/[id]` → `/checkout` → `/dashboard/buyer`
- `/dashboard/buyer` — Active licenses, downloads, usage tokens

**Creator Flow**
- `/creator` → `/creator/register` (5-step) → `/dashboard/creator`
- `/dashboard/creator` — Earnings, active licenses, usage tracking, approval queue

**Population Builder (internal)**
- `/admin/population` — Daily batch status, entity review queue, publish/reject
- `/admin/entities` — Full synthetic entity management

---

## Phase Roadmap

### Phase 1 — Fix & Stabilize (Now, 1 week)
- [ ] Fix Vercel deployment (done)
- [ ] Clean up current UI — no animation, warm palette, complete sections
- [ ] Add Pricing section to homepage
- [ ] Add Dual CTA (Creator vs Buyer)
- [ ] Make creator cards production-ready

### Phase 2 — Population Builder MVP (Weeks 2–5)
- [ ] Build n8n pipeline: FLUX → ElevenLabs → S3 → Supabase
- [ ] Admin review UI for generated entities
- [ ] Character profile auto-generation (GPT-4o prompt → JSON)
- [ ] First 70 entities seeded manually (7 days × 10)
- [ ] Synthetic entities surfaced in /browse

### Phase 3 — Licensing Engine (Weeks 6–9)
- [ ] Stripe checkout integration
- [ ] License certificate auto-generation
- [ ] Character kit packaging + signed URL delivery
- [ ] Buyer dashboard with downloads + usage tokens
- [ ] Creator payout system (Stripe Connect)

### Phase 4 — Real Talent Onboarding (Weeks 10–14)
- [ ] ID verification integration (Stripe Identity or Persona)
- [ ] Biometric vault (S3 isolated, encrypted)
- [ ] Creator dashboard with earnings + approval queue
- [ ] First 50 real human talent onboarded (manual outreach)

### Phase 5 — Scale (Month 4+)
- [ ] Population Builder at 10/day automated (no manual review)
- [ ] User-generated character creation (Phase 2 of product vision)
- [ ] API access tier for studios
- [ ] Mobile-optimized buyer experience

---

## Design Direction

**Aesthetic:** Editorial cool. High-end talent agency meets production house. Not SaaS. Not tech startup.

**NOT dark/cinematic** — the previous version went too dark. The warmth (#FAFAF8 / #1A1A1A / #C9A84C) is right. Keep it.

**What needs to change visually:**
- Typography needs more scale contrast — massive display type for headlines, not uniform sizing
- Photography/imagery — real human faces should dominate, not icons and illustrations
- Section breaks should use full-bleed imagery or bold color blocks, not just white space
- The "daily drop" feature should feel like a magazine cover reveal, not a card grid
- Mobile-first from here on

**Design process going forward:**
- Generate visual mockups BEFORE writing code
- Get approval on direction before implementation
- No more same-site syndrome

---

## Open Questions (Needs Decision)

1. **Minors** — do we allow under-18 talent? Requires Coogan Law compliance, parental consent, court approval in CA. Recommend: 18+ only at launch, add minor track in Phase 4.
2. **AI training opt-in** — do we allow buyers to use purchased likeness for AI training? High legal exposure. Recommend: explicit opt-in, premium tier only, talent must individually consent.
3. **User-generated characters** — Phase 5 feature where buyers can generate a custom character on-platform. Needs Replicate API integration in the buyer flow. Scoped out for now.
4. **Exclusivity** — when a buyer purchases exclusive rights, do other buyers get locked out? How long? How do we enforce? Needs legal + product design.
5. **Union compliance** — if real talent is SAG-AFTRA, platform may need a union agreement. Recommend: non-union only at launch, assess as scale grows.

---

*PRD v2.0 — generated from 4 scout reports + platform vision session 2026-04-03*
*Next update: after Phase 2 completion*

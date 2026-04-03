# Imagency — Likeness Rights Management Platform

> Your image. Your agency. Your revenue.

A consent-first platform where individuals register their face, voice, and persona. Brands, studios, and AI companies license controlled access to AI-generated representations. Creators earn royalties — without ever showing up on set.

## Stack
- **Frontend:** Next.js 15 (Vercel)
- **API:** Fastify (Railway)
- **DB:** PostgreSQL
- **Queue:** BullMQ + Redis
- **Payments:** Stripe
- **Identity Verification:** Persona (BIPA-compliant)
- **E-Signature:** Dropbox Sign
- **Biometric Storage:** AWS S3 + KMS (isolated vaults)
- **Image Generation:** Replicate (LoRA per-profile)
- **Voice Synthesis:** ElevenLabs
- **Watermarking:** Imatag (steganographic)

## Docs
- [Lawyer Brief](docs/LAWYER_BRIEF.md)
- [PRD](docs/PRD.md)

## Status
MVP scaffold — Phase 1 development

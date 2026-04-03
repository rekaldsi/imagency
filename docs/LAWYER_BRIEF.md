# Persona Platform — Legal Briefing for Counsel
**Prepared:** 2026-04-03 | **Status:** Pre-launch, seeking legal review
**Project:** Persona — Likeness Rights Management & Monetization Platform

---

## What This Platform Does

Persona allows individuals to register their face, voice, and persona with full informed consent. Brands, studios, and AI companies then license controlled access to AI-generated representations of those individuals for use in advertising, film, and synthetic media. 

**Critical distinction:** The platform never shares raw biometric data with buyers. Buyers receive only AI-generated synthetic output. Raw capture data is stored in isolated, encrypted vaults and never transferred.

Creators earn royalties (70% of license fee). Platform takes 30%.

---

## 5 Things You Must Address Before Launch

1. **BIPA compliance architecture (Illinois)**
   Exposure: $5,000 per person per violation for unauthorized biometric data collection. With 50,000 creators, theoretical exposure is $250M+. We need a standalone, BIPA-compliant written consent form that is separate from general Terms of Service. Must specify: purpose of collection, length of retention, and prohibition on sale/transfer. 3-year data retention limit under BIPA conflicts with open-ended registration — we need a compliant retention and deletion policy.

2. **California AB 2602 compliance (effective Jan 1, 2025)**
   Requires explicit, written consent before AI likeness use in contracts. Our creator registration agreement must be AB 2602-compliant. Blanket license grants will not hold up. Each license category (advertising, film, AI training, etc.) needs separate written consent acknowledgment.

3. **New York synthetic performer disclosure (effective June 2026)**
   NY law requires disclosure when synthetic performers appear in advertising. Our buyer license agreements for NY-based brands must include disclosure obligations and compliance language.

4. **Corporate structure for liability insulation**
   Recommendation from research: Delaware C-Corp parent entity + Wyoming subsidiary for biometric data operations. Need your recommendation on whether this structure adequately insulates the parent from BIPA class action exposure. Also need to evaluate whether a consent-based platform qualifies for any BIPA exemptions.

5. **Perpetual model contamination policy**
   When a buyer licenses likeness data to train an AI model, and that license subsequently expires — the biometric data is embedded in model weights and technically cannot be deleted. Courts have not resolved this. We need defensible contract language that: (a) makes unauthorized continued use of trained models after license expiration a clear breach, (b) includes liquidated damages, and (c) sets out what "reasonable model un-training efforts" means in practice.

---

## Additional Issues for Review

**Right of Publicity — jurisdiction mapping**
Platform will serve creators across all 50 states. CA, NY, IL, TX have the most robust statutes. We need consent language that adapts to the creator's jurisdiction at registration. What is the minimum viable compliance approach?

**Minor registration**
Platform intends 18+ hard gate. Need your review of the technical and legal safeguards required to defend against minors circumventing the age gate, and what liability we carry if they do.

**Section 230 / DMCA**
Our legal research indicates Section 230 does not protect us (we generate content, not just host it) and DMCA safe harbor does not apply (right of publicity ≠ copyright). Please confirm and advise on alternative liability shields.

**Model training license tier**
We plan a separate, higher-priced license tier for AI model training. This tier requires additional review. At what transaction threshold do you recommend direct attorney review of each deal vs. a standardized contract?

**Insurance**
Research recommends $15–20M aggregate coverage (professional liability + cyber + media liability). Please advise on carriers with experience in AI/synthetic media.

**Posthumous rights**
CA provides 70 years posthumous protection. If a registered creator dies, their estate inherits right of publicity. We need a policy for what happens to active licenses and the registered profile upon creator death.

---

## Documents We Need From You

- [ ] BIPA-compliant biometric data consent form (IL)
- [ ] Creator Registration Agreement (includes AB 2602 compliance)
- [ ] Buyer License Agreement template (includes NY disclosure, liquidated damages clause, audit rights)
- [ ] Model Training License Addendum
- [ ] Data Retention & Deletion Policy
- [ ] Minor registration prohibition language + age verification standard
- [ ] Recommended corporate structure + formation documents

---

## Timeline

Platform targeting MVP launch within 10–12 weeks. Legal documents needed before any creator registrations are accepted. Identity verification and consent flows are being built now — we want to wire in your approved consent language before those flows are finalized.

---

*This briefing was prepared based on the platform PRD (v1.0) and independent legal research. All findings above are research-based and not legal advice — that's why we're talking to you.*

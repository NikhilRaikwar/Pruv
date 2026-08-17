# Privacy & Data Handling

> Data retention policies, privacy safeguards, and architectural guarantees implemented in Pruv.

---

## 1. Core Privacy Principles

1. **Explicit Prior Consent**: No face photos or camera streams are processed without the user first agreeing to the terms on the dedicated consent page.
2. **Anonymous Trial Sessions**: Users are identified by a cryptographically secure random session token stored in an `HttpOnly`, `SameSite=Lax` cookie. Only the SHA-256 hash of the token is saved in the database.
3. **No Account Creation or Email Harvesting**: Users can start, track, and complete longitudinal trials without submitting passwords, emails, or personal identifiers.
4. **Private by Default**: Every Proof Review is strictly private to the trial participant until they explicitly choose to click "Create ProofLink".
5. **No Medical Claims**: Pruv explicitly displays disclaimers that all measurements are personal observational appearance metrics, not clinical medical diagnoses or proof of pharmacological causation.

## Google Form Setup

Create a Google Form with these fields so the website can pre-fill it:

- `Full Name` as a short answer and required
- `Email Address` as a short answer and required
- `Contact Number` as a short answer
- `Estimated Budget Range` as a dropdown or multiple choice and required
- `Project Details` as a paragraph
- `Preferred Call Slot` as a short answer

Use the same budget labels as the website:

- `Rs. 4,000 - Rs. 5,000 (Starter)`
- `Rs. 6,000 - Rs. 12,000 (Professional)`
- `Rs. 15,000+ (Premium)`
- `Custom Budget`
- `Not sure yet`

After creating the form:

1. In Google Forms, open `More -> Get pre-filled link`.
2. Fill the fields with these exact marker values:
   `__FULL_NAME__`
   `__EMAIL__`
   `__PHONE__`
   `__BUDGET__`
   `__PROJECT_DETAILS__`
   `__PREFERRED_CALL_SLOT__`
3. Click `Get link`.
4. Paste that full URL into [googleForm.ts](./src/lib/googleForm.ts) by replacing `GOOGLE_FORM_TEMPLATE_URL`.

Once that link is in place, the CTA on the website will stop using email/backend submission and will open a pre-filled Google Form instead.

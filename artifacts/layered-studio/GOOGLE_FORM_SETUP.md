## Google Form Setup

This project is already wired to your live Google Form using these entry IDs:

- `Full Name` -> `entry.1730673321`
- `Email Address` -> `entry.159390796`
- `Contact Number` -> `entry.1587624489`
- `Estimated Budget Range` -> `entry.163217131`
- `Project Details` -> `entry.2016074230`
- `Preferred Call Slot` -> `entry.1294472050`

The current prefilled URL stored in the app is:

`https://docs.google.com/forms/d/e/1FAIpQLSfTVOQnrJfACFdQqAzP2oTRWUimLUE593EPCT-Th1opPBd4vA/viewform?usp=pp_url&entry.1730673321=__FULL_NAME__&entry.159390796=__EMAIL__&entry.1587624489=__PHONE__&entry.163217131=Rs.+6,000+-+Rs.+12,000+(Professional)&entry.2016074230=__PROJECT_DETAILS__&entry.1294472050=__PREFERRED_CALL_SLOT__`

If you ever regenerate the form, keep the same field names and update the entry IDs in [googleForm.ts](./src/lib/googleForm.ts) if Google assigns new ones.

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

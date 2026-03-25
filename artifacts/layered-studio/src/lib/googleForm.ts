type GoogleFormSubmission = {
  fullName: string;
  email: string;
  phone: string;
  budget: string;
  projectDetails: string;
  preferredCallSlot: string;
};

const GOOGLE_FORM_MARKERS = {
  fullName: "__FULL_NAME__",
  email: "__EMAIL__",
  phone: "__PHONE__",
  budget: "__BUDGET__",
  projectDetails: "__PROJECT_DETAILS__",
  preferredCallSlot: "__PREFERRED_CALL_SLOT__",
} as const;

// Replace this with the pre-filled Google Form URL generated from your live form.
export const GOOGLE_FORM_TEMPLATE_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfTVOQnrJfACFdQqAzP2oTRWUimLUE593EPCT-Th1opPBd4vA/viewform?usp=pp_url&entry.1730673321=__FULL_NAME__&entry.159390796=__EMAIL__&entry.1587624489=__PHONE__&entry.163217131=Rs.+6,000+-+Rs.+12,000+(Professional)&entry.2016074230=__PROJECT_DETAILS__&entry.1294472050=__PREFERRED_CALL_SLOT__";

function sanitizeValue(value: string) {
  return value.trim();
}

export function isGoogleFormConfigured() {
  return (
    GOOGLE_FORM_TEMPLATE_URL.includes("docs.google.com/forms") &&
    !GOOGLE_FORM_TEMPLATE_URL.includes("YOUR_FORM_ID")
  );
}

export function buildGoogleFormUrl(submission: GoogleFormSubmission) {
  if (!isGoogleFormConfigured()) {
    return null;
  }

  const url = new URL(GOOGLE_FORM_TEMPLATE_URL);
  const replacements = new Map<string, string>([
    [GOOGLE_FORM_MARKERS.fullName, sanitizeValue(submission.fullName)],
    [GOOGLE_FORM_MARKERS.email, sanitizeValue(submission.email)],
    [GOOGLE_FORM_MARKERS.phone, sanitizeValue(submission.phone)],
    [GOOGLE_FORM_MARKERS.budget, sanitizeValue(submission.budget)],
    [
      GOOGLE_FORM_MARKERS.projectDetails,
      sanitizeValue(submission.projectDetails),
    ],
    [
      GOOGLE_FORM_MARKERS.preferredCallSlot,
      sanitizeValue(submission.preferredCallSlot),
    ],
  ]);

  for (const [key, value] of url.searchParams.entries()) {
    const nextValue = replacements.get(value);
    if (typeof nextValue === "string") {
      url.searchParams.set(key, nextValue);
    }
  }

  return url.toString();
}

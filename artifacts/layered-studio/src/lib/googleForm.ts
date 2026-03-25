type GoogleFormSubmission = {
  fullName: string;
  email: string;
  phone: string;
  budget: string;
  projectDetails: string;
  preferredCallSlot: string;
};

const GOOGLE_FORM_ENTRY_IDS = {
  fullName: "entry.1730673321",
  email: "entry.159390796",
  phone: "entry.1587624489",
  budget: "entry.163217131",
  projectDetails: "entry.2016074230",
  preferredCallSlot: "entry.1294472050",
} as const;

export const GOOGLE_FORM_TEMPLATE_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfTVOQnrJfACFdQqAzP2oTRWUimLUE593EPCT-Th1opPBd4vA/viewform?usp=pp_url&entry.1730673321=__FULL_NAME__&entry.159390796=__EMAIL__&entry.1587624489=__PHONE__&entry.163217131=Rs.+6,000+-+Rs.+12,000+(Professional)&entry.2016074230=__PROJECT_DETAILS__&entry.1294472050=__PREFERRED_CALL_SLOT__";

function sanitizeValue(value: string) {
  return value.trim();
}

export function isGoogleFormConfigured() {
  return (
    GOOGLE_FORM_TEMPLATE_URL.startsWith("https://docs.google.com/forms/")
  );
}

export function buildGoogleFormUrl(submission: GoogleFormSubmission) {
  if (!isGoogleFormConfigured()) {
    return null;
  }

  const url = new URL(GOOGLE_FORM_TEMPLATE_URL);
  url.searchParams.set(
    GOOGLE_FORM_ENTRY_IDS.fullName,
    sanitizeValue(submission.fullName)
  );
  url.searchParams.set(
    GOOGLE_FORM_ENTRY_IDS.email,
    sanitizeValue(submission.email)
  );
  url.searchParams.set(
    GOOGLE_FORM_ENTRY_IDS.phone,
    sanitizeValue(submission.phone)
  );
  url.searchParams.set(
    GOOGLE_FORM_ENTRY_IDS.budget,
    sanitizeValue(submission.budget)
  );
  url.searchParams.set(
    GOOGLE_FORM_ENTRY_IDS.projectDetails,
    sanitizeValue(submission.projectDetails)
  );
  url.searchParams.set(
    GOOGLE_FORM_ENTRY_IDS.preferredCallSlot,
    sanitizeValue(submission.preferredCallSlot)
  );

  return url.toString();
}

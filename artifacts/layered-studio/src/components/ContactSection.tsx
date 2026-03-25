import { useState } from "react";
import { CalendarDays, Clock } from "lucide-react";
import { buildGoogleFormUrl } from "@/lib/googleForm";

const budgets = [
  "Rs. 4,000 - Rs. 5,000 (Starter)",
  "Rs. 6,000 - Rs. 12,000 (Professional)",
  "Rs. 15,000+ (Premium)",
  "Custom Budget",
  "Not sure yet",
];

const timeSlots = [
  "9:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "12:00 PM - 1:00 PM",
  "2:00 PM - 3:00 PM",
  "3:00 PM - 4:00 PM",
  "4:00 PM - 5:00 PM",
  "5:00 PM - 6:00 PM",
  "7:00 PM - 8:00 PM",
  "8:00 PM - 9:00 PM",
  "9:00 PM - 10:00 PM",
];

function formatDateValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getAvailableDates() {
  const dates: { label: string; value: string }[] = [];
  const today = new Date();

  for (let i = 1; i <= 14; i++) {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + i);

    const dayOfWeek = nextDate.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      dates.push({
        label: nextDate.toLocaleDateString("en-IN", {
          weekday: "short",
          month: "short",
          day: "numeric",
        }),
        value: formatDateValue(nextDate),
      });
    }
  }

  return dates;
}

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    budget: "",
    message: "",
  });
  const [selectedDate, setSelectedDate] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [submittedGoogleFormUrl, setSubmittedGoogleFormUrl] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const dates = getAvailableDates();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const nextGoogleFormUrl = buildGoogleFormUrl({
      fullName: form.name,
      email: form.email,
      phone: form.phone,
      budget: form.budget,
      projectDetails: form.message,
      preferredCallSlot:
        selectedDate && selectedTime
          ? `${selectedDate.label} at ${selectedTime}`
          : "",
    });

    if (!nextGoogleFormUrl) {
      setError(
        "Google Form is not configured yet. Add your pre-filled form link in src/lib/googleForm.ts."
      );
      return;
    }

    window.open(nextGoogleFormUrl, "_blank", "noopener,noreferrer");
    setSubmittedGoogleFormUrl(nextGoogleFormUrl);
    setSent(true);
  };

  if (sent) {
    return (
      <section id="contact" className="py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 bg-white/[0.08] border border-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-lg font-semibold text-[#d1d1d1]">OK</span>
          </div>
          <h3 className="text-3xl font-bold text-white mb-4">
            Continue in Google Forms
          </h3>
          <p className="text-theme-muted max-w-xl mx-auto">
            Your website details are ready in a pre-filled Google Form. Open it
            below and submit there to finish the inquiry.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={submittedGoogleFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-sm"
            >
              Open Google Form {"->"}
            </a>
            <button
              type="button"
              onClick={() => {
                setSent(false);
                setError("");
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-sm border border-white/10 text-white/80 hover:text-white transition-colors"
            >
              Edit Details
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <div className="section-label mb-4">Get In Touch</div>
          <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
            Ready to Build
            <br />
            Your Vision Online?
          </h2>
          <p className="text-theme-muted mt-4 text-lg max-w-md mx-auto">
            Tell us about your project and we will carry those details into
            Google Forms instead of sending them by email.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-theme-muted text-xs mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Rohan Sharma"
                  className="form-input"
                />
              </div>
              <div>
                <label className="block text-theme-muted text-xs mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="rohan@company.com"
                  className="form-input"
                />
              </div>
            </div>

            <div>
              <label className="block text-theme-muted text-xs mb-2">
                Contact Number
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="form-input"
              />
            </div>

            <div>
              <label className="block text-theme-muted text-xs mb-2">
                Estimated Budget Range *
              </label>
              <select
                name="budget"
                required
                value={form.budget}
                onChange={handleChange}
                className="form-input"
              >
                <option value="">Select a budget range...</option>
                {budgets.map((budget) => (
                  <option key={budget} value={budget}>
                    {budget}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-theme-muted text-xs mb-2">
                Project Details (Optional)
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us about your project, goals, and any specific requirements..."
                rows={4}
                className="form-input resize-none"
              />
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              type="submit"
              className="btn-primary w-full py-4 rounded-full font-semibold text-sm"
            >
              Continue to Google Form {"->"}
            </button>
          </form>

          <div>
            <div className="flex items-center gap-3 mb-6">
              <CalendarDays size={18} className="text-theme-muted" />
              <h3 className="text-white font-semibold">Schedule a Call</h3>
            </div>

            <p className="text-theme-muted text-sm mb-6">
              Pick a date and time that works for you so it can be included in
              the Google Form.
            </p>

            <div className="mb-6">
              <label className="block text-theme-muted text-xs mb-3">
                Select Date
              </label>
              <div className="flex flex-wrap gap-2">
                {dates.map((date) => (
                  <button
                    key={date.value}
                    type="button"
                    onClick={() => {
                      setSelectedDate(date);
                      setSelectedTime("");
                    }}
                    className={`time-slot text-xs ${
                      selectedDate?.value === date.value ? "selected" : ""
                    }`}
                  >
                    {date.label}
                  </button>
                ))}
              </div>
            </div>

            {selectedDate?.value && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Clock size={14} className="text-theme-muted" />
                  <label className="text-theme-muted text-xs">Select Time</label>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTime(slot)}
                      className={`time-slot ${
                        selectedTime === slot ? "selected" : ""
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {selectedDate && selectedTime && (
              <div className="mt-6 p-4 bg-white/5 border border-white/10 rounded-xl">
                <p className="text-white/60 text-sm">
                  <span className="text-white font-semibold">Scheduled: </span>
                  {selectedDate.label} at {selectedTime}
                </p>
                <p className="text-white/30 text-xs mt-1">
                  This will be carried into the Google Form.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

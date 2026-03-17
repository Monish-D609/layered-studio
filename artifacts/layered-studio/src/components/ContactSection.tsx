import { useState } from "react";
import { CalendarDays, Clock } from "lucide-react";

const budgets = [
  "₹30,000 – ₹35,000 (Starter)",
  "₹55,000 – ₹60,000 (Professional)",
  "₹70,000+ (Premium)",
  "Custom Budget",
  "Not sure yet",
];

const timeSlots = [
  "9:00 AM – 10:00 AM",
  "10:00 AM – 11:00 AM",
  "11:00 AM – 12:00 PM",
  "12:00 PM – 1:00 PM",
  "2:00 PM – 3:00 PM",
  "3:00 PM – 4:00 PM",
  "4:00 PM – 5:00 PM",
  "5:00 PM – 6:00 PM",
  "7:00 PM – 8:00 PM",
  "8:00 PM – 9:00 PM",
  "9:00 PM – 10:00 PM",
];

// Get today's date and next 14 days
function getAvailableDates() {
  const dates: { label: string; value: string }[] = [];
  const today = new Date();
  for (let i = 1; i <= 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const day = d.getDay();
    if (day !== 0 && day !== 6) {
      // Skip weekends
      dates.push({
        label: d.toLocaleDateString("en-IN", {
          weekday: "short",
          month: "short",
          day: "numeric",
        }),
        value: d.toISOString().split("T")[0],
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
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [sending, setSending] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");

    try {
      // Build mailto as fallback (EmailJS requires a service ID)
      const subject = encodeURIComponent("New Project Inquiry — Layered Studio");
      const body = encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nBudget: ${form.budget}\nMessage: ${form.message}\nScheduled Date: ${selectedDate || "Not selected"}\nScheduled Time: ${selectedTime || "Not selected"}`
      );
      window.location.href = `mailto:monishpersonal609@gmail.com?subject=${subject}&body=${body}`;
      setSent(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <section id="contact" className="py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl">✓</span>
          </div>
          <h3 className="text-3xl font-bold text-white mb-4">Message Sent!</h3>
          <p className="text-white/50">
            We'll get back to you within 24 hours to discuss your project.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <div className="section-label mb-4">Get In Touch</div>
          <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
            Ready to Build
            <br />
            Your Vision Online?
          </h2>
          <p className="text-white/40 mt-4 text-lg max-w-md">
            Tell us about your project and we'll craft a plan that brings it to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-white/40 text-xs mb-2">
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
                <label className="block text-white/40 text-xs mb-2">
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
              <label className="block text-white/40 text-xs mb-2">
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
              <label className="block text-white/40 text-xs mb-2">
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
                {budgets.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-white/40 text-xs mb-2">
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

            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={sending}
              className="btn-primary w-full py-4 rounded-full font-semibold text-sm disabled:opacity-50"
            >
              {sending ? "Sending..." : "Send Message →"}
            </button>
          </form>

          {/* Schedule a call */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <CalendarDays size={18} className="text-white/40" />
              <h3 className="text-white font-semibold">Schedule a Call</h3>
            </div>

            <p className="text-white/40 text-sm mb-6">
              Pick a date and time that works for you. We'll reach out to confirm.
            </p>

            {/* Date picker */}
            <div className="mb-6">
              <label className="block text-white/40 text-xs mb-3">
                Select Date
              </label>
              <div className="flex flex-wrap gap-2">
                {dates.map((date) => (
                  <button
                    key={date.value}
                    type="button"
                    onClick={() => setSelectedDate(date.value)}
                    className={`time-slot text-xs ${
                      selectedDate === date.value ? "selected" : ""
                    }`}
                  >
                    {date.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Time slots */}
            {selectedDate && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Clock size={14} className="text-white/40" />
                  <label className="text-white/40 text-xs">Select Time</label>
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
                  {selectedDate} at {selectedTime}
                </p>
                <p className="text-white/30 text-xs mt-1">
                  Include this in your form submission above.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

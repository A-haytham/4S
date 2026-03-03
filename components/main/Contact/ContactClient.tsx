"use client";

import { useState } from "react";
import { CheckCircle, Mail, MapPin, Phone, Send } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { createContactLead } from "./contactApi";

type ContactCopy = {
  form: {
    title: string;
    success: string;
    name: string;
    company: string;
    email: string;
    phone: string;
    message: string;
    submit: string;
    sending: string;
    placeholders: {
      name: string;
      company: string;
      email: string;
      phone: string;
      message: string;
    };
    errors: {
      name: string;
      company: string;
      email: string;
      emailInvalid: string;
      phone: string;
      message: string;
    };
  };
  sales: {
    title: string;
    description: string;
    email: string;
    phone: string;
  };
  support: {
    title: string;
    description: string;
    email: string;
    phone: string;
  };
  location: {
    title: string;
    address: string;
  };
  map: {
    label: string;
  };
};

type ContactClientProps = {
  copy: ContactCopy;
};

export default function ContactClient({ copy }: ContactClientProps) {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = copy.form.errors.name;
    if (!formData.company.trim()) newErrors.company = copy.form.errors.company;
    if (!formData.email.trim()) {
      newErrors.email = copy.form.errors.email;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = copy.form.errors.emailInvalid;
    }
    if (!formData.phone.trim()) newErrors.phone = copy.form.errors.phone;
    if (!formData.message.trim()) newErrors.message = copy.form.errors.message;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    setSubmitError("");
    setIsSubmitting(true);

    try {
      await createContactLead({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        subject: formData.company.trim(),
        message: formData.message.trim(),
      });

      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", company: "", email: "", phone: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      setIsSubmitting(false);
      setSubmitError(error instanceof Error ? error.message : "Failed to send your message.");
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (submitError) {
      setSubmitError("");
    }
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Reveal>
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
                  <h2 className="mb-6 text-2xl font-bold text-gray-900">
                    {copy.form.title}
                  </h2>

                  {isSubmitted ? (
                    <div className="mb-6 flex items-center space-x-3 rounded-xl border border-green-200 bg-green-50 p-4 rtl:space-x-reverse">
                      <CheckCircle size={24} className="shrink-0 text-green-500" />
                      <p className="text-green-700">{copy.form.success}</p>
                    </div>
                  ) : null}

                  {submitError ? (
                    <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
                      {submitError}
                    </div>
                  ) : null}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <label
                          htmlFor="name"
                          className="mb-2 block text-sm font-medium text-gray-700"
                        >
                          {copy.form.name}
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full rounded-xl border bg-gray-50 px-4 py-3 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#0F4C81] ${
                            errors.name ? "border-red-300" : "border-gray-200"
                          }`}
                          placeholder={copy.form.placeholders.name}
                        />
                        {errors.name ? (
                          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                        ) : null}
                      </div>
                      <div>
                        <label
                          htmlFor="company"
                          className="mb-2 block text-sm font-medium text-gray-700"
                        >
                          {copy.form.company}
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className={`w-full rounded-xl border bg-gray-50 px-4 py-3 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#0F4C81] ${
                            errors.company ? "border-red-300" : "border-gray-200"
                          }`}
                          placeholder={copy.form.placeholders.company}
                        />
                        {errors.company ? (
                          <p className="mt-1 text-sm text-red-600">{errors.company}</p>
                        ) : null}
                      </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <label
                          htmlFor="email"
                          className="mb-2 block text-sm font-medium text-gray-700"
                        >
                          {copy.form.email}
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full rounded-xl border bg-gray-50 px-4 py-3 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#0F4C81] ${
                            errors.email ? "border-red-300" : "border-gray-200"
                          }`}
                          placeholder={copy.form.placeholders.email}
                        />
                        {errors.email ? (
                          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                        ) : null}
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="mb-2 block text-sm font-medium text-gray-700"
                        >
                          {copy.form.phone}
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`w-full rounded-xl border bg-gray-50 px-4 py-3 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#0F4C81] ${
                            errors.phone ? "border-red-300" : "border-gray-200"
                          }`}
                          placeholder={copy.form.placeholders.phone}
                        />
                        {errors.phone ? (
                          <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                        ) : null}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        {copy.form.message}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        className={`w-full resize-none rounded-xl border bg-gray-50 px-4 py-3 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#0F4C81] ${
                          errors.message ? "border-red-300" : "border-gray-200"
                        }`}
                        placeholder={copy.form.placeholders.message}
                      />
                      {errors.message ? (
                        <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                      ) : null}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex w-full items-center justify-center space-x-2 rounded-xl bg-[#0F4C81] px-8 py-4 text-white transition-all hover:bg-[#083A61] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 rtl:space-x-reverse"
                    >
                      <span>{isSubmitting ? copy.form.sending : copy.form.submit}</span>
                      <Send size={20} />
                    </button>
                  </form>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-2xl bg-linear-to-br from-blue-50 to-blue-100 p-8">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0F4C81]">
                    <Phone size={24} className="text-white" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">
                    {copy.sales.title}
                  </h3>
                  <p className="mb-4 text-gray-600">{copy.sales.description}</p>
                  <div className="space-y-2">
                    <a
                      href={`mailto:${copy.sales.email}`}
                      className="flex items-center space-x-2 text-[#0F4C81] hover:underline rtl:space-x-reverse"
                    >
                      <Mail size={16} />
                      <span className="text-sm">{copy.sales.email}</span>
                    </a>
                    <a
                      href={`tel:${copy.sales.phone}`}
                      className="flex items-center space-x-2 text-[#0F4C81] hover:underline rtl:space-x-reverse"
                    >
                      <Phone size={16} />
                      <span className="text-sm">{copy.sales.phone}</span>
                    </a>
                  </div>
                </div>

                <div className="rounded-2xl bg-linear-to-br from-green-50 to-green-100 p-8">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-600">
                    <Mail size={24} className="text-white" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">
                    {copy.support.title}
                  </h3>
                  <p className="mb-4 text-gray-600">{copy.support.description}</p>
                  <div className="space-y-2">
                    <a
                      href={`mailto:${copy.support.email}`}
                      className="flex items-center space-x-2 text-green-700 hover:underline rtl:space-x-reverse"
                    >
                      <Mail size={16} />
                      <span className="text-sm">{copy.support.email}</span>
                    </a>
                    <a
                      href={`tel:${copy.support.phone}`}
                      className="flex items-center space-x-2 text-green-700 hover:underline rtl:space-x-reverse"
                    >
                      <Phone size={16} />
                      <span className="text-sm">{copy.support.phone}</span>
                    </a>
                  </div>
                </div>

                <div className="rounded-2xl bg-linear-to-br from-purple-50 to-purple-100 p-8">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-600">
                    <MapPin size={24} className="text-white" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">
                    {copy.location.title}
                  </h3>
                  <p className="text-gray-600">{copy.location.address}</p>
                </div>

                <div className="h-64 overflow-hidden rounded-2xl bg-gray-100">
                  <div className="flex h-full w-full items-center justify-center text-gray-400">
                    <div className="text-center">
                      <MapPin size={48} className="mx-auto mb-2" />
                      <p className="text-sm">{copy.map.label}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>
    </div>
  );
}

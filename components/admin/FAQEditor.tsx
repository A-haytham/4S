"use client";

import { useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import type { FAQ } from "./FAQsList";

type FAQEditorProps = {
  faq?: FAQ;
  onSave: (faq: Partial<FAQ>) => void;
  onCancel: () => void;
};

const categories = [
  "General",
  "ERP",
  "Implementation",
  "Support",
  "Pricing",
  "Technical",
  "Security",
  "Integration",
];

const getInitialFormData = (faq?: FAQ): Partial<FAQ> => ({
  questionEn: faq?.questionEn || "",
  answerEn: faq?.answerEn || "",
  questionAr: faq?.questionAr || "",
  answerAr: faq?.answerAr || "",
  category: faq?.category || "General",
  order: faq?.order || 1,
});

export function FAQEditor({ faq, onSave, onCancel }: FAQEditorProps) {
  const [formData, setFormData] = useState<Partial<FAQ>>(() => getInitialFormData(faq));

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSave(formData);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg p-2 transition-colors hover:bg-gray-100"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{faq ? "Edit FAQ" : "Create New FAQ"}</h1>
          <p className="mt-1 text-gray-600">
            {faq ? "Update the FAQ entry" : "Add a new frequently asked question"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="space-y-6 rounded-xl border border-gray-200 bg-white p-6">
              <div className="mb-2 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-600" />
                <h3 className="font-bold text-gray-900">English Version</h3>
              </div>

              <div>
                <label htmlFor="questionEn" className="text-gray-700">
                  Question (EN) <span className="text-red-500">*</span>
                </label>
                <input
                  id="questionEn"
                  value={formData.questionEn || ""}
                  onChange={(event) => setFormData((prev) => ({ ...prev, questionEn: event.target.value }))}
                  placeholder="Enter question in English..."
                  required
                  className="mt-2 h-12 w-full rounded-lg border border-gray-300 px-4 text-sm text-gray-900 focus:border-[#0F4C81] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20"
                />
              </div>

              <div>
                <label htmlFor="answerEn" className="text-gray-700">
                  Answer (EN) <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="answerEn"
                  value={formData.answerEn || ""}
                  onChange={(event) => setFormData((prev) => ({ ...prev, answerEn: event.target.value }))}
                  placeholder="Enter answer in English..."
                  required
                  rows={6}
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 focus:border-[#0F4C81] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20"
                />
              </div>
            </div>

            <div className="space-y-6 rounded-xl border border-gray-200 bg-white p-6">
              <div className="mb-2 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-600" />
                <h3 className="font-bold text-gray-900">Arabic Version (نسخة عربية)</h3>
              </div>

              <div>
                <label htmlFor="questionAr" className="text-gray-700">
                  Question (AR) <span className="text-red-500">*</span>
                </label>
                <input
                  id="questionAr"
                  value={formData.questionAr || ""}
                  onChange={(event) => setFormData((prev) => ({ ...prev, questionAr: event.target.value }))}
                  placeholder="أدخل السؤال بالعربية..."
                  required
                  dir="rtl"
                  className="mt-2 h-12 w-full rounded-lg border border-gray-300 px-4 text-right text-sm text-gray-900 focus:border-[#0F4C81] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20"
                  style={{ fontFamily: "Cairo, sans-serif" }}
                />
              </div>

              <div>
                <label htmlFor="answerAr" className="text-gray-700">
                  Answer (AR) <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="answerAr"
                  value={formData.answerAr || ""}
                  onChange={(event) => setFormData((prev) => ({ ...prev, answerAr: event.target.value }))}
                  placeholder="أدخل الإجابة بالعربية..."
                  required
                  rows={6}
                  dir="rtl"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-right text-sm text-gray-900 focus:border-[#0F4C81] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20"
                  style={{ fontFamily: "Cairo, sans-serif" }}
                />
              </div>
            </div>

            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
              <p className="text-sm text-blue-800">
                <strong>Tip:</strong> Keep questions concise (under 100 characters) and answers informative but not too
                long (under 500 characters) for better readability.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="font-bold text-gray-900">Settings</h3>

              <div>
                <label htmlFor="category" className="text-gray-700">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  value={formData.category || "General"}
                  onChange={(event) => setFormData((prev) => ({ ...prev, category: event.target.value }))}
                  className="mt-2 h-12 w-full rounded-lg border border-gray-300 px-4 text-sm text-gray-900 focus:border-[#0F4C81] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="order" className="text-gray-700">
                  Display Order
                </label>
                <input
                  id="order"
                  type="number"
                  min={1}
                  value={formData.order ?? 1}
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      order: Number.parseInt(event.target.value, 10) || 1,
                    }))
                  }
                  className="mt-2 h-12 w-full rounded-lg border border-gray-300 px-4 text-sm text-gray-900 focus:border-[#0F4C81] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20"
                />
                <p className="mt-1 text-xs text-gray-500">Lower numbers appear first</p>
              </div>

              <div className="space-y-4 border-t border-gray-200 pt-4">
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-[#0F4C81] to-[#2B7CB3] px-4 py-2 text-sm font-semibold text-white transition-all hover:from-[#083A61] hover:to-[#1E5F9E]"
                >
                  <Save className="mr-2 h-4 w-4" />
                  {faq ? "Update FAQ" : "Create FAQ"}
                </button>
                <button
                  type="button"
                  onClick={onCancel}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>

            <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="font-bold text-gray-900">Preview</h3>

              <div className="space-y-3">
                <div className="rounded-lg bg-gray-50 p-3">
                  <p className="mb-1 text-xs text-gray-500">Category</p>
                  <p className="text-sm font-medium text-gray-900">{formData.category}</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-3">
                  <p className="mb-1 text-xs text-gray-500">Order</p>
                  <p className="text-sm font-medium text-gray-900">#{formData.order}</p>
                </div>
              </div>

              {formData.questionEn ? (
                <div className="border-t border-gray-200 pt-3">
                  <p className="mb-2 text-xs text-gray-500">English Question</p>
                  <p className="text-sm font-medium text-gray-900">{formData.questionEn}</p>
                </div>
              ) : null}

              {formData.questionAr ? (
                <div className="border-t border-gray-200 pt-3">
                  <p className="mb-2 text-xs text-gray-500">Arabic Question</p>
                  <p
                    className="text-right text-sm font-medium text-gray-900"
                    dir="rtl"
                    style={{ fontFamily: "Cairo, sans-serif" }}
                  >
                    {formData.questionAr}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

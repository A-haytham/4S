"use client";

import { useState } from "react";
import { ArrowLeft, Image as ImageIcon, Save, Copy, Loader2 } from "lucide-react";
import type { Blog } from "./BlogsList";

type BlogEditorProps = {
  blog?: Blog;
  onSave: (blog: Partial<Blog>) => Promise<void> | void;
  onCancel: () => void;
};

export function BlogEditor({ blog, onSave, onCancel }: BlogEditorProps) {
  const [formData, setFormData] = useState<Partial<Blog>>(() => ({
    titleEn: blog?.titleEn || "",
    titleAr: blog?.titleAr || "",
    slug: blog?.slug || "",
    briefEn: blog?.briefEn || "",
    briefAr: blog?.briefAr || "",
    contentEn: blog?.contentEn || "",
    contentAr: blog?.contentAr || "",
    coverImage: blog?.coverImage || "",
    category: blog?.category || "General",
    status: blog?.status || "draft",
    publishDate: blog?.publishDate || new Date().toISOString(),
    metaTitleEn: blog?.metaTitleEn || "",
    metaTitleAr: blog?.metaTitleAr || "",
    metaDescriptionEn: blog?.metaDescriptionEn || "",
    metaDescriptionAr: blog?.metaDescriptionAr || "",
  }));

  const [imagePreview, setImagePreview] = useState(blog?.coverImage || "");
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);

  // contract template state editable and copyable
  const initialTemplate = `<h1>عنوان المقال الرئيسي</h1>

<p>مقدمة قصيرة (2–4 سطور) تلخص المقال وتشد القارئ.</p>

<h2>العنوان الفرعي الأول</h2>
<p>فقرة تشرح الفكرة الأساسية تحت العنوان.</p>
<p>فقرة ثانية لو محتاج تفاصيل أو مثال.</p>

<h2>العنوان الفرعي الثاني</h2>
<p>فقرة تشرح النقطة الثانية.</p>

<h2>العنوان الفرعي الثالث</h2>
<p>فقرة تلخص أو تقدم خطوات/نصايح داخل نص عادي.</p>

<p>خاتمة قصيرة: تلخيص سريع + جملة نهائية.</p>`;
  const [template, setTemplate] = useState(initialTemplate);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSaving) {
      return;
    }

    setIsSaving(true);

    try {
      await Promise.resolve(onSave(formData));
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const url = event.target.value;
    setFormData((prev) => ({ ...prev, coverImage: url }));
    setImagePreview(url);
    setUploadStatus("");
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setUploadStatus("Please select an image file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      if (!result) {
        setUploadStatus("Could not read the selected file.");
        return;
      }

      setFormData((prev) => ({ ...prev, coverImage: result }));
      setImagePreview(result);
      setUploadStatus(`Uploaded: ${file.name}`);
    };
    reader.onerror = () => {
      setUploadStatus("Failed to upload image from device.");
    };
    reader.readAsDataURL(file);
  };

  const handleTitleEnChange = (titleEn: string) => {
    setFormData((prev) => {
      if (blog) {
        return { ...prev, titleEn };
      }

      const slug = titleEn
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      return { ...prev, titleEn, slug };
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
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
            <h1 className="text-2xl font-bold text-gray-900">
              {blog ? "Edit Blog" : "Create New Blog"}
            </h1>
            <p className="mt-1 text-gray-600">
              {blog
                ? "Update your blog post"
                : "Write and publish your blog post"}
            </p>
          </div>
        </div>
        <span
          className={`rounded-full border px-3 py-1 text-xs font-semibold ${
            formData.status === "published"
              ? "border-green-200 bg-green-50 text-green-700"
              : "border-orange-200 bg-orange-50 text-orange-700"
          }`}
        >
          {formData.status === "published" ? "Published" : "Draft"}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="space-y-6 rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="font-bold text-gray-900">Titles (EN / AR)</h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="titleEn" className="text-gray-700">
                    Title EN <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="titleEn"
                    value={formData.titleEn || ""}
                    onChange={(event) =>
                      handleTitleEnChange(event.target.value)
                    }
                    placeholder="Enter English title..."
                    required
                    className="mt-2 h-12 w-full rounded-lg border border-gray-300 px-4 text-sm text-gray-900 focus:border-[#0F4C81] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20"
                  />
                </div>

                <div>
                  <label htmlFor="titleAr" className="text-gray-700">
                    Title AR <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="titleAr"
                    value={formData.titleAr || ""}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        titleAr: event.target.value,
                      }))
                    }
                    placeholder="ادخل العنوان بالعربي..."
                    required
                    dir="rtl"
                    className="mt-2 h-12 w-full rounded-lg border border-gray-300 px-4 text-right text-sm text-gray-900 focus:border-[#0F4C81] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="slug" className="text-gray-700">
                  Slug (URL)
                </label>
                <input
                  id="slug"
                  value={formData.slug || ""}
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      slug: event.target.value,
                    }))
                  }
                  placeholder="blog-post-url"
                  className="mt-2 h-12 w-full rounded-lg border border-gray-300 px-4 text-sm text-gray-900 focus:border-[#0F4C81] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20"
                />
                <p className="mt-1 text-xs text-gray-500">
                  URL-friendly version of the English title
                </p>
              </div>
            </div>

            <div className="space-y-6 rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="font-bold text-gray-900">Brief (EN / AR)</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="briefEn" className="text-gray-700">
                    Brief EN <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="briefEn"
                    value={formData.briefEn || ""}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        briefEn: event.target.value,
                      }))
                    }
                    placeholder="Brief description in English..."
                    required
                    rows={4}
                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 focus:border-[#0F4C81] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20"
                  />
                </div>

                <div>
                  <label htmlFor="briefAr" className="text-gray-700">
                    Brief AR <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="briefAr"
                    value={formData.briefAr || ""}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        briefAr: event.target.value,
                      }))
                    }
                    placeholder="نبذة مختصرة بالعربي..."
                    required
                    rows={4}
                    dir="rtl"
                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-right text-sm text-gray-900 focus:border-[#0F4C81] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6 rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="font-bold text-gray-900">Content (EN / AR)</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="contentEn" className="text-gray-700">
                    Content EN <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="contentEn"
                    value={formData.contentEn || ""}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        contentEn: event.target.value,
                      }))
                    }
                    placeholder="Write English content here... (supports HTML)"
                    required
                    rows={16}
                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 font-mono text-sm text-gray-900 focus:border-[#0F4C81] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20"
                  />
                </div>

                <div>
                  <label htmlFor="contentAr" className="text-gray-700">
                    Content AR <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="contentAr"
                    value={formData.contentAr || ""}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        contentAr: event.target.value,
                      }))
                    }
                    placeholder="اكتب المحتوى العربي هنا... (يدعم HTML)"
                    required
                    rows={16}
                    dir="rtl"
                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-right font-mono text-sm text-gray-900 focus:border-[#0F4C81] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500">
                You can use HTML tags for formatting
              </p>
            </div>

            <div className="space-y-6 rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="font-bold text-gray-900">
                SEO Settings (EN / AR)
              </h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="metaTitleEn" className="text-gray-700">
                    Meta Title EN
                  </label>
                  <input
                    id="metaTitleEn"
                    value={formData.metaTitleEn || ""}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        metaTitleEn: event.target.value,
                      }))
                    }
                    placeholder="SEO title in English"
                    className="mt-2 h-12 w-full rounded-lg border border-gray-300 px-4 text-sm text-gray-900 focus:border-[#0F4C81] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20"
                  />
                </div>

                <div>
                  <label htmlFor="metaTitleAr" className="text-gray-700">
                    Meta Title AR
                  </label>
                  <input
                    id="metaTitleAr"
                    value={formData.metaTitleAr || ""}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        metaTitleAr: event.target.value,
                      }))
                    }
                    placeholder="عنوان SEO بالعربي"
                    dir="rtl"
                    className="mt-2 h-12 w-full rounded-lg border border-gray-300 px-4 text-right text-sm text-gray-900 focus:border-[#0F4C81] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="metaDescriptionEn" className="text-gray-700">
                    Meta Description EN
                  </label>
                  <textarea
                    id="metaDescriptionEn"
                    value={formData.metaDescriptionEn || ""}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        metaDescriptionEn: event.target.value,
                      }))
                    }
                    placeholder="SEO description in English"
                    rows={3}
                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 focus:border-[#0F4C81] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    {(formData.metaDescriptionEn || "").length} / 160 characters
                  </p>
                </div>

                <div>
                  <label htmlFor="metaDescriptionAr" className="text-gray-700">
                    Meta Description AR
                  </label>
                  <textarea
                    id="metaDescriptionAr"
                    value={formData.metaDescriptionAr || ""}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        metaDescriptionAr: event.target.value,
                      }))
                    }
                    placeholder="وصف SEO بالعربي"
                    rows={3}
                    dir="rtl"
                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-right text-sm text-gray-900 focus:border-[#0F4C81] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    {(formData.metaDescriptionAr || "").length} / 160 characters
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="font-bold text-gray-900">Publish Settings</h3>

              <div className="flex items-center justify-between">
                <label htmlFor="status" className="text-gray-700">
                  Status
                </label>
                <input
                  id="status"
                  type="checkbox"
                  checked={formData.status === "published"}
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      status: event.target.checked ? "published" : "draft",
                    }))
                  }
                  className="h-5 w-10 appearance-none rounded-full bg-gray-200 transition before:absolute before:mt-0.5 before:ml-0.5 before:h-4 before:w-4 before:rounded-full before:bg-white before:transition checked:bg-[#0F4C81] checked:before:translate-x-5"
                />
              </div>

              <div>
                <label htmlFor="category" className="text-gray-700">
                  Category
                </label>
                <input
                  id="category"
                  value={formData.category || ""}
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      category: event.target.value,
                    }))
                  }
                  placeholder="General"
                  className="mt-2 h-12 w-full rounded-lg border border-gray-300 px-4 text-sm text-gray-900 focus:border-[#0F4C81] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20"
                />
              </div>

              <div className="space-y-3 border-t border-gray-200 pt-4">
                <button
                  type="submit"
                  disabled={isSaving}
                  aria-busy={isSaving}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-linear-to-r from-[#0F4C81] to-[#2B7CB3] px-4 py-2 text-sm font-semibold text-white transition-all hover:from-[#083A61] hover:to-[#1E5F9E] disabled:cursor-not-allowed disabled:opacity-80"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {formData.status === "published"
                        ? "Publishing..."
                        : "Saving draft..."}
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      {formData.status === "published"
                        ? "Publish"
                        : "Save as Draft"}
                    </>
                  )}
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
              <h3 className="font-bold text-gray-900">Contract Fields</h3>
              <p className="text-sm text-gray-600">
                This editor sends bilingual fields (`*En` / `*Ar`) and publish
                settings to the backend admin endpoints.
              </p>
              <div className="mt-2">
                <textarea
                  value={template}
                  onChange={(e) => setTemplate(e.target.value)}
                  rows={14}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 font-mono text-xs text-gray-800"
                />
                <div className="mt-1 flex items-center space-x-2 rtl:space-x-reverse">
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(template);
                      setUploadStatus("Template copied to clipboard");
                      setTimeout(() => setUploadStatus(""), 3000);
                    }}
                    className="inline-flex items-center justify-center rounded-full bg-[#0F4C81] p-2 text-white hover:bg-[#083A61]"
                    aria-label="Copy template"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                  <span className="text-xs text-gray-500">
                    {uploadStatus === "Template copied to clipboard"
                      ? uploadStatus
                      : ""}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="font-bold text-gray-900">Cover Image</h3>

              <div>
                <label htmlFor="coverImage" className="text-gray-700">
                  Image URL
                </label>
                <input
                  id="coverImage"
                  value={formData.coverImage || ""}
                  onChange={handleImageChange}
                  placeholder="https://example.com/image.jpg"
                  className="mt-2 h-12 w-full rounded-lg border border-gray-300 px-4 text-sm text-gray-900 focus:border-[#0F4C81] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20"
                />
              </div>

              <div>
                <label htmlFor="coverImageFile" className="text-gray-700">
                  Upload from device
                </label>
                <input
                  id="coverImageFile"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="mt-2 block w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-[#0F4C81] file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-[#083A61] focus:border-[#0F4C81] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20"
                />
                {uploadStatus ? (
                  <p className="mt-2 text-xs text-gray-500">{uploadStatus}</p>
                ) : null}
              </div>

              {imagePreview ? (
                <div className="overflow-hidden rounded-lg border border-gray-200">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-48 w-full object-cover"
                    onError={() => setImagePreview("")}
                  />
                </div>
              ) : (
                <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
                  <ImageIcon className="mx-auto mb-2 h-12 w-12 text-gray-400" />
                  <p className="text-sm text-gray-500">No image selected</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Image as ImageIcon, Save } from "lucide-react";
import type { Blog } from "./BlogsList";

type BlogEditorProps = {
  blog?: Blog;
  onSave: (blog: Partial<Blog>) => void;
  onCancel: () => void;
};

const categories = [
  "ERP",
  "Digital Transformation",
  "Cloud Computing",
  "Business",
  "Technology",
  "Industry News",
];

export function BlogEditor({ blog, onSave, onCancel }: BlogEditorProps) {
  const [formData, setFormData] = useState<Partial<Blog>>({
    title: blog?.title || "",
    slug: blog?.slug || "",
    excerpt: blog?.excerpt || "",
    content: blog?.content || "",
    category: blog?.category || "ERP",
    coverImage: blog?.coverImage || "",
    status: blog?.status || "draft",
    publishDate: blog?.publishDate || new Date().toISOString(),
    metaTitle: blog?.metaTitle || "",
    metaDescription: blog?.metaDescription || "",
    author: blog?.author || "Admin",
    readTime: blog?.readTime || "5 min read",
  });

  const [imagePreview, setImagePreview] = useState(blog?.coverImage || "");

  useEffect(() => {
    setFormData({
      title: blog?.title || "",
      slug: blog?.slug || "",
      excerpt: blog?.excerpt || "",
      content: blog?.content || "",
      category: blog?.category || "ERP",
      coverImage: blog?.coverImage || "",
      status: blog?.status || "draft",
      publishDate: blog?.publishDate || new Date().toISOString(),
      metaTitle: blog?.metaTitle || "",
      metaDescription: blog?.metaDescription || "",
      author: blog?.author || "Admin",
      readTime: blog?.readTime || "5 min read",
    });
    setImagePreview(blog?.coverImage || "");
  }, [blog]);

  useEffect(() => {
    if (!blog && formData.title) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setFormData((prev) => ({ ...prev, slug }));
    }
  }, [formData.title, blog]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSave(formData);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const url = event.target.value;
    setFormData((prev) => ({ ...prev, coverImage: url }));
    setImagePreview(url);
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
            <h1 className="text-2xl font-bold text-gray-900">{blog ? "Edit Blog" : "Create New Blog"}</h1>
            <p className="mt-1 text-gray-600">
              {blog ? "Update your blog post" : "Write and publish your blog post"}
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
              <div>
                <label htmlFor="title" className="text-gray-700">
                  Blog Title <span className="text-red-500">*</span>
                </label>
                <input
                  id="title"
                  value={formData.title || ""}
                  onChange={(event) => setFormData((prev) => ({ ...prev, title: event.target.value }))}
                  placeholder="Enter blog title..."
                  required
                  className="mt-2 h-12 w-full rounded-lg border border-gray-300 px-4 text-sm text-gray-900 focus:border-[#0F4C81] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20"
                />
              </div>

              <div>
                <label htmlFor="slug" className="text-gray-700">
                  Slug (URL)
                </label>
                <input
                  id="slug"
                  value={formData.slug || ""}
                  onChange={(event) => setFormData((prev) => ({ ...prev, slug: event.target.value }))}
                  placeholder="blog-post-url"
                  className="mt-2 h-12 w-full rounded-lg border border-gray-300 px-4 text-sm text-gray-900 focus:border-[#0F4C81] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20"
                />
                <p className="mt-1 text-xs text-gray-500">URL-friendly version of the title</p>
              </div>

              <div>
                <label htmlFor="excerpt" className="text-gray-700">
                  Excerpt <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="excerpt"
                  value={formData.excerpt || ""}
                  onChange={(event) => setFormData((prev) => ({ ...prev, excerpt: event.target.value }))}
                  placeholder="Brief description of your blog post..."
                  required
                  rows={3}
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 focus:border-[#0F4C81] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20"
                />
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <label htmlFor="content" className="text-gray-700">
                Content <span className="text-red-500">*</span>
              </label>
              <textarea
                id="content"
                value={formData.content || ""}
                onChange={(event) => setFormData((prev) => ({ ...prev, content: event.target.value }))}
                placeholder="Write your blog content here... (supports HTML)"
                required
                rows={20}
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 font-mono text-sm text-gray-900 focus:border-[#0F4C81] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20"
              />
              <p className="mt-2 text-xs text-gray-500">You can use HTML tags for formatting</p>
            </div>

            <div className="space-y-6 rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="font-bold text-gray-900">SEO Settings</h3>

              <div>
                <label htmlFor="metaTitle" className="text-gray-700">
                  Meta Title
                </label>
                <input
                  id="metaTitle"
                  value={formData.metaTitle || ""}
                  onChange={(event) => setFormData((prev) => ({ ...prev, metaTitle: event.target.value }))}
                  placeholder="SEO title for search engines"
                  className="mt-2 h-12 w-full rounded-lg border border-gray-300 px-4 text-sm text-gray-900 focus:border-[#0F4C81] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20"
                />
              </div>

              <div>
                <label htmlFor="metaDescription" className="text-gray-700">
                  Meta Description
                </label>
                <textarea
                  id="metaDescription"
                  value={formData.metaDescription || ""}
                  onChange={(event) => setFormData((prev) => ({ ...prev, metaDescription: event.target.value }))}
                  placeholder="SEO description for search engines"
                  rows={3}
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 focus:border-[#0F4C81] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20"
                />
                <p className="mt-1 text-xs text-gray-500">
                  {(formData.metaDescription || "").length} / 160 characters
                </p>
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

              <div className="space-y-3 border-t border-gray-200 pt-4">
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-[#0F4C81] to-[#2B7CB3] px-4 py-2 text-sm font-semibold text-white transition-all hover:from-[#083A61] hover:to-[#1E5F9E]"
                >
                  <Save className="mr-2 h-4 w-4" />
                  {formData.status === "published" ? "Publish" : "Save as Draft"}
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
              <h3 className="font-bold text-gray-900">Details</h3>

              <div>
                <label htmlFor="category" className="text-gray-700">
                  Category
                </label>
                <select
                  id="category"
                  value={formData.category || "ERP"}
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
                <label htmlFor="author" className="text-gray-700">
                  Author
                </label>
                <input
                  id="author"
                  value={formData.author || ""}
                  onChange={(event) => setFormData((prev) => ({ ...prev, author: event.target.value }))}
                  className="mt-2 h-12 w-full rounded-lg border border-gray-300 px-4 text-sm text-gray-900 focus:border-[#0F4C81] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20"
                />
              </div>

              <div>
                <label htmlFor="readTime" className="text-gray-700">
                  Read Time
                </label>
                <input
                  id="readTime"
                  value={formData.readTime || ""}
                  onChange={(event) => setFormData((prev) => ({ ...prev, readTime: event.target.value }))}
                  placeholder="e.g., 5 min read"
                  className="mt-2 h-12 w-full rounded-lg border border-gray-300 px-4 text-sm text-gray-900 focus:border-[#0F4C81] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20"
                />
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

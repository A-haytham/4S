"use client";

import { useState } from "react";
import { Edit2, Plus, Search, Trash2 } from "lucide-react";

export type Blog = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  coverImage: string;
  status: "draft" | "published";
  publishDate: string;
  metaTitle: string;
  metaDescription: string;
  author: string;
  readTime: string;
};

type BlogsListProps = {
  blogs: Blog[];
  onEdit: (blog: Blog) => void;
  onDelete: (id: string) => void;
  onCreateNew: () => void;
};

export function BlogsList({ blogs, onEdit, onDelete, onCreateNew }: BlogsListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const itemsPerPage = 10;
  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.max(1, Math.ceil(filteredBlogs.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBlogs = filteredBlogs.slice(startIndex, startIndex + itemsPerPage);

  const handleDelete = (id: string) => {
    if (deleteConfirm === id) {
      onDelete(id);
      setDeleteConfirm(null);
      return;
    }
    setDeleteConfirm(id);
    window.setTimeout(() => setDeleteConfirm(null), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blogs Management</h1>
          <p className="mt-1 text-gray-600">Create and manage your blog posts</p>
        </div>
        <button
          type="button"
          onClick={onCreateNew}
          className="inline-flex items-center rounded-lg bg-gradient-to-r from-[#0F4C81] to-[#2B7CB3] px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:from-[#083A61] hover:to-[#1E5F9E]"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Blog
        </button>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search blogs by title or category..."
            value={searchQuery}
            onChange={(event) => {
              setSearchQuery(event.target.value);
              setCurrentPage(1);
            }}
            className="h-12 w-full rounded-lg border border-gray-300 pl-10 pr-4 text-sm text-gray-900 focus:border-[#0F4C81] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <p className="text-sm text-gray-600">Total Blogs</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{blogs.length}</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <p className="text-sm text-gray-600">Published</p>
          <p className="mt-1 text-2xl font-bold text-green-600">
            {blogs.filter((blog) => blog.status === "published").length}
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <p className="text-sm text-gray-600">Drafts</p>
          <p className="mt-1 text-2xl font-bold text-orange-600">
            {blogs.filter((blog) => blog.status === "draft").length}
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        {paginatedBlogs.length === 0 ? (
          <div className="py-12 text-center">
            <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="mb-1 text-lg font-medium text-gray-900">No blogs found</h3>
            <p className="text-gray-500">
              {searchQuery ? "Try adjusting your search query" : "Get started by creating your first blog post"}
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                      Title
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                      Publish Date
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedBlogs.map((blog) => (
                    <tr key={blog.id} className="transition-colors hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-start gap-3">
                          <img
                            src={blog.coverImage}
                            alt={blog.title}
                            className="h-12 w-12 flex-shrink-0 rounded-lg object-cover"
                          />
                          <div className="min-w-0">
                            <p className="truncate font-medium text-gray-900">{blog.title}</p>
                            <p className="truncate text-sm text-gray-500">{blog.excerpt}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                          {blog.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                            blog.status === "published"
                              ? "border-green-200 bg-green-50 text-green-700"
                              : "border-orange-200 bg-orange-50 text-orange-700"
                          }`}
                        >
                          {blog.status === "published" ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(blog.publishDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => onEdit(blog)}
                            className="rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50"
                            title="Edit"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(blog.id)}
                            className={`rounded-lg p-2 transition-colors ${
                              deleteConfirm === blog.id
                                ? "bg-red-100 text-red-700"
                                : "text-red-600 hover:bg-red-50"
                            }`}
                            title={deleteConfirm === blog.id ? "Click again to confirm" : "Delete"}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 ? (
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 px-6 py-4">
                <p className="text-sm text-gray-600">
                  Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredBlogs.length)} of{" "}
                  {filteredBlogs.length} results
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                    disabled={currentPage === 1}
                    className="rounded-lg border border-gray-200 px-3 py-1 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                    disabled={currentPage === totalPages}
                    className="rounded-lg border border-gray-200 px-3 py-1 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Next
                  </button>
                </div>
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}

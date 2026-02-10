"use client";

import { useState } from "react";
import { Edit2, Plus, Search, Trash2 } from "lucide-react";

export type FAQ = {
  id: string;
  questionEn: string;
  answerEn: string;
  questionAr: string;
  answerAr: string;
  category: string;
  order: number;
};

type FAQsListProps = {
  faqs: FAQ[];
  onEdit: (faq: FAQ) => void;
  onDelete: (id: string) => void;
  onCreateNew: () => void;
};

export function FAQsList({ faqs, onEdit, onDelete, onCreateNew }: FAQsListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const itemsPerPage = 10;

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.questionEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filteredFaqs.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFaqs = filteredFaqs.slice(startIndex, startIndex + itemsPerPage);
  const categories = Array.from(new Set(faqs.map((faq) => faq.category)));

  const handleDelete = (id: string) => {
    if (deleteConfirm === id) {
      onDelete(id);
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(id);
      window.setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">FAQs Management</h1>
          <p className="mt-1 text-gray-600">Manage frequently asked questions</p>
        </div>
        <button
          type="button"
          onClick={onCreateNew}
          className="inline-flex items-center rounded-lg bg-gradient-to-r from-[#0F4C81] to-[#2B7CB3] px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:from-[#083A61] hover:to-[#1E5F9E]"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New FAQ
        </button>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search FAQs by question or category..."
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
          <p className="text-sm text-gray-600">Total FAQs</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{faqs.length}</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <p className="text-sm text-gray-600">Categories</p>
          <p className="mt-1 text-2xl font-bold text-purple-600">{categories.length}</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <p className="text-sm text-gray-600">Languages</p>
          <p className="mt-1 text-2xl font-bold text-blue-600">2</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        {paginatedFaqs.length === 0 ? (
          <div className="py-12 text-center">
            <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="mb-1 text-lg font-medium text-gray-900">No FAQs found</h3>
            <p className="text-gray-500">
              {searchQuery ? "Try adjusting your search query" : "Get started by creating your first FAQ"}
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                      Order
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                      Question (EN)
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                      Languages
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedFaqs.map((faq) => (
                    <tr key={faq.id} className="transition-colors hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 font-semibold text-blue-700">
                          {faq.order}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="line-clamp-2 font-medium text-gray-900">{faq.questionEn}</p>
                          <p className="mt-1 line-clamp-1 text-sm text-gray-500">{faq.answerEn}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700">
                          {faq.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-1">
                          <span className="rounded-full border border-gray-200 px-2 py-1 text-xs text-gray-600">
                            EN
                          </span>
                          <span className="rounded-full border border-gray-200 px-2 py-1 text-xs text-gray-600">
                            AR
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => onEdit(faq)}
                            className="rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50"
                            title="Edit"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(faq.id)}
                            className={`rounded-lg p-2 transition-colors ${
                              deleteConfirm === faq.id
                                ? "bg-red-100 text-red-700"
                                : "text-red-600 hover:bg-red-50"
                            }`}
                            title={deleteConfirm === faq.id ? "Click again to confirm" : "Delete"}
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
                  Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredFaqs.length)} of{" "}
                  {filteredFaqs.length} results
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

"use client";

import { useState } from "react";
import { Calendar, Download, Eye, Mail, Search } from "lucide-react";

export type ContactLead = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  date: string;
  status: "new" | "read" | "replied";
};

type ContactLeadsListProps = {
  leads: ContactLead[];
};

export function ContactLeadsList({ leads }: ContactLeadsListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLead, setSelectedLead] = useState<ContactLead | null>(null);
  const itemsPerPage = 10;

  const filteredLeads = leads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filteredLeads.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedLeads = filteredLeads.slice(startIndex, startIndex + itemsPerPage);

  const getStatusColor = (status: ContactLead["status"]) => {
    switch (status) {
      case "new":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "read":
        return "bg-gray-50 text-gray-700 border-gray-200";
      case "replied":
        return "bg-green-50 text-green-700 border-green-200";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contact Leads</h1>
          <p className="mt-1 text-gray-600">View and manage customer inquiries</p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </button>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, or company..."
            value={searchQuery}
            onChange={(event) => {
              setSearchQuery(event.target.value);
              setCurrentPage(1);
            }}
            className="h-12 w-full rounded-lg border border-gray-300 pl-10 pr-4 text-sm text-gray-900 focus:border-[#0F4C81] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <p className="text-sm text-gray-600">Total Leads</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{leads.length}</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <p className="text-sm text-gray-600">New</p>
          <p className="mt-1 text-2xl font-bold text-blue-600">
            {leads.filter((lead) => lead.status === "new").length}
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <p className="text-sm text-gray-600">Read</p>
          <p className="mt-1 text-2xl font-bold text-gray-600">
            {leads.filter((lead) => lead.status === "read").length}
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <p className="text-sm text-gray-600">Replied</p>
          <p className="mt-1 text-2xl font-bold text-green-600">
            {leads.filter((lead) => lead.status === "replied").length}
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        {paginatedLeads.length === 0 ? (
          <div className="py-12 text-center">
            <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <Mail className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="mb-1 text-lg font-medium text-gray-900">No leads found</h3>
            <p className="text-gray-500">
              {searchQuery ? "Try adjusting your search query" : "No contact inquiries yet"}
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                      Contact Info
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                      Message Preview
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                      Status
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedLeads.map((lead) => (
                    <tr key={lead.id} className="transition-colors hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{lead.name}</p>
                          {lead.company ? <p className="text-sm text-gray-500">{lead.company}</p> : null}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Mail className="h-3 w-3" />
                            <a href={`mailto:${lead.email}`} className="hover:text-[#0F4C81]">
                              {lead.email}
                            </a>
                          </div>
                          {lead.phone ? <p className="text-sm text-gray-600">{lead.phone}</p> : null}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="line-clamp-2 max-w-xs text-sm text-gray-600">{lead.message}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          {new Date(lead.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full border px-3 py-1 text-xs font-semibold ${getStatusColor(lead.status)}`}
                        >
                          {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end">
                          <button
                            type="button"
                            onClick={() => setSelectedLead(lead)}
                            className="rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
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
                  Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredLeads.length)} of{" "}
                  {filteredLeads.length} results
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

      {selectedLead ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white">
            <div className="flex items-center justify-between border-b border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900">Contact Details</h2>
              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="rounded-lg p-2 transition-colors hover:bg-gray-100"
                aria-label="Close"
              >
                <span className="text-2xl text-gray-500">×</span>
              </button>
            </div>
            <div className="space-y-6 p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="mb-1 text-sm text-gray-500">Name</p>
                  <p className="font-medium text-gray-900">{selectedLead.name}</p>
                </div>
                <div>
                  <p className="mb-1 text-sm text-gray-500">Email</p>
                  <p className="font-medium text-gray-900">{selectedLead.email}</p>
                </div>
                {selectedLead.phone ? (
                  <div>
                    <p className="mb-1 text-sm text-gray-500">Phone</p>
                    <p className="font-medium text-gray-900">{selectedLead.phone}</p>
                  </div>
                ) : null}
                {selectedLead.company ? (
                  <div>
                    <p className="mb-1 text-sm text-gray-500">Company</p>
                    <p className="font-medium text-gray-900">{selectedLead.company}</p>
                  </div>
                ) : null}
                <div>
                  <p className="mb-1 text-sm text-gray-500">Date</p>
                  <p className="font-medium text-gray-900">
                    {new Date(selectedLead.date).toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <div>
                  <p className="mb-1 text-sm text-gray-500">Status</p>
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${getStatusColor(
                      selectedLead.status
                    )}`}
                  >
                    {selectedLead.status.charAt(0).toUpperCase() + selectedLead.status.slice(1)}
                  </span>
                </div>
              </div>
              <div>
                <p className="mb-2 text-sm text-gray-500">Message</p>
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <p className="whitespace-pre-wrap text-gray-900">{selectedLead.message}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`mailto:${selectedLead.email}`}
                  className="inline-flex flex-1 items-center justify-center rounded-lg bg-gradient-to-r from-[#0F4C81] to-[#2B7CB3] px-4 py-2 text-sm font-semibold text-white transition-all hover:from-[#083A61] hover:to-[#1E5F9E]"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Reply via Email
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedLead(null)}
                  className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

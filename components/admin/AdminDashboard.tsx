"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AdminLogin } from "./AdminLogin";
import { AdminLayout } from "./AdminLayout";
import {
  DashboardOverview,
  DashboardOverviewSkeleton,
  type RecentActivityItem,
} from "./DashboardOverview";
import { BlogsList, type Blog } from "./BlogsList";
import { BlogEditor } from "./BlogEditor";
import { FAQsList, type FAQ } from "./FAQsList";
import { FAQEditor } from "./FAQEditor";
import { ContactLeadsList, type ContactLead } from "./ContactLeadsList";
import { createBlogInApi, deleteBlogInApi, fetchBlogsFromApi, updateBlogInApi } from "./blogsApi";
import { fetchContactsFromApi } from "./contactsApi";
import { createFaqInApi, deleteFaqInApi, fetchFaqsFromApi, updateFaqInApi } from "./faqsApi";
import { getAdminErrorMessage, isAdminAuthError } from "./apiError";
import { AdminToast } from "./AdminToast";
import { toast } from "./toast";

type AdminPage = "dashboard" | "blogs" | "blogs-edit" | "faqs" | "faqs-edit" | "contacts";
type AdminTheme = "light" | "dark";

type AdminDashboardProps = {
  initialToken?: string;
};

const ADMIN_THEME_STORAGE_KEY = "4s-admin-theme";

export function AdminDashboard({ initialToken = "" }: AdminDashboardProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(initialToken));
  const [authToken, setAuthToken] = useState(initialToken);
  const [isDashboardLoading, setIsDashboardLoading] = useState(Boolean(initialToken));
  const [adminTheme, setAdminTheme] = useState<AdminTheme>("light");
  const [currentPage, setCurrentPage] = useState<AdminPage>("dashboard");
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [contacts, setContacts] = useState<ContactLead[]>([]);
  const [editingBlog, setEditingBlog] = useState<Blog | undefined>(undefined);
  const [editingFaq, setEditingFaq] = useState<FAQ | undefined>(undefined);

  const reloadBlogs = useCallback(async () => {
    const fetchedBlogs = await fetchBlogsFromApi();
    setBlogs(fetchedBlogs);
  }, []);

  const reloadFaqs = useCallback(async () => {
    const fetchedFaqs = await fetchFaqsFromApi();
    setFaqs(fetchedFaqs);
  }, []);

  const resetAdminSession = useCallback(
    (feedback?: { type: "success" | "error"; message: string }) => {
      void fetch("/api/admin/auth/logout", { method: "POST" }).catch(() => {
        // local logout still proceeds if cookie cleanup request fails
      });

      setAuthToken("");
      setIsLoggedIn(false);
      setIsDashboardLoading(false);
      setCurrentPage("dashboard");
      setEditingBlog(undefined);
      setEditingFaq(undefined);
      setBlogs([]);
      setFaqs([]);
      setContacts([]);

      if (feedback) {
        if (feedback.type === "success") {
          toast.success(feedback.message);
        } else {
          toast.error(feedback.message);
        }
      }
    },
    [],
  );

  const handleAuthFailure = useCallback(
    (error?: unknown) => {
      const rawMessage = getAdminErrorMessage(error, "");
      const shouldUseFallbackMessage =
        !rawMessage ||
        rawMessage === "Missing auth token." ||
        /^Request failed with status (401|403)$/.test(rawMessage);

      resetAdminSession({
        type: "error",
        message: shouldUseFallbackMessage ? "Your session expired. Please login again." : rawMessage,
      });
    },
    [resetAdminSession],
  );

  const handleLogin = (token: string) => {
    setIsDashboardLoading(true);
    setAuthToken(token);
    setIsLoggedIn(true);
    toast.success("Welcome back, Admin!");
  };

  const handleLogout = () => {
    resetAdminSession({
      type: "success",
      message: "Logged out successfully",
    });
  };

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(ADMIN_THEME_STORAGE_KEY);

    if (storedTheme === "light" || storedTheme === "dark") {
      setAdminTheme(storedTheme);
      return;
    }

    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setAdminTheme("dark");
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(ADMIN_THEME_STORAGE_KEY, adminTheme);
  }, [adminTheme]);

  useEffect(() => {
    if (!isLoggedIn || !authToken) {
      return;
    }

    let mounted = true;

    const loadInitialData = async () => {
      try {
        const [fetchedBlogs, fetchedFaqs, fetchedContacts] = await Promise.allSettled([
          fetchBlogsFromApi(),
          fetchFaqsFromApi(),
          fetchContactsFromApi(authToken),
        ]);

        if (mounted) {
          const failedRequests = [fetchedBlogs, fetchedFaqs, fetchedContacts].filter(
            (result): result is PromiseRejectedResult => result.status === "rejected",
          );
          const authFailure = failedRequests.find((result) => isAdminAuthError(result.reason));

          if (authFailure) {
            handleAuthFailure(authFailure.reason);
            return;
          }

          if (fetchedBlogs.status === "fulfilled") {
            setBlogs(fetchedBlogs.value);
          }

          if (fetchedFaqs.status === "fulfilled") {
            setFaqs(fetchedFaqs.value);
          }

          if (fetchedContacts.status === "fulfilled") {
            setContacts(fetchedContacts.value);
          }

          if (failedRequests.length > 0) {
            toast.error(
              getAdminErrorMessage(
                failedRequests[0].reason,
                "Could not load dashboard data from API.",
              ),
            );
          }
        }
      } catch (error) {
        if (mounted) {
          if (isAdminAuthError(error)) {
            handleAuthFailure(error);
            return;
          }

          toast.error(getAdminErrorMessage(error, "Could not load dashboard data from API."));
        }
      } finally {
        if (mounted) {
          setIsDashboardLoading(false);
        }
      }
    };

    void loadInitialData();

    return () => {
      mounted = false;
    };
  }, [isLoggedIn, authToken, handleAuthFailure]);

  const handlePageChange = (page: string) => {
    setCurrentPage(page as AdminPage);
    setEditingBlog(undefined);
    setEditingFaq(undefined);
  };

  const handleCreateBlog = () => {
    setEditingBlog(undefined);
    setCurrentPage("blogs-edit");
  };

  const handleEditBlog = (blog: Blog) => {
    setEditingBlog(blog);
    setCurrentPage("blogs-edit");
  };

  const handleSaveBlog = async (blogData: Partial<Blog>) => {
    if (!authToken) {
      handleAuthFailure();
      return;
    }

    try {
      if (editingBlog) {
        await updateBlogInApi(authToken, editingBlog.id, blogData);
        await reloadBlogs();
        toast.success("Blog updated successfully!");
      } else {
        await createBlogInApi(authToken, blogData);
        await reloadBlogs();
        toast.success("Blog created successfully!");
      }

      setCurrentPage("blogs");
      setEditingBlog(undefined);
    } catch (error) {
      if (isAdminAuthError(error)) {
        handleAuthFailure(error);
        return;
      }

      toast.error(getAdminErrorMessage(error, "Failed to save blog."));
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (!authToken) {
      handleAuthFailure();
      return;
    }

    try {
      await deleteBlogInApi(authToken, id);
      await reloadBlogs();
      toast.success("Blog deleted successfully");
    } catch (error) {
      if (isAdminAuthError(error)) {
        handleAuthFailure(error);
        return;
      }

      toast.error(getAdminErrorMessage(error, "Failed to delete blog."));
    }
  };

  const handleCreateFaq = () => {
    setEditingFaq(undefined);
    setCurrentPage("faqs-edit");
  };

  const handleEditFaq = (faq: FAQ) => {
    setEditingFaq(faq);
    setCurrentPage("faqs-edit");
  };

  const handleSaveFaq = async (faqData: Partial<FAQ>) => {
    if (!authToken) {
      handleAuthFailure();
      return;
    }

    try {
      if (editingFaq) {
        await updateFaqInApi(authToken, editingFaq.id, faqData);
        await reloadFaqs();
        toast.success("FAQ updated successfully!");
      } else {
        await createFaqInApi(authToken, faqData);
        await reloadFaqs();
        toast.success("FAQ created successfully!");
      }

      setCurrentPage("faqs");
      setEditingFaq(undefined);
    } catch (error) {
      if (isAdminAuthError(error)) {
        handleAuthFailure(error);
        return;
      }

      toast.error(getAdminErrorMessage(error, "Failed to save FAQ."));
    }
  };

  const handleDeleteFaq = async (id: string) => {
    if (!authToken) {
      handleAuthFailure();
      return;
    }

    try {
      await deleteFaqInApi(authToken, id);
      await reloadFaqs();
      toast.success("FAQ deleted successfully");
    } catch (error) {
      if (isAdminAuthError(error)) {
        handleAuthFailure(error);
        return;
      }

      toast.error(getAdminErrorMessage(error, "Failed to delete FAQ."));
    }
  };

  const recentActivity = useMemo<RecentActivityItem[]>(() => {
    const blogActivity = blogs.map((blog) => ({
      id: `blog-${blog.id}`,
      type: "blog" as const,
      action: blog.status === "published" ? "Published blog" : "Saved blog as draft",
      title: blog.titleEn || blog.titleAr || blog.slug || "Untitled blog",
      occurredAt: blog.publishDate,
    }));

    const contactActivity = contacts.map((lead) => ({
      id: `contact-${lead.id}`,
      type: "contact" as const,
      action: "New contact lead",
      title: lead.subject ? `${lead.name} - ${lead.subject}` : lead.name,
      occurredAt: lead.date,
    }));

    const parseTime = (value: string) => {
      const time = new Date(value).getTime();
      return Number.isNaN(time) ? 0 : time;
    };

    return [...blogActivity, ...contactActivity]
      .sort((a, b) => parseTime(b.occurredAt) - parseTime(a.occurredAt))
      .slice(0, 8);
  }, [blogs, contacts]);

  const renderContent = () => {
    switch (currentPage) {
      case "dashboard":
        return isDashboardLoading ? (
          <DashboardOverviewSkeleton />
        ) : (
          <DashboardOverview
            blogsCount={blogs.length}
            faqsCount={faqs.length}
            contactsCount={contacts.length}
            recentActivity={recentActivity}
            onQuickAction={handlePageChange}
          />
        );
      case "blogs":
        return (
          <BlogsList
            blogs={blogs}
            onEdit={handleEditBlog}
            onDelete={handleDeleteBlog}
            onCreateNew={handleCreateBlog}
          />
        );
      case "blogs-edit":
        return (
          <BlogEditor
            key={editingBlog?.id ?? "new"}
            blog={editingBlog}
            onSave={handleSaveBlog}
            onCancel={() => setCurrentPage("blogs")}
          />
        );
      case "faqs":
        return (
          <FAQsList
            faqs={faqs}
            onEdit={handleEditFaq}
            onDelete={handleDeleteFaq}
            onCreateNew={handleCreateFaq}
          />
        );
      case "faqs-edit":
        return <FAQEditor faq={editingFaq} onSave={handleSaveFaq} onCancel={() => setCurrentPage("faqs")} />;
      case "contacts":
        return <ContactLeadsList leads={contacts} />;
      default:
        return isDashboardLoading ? (
          <DashboardOverviewSkeleton />
        ) : (
          <DashboardOverview
            blogsCount={blogs.length}
            faqsCount={faqs.length}
            contactsCount={contacts.length}
            recentActivity={recentActivity}
            onQuickAction={handlePageChange}
          />
        );
    }
  };

  return (
    <div data-admin-theme={adminTheme} className="min-h-screen">
      {isLoggedIn ? (
        <AdminLayout
          activePage={
            currentPage.startsWith("blogs")
              ? "blogs"
              : currentPage.startsWith("faqs")
                ? "faqs"
                : currentPage
          }
          theme={adminTheme}
          onThemeToggle={() =>
            setAdminTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"))
          }
          onPageChange={handlePageChange}
          onLogout={handleLogout}
        >
          {renderContent()}
        </AdminLayout>
      ) : (
        <AdminLogin onLogin={handleLogin} />
      )}
      <AdminToast />
    </div>
  );
}

"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AdminLogin } from "./AdminLogin";
import { AdminLayout } from "./AdminLayout";
import { DashboardOverview, type RecentActivityItem } from "./DashboardOverview";
import { BlogsList, type Blog } from "./BlogsList";
import { BlogEditor } from "./BlogEditor";
import { FAQsList, type FAQ } from "./FAQsList";
import { FAQEditor } from "./FAQEditor";
import { ContactLeadsList, type ContactLead } from "./ContactLeadsList";
import { createBlogInApi, deleteBlogInApi, fetchBlogsFromApi, updateBlogInApi } from "./blogsApi";
import { fetchContactsFromApi } from "./contactsApi";
import { createFaqInApi, deleteFaqInApi, fetchFaqsFromApi, updateFaqInApi } from "./faqsApi";
import { AdminToast } from "./AdminToast";
import { toast } from "./toast";

type AdminPage = "dashboard" | "blogs" | "blogs-edit" | "faqs" | "faqs-edit" | "contacts";

type AdminDashboardProps = {
  initialToken?: string;
};

export function AdminDashboard({ initialToken = "" }: AdminDashboardProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(initialToken));
  const [authToken, setAuthToken] = useState(initialToken);
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

  const handleLogin = (token: string) => {
    setAuthToken(token);
    setIsLoggedIn(true);
    toast.success("Welcome back, Admin!");
  };

  const handleLogout = () => {
    void fetch("/api/admin/auth/logout", { method: "POST" }).catch(() => {
      // local logout still proceeds if cookie cleanup request fails
    });

    setAuthToken("");
    setIsLoggedIn(false);
    setCurrentPage("dashboard");
    toast.success("Logged out successfully");
  };

  useEffect(() => {
    if (!isLoggedIn || !authToken) {
      return;
    }

    let mounted = true;

    const loadInitialData = async () => {
      try {
        const [fetchedBlogs, fetchedFaqs, fetchedContacts] = await Promise.all([
          fetchBlogsFromApi(),
          fetchFaqsFromApi(),
          fetchContactsFromApi(authToken),
        ]);

        if (mounted) {
          setBlogs(fetchedBlogs);
          setFaqs(fetchedFaqs);
          setContacts(fetchedContacts);
        }
      } catch {
        if (mounted) {
          toast.error("Could not load dashboard data from API.");
        }
      }
    };

    void loadInitialData();

    return () => {
      mounted = false;
    };
  }, [isLoggedIn, authToken, reloadBlogs, reloadFaqs]);

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
      toast.error("Please login again.");
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
      toast.error(error instanceof Error ? error.message : "Failed to save blog.");
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (!authToken) {
      toast.error("Please login again.");
      return;
    }

    try {
      await deleteBlogInApi(authToken, id);
      await reloadBlogs();
      toast.success("Blog deleted successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete blog.");
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
      toast.error("Please login again.");
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
      toast.error(error instanceof Error ? error.message : "Failed to save FAQ.");
    }
  };

  const handleDeleteFaq = async (id: string) => {
    if (!authToken) {
      toast.error("Please login again.");
      return;
    }

    try {
      await deleteFaqInApi(authToken, id);
      await reloadFaqs();
      toast.success("FAQ deleted successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete FAQ.");
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

  if (!isLoggedIn) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (currentPage) {
      case "dashboard":
        return (
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
        return (
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
    <>
      <AdminLayout
        activePage={
          currentPage.startsWith("blogs")
            ? "blogs"
            : currentPage.startsWith("faqs")
              ? "faqs"
              : currentPage
        }
        onPageChange={handlePageChange}
        onLogout={handleLogout}
      >
        {renderContent()}
      </AdminLayout>
      <AdminToast />
    </>
  );
}

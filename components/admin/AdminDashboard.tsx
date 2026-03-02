"use client";

import { useCallback, useEffect, useState } from "react";
import { AdminLogin } from "./AdminLogin";
import { AdminLayout } from "./AdminLayout";
import { DashboardOverview } from "./DashboardOverview";
import { BlogsList, type Blog } from "./BlogsList";
import { BlogEditor } from "./BlogEditor";
import { FAQsList, type FAQ } from "./FAQsList";
import { FAQEditor } from "./FAQEditor";
import { ContactLeadsList, type ContactLead } from "./ContactLeadsList";
import { createBlogInApi, deleteBlogInApi, fetchBlogsFromApi, updateBlogInApi } from "./blogsApi";
import { createFaqInApi, deleteFaqInApi, fetchFaqsFromApi, updateFaqInApi } from "./faqsApi";
import { AdminToast } from "./AdminToast";
import { toast } from "./toast";

type AdminPage = "dashboard" | "blogs" | "blogs-edit" | "faqs" | "faqs-edit" | "contacts";

const mockContacts: ContactLead[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@abccorp.com",
    phone: "+1 (555) 123-4567",
    subject: "ERP Pricing Inquiry",
    message:
      "We are interested in implementing an ERP solution for our manufacturing business. Could you provide more information about your services and pricing?",
    date: "2025-02-09T14:30:00Z",
  },
  {
    id: "2",
    name: "Emma Wilson",
    email: "emma.wilson@techstart.com",
    phone: "+1 (555) 987-6543",
    subject: "Cloud ERP Modules",
    message: "Looking for a cloud-based ERP solution for our growing startup. What modules do you offer?",
    date: "2025-02-08T10:15:00Z",
  },
  {
    id: "3",
    name: "Ahmed Hassan",
    email: "ahmed.hassan@globaltech.ae",
    phone: "+971 50 123 4567",
    subject: "Implementation Support",
    message:
      "We need ERP implementation support for our Dubai office. Do you provide training and ongoing support?",
    date: "2025-02-07T16:45:00Z",
  },
];

export function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState("");
  const [currentPage, setCurrentPage] = useState<AdminPage>("dashboard");
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [contacts] = useState<ContactLead[]>(mockContacts);
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
        const [fetchedBlogs, fetchedFaqs] = await Promise.all([fetchBlogsFromApi(), fetchFaqsFromApi()]);

        if (mounted) {
          setBlogs(fetchedBlogs);
          setFaqs(fetchedFaqs);
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

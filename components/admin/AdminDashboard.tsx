"use client";

import { useState } from "react";
import { AdminLogin } from "./AdminLogin";
import { AdminLayout } from "./AdminLayout";
import { DashboardOverview } from "./DashboardOverview";
import { BlogsList, type Blog } from "./BlogsList";
import { BlogEditor } from "./BlogEditor";
import { FAQsList, type FAQ } from "./FAQsList";
import { FAQEditor } from "./FAQEditor";
import { ContactLeadsList, type ContactLead } from "./ContactLeadsList";
import { toast } from "./toast";

type AdminPage = "dashboard" | "blogs" | "blogs-edit" | "faqs" | "faqs-edit" | "contacts";

const mockBlogs: Blog[] = [
  {
    id: "1",
    title: "Digital Transformation: The Future of ERP Systems",
    slug: "digital-transformation-future-erp",
    excerpt:
      "Explore how digital transformation is reshaping ERP systems and business processes in 2025.",
    content: "<h2>Introduction</h2><p>Digital transformation is revolutionizing how businesses operate...</p>",
    category: "Digital Transformation",
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    status: "published",
    publishDate: "2025-02-08T10:00:00Z",
    metaTitle: "Digital Transformation: The Future of ERP Systems | 4S Systems",
    metaDescription: "Discover how digital transformation is changing the ERP landscape in 2025.",
    author: "Sarah Johnson",
    readTime: "8 min read",
  },
  {
    id: "2",
    title: "Cloud ERP vs On-Premise: Which is Right for Your Business?",
    slug: "cloud-erp-vs-on-premise",
    excerpt:
      "A comprehensive comparison of cloud and on-premise ERP solutions to help you make the right choice.",
    content: "<h2>Understanding the Difference</h2><p>Choosing between cloud and on-premise ERP...</p>",
    category: "Cloud Computing",
    coverImage: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80",
    status: "published",
    publishDate: "2025-02-05T14:30:00Z",
    metaTitle: "Cloud ERP vs On-Premise: Complete Comparison Guide",
    metaDescription: "Compare cloud and on-premise ERP solutions to find the best fit for your business.",
    author: "Michael Chen",
    readTime: "10 min read",
  },
  {
    id: "3",
    title: "Top 10 ERP Implementation Best Practices",
    slug: "erp-implementation-best-practices",
    excerpt: "Learn the essential best practices for successful ERP implementation in your organization.",
    content: "<h2>Best Practices Overview</h2><p>Implementing an ERP system is a major undertaking...</p>",
    category: "ERP",
    coverImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    status: "draft",
    publishDate: "2025-02-10T09:00:00Z",
    metaTitle: "Top 10 ERP Implementation Best Practices | Expert Guide",
    metaDescription: "Follow these proven best practices for successful ERP implementation.",
    author: "Admin",
    readTime: "12 min read",
  },
];

const mockFaqs: FAQ[] = [
  {
    id: "1",
    questionEn: "What is ERP and why does my business need it?",
    answerEn:
      "ERP (Enterprise Resource Planning) is an integrated software system that manages core business processes like finance, HR, inventory, and operations. It helps businesses streamline operations, improve efficiency, and make data-driven decisions.",
    questionAr: "ما هو نظام تخطيط موارد المؤسسة (ERP) ولماذا تحتاجه شركتي؟",
    answerAr:
      "نظام تخطيط موارد المؤسسة (ERP) هو نظام برمجي متكامل يدير عمليات الأعمال الأساسية مثل المالية والموارد البشرية والمخزون والعمليات. يساعد الشركات على تبسيط العمليات وتحسين الكفاءة واتخاذ القرارات المستندة إلى البيانات.",
    category: "General",
    order: 1,
  },
  {
    id: "2",
    questionEn: "How long does ERP implementation typically take?",
    answerEn:
      "Implementation time varies based on company size and complexity. Small to medium businesses typically take 3-6 months, while larger enterprises may require 6-12 months or more for full deployment.",
    questionAr: "ما هي المدة التي يستغرقها تطبيق نظام ERP عادةً؟",
    answerAr:
      "يختلف وقت التنفيذ بناءً على حجم الشركة وتعقيدها. تستغرق الشركات الصغيرة والمتوسطة عادةً 3-6 أشهر، بينما قد تتطلب المؤسسات الكبيرة 6-12 شهرًا أو أكثر للنشر الكامل.",
    category: "Implementation",
    order: 2,
  },
  {
    id: "3",
    questionEn: "Is cloud ERP more secure than on-premise solutions?",
    answerEn:
      "Modern cloud ERP solutions offer enterprise-grade security with encryption, regular updates, and compliance certifications. They often provide better security than on-premise systems through dedicated security teams and infrastructure.",
    questionAr: "هل نظام ERP السحابي أكثر أمانًا من الحلول المحلية؟",
    answerAr:
      "توفر حلول ERP السحابية الحديثة أمانًا على مستوى المؤسسات مع التشفير والتحديثات المنتظمة وشهادات الامتثال. غالبًا ما توفر أمانًا أفضل من الأنظمة المحلية من خلال فرق البنية التحتية الأمنية المخصصة.",
    category: "Security",
    order: 3,
  },
];

const mockContacts: ContactLead[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@abccorp.com",
    phone: "+1 (555) 123-4567",
    company: "ABC Corporation",
    message:
      "We are interested in implementing an ERP solution for our manufacturing business. Could you provide more information about your services and pricing?",
    date: "2025-02-09T14:30:00Z",
    status: "new",
  },
  {
    id: "2",
    name: "Emma Wilson",
    email: "emma.wilson@techstart.com",
    phone: "+1 (555) 987-6543",
    company: "TechStart Inc",
    message: "Looking for a cloud-based ERP solution for our growing startup. What modules do you offer?",
    date: "2025-02-08T10:15:00Z",
    status: "read",
  },
  {
    id: "3",
    name: "Ahmed Hassan",
    email: "ahmed.hassan@globaltech.ae",
    phone: "+971 50 123 4567",
    company: "Global Tech Solutions",
    message:
      "We need ERP implementation support for our Dubai office. Do you provide training and ongoing support?",
    date: "2025-02-07T16:45:00Z",
    status: "replied",
  },
];

export function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<AdminPage>("dashboard");
  const [blogs, setBlogs] = useState<Blog[]>(mockBlogs);
  const [faqs, setFaqs] = useState<FAQ[]>(mockFaqs);
  const [contacts] = useState<ContactLead[]>(mockContacts);
  const [editingBlog, setEditingBlog] = useState<Blog | undefined>(undefined);
  const [editingFaq, setEditingFaq] = useState<FAQ | undefined>(undefined);

  const handleLogin = () => {
    setIsLoggedIn(true);
    toast.success("Welcome back, Admin!");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage("dashboard");
    toast.success("Logged out successfully");
  };

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

  const handleSaveBlog = (blogData: Partial<Blog>) => {
    if (editingBlog) {
      setBlogs((prev) => prev.map((b) => (b.id === editingBlog.id ? { ...b, ...blogData } : b)));
      toast.success("Blog updated successfully!");
    } else {
      const newBlog: Blog = {
        id: Date.now().toString(),
        title: blogData.title || "",
        slug: blogData.slug || "",
        excerpt: blogData.excerpt || "",
        content: blogData.content || "",
        category: blogData.category || "ERP",
        coverImage: blogData.coverImage || "",
        status: blogData.status || "draft",
        publishDate: blogData.publishDate || new Date().toISOString(),
        metaTitle: blogData.metaTitle || "",
        metaDescription: blogData.metaDescription || "",
        author: blogData.author || "Admin",
        readTime: blogData.readTime || "5 min read",
      };
      setBlogs((prev) => [newBlog, ...prev]);
      toast.success("Blog created successfully!");
    }
    setCurrentPage("blogs");
    setEditingBlog(undefined);
  };

  const handleDeleteBlog = (id: string) => {
    setBlogs((prev) => prev.filter((b) => b.id !== id));
    toast.success("Blog deleted successfully");
  };

  const handleCreateFaq = () => {
    setEditingFaq(undefined);
    setCurrentPage("faqs-edit");
  };

  const handleEditFaq = (faq: FAQ) => {
    setEditingFaq(faq);
    setCurrentPage("faqs-edit");
  };

  const handleSaveFaq = (faqData: Partial<FAQ>) => {
    if (editingFaq) {
      setFaqs((prev) => prev.map((f) => (f.id === editingFaq.id ? { ...f, ...faqData } : f)));
      toast.success("FAQ updated successfully!");
    } else {
      const newFaq: FAQ = {
        id: Date.now().toString(),
        questionEn: faqData.questionEn || "",
        answerEn: faqData.answerEn || "",
        questionAr: faqData.questionAr || "",
        answerAr: faqData.answerAr || "",
        category: faqData.category || "General",
        order: faqData.order || 1,
      };
      setFaqs((prev) => [...prev, newFaq]);
      toast.success("FAQ created successfully!");
    }
    setCurrentPage("faqs");
    setEditingFaq(undefined);
  };

  const handleDeleteFaq = (id: string) => {
    setFaqs((prev) => prev.filter((f) => f.id !== id));
    toast.success("FAQ deleted successfully");
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
        return <BlogEditor blog={editingBlog} onSave={handleSaveBlog} onCancel={() => setCurrentPage("blogs")} />;
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
          />
        );
    }
  };

  return (
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
  );
}

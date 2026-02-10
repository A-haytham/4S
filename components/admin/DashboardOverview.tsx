import { Eye, FileText, HelpCircle, Mail } from "lucide-react";

type DashboardOverviewProps = {
  blogsCount: number;
  faqsCount: number;
  contactsCount: number;
};

export function DashboardOverview({ blogsCount, faqsCount, contactsCount }: DashboardOverviewProps) {
  const stats = [
    {
      id: "blogs",
      name: "Total Blogs",
      value: blogsCount,
      icon: FileText,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      change: "+12%",
      changeType: "increase" as const,
    },
    {
      id: "faqs",
      name: "Total FAQs",
      value: faqsCount,
      icon: HelpCircle,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      change: "+8%",
      changeType: "increase" as const,
    },
    {
      id: "contacts",
      name: "Contact Leads",
      value: contactsCount,
      icon: Mail,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
      change: "+23%",
      changeType: "increase" as const,
    },
    {
      id: "views",
      name: "Total Views",
      value: "12.5K",
      icon: Eye,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      change: "+18%",
      changeType: "increase" as const,
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "blog",
      action: "Published new blog",
      title: "Digital Transformation in 2025",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "contact",
      action: "New contact lead",
      title: "John Smith from ABC Corp",
      time: "5 hours ago",
    },
    {
      id: 3,
      type: "faq",
      action: "Updated FAQ",
      title: "What is ERP?",
      time: "1 day ago",
    },
    {
      id: 4,
      type: "blog",
      action: "Draft created",
      title: "Cloud Migration Best Practices",
      time: "2 days ago",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-linear-to-r from-[#0F4C81] to-[#2B7CB3] p-8 text-white">
        <h1 className="mb-2 text-3xl font-bold">Welcome back, Admin!</h1>
        <p className="text-blue-100">Here's what's happening with your content today.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              className="rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className={`${stat.bgColor} rounded-lg p-3`}>
                  <Icon className={`h-6 w-6 ${stat.textColor}`} />
                </div>
                <span
                  className={`text-sm font-medium ${
                    stat.changeType === "increase" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
              <h3 className="mb-1 text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-sm text-gray-600">{stat.name}</p>
            </div>
          );
        })}
      </div>

      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="p-6 transition-colors hover:bg-gray-50">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="mt-1 text-sm text-gray-600">{activity.title}</p>
                </div>
                <span className="whitespace-nowrap text-xs text-gray-500">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-6 transition-colors hover:border-[#0F4C81]">
          <FileText className="mb-3 h-8 w-8 text-[#0F4C81] transition-transform group-hover:scale-110" />
          <h3 className="mb-1 font-bold text-gray-900">Create New Blog</h3>
          <p className="text-sm text-gray-600">Start writing a new blog post</p>
        </div>
        <div className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-6 transition-colors hover:border-[#0F4C81]">
          <HelpCircle className="mb-3 h-8 w-8 text-[#0F4C81] transition-transform group-hover:scale-110" />
          <h3 className="mb-1 font-bold text-gray-900">Add New FAQ</h3>
          <p className="text-sm text-gray-600">Help your customers with new answers</p>
        </div>
        <div className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-6 transition-colors hover:border-[#0F4C81]">
          <Mail className="mb-3 h-8 w-8 text-[#0F4C81] transition-transform group-hover:scale-110" />
          <h3 className="mb-1 font-bold text-gray-900">View Contact Leads</h3>
          <p className="text-sm text-gray-600">Check new inquiries from customers</p>
        </div>
      </div>
    </div>
  );
}

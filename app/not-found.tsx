import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Boxes,
  Briefcase,
  FileQuestion,
  FileText,
  Headphones,
  Home,
  Mail,
} from "lucide-react";
import styles from "./not-found.module.css";
import { siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Page not found | 4S Systems",
  description: "The requested page could not be found.",
  robots: {
    index: false,
    follow: true,
  },
};

type QuickLink = {
  title: string;
  description: string;
  path: string;
  iconKey: string;
};

const quickLinks: QuickLink[] = [
  {
    title: "Solutions",
    description: "Explore our ERP modules and integrations.",
    path: "/solutions",
    iconKey: "solutions",
  },
  {
    title: "Blog",
    description: "Read implementation guides and industry updates.",
    path: "/blog",
    iconKey: "blog",
  },
  {
    title: "Services",
    description: "See implementation, support, and consulting services.",
    path: "/our-services",
    iconKey: "services",
  },
  {
    title: "Contact",
    description: "Talk to our team about your project requirements.",
    path: "/contact-us",
    iconKey: "contact",
  },
  {
    title: "FAQs",
    description: "Find answers to the most common questions.",
    path: "/faqs",
    iconKey: "faqs",
  },
  {
    title: "Our Product",
    description: "Discover the product experience and capabilities.",
    path: "/our-product",
    iconKey: "our-product",
  },
];

const quickLinkIcons = {
  solutions: Boxes,
  blog: FileText,
  services: Briefcase,
  contact: Mail,
  faqs: FileQuestion,
  "our-product": Boxes,
};

export default function NotFoundPage() {
  return (
    <div className={styles.wrapper} dir="ltr">
      <div className={styles.container}>
        <div className={styles.center}>
          <div className={styles.codeWrapper}>
            <h1 className={styles.code}>404</h1>
          </div>

          <h2 className={styles.title}>Page not found</h2>
          <p className={styles.subtitle}>
            The page you requested does not exist or was moved.
          </p>

          <div className={styles.actions}>
            <Link href="/" className={`${styles.actionButton} ${styles.primaryButton}`}>
              <Home className={styles.actionIcon} />
              Back to Home
            </Link>

            <Link
              href="/contact-us"
              className={`${styles.actionButton} ${styles.secondaryButton}`}
            >
              <Headphones className={styles.actionIcon} />
              Contact Support
            </Link>

            <Link href="/" className={`${styles.actionButton} ${styles.ghostButton}`}>
              <ArrowLeft className={`${styles.actionIcon} ${styles.backIcon}`} />
              Go Back
            </Link>
          </div>
        </div>

        <div className={styles.quickLinks}>
          <div className={styles.quickLinksHeader}>
            <h3 className={styles.quickLinksTitle}>Quick links</h3>
            <p className={styles.quickLinksSubtitle}>
              Continue browsing from one of these pages.
            </p>
          </div>

          <div className={styles.quickLinksGrid}>
            {quickLinks.map((link) => {
              const Icon =
                quickLinkIcons[link.iconKey as keyof typeof quickLinkIcons] ||
                FileQuestion;

              return (
                <Link key={link.path} href={link.path} className={styles.quickLinkCard}>
                  <div className={styles.quickLinkIcon}>
                    <Icon className={styles.quickLinkIconSvg} />
                  </div>
                  <h4 className={styles.quickLinkTitle}>{link.title}</h4>
                  <p className={styles.quickLinkDescription}>{link.description}</p>
                </Link>
              );
            })}
          </div>
        </div>

        <p className={styles.helpText}>
          If the issue continues, contact our support team.
        </p>
      </div>
    </div>
  );
}

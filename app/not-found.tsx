import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import {
  ArrowLeft,
  Boxes,
  Briefcase,
  FileQuestion,
  FileText,
  Headphones,
  Home,
  Mail,
  Search,
} from "lucide-react";
import styles from "./not-found.module.css";

type QuickLink = {
  title: string;
  description?: string;
  page: string;
};

const NotFoundPage = async () => {
  const locale = await getLocale();
  const t = await getTranslations("notFound");
  const isAr = locale === "ar";
  const localePrefix = locale === "en" ? "" : `/${locale}`;

  const toLocalePath = (path: string) =>
    `${localePrefix}${path === "/" ? "" : path}`;

  const resolvePagePath = (page: string) => {
    if (page.startsWith("/")) return page;
    const map: Record<string, string> = {
      home: "/",
      solutions: "/our-product",
      "case-studies": "/case-studies",
      services: "/services",
      contact: "/contact-us",
      about: "/about",
    };
    return map[page] ?? "/";
  };

  const quickLinks = t.raw("quickLinks.links") as QuickLink[];
  const quickLinkIcons = {
    solutions: Boxes,
    "case-studies": FileText,
    services: Briefcase,
    contact: Mail,
    "contact-us": Mail,
    "our-product": Boxes,
  };

  return (
    <div className={styles.wrapper} dir={isAr ? "rtl" : "ltr"}>
      <div className={styles.container}>
        <div className={styles.center}>
          <div className={styles.codeWrapper}>
            <h1 className={styles.code}>{t("number")}</h1>
          </div>

          <h2 className={styles.title}>{t("title")}</h2>
          <p className={styles.subtitle}>{t("subtitle")}</p>

          <div className={styles.actions}>
            <Link
              href={toLocalePath("/")}
              className={`${styles.actionButton} ${styles.primaryButton}`}
            >
              <Home className={styles.actionIcon} />
              {t("actions.primary")}
            </Link>

            <Link
              href={toLocalePath("/contact-us")}
              className={`${styles.actionButton} ${styles.secondaryButton}`}
            >
              <Headphones className={styles.actionIcon} />
              {t("actions.secondary")}
            </Link>

            <Link
              href={toLocalePath("/")}
              className={`${styles.actionButton} ${styles.ghostButton}`}
            >
              <ArrowLeft className={`${styles.actionIcon} ${styles.backIcon}`} />
              {t("actions.goBack")}
            </Link>
          </div>
        </div>

        <div className={styles.quickLinks}>
          <div className={styles.quickLinksHeader}>
            <h3 className={styles.quickLinksTitle}>{t("quickLinks.title")}</h3>
            <p className={styles.quickLinksSubtitle}>
              {t("quickLinks.subtitle")}
            </p>
          </div>

          <div className={styles.quickLinksGrid}>
            {quickLinks.map((link, index) => {
              const iconKey = link.page.startsWith("/")
                ? link.page.slice(1)
                : link.page;
              const Icon =
                quickLinkIcons[iconKey as keyof typeof quickLinkIcons] ||
                FileQuestion;
              const path = resolvePagePath(link.page);

              return (
                <Link
                  key={index}
                  href={toLocalePath(path)}
                  className={styles.quickLinkCard}
                >
                  <div className={styles.quickLinkIcon}>
                    <Icon className={styles.quickLinkIconSvg} />
                  </div>
                  <h4 className={styles.quickLinkTitle}>{link.title}</h4>
                  {link.description && (
                    <p className={styles.quickLinkDescription}>
                      {link.description}
                    </p>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        <p className={styles.helpText}>{t("helpText")}</p>
      </div>
    </div>
  );
};

export default NotFoundPage;

import { getTranslations } from "next-intl/server";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import ContactClient from "./ContactClient";

type ContactCopy = {
  hero: {
    title: string;
    description: string;
  };
  form: {
    title: string;
    success: string;
    name: string;
    company: string;
    email: string;
    phone: string;
    message: string;
    submit: string;
    sending: string;
    submitError: string;
    placeholders: {
      name: string;
      company: string;
      email: string;
      phone: string;
      message: string;
    };
    errors: {
      name: string;
      company: string;
      email: string;
      emailInvalid: string;
      phone: string;
      message: string;
    };
  };
  sales: {
    title: string;
    description: string;
    email: string;
    phone: string;
  };
  support: {
    title: string;
    description: string;
    email: string;
    phone: string;
  };
  location: {
    title: string;
    address: string;
  };
  map: {
    label: string;
  };
};

export default async function ContactPage() {
  const t = await getTranslations("contact");

  const copy: ContactCopy = {
    hero: {
      title: t("hero.title"),
      description: t("hero.description"),
    },
    form: {
      title: t("form.title"),
      success: t("form.success"),
      name: t("form.name"),
      company: t("form.company"),
      email: t("form.email"),
      phone: t("form.phone"),
      message: t("form.message"),
      submit: t("form.submit"),
      sending: t("form.sending"),
      submitError: t("form.submitError"),
      placeholders: {
        name: t("form.placeholders.name"),
        company: t("form.placeholders.company"),
        email: t("form.placeholders.email"),
        phone: t("form.placeholders.phone"),
        message: t("form.placeholders.message"),
      },
      errors: {
        name: t("form.errors.name"),
        company: t("form.errors.company"),
        email: t("form.errors.email"),
        emailInvalid: t("form.errors.emailInvalid"),
        phone: t("form.errors.phone"),
        message: t("form.errors.message"),
      },
    },
    sales: {
      title: t("sales.title"),
      description: t("sales.description"),
      email: t("sales.email"),
      phone: t("sales.phone"),
    },
    support: {
      title: t("support.title"),
      description: t("support.description"),
      email: t("support.email"),
      phone: t("support.phone"),
    },
    location: {
      title: t("location.title"),
      address: t("location.address"),
    },
    map: {
      label: t("map.label"),
    },
  };

  return (
    <>
      <Reveal>
        <PageHero title={copy.hero.title} description={copy.hero.description} />
      </Reveal>
      <ContactClient copy={copy} />
    </>
  );
}

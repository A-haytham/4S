"use client";

export type ModuleDocument = {
  href: string;
  label: string;
};

export const moduleDocumentsByKey: Record<string, ModuleDocument[]> = {
  finance: [
    {
      href: "/modules-pdf/%D8%A7%D9%84%D8%AD%D8%B3%D8%A7%D8%A8%D8%A7%D8%AA%20%D8%A7%D9%84%D8%B9%D8%A7%D9%85%D8%A9.pptx",
      label: "الحسابات العامة",
    },
  ],
  inventory: [
    {
      href: "/modules-pdf/%D8%A7%D9%84%D9%85%D8%AE%D8%A7%D8%B2%D9%86%20(3).pptx",
      label: "المخازن",
    },
  ],
  sales: [
    {
      href: "/modules-pdf/%D8%A7%D9%84%D9%85%D8%A8%D9%8A%D8%B9%D8%A7%D8%AA.pptx",
      label: "المبيعات",
    },
  ],
  procurement: [
    {
      href: "/modules-pdf/%D8%A7%D9%84%D9%85%D8%B4%D8%AA%D8%B1%D9%8A%D8%A7%D8%AA.pptx",
      label: "المشتريات",
    },
  ],
  hr: [
    {
      href: "/modules-pdf/%D9%86%D8%B8%D8%A7%D9%85%20%D8%B4%D8%A6%D9%88%D9%86%20%D8%A7%D9%84%D9%85%D9%88%D8%B8%D9%81%D9%8A%D9%86.pptx",
      label: "نظام شئون الموظفين",
    },
  ],
  manufacturing: [
    {
      href: "/modules-pdf/%D8%A7%D9%84%D8%A7%D9%86%D8%AA%D8%A7%D8%AC.pptx",
      label: "الانتاج",
    },
  ],
  banks: [
    {
      href: "/modules-pdf/%D9%86%D8%B8%D8%A7%D9%85%20%D8%A7%D9%84%D8%A8%D9%86%D9%88%D9%83%20%D9%88%D8%A7%D9%84%D8%AE%D8%B2%D9%86.pptx",
      label: "نظام البنوك والخزن",
    },
  ],
  realEstate: [
    {
      href: "/modules-pdf/%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D8%AB%D9%85%D8%A7%D8%B1%20%D8%A7%D9%84%D8%B9%D9%82%D8%A7%D8%B1%D9%89.pdf",
      label: "الاستثمار العقارى PDF",
    },
    {
      href: "/modules-pdf/%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D8%AB%D9%85%D8%A7%D8%B1%20%D8%A7%D9%84%D8%B9%D9%82%D8%A7%D8%B1%D9%89.pptx",
      label: "الاستثمار العقارى PPTX",
    },
  ],
  agriculture: [
    {
      href: "/modules-pdf/%D8%A7%D9%84%D8%B2%D8%B1%D8%A7%D8%B9%D8%A9.pptx",
      label: "الزراعة",
    },
  ],
  extracts: [
    {
      href: "/modules-pdf/%D8%A7%D9%84%D9%85%D8%B3%D8%AA%D8%AE%D9%84%D8%B5%D8%A7%D8%AA%20v1AB.pptx",
      label: "المستخلصات v1AB",
    },
  ],
};

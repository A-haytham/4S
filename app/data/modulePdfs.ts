export const modulePdfMap: Record<string, { pdf?: string; pptx?: string }> = {
  "finance-accounting": {
    pptx: "الحسابات العامة.pptx",
  },
  "inventory-management": {
    pptx: "المخازن (3).pptx",
  },
  "sales-crm": {
    pptx: "المبيعات.pptx",
  },
  procurement: {
    pptx: "المشتريات.pptx",
  },
  manufacturing: {
    pptx: "الانتاج.pptx",
  },
  "human-resources": {
    pptx: "نظام شئون الموظفين.pptx",
  },
  agriculture: {
    pptx: "الزراعة.pptx",
  },
  banks: {
    pptx: "نظام البنوك والخزن.pptx",
  },
  "real-estate-management-system": {
    pptx: "الاستثمار العقارى.pptx",
  },
};

export function getModulePdfFiles(slug: string) {
  return modulePdfMap[slug];
}

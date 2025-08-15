export interface Report {
  id: string;
  title: string;
  category: string;
  region: string;
  type: string;
  price: number;
  currency: string;
  pages: number;
  date: string;
  description: string;
  shortDescription: string;
  keyInsights: string[];
  tableOfContents: string[];
  whatIncludes: string[];
  image: string;
  featured: boolean;
}

export interface CartItem {
  report: Report;
  quantity: number;
}

export interface PurchaseData {
  customerEmail: string;
  customerName: string;
  company?: string;
  phone?: string;
  reportIds: number[];
  totalAmount: number;
}
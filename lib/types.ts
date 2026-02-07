export type RegistrationCategory = 'school' | 'university' | 'general';

export interface SchoolRegistration {
  id: string;
  schoolName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  studentNames: string[];
  totalStudents: number;
  programmeCost: number;
  bookCost: number;
  discountPercentage: number;
  totalPrice: number;
  paymentStatus: 'pending' | 'completed' | 'failed';
  paystackAccessCode?: string;
  paystackReference?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UniversityRegistration {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  universityName: string;
  degreeLevel: string;
  programmeCost: number;
  bookCost: number;
  totalPrice: number;
  paymentStatus: 'pending' | 'completed' | 'failed';
  paystackAccessCode?: string;
  paystackReference?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GeneralPublicRegistration {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profession?: string;
  programmeCost: number;
  bookCost: number;
  totalPrice: number;
  paymentStatus: 'pending' | 'completed' | 'failed';
  paystackAccessCode?: string;
  paystackReference?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdminUser {
  id: string;
  email: string;
  passwordHash: string;
  role: 'admin';
  createdAt: Date;
}

export interface SchoolUser {
  id: string;
  schoolName: string;
  email: string;
  passwordHash: string;
  role: 'school';
  schoolRegistrationId: string;
  createdAt: Date;
}

// NAFS Pricing Structure for Nigeria (in Naira)
export const PRICING = {
  basePrice: 5000, // ₦5,000 (programme + book)
  book: 2500, // ₦2,500
  programme: 2500, // ₦2,500 base
  tiers: [
    { minStudents: 100, programmeCost: 1750, discountPercentage: 30 }, // 30% discount
    { minStudents: 50, programmeCost: 2000, discountPercentage: 20 }, // 20% discount
    { minStudents: 20, programmeCost: 2250, discountPercentage: 10 }, // 10% discount
    { minStudents: 1, programmeCost: 2500, discountPercentage: 0 }, // No discount
  ],
};

export interface PricingTier {
  students: number;
  programme: number;
  book: number;
  total: number;
  discount: number;
  description: string;
}

export const calculateSchoolDiscount = (studentCount: number): number => {
  for (const tier of PRICING.tiers) {
    if (studentCount >= tier.minStudents) {
      return tier.discountPercentage;
    }
  }
  return 0;
};

export const calculateSchoolPrice = (studentCount: number) => {
  const tier = PRICING.tiers.find(t => studentCount >= t.minStudents);
  if (!tier) return {
    programme: PRICING.programme,
    book: PRICING.book,
    perStudent: PRICING.programme + PRICING.book,
    total: (PRICING.programme + PRICING.book) * studentCount,
    discount: 0,
  };

  return {
    programme: tier.programmeCost,
    book: PRICING.book,
    perStudent: tier.programmeCost + PRICING.book,
    total: (tier.programmeCost + PRICING.book) * studentCount,
    discount: tier.discountPercentage,
  };
};

export const getPricingTiers = (): PricingTier[] => [
  {
    students: 100,
    programme: 1750,
    book: 2500,
    total: 4250,
    discount: 30,
    description: '100+ students',
  },
  {
    students: 50,
    programme: 2000,
    book: 2500,
    total: 4500,
    discount: 20,
    description: '50–99 students',
  },
  {
    students: 20,
    programme: 2250,
    book: 2500,
    total: 4750,
    discount: 10,
    description: '20–49 students',
  },
  {
    students: 1,
    programme: 2500,
    book: 2500,
    total: 5000,
    discount: 0,
    description: '1–19 students',
  },
];

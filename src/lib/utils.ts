import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(
  amount: number | undefined | null, 
  currency: 'USD' | 'INR' = 'INR',
  options: Intl.NumberFormatOptions = {}
) {
  if (amount === null || amount === undefined) return 'N/A';

  const defaultOptions: Intl.NumberFormatOptions = {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };
  
  // Always use en-IN for INR to ensure correct symbol (₹) and formatting
  const locale = currency === 'INR' ? 'en-IN' : 'en-US';
  
  const formatter = new Intl.NumberFormat(locale, {
    ...defaultOptions,
    ...options,
  });

  return formatter.format(amount);
}

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format SBD token amount for display with 2 decimal places.
 * 
 * @param amount - The token amount (can be number or string)
 * @param includeSymbol - Whether to include "SBD" suffix (default: true)
 * @returns Formatted string (e.g., "1,234.50 SBD")
 */
export function formatSBDTokens(amount: number | string, includeSymbol: boolean = true): string {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

  if (isNaN(numAmount)) {
    return includeSymbol ? "0.00 SBD" : "0.00";
  }

  // Format with thousands separator and 2 decimal places
  const formatted = numAmount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return includeSymbol ? `${formatted} SBD` : formatted;
}

/**
 * Format INR amount for display.
 * 
 * @param amount - The amount in INR
 * @returns Formatted string (e.g., "₹100.00")
 */
export function formatINR(amount: number | string): string {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

  if (isNaN(numAmount)) {
    return "₹0.00";
  }

  return numAmount.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
  });
}

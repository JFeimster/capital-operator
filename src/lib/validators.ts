/**
 * Capital Operator — Form & Email Validators
 * src/lib/validators.ts
 */

export function isValidEmail(email: string): boolean {
  if (!email) return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}

export function isValidPhone(phone: string): boolean {
  if (!phone) return true; // optional field
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length >= 10 && cleaned.length <= 15;
}

export function validateRequiredField(val: string): boolean {
  return val !== undefined && val !== null && val.trim().length > 0;
}

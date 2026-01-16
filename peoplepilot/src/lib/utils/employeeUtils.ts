/**
 * Generate a random employee ID
 * Format: EMP-YYYY-XXX
 */
export function generateEmployeeId(): string {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(100 + Math.random() * 900); // 3-digit random
  return `EMP-${year}-${randomNum}`;
}

/**
 * Generate a secure random password
 */
export function generateRandomPassword(length: number = 10): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

/**
 * Validate email domain matches company (for multi-tenancy)
 */
export function validateEmailDomain(email: string, companyDomain: string): boolean {
  const emailDomain = email.split('@')[1];
  return emailDomain === companyDomain;
}
export type UserRole = 'hr_admin' | 'employee' | 'manager';

export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  role: UserRole;
  companyId: string;
  employeeId?: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
}

export interface UserDocument {
  email: string;
  displayName?: string;
  photoURL?: string;
  role: UserRole;
  companyId: string;
  employeeId?: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
}
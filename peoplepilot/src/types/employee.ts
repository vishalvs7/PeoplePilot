export type EmployeeStatus = 'active' | 'inactive' | 'on_notice';
export type EmploymentType = 'full_time' | 'part_time' | 'contract' | 'intern';
export type Gender = 'male' | 'female' | 'other';

export interface Employee {
  id: string;
  companyId: string;
  userId?: string; // Links to auth user if exists
  
  // Personal Information
  personal: {
    firstName: string;
    lastName: string;
    email: string;
    personalEmail?: string;
    phone: string;
    emergencyContact?: string;
    dateOfBirth?: Date;
    gender?: Gender;
    bloodGroup?: string;
    maritalStatus?: 'single' | 'married' | 'divorced' | 'widowed';
    nationality?: string;
    panNumber?: string;
    aadharNumber?: string;
    passportNumber?: string;
  };
  
  // Employment Information
  employment: {
    employeeId: string; // Company employee ID like "EMP001"
    designation: string;
    department: string;
    reportingManager?: string; // employeeId of manager
    employmentType: EmploymentType;
    dateOfJoining: Date;
    dateOfLeaving?: Date;
    workLocation?: string;
    workEmail?: string;
    workPhone?: string;
    status: EmployeeStatus;
    noticePeriod?: number; // in days
  };
  
  // Salary Information
  salary?: {
    basic: number;
    hra: number;
    specialAllowance: number;
    otherAllowances?: Record<string, number>;
    pfDeduction?: number;
    esiDeduction?: number;
    tdsDeduction?: number;
    bankAccount?: {
      accountNumber: string;
      bankName: string;
      ifscCode: string;
      accountHolderName: string;
    };
  };
  
  // Leave Information
  leave?: {
    casualLeave: number;
    sickLeave: number;
    earnedLeave: number;
    otherLeave?: number;
    usedCasualLeave: number;
    usedSickLeave: number;
    usedEarnedLeave: number;
    usedOtherLeave?: number;
  };
  
  // Documents
  documents?: {
    resume?: string;
    offerLetter?: string;
    appointmentLetter?: string;
    experienceLetters?: string[];
    idProof?: string;
    addressProof?: string;
    educationalCertificates?: string[];
  };
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  createdBy: string; // userId who created
}

export interface EmployeeDocument {
  // Personal
  firstName: string;
  lastName: string;
  email: string;
  personalEmail?: string;
  phone: string;
  emergencyContact?: string;
  dateOfBirth?: Date;
  gender?: Gender;
  bloodGroup?: string;
  maritalStatus?: string;
  nationality?: string;
  panNumber?: string;
  aadharNumber?: string;
  passportNumber?: string;
  
  // Employment
  employeeId: string;
  designation: string;
  department: string;
  reportingManager?: string;
  employmentType: EmploymentType;
  dateOfJoining: Date;
  dateOfLeaving?: Date;
  workLocation?: string;
  workEmail?: string;
  workPhone?: string;
  status: EmployeeStatus;
  noticePeriod?: number;
  
  // Salary
  basic?: number;
  hra?: number;
  specialAllowance?: number;
  otherAllowances?: Record<string, number>;
  pfDeduction?: number;
  esiDeduction?: number;
  tdsDeduction?: number;
  bankAccount?: {
    accountNumber: string;
    bankName: string;
    ifscCode: string;
    accountHolderName: string;
  };
  
  // Leave
  casualLeave?: number;
  sickLeave?: number;
  earnedLeave?: number;
  otherLeave?: number;
  usedCasualLeave?: number;
  usedSickLeave?: number;
  usedEarnedLeave?: number;
  usedOtherLeave?: number;
  
  // Metadata
  companyId: string;
  userId?: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}
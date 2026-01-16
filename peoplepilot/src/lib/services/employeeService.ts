import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  limit,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { Employee, EmployeeDocument, EmployeeStatus } from '@/types/employee';

const EMPLOYEES_COLLECTION = 'employees';

export async function createEmployee(
  companyId: string,
  employeeData: Omit<EmployeeDocument, 'companyId' | 'createdAt' | 'updatedAt' | 'createdBy'>,
  createdBy: string
): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, EMPLOYEES_COLLECTION), {
      ...employeeData,
      companyId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      createdBy,
    });
    
    return docRef.id;
  } catch (error) {
    console.error('Error creating employee:', error);
    throw error;
  }
}

export async function getEmployees(
  companyId: string,
  filters?: {
    department?: string;
    status?: EmployeeStatus;
    search?: string;
  }
): Promise<Employee[]> {
  try {
    let q = query(
      collection(db, EMPLOYEES_COLLECTION),
      where('companyId', '==', companyId),
      orderBy('createdAt', 'desc')
    );

    // Apply filters
    if (filters?.department) {
      q = query(q, where('department', '==', filters.department));
    }
    
    if (filters?.status) {
      q = query(q, where('status', '==', filters.status));
    }

    const querySnapshot = await getDocs(q);
    const employees: Employee[] = [];

    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      employees.push({
        id: docSnap.id,
        companyId: data.companyId,
        userId: data.userId,
        personal: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          personalEmail: data.personalEmail,
          phone: data.phone,
          emergencyContact: data.emergencyContact,
          dateOfBirth: data.dateOfBirth?.toDate(),
          gender: data.gender,
          bloodGroup: data.bloodGroup,
          maritalStatus: data.maritalStatus,
          nationality: data.nationality,
          panNumber: data.panNumber,
          aadharNumber: data.aadharNumber,
          passportNumber: data.passportNumber,
        },
        employment: {
          employeeId: data.employeeId,
          designation: data.designation,
          department: data.department,
          reportingManager: data.reportingManager,
          employmentType: data.employmentType,
          dateOfJoining: data.dateOfJoining?.toDate(),
          dateOfLeaving: data.dateOfLeaving?.toDate(),
          workLocation: data.workLocation,
          workEmail: data.workEmail,
          workPhone: data.workPhone,
          status: data.status,
          noticePeriod: data.noticePeriod,
        },
        salary: data.basic ? {
          basic: data.basic,
          hra: data.hra,
          specialAllowance: data.specialAllowance,
          otherAllowances: data.otherAllowances,
          pfDeduction: data.pfDeduction,
          esiDeduction: data.esiDeduction,
          tdsDeduction: data.tdsDeduction,
          bankAccount: data.bankAccount,
        } : undefined,
        leave: data.casualLeave ? {
          casualLeave: data.casualLeave,
          sickLeave: data.sickLeave,
          earnedLeave: data.earnedLeave,
          otherLeave: data.otherLeave,
          usedCasualLeave: data.usedCasualLeave || 0,
          usedSickLeave: data.usedSickLeave || 0,
          usedEarnedLeave: data.usedEarnedLeave || 0,
          usedOtherLeave: data.usedOtherLeave || 0,
        } : undefined,
        documents: data.documents,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
        createdBy: data.createdBy,
      });
    });

    // Apply search filter in memory (Firestore doesn't support full-text search)
    if (filters?.search) {
      const searchTerm = filters.search.toLowerCase();
      return employees.filter(emp => 
        emp.personal.firstName.toLowerCase().includes(searchTerm) ||
        emp.personal.lastName.toLowerCase().includes(searchTerm) ||
        emp.personal.email.toLowerCase().includes(searchTerm) ||
        emp.employment.employeeId.toLowerCase().includes(searchTerm) ||
        emp.employment.designation.toLowerCase().includes(searchTerm)
      );
    }

    return employees;
  } catch (error) {
    console.error('Error getting employees:', error);
    throw error;
  }
}

export async function getEmployeeById(employeeId: string): Promise<Employee | null> {
  try {
    const docRef = doc(db, EMPLOYEES_COLLECTION, employeeId);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      return null;
    }
    
    const data = docSnap.data();
    return {
      id: docSnap.id,
      companyId: data.companyId,
      userId: data.userId,
      personal: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        personalEmail: data.personalEmail,
        phone: data.phone,
        emergencyContact: data.emergencyContact,
        dateOfBirth: data.dateOfBirth?.toDate(),
        gender: data.gender,
        bloodGroup: data.bloodGroup,
        maritalStatus: data.maritalStatus,
        nationality: data.nationality,
        panNumber: data.panNumber,
        aadharNumber: data.aadharNumber,
        passportNumber: data.passportNumber,
      },
      employment: {
        employeeId: data.employeeId,
        designation: data.designation,
        department: data.department,
        reportingManager: data.reportingManager,
        employmentType: data.employmentType,
        dateOfJoining: data.dateOfJoining?.toDate(),
        dateOfLeaving: data.dateOfLeaving?.toDate(),
        workLocation: data.workLocation,
        workEmail: data.workEmail,
        workPhone: data.workPhone,
        status: data.status,
        noticePeriod: data.noticePeriod,
      },
      salary: data.basic ? {
        basic: data.basic,
        hra: data.hra,
        specialAllowance: data.specialAllowance,
        otherAllowances: data.otherAllowances,
        pfDeduction: data.pfDeduction,
        esiDeduction: data.esiDeduction,
        tdsDeduction: data.tdsDeduction,
        bankAccount: data.bankAccount,
      } : undefined,
      leave: data.casualLeave ? {
        casualLeave: data.casualLeave,
        sickLeave: data.sickLeave,
        earnedLeave: data.earnedLeave,
        otherLeave: data.otherLeave,
        usedCasualLeave: data.usedCasualLeave || 0,
        usedSickLeave: data.usedSickLeave || 0,
        usedEarnedLeave: data.usedEarnedLeave || 0,
        usedOtherLeave: data.usedOtherLeave || 0,
      } : undefined,
      documents: data.documents,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
      createdBy: data.createdBy,
    };
  } catch (error) {
    console.error('Error getting employee:', error);
    throw error;
  }
}

export async function updateEmployee(
  employeeId: string,
  updates: Partial<EmployeeDocument>
): Promise<void> {
  try {
    const employeeRef = doc(db, EMPLOYEES_COLLECTION, employeeId);
    await updateDoc(employeeRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating employee:', error);
    throw error;
  }
}

export async function deleteEmployee(employeeId: string): Promise<void> {
  try {
    const employeeRef = doc(db, EMPLOYEES_COLLECTION, employeeId);
    await deleteDoc(employeeRef);
  } catch (error) {
    console.error('Error deleting employee:', error);
    throw error;
  }
}

export async function getEmployeeCount(companyId: string): Promise<number> {
  try {
    const q = query(
      collection(db, EMPLOYEES_COLLECTION),
      where('companyId', '==', companyId),
      where('status', '==', 'active')
    );
    const snapshot = await getDocs(q);
    return snapshot.size;
  } catch (error) {
    console.error('Error getting employee count:', error);
    throw error;
  }
}
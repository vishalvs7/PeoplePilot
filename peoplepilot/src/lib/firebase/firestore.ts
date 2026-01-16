import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  serverTimestamp,
  query,
  where,
  getDocs
} from 'firebase/firestore';
import { db } from './config';
import { User, UserDocument, UserRole } from '@/types/user';
import { Company, CompanyDocument } from '@/types/company';

// Collection names
const USERS_COLLECTION = 'users';
const COMPANIES_COLLECTION = 'companies';

/**
 * Create a new user document in Firestore
 * This should be called after Firebase auth user is created
 */
export async function createUserDocument(
  uid: string, 
  userData: Omit<UserDocument, 'createdAt' | 'updatedAt'>
): Promise<void> {
  try {
    const userRef = doc(db, USERS_COLLECTION, uid);
    await setDoc(userRef, {
      ...userData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error creating user document:', error);
    throw error;
  }
}

/**
 * Get user document from Firestore
 */
export async function getUserDocument(uid: string): Promise<User | null> {
  try {
    const userRef = doc(db, USERS_COLLECTION, uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      const data = userSnap.data();
      return {
        uid,
        email: data.email,
        displayName: data.displayName,
        photoURL: data.photoURL,
        role: data.role,
        companyId: data.companyId,
        employeeId: data.employeeId,
        emailVerified: data.emailVerified,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
        lastLoginAt: data.lastLoginAt?.toDate(),
      };
    }
    return null;
  } catch (error) {
    console.error('Error getting user document:', error);
    throw error;
  }
}

/**
 * Update user document in Firestore
 */
export async function updateUserDocument(
  uid: string, 
  updates: Partial<UserDocument>
): Promise<void> {
  try {
    const userRef = doc(db, USERS_COLLECTION, uid);
    await updateDoc(userRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating user document:', error);
    throw error;
  }
}

/**
 * Create a new company document
 */
export async function createCompanyDocument(
  companyId: string,
  companyData: Omit<CompanyDocument, 'createdAt' | 'updatedAt'>
): Promise<void> {
  try {
    const companyRef = doc(db, COMPANIES_COLLECTION, companyId);
    await setDoc(companyRef, {
      ...companyData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error creating company document:', error);
    throw error;
  }
}

/**
 * Get company document
 */
export async function getCompanyDocument(companyId: string): Promise<Company | null> {
  try {
    const companyRef = doc(db, COMPANIES_COLLECTION, companyId);
    const companySnap = await getDoc(companyRef);
    
    if (companySnap.exists()) {
      const data = companySnap.data();
      return {
        id: companyId,
        name: data.name,
        slug: data.slug,
        logo: data.logo,
        primaryColor: data.primaryColor,
        plan: data.plan,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
        settings: data.settings,
      };
    }
    return null;
  } catch (error) {
    console.error('Error getting company document:', error);
    throw error;
  }
}

/**
 * Check if company slug is available
 */
export async function isCompanySlugAvailable(slug: string): Promise<boolean> {
  try {
    const companiesRef = collection(db, COMPANIES_COLLECTION);
    const q = query(companiesRef, where('slug', '==', slug));
    const querySnapshot = await getDocs(q);
    return querySnapshot.empty;
  } catch (error) {
    console.error('Error checking company slug:', error);
    throw error;
  }
}
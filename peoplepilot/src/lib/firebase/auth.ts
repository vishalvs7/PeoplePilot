import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  User as FirebaseUser,
} from 'firebase/auth';
import { auth } from './config';
import { User, UserRole } from '@/types/user';
import { getUserDocument } from './firestore'; // Make sure this import exists

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();

/**
 * Sign up with email/password
 */
export async function signUpWithEmail(
  email: string,
  password: string,
  displayName: string,
  role: UserRole,
  companyId: string
): Promise<User> {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName });
    
    return {
      uid: userCredential.user.uid,
      email: userCredential.user.email!,
      displayName,
      role,
      companyId,
      emailVerified: userCredential.user.emailVerified,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  } catch (error) {
    console.error('Sign up error:', error);
    throw error;
  }
}

/**
 * Sign in with email/password
 */
export async function signInWithEmail(email: string, password: string): Promise<FirebaseUser> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Sign in error:', error);
    throw error;
  }
}

/**
 * Sign in with Google
 */
export async function signInWithGoogle(): Promise<FirebaseUser> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error('Google sign in error:', error);
    throw error;
  }
}

/**
 * Sign out
 */
export async function signOutUser(): Promise<void> {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Sign out error:', error);
    throw error;
  }
}

/**
 * Convert Firebase user to our User type
 */
export async function convertFirebaseUser(firebaseUser: FirebaseUser): Promise<User | null> {
  if (!firebaseUser) return null;
  
  try {
    const userDoc = await getUserDocument(firebaseUser.uid);
    
    if (userDoc) {
      return userDoc;
    }
    
    console.warn('User document not found for:', firebaseUser.uid);
    return {
      uid: firebaseUser.uid,
      email: firebaseUser.email!,
      displayName: firebaseUser.displayName || undefined,
      photoURL: firebaseUser.photoURL || undefined,
      role: 'employee',
      companyId: 'default-company',
      emailVerified: firebaseUser.emailVerified,
      createdAt: new Date(firebaseUser.metadata.creationTime || Date.now()),
      updatedAt: new Date(),
      lastLoginAt: new Date(firebaseUser.metadata.lastSignInTime || Date.now()),
    };
  } catch (error) {
    console.error('Error converting Firebase user:', error);
    return {
      uid: firebaseUser.uid,
      email: firebaseUser.email!,
      displayName: firebaseUser.displayName || undefined,
      photoURL: firebaseUser.photoURL || undefined,
      role: 'employee',
      companyId: 'default-company',
      emailVerified: firebaseUser.emailVerified,
      createdAt: new Date(firebaseUser.metadata.creationTime || Date.now()),
      updatedAt: new Date(),
      lastLoginAt: new Date(firebaseUser.metadata.lastSignInTime || Date.now()),
    };
  }
}
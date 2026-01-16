'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  User as FirebaseUser, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut 
} from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import { getUserDocument, updateUserDocument } from '@/lib/firebase/firestore';
import { convertFirebaseUser } from '@/lib/firebase/auth';
import { User } from '@/types/user';

// MOVE useAuth hook definition BEFORE the context creation
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (updates: Partial<User>) => Promise<void>;
}

// Create context AFTER the hook definition
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  loginWithEmail: async () => {},
  loginWithGoogle: async () => {},
  logout: async () => {},
  resetPassword: async () => {},
  updateUserProfile: async () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user from Firestore when auth state changes
  const loadUser = async (firebaseUser: FirebaseUser | null) => {
    if (!firebaseUser) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const userData = await convertFirebaseUser(firebaseUser);
      setUser(userData);
      
      if (userData) {
        await updateUserDocument(firebaseUser.uid, {
          lastLoginAt: new Date(),
        });
      }
    } catch (error) {
      console.error('Error loading user:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      loadUser(firebaseUser);
    });

    return unsubscribe;
  }, []);

  // Login with email/password
  const loginWithEmail = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // Login with Google
  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Google login error:', error);
      throw error;
    }
  };

  // Logout
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  // Reset password (placeholder)
  const handleResetPassword = async (email: string) => {
    console.log('Reset password requested for:', email);
    throw new Error('Password reset feature is coming soon!');
  };

  // Update user profile
  const updateUserProfile = async (updates: Partial<User>) => {
    if (!user) throw new Error('No user logged in');
    
    try {
      await updateUserDocument(user.uid, updates);
      setUser({ ...user, ...updates });
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      loginWithEmail,
      loginWithGoogle,
      logout,
      resetPassword: handleResetPassword,
      updateUserProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
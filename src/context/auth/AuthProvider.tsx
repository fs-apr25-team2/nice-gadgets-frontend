import { ReactNode, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from '../../utils/firebase';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setIsLoading(false);

      if (firebaseUser) {
        localStorage.setItem('user', JSON.stringify(firebaseUser));
      } else {
        localStorage.removeItem('user');
      }
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => await signOut(auth);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

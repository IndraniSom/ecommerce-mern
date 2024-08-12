'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user?: User;
  login: (email: string, password: string) => void;
  logout: () => void;
  register: (firstName: string, lastName: string, email: string, password: string, role: string) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      fetchUserProfile(token);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const fetchUserProfile = async (token: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-Auth-Token': `${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        console.error('Failed to fetch user profile');
      }
    } catch (error) {
      console.error('Error fetching user profile', error);
    }
  };

  const register = async (firstName: string, lastName: string, email: string, password: string, role: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password, role }),
      });

      if (res.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Registration successful!',
          text: 'You can now login with your credentials.',
        }).then(() => {
          router.push('/login');
        });
      } else {
        const data = await res.json();
        Swal.fire({
          icon: 'error',
          title: 'Registration failed',
          text: data.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Registration failed',
        text: 'An error occurred during registration.',
      });
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('token', data.token);
        setIsAuthenticated(true);
        setUser(data.user);
        Swal.fire({
          icon: 'success',
          title: 'Login successful!',
        }).then(() => {
          router.push('/');
        });
      } else {
        const data = await res.json();
        Swal.fire({
          icon: 'error',
          title: 'Login failed',
          text: data.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login failed',
        text: 'An error occurred during login.',
      });
    }
  };

  const logout = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/logout`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUser(undefined);
        Swal.fire({
          icon: 'success',
          title: 'Logout successful!',
        }).then(() => {
          router.push('/');
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Logout failed',
          text: 'An error occurred during logout.',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Logout failed',
        text: 'An error occurred during logout.',
      });
    }
  };

  const authContextValue: AuthContextType = {
    isAuthenticated,
    user,
    login,
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

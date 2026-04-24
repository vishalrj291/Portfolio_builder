'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { auth } from '../lib/firebaseConfig';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, User, signOut } from 'firebase/auth';

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google: ", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link href="/">
              <span className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition">
                AutoPortfolio
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/generate">
              <span className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition shadow-md hidden md:block">
                Create Your Portfolio
              </span>
            </Link>
            <a href="/Resume.pdf" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-gray-600 hover:text-gray-900">
              Download Resume
            </a>
            {user ? (
              <div className="flex items-center space-x-4">
                <Link href="/dashboard" className="text-sm font-semibold text-gray-600 hover:text-gray-900">
                  Dashboard
                </Link>
                <button onClick={handleSignOut} className="text-sm font-semibold text-gray-600 hover:text-gray-900">
                  Sign Out
                </button>
                <img
                  src={user.photoURL || ''}
                  alt="User"
                  className="w-10 h-10 rounded-full"
                />
              </div>
            ) : (
              <button
                onClick={handleGoogleSignIn}
                className="text-sm font-semibold bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
              >
                Login with Google
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

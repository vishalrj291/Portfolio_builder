"use client";
import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '@/lib/firebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const DashboardPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [portfolios, setPortfolios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthChecked(true);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!authChecked) {
      return;
    }

    if (!user) {
      router.push('/');
      return;
    }

    const fetchPortfolios = async () => {
      try {
        setLoading(true);
        const q = query(collection(db, "portfolios"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const userPortfolios = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPortfolios(userPortfolios);
      } catch (error) {
        console.error("Error fetching portfolios: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, [user, authChecked, router]);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this portfolio?")) {
      try {
        await deleteDoc(doc(db, "portfolios", id));
        setPortfolios(portfolios.filter(p => p.id !== id));
      } catch (error) {
        console.error("Error deleting portfolio: ", error);
        alert("Failed to delete portfolio.");
      }
    }
  };

  if (!authChecked || loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  if (!user) {
    // This part should ideally not be reached due to the useEffect redirect,
    // but it's good for robustness.
    return <div className="text-center py-20">Redirecting to login...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Your Portfolios</h1>
        {portfolios.length > 0 ? (
          <div className="bg-white p-8 shadow-xl rounded-lg space-y-6">
            {portfolios.map(p => (
              <div key={p.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h2 className="text-xl font-bold">{p.name}</h2>
                  <p className="text-sm text-gray-500">Created on: {p.createdAt ? new Date(p.createdAt.seconds * 1000).toLocaleDateString() : 'Date not available'}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <Link href={`/u/${p.id}`} legacyBehavior>
                    <a className="text-blue-600 hover:underline" target="_blank">View</a>
                  </Link>
                  <Link href={`/edit/${p.id}`} legacyBehavior>
                    <a className="text-green-600 hover:underline">Edit</a>
                  </Link>
                  <button onClick={() => handleDelete(p.id)} className="text-red-600 hover:underline">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center bg-white p-12 shadow-xl rounded-lg">
            <h2 className="text-xl font-semibold">You haven't created any portfolios yet.</h2>
            <Link href="/generate" legacyBehavior>
              <a className="mt-4 inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                Create One Now
              </a>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
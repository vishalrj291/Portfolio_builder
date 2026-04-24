import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';
import { PortfolioData } from '@/lib/types';
import ClassicTemplate from '@/components/templates/ClassicTemplate';
import ModernTemplate from '@/components/templates/ModernTemplate';
import CreativeTemplate from '@/components/templates/CreativeTemplate';
import CorporateTemplate from '@/components/templates/CorporateTemplate';
import MinimalistTemplate from '@/components/templates/MinimalistTemplate';
import TechTemplate from '@/components/templates/TechTemplate';
import Link from 'next/link';

// This tells Next.js to render this page dynamically at request time,
// which is perfect for fetching user-generated content.
export const dynamic = 'force-dynamic';

const PortfolioPage = async ({ params }: { params: { id: string } }) => {
  const docRef = doc(db, 'portfolios', params.id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-50 px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Portfolio Not Found</h1>
        <p className="text-lg text-gray-600 mb-8">The portfolio you are looking for might have been moved or deleted.</p>
        <Link href="/generate" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105">
          Create Your Own Portfolio
        </Link>
      </div>
    );
  }

  const data = docSnap.data();
  
  // Cast the data from Firestore to our PortfolioData type.
  // This assumes the data structure in Firestore matches the type definition.
  const portfolioData = data as PortfolioData;
  const templateId = data.template || 'classic'; // Default to classic if not specified

  const renderTemplate = () => {
    switch (templateId) {
      case 'minimalist':
        return <MinimalistTemplate data={portfolioData} id={params.id} />;
      case 'tech':
        return <TechTemplate data={portfolioData} id={params.id} />;
      default:
        // Fallback to a default template for safety
        return <ClassicTemplate data={portfolioData} id={params.id} />;
    }
  };

  return (
    <>
      {renderTemplate()}
    </>
  );
};

export default PortfolioPage;
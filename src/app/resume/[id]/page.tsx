import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';
import { PortfolioData } from '@/lib/types';
import ResumeTemplate from '@/components/templates/ResumeTemplate';
import Link from 'next/link';

// This tells Next.js to render this page dynamically at request time
export const dynamic = 'force-dynamic';

const ResumePage = async ({ params }: { params: { id: string } }) => {
  const docRef = doc(db, 'portfolios', params.id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-50 px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Resume Data Not Found</h1>
        <p className="text-lg text-gray-600 mb-8">The data for this resume could not be found.</p>
        <Link href="/generate" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg">
          Create a Portfolio to Generate a Resume
        </Link>
      </div>
    );
  }

  const portfolioData = docSnap.data() as PortfolioData;

  return <ResumeTemplate data={portfolioData} />;
};

export default ResumePage;

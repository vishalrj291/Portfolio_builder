import { FC } from 'react';
import Link from 'next/link';

const TermsOfServicePage: FC = () => {
  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center">Terms of Service</h1>
        <Link href="/" className="text-blue-500 hover:underline block text-center mt-2">
          &larr; Back to Home
        </Link>
        <div className="mt-8 prose prose-indigo text-gray-500 mx-auto lg:prose-lg">
          <p>Last updated: November 27, 2025</p>

          <p>
            Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the website (the "Service") operated by us.
          </p>

          <p>
            Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
          </p>

          <p>
            By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.
          </p>

          <h2>1. Accounts</h2>
          <p>
            When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
          </p>
          <p>
            You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.
          </p>
          <p>
            You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
          </p>

          <h2>2. Intellectual Property</h2>
          <p>
            The Service and its original content, features and functionality are and will remain the exclusive property of us and its licensors. The Service is protected by copyright, trademark, and other laws of both the foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.
          </p>
          <p>
            You retain any and all of your rights to any content you submit, post or display on or through the Service and you are responsible for protecting those rights. 
          </p>

          <h2>3. User Content</h2>
          <p>
            Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post to the Service, including its legality, reliability, and appropriateness.
          </p>
          <p>
            By posting Content to the Service, you grant us the right and license to use, modify, publicly perform, publicly display, reproduce, and distribute such Content on and through the Service. You agree that this license includes the right for us to make your Content available to other users of the Service, who may also use your Content subject to these Terms.
          </p>
          
          <h2>4. Termination</h2>
          <p>
            We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
          </p>
          <p>
            Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service.
          </p>

          <h2>5. Limitation Of Liability</h2>
          <p>
            In no event shall we, nor our directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
          </p>
          
          <h2>6. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of our country, without regard to its conflict of law provisions.
          </p>

          <h2>7. Changes</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
          </p>

          <h2>8. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
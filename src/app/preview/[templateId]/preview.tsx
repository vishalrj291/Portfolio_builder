"use client";

import ClassicTemplate from '@/components/templates/ClassicTemplate';
import ModernTemplate from '@/components/templates/ModernTemplate';
import CreativeTemplate from '@/components/templates/CreativeTemplate';
import CorporateTemplate from '@/components/templates/CorporateTemplate';
import MinimalistTemplate from '@/components/templates/MinimalistTemplate';
import TechTemplate from '@/components/templates/TechTemplate';
import { sampleData } from '@/lib/sample-data';

const TemplatePreview = ({ templateId }: { templateId: string }) => {
  const renderTemplate = () => {
    switch (templateId) {
      case 'classic':
        return <ClassicTemplate data={sampleData} id="sample" />;
      case 'modern':
        return <ModernTemplate data={sampleData} id="sample" />;
      case 'creative':
        return <CreativeTemplate data={sampleData} id="sample" />;
      case 'corporate':
        return <CorporateTemplate data={sampleData} id="sample" />;
      case 'minimalist':
        return <MinimalistTemplate data={sampleData} id="sample" />;
      case 'tech':
        return <TechTemplate data={sampleData} id="sample" />;
      default:
        return <div className="text-center py-20">Template not found</div>;
    }
  };

  return (
    <div>
      {renderTemplate()}
    </div>
  );
};

export default TemplatePreview;

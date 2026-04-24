import TemplatePreview from './preview';

export async function generateStaticParams() {
  return [
    { templateId: 'classic' },
    { templateId: 'modern' },
    { templateId: 'creative' },
  ];
}

const TemplatePreviewPage = ({ params }: { params: { templateId: string } }) => {
  return <TemplatePreview templateId={params.templateId} />;
};

export default TemplatePreviewPage;

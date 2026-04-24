"use client";
import Link from 'next/link';

const templates = [
  {
    id: 'classic',
    name: 'Classic Professional',
    description: 'A timeless design for a clean and professional look.',
    imageUrl: '/classic.png',
  },
  {
    id: 'modern',
    name: 'Modern Minimalist',
    description: 'A sleek, contemporary design that focuses on your content.',
    imageUrl: '/modern.png',
  },
  {
    id: 'creative',
    name: 'Creative Bold',
    description: 'A vibrant and creative design to make your portfolio stand out.',
    imageUrl: '/creative.png',
  },
  {
    id: 'corporate',
    name: 'Corporate',
    description: 'A professional design suitable for corporate use.',
    imageUrl: '/corporate.png',
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'A simple and clean design.',
    imageUrl: '/minimalist.png',
  },
  {
    id: 'tech',
    name: 'Tech',
    description: 'A design tailored for tech professionals.',
    imageUrl: '/tech.png',
  },
];

const TemplatePreview = () => {
  return (
    <section className="bg-white py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <p className="text-base font-semibold leading-7 text-blue-600">Our Templates</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Choose a Style That Fits You
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Select from our beautiful, responsive templates. You can switch templates anytime.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {templates.map((template) => (
            <div key={template.id} className="flex flex-col overflow-hidden rounded-lg border border-gray-200 shadow-lg transition-transform duration-300 hover:scale-105">
              <div className="flex-shrink-0">
                <img
                  className="h-48 w-full object-cover"
                  src={template.imageUrl}
                  alt={template.name}
                />
              </div>
              <div className="flex flex-1 flex-col justify-between bg-white p-6">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">{template.name}</h3>
                  <p className="mt-3 text-base text-gray-500">{template.description}</p>
                </div>
                <div className="mt-6">
                  <Link href={`/preview/${template.id}`} target="_blank" className="text-sm font-semibold text-blue-600 hover:text-blue-500">
                    Live Preview &rarr;
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TemplatePreview;

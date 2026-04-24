"use client";
import Link from 'next/link';
import { Sparkles, LayoutTemplate, Zap, Rss as Feed, Brush, BarChart, Globe } from 'lucide-react';

import TemplatePreview from '@/components/TemplatePreview';

const HomePage = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <main className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Sparkles className="mx-auto h-12 w-12 text-blue-400" />
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Build Your Professional Portfolio in Minutes
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Instantly create a stunning, professional-looking portfolio website. No coding required. Just fill in your details, choose a template, and get a shareable link.
            </p>
            <div className="mt-10">
              <Link href="/generate" className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                Get Started for Free
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
          <div className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#80caff] to-[#4f46e5] opacity-30" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }} />
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <p className="text-base font-semibold leading-7 text-blue-600">Why Choose Us?</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to showcase your work
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our platform is designed to be simple, fast, and beautiful. We handle the technical details so you can focus on what matters: your content.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <LayoutTemplate className="h-8 w-8 text-blue-600" />
                  Stunning Templates
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">Choose from a variety of modern, professionally designed templates that make your work shine.</p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <Brush className="h-8 w-8 text-blue-600" />
                  Easy Customization
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">Our intuitive editor makes it simple to add your projects, skills, and contact information. No technical skills needed.</p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <Zap className="h-8 w-8 text-blue-600" />
                  Instantly Live
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">Your portfolio is live and ready to share the moment you hit "publish". Get a unique URL to share with recruiters and colleagues.</p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <BarChart className="h-8 w-8 text-blue-600" />
                  Analytics
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">Track who is visiting your portfolio and where they are coming from. (Coming Soon)</p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <Globe className="h-8 w-8 text-blue-600" />
                  Custom Domain
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">Connect your own custom domain to give your portfolio a professional touch. (Coming Soon)</p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <Feed className="h-8 w-8 text-blue-600" />
                  Blog Integration
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">Easily integrate your blog from platforms like Medium or dev.to. (Coming Soon)</p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <TemplatePreview />

      {/* Testimonials */}
      <section className="bg-gray-50 py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
                <p className="text-base font-semibold leading-7 text-blue-600">Testimonials</p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    What our users are saying
                </h2>
            </div>
            <div className="mx-auto mt-16 flow-root">
                <div className="-my-12 divide-y divide-gray-200">
                    <div className="py-12">
                        <div className="max-w-2xl mx-auto">
                            <blockquote className="text-xl font-semibold leading-8 tracking-tight text-gray-900">
                                <p>“This is the best portfolio generator I have ever used. It is so simple and easy to use. I created my portfolio in less than 10 minutes.”</p>
                            </blockquote>
                            <figcaption className="mt-8 flex items-center gap-x-4">
                                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" className="h-10 w-10 rounded-full" />
                                <div>
                                    <div className="font-semibold text-gray-900">Judith Black</div>
                                    <div className="text-gray-600">@judithblack</div>
                                </div>
                            </figcaption>
                        </div>
                    </div>
                    <div className="py-12">
                        <div className="max-w-2xl mx-auto">
                            <blockquote className="text-xl font-semibold leading-8 tracking-tight text-gray-900">
                                <p>“I was able to create a beautiful portfolio without any coding knowledge. I am so happy with the result.”</p>
                            </blockquote>
                            <figcaption className="mt-8 flex items-center gap-x-4">
                                <img src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" className="h-10 w-10 rounded-full" />
                                <div>
                                    <div className="font-semibold text-gray-900">Joseph Gray</div>
                                    <div className="text-gray-600">@josephgray</div>
                                </div>
                            </figcaption>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

      {/* CTA Section */}
      <section className="bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to get started?
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            It’s time to create a portfolio that truly represents you.
          </p>
          <div className="mt-10">
            <Link href="/generate" className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500">
              Create Your Portfolio Now
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;

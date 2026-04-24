"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage, auth } from '@/lib/firebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth';
import Link from 'next/link';

import ClassicTemplate from '@/components/templates/ClassicTemplate';
import ModernTemplate from '@/components/templates/ModernTemplate';
import CreativeTemplate from '@/components/templates/CreativeTemplate';
import CorporateTemplate from '@/components/templates/CorporateTemplate';
import MinimalistTemplate from '@/components/templates/MinimalistTemplate';
import TechTemplate from '@/components/templates/TechTemplate';

import { PortfolioData, Project, Experience } from '@/lib/types';

const templates = [
  { id: 'classic', name: 'Classic' },
  { id: 'modern', name: 'Modern' },
  { id: 'creative', name: 'Creative' },
  { id: 'corporate', name: 'Corporate' },
  { id: 'minimalist', name: 'Minimalist' },
  { id: 'tech', name: 'Tech' },
];

const Generate = () => {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState('Your Name');
  const [bio, setBio] = useState('A short and engaging bio about yourself.');
  const [skills, setSkills] = useState('React, Next.js, Tailwind CSS');
  const [projects, setProjects] = useState<Project[]>([{ title: 'Project 1', description: 'A brief description of your project.', link: '#', technologies: ['React', 'Next.js'] }]);
  const [experience, setExperience] = useState<Experience[]>([{ company: 'Tech Corp', title: 'Software Engineer', duration: 'Jan 2020 - Dec 2022', description: 'Developed and maintained web applications.' }]);
  const [contact, setContact] = useState({ email: 'your.email@example.com', linkedin: '', github: '', twitter: '' });
  const [template, setTemplate] = useState(templates[0].id);
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthChecked(true);
    });
    return () => unsubscribe();
  }, []);

  const handleProjectChange = (index: number, field: keyof Project, value: string | string[]) => {
    const newProjects = [...projects];
    (newProjects[index] as any)[field] = value;
    setProjects(newProjects);
  };

  const addProject = () => {
    setProjects([...projects, { title: '', description: '', link: '', technologies: [] }]);
  };

  const removeProject = (index: number) => {
    const newProjects = projects.filter((_, i) => i !== index);
    setProjects(newProjects);
  };

  const handleExperienceChange = (index: number, field: keyof Experience, value: string) => {
    const newExperience = [...experience];
    newExperience[index][field] = value;
    setExperience(newExperience);
  };

  const addExperience = () => {
    setExperience([...experience, { company: '', title: '', duration: '', description: '' }]);
  };

  const removeExperience = (index: number) => {
    const newExperience = experience.filter((_, i) => i !== index);
    setExperience(newExperience);
  };

  const handleContactChange = (field: keyof typeof contact, value: string) => {
    setContact({ ...contact, [field]: value });
  };
  
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoURL(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError('You must be logged in to create a portfolio.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      let uploadedPhotoURL = '';
      if (photo && user) {
        try {
          const storageRef = ref(storage, `photos/${user.uid}/${photo.name}`);
          await uploadBytes(storageRef, photo);
          uploadedPhotoURL = await getDownloadURL(storageRef);
        } catch (uploadError) {
          console.error("Photo upload failed:", uploadError);
          setError('Failed to upload photo. Please try a different image or try again later.');
          setLoading(false);
          return;
        }
      } else if (photoURL) {
        // If a photo was previously uploaded or selected, use its URL
        uploadedPhotoURL = photoURL;
      }

      try {
        const docRef = await addDoc(collection(db, 'portfolios'), {
          userId: user.uid,
          name,
          bio,
          skills: skills.split(',').map(skill => skill.trim()),
          projects,
          experience,
          contact,
          template,
          photoURL: uploadedPhotoURL,
          createdAt: new Date(),
        });
        router.push(`/u/${docRef.id}`);
      } catch (dbError) {
        console.error("Firestore write failed:", dbError);
        setError('Failed to save portfolio data. Please try again.');
      }

    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const portfolioData: PortfolioData = {
    name,
    bio,
    skills: skills.split(',').map(skill => skill.trim()),
    projects,
    experience,
    contact,
    photoURL: photoURL || '',
  };

  const renderTemplatePreview = () => {
    // The 'id' prop is a dummy value for preview purposes, as no ID exists yet.
    switch (template) {
      case 'classic':
        return <ClassicTemplate data={portfolioData} id="preview" />;
      case 'modern':
        return <ModernTemplate data={portfolioData} id="preview" />;
      case 'creative':
        return <CreativeTemplate data={portfolioData} id="preview" />;
      case 'corporate':
        return <CorporateTemplate data={portfolioData} id="preview" />;
      case 'minimalist':
        return <MinimalistTemplate data={portfolioData} id="preview" />;
      case 'tech':
        return <TechTemplate data={portfolioData} id="preview" />;
      default:
        return <p>Select a template to preview.</p>;
    }
  };

  if (!authChecked) {
    return <div className="text-center py-20">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Please log in to create a portfolio.</h2>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
        
        {/* Form Section */}
        <div className="lg:col-span-1">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Create Your Portfolio</h1>
            <p className="mt-4 text-lg text-gray-500">Fill in your details to generate a professional portfolio instantly.</p>
          </div>
          <form onSubmit={handleSubmit} className="bg-white p-8 shadow-xl rounded-lg space-y-8">
            
            {/* Template Selection */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">Choose a Template</h2>
              <div className="flex flex-wrap gap-4 border-4 border-red-500">
                {templates.map((t) => (
                  <div key={t.id} className="relative">
                    <div onClick={() => setTemplate(t.id)} className={`p-4 border-2 rounded-lg cursor-pointer text-center h-full flex items-center justify-center ${template === t.id ? 'border-blue-600 bg-blue-50' : 'border-gray-200'}`}>
                      <h3 className="font-semibold">{t.name}</h3>
                    </div>
                    <Link href={`/preview/${t.id}`} target="_blank" rel="noopener noreferrer" className="absolute top-2 right-2 text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full hover:bg-gray-300">
                      Preview
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Professional Summary</label>
                <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Key Skills / Strengths (comma-separated)</label>
                <input type="text" value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="e.g., Public Speaking, Project Management, Data Analysis" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required />
              </div>
            </div>

            {/* Experience Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">Experience</h2>
              {experience.map((exp, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-4 relative">
                  <h3 className="font-semibold text-lg">Experience {index + 1}</h3>
                  <input type="text" placeholder="Company Name" value={exp.company} onChange={(e) => handleExperienceChange(index, 'company', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required />
                  <input type="text" placeholder="Job Title" value={exp.title} onChange={(e) => handleExperienceChange(index, 'title', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required />
                  <input type="text" placeholder="Duration (e.g., Jan 2020 - Dec 2022)" value={exp.duration} onChange={(e) => handleExperienceChange(index, 'duration', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required />
                  <textarea placeholder="Key Responsibilities and Achievements" value={exp.description} onChange={(e) => handleExperienceChange(index, 'description', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required />
                  {experience.length > 1 && (
                    <button type="button" onClick={() => removeExperience(index)} className="absolute top-4 right-4 text-red-500 hover:text-red-700 font-semibold">Remove</button>
                  )}
                </div>
              ))}
              <button type="button" onClick={addExperience} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg">Add Another Experience</button>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">Projects / Accomplishments</h2>
              {projects.map((project, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-4 relative">
                  <h3 className="font-semibold text-lg">Accomplishment {index + 1}</h3>
                  <input type="text" placeholder="Title (e.g., 'Led a Successful Marketing Campaign')" value={project.title} onChange={(e) => handleProjectChange(index, 'title', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required />
                  <textarea placeholder="A brief description of the accomplishment and its impact." value={project.description} onChange={(e) => handleProjectChange(index, 'description', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required />
                  <input type="url" placeholder="Link to website, article, or other evidence" value={project.link} onChange={(e) => handleProjectChange(index, 'link', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                  <input type="text" placeholder="Tools / Software (comma-separated)" value={project.technologies.join(', ')} onChange={(e) => handleProjectChange(index, 'technologies', e.target.value.split(',').map(t => t.trim()))} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                  {projects.length > 1 && (
                    <button type="button" onClick={() => removeProject(index)} className="absolute top-4 right-4 text-red-500 hover:text-red-700 font-semibold">Remove</button>
                  )}
                </div>
              ))}
              <button type="button" onClick={addProject} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg">Add Another Project</button>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">Contact Info</h2>
              <input type="email" placeholder="Email" value={contact.email} onChange={(e) => handleContactChange('email', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required />
              <input type="url" placeholder="LinkedIn Profile URL" value={contact.linkedin} onChange={(e) => handleContactChange('linkedin', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              <input type="url" placeholder="GitHub Profile URL" value={contact.github} onChange={(e) => handleContactChange('github', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              <input type="url" placeholder="Twitter Profile URL" value={contact.twitter} onChange={(e) => handleContactChange('twitter', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Profile Photo</label>
              <input type="file" onChange={handlePhotoChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300 disabled:bg-blue-300">
              {loading ? 'Generating...' : 'Generate My Portfolio'}
            </button>
          </form>
        </div>

        {/* Preview Section */}
        <div className="lg:col-span-1 rounded-lg shadow-xl overflow-hidden bg-white">
          <div className="p-4 bg-gray-100 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">Live Preview</h2>
          </div>
          <div className="p-4">
            {renderTemplatePreview()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generate;

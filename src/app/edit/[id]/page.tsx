"use client";
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage, auth } from '@/lib/firebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth';

interface Project {
  title: string;
  description: string;
  link: string;
}

const templates = [
  { id: 'classic', name: 'Classic Professional' },
  { id: 'modern', name: 'Modern Minimalist' },
  { id: 'creative', name: 'Creative Bold' },
];

const EditPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [skills, setSkills] = useState('');
  const [projects, setProjects] = useState<Project[]>([{ title: '', description: '', link: '' }]);
  const [contact, setContact] = useState({ email: '', linkedin: '', github: '', twitter: '' });
  const [template, setTemplate] = useState(templates[0].id);
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoURL, setPhotoURL] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push('/');
      } else {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (user && id) {
      const fetchPortfolio = async () => {
        setLoading(true);
        const docRef = doc(db, 'portfolios', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.userId !== user.uid) {
            setError("You don't have permission to edit this portfolio.");
            return;
          }
          setName(data.name);
          setBio(data.bio);
          setSkills(data.skills.join(', '));
          setProjects(data.projects);
          setContact(data.contact);
          setTemplate(data.template);
          setPhotoURL(data.photoURL);
        } else {
          setError("Portfolio not found.");
        }
        setLoading(false);
      };
      fetchPortfolio();
    }
  }, [user, id]);

  const handleProjectChange = (index: number, field: keyof Project, value: string) => {
    const newProjects = [...projects];
    newProjects[index][field] = value;
    setProjects(newProjects);
  };

  const addProject = () => {
    setProjects([...projects, { title: '', description: '', link: '' }]);
  };

  const removeProject = (index: number) => {
    const newProjects = projects.filter((_, i) => i !== index);
    setProjects(newProjects);
  };

  const handleContactChange = (field: keyof typeof contact, value: string) => {
    setContact({ ...contact, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError('You must be logged in.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      let finalPhotoURL = photoURL;
      if (photo) {
        const storageRef = ref(storage, `photos/${user.uid}/${photo.name}`);
        await uploadBytes(storageRef, photo);
        finalPhotoURL = await getDownloadURL(storageRef);
      }

      const docRef = doc(db, 'portfolios', id);
      await updateDoc(docRef, {
        name,
        bio,
        skills: skills.split(',').map(skill => skill.trim()),
        projects,
        contact,
        template,
        photoURL: finalPhotoURL,
      });

      router.push(`/dashboard`);
    } catch (err) {
      setError('Failed to update portfolio. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;
  if (!user) return null;

  return (
     <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Edit Your Portfolio</h1>
        </div>
        <form onSubmit={handleSubmit} className="mt-12 bg-white p-8 shadow-xl rounded-lg space-y-8">
          
          {/* Template Selection */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">Choose a Template</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {templates.map((t) => (
                <div key={t.id} onClick={() => setTemplate(t.id)} className={`p-4 border-2 rounded-lg cursor-pointer text-center ${template === t.id ? 'border-blue-600 bg-blue-50' : 'border-gray-200'}`}>
                  <h3 className="font-semibold">{t.name}</h3>
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
              <label className="block text-sm font-medium text-gray-700">Bio / About</label>
              <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Skills (comma-separated)</label>
              <input type="text" value={skills} onChange={(e) => setSkills(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required />
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Projects</h2>
            {projects.map((project, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-4 relative">
                <h3 className="font-semibold text-lg">Project {index + 1}</h3>
                <input type="text" placeholder="Project Title" value={project.title} onChange={(e) => handleProjectChange(index, 'title', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required />
                <textarea placeholder="Project Description" value={project.description} onChange={(e) => handleProjectChange(index, 'description', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required />
                <input type="url" placeholder="Project Link" value={project.link} onChange={(e) => handleProjectChange(index, 'link', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required />
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
            <input type="file" onChange={(e) => setPhoto(e.target.files ? e.target.files[0] : null)} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
            {photoURL && !photo && <img src={photoURL} alt="Current" className="w-20 h-20 rounded-md mt-2"/>}
          </div>

          <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300 disabled:bg-blue-300">
            {loading ? 'Updating...' : 'Update Portfolio'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPage;

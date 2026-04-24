import { Mail, Linkedin, Github, ExternalLink, Briefcase, Code } from 'lucide-react';
import { PortfolioData } from '@/lib/types';

const TechTemplate = ({ data, id }: { data: PortfolioData, id: string }) => {
  if (!data) return null;
  const { name, bio, skills, projects, experience, contact, photoURL } = data;

  return (
    <div className="font-mono bg-gray-900 text-gray-300 min-h-screen p-4 sm:p-8">
      <div className="max-w-5xl mx-auto border border-blue-500/30 shadow-2xl shadow-blue-500/10 rounded-lg overflow-hidden">
        
        <header className="p-8 text-center bg-gray-900/50">
          {photoURL && <img src={photoURL} alt={name} className="w-32 h-32 rounded-full mx-auto mb-6 ring-2 ring-blue-500" />}
          <h1 className="text-5xl font-bold text-white tracking-wider">{name}</h1>
          <p className="mt-4 text-lg text-blue-300">{bio}</p>
          <div className="flex justify-center items-center space-x-6 mt-6 text-sm text-blue-400">
            {contact.email && <a href={`mailto:${contact.email}`} className="hover:text-blue-200 transition-colors">{contact.email}</a>}
            {contact.linkedin && <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 transition-colors">LinkedIn</a>}
            {contact.github && <a href={contact.github} target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 transition-colors">GitHub</a>}
          </div>
        </header>

        <main className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Left Column */}
          <div className="md:col-span-1 space-y-8">
            <section>
              <h2 className="text-xl font-bold text-blue-400 uppercase tracking-widest mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills && skills.map(skill => (
                  <span key={skill} className="bg-blue-900/50 text-blue-300 border border-blue-700 px-3 py-1 rounded text-sm">{skill}</span>
                ))}
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-blue-400 uppercase tracking-widest mb-4">Experience</h2>
              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <div key={index} className="border-l-2 border-blue-500/30 pl-4">
                    <p className="text-sm text-gray-400">{exp.duration}</p>
                    <h3 className="text-lg font-semibold text-white">{exp.title}</h3>
                    <p className="font-medium text-gray-300">{exp.company}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="md:col-span-2">
            <section>
              <h2 className="text-xl font-bold text-blue-400 uppercase tracking-widest mb-4">Projects</h2>
              <div className="space-y-6">
                {projects.map(project => (
                  <div key={project.title} className="bg-gray-800/50 p-4 rounded border border-gray-700">
                    <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                    <p className="mt-1 text-sm text-gray-400">{project.description}</p>
                    {project.technologies && project.technologies.length > 0 && (
                        <p className="text-xs text-blue-400 mt-2">
                            {project.technologies.join(' · ')}
                        </p>
                    )}
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline text-sm mt-2 inline-flex items-center">
                        View Project <ExternalLink className="ml-1 w-4 h-4" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
        <footer className="text-center p-4 border-t border-blue-500/30">
            <a href={`/resume/${id}`} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-400 hover:underline">
                View Printable Resume
            </a>
        </footer>
      </div>
    </div>
  );
};

export default TechTemplate;

import { Mail, Linkedin, Github, ExternalLink } from 'lucide-react';
import { PortfolioData } from '@/lib/types';

const MinimalistTemplate = ({ data, id }: { data: PortfolioData, id: string }) => {
  if (!data) return null;
  const { name, bio, skills, projects, experience, contact, photoURL } = data;

  return (
    <div className="bg-white font-serif text-gray-800">
      <div className="max-w-3xl mx-auto p-8 md:p-16">
        
        <header className="mb-16">
          <h1 className="text-6xl font-normal tracking-wider mb-4">{name}</h1>
          <p className="text-lg text-gray-600 leading-relaxed">{bio}</p>
          <div className="flex items-center space-x-6 mt-6 text-sm text-gray-500">
            {contact.email && <a href={`mailto:${contact.email}`} className="hover:underline">{contact.email}</a>}
            {contact.linkedin && <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>}
            {contact.github && <a href={contact.github} target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>}
          </div>
        </header>

        <main className="space-y-12">
          {experience && experience.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold tracking-widest uppercase border-b pb-2 mb-6">Experience</h2>
              <div className="space-y-8">
                {experience.map((exp, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-xl font-medium">{exp.company}</h3>
                      <p className="text-sm text-gray-500">{exp.duration}</p>
                    </div>
                    <p className="text-md text-gray-600">{exp.title}</p>
                    <p className="mt-1 text-gray-600 leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {projects && projects.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold tracking-widest uppercase border-b pb-2 mb-6">Projects / Accomplishments</h2>
              <div className="space-y-8">
                {projects.map(project => (
                  <div key={project.title}>
                    <h3 className="text-xl font-medium">{project.title}</h3>
                    <p className="mt-1 text-gray-600 leading-relaxed">{project.description}</p>
                    {project.technologies && project.technologies.length > 0 && (
                        <p className="text-sm text-gray-500 mt-2">
                            Tools: {project.technologies.join(', ')}
                        </p>
                    )}
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm mt-1 inline-flex items-center">
                        View Link <ExternalLink className="ml-1 w-3 h-3" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {skills && skills.length > 0 && (
             <section>
                <h2 className="text-sm font-semibold tracking-widest uppercase border-b pb-2 mb-6">Skills</h2>
                <p className="text-gray-600 leading-relaxed">
                    {skills.join(' · ')}
                </p>
             </section>
          )}
        </main>
        
        <footer className="text-center mt-16 pt-8 border-t">
            <a href={`/resume/${id}`} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:underline">
                View Printer-Friendly Resume
            </a>
        </footer>
      </div>
    </div>
  );
};

export default MinimalistTemplate;

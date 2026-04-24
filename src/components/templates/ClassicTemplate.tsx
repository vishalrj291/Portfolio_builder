import { Mail, Linkedin, Github, Twitter, ExternalLink } from 'lucide-react';

import { PortfolioData } from '@/lib/types';

const ClassicTemplate = ({ data, id }: { data: PortfolioData, id: string }) => {
  if (!data) return null;
  const { name, bio, skills, projects, experience, contact, photoURL } = data;

  return (
    <div className="font-serif bg-white text-gray-800">
      <div className="max-w-4xl mx-auto p-8 md:p-12">
        <header className="text-center mb-16">
          {photoURL && <img src={photoURL} alt={name} className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-gray-200 shadow-lg" />}
          <h1 className="text-6xl font-bold text-gray-900">{name}</h1>
          <p className="text-xl mt-4 text-gray-600">{bio}</p>
        </header>

        <section className="mb-12">
          <h2 className="text-4xl font-bold text-center pb-2 mb-8">Key Skills</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {skills && skills.map(skill => (
              <span key={skill} className="bg-gray-200 text-gray-800 px-5 py-2 rounded-full text-lg shadow-sm">{skill}</span>
            ))}
          </div>
        </section>

        {experience && experience.length > 0 && (
          <section className="mb-12">
            <h2 className="text-4xl font-bold text-center pb-2 mb-8">Work Experience</h2>
            <div className="space-y-8">
              {experience.map((exp, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{exp.title}</h3>
                      <p className="text-lg font-semibold text-gray-700">{exp.company}</p>
                    </div>
                    <p className="text-gray-600 italic text-sm">{exp.duration}</p>
                  </div>
                  <p className="mt-4 text-gray-700">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="mb-12">
          <h2 className="text-4xl font-bold text-center pb-2 mb-8">Projects / Accomplishments</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects && projects.map(project => (
               <div key={project.title} className="bg-gray-50 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
                <h3 className="text-2xl font-bold text-gray-900">{project.title}</h3>
                <p className="mt-2 text-gray-700 h-24 overflow-y-auto">{project.description}</p>
                <div className="mt-4">
                  {project.technologies && project.technologies.length > 0 && (
                    <>
                      <h4 className="font-bold text-sm mb-2">Tools Used:</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map(tech => (
                          <span key={tech} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md text-xs font-medium">{tech}</span>
                        ))}
                      </div>
                    </>
                  )}
                </div>
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline mt-4 inline-flex items-center">
                    View Project <ExternalLink className="ml-2 w-4 h-4" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        <footer className="text-center border-t-2 border-gray-200 pt-10 mt-12">
          <h2 className="text-3xl font-bold mb-6">Contact</h2>
          <div className="flex justify-center items-center space-x-8 mb-8">
            {contact && contact.email && <a href={`mailto:${contact.email}`} className="text-gray-600 hover:text-blue-600"><Mail className="w-8 h-8" /></a>}
            {contact && contact.linkedin && <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600"><Linkedin className="w-8 h-8" /></a>}
            {contact && contact.github && <a href={contact.github} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600"><Github className="w-8 h-8" /></a>}
            {contact && contact.twitter && <a href={contact.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600"><Twitter className="w-8 h-8" /></a>}
          </div>
          <a href={`/resume/${id}`} target="_blank" rel="noopener noreferrer" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105 inline-block">
            Download Resume
          </a>
        </footer>
      </div>
    </div>
  );
};

export default ClassicTemplate;
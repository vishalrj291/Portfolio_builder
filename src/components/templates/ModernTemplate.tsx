import { Mail, Linkedin, Github, Twitter, ExternalLink, Briefcase, Code } from 'lucide-react';

import { PortfolioData } from '@/lib/types';

const ModernTemplate = ({ data, id }: { data: PortfolioData, id: string }) => {
  if (!data) return null;
  const { name, bio, skills, projects, experience, contact, photoURL } = data;

  return (
    <div className="font-sans bg-gray-50 text-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-screen">
          
          {/* Left Sidebar */}
          <div className="md:col-span-4 bg-gray-800 text-white p-8">
            <div className="sticky top-8 text-center">
              {photoURL && <img src={photoURL} alt={name} className="w-36 h-36 rounded-full mx-auto mb-6 border-4 border-blue-400 shadow-lg" />}
              <h1 className="text-4xl font-bold">{name}</h1>
              <p className="text-lg mt-3 text-gray-300">{bio}</p>
              
              <div className="mt-10 text-left space-y-4">
                <h3 className="text-xl font-semibold mb-4 border-b border-gray-600 pb-2">Contact</h3>
                {contact && contact.email && <a href={`mailto:${contact.email}`} className="flex items-center text-gray-300 hover:text-blue-400"><Mail className="w-5 h-5 mr-3" /><span>{contact.email}</span></a>}
                {contact && contact.linkedin && <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-300 hover:text-blue-400"><Linkedin className="w-5 h-5 mr-3" /><span>LinkedIn</span></a>}
                {contact && contact.github && <a href={contact.github} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-300 hover:text-blue-400"><Github className="w-5 h-5 mr-3" /><span>GitHub</span></a>}
                {contact && contact.twitter && <a href={contact.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-300 hover:text-blue-400"><Twitter className="w-5 h-5 mr-3" /><span>Twitter</span></a>}
              </div>
              <div className="mt-10">
                <a href={`/resume/${id}`} target="_blank" rel="noopener noreferrer" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105 inline-block w-full text-center">
                  Download Resume
                </a>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-8 p-10">
            {experience && experience.length > 0 && (
              <section className="mb-12">
                <h2 className="text-4xl font-extrabold text-gray-900 mb-8 flex items-center"><Briefcase className="w-8 h-8 mr-4 text-blue-600" /> Experience</h2>
                <div className="space-y-8 relative border-l-2 border-gray-200 pl-8">
                  {experience.map((exp, index) => (
                    <div key={index} className="relative">
                      <div className="absolute -left-10 h-4 w-4 bg-blue-600 rounded-full top-1.5"></div>
                      <p className="absolute right-0 text-sm text-gray-500">{exp.duration}</p>
                      <h3 className="text-2xl font-bold">{exp.title}</h3>
                      <p className="text-lg font-semibold text-gray-700">{exp.company}</p>
                      <p className="mt-2 text-gray-600">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="mb-12">
              <h2 className="text-4xl font-extrabold text-gray-900 mb-8 flex items-center"><Code className="w-8 h-8 mr-4 text-blue-600" /> Key Skills</h2>
              <div className="flex flex-wrap gap-4">
                {skills && skills.map(skill => (
                  <span key={skill} className="bg-blue-100 text-blue-800 px-4 py-2 rounded-md text-md font-semibold shadow-sm">{skill}</span>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-4xl font-extrabold text-gray-900 mb-8">Projects / Accomplishments</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {projects && projects.map(project => (
                  <div key={project.title} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col">
                    <h3 className="text-2xl font-bold">{project.title}</h3>
                    <p className="mt-3 text-gray-600 flex-grow h-20 overflow-y-auto">{project.description}</p>
                    <div className="mt-4">
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map(tech => (
                            <span key={tech} className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-xs font-semibold">{tech}</span>
                          ))}
                        </div>
                      )}
                    </div>
                    {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline mt-4 inline-flex items-center font-semibold self-start">View Project <ExternalLink className="ml-2 w-4 h-4" /></a>}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;
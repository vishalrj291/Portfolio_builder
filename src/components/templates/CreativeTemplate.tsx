import { Mail, Linkedin, Github, Twitter, ExternalLink, Award, Briefcase } from 'lucide-react';

import { PortfolioData } from '@/lib/types';

const CreativeTemplate = ({ data, id }: { data: PortfolioData, id: string }) => {
  if (!data) return null;
  const { name, bio, skills, projects, experience, contact, photoURL } = data;

  return (
    <div className="font-sans bg-gray-900 text-white min-h-screen">
      <div className="max-w-5xl mx-auto p-8 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-gradient-to-br from-purple-600 to-blue-500 rounded-full opacity-20 blur-3xl"></div>
        <div className="relative z-10">
          <header className="text-center mb-20">
            {photoURL && <img src={photoURL} alt={name} className="w-40 h-40 rounded-full mx-auto mb-6 border-4 border-purple-400 shadow-2xl" />}
            <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 py-2">{name}</h1>
            <p className="text-xl mt-4 max-w-3xl mx-auto text-gray-300">{bio}</p>
          </header>

          <section className="mb-20">
            <h2 className="text-4xl font-bold text-center mb-10 flex items-center justify-center"><Award className="w-10 h-10 mr-4 text-purple-400"/> Key Skills</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {skills && skills.map(skill => (
                <span key={skill} className="bg-gray-800 border border-gray-700 text-white px-6 py-2 rounded-full font-semibold text-lg shadow-lg hover:bg-purple-500 hover:border-purple-500 transition-all">{skill}</span>
              ))}
            </div>
          </section>

          {experience && experience.length > 0 && (
            <section className="mb-20">
              <h2 className="text-4xl font-bold text-center mb-12 flex items-center justify-center"><Briefcase className="w-10 h-10 mr-4 text-purple-400"/> Experience</h2>
              <div className="space-y-10 max-w-3xl mx-auto">
                {experience.map((exp, index) => (
                  <div key={index} className="bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-gray-700 p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform hover:border-purple-500">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-2xl font-bold text-purple-400">{exp.title}</h3>
                      <span className="text-gray-400 italic text-sm">{exp.duration}</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-300">{exp.company}</p>
                    <p className="mt-3 text-gray-400">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section>
            <h2 className="text-4xl font-bold text-center mb-12">Projects / Accomplishments</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {projects && projects.map(project => (
                <div key={project.title} className="bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-gray-700 p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform hover:border-purple-500 flex flex-col">
                  <h3 className="text-2xl font-bold text-purple-400">{project.title}</h3>
                  <p className="mt-3 text-gray-400 flex-grow h-24 overflow-y-auto">{project.description}</p>
                  <div className="mt-4">
                    {project.technologies && project.technologies.length > 0 && (
                      <>
                        <h4 className="font-bold text-sm mb-2 text-purple-300">Tools Used:</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map(tech => (
                            <span key={tech} className="bg-gray-700 text-purple-300 px-2 py-1 rounded-md text-xs font-medium">{tech}</span>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline mt-4 inline-flex items-center font-semibold self-start">
                      Explore <ExternalLink className="ml-2 w-4 h-4" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>

          <footer className="text-center mt-24 pt-10 border-t border-gray-800">
            <h2 className="text-3xl font-bold mb-6">Let's Connect</h2>
            <div className="flex justify-center items-center space-x-8">
              {contact && contact.email && <a href={`mailto:${contact.email}`} className="text-gray-400 hover:text-purple-400 transition-colors"><Mail className="w-9 h-9" /></a>}
              {contact && contact.linkedin && <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors"><Linkedin className="w-9 h-9" /></a>}
              {contact && contact.github && <a href={contact.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors"><Github className="w-9 h-9" /></a>}
              {contact && contact.twitter && <a href={contact.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors"><Twitter className="w-9 h-9" /></a>}
            </div>
            <div className="mt-10">
              <a href={`/resume/${id}`} target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-full transition-transform transform hover:scale-105 inline-block shadow-lg">
                Download Resume
              </a>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default CreativeTemplate;
import { Mail, Linkedin, Github, Briefcase, Award, ExternalLink } from 'lucide-react';
import { PortfolioData } from '@/lib/types';

const CorporateTemplate = ({ data, id }: { data: PortfolioData, id: string }) => {
  if (!data) return null;
  const { name, bio, skills, projects, experience, contact, photoURL } = data;

  return (
    <div className="bg-gray-100 font-sans">
      <div className="max-w-5xl mx-auto my-10 bg-white shadow-lg">
        {/* Header */}
        <header className="bg-slate-800 text-white p-10 flex flex-col md:flex-row items-center">
          {photoURL && (
            <img src={photoURL} alt={name} className="w-32 h-32 rounded-full border-4 border-slate-500 mr-8" />
          )}
          <div>
            <h1 className="text-5xl font-bold tracking-tight">{name}</h1>
            <p className="text-xl mt-2 text-slate-300">Professional Summary</p>
          </div>
        </header>

        <main className="p-10">
          <p className="text-gray-700 text-lg mb-10">{bio}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Main Content */}
            <div className="md:col-span-2">
              {experience && experience.length > 0 && (
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-slate-300 pb-2 mb-4 flex items-center">
                    <Briefcase className="mr-3" /> Experience
                  </h2>
                  <div className="space-y-6">
                    {experience.map((exp, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-baseline">
                          <h3 className="text-lg font-semibold">{exp.title}</h3>
                          <p className="text-sm text-gray-600">{exp.duration}</p>
                        </div>
                        <p className="font-medium text-gray-700">{exp.company}</p>
                        <p className="mt-1 text-sm text-gray-600">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {projects && projects.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-slate-300 pb-2 mb-4 flex items-center">
                    <Award className="mr-3" /> Projects / Accomplishments
                  </h2>
                  <div className="space-y-6">
                    {projects.map(project => (
                      <div key={project.title}>
                        <h3 className="text-lg font-semibold">{project.title}</h3>
                        <p className="mt-1 text-sm text-gray-600">{project.description}</p>
                        {project.technologies && project.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {project.technologies.map(tech => (
                              <span key={tech} className="bg-slate-200 text-slate-800 px-2 py-1 rounded text-xs">{tech}</span>
                            ))}
                          </div>
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
            </div>

            {/* Sidebar */}
            <div className="md:col-span-1">
              <aside>
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-slate-300 pb-2 mb-4">
                    Contact
                  </h2>
                  <div className="space-y-3 text-gray-700">
                    {contact.email && <a href={`mailto:${contact.email}`} className="flex items-center hover:text-blue-600"><Mail className="w-4 h-4 mr-3" />{contact.email}</a>}
                    {contact.linkedin && <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-blue-600"><Linkedin className="w-4 h-4 mr-3" />LinkedIn</a>}
                    {contact.github && <a href={contact.github} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-blue-600"><Github className="w-4 h-4 mr-3" />GitHub</a>}
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-slate-300 pb-2 mb-4">
                    Key Skills
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {skills && skills.map(skill => (
                      <span key={skill} className="bg-slate-200 text-slate-800 px-3 py-1 rounded-md">{skill}</span>
                    ))}
                  </div>
                </section>

                <section className="mt-8">
                    <a href={`/resume/${id}`} target="_blank" rel="noopener noreferrer" className="bg-slate-700 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded w-full inline-block text-center">
                        Download Resume
                    </a>
                </section>

              </aside>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CorporateTemplate;

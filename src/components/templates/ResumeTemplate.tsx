import { Mail, Linkedin, Github, Phone } from 'lucide-react';
import { PortfolioData } from '@/lib/types';

const ResumeTemplate = ({ data }: { data: PortfolioData }) => {
  if (!data) return null;
  const { name, bio, skills, projects, experience, contact } = data;

  return (
    <div className="bg-white text-black font-sans">
      <div className="max-w-4xl mx-auto p-8 sm:p-12">
        <header className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-gray-800">{name}</h1>
          <div className="flex justify-center items-center flex-wrap gap-x-6 gap-y-2 mt-4 text-gray-600">
            {contact.email && (
              <a href={`mailto:${contact.email}`} className="flex items-center hover:text-blue-600">
                <Mail className="w-4 h-4 mr-2" />
                {contact.email}
              </a>
            )}
            {contact.linkedin && (
              <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-blue-600">
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn
              </a>
            )}
            {contact.github && (
              <a href={contact.github} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-blue-600">
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </a>
            )}
          </div>
          <p className="text-lg mt-6 text-gray-700 text-left border-t pt-6">{bio}</p>
        </header>

        <section className="mb-8">
          <h2 className="text-2xl font-bold border-b-2 border-gray-300 pb-2 mb-4 text-gray-800">Key Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills && skills.map(skill => (
              <span key={skill} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-md text-sm">{skill}</span>
            ))}
          </div>
        </section>

        {experience && experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold border-b-2 border-gray-300 pb-2 mb-4 text-gray-800">Experience</h2>
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-xl font-semibold text-gray-900">{exp.title}</h3>
                    <p className="text-gray-600 text-sm font-medium">{exp.duration}</p>
                  </div>
                  <p className="text-lg font-medium text-gray-700">{exp.company}</p>
                  <p className="mt-1 text-gray-700">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="text-2xl font-bold border-b-2 border-gray-300 pb-2 mb-4 text-gray-800">Projects / Accomplishments</h2>
          <div className="space-y-6">
            {projects && projects.map(project => (
               <div key={project.title}>
                <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
                <p className="mt-1 text-gray-700">{project.description}</p>
                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.technologies.map(tech => (
                      <span key={tech} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-semibold">{tech}</span>
                    ))}
                  </div>
                )}
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm mt-1 inline-block">
                    View Project Link
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default ResumeTemplate;

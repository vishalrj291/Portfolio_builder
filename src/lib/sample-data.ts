import { PortfolioData } from './types';

export const sampleData: PortfolioData = {
  name: 'John Doe',
  bio: 'A passionate developer who loves to build things for the web.',
  skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Firebase'],
  projects: [
    {
      title: 'Project One',
      description: 'A brief description of project one.',
      link: '#',
      technologies: ['React', 'Node.js'],
    },
    {
      title: 'Project Two',
      description: 'A brief description of project two.',
      link: '#',
      technologies: ['Next.js', 'Firebase'],
    },
  ],
  experience: [
    {
      company: 'Tech Corp',
      title: 'Software Engineer',
      duration: '2022 - Present',
      description: 'Working on the next generation of web applications.'
    },
    {
      company: 'Startup Inc.',
      title: 'Frontend Developer',
      duration: '2020 - 2022',
      description: 'Developed and maintained the company\'s main product.'
    }
  ],
  contact: {
    email: 'john.doe@example.com',
    linkedin: 'https://www.linkedin.com/in/johndoe',
    github: 'https://github.com/johndoe',
    twitter: 'https://twitter.com/johndoe',
  },
  photoURL: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};
export interface ProjectTech {
  name: string;
  icon: string;
}

export interface ProjectScreenshot {
  image: string;
  alt: string;
  title: string;
  description: string;
}

export interface ProjectLinks {
  github?: string;
  demo?: string;
}

export interface ProjectDetails {
  heroImage: string;
  heroAlt: string;
  role: string;
  platform: string;
  features: string[];
  techStack: ProjectTech[];
  description: string;
  links: ProjectLinks;
  screenshots: ProjectScreenshot[];
}

export interface Project {
  id: string;
  name: string;
  summary: string;
  thumbnail: string;
  thumbnailAlt: string;
  featuredTechStack: ProjectTech[];
  teamSize: number;
  duration: string;
  details: ProjectDetails;
}

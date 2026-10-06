export interface IProject {
  _id?: string;
  title: string;
  description?: string;
  imageUrl?: string;
  projectUrl?: string;
  githubUrl?: string;
  tags?: string[];
  featured?: boolean;
  isDeleted?: boolean;
}

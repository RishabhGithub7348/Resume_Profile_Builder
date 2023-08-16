export interface PostContextType {
    aboutData: any;
    setAboutData: React.Dispatch<React.SetStateAction<any>>;
    user: any;
    skills: any[];
    setSkills: React.Dispatch<React.SetStateAction<any[]>>;
    setUser: React.Dispatch<React.SetStateAction<any>>;
    certification: any;
    experience: any;
    education: any[];
  }
  
  declare module "path-to-your-PostContext.js-file" {
    const PostContext: React.Context<PostContextType>;
    export default PostContext;
  }

interface TechType {
  _ref: string;
  _type: string;
}

interface Asset {
  path: string;
  url: string;
}

interface TechType {
  techType: string;
}

interface Techlogo {
  _type: string;
  asset: Asset;
}

interface Tech {
  _createdAt: Date;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: Date;
  description: string;
  link: string;
  techlogo: Techlogo;
  title: string;
  techType: TechType[];
}



interface ScreenSize {
  height: number | undefined,
  width: number | undefined
}

declare module WorkDocument {

  export interface Child {
      _key: string;
      _type: string;
      marks: any[];
      text: string;
  }

  export interface Description {
      _key: string;
      _type: string;
      children: Child[];
      markDefs: any[];
      style: string;
  }

  export interface Asset {
      _ref: string;
      _type: string;
  }

  export interface MainImage {
      _type: string;
      asset: Asset;
  }

  export interface Slug {
      _type: string;
      current: string;
  }

  export interface Tech {
    _createdAt: Date;
    _id: string;
    _rev: string;
    _type: string;
    _updatedAt: Date;
    description: string;
    link: string;
    title: string;
  }

  export interface Asset2 {
      _ref: string;
      _type: string;
  }

  export interface VideoDesktop {
      _type: string;
      asset: Asset2;
      url: string;
      path: string;
  }

  export interface Asset3 {
      _ref: string;
      _type: string;
  }

  export interface VideoMobile {
      _type: string;
      asset: Asset3;
  }

  export interface RootObject {
      _createdAt: Date;
      _id: string;
      _rev: string;
      _type: string;
      _updatedAt: Date;
      deployUrl: string;
      description: Description[];
      githubRepositoryLink: string;
      mainImage: MainImage;
      projectColor: string;
      slug: Slug;
      tech: Tech[];
      title: string;
      videoDesktop: VideoDesktop;
      videoMobile: VideoMobile;
  }

}


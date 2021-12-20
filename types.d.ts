
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
  export interface ImageDescription {
      _key: string;
      _type: "image";
      children: Child[];
      markDefs: any[];
      style: string;
      asset: BlockContentImage.RootObject;
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
      url: string;
      path: string;
  }

  export interface VideoDesktop {
      _type: string;
      asset: Asset2;
  }

  export interface Asset3 {
      _ref: string;
      _type: string;
      url: string;
      path: string;
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
      description: (Description| ImageDescription)[];
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

declare module BlockContentImage {

  export interface Dimensions {
      _type: string;
      aspectRatio: number;
      height: number;
      width: number;
  }

  export interface DarkMuted {
      _type: string;
      background: string;
      foreground: string;
      population: number;
      title: string;
  }

  export interface DarkVibrant {
      _type: string;
      background: string;
      foreground: string;
      population: number;
      title: string;
  }

  export interface Dominant {
      _type: string;
      background: string;
      foreground: string;
      population: number;
      title: string;
  }

  export interface LightMuted {
      _type: string;
      background: string;
      foreground: string;
      population: number;
      title: string;
  }

  export interface LightVibrant {
      _type: string;
      background: string;
      foreground: string;
      population: number;
      title: string;
  }

  export interface Muted {
      _type: string;
      background: string;
      foreground: string;
      population: number;
      title: string;
  }

  export interface Vibrant {
      _type: string;
      background: string;
      foreground: string;
      population: number;
      title: string;
  }

  export interface Palette {
      _type: string;
      darkMuted: DarkMuted;
      darkVibrant: DarkVibrant;
      dominant: Dominant;
      lightMuted: LightMuted;
      lightVibrant: LightVibrant;
      muted: Muted;
      vibrant: Vibrant;
  }

  export interface Metadata {
      _type: string;
      blurHash: string;
      dimensions: Dimensions;
      hasAlpha: boolean;
      isOpaque: boolean;
      lqip: string;
      palette: Palette;
  }

  export interface RootObject {
      _createdAt: Date;
      _id: string;
      _rev: string;
      _type: string;
      _updatedAt: Date;
      assetId: string;
      extension: string;
      metadata: Metadata;
      mimeType: string;
      originalFilename: string;
      path: string;
      sha1hash: string;
      size: number;
      uploadId: string;
      url: string;
  }

}


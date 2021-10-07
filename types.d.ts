
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
  techType: TechType;
  techlogo: Techlogo;
  title: string;
  techType: TechType;
}


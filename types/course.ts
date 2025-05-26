export interface Tag {
  id: number;
  name: string;
}

export interface ImageFormat {
  url: string;
}

export interface ImageData {
  formats?: {
    medium?: ImageFormat;
    thumbnail?: ImageFormat;
  };
  url?: string;
}

export interface Course {
  id: number;
  title: string;
  shortDescription: string;
  slug: string;
  image?: ImageData[];
  tags?: Tag[];
  level: string;
  duration: string;
  price: number;
} 

export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  category: 'Hair' | 'Beauty' | 'Nails' | 'Skin';
  image: string;
}

export interface GalleryItem {
  id: string;
  image: string;
  title: string;
  tag: string;
}

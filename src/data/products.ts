export type Category = "Kebaya";

export type Product = {
  id: string;
  name: string;
  category: Category;
  description?: string;
  material?: string;
  /** Rendered verbatim, so write "Mulai Rp450.000", not "450000". */
  priceLabel?: string;
  sizes?: string[];
  images: string[];
  featured: boolean;
};

export const categories: Category[] = ["Kebaya"];

// ponytail: plain array; swap for an API fetch only when products move server-side.
export const products: Product[] = [
  {
    id: "kebaya-01",
    name: "Kebaya 01",
    category: "Kebaya",
    description: "Koleksi kebaya rental Kebayaku by Raf.",
    images: ["/kebaya/1.webp"],
    featured: true,
  },
  {
    id: "kebaya-02",
    name: "Kebaya 02",
    category: "Kebaya",
    description: "Koleksi kebaya rental Kebayaku by Raf.",
    images: ["/kebaya/2.webp"],
    featured: true,
  },
  {
    id: "kebaya-03",
    name: "Kebaya 03",
    category: "Kebaya",
    description: "Koleksi kebaya rental Kebayaku by Raf.",
    images: ["/kebaya/3.webp"],
    featured: true,
  },
  {
    id: "kebaya-04",
    name: "Kebaya 04",
    category: "Kebaya",
    description: "Koleksi kebaya rental Kebayaku by Raf.",
    images: ["/kebaya/4.webp"],
    featured: true,
  },
  {
    id: "kebaya-05",
    name: "Kebaya 05",
    category: "Kebaya",
    description: "Koleksi kebaya rental Kebayaku by Raf.",
    images: ["/kebaya/5.webp"],
    featured: false,
  },
  {
    id: "kebaya-06",
    name: "Kebaya 06",
    category: "Kebaya",
    description: "Koleksi kebaya rental Kebayaku by Raf.",
    images: ["/kebaya/6.webp"],
    featured: false,
  },
];

export const featuredProducts = products.filter((p) => p.featured);

export const getProduct = (id: string) => products.find((p) => p.id === id);

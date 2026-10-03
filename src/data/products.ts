export type Category =
  | "Koloses"
  | "Kolos Modern"
  | "Baju Kurung"
  | "Jarik"
  | "Blangkon";

export type Product = {
  id: string;
  name: string;
  category: Category;
  description: string;
  material: string;
  /**
   * Shown as-is, so the owner can write "Mulai Rp500.000" or leave a model
   * unpriced. ponytail: a string beats a number + formatter here — final price
   * is quoted per event over WhatsApp anyway, not from a price table.
   */
  priceLabel: string;
  sizes: string[];
  /** Paths under /public. Replace with real 3:4 photography when available. */
  images: string[];
  featured: boolean;
};

export const categories: Category[] = [
  "Koloses",
  "Kolos Modern",
  "Baju Kurung",
  "Jarik",
  "Blangkon",
];

/**
 * ponytail: products.ts is the whole "CMS". It is a plain array of the same
 * shape a headless CMS would return, so a later swap to `await fetch(...)`
 * touches this file only — no component changes.
 */
export const products: Product[] = [
  {
    id: "kebaya-soraya",
    name: "Kebaya Soraya",
    category: "Koloses",
    description:
      "Koloses Jawa dengan bordir sekaten di lengan dan dada. Cutting jatuh mengikuti siluet, tetap nyaman untuk acara yang panjang.",
    material: "Jarik Siam Gold, lining sutra",
    priceLabel: "Mulai Rp450.000",
    sizes: ["S", "M", "L", "XL"],
    images: ["/kebaya/soraya.svg", "/kebaya/soraya-alt.svg"],
    featured: true,
  },
  {
    id: "kebaya-anindya",
    name: "Kebaya Anindya",
    category: "Kolos Modern",
    description:
      "Siluet A-line modern dengan aksen lurik emas tipis. Pilihan aman untuk akad nikah yang ingin tampil tegas tapi tetap santun.",
    material: "Crepe doff, aksen benang emas",
    priceLabel: "Mulai Rp385.000",
    sizes: ["S", "M", "L"],
    images: ["/kebaya/anindya.svg", "/kebaya/anindya-alt.svg"],
    featured: true,
  },
  {
    id: "kebaya-larasati",
    name: "Kebaya Larasati",
    category: "Baju Kurung",
    description:
      "Baju kurung paduan kebaya. Satu set bisa menutup dua kebutuhan sekaligus: siraman pagi dan acara keluarga siang.",
    material: "Katun premium, organza dalam",
    priceLabel: "Mulai Rp325.000",
    sizes: ["M", "L", "XL", "XXL"],
    images: ["/kebaya/larasati.svg"],
    featured: true,
  },
  {
    id: "kebaya-melati",
    name: "Kebaya Melati",
    category: "Koloses",
    description:
      "Motif melati sulam pada kerah dan lengan. Default ivory, bisa dipesan hijau jade atau dusty pink.",
    material: "Sifon doff, sulam manual",
    priceLabel: "Mulai Rp495.000",
    sizes: ["S", "M", "L", "XL"],
    images: ["/kebaya/melati.svg"],
    featured: true,
  },
  {
    id: "kebaya-wardhani",
    name: "Kebaya Wardhani",
    category: "Kolos Modern",
    description:
      "Potongan asimetris dengan kancing kuningan manual. Untuk acara yang butuh tampilan berbeda tanpa terlihat berlebihan.",
    material: "Duchesse satin, kancing kuningan",
    priceLabel: "Mulai Rp560.000",
    sizes: ["S", "M", "L"],
    images: ["/kebaya/wardhani.svg"],
    featured: true,
  },
  {
    id: "kebaya-cendana",
    name: "Kebaya Cendana",
    category: "Jarik",
    description:
      "Sudah termasuk jarik untuk dress code adat, jadi tidak perlu menyewa kain terpisah. Warna hijau jade, cocok untuk hari besar keluarga.",
    material: "Kain adat, jarik tulis",
    priceLabel: "Mulai Rp750.000",
    sizes: ["M", "L", "XL"],
    images: ["/kebaya/cendana.svg"],
    featured: true,
  },
  {
    id: "kebaya-pesona",
    name: "Kebaya Pesona",
    category: "Baju Kurung",
    description:
      "Kurung basic premium untuk seserahan dan acara santai yang tetap rapi. Warna netral, mudah dipadukan dengan aksesori emas.",
    material: "Linem rayon",
    priceLabel: "Mulai Rp275.000",
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: ["/kebaya/pesona.svg"],
    featured: false,
  },
  {
    id: "blangkon-jati",
    name: "Blangkon Jati",
    category: "Blangkon",
    description:
      "Blangkon kulit dengan bordir emas, untuk melengkapi tampilan adat pada acara siraman.",
    material: "Kulit buffalo, bordir emas",
    priceLabel: "Mulai Rp150.000",
    sizes: ["58", "59", "60", "61", "62"],
    images: ["/kebaya/blangkon.svg"],
    featured: false,
  },
];

export const featuredProducts = products.filter((p) => p.featured);

export const getProduct = (id: string) => products.find((p) => p.id === id);

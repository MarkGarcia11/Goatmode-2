export type Gender = "men" | "women";
export type ProductCategory = "Shirts" | "Shorts" | "Hoodies" | "Leggings" | "Tops";

export type ProductColor = {
  name: string;
  hex: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  gender: Gender;
  category: ProductCategory;
  price: number;
  images: string[];
  colors: ProductColor[];
  sizes: string[];
  description: string;
  isNew?: boolean;
};

export const products: Product[] = [
  {
    id: "everyday-training-tee",
    slug: "everyday-training-tee",
    name: "Everyday Training Tee",
    gender: "men",
    category: "Shirts",
    price: 48,
    images: ["/images/product-training-tee.jpg", "/images/goat-mode-men.jpg"],
    colors: [
      { name: "Charcoal", hex: "#343633" },
      { name: "Stone", hex: "#c7bfb2" },
      { name: "Olive", hex: "#707763" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "A considered training-layer concept, styled for the everyday rhythm between sessions. Final fit, fabric and construction details will be confirmed before launch.",
    isNew: true,
  },
  {
    id: "movement-training-short",
    slug: "movement-training-short",
    name: "Movement Training Short",
    gender: "men",
    category: "Shorts",
    price: 54,
    images: ["/images/product-training-short.jpg", "/images/goat-mode-campaign.jpg"],
    colors: [
      { name: "Graphite", hex: "#454644" },
      { name: "Black", hex: "#171816" },
      { name: "Sage", hex: "#a4aa9a" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "A clean, versatile short shown as a concept piece. Product measurements, materials and final details are still to be confirmed.",
    isNew: true,
  },
  {
    id: "form-legging",
    slug: "form-legging",
    name: "Form Legging",
    gender: "women",
    category: "Leggings",
    price: 68,
    images: ["/images/product-leggings.jpg", "/images/goat-mode-women.jpg"],
    colors: [
      { name: "Deep Olive", hex: "#555b4c" },
      { name: "Black", hex: "#171816" },
      { name: "Stone", hex: "#c7bfb2" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "A streamlined legging concept designed to feel at home in a movement-led wardrobe. Final fit, fabric and construction details will be confirmed before launch.",
    isNew: true,
  },
  {
    id: "relaxed-studio-hoodie",
    slug: "relaxed-studio-hoodie",
    name: "Relaxed Studio Hoodie",
    gender: "men",
    category: "Hoodies",
    price: 82,
    images: ["/images/product-hoodie.jpg", "/images/goat-mode-story.jpg"],
    colors: [
      { name: "Warm Taupe", hex: "#a59a8c" },
      { name: "Charcoal", hex: "#343633" },
      { name: "Oat", hex: "#e2ded5" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "An easy layer presented as a visual concept. Fabric weight, fit and all product specifications remain subject to final confirmation.",
    isNew: true,
  },
  {
    id: "studio-training-top",
    slug: "studio-training-top",
    name: "Studio Training Top",
    gender: "women",
    category: "Tops",
    price: 42,
    images: ["/images/goat-mode-women.jpg", "/images/product-leggings.jpg"],
    colors: [
      { name: "Black", hex: "#171816" },
      { name: "Olive", hex: "#707763" },
      { name: "Warm White", hex: "#efede7" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "A minimal training-top concept, shown for the visual direction of the collection. Exact product details will be added once confirmed.",
  },
  {
    id: "everyday-movement-short",
    slug: "everyday-movement-short",
    name: "Everyday Movement Short",
    gender: "women",
    category: "Shorts",
    price: 48,
    images: ["/images/goat-mode-community.jpg", "/images/goat-mode-story.jpg"],
    colors: [
      { name: "Charcoal", hex: "#343633" },
      { name: "Sage", hex: "#a4aa9a" },
      { name: "Oat", hex: "#e2ded5" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "A movement-ready short concept for the edit. Fit, fabric, product details and final price are illustrative placeholders.",
  },
];

export const newArrivals = products.filter((product) => product.isNew);
export const sampleEdit = [products[0], products[2], products[3]];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

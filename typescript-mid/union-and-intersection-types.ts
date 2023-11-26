// Base Product type
type Product = {
  name: string;
  price: number;
  description: string;
};

// Variation types
type Variation<T extends string> = Product & {
  variationType: T;
} & {
  [K in T]: string;
};

/**
 * Usage Cases
 */

const sizeVariation: Variation<"size"> = {
  name: "T-Shirt",
  price: 29.99,
  description: "A comfortable and stylish T-shirt.",
  variationType: "size",
  size: "L",
};

const colorVariation: Variation<"color"> = {
  name: "Jeans",
  price: 49.99,
  description: "Classic blue jeans.",
  variationType: "color",
  color: "blue",
};

const materialVariation: Variation<"material"> = {
  name: "Sunglasses",
  price: 19.99,
  description: "Stylish sunglasses for any occasion.",
  variationType: "material",
  material: "plastic",
};

const shapeVariation: Variation<"shape"> = {
  name: "T-Shirt",
  price: 29.99,
  description: "A comfortable and stylish T-shirt.",
  variationType: "shape",
  shape: "round",
};

const patternVariation: Variation<"pattern"> = {
  name: "T-Shirt",
  price: 29.99,
  description: "A comfortable and stylish T-shirt.",
  variationType: "pattern",
  pattern: "striped",
};

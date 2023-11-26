interface Category {
  name: string;
}

interface Product {
  category: Category;
}

function isCategory(input: Category | string | null): input is Category {
  return typeof input === "object" && input !== null && "name" in input;
}

function isString(input: Category | string | null): input is string {
  return typeof input === "string";
}

function processData(input: Category | string | null): string | null {
  if (isCategory(input)) {
    return input.name;
  } else if (isString(input)) {
    return input;
  }
  return null;
}

// Example usage:
const category: Category = { name: "Movies" };
const product: Product = { category };

const categoryName = processData(category);
const stringValue = processData("Wall-E");
const nullValue = processData(null);
const productValue = processData(product.category);

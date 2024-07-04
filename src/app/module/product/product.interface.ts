export type IProduct = {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: IVariant[];
  inventory: IInventory;
};

export type IVariant = {
  type: string;
  value: string;
}

export type IInventory = {
  quantity: number;
  inStock: boolean;
}

export type IProductFilters = {
  searchTerm?: string
  name?: string
}

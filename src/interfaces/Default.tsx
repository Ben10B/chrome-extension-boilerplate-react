export interface ProductTab {
  id: number;
  title: string;
  url: string;
  favIconUrl: string;
}

export interface ProductPage {
  image: string;
  title: string;
  price: string;
  notes: string[];
  lists: string[];
}

export interface Product {
  tab: ProductTab;
  page: ProductPage;
}
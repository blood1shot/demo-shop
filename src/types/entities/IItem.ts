export interface IItem {
  id: number;
  img_name: string;
  item_name: string;
  vendor: string;
  description: string;
  price: number;
  discount?: number;
  quantity: number;
}

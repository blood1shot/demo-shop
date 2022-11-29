import { FilterEnum } from "@/utils/enum/FilterEnum";

export interface IItem {
  id: number;
  type: FilterEnum;
  img_name: string;
  item_name: string;
  vendor: string;
  description: string;
  price: number;
  discount?: number;
  quantity: number;
}

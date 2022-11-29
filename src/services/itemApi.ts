import axiosClient from "./api/index";
import { AxiosResponse } from "axios";
import { IItem } from "@/types/entities/IItem";

export default {
  getAll(): Promise<AxiosResponse<IItem[]>> {
    return axiosClient.get("items");
  },
  getOne(id: number): Promise<AxiosResponse<IItem>> {
    return axiosClient.get(`items/${id}`);
  },
};

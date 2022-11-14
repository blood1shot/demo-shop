import axiosClient from "./api/index";
import { AxiosResponse } from "axios";
import { IItem } from "@/types/entities/IItem";

export default {
  getItems(): Promise<AxiosResponse<IItem[]>> {
    return axiosClient.get("items");
  },
};

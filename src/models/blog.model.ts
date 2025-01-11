import type { GetAllModel } from "./getAll.model";

export interface getAllByIdModel extends GetAllModel {
  id_user: string;
}

import { Producer } from "@/types/Producer";

export type RequestProducerByCitiesIdsData = string[];

export type RequestProducerByCitiesIdsResponse = {
  producers: Array<Producer>;
};

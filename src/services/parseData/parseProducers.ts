import { Producer } from "@/types/Producer";

type ProducersByCityName = Record<string, Array<Producer>>;

export function parseProducersByCities(producers: Producer[]) {
  const citiesIdsList: Array<string> = [];

  producers.forEach((producer) => {
    if (!citiesIdsList.includes(producer.cityId)) {
      citiesIdsList.push(producer.cityId);
    }
  });

  const producersByCityName: ProducersByCityName = {};

  citiesIdsList.forEach((cityId) => {
    const producersByCity = producers.filter((prod) => prod.cityId === cityId);

    producersByCityName[producersByCity[0].city] = producersByCity;
  });

  return producersByCityName;
}

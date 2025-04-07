export type CityExtractDetailed = {
  [CityExtractDetailedValuesEnum.cityId]: string;
  [CityExtractDetailedValuesEnum.city]: string;
  [CityExtractDetailedValuesEnum.cityLabel]: string;
  [CityExtractDetailedValuesEnum.state]: string;
  [CityExtractDetailedValuesEnum.totalRegistrations]: number;
  [CityExtractDetailedValuesEnum.totalCertificates]: number;
  [CityExtractDetailedValuesEnum.totalProducers]: number;
  [CityExtractDetailedValuesEnum.producersTargetAchieved]: number;
  [CityExtractDetailedValuesEnum.selected]: boolean;
};

export enum CityExtractDetailedValuesEnum {
  cityId = "id",
  city = "city",
  cityLabel = "cityLabel",
  state = "state",
  totalRegistrations = "totalRegistrations",
  totalCertificates = "totalCertificates",
  totalProducers = "totalProducers",
  producersTargetAchieved = "producersTargetAchieved",
  selected = "selected",
}

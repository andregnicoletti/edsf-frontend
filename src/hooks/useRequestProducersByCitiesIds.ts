import React from "react";

import { debounce } from "lodash";

import apiService from "@/services/axios";
import { Producer } from "@/types/Producer";

type UseRequestProducersByCitiesIdsData = {
  citiesSelectedIds: string[];
};

type UseRequestProducersByCitiesIdsResponse = {
  producers: Producer[];
  loading: boolean;
};

export const useRequestProducersByCitiesIds = (
  props: UseRequestProducersByCitiesIdsData
): UseRequestProducersByCitiesIdsResponse => {
  const [producers, setProducers] = React.useState<Producer[]>([]);
  const [loading, setLoading] = React.useState(false);

  async function requestNewProducers(citiesSelectedIds: string[]) {
    try {
      if (citiesSelectedIds.length === 0) setProducers([]);
      setLoading(true);
      const response = await apiService.requestProducersByCitiesIds(
        citiesSelectedIds
      );
      setProducers(response);
    } catch (error) {
      console.log("[requestNewProducers]", error);
    } finally {
      setLoading(false);
    }
  }

  const deboundeRequestNewProducers = React.useCallback(
    debounce(requestNewProducers, 500),
    [props.citiesSelectedIds]
  );

  React.useEffect(() => {
    deboundeRequestNewProducers(props.citiesSelectedIds);
  }, [props.citiesSelectedIds]);

  return { producers, loading };
};

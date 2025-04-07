import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  fetchIndicatorThunk,
  fetchNewPanelPreview,
} from "./configNewPanelThunk";

import {
  DataSelectionPerformance,
  PanelTypeData,
} from "@/services/axios/configNewPanel/configNewPanel.types";
import { ChartType } from "@/types/Chart";
import { City } from "@/types/City";
import { Criterion, Indicator } from "@/types/ConfigNewPanel";
import { NewPanelAttributes, TableNewPanel } from "@/types/NewPanel";
import { Producer } from "@/types/Producer";
import { State } from "@/types/State";
import { isProducerListDifferent } from "@/utils/producer";

export type TableAttOrderType = "asc" | "desc";

export type Attributes = Array<Attribute>;

export type Attribute = {
  id: NewPanelAttributes;
  order: TableAttOrderType;
};

export type ConfigNewPanelState = {
  isEdittingPanel: boolean;
  panelId: string;
  panelType?: PanelTypeData;
  panelName: string;
  criterion: Criterion | "";
  dataSelectionComparison: string[];
  dataSelectionPerformance: DataSelectionPerformance | "";
  attributes: Attributes;
  showGoal: boolean;
  filters: {
    indicator: {
      indicatorOptions: Indicator[];
      indicatorIdSelected: string;
    };
    cities: {
      citiesOptions: City[];
      citiesIdsSelected: string[];
    };
    states: {
      statesOptions: State[];
      statesIdsSelected: string[];
    };
    producers: {
      producersOptions: Producer[];
      producersIdsSelected: string[];
    };
  };
  showChart: boolean;
  previewChart?: ChartType;
  previewTable?: TableNewPanel;
};

const initialState: ConfigNewPanelState = {
  isEdittingPanel: false,
  panelId: "",
  panelType: undefined,
  panelName: "",
  filters: {
    indicator: {
      indicatorOptions: [],
      indicatorIdSelected: "",
    },
    cities: {
      citiesOptions: [],
      citiesIdsSelected: [],
    },
    states: {
      statesOptions: [],
      statesIdsSelected: [],
    },
    producers: {
      producersOptions: [],
      producersIdsSelected: [],
    },
  },
  dataSelectionComparison: [],
  dataSelectionPerformance: "",
  attributes: [],
  showGoal: true,
  criterion: "",
  showChart: false,
  previewChart: undefined,
  previewTable: undefined,
};

export const configNewPanelSlice = createSlice({
  name: "configNewPanel",
  initialState,
  extraReducers: (builder) => {
    builder.addCase("userSlice/logout", () => initialState);
    builder.addCase(fetchIndicatorThunk.fulfilled, (state, action) => {
      state.filters.indicator.indicatorOptions = action.payload || [];
    });
    builder.addCase(fetchNewPanelPreview.fulfilled, (state, action) => {
      state.previewChart = action.payload?.chartData;
      state.previewTable = action.payload?.tableData;

      const oldAndNewProducersDifferent = isProducerListDifferent(
        state.filters.producers.producersOptions,
        action.payload?.producersOptions || []
      );
      const firstEdditingPanelRender =
        state.filters.producers.producersOptions.length === 0;

      if (firstEdditingPanelRender && oldAndNewProducersDifferent) {
        state.filters.producers = {
          producersOptions: action.payload?.producersOptions || [],
          producersIdsSelected: state.filters.producers.producersIdsSelected,
        };
      } else if (oldAndNewProducersDifferent) {
        state.filters.producers = {
          producersOptions: action.payload?.producersOptions || [],
          producersIdsSelected: [],
        };
      }
    });
  },
  reducers: {
    addAttribute: (state, action: PayloadAction<NewPanelAttributes>) => {
      if (state.attributes.find((item) => item.id === action.payload)) return;
      state.attributes.push({ id: action.payload, order: "asc" });
    },
    removeAttribute: (state, action: PayloadAction<NewPanelAttributes>) => {
      const index = state.attributes.findIndex(
        (attribute) => attribute.id === action.payload
      );
      state.attributes.splice(index, 1);
    },
    onChangeOrderByAttribute: (
      state,
      action: PayloadAction<NewPanelAttributes>
    ) => {
      state.attributes = state.attributes.map((attribute) => {
        if (attribute.id === action.payload) {
          let newOrder: TableAttOrderType = "asc";
          if (attribute.order === "asc") newOrder = "desc";
          return {
            ...attribute,
            order: newOrder,
          };
        }
        return attribute;
      });
    },
    onChangeAllAttribues: (state, action: PayloadAction<Attributes>) => {
      state.attributes = action.payload;
    },
    changePanelName: (state, action: PayloadAction<string>) => {
      state.panelName = action.payload;
    },
    changeIndicatorIdSelected: (state, action: PayloadAction<string>) => {
      state.filters.indicator.indicatorIdSelected = action.payload;
    },
    changeCriterion: (state, action: PayloadAction<Criterion | "">) => {
      state.criterion = action.payload;
    },
    changeDataSelectionComparison: (state, action: PayloadAction<string[]>) => {
      state.dataSelectionComparison = action.payload;
    },
    changeDataSelectionPerformance: (
      state,
      action: PayloadAction<DataSelectionPerformance | "">
    ) => {
      state.dataSelectionPerformance = action.payload;
    },
    changeShowGoal: (state) => {
      state.showGoal = !state.showGoal;
    },
    changeCitiesFilter: (state, action: PayloadAction<City[]>) => {
      state.filters.cities.citiesOptions = action.payload;
    },
    changeCitiesSelectedIds: (state, action: PayloadAction<string[]>) => {
      state.filters.cities.citiesIdsSelected = action.payload;
    },
    changeProducers: (state, action: PayloadAction<Producer[]>) => {
      state.filters.producers.producersOptions = action.payload;
    },
    changeProducersSelectedIds: (state, action: PayloadAction<string[]>) => {
      state.filters.producers.producersIdsSelected = action.payload;
    },
    changeStatesFilter: (state, action: PayloadAction<State[]>) => {
      state.filters.states.statesOptions = action.payload;
    },
    changeStatesSelectedIds: (state, action: PayloadAction<string[]>) => {
      state.filters.states.statesIdsSelected = action.payload;
    },
    cleanProducersSelectedIds: (state) => {
      state.filters.producers.producersIdsSelected = [];
    },
    cleanCitiesAndStates: (state) => {
      state.filters.cities.citiesIdsSelected = [];
      state.filters.states.statesIdsSelected = [];
    },
    resetAll: () => initialState,
    changeShowChart: (state, action: PayloadAction<boolean>) => {
      state.showChart = action.payload;
    },
    cleanPreview: (state) => {
      state.previewTable = undefined;
      state.previewChart = undefined;
      state.filters.producers = {
        producersOptions: [],
        producersIdsSelected: [],
      };
    },
    changePanelType: (state, action: PayloadAction<PanelTypeData>) => {
      state.panelType = action.payload;
    },
    editPanel: (state, action: PayloadAction<ConfigNewPanelState>) => {
      const newState = { ...state, ...action.payload };
      return newState;
    },
  },
});

export const configNewPanelActions = configNewPanelSlice.actions;

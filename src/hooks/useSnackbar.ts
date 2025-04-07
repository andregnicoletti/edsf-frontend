import { useDispatch } from "react-redux";

import {
  SnackbarSeverities,
  snackbarSliceActions,
} from "@/store/features/Snackbar/SnackbarSlice";

// import { Container } from './styles';

type UseSnackbarResponse = {
  openNewSnackbar: (message: string, severity: SnackbarSeverities) => void;
};

const useSnackbar = (): UseSnackbarResponse => {
  const dispatch = useDispatch();
  function openNewSnackbar(message: string, severity: SnackbarSeverities) {
    dispatch(snackbarSliceActions.openNewSnackbar({ message, severity }));
  }

  return { openNewSnackbar };
};

export default useSnackbar;

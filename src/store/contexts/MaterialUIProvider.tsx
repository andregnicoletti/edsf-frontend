import { Alert, Snackbar, ThemeProvider, createTheme } from "@mui/material";
import { ptBR } from "@mui/material/locale";
import { useDispatch, useSelector } from "react-redux";

import InputRightIcon from "@/components/CustomInputs/InputRightIcon";
import { snackbarSliceActions } from "@/store/features/Snackbar/SnackbarSlice";
import { RootState } from "@/store/store";
import "@/styles/inputs.scss";
import "@/styles/muiGlobal.scss";

interface IMaterialUIProviderProps {
  children: React.ReactNode;
}

const theme = createTheme(
  {
    palette: {
      primary: {
        main: "rgba(93, 165, 25, 1)",
      },
    },
    typography: {
      fontFamily: ["Public Sans", "sans-serif"].join(","),
    },
    components: {
      MuiFormControl: {
        defaultProps: {
          size: "small",
        },
      },
      MuiSelect: {
        defaultProps: {
          IconComponent: () => (
            <button>
              <InputRightIcon iconName="ChevronDown" />
            </button>
          ),
        },
      },
    },
  },
  ptBR
);

export const MaterialUIProvider = ({ children }: IMaterialUIProviderProps) => {
  const dispatch = useDispatch();
  const { message, open, severity } = useSelector(
    (state: RootState) => state.snackbar
  );

  return (
    <ThemeProvider theme={theme}>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={6000}
        title="ademir"
        onClose={() => dispatch(snackbarSliceActions.closeSnackbar())}
      >
        <Alert
          onClose={() => dispatch(snackbarSliceActions.closeSnackbar())}
          severity={severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      {children}
    </ThemeProvider>
  );
};

export default MaterialUIProvider;

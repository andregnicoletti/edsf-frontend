import React from "react";

// import { Container } from './styles';

type UseOpenSelectProps = {
  floatingDivRef: React.RefObject<HTMLDivElement>;
};

type UseOpenSelectResponse = {
  handleClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  blurSelect: () => void;
};

const useOpenSelect = (props: UseOpenSelectProps): UseOpenSelectResponse => {
  const [open, setOpen] = React.useState(false);

  function isClickingDatePickerCalendar(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    const collection = document.getElementsByClassName("MuiPickersPopper-root");

    for (const element of collection) {
      if (element.contains(event.target as Node)) {
        return true;
      }
    }
    return false;
  }

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const isClickingDatePicker = isClickingDatePickerCalendar(event);
    const isClickingFloatingDiv = props.floatingDivRef.current?.contains(
      event.target as Node
    );

    if (open && !isClickingFloatingDiv && !isClickingDatePicker) {
      setOpen(false);
    } else if (!open) {
      setOpen(true);
    }
  };

  function blurSelect() {
    setTimeout(() => {
      if (document.activeElement instanceof HTMLElement)
        document.activeElement.blur();
    }, 0);
  }

  return { handleClick, open, setOpen, blurSelect };
};

export default useOpenSelect;

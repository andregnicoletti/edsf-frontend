export type ParseStringToHTMLProps = {
  text: string;
};

export type ItemStringParsedToArray = {
  type: AcceptedTagsType;
  content: string | null;
};

export type AcceptedTagsType = "normal" | "bold" | "italico" | "breakline";

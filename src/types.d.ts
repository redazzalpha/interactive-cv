declare interface Links {
  label: string;
  href: string;
}

declare type State = {
  drawer: boolean,
}

declare type Locations = "left" | "end" | "start" | "top" | "bottom" | "right" | undefined;

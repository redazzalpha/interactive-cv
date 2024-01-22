declare module "dynamics.js";

declare interface Link {
  label: string;
  href: string;
}

declare type State = {
  drawer: boolean,
  links: Link[],
}

declare type Locations = "left" | "end" | "start" | "top" | "bottom" | "right" | undefined;

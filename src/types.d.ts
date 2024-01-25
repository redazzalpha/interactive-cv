declare module "dynamics.js";

//#region types
type HtmlItem = HTMLElement | null;
declare type Locations = "left" | "end" | "start" | "top" | "bottom" | "right" | undefined;
declare type State = {
  drawer: boolean,
  links: Link[],
}
//#endregion

//#region interfaces
declare interface Link {
  label: string;
  href: string;
  icon: string;
}
declare interface Binding {
  id?: string;
  class?: string;
  style?: string;
  color?: string;
  "max-width"?: string | number;
  "min-width"?: string | number;
  sm?: string;
  md?: string;
  lg?: string;
  cols?: string;
}
//#endregion


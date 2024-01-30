declare module "dynamics.js";
declare module "luxon";

//#region types
type HtmlItem = HTMLElement | null | Element;
declare type Locations = "left" | "end" | "start" | "top" | "bottom" | "right" | undefined;
declare type State = {
  drawer: boolean,
  links: Link[],
  avatar: string,
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
declare interface GitData {
  name: string;
  created_at: string;
  html_url: string;
  url: string;
  langage: string;
  langage_url: object;
  private: boolean;
  ssh_url: string;
  updated_at: string;
  visibility: string;
}
//#endregion


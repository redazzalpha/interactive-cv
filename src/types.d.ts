//#region module
declare module "dynamics.js";
declare module "luxon";
//#endregion

//#region types
declare type HtmlItem = HTMLElement | null | Element;
declare type Locations = "left" | "end" | "start" | "top" | "bottom" | "right" | undefined;
declare type State = {
  drawer: boolean;
  links: Link[];
  avatar: string;
  appbarTitle: Ref<string>;
}
//#endregion

//#region interfaces
declare interface Link {
  label: string;
  href: string;
  icon: string;
  appbartTitle: string;
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
  language: string;
  languages_url: object;
  private: boolean;
  ssh_url: string;
  updated_at: string;
  visibility: string;
  description: string;
  homepage: string;
}
declare interface HeaderBarTitleRoute {
  [index: string]: string;
}
//#endregion


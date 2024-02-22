//#region module
declare module "dynamics.js";
declare module "luxon";
//#endregion

//#region types
declare type HtmlItem = HTMLElement | null | Element;
declare type State = {
  drawer: boolean;
  links: Link[];
  avatar: string;
  appbarTitle: Ref<string>;
}
declare type ScrollDir = "up" | "down";
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
  width?: string | number;
  xs?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  xxl?: string;
  cols?: string;
  "grid-list-xs"?: boolean;
  fluid?: boolean;
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
declare interface LocalStorage {
  [name: string]: any;
  length: number;
  clear:() => void;
  getItem: (key: string) => string | null;
  key: (index: number) => string | null;
  removeItem: (key: string) => void;
  setItem: (key: string, value: string) => void;
}
//#endregion


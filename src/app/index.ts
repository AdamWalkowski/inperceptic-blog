import { guid } from '../utils/random-numbers';

export type GatsbyPage = {
  location?: Location;
};

export interface IGatsbyNode {
  id: guid;
}

// Redux requires to use serializable objects meaning no classes, rather pure objects or interfaces
// so we store in Redux reduces only serializable objects (or strings)
export interface IReduxData {
  graphId: guid;
}

export type ReactChildren = JSX.Element | JSX.Element[];

export interface ICollectionState<T extends IReduxData> {
  isLoaded: boolean;
  entries: T[];
}

/**
 * Represents period in seconds
 */
export type seconds = number;

/**
 * Represents period in miliseconds
 */
export type milliseconds = number;

export type Dictionary<T> = { [name: string]: T };

export interface IBrowserLocation {
  hash: string;
  search: string;
  host: string;
  hostname: string;
  href: string;
  origin: string;
  pathname: string;
  port: string;
  protocol: string;
}

export enum PageType {
  HOME = 'home',
  ABOUT = 'about',
  ARTICLE = 'article',
  ERROR_404 = '404',
}

export interface PageLinkData {
  type: PageType;
  label: string;
  url: string;
}

export interface ExternalLinkData {
  type: PageType;
  label: string;
  url: string;
}

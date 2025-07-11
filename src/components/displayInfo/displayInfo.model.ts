export interface IDisplayInfo {
  infoData: { [key: string]: string | number | any };
  children?: string | JSX.Element | JSX.Element[];
}

import { BUTTON_TYPE } from "./button.enum";

export interface IButton {
  type:
    | `${BUTTON_TYPE.PRIMARY}`
    | `${BUTTON_TYPE.CHECK}`
    | `${BUTTON_TYPE.SECONDARY}`
    | `${BUTTON_TYPE.SUCCESS}`
    | `${BUTTON_TYPE.EDIT}`
    | `${BUTTON_TYPE.DELETE}`
    | `${BUTTON_TYPE.CANCEL}`
    | `${BUTTON_TYPE.NEXT}`
    | `${BUTTON_TYPE.PREVIOUS}`
    | `${BUTTON_TYPE.ADD}`
    | `${BUTTON_TYPE.BACK}`
    | `${BUTTON_TYPE.PERMISSION}`
    | `${BUTTON_TYPE.MORE_LOAD}`
    | `${BUTTON_TYPE.CONFIRM}`
    | `${BUTTON_TYPE.REFRESH}`;

  onClick?: (e: any) => void;
  onMouseDown?: (e: any) => void;
  href?: string;
  className?: string;
  disabled?: boolean;
  label?: string;
  buttonType?: any;
  tooltip?: string;
  icon?: string;
}

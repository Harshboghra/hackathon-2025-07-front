import { Button } from "primereact/button";
import { useRef, useState } from "react";
import _ from "lodash";
import { IButton } from "./button.model";
import { BUTTON_TYPE } from "./button.enum";
import { TfiReload } from "react-icons/tfi";
import { useTranslation } from "react-i18next";
import { IoRefreshOutline } from "react-icons/io5";

const AppButton = (props: IButton) => {
  const {
    type,
    onClick,
    className,
    onMouseDown,
    disabled,
    label,
    buttonType,
    tooltip,
    icon,
  } = props;
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const tooltipOptions: any = {
    position: "bottom",
    style: {
      fontSize: "0.8rem",
    },
  };

  const lockButton = useRef<any>(
    _.debounce(() => {
      setLoading(true);
    })
  );

  const unLockButton = useRef<any>(
    _.debounce(() => {
      setLoading(false);
    }, 1000)
  );

  const handleOnClick = (e: any) => {
    lockButton.current();
    unLockButton.current();
    if (onClick) onClick(e);
  };

  const isLoading = () => disabled || loading;

  const commonProps = {
    type: buttonType ?? "submit",
  };

  const renderSwitch = (type: string) => {
    switch (type) {
      case `${BUTTON_TYPE.CHECK}`:
        return (
          <Button
            {...commonProps}
            label={label}
            disabled={isLoading()}
            icon={isLoading() ? "pi pi-spin pi-spinner" : "pi pi-check"}
            className="p-button"
            onClick={handleOnClick}
          />
        );

      case `${BUTTON_TYPE.SECONDARY}`:
        return (
          <Button
            {...commonProps}
            label={label}
            severity="secondary"
            className={`p-button ${className} `}
            onClick={onClick}
            disabled={disabled}
            icon={icon}
            tooltip={tooltip ?? ""}
          />
        );

      case `${BUTTON_TYPE.SUCCESS}`:
        return (
          <Button
            {...commonProps}
            label={label}
            severity="success"
            disabled={disabled}
            onClick={onClick}
            rounded
          />
        );

      case `${BUTTON_TYPE.PRIMARY}`:
        return (
          <Button
            {...commonProps}
            label={label}
            disabled={isLoading()}
            icon={isLoading() ? "pi pi-spin pi-spinner" : ""}
            className={`p-button ${className}`}
            onClick={onClick || handleOnClick}
          />
        );

      case `${BUTTON_TYPE.CANCEL}`:
        return (
          <Button
            label={label}
            {...commonProps}
            icon="pi pi-times"
            onClick={onClick}
            disabled={disabled}
            tooltip={tooltip ?? "Cancel"}
            tooltipOptions={tooltipOptions}
            className={`${className}`}
          />
        );
      case `${BUTTON_TYPE.DELETE}`:
        return (
          <Button
            icon="pi pi-trash"
            className={`p-button-secondary ml-1 ${className}`}
            type="button"
            onClick={onClick}
            tooltip="Delete"
            tooltipOptions={tooltipOptions}
            disabled={disabled}
            label={label}
          />
        );

      case `${BUTTON_TYPE.PERMISSION}`:
        return (
          <Button
            icon="pi pi-shield"
            className={"bg-cyan-500 border-cyan-500 ml-2"}
            rounded
            type="button"
            onClick={onClick}
            tooltip="Permission"
            tooltipOptions={tooltipOptions}
            disabled={disabled}
          />
        );

      case `${BUTTON_TYPE.NEXT}`:
        return (
          <Button
            {...commonProps}
            icon="pi pi-arrow-right"
            className={`p-button-secondary ${className}`}
            onClick={onClick}
            tooltip="Next"
            tooltipOptions={tooltipOptions}
            disabled={disabled}
          />
        );
      case `${BUTTON_TYPE.PREVIOUS}`:
        return (
          <Button
            {...commonProps}
            icon="pi pi-arrow-left"
            className={`p-button-secondary  ${className}`}
            onClick={onClick}
            tooltip="Previous"
            tooltipOptions={tooltipOptions}
            disabled={disabled}
          />
        );

      case `${BUTTON_TYPE.BACK}`:
        return (
          <Button
            {...commonProps}
            icon="pi pi-arrow-left"
            className={`mr-2 p-button-text p-button-secondary ${className}`}
            onClick={onClick}
            disabled={disabled}
          />
        );

      case `${BUTTON_TYPE.ADD}`:
        return (
          <Button
            label={label}
            icon="pi pi-plus"
            className={`p-button ${className}`}
            tooltip={label ? "" : "Add"}
            tooltipOptions={tooltipOptions}
            type="button"
            onMouseDown={onMouseDown}
            onClick={onClick}
            disabled={disabled}
          />
        );

      case `${BUTTON_TYPE.EDIT}`:
        return (
          <Button
            label={label}
            {...commonProps}
            icon="pi pi-pencil"
            className={`p-button mr-1 ${className}`}
            tooltip={label ? "" : "Edit"}
            tooltipOptions={tooltipOptions}
            onClick={onClick}
            disabled={disabled}
          />
        );

      case `${BUTTON_TYPE.MORE_LOAD}`:
        return (
          <Button
            type="button"
            disabled={isLoading()}
            tooltip={`${t("components.button.name.moreLoad")}`}
            className={`p-button ${className}`}
            onClick={handleOnClick}
            tooltipOptions={{ position: "top" }}
          >
            <TfiReload size={20} />
          </Button>
        );
      case `${BUTTON_TYPE.CONFIRM}`:
        return (
          <Button
            label={label}
            {...commonProps}
            icon="pi pi-check"
            className={`p-button-success ${className}`}
            onClick={onClick}
            tooltip={tooltip ?? "Confirm"}
            tooltipOptions={tooltipOptions}
          />
        );
      case `${BUTTON_TYPE.REFRESH}`:
        return (
          <Button
            type="button"
            disabled={isLoading()}
            className={`p-button ${className}`}
            onClick={handleOnClick}
          >
            <IoRefreshOutline size={20} />
          </Button>
        );

      default:
        throw new Error("Button type does not exist");
    }
  };

  return <>{renderSwitch(type)}</>;
};

export default AppButton;

import { Dialog } from "primereact/dialog";
import { useTranslation } from "react-i18next";
import AppButton from "../../components/button/AppButton";
import { IConfirmDialog } from "./confirmDialog.model";

export const ConfirmDialog = (props: IConfirmDialog) => {
  const { t } = useTranslation();
  const {
    confirmDialog,
    confirmDialogText,
    setConfirmDialog,
    onConfirm,
    confirmDialogHeader,
    type = "Delete",
    onClosed,
  } = props;
  let header = "";
  let text = "";
  let icon = "";
  let className = "";

  const hideDialog = () => {
    onClosed && onClosed();
    setConfirmDialog(false);
  };
  const DialogFooter = (
    <>
      <AppButton
        type={"Cancel"}
        label={`${t("components.button.name.cancel")}`}
        onClick={hideDialog}
      />
      <AppButton
        type={"Check"}
        label={`${t("components.button.name.confirm")}`}
        onClick={() => onConfirm()}
      />
    </>
  );

  // Determine header, text, icon, and className based on type
  if (type === "Delete") {
    header = t("components.confirmDialog.header");
    text = t("components.confirmDialog.text");
    icon = "pi pi-exclamation-triangle";
    className = "flex align-items-center justify-content-center";
  }

  return (
    <Dialog
      appendTo="self"
      visible={confirmDialog}
      header={confirmDialogHeader ?? header}
      modal
      footer={DialogFooter}
      onHide={hideDialog}
    >
      <div className={`${className}`}>
        <i className={`${icon}`} />
        <span> {confirmDialogText ?? text}</span>
      </div>
    </Dialog>
  );
};

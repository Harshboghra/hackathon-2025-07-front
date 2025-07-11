export interface IConfirmDialog {
  confirmDialog: boolean;
  setConfirmDialog: (data: boolean) => void;
  onConfirm: () => void;
  confirmDialogText?: string;
  confirmDialogHeader?: string;
  type?: string;
  onClosed?: () => void;
}

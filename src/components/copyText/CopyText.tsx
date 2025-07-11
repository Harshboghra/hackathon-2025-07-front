import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ICopyText } from "./copyText.model";

const CopyText = (props: ICopyText) => {
  const { text } = props;
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  return copied ? (
    <i className="pi pi-check text-color ml-1"></i>
  ) : (
    <i
      className="pi pi-copy ml-1 text-color ml-1 cursor-pointer"
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1000); // Reset copied state after 1 seconds
      }}
      title={t("common.globalSearch.copyToClipboard") || ""}
    ></i>
  );
};

export default CopyText;

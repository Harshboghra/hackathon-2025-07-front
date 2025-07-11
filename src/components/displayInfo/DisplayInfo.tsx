import { IDisplayInfo } from "./displayInfo.model";
import "./displayInfo.css";

export const DisplayInfo = (props: IDisplayInfo) => {
  const { infoData, children } = props;
  return (
    <table className="line-height-2 surface-100 w-full display-info-table">
      <tbody>
        {Object.entries(infoData).map(([key, value]: any) => {
          return (
            <tr key={key}>
              <td className="p-1 font-semibold capitalize-first text-900 w-6">
                {key}:
              </td>
              <td className="p-1 capitalize-first w-6"> {value}</td>
            </tr>
          );
        })}
        {children}
      </tbody>
    </table>
  );
};

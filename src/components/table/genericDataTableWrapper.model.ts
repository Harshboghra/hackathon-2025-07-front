import { IGenericDataTableProps } from './dataTable.model';

export interface IGenericDataTableWrapper extends IGenericDataTableProps {
  setCustomFilter?: (
    value: string,
    filterValue: { key: number; name: string }[],
  ) => boolean;
  documentTitleWithPrefixAndNumberAndVersion?: string;
}

import type { VoidFunctionComponent } from "react";
import { useTranslation } from "@rhoas/app-services-ui-components";

export type NoDataCellProps = {
  columnLabel: string;
};
export const NoDataCell: VoidFunctionComponent<NoDataCellProps> = ({
  columnLabel,
}) => {
  const { t } = useTranslation("common");
  return (
    <span className="pf-u-color-400">
      {t("table_cell_no_data", { column: columnLabel })}
    </span>
  );
};

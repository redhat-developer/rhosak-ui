import { FormGroup } from "@patternfly/react-core";
import { useTranslation } from "@rhoas/app-services-ui-components";
import type { VoidFunctionComponent } from "react";
import type { DedicatedClusterTilesProps } from "./DedicatedClusterTiles";
import { DedicatedClusterTiles } from "./DedicatedClusterTiles";

export type FieldDedicatedClusterProps = {
  isValid: boolean;
} & Omit<DedicatedClusterTilesProps, "validated">;
export const FieldDedicatedCluster: VoidFunctionComponent<
  FieldDedicatedClusterProps
> = ({ value, clusters, onChange, isDisabled, isValid }) => {
  const { t } = useTranslation("create-kafka-instance");

  const validated = !isValid ? "error" : "default";

  return (
    <FormGroup
      label={t("openshift_cluster")}
      fieldId="form-cluster-option"
      validated={validated}
      helperTextInvalid={t("common:required")}
      isRequired
    >
      <DedicatedClusterTiles
        clusters={clusters}
        value={value}
        onChange={onChange}
        isDisabled={isDisabled}
        validated={validated}
      />
    </FormGroup>
  );
};

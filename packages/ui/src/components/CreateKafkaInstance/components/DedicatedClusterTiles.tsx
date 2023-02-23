import type { SelectProps } from "@patternfly/react-core";
import {
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Flex,
  FlexItem,
  FormSelect,
  FormSelectOption,
  Skeleton,
  Spinner,
} from "@patternfly/react-core";
import { ErrorCircleOIcon, OkIcon } from "@patternfly/react-icons";
import { useTranslation } from "@rhoas/app-services-ui-components";
import type { VoidFunctionComponent } from "react";
import type { DedicatedCluster } from "ui-models/src/models/dedicated-cluster";

export type DedicatedClusterTilesProps = {
  clusters: (DedicatedCluster & { isDisabled?: boolean })[];
  value: DedicatedCluster | undefined;
  onChange: (provider: DedicatedCluster) => void;
  isDisabled: boolean;
  validated?: SelectProps["validated"];
};
export const DedicatedClusterTiles: VoidFunctionComponent<
  DedicatedClusterTilesProps
> = ({ clusters, value, onChange, isDisabled, validated }) => {
  const { t } = useTranslation("create-kafka-instance");
  return (
    <>
      {clusters.length === 0 && (
        <Skeleton
          className="pf-m-text-4xl"
          screenreaderText="Loading contents"
        />
      )}
      <div role="listbox" aria-label={t("select_cloud_provider")}>
        <Flex
          justifyContent={{ default: "justifyContentSpaceBetween" }}
          spacer={{ default: "spacerNone" }}
          spaceItems={{ default: "spaceItemsXs" }}
        >
          {clusters.map((c) => (
            <FlexItem grow={{ default: "grow" }} key={c.id}>
              <Card
                className={"pf-u-w-100"}
                hasSelectableInput={true}
                isSelected={value === c}
                isSelectableRaised={true}
                isDisabledRaised={isDisabled}
                onSelectableInputChange={() => onChange(c)}
              >
                <CardTitle>{t("openshift_cluster")}</CardTitle>
                <CardBody>{c.id}</CardBody>
                <CardFooter>
                  {(() => {
                    switch (c.status) {
                      case "ready":
                        return <OkIcon />;
                      case "provisioning":
                        return <Spinner size={"sm"} />;
                      case "failed":
                        return <ErrorCircleOIcon />;
                    }
                  })()}
                  &nbsp;
                  {c.status}
                </CardFooter>
                {c.isDisabled && (
                  <CardFooter>{t("dedicated_cluster_disabled")}</CardFooter>
                )}
              </Card>
            </FlexItem>
          ))}
        </Flex>
      </div>
      <FormSelect
        className={"pf-u-display-none"}
        value={value}
        id="form-cloud-provider-option"
        name="cloud-provider"
        isDisabled={isDisabled}
        validated={validated}
        onChange={(value) => onChange(value as unknown as DedicatedCluster)}
      >
        {[
          <FormSelectOption
            value=""
            key="placeholder"
            label={t("select_dedicated_cluster")}
          />,
          clusters.map((c, index) => {
            return <FormSelectOption key={index} value={c} label={c.id} />;
          }),
        ]}
      </FormSelect>
    </>
  );
};

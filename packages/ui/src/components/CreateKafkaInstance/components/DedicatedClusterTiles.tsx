import type { SelectProps } from "@patternfly/react-core";
import {
  Card,
  CardBody,
  CardTitle,
  Flex,
  FlexItem,
  FormSelect,
  FormSelectOption,
  Skeleton,
  Spinner,
  TextContent,
  TextList,
  TextListItem,
  TextListItemVariants,
  TextListVariants,
  Truncate,
} from "@patternfly/react-core";
import { ErrorCircleOIcon, OkIcon } from "@patternfly/react-icons";
import { useTranslation } from "@rhoas/app-services-ui-components";
import type { CSSProperties, VoidFunctionComponent } from "react";
import type { DedicatedCluster } from "ui-models/src/models/dedicated-cluster";
import { useDedicatedClusterLabels } from "../../../hooks";

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
  const { t } = useTranslation(["create-kafka-instance"]);
  const { fields } = useDedicatedClusterLabels();
  return (
    <>
      {clusters.length === 0 && (
        <Skeleton
          className="pf-m-text-4xl"
          screenreaderText="Loading contents"
        />
      )}
      <div
        className={"pf-u-mt-sm"}
        role="listbox"
        aria-label={t("selected_dedicated_cluster")}
      >
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
                isDisabledRaised={isDisabled || c.status !== "ready"}
                onSelectableInputChange={() => onChange(c)}
                onClick={() => onChange(c)}
              >
                <CardTitle>{c.name}</CardTitle>
                <CardBody>
                  <TextContent>
                    <TextList component={TextListVariants.dl}>
                      <TextListItem component={TextListItemVariants.dt}>
                        {fields.id}
                      </TextListItem>
                      <TextListItem
                        component={TextListItemVariants.dd}
                        className="pf-u-max-width"
                        style={
                          {
                            "--pf-u-max-width--MaxWidth": "10ch",
                          } as CSSProperties
                        }
                      >
                        <Truncate
                          content={c.id}
                          trailingNumChars={5}
                          position={"middle"}
                        />
                      </TextListItem>
                      <TextListItem component={TextListItemVariants.dt}>
                        {fields.status}
                      </TextListItem>
                      <TextListItem component={TextListItemVariants.dd}>
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
                      </TextListItem>
                      <TextListItem component={TextListItemVariants.dt}>
                        {fields.cloudProvider}
                      </TextListItem>
                      <TextListItem component={TextListItemVariants.dd}>
                        {c.cloudProvider.displayName}
                      </TextListItem>
                      <TextListItem component={TextListItemVariants.dt}>
                        {fields.cloudRegion}
                      </TextListItem>
                      <TextListItem component={TextListItemVariants.dd}>
                        {c.cloudRegion.displayName}
                      </TextListItem>
                    </TextList>
                  </TextContent>
                </CardBody>
              </Card>
            </FlexItem>
          ))}
        </Flex>
      </div>
      <FormSelect
        className={"pf-u-display-none"}
        value={value}
        id="form-cluster-option"
        name="cluster"
        isDisabled={isDisabled}
        validated={validated}
        onChange={(value) => onChange(value as unknown as DedicatedCluster)}
      >
        {[
          <FormSelectOption
            value={value?.id}
            key="placeholder"
            label={t("select_dedicated_cluster")}
          />,
          clusters.map((c, index) => {
            return <FormSelectOption key={index} value={c.id} label={c.id} />;
          }),
        ]}
      </FormSelect>
    </>
  );
};

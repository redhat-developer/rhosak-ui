import type { SelectProps } from "@patternfly/react-core";
import {
  Card,
  CardBody,
  CardTitle,
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  FormSelect,
  FormSelectOption,
  Gallery,
  GalleryItem,
  Skeleton,
  Truncate,
} from "@patternfly/react-core";
import { useTranslation } from "@rhoas/app-services-ui-components";
import type { CSSProperties, VoidFunctionComponent } from "react";
import type { DedicatedCluster } from "ui-models/src/models/dedicated-cluster";
import { useDedicatedClusterLabels } from "../../../hooks";
import { KafkaClusterStatus } from "../../KafkaClusterStatus";

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
        <Gallery hasGutter={true}>
          {clusters.map((c) => {
            const disabled = isDisabled || c.status !== "ready";
            return (
              <GalleryItem key={c.id}>
                <Card
                  className={"pf-u-h-100"}
                  hasSelectableInput={true}
                  isSelected={value === c}
                  isSelectableRaised={true}
                  isDisabledRaised={disabled}
                  onSelectableInputChange={() => onChange(c)}
                  onClick={() => !disabled && onChange(c)}
                >
                  <CardTitle>{c.name}</CardTitle>
                  <CardBody>
                    <DescriptionList>
                      <DescriptionListGroup>
                        <DescriptionListTerm>{fields.id}</DescriptionListTerm>
                        <DescriptionListDescription
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
                        </DescriptionListDescription>
                      </DescriptionListGroup>
                      <DescriptionListGroup>
                        <DescriptionListTerm>
                          {fields.status}
                        </DescriptionListTerm>
                        <DescriptionListDescription>
                          <KafkaClusterStatus status={c.status} />
                        </DescriptionListDescription>
                      </DescriptionListGroup>
                      <DescriptionListGroup>
                        <DescriptionListTerm>
                          {fields.cloudProvider}
                        </DescriptionListTerm>
                        <DescriptionListDescription>
                          {c.cloudProvider.displayName}
                        </DescriptionListDescription>
                      </DescriptionListGroup>
                      <DescriptionListGroup>
                        <DescriptionListTerm>
                          {fields.cloudRegion}
                        </DescriptionListTerm>
                        <DescriptionListDescription>
                          {c.cloudRegion.displayName}
                        </DescriptionListDescription>
                      </DescriptionListGroup>
                    </DescriptionList>
                  </CardBody>
                </Card>
              </GalleryItem>
            );
          })}
        </Gallery>
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

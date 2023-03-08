import {
  TextContent,
  TextVariants,
  Text,
  ToggleGroup,
  ToggleGroupItem,
  Skeleton,
} from "@patternfly/react-core";
import { Trans, useTranslation } from "react-i18next";
import type { VoidFunctionComponent } from "react";
import { useState } from "react";
import { SampleCodeSnippet } from "./SampleCodeSnippet";
import {
  javaConfigCodeBlock,
  javaConfigExpandabledBlock,
  javaConsumerCodeBlock,
  javaConsumerExpandableBlock,
  javaProducerCodeBlock,
  javaProducerExpandableBlock,
  pythonConfigCodeBlock,
  pythonConfigExpandabledBlock,
  pythonConsumerCodeBlock,
  pythonConsumerExpandableBlock,
  pythonProducer,
  quarkusConfigCodeBlock,
  quarkusConfigExpandableBlock,
  quarkusConsumerCodeBlock,
  quarkusConsumerExpandableBlock,
  quarkusProducerCodeBlock,
  quarkusProducerExpandableBlock,
  springBootConfigCodeBlock,
  springBootConfigExpandableBlock,
  springBootConsumerConfigCodeBlock,
  springBootConsumerConfigExpandableBlock,
  springBootConsumerExampleCodeBlock,
  springBootConsumerExampleExpandableBlock,
  springBootListenerCodeBlock,
  springBootListenerExpandableBlock,
  springBootProducerCodeBlock,
  springBootProducerExpandableBlock,
} from "./CodeSnippets";

export type ClientType = "java" | "python" | "quarkus" | "springboot";

export type KafkaSampleCodeProps = {
  kafkaBootstrapUrl: string;
  tokenEndpointUrl: string | undefined;
};

export const KafkaSampleCode: VoidFunctionComponent<KafkaSampleCodeProps> = ({
  kafkaBootstrapUrl,
  tokenEndpointUrl,
}) => {
  const { t } = useTranslation("kafka");

  const [clientSelect, setClientSelect] = useState<ClientType>("java");

  const clientProvider: { [provider in ClientType]: string } = {
    java: t("sample_code.clients.java"),
    python: t("sample_code.clients.python"),
    quarkus: t("sample_code.clients.quarkus"),
    springboot: t("sample_code.clients.spring_boot"),
  };

  return (
    <div className="mas--details__drawer--tab-content">
      <TextContent className="pf-u-pb-sm">
        <Text component={TextVariants.small}>
          {t("sample_code.code_snippet_description_1")}
        </Text>
        <Text component={TextVariants.small}>
          {t("sample_code.code_snippet_description_2")}
        </Text>
        <ToggleGroup>
          <ToggleGroupItem
            text={clientProvider["java"]}
            value="java"
            buttonId="java"
            isSelected={clientSelect === "java"}
            onChange={() => setClientSelect("java")}
          />
          <ToggleGroupItem
            text={clientProvider["python"]}
            value="python"
            buttonId="python"
            isSelected={clientSelect === "python"}
            onChange={() => setClientSelect("python")}
          />
          <ToggleGroupItem
            text={clientProvider["quarkus"]}
            value="quarkus"
            buttonId="quarkus"
            isSelected={clientSelect === "quarkus"}
            onChange={() => setClientSelect("quarkus")}
          />
          <ToggleGroupItem
            text={clientProvider["springboot"]}
            value="springboot"
            buttonId="springboot"
            isSelected={clientSelect === "springboot"}
            onChange={() => setClientSelect("springboot")}
          />
        </ToggleGroup>
        <Text component={TextVariants.h3} className="pf-u-mt-xl">
          {t("sample_code.sample_configuration_code")}
        </Text>
        <Text component={TextVariants.small}>
          {t("sample_code.sample_configuration_code_description")}
        </Text>
        <Text component={TextVariants.small}>
          {t("sample_code.bracket_text")}
        </Text>
        {(() => {
          switch (clientSelect) {
            case "java":
              return tokenEndpointUrl ? (
                <SampleCodeSnippet
                  codeBlockCode={javaConfigCodeBlock(
                    kafkaBootstrapUrl,
                    tokenEndpointUrl
                  )}
                  expandableCode={javaConfigExpandabledBlock}
                  codeSnippet={clientSelect}
                />
              ) : (
                <Skeleton fontSize="4xl" />
              );
            case "python":
              return (
                <SampleCodeSnippet
                  codeBlockCode={pythonConfigCodeBlock(tokenEndpointUrl || "")}
                  expandableCode={pythonConfigExpandabledBlock(
                    kafkaBootstrapUrl
                  )}
                  codeSnippet={clientSelect}
                />
              );
            case "quarkus":
              return tokenEndpointUrl ? (
                <SampleCodeSnippet
                  codeBlockCode={quarkusConfigCodeBlock}
                  expandableCode={quarkusConfigExpandableBlock(
                    kafkaBootstrapUrl,
                    tokenEndpointUrl
                  )}
                  codeSnippet={clientSelect}
                />
              ) : (
                <Skeleton fontSize="4xl" />
              );
            case "springboot":
              return tokenEndpointUrl ? (
                <SampleCodeSnippet
                  codeBlockCode={springBootConfigCodeBlock(
                    kafkaBootstrapUrl,
                    tokenEndpointUrl
                  )}
                  expandableCode={springBootConfigExpandableBlock}
                  codeSnippet={clientSelect}
                />
              ) : (
                <Skeleton fontSize="4xl" />
              );
            default:
              return null;
          }
        })()}
        <Text component={TextVariants.h3} className="pf-u-mt-xl">
          {t("sample_code.sample_producer_code")}
        </Text>
        {clientSelect === "quarkus" ? (
          <>
            <Text component={TextVariants.small}>
              {t("sample_code.sample_producer_code_quarkus_description")}
            </Text>
            <SampleCodeSnippet
              codeBlockCode={quarkusProducerCodeBlock}
              expandableCode={quarkusProducerExpandableBlock}
              codeSnippet={clientSelect}
            />
          </>
        ) : (
          <>
            <Text component={TextVariants.small}>
              <Trans
                ns={"kafka"}
                i18nKey={"sample_code.sample_producer_code_description"}
                values={{
                  client_type: clientProvider[clientSelect],
                }}
              />
            </Text>
            <Text component={TextVariants.small}>
              {t("sample_code.bracket_text")}
            </Text>
            {(() => {
              switch (clientSelect) {
                case "java":
                  return (
                    <SampleCodeSnippet
                      codeBlockCode={javaProducerCodeBlock}
                      expandableCode={javaProducerExpandableBlock}
                      codeSnippet={clientSelect}
                    />
                  );
                case "python":
                  return <SampleCodeSnippet codeBlockCode={pythonProducer} />;
                case "springboot":
                  return (
                    <SampleCodeSnippet
                      codeBlockCode={springBootProducerCodeBlock}
                      expandableCode={springBootProducerExpandableBlock}
                      codeSnippet={clientSelect}
                    />
                  );
                default:
                  return null;
              }
            })()}
          </>
        )}

        <Text component={TextVariants.h3} className="pf-u-mt-xl">
          {t("sample_code.sample_consumer_code")}
        </Text>
        {clientSelect === "springboot" ? (
          <>
            <Text component={TextVariants.small}>
              {t("sample_code.spring_boot_sample_consumer_code_description")}
            </Text>
            <Text component={TextVariants.h4} className="pf-u-mt-xl">
              {t("sample_code.spring_boot_consumer_configuration")}
            </Text>
            <Text component={TextVariants.small}>
              {t("sample_code.spring_boot_consumer_configuration_description")}
            </Text>
            <SampleCodeSnippet
              codeBlockCode={springBootConsumerConfigCodeBlock}
              expandableCode={springBootConsumerConfigExpandableBlock}
              codeSnippet={clientSelect}
            />
            <Text component={TextVariants.h4} className="pf-u-mt-xl">
              {t("sample_code.spring_boot_listener")}
            </Text>
            <Text component={TextVariants.small}>
              {t("sample_code.spring_boot_listener_description")}
            </Text>
            <Text component={TextVariants.small}>
              {t("sample_code.bracket_text")}
            </Text>
            <SampleCodeSnippet
              codeBlockCode={springBootListenerCodeBlock}
              expandableCode={springBootListenerExpandableBlock}
              codeSnippet={clientSelect}
            />
            <Text component={TextVariants.h4} className="pf-u-mt-xl">
              {t("sample_code.spring_boot_consumer")}
            </Text>
            <Text component={TextVariants.small}>
              {t("sample_code.spring_boot_consumer_description")}
            </Text>
            <SampleCodeSnippet
              codeBlockCode={springBootConsumerExampleCodeBlock}
              expandableCode={springBootConsumerExampleExpandableBlock}
              codeSnippet={clientSelect}
            />
          </>
        ) : (
          <>
            <Text component={TextVariants.small}>
              <Trans
                ns={"kafka"}
                i18nKey={"sample_code.sample_consumer_code_description"}
                values={{
                  client_type: clientProvider[clientSelect],
                }}
              />
            </Text>
            {clientSelect === "quarkus" ? null : (
              <Text component={TextVariants.small}>
                {t("sample_code.bracket_text")}
              </Text>
            )}
            {(() => {
              switch (clientSelect) {
                case "java":
                  return (
                    <SampleCodeSnippet
                      codeBlockCode={javaConsumerCodeBlock}
                      expandableCode={javaConsumerExpandableBlock}
                      codeSnippet={clientSelect}
                    />
                  );
                case "python":
                  return (
                    <SampleCodeSnippet
                      codeBlockCode={pythonConsumerCodeBlock}
                      expandableCode={pythonConsumerExpandableBlock}
                      codeSnippet={clientSelect}
                    />
                  );
                case "quarkus":
                  return (
                    <SampleCodeSnippet
                      codeBlockCode={quarkusConsumerCodeBlock}
                      expandableCode={quarkusConsumerExpandableBlock}
                      codeSnippet={clientSelect}
                    />
                  );
                default:
                  return null;
              }
            })()}
          </>
        )}
      </TextContent>
    </div>
  );
};

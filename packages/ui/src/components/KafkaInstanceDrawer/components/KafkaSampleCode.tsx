import {
  TextContent,
  TextVariants,
  Text,
  ToggleGroup,
  ToggleGroupItem,
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

export const KafkaSampleCode: VoidFunctionComponent = () => {
  const { t } = useTranslation("kafka");

  const [clientSelect, setClientSelect] = useState<ClientType>("java");

  return (
    <div className="mas--details__drawer--tab-content">
      <TextContent className="pf-u-pb-sm">
        <Text component={TextVariants.small}>
          {t("sample_code.code_snippet_description")}
        </Text>

        <ToggleGroup>
          <ToggleGroupItem
            text={t("sample_code.clients.java")}
            value="java"
            buttonId="java"
            isSelected={clientSelect === "java"}
            onChange={() => setClientSelect("java")}
          />
          <ToggleGroupItem
            text={t("sample_code.clients.python")}
            value="python"
            buttonId="python"
            isSelected={clientSelect === "python"}
            onChange={() => setClientSelect("python")}
          />
          <ToggleGroupItem
            text={t("sample_code.clients.quarkus")}
            value="quarkus"
            buttonId="quarkus"
            isSelected={clientSelect === "quarkus"}
            onChange={() => setClientSelect("quarkus")}
          />
          <ToggleGroupItem
            text={t("sample_code.clients.spring_boot")}
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
              return (
                <SampleCodeSnippet
                  copyCode={javaConfigCodeBlock + javaConfigExpandabledBlock}
                  codeBlockCode={javaConfigCodeBlock}
                  expandableCode={javaConfigExpandabledBlock}
                />
              );
            case "python":
              return (
                <SampleCodeSnippet
                  copyCode={
                    pythonConfigCodeBlock + pythonConfigExpandabledBlock
                  }
                  codeBlockCode={pythonConfigCodeBlock}
                  expandableCode={pythonConfigExpandabledBlock}
                />
              );
            case "quarkus":
              return (
                <SampleCodeSnippet
                  copyCode={
                    quarkusConfigCodeBlock + quarkusConfigExpandableBlock
                  }
                  codeBlockCode={quarkusConfigCodeBlock}
                  expandableCode={quarkusConfigExpandableBlock}
                />
              );
            case "springboot":
              return (
                <SampleCodeSnippet
                  copyCode={
                    springBootConfigCodeBlock + springBootConfigExpandableBlock
                  }
                  codeBlockCode={springBootConfigCodeBlock}
                  expandableCode={springBootConfigExpandableBlock}
                />
              );
            default:
              return null;
          }
        })()}
        <Text component={TextVariants.h3} className="pf-u-mt-xl">
          {t("sample_code.sample_producer_code")}
        </Text>
        <Text component={TextVariants.small}>
          <Trans
            ns={"kafka"}
            i18nKey={"sample_code.sample_producer_code_description"}
            values={{
              client_type: clientSelect,
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
                  copyCode={javaProducerCodeBlock + javaProducerExpandableBlock}
                  codeBlockCode={javaProducerCodeBlock}
                  expandableCode={javaProducerExpandableBlock}
                />
              );
            case "python":
              return (
                <SampleCodeSnippet
                  copyCode={pythonProducer}
                  codeBlockCode={pythonProducer}
                />
              );
            case "quarkus":
              return (
                <SampleCodeSnippet
                  copyCode={
                    quarkusProducerCodeBlock + quarkusProducerExpandableBlock
                  }
                  codeBlockCode={quarkusProducerCodeBlock}
                  expandableCode={quarkusProducerExpandableBlock}
                />
              );
            case "springboot":
              return (
                <SampleCodeSnippet
                  copyCode={
                    springBootProducerCodeBlock +
                    springBootProducerExpandableBlock
                  }
                  codeBlockCode={springBootProducerCodeBlock}
                  expandableCode={springBootProducerExpandableBlock}
                />
              );
            default:
              return null;
          }
        })()}
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
              copyCode={
                springBootConsumerConfigCodeBlock +
                springBootConsumerConfigExpandableBlock
              }
              codeBlockCode={springBootConsumerConfigCodeBlock}
              expandableCode={springBootConsumerConfigExpandableBlock}
            />
            <Text component={TextVariants.h4} className="pf-u-mt-xl">
              {t("sample_code.spring_boot_listener")}
            </Text>
            <Text component={TextVariants.small}>
              {t("sample_code.spring_boot_listener_description")}
            </Text>
            <SampleCodeSnippet
              copyCode={
                springBootListenerCodeBlock + springBootListenerExpandableBlock
              }
              codeBlockCode={springBootListenerCodeBlock}
              expandableCode={springBootListenerExpandableBlock}
            />
            <Text component={TextVariants.h4} className="pf-u-mt-xl">
              {t("sample_code.spring_boot_consumer")}
            </Text>
            <Text component={TextVariants.small}>
              {t("sample_code.spring_boot_consumer_description")}
            </Text>
            <SampleCodeSnippet
              copyCode={
                springBootConsumerExampleCodeBlock +
                "\n" +
                springBootConsumerExampleExpandableBlock
              }
              codeBlockCode={springBootConsumerExampleCodeBlock}
              expandableCode={springBootConsumerExampleExpandableBlock}
            />
          </>
        ) : (
          <>
            <Text component={TextVariants.small}>
              <Trans
                ns={"kafka"}
                i18nKey={"sample_code.sample_consumer_code_description"}
                values={{
                  client_type: clientSelect,
                }}
              />
            </Text>
            {(() => {
              switch (clientSelect) {
                case "java":
                  return (
                    <SampleCodeSnippet
                      copyCode={
                        javaConsumerCodeBlock + javaConsumerExpandableBlock
                      }
                      codeBlockCode={javaConsumerCodeBlock}
                      expandableCode={javaConsumerExpandableBlock}
                    />
                  );
                case "python":
                  return (
                    <SampleCodeSnippet
                      copyCode={
                        pythonConsumerCodeBlock + pythonConsumerExpandableBlock
                      }
                      codeBlockCode={pythonConsumerCodeBlock}
                      expandableCode={pythonConsumerExpandableBlock}
                    />
                  );
                case "quarkus":
                  return (
                    <SampleCodeSnippet
                      copyCode={
                        quarkusConsumerCodeBlock +
                        quarkusConsumerExpandableBlock
                      }
                      codeBlockCode={quarkusConsumerCodeBlock}
                      expandableCode={quarkusConsumerExpandableBlock}
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

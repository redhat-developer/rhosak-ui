import { JumpLinks, JumpLinksItem, SidebarPanel } from "@patternfly/react-core";
import { useTranslation } from "@rhoas/app-services-ui-components";
import type React from "react";

export type TopicAdvanceJumpLinksProps = {
  canHaveDelete?: boolean;
};
const TopicAdvanceJumpLinks: React.FC<TopicAdvanceJumpLinksProps> = ({
  canHaveDelete,
}) => {
  const { t } = useTranslation(["create-topic"]);

  return (
    <SidebarPanel variant="sticky">
      <JumpLinks
        isVertical
        label={t("jump_to_section")}
        scrollableSelector=".topic-properties"
        style={{ position: "sticky" }}
        // offset={-164} // for header
      >
        <JumpLinksItem key={0} href="#core-configuration">
          {t("core_configuration")}
        </JumpLinksItem>
        <JumpLinksItem key={1} href="#messages">
          {t("messages")}
        </JumpLinksItem>
        <JumpLinksItem key={2} href="#log">
          {t("log")}
        </JumpLinksItem>
        <JumpLinksItem key={3} href="#replication">
          {t("replication")}
        </JumpLinksItem>
        <JumpLinksItem key={4} href="#cleanup">
          {t("cleanup")}
        </JumpLinksItem>
        <JumpLinksItem key={5} href="#index">
          {t("index")}
        </JumpLinksItem>
        <JumpLinksItem key={6} href="#flush">
          {t("flush")}
        </JumpLinksItem>
        {canHaveDelete ? (
          <JumpLinksItem key={7} href="#delete">
            {t("delete")}
          </JumpLinksItem>
        ) : (
          <></>
        )}
      </JumpLinks>
    </SidebarPanel>
  );
};

export { TopicAdvanceJumpLinks };

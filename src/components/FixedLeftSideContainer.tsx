import "./FixedLeftSideContainer.scss";

import clsx from "clsx";
import { ActionManager } from "../actions/manager";
import { AppState } from "../types";
import { Section } from "./Section";
import { Island } from "./Island";
import Stack from "./Stack";

type FixedLeftSideContainerProps = {
  className?: string;
  actionManager: ActionManager;
  appState: AppState;
};

export const FixedLeftSideContainer = ({
  className,
  actionManager,
  appState,
}: FixedLeftSideContainerProps) => (
  <div className={clsx("FixedLeftSideContainer", className)}>
    <Section heading="canvasActions">
      <Island padding={2} className="border-default">
        <Stack.Row gap={1} justifyContent="flex-start" align="center">
          <div className="">1 row</div>
        </Stack.Row>
      </Island>
    </Section>
    <Section heading="canvasActions">
      <Island padding={2} className="border-default">
        <Stack.Row gap={1} justifyContent="flex-start" align="center">
          <div className="">2 row</div>
        </Stack.Row>
      </Island>
    </Section>
    <Section heading="canvasActions">
      <Island padding={2} className="border-default">
        <Stack.Row gap={1} justifyContent="flex-start" align="center">
          <div className="">3 row</div>
        </Stack.Row>
      </Island>
    </Section>
  </div>
);

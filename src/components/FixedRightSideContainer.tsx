import "./FixedRightSideContainer.scss";

import clsx from "clsx";
import { Section } from "./Section";
import { Island } from "./Island";
import { ZoomActions } from "./Actions";
import Stack from "./Stack";
import { ActionManager } from "../actions/manager";
import { AppState } from "../types";

interface FixedRightSideContainerProps {
  className?: string;
  actionManager: ActionManager;
  appState: AppState;
}

export const FixedRightSideContainer = ({
  className,
  actionManager,
  appState,
}: FixedRightSideContainerProps) => (
  <div className={clsx("FixedRightSideContainer", className)}>
    <Section heading="canvasActions">
      <Island padding={2} className="border-default">
        <Stack.Row gap={1} justifyContent="flex-start" align="center">
          {actionManager.renderAction("toggleTheme")}
          {actionManager.renderAction("toggleTheme")}
          <Island padding={1}>
            <ZoomActions
              renderAction={actionManager.renderAction}
              zoom={appState.zoom}
            />
          </Island>
          {actionManager.renderAction("toggleTheme")}
        </Stack.Row>
      </Island>
    </Section>
  </div>
);

import clsx from "clsx";
import { ActionManager } from "../actions/manager";
import { AppState, ExcalidrawProps } from "../types";
import { UndoRedoActions } from "./Actions";
import { useDevice } from "./App";
import { Island } from "./Island";
import { Section } from "./Section";
import Stack from "./Stack";
import { t } from "../i18n";
import { NonDeletedExcalidrawElement } from "../element/types";
import { PenModeButton } from "./PenModeButton";
import { LockButton } from "./LockButton";
import { HintViewer } from "./HintViewer";
import { ShapesSwitcher } from "./Actions";

const Footer = ({
  appState,
  actionManager,
  renderCustomFooter,
  showExitZenModeBtn,
  onImageAction,
  onPenModeToggle,
  onLockToggle,
  elements,
  canvas,
  setAppState,
}: {
  appState: AppState;
  actionManager: ActionManager;
  renderCustomFooter?: ExcalidrawProps["renderFooter"];
  showExitZenModeBtn: boolean;
  onImageAction: (data: { insertOnCanvasDirectly: boolean }) => void;
  onPenModeToggle: () => void;
  onLockToggle: () => void;
  setAppState: React.Component<any, AppState>["setState"];
  elements: readonly NonDeletedExcalidrawElement[];
  canvas: HTMLCanvasElement | null;
}) => {
  const device = useDevice();
  // const showFinalize =
  //   !appState.viewModeEnabled && appState.multiElement && device.isTouchScreen;
  return (
    <footer
      role="contentinfo"
      className="layer-ui__wrapper__footer App-menu App-menu_bottom"
    >
      <div
        className={clsx("layer-ui__wrapper__footer-left zen-mode-transition", {
          "layer-ui__wrapper__footer-left--transition-left":
            appState.zenModeEnabled,
        })}
      >
        <Stack.Row gap={2} justifyContent="center">
          {/* <Section heading="canvasActions">
            <Island padding={1}>
              <ZoomActions
                renderAction={actionManager.renderAction}
                zoom={appState.zoom}
              />
            </Island>
            {!appState.viewModeEnabled && (
              <>
                <UndoRedoActions
                  renderAction={actionManager.renderAction}
                  className={clsx("zen-mode-transition", {
                    "layer-ui__wrapper__footer-left--transition-bottom":
                      appState.zenModeEnabled,
                  })}
                />

                <div
                  className={clsx("eraser-buttons zen-mode-transition", {
                    "layer-ui__wrapper__footer-left--transition-left":
                      appState.zenModeEnabled,
                  })}
                >
                  {actionManager.renderAction("eraser", { size: "small" })}
                </div>
              </>
            )}
            {showFinalize && (
              <FinalizeAction
                renderAction={actionManager.renderAction}
                className={clsx("zen-mode-transition", {
                  "layer-ui__wrapper__footer-left--transition-left":
                    appState.zenModeEnabled,
                })}
              />
            )}
          </Section> */}
          {!appState.viewModeEnabled && (
            <Section heading="shapes">
              {(heading: React.ReactNode) => (
                <Stack.Col gap={4} align="start">
                  <Stack.Row
                    gap={1}
                    className={clsx("App-toolbar-container", {
                      "zen-mode": appState.zenModeEnabled,
                    })}
                  >
                    <PenModeButton
                      zenModeEnabled={appState.zenModeEnabled}
                      checked={appState.penMode}
                      onChange={onPenModeToggle}
                      title={t("toolBar.penMode")}
                      penDetected={appState.penDetected}
                    />
                    <LockButton
                      zenModeEnabled={appState.zenModeEnabled}
                      checked={appState.activeTool.locked}
                      onChange={() => onLockToggle()}
                      title={t("toolBar.lock")}
                    />
                    <Island
                      padding={1}
                      className={clsx("App-toolbar", {
                        "zen-mode": appState.zenModeEnabled,
                      })}
                    >
                      <HintViewer
                        appState={appState}
                        elements={elements}
                        isMobile={device.isMobile}
                      />
                      {heading}
                      <Stack.Row gap={1}>
                        <ShapesSwitcher
                          appState={appState}
                          canvas={canvas}
                          activeTool={appState.activeTool}
                          setAppState={setAppState}
                          onImageAction={({ pointerType }) => {
                            onImageAction({
                              insertOnCanvasDirectly: pointerType !== "mouse",
                            });
                          }}
                        />
                      </Stack.Row>
                    </Island>
                    {!appState.viewModeEnabled && (
                      <>
                        <UndoRedoActions
                          renderAction={actionManager.renderAction}
                          className={clsx("zen-mode-transition", {
                            "layer-ui__wrapper__footer-left--transition-bottom":
                              appState.zenModeEnabled,
                          })}
                        />

                        <div
                          className={clsx(
                            "eraser-buttons zen-mode-transition",
                            {
                              "layer-ui__wrapper__footer-left--transition-left":
                                appState.zenModeEnabled,
                            },
                          )}
                        >
                          {actionManager.renderAction("eraser", {
                            size: "small",
                          })}
                        </div>
                      </>
                    )}
                  </Stack.Row>
                </Stack.Col>
              )}
            </Section>
          )}
        </Stack.Row>
      </div>
      {/* <div
        className={clsx(
          "layer-ui__wrapper__footer-center zen-mode-transition",
          {
            "layer-ui__wrapper__footer-left--transition-bottom":
              appState.zenModeEnabled,
          },
        )}
      >
        {renderCustomFooter?.(false, appState)}
      </div>
      <div
        className={clsx("layer-ui__wrapper__footer-right zen-mode-transition", {
          "transition-right disable-pointerEvents": appState.zenModeEnabled,
        })}
      >
        {actionManager.renderAction("toggleShortcuts")}
      </div>
      <ExitZenModeAction
        actionManager={actionManager}
        showExitZenModeBtn={showExitZenModeBtn}
      /> */}
    </footer>
  );
};

export default Footer;

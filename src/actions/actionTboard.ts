/**
 * Custom actions функционала TBoard
 */
import { APP_NAME } from "../constants";
import { NonDeletedExcalidrawElement } from "../element/types";
import { collabAPIAtom } from "../excalidraw-app/collab/Collab";
import { jotaiStore } from "../jotai";
import { AppState } from "../types";

/**
 * Проверка, что комната еще не запущена.
 * @returns boolean
 */
export const checkCollaborationStarted = () => {
  const store = jotaiStore.get(collabAPIAtom);

  return store?.isCollaborating() || false;
};

/**
 * Функция запуска новой комнаты.
 * Универсальная, можно запускать из любого компонента.
 * @param newRoomLinkData Параметры новой комнаты
 * @return void
 */
export const startCollaboration = (
  newRoomLinkData: null | {
    roomId: string;
    roomKey: string;
    query?: Record<string, string>;
  },
) => {
  const store = jotaiStore.get(collabAPIAtom);

  return store?.startCollaboration(null, newRoomLinkData);
};

/**
 * Глобальная функция обработки нового состояния
 * @param state
 * @returns
 */
export const onAppStateUpdate = (state: AppState) => {};

/**
 * Функция изменения параметров урла
 * @param selectedElements
 * @param state
 */
export const extendUrlParams = (
  selectedElements: NonDeletedExcalidrawElement[],
  state: AppState,
) => {
  const { collaborators } = state;

  if (!selectedElements.length) {
    window.location.hash = window.location.hash.replace(
      /&groupId=([a-zA-Z0-9_-]+)/,
      "",
    );
  } else if (collaborators?.size > 0) {
    let selectedId = "";

    if (selectedElements.length === 1) {
      selectedId = selectedElements[0].id;
    } else {
      const groupIds = selectedElements.reduce((acc, el) => {
        acc = acc.concat(el.groupIds);
        return acc;
      }, [] as string[]);

      const uniq = [...new Set(groupIds)];

      if (uniq.length > 0) {
        selectedId = uniq[0];
      } else {
        selectedId = selectedElements[0].id;
      }
    }

    if (selectedId) {
      const match = window.location.hash.match(/groupId=([a-zA-Z0-9_-]+)/);
      if (match?.length === 2) {
        const newUrl = window.location.hash.replace(match[1], selectedId);
        window.history.pushState({}, APP_NAME, newUrl);
      } else {
        window.history.pushState(
          {},
          APP_NAME,
          `${window.location.hash}&groupId=${selectedId}`,
        );
      }
    }
  }
};

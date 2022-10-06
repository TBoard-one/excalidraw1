/**
 * Custom actions функционала TBoard
 */
import { isEmpty } from "lodash";
import { APP_NAME } from "../constants";
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
export const onAppStateUpdate = (state: AppState) => {
  const { selectedGroupIds, selectedElementIds, collaborators } = state;

  // Подстановка Id элемента или группы в урл
  if (collaborators?.size > 0) {
    let selectedId = "";
    if (!isEmpty(selectedGroupIds)) {
      selectedId = Object.keys(selectedGroupIds)[0];
    } else if (!isEmpty(selectedElementIds)) {
      selectedId = Object.keys(selectedElementIds)[0];
    } else {
      window.location.hash = window.location.hash.replace(
        /&groupId=([a-zA-Z0-9_-]+)/,
        "",
      );
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

import events from "@/json/events/events";
import { BaseApiResponse } from "@/typescript/interface/common.interface";
import { AxiosError, AxiosResponse } from "axios";
import eventEmitter from "services/event.emitter";
/**
 * Check if the window object exists.
 * @returns A function that checks if the window is undefined.
 */
export function checkWindow() {
  return typeof window !== "undefined";
}

export function isInServer() {
  return typeof document === "undefined";
}

export function isApple() {
  if (typeof navigator === "undefined") {
    return false;
  }
  const platformExpression = /Mac|iPhone|iPod|iPad/i;
  const agent = navigator.userAgent;
  return platformExpression.test(agent);
}

export function getTimezone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export function isAppleSafari() {
  if (typeof navigator === "undefined") {
    return false;
  }
  const rejectedExpression = /Chrome|Android|CriOS|FxiOS|EdgiOS/i;
  const expectedExpression = /Safari/i;

  const agent = navigator.userAgent;
  if (rejectedExpression.test(agent)) {
    return false;
  }
  return isApple() && expectedExpression.test(agent);
}

export const globalCatchSucess = (response: AxiosResponse<BaseApiResponse>) => {
  let message = "Something went wrong";
  if (response?.data?.message) {
    message = response?.data.message;
  }
  eventEmitter.emit(events.showNotification, {
    message,
    variant: "success"
  });
};

export const globalCatchWarning = (
  response: AxiosResponse<BaseApiResponse>
) => {
  let message = "Something went wrong";
  if (response?.data?.message) {
    message = response?.data.message;
  }

  eventEmitter.emit(events.showNotification, {
    message,
    variant: "warning"
  });
};

export const globalCatchError = (error: AxiosError<BaseApiResponse>) => {
  let message = "Something went wrong";
  if (error.response?.data?.message) {
    message = error.response?.data.message;
  }
  eventEmitter.emit(events.showNotification, {
    message,
    variant: "error"
  });
};

export const roleParser = (role: string) => {
  return role.replace("ROLE_", "").replaceAll("_", " ");
};

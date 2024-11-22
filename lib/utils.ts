import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cx(...args: ClassValue[]) {
  return twMerge(clsx(...args));
}

export function convertJSONToFormData(body: object) {
  const formData = new FormData();
  Object.entries(body).forEach((_entry) => {
    if (typeof _entry[1] === "object") formData.append(_entry[0], _entry[1][0]);
    else formData.append(_entry[0], _entry[1]);
  });
  return formData;
}

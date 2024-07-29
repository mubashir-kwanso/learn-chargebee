import { useLocalStorage } from "usehooks-ts";

export const useUser = () => {
  return useLocalStorage("user", {
    email: "",
  });
};

import { useEffect } from "react";

export function useKey(KEY, action) {
    //we are directly touching dom (listener to window) -> It's a side effect -> so, using useEffect
  useEffect(
    function () {
      function callback(event) {
        if (event.key.toLowerCase() === KEY.toLowerCase()) {
            action();
        }
      }

      document.addEventListener("keydown", callback);

      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [KEY, action] 
  );
}
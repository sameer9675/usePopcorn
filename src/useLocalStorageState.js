import { useState, useEffect } from "react";

export function useLocalStorageState(initialState, key) {
   
    const [value, setValue] = useState(function () {
    
        // this callback fxn should be pure -> it will not receive any argument ->react will only consider this call back fxn on initial render (first mount) just like value
        if (localStorage.key(key)) {
            return JSON.parse(localStorage.getItem(key));
        } else {
            return initialState;
        }
    });

    useEffect(
        function () {
          localStorage.setItem(key, JSON.stringify(value));
        },
        [value, key]
    );

    return [value, setValue];
}
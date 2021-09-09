import { useState } from "react";

//custom hook that handles the form actions and status based on transition between modes of operations
export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replacing = false) {
    setHistory((prev) => {
      const newHistory = [...prev];
      if (replacing) {
        newHistory.pop();
      }

      return [...newHistory, newMode];
    });
  }

  function back() {
    if (history.length < 2) {
      return;
    }

    setHistory((prev) => {
      const newHistory = [...prev];
      newHistory.pop();
      return newHistory;
    });
  }

  const mode = history[history.length - 1];
  return { mode, transition, back };
}

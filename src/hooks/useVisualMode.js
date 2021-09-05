import {useState} from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  function transition(newMode, replacing = false) {
    setMode(newMode);
    if (replacing) {
      setHistory(history.splice(history.length-1, 1));
    }
    setHistory([...history, newMode]);
    
  }

  function back() {
    if (history.length > 1) { 
      setHistory(history.splice(history.length-1, 1));
      setMode(history[history.length-1]);
    } else {
      setMode(initial);
    }
  }
  return {mode, transition, back};
}
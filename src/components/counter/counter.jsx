import { useEffect, useRef, useState } from "react";
import "./counter.css";

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="counter">
      <button className="btn" onClick={() => setCount(count - 1)}>
        -
      </button>
      <span className="count">{count}</span>
      <button className="btn" onClick={() => setCount(count + 1)}>
        +
      </button>
    </div>
  );
}

export function ClickCounter() {
  const inputRef = useRef(null);
  const countRef = useRef(0);

  useEffect(() => {
    // Input-a fokus qoy
    inputRef.current.focus();
  }, []);

  const handleClick = () => {
    countRef.current += 1;
    console.log("Klik sayı:", countRef.current);
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={handleClick}>Tıkla</button>
    </div>
  );
}

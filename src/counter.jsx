import { useState } from "react";
import "./counter.css";

export default function Counter() {
    const [count, setCount] = useState(0)

   
    return (
        <div className="counter">
            <button className="btn" onClick={()=> setCount(count - 1)}>-</button>
            <span className="count">{count}</span>
            <button className="btn" onClick={()=> setCount(count + 1)}>+</button>
        </div>
    );
}
import { useState, useEffect } from 'react';

function Ex1(props) {
    const { initCount, amount } = props;
    const [count, setCount] = useState(initCount);

    useEffect(
        () => {
            localStorage.setItem("count", count)
        }, [count]
    )

    return (
        <div>
            <h1>Ex1</h1>
            <p>{count}</p>
            <button onClick={() =>setCount(count - amount)}>-</button>
            <button onClick={() => setCount(count + amount)}>+</button>
        </div>
    )
}

export default Ex1;
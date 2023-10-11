import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./MyComponent.css";

function MyComponent({ initialCount, onButtonClick }) {
  const [count, setCount] = useState(initialCount);
  const [error, setError] = useState("");

  useEffect(() => {
    setCount(initialCount ?? 0);
  }, [initialCount]);

  useEffect(() => {
    if (count < 0) {
      setError("Error: Count cannot be negative");
    } else {
      setError("");
    }
  }, [count]);

  return (
    <div>
      {error ? <p className="error-message">{error}</p> : <p>Count: {count}</p>}
      <button
        className="increment-button"
        onClick={() => {
          setCount(count + 1);
          onButtonClick && onButtonClick(count + 1);
        }}
      >
        Increment
      </button>
    </div>
  );
}

MyComponent.propTypes = {
  initialCount: PropTypes.number,
  onButtonClick: PropTypes.func,
};

MyComponent.defaultProps = {
  initialCount: 0,
};

export default MyComponent;

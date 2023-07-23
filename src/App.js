import React, { useState, useEffect } from "react";
import { db } from "./firebase";

const App = () => {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    const fetchInputs = async () => {
      const input1Ref = db.ref("/input1");
      const input2Ref = db.ref("/input2");

      const input1Snap = await input1Ref.once("value");
      const input2Snap = await input2Ref.once("value");

      setInput1(input1Snap.val() || "");
      setInput2(input2Snap.val() || "");
    };

    fetchInputs();
  }, []);

  const handleChange = async (e, setInput, inputRef) => {
    const value = e.target.value;
    setInput(value);

    if (!isNaN(value)) {
      const ref = db.ref(inputRef);
      await ref.set(value);

      setResult(input1 * input2);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={input1}
        onChange={(e) => handleChange(e, setInput1, "/input1")}
      />
      X
      <input
        type="text"
        value={input2}
        onChange={(e) => handleChange(e, setInput2, "/input2")}
      />
      ={result}
    </div>
  );
};

export default App;

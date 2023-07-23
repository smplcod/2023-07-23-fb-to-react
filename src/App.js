import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue, set } from "./firebase";

const App = () => {
  const db = getDatabase();
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    const fetchInputs = async () => {
      const input1Ref = ref(db, "/input1");
      const input2Ref = ref(db, "/input2");

      onValue(input1Ref, (snapshot) => {
        setInput1(snapshot.val() || "");
      });

      onValue(input2Ref, (snapshot) => {
        setInput2(snapshot.val() || "");
      });
    };

    fetchInputs();
  }, [db]);

  const handleChange = async (e, setInput, inputRefStr) => {
    const value = e.target.value;
    setInput(value);

    if (!isNaN(value)) {
      const inputRef = ref(db, inputRefStr);
      await set(inputRef, value);

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

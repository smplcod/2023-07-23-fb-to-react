import React, { useState, useEffect } from "react";
import { getDbRef } from "./firebase";
import { onValue, set } from "firebase/database";

const App = () => {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    const fetchInputs = async () => {
      const input1Ref = getDbRef("/input1");
      const input2Ref = getDbRef("/input2");

      onValue(input1Ref, (snapshot) => {
        setInput1(snapshot.val() || "");
      });

      onValue(input2Ref, (snapshot) => {
        setInput2(snapshot.val() || "");
      });
    };

    fetchInputs();
  }, []);

  useEffect(() => {
    if (input1 !== "" && input2 !== "") {
      setResult(input1 * input2);
    }
  }, [input1, input2]);

  const handleChange = async (e, setInput, inputRef) => {
    const value = e.target.value;
    setInput(value);

    if (!isNaN(value)) {
      const ref = getDbRef(inputRef);
      await set(ref, value);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={input1}
        onChange={(e) => handleChange(e, setInput1, "/input1")}
      />
      *
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

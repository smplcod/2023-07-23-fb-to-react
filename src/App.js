import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue, set } from "firebase/database";

const db = getDatabase();

const App = () => {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    const fetchInputs = async () => {
      const input1Ref = ref(db, "/input1");
      const input2Ref = ref(db, "/input2");

      const input1Snap = await onValue(input1Ref, (snapshot) => {
        setInput1(snapshot.val() || "");
      });

      const input2Snap = await onValue(input2Ref, (snapshot) => {
        setInput2(snapshot.val() || "");
      });

      if (!isNaN(input1Snap.val()) && !isNaN(input2Snap.val())) {
        setResult(input1Snap.val() * input2Snap.val());
      }
    };

    fetchInputs();
  }, []);

  const handleChange = async (e, setInput, inputRef) => {
    const value = e.target.value;
    setInput(value);

    if (!isNaN(value)) {
      const ref = db.ref(inputRef);
      await set(ref, value);

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

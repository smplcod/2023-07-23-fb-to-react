import React, { useState, useEffect } from "react";
import firebase from "firebase";

function App() {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [result, setResult] = useState("Invalid input");

  useEffect(() => {
    const dbRef = firebase.database().ref();

    dbRef
      .child("input1")
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          setValue1(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });

    dbRef
      .child("input2")
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          setValue2(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const val1 = parseFloat(value1);
    const val2 = parseFloat(value2);
    if (isNaN(val1) || isNaN(val2)) {
      setResult("Invalid input");
    } else {
      setResult(val1 * val2);
    }
  }, [value1, value2]);

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    if (field === "input1") {
      setValue1(value);
    } else {
      setValue2(value);
    }
    firebase
      .database()
      .ref("/" + field)
      .set(value);
  };

  return (
    <div>
      <input value={value1} onChange={(e) => handleInputChange(e, "input1")} />{" "}
      X
      <input
        value={value2}
        onChange={(e) => handleInputChange(e, "input2")}
      />{" "}
      =<span> {result} </span>
    </div>
  );
}

export default App;

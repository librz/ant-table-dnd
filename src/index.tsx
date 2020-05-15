import React from "react";
import ReactDOM from "react-dom";
import FlexTable from "./FlexTable";
import 'antd/dist/antd.css'

const App = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: 50}}>
      <FlexTable />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

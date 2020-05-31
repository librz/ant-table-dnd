import React from "react";
import ReactDOM from "react-dom";
import columns from "./Columns";
import rows from "./Rows";
// import SuperAntTable from "./SuperAntTable";
import "antd/dist/antd.css";
// import AntTableDnd from "./AntTableDnd";
import SuperAntTable from "./SuperAntTable";

const App = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: 50 }}>
      <SuperAntTable
        size="small"
        columns={columns}
        dataSource={rows}
        bordered
        pagination={false}
        rowKey="name"
        style={{
          width: "80%",
        }}
        dragggingStyle={{
          backgroundColor: "lightgreen",
          border: "2px dotted white",
        }}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

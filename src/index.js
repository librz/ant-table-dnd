import React from "react";
import ReactDOM from "react-dom";
import columns from "./Columns";
import rows from "./Rows";
import DraggableTable from './DraggableTable';
import "antd/dist/antd.css";
// import AntTableDnd from "./AntTableDnd";

const App = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: 50 }}>
      <DraggableTable
        columns={columns}
        bordered
        pagination={false}
        dataSource={rows}
        rowKey="name"
        style={{
          width: "90%"
        }}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

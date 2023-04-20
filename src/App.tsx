import React from "react";
import AntTableDnd from "./AntTableDnd";
import columns from "./Columns";
import rows from "./Rows";
import { ArrowDownOutlined } from "@ant-design/icons";

export default function App() {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: 50 }}>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 20,
          }}
        >
          <div style={{ fontSize: 20, fontWeight: "bold" }}>
            点击设置然后进行拖拽
            (上下拖拽可以改变列的显示顺序，左右拖拽可以显示/隐藏列)
          </div>
          <ArrowDownOutlined style={{ fontSize: 24 }} />
        </div>
        <AntTableDnd
          columns={columns}
          bordered
          pagination={false}
          dataSource={rows}
          rowKey="name"
        />
      </div>
    </div>
  );
};


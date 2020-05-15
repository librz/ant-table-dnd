import React, { useState } from "react";
import { Table } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import columns, { TableColumn } from "./Columns";
import rows from "./Rows";
import SettingModal from "./SettingModal";

interface ColumnSetting {
  columnsToShow: string[];
  columnsToHide: string[];
}

const FlexTable = () => {
  const [showModal, setShowModal] = useState(false);
  const [columnsToShow, setColumnsToShow] = useState(columns);

  return (
    <div style={{ width: "80vw" }}>
      <div style={{ textAlign: "right", fontSize: 24, lineHeight: 2 }}>
        <SettingOutlined
          style={{ cursor: "pointer" }}
          onClick={() => setShowModal(true)}
        />
      </div>
      <Table
        bordered
        pagination={false}
        columns={columnsToShow}
        dataSource={rows}
        rowKey="name"
      />
      {showModal && (
        <SettingModal
          columnsToShow={columnsToShow}
          columnsToHide={columns.filter(
            (item) => !columnsToShow.some((ele) => ele.key === item.key)
          )}
          onCancel={() => setShowModal(false)}
          onOK={(columnsToDisplay: Array<TableColumn>) => {
            setColumnsToShow(columnsToDisplay);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};
export default FlexTable;

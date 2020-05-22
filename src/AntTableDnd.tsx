import React, { useState } from "react";
import { SettingOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { TableProps } from "antd/lib/table";
import SettingModal from "./SettingModal";

const FlexTable : React.FC<TableProps<any>> = ({ columns = [], ...restProps }) => {
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
        columns={columnsToShow}
        {...restProps}
      />
      {showModal && (
        <SettingModal
          columnsToShow={columnsToShow}
          columnsToHide={columns.filter(
            (item) => !columnsToShow.some((ele) => ele.key === item.key)
          )}
          onCancel={() => setShowModal(false)}
          onOK={(columnsToDisplay) => {
            setColumnsToShow(columnsToDisplay);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};
export default FlexTable;

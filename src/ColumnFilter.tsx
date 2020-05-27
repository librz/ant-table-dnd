import React, { useState } from "react";
import { Menu, Dropdown, Checkbox, Input } from "antd";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";

interface Props {
  title?: string;
  columns: any[];
  onCheck: Function;
}

const ColumnFilter: React.FC<Props> = ({
  columns,
  title = "Show/Hide Columns",
  onCheck,
}) => {
  const [checkedColumns, setCheckedColumns] = useState(columns);
  const [menuVisible, setMenuVisible] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState(columns);
  const [searchString, setSearchString] = useState("");

  const handleMenuVisibleChange = (flag: boolean) => {
    setMenuVisible(flag);
    setSearchString("");
    if (flag) {
      setVisibleColumns(columns);
    }
  };

  const toggleCheck = (colDataIndex: string) => {
    let result = [];
    if (checkedColumns.some((item) => item.dataIndex === colDataIndex)) {
      result = checkedColumns.filter((item) => item.dataIndex !== colDataIndex);
    } else {
      result = [
        ...checkedColumns,
        columns.find((item) => item.dataIndex === colDataIndex),
      ];
    }
    setCheckedColumns(result);
    onCheck(result);
  };

  const handleSearch = (input: string) => {
    setSearchString(input);
    // console.log({columns})
    if (!input) {
      setVisibleColumns(columns);
      return;
    }
    const result = columns.filter((col) =>
      col.title.toUpperCase().startsWith(input.toUpperCase())
    );
    setVisibleColumns(result);
  };

  const getMenu = () => {
    return (
      <Menu
        onClick={({ key }) => {
          if (key === "search-bar") return;
          toggleCheck(key);
        }}
      >
        <Menu.Item key="search-bar">
          <Input
            value={searchString}
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
            allowClear
            style={{ width: 200, marginRight: 20 }}
          />
          <SearchOutlined style={{ fontSize: 16 }} />
        </Menu.Item>
        {visibleColumns.map((ele) => (
          <Menu.Item key={ele.dataIndex}>
            <div style={{ display: "flex" }}>
              <Checkbox
                checked={checkedColumns.some(
                  (item) => item.dataIndex === ele.dataIndex
                )}
                onChange={(e) => {
                  e.stopPropagation();
                  toggleCheck(ele.dataIndex);
                }}
                style={{ marginRight: 7 }}
              />
              <span>{ele.title}</span>
            </div>
          </Menu.Item>
        ))}
      </Menu>
    );
  };

  return (
    <Dropdown
      overlay={getMenu()}
      trigger={["click"]}
      visible={menuVisible}
      onVisibleChange={handleMenuVisibleChange}
    >
      <div
        style={{
          border: "1px solid silver",
          display: "inline-block",
          padding: "5px 10px",
          cursor: "pointer",
        }}
      >
        {title} <DownOutlined />
      </div>
    </Dropdown>
  );
};

export default ColumnFilter;

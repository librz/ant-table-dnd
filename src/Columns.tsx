export interface TableColumn {
  key: string;
  dataIndex: string;
  title: string;
}

const columns = [
  {
    key: "name",
    dataIndex: "name",
    title: "姓名",
  },
  {
    key: "age",
    dataIndex: "age",
    title: "年龄",
  },
  {
    key: "sex",
    dataIndex: "sex",
    title: "性别",
    render: (val: any) => (val ? "Male" : "Female"),
  },
  {
    key: "address",
    dataIndex: "address",
    title: "地址",
  },
  {
    key: "hobby",
    dataIndex: "hobby",
    title: "爱好",
  },
  {
    key: "phone",
    dataIndex: "phone",
    title: "电话号码",
  },
];

export default columns;

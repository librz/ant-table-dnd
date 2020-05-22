const columns = [
  {
    key: "name",
    dataIndex: "name",
    title: "Name"
  },
  {
    key: "age",
    dataIndex: "age",
    title: "Age",
  },
  {
    key: "sex",
    dataIndex: "sex",
    title: "Sex",
    render: (val: any) => (val ? "Male" : "Female"),
  },
  {
    key: "address",
    dataIndex: "address",
    title: "Address",
  },
  {
    key: "hobby",
    dataIndex: "hobby",
    title: "Hobbies",
  },
  {
    key: "phone",
    dataIndex: "phone",
    title: "Phone Number",
  },
];

export default columns;

export const definition = {
  heading: "京葉地区青年交わり会参加申込",
  date: "2024年2月25日",
  form: [
    {
      type: "text",
      label: "教会名",
      name: "church",
      maxlength: "128",
      required: true,
    },
    {
      type: "text",
      label: "氏名",
      name: "name",
      maxlength: "128",
      required: true,
    },
    {
      type: "text",
      label: "年齢",
      name: "age",
      maxlength: "2",
      title: "数字2桁を入力してください",
      pattern: "^[1-9][0-9]?$",
      required: true,
    },
  ],
};

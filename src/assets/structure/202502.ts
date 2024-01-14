export const definition = {
  heading: '京葉地区青年交わり会参加申込',
  date: '2024年2月25日',
  items: [
    {
      type: 'text',
      name: 'church',
      label: '教会名',
      maxlength: '128',
      required: true
    },
    {
      type: 'text',
      name: 'name',
      label: '氏名',
      maxlength: '128',
      required: true
    },
    {
      type: 'text',
      name: 'age',
      label: '年齢',
      maxlength: '2',
      title: '数字2桁を入力してください',
      pattern: '^[1-9][0-9]?$',
      required: true
    },
    {
      type: 'radio',
      name: 'gender',
      items: [
        { label: '男性', value: '1' },
        { label: '女性', value: '2' }
      ]
    },
    {
      type: 'radio',
      name: 'status',
      items: [
        { label: '教会員', value: '1' },
        { label: '非教会員', value: '2' },
        { label: '指導者', value: '3' }
      ]
    },
    {
      type: 'checkbox',
      name: 'dinner',
      label: '食事会参加希望'
    }
  ]
}

export const defaultPostData = {
  church: '',
  name: '',
  age: '',
  gender: '1',
  status: '1',
  dinner: false
}

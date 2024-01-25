import list from '@/assets/datalist/keiyo.json'

const definition = {
  heading: '京葉地区青年交わり会参加申込',
  date: '2024年2月25日',
  dueDate: '2024/02/18',
  message: '今回の交わり会は参加費不要です。懇親会にご参加される方は1500円が必要となります。',
  link: 'https://info.nitonabbc.org/2024/02/',
  organizer: '仁戸名聖書バプテスト教会',
  items: [
    {
      type: 'text',
      name: 'church',
      label: '教会名',
      maxlength: '128',
      datalist: list,
      required: true,
      disabled: false
    },
    {
      type: 'text',
      name: 'name',
      label: '氏名',
      maxlength: '64',
      required: true,
      disabled: false
    },
    {
      type: 'text',
      name: 'kana',
      label: 'ふりがな',
      maxlength: '64',
      required: true,
      disabled: false
    },
    {
      type: 'select',
      name: 'generation',
      label: '世代',
      required: true,
      disabled: false,
      options: [
        { label: '10代', value: '10' },
        { label: '20代', value: '20' },
        { label: '30代', value: '30' },
        { label: '40代', value: '40' },
        { label: '50代', value: '50' },
        { label: '60代', value: '60' }
      ]
    },
    {
      type: 'radio',
      name: 'gender',
      label: '性別',
      radioItems: [
        { label: '男性', value: '1' },
        { label: '女性', value: '2' }
      ]
    },
    {
      type: 'radio',
      name: 'status',
      label: '教会員など',
      radioItems: [
        { label: '教会員', value: '1' },
        { label: '非教会員', value: '2' },
        { label: '指導者', value: '3' }
      ]
    },
    {
      type: 'checkbox',
      name: 'party',
      label: '懇親会',
      checkboxItems: [{ label: '参加', value: '1', required: false }]
    }
  ]
}

const defaultPostData = {
  church: '',
  name: '',
  kana: '',
  generation: '',
  gender: '',
  status: '',
  party: []
}

export default {
  definition,
  defaultPostData
}

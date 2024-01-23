interface OptionItem {
  label: string
  value: string
}

interface RadioItem {
  label: string
  value: string
}

interface CheckboxItem {
  label: string
  value: string
  required: boolean
}

interface FormItem {
  type: 'text' | 'select' | 'radio' | 'checkbox'
  name: string
  label: string
  maxlength?: string
  datalist?: string[]
  required: boolean
  disabled: boolean
  options?: OptionItem[]
  radioItems?: RadioItem[]
  checkboxItems?: CheckboxItem[]
}

export interface Definition {
  heading: string
  date: string
  dueDate: string
  message: string
  link: string
  organizer: string
  items: FormItem[]
}

export interface PostData {
  [key: string]: string | string[]
}

export interface Structure {
  definition: Definition
  defaultPostData: PostData
}

export const importStructure = async (year: string, month: string): Promise<Structure> => {
  return await import(`../assets/structure/${year}${month}`)
}

import structure202402 from '@/assets/structure/202402'

const structureList: Record<string, Structure> = {
  '202402': structure202402
}

export interface OptionItem {
  label: string
  value: string
}

export interface RadioItem {
  label: string
  value: string
}

export interface CheckboxItem {
  label: string
  value: string
  required: boolean
}

export interface FormItem {
  type: string
  name: string
  label: string
  maxlength?: string
  datalist?: string[]
  required?: boolean
  disabled?: boolean
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

export const getStructure = (target: string): Structure | undefined => {
  return structureList[target]
}

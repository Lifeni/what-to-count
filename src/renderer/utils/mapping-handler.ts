import { Dispatch, SetStateAction } from 'react'
import { MappingType } from '../index'

export const getMapping = (input: string) => {
  return window.store.get(input)
}

export const allMapping = async () => {
  return window.store.all()
}

export const addMapping = async ({ input, name }: MappingType) => {
  window.store.set(input, name)
}

export const removeMapping = async (
  input: string,
  setMapping: Dispatch<SetStateAction<MappingType[]>>
) => {
  window.electron.showConfirm('确认删除这条映射吗？', async () => {
    window.store.del(input)
    setMapping(window.store.all())
  })
}

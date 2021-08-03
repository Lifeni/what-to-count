import { Dispatch, SetStateAction } from 'react'
import { MappingType } from '../index'

export const allMapping = async () => await window.store.all()

export const addMapping = async ({ input, name }: MappingType) =>
  await window.store.set(input, name)

export const removeMapping = async (
  input: string,
  setMapping: Dispatch<SetStateAction<MappingType[]>>
) => {
  window.electron.showConfirm('确认删除这条映射吗？', async () => {
    await window.store.del(input)
    setMapping(await window.store.all())
  })
}

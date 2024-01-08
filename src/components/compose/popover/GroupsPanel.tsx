import { JSX } from 'preact'
import { useAppContext } from '../../../model/AppContext'
import clsx from 'clsx'
import { CharAvatar } from '../../utils/CharAvatar'

export function GroupsPanel (): JSX.Element {
  const context = useAppContext()
  const charGroups = context.charGroups
  const lastGroup = context.lastGroup
  console.log(lastGroup.value)

  return (
    <div class='px-2 py-1 flex flex-col gap-2'>
      {charGroups.value.map((value, idx) => {
        return <GroupItem key={idx} id={idx} selected={lastGroup.value === idx} name={value.name} characterIdxs={value.characterIdxs} />
      })}
      <AddGroup />
    </div>
  )
}

function GroupItem ({ id, name, selected, characterIdxs }: { id: number, name: string, selected: boolean, characterIdxs: number[] }): JSX.Element {
  const context = useAppContext()
  console.log(context.lastIndex.value, context.lastIndex.value === 1 && selected)
  return (
    <div class='flex flex-col gap-2'>
      <div class='border-b-2 flex items-center'>
        <span class='font-bold text-lg grow'>{name}</span>
        <button
          title='Edit Group'
          class='w-4 h-6 flex justify-center items-center transition duration-200 text-gray-600 hover:text-orange-600'
          onClick={() => {
            context.showEditGruopDialog.value = id
          }}
        >
          <span aria-hidden='true' class='w-4 h-4 icon-[solar--pen-bold-duotone]' />
        </button>
      </div>
      {characterIdxs.map((value) => {
        return (
          <button
            class={clsx('shrink-0 rounded-full w-12 h-12 ring-orange-600', { 'ring-2': (context.lastIndex.value === value && selected) })}
            key={value}
            onClick={() => {
              context.lastIndex.value = value
              context.lastGroup.value = id
            }}
          >
            <CharAvatar character={context.shownCharacters.value[value]} />
          </button>
        )
      })}
    </div>
  )
}

function AddGroup (): JSX.Element {
  const context = useAppContext()
  return (
    <div class='w-36 flex grow'>
      <button
        title='Add Group'
        class='flex items-center gap-1 transition duration-200 text-gray-600 hover:text-orange-600'
        onClick={() => { context.showAddGroupDialog.value = true }}
      >
        <span aria-hidden='true' class='icon-[solar--add-folder-bold-duotone]' />
        <span>Add Group</span>
      </button>
    </div>
  )
}

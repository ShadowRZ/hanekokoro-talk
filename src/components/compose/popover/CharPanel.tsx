import { JSX } from 'preact'
import { useAppContext } from '../../../model/AppContext'
import { CharAvatar } from '../../utils/CharAvatar'
import clsx from 'clsx'

export function CharPanel (): JSX.Element {
  const context = useAppContext()
  const shownCharacters = context.shownCharacters

  return (
    <div class='p-1 flex flex-row flex-wrap gap-4 shrink'>
      {shownCharacters.value.map((value, idx) => {
        return (
          <button
            class={clsx('shrink-0 rounded-full w-12 h-12 ring-orange-600', { 'ring-2': context.lastIndex.value === idx && context.lastGroup.value === null })}
            key={idx}
            onClick={() => {
              context.lastIndex.value = idx
              context.lastGroup.value = null
            }}
          >
            <CharAvatar character={value} />
          </button>
        )
      })}
      <button
        title='Add a character'
        class='rounded-full w-12 h-12 flex justify-center items-center transition duration-200 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-900'
        onClick={() => { context.showAddCharDialog.value = true }}
      >
        <span class='w-8 h-8 icon-[solar--add-circle-line-duotone]' />
      </button>
    </div>
  )
}

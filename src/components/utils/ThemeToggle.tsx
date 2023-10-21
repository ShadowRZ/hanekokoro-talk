import { JSX } from 'preact'
import { useAppContext } from '../../model/AppContext'
import { useCallback } from 'preact/hooks'
import clsx from 'clsx'

const themeClasses = [
  ['system', 'icon-[solar--screencast-2-bold-duotone]'],
  ['dark', 'icon-[solar--moon-bold-duotone]'],
  ['light', 'icon-[solar--sun-2-bold-duotone]']
]

const themeTities = {
  system: 'System',
  dark: 'Dark',
  light: 'Light'
}

export function ThemeToggle (): JSX.Element {
  const context = useAppContext()

  const onClick = useCallback((key: ('system' | 'dark' | 'light')) => () => {
    context.theme.value = key
  }, [context.theme])

  return (
    <div class='text-black dark:text-white flex flex-row'>
      {themeClasses.map(([key, className]) => {
        return (
          <button
            key={key}
            onClick={onClick(key as ('system' | 'dark' | 'light'))}
            title={themeTities[key]}
            class={
              clsx(
                'w-12 h-12 justify-center flex items-center rounded-lg transition duration-200 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-900',
                { 'text-orange-600': context.theme.value === key }
              )
            }
          >
            <span class={clsx('w-8 h-8', className)} />
          </button>
        )
      })}
    </div>
  )
}

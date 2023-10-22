import { JSX } from 'preact'
import AboutAction from './AboutAction'
import SettingsAction from './SettingsAction'

export function Header (): JSX.Element {
  return (
    <header class='pointer-events-none z-20 fixed flex justify-end gap-2 w-full p-1'>
      <SettingsAction />
      <AboutAction />
      <a
        href='https://github.com/ShadowRZ/hanekokoro-talk'
        target='_blank'
        rel='noreferrer'
        class='pointer-events-auto w-12 h-12 flex justify-center items-center rounded-xl transition duration-200 bg-white/75 dark:bg-black/75 hover:bg-gray-100 dark:hover:bg-gray-900 text-orange-600'
      >
        <span class='w-8 h-8 icon-[solar--code-2-bold-duotone]' />
      </a>
    </header>
  )
}

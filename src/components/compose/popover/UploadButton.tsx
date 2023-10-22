import { JSX } from 'preact'
import { useRef } from 'preact/hooks'
import { useAppContext } from '../../../model/AppContext'
import { TalkItem } from '../../../model/TalkModels'
import { resizeImageAsUrl } from '../../../utils/FileUtils'
import { useComputed } from '@preact/signals'
import clsx from 'clsx'

export function UploadButton (): JSX.Element {
  const ref = useRef<HTMLInputElement>(null)
  const context = useAppContext()
  const messagesRef = context.messagesRef.value
  const onChange = (): void => {
    if (ref.current !== null && (ref.current.files?.length ?? 0) === 1) {
      const file = ref.current.files![0] // eslint-disable-line @typescript-eslint/no-non-null-assertion
      sendTalkItem(file)
      ref.current.files = null
    }
  }
  const onClick = (): void => {
    if (ref.current !== null) ref.current.click()
  }

  const sendTalkItem = (file: File): void => {
    void (async () => {
      const item: TalkItem = {
        characterIdx: context.lastIndex.value,
        message: {
          type: 'image',
          contentUrl: await resizeImageAsUrl(file, 720)
        }
      }
      context.messages.value = [...context.messages.value, item]
      setTimeout(() => {
        messagesRef?.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
      })
    })()
  }

  const shownCharacters = context.shownCharacters
  const disableUpload = useComputed(() => {
    const character = shownCharacters.value[context.lastIndex.value]
    return character.isNarrator
  })

  return (
    <>
      <button
        disabled={disableUpload}
        onClick={onClick}
        title='Upload Image'
        class={clsx(
          'w-8 h-8 flex justify-center items-center rounded-xl transition duration-200 bg-transparent',
          'enabled:hover:bg-gray-100 enabled:dark:hover:bg-gray-900 disabled:text-black/25 dark:disabled:text-white/25',
          { 'cursor-not-allowed': disableUpload.value }
        )}
      >
        <span aria-hidden class='w-6 h-6 icon-[solar--upload-minimalistic-bold-duotone]' />
      </button>
      <input ref={ref} onChange={onChange} type='file' accept='image/*' class='hidden' />
    </>
  )
}

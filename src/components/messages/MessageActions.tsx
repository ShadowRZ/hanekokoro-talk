import { ComponentChildren, JSX, Ref } from 'preact'
import { forwardRef } from 'preact/compat'
import { useAppContext } from '../../model/AppContext'
import clsx from 'clsx'

export const MessageActions = forwardRef((props: { style?: any, className?: string, messageIdx: number }, ref: Ref<HTMLDivElement>) => {
  const context = useAppContext()
  const removeTalkItem = (): void => {
    context.messages.value = context.messages.value.filter((_, idx) => idx !== props.messageIdx)
  }

  return (
    <div
      ref={ref}
      class={clsx(
        'overflow-hidden fixed w-fit z-40 p-1 rounded-lg bg-white dark:bg-gray-950 shadow-lg ring-1 ring-black dark:ring-white/10 ring-opacity-5 flex flex-row gap-2',
        props.className
      )}
      style={props.style}
    >
      {/* <Button title='Edit' onClick={() => {}}>
        <span class='w-6 h-6 icon-[solar--pen-bold-duotone]' />
      </Button> */}
      <Button title='Remove' onClick={removeTalkItem}>
        <span class='w-6 h-6 icon-[solar--trash-bin-trash-bold-duotone]' />
      </Button>
    </div>
  )
})

function Button ({ title, onClick, children }: { title: string, onClick: any, children: ComponentChildren }): JSX.Element {
  return (
    <button
      title={title}
      onClick={onClick}
      class='w-8 h-8 rounded-xl transition duration-200 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-900 text-black/75 dark:text-white/75 cursor-pointer flex justify-center items-center'
    >
      {children}
    </button>
  )
}

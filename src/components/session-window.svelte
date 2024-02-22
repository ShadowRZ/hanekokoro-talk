<script lang="ts">
  import ComposeSection from './compose/compose-section.svelte'
  import Messages from './message/messages.svelte'
  import CharPopover from './popover/char-popover.svelte'

  import XIcon from '~icons/ph/x'

  import { messages, updateSession } from '../store/messages'
  import { currentSession } from '../store/ui-states'

  export let session: number

  let bottomRef: HTMLDivElement
  let nameRef: HTMLInputElement
  let descRef: HTMLInputElement
  let nameEdit: boolean = false
  let descEdit: boolean = false

  const onNameKeyDown = (ev: KeyboardEvent): void => {
    if (ev.key === 'Enter') {
      nameEdit = false
      updateSession(session, nameRef.value)
    }
  }

  const onDescKeyDown = (ev: KeyboardEvent): void => {
    if (ev.key === 'Enter') {
      descEdit = false
      updateSession(session, undefined, nameRef.value)
    }
  }

  const onKeyDown = (ev: KeyboardEvent): void => {
    if (ev.key !== 'Escape') return

    ev.preventDefault()
    nameEdit = false
    descEdit = false
  }

  const click = (ev: MouseEvent): void => {
    const target = ev.target as HTMLElement

    if (nameRef?.contains(target)) return
    if (descRef?.contains(target)) return

    nameEdit = false
    descEdit = false
  }

  $: sessionItem = $messages[session]
  $: shownSessionName = sessionItem?.nameOverride
  $: shownDescription = sessionItem?.descOverride
</script>

<svelte:window on:keydown={onKeyDown} />
<svelte:document on:click={click} />

<div
  class="flex flex-row px-2 py-1 items-center gap-2 border-b border-zinc-300 dark:border-zinc-800"
>
  <button
    type="button"
    title="Close"
    class="block sm:hidden rounded-full transition duration-200 text-black/25 hover:text-black hover:bg-gray-200/50"
    on:click={() => {
      $currentSession = undefined
    }}
  >
    <XIcon class="m-1" />
  </button>
  <div class="h-12 grow flex flex-col justify-center">
    <input
      bind:this={nameRef}
      readonly={!nameEdit}
      on:click={() => {
        nameEdit = true
      }}
      placeholder="New Session"
      class:cursor-pointer={!nameEdit}
      class:border-zinc-400={nameEdit}
      on:keydown={onNameKeyDown}
      value={shownSessionName ?? ''}
      class="bg-inherit focus:outline-none transition-border-color duration-100 border-b-1 border-transparent font-bold"/>
    <input
      bind:this={descRef}
      readonly={!descEdit}
      placeholder="No Description"
      on:click={() => {
        descEdit = true
      }}
      class:cursor-pointer={!descEdit}
      class:border-zinc-400={descEdit}
      on:keydown={onDescKeyDown}
      value={shownDescription ?? ''}
      class="bg-inherit focus:outline-none transition-border-color duration-100 border-b-1 border-transparent text-sm"/>
  </div>
</div>
<Messages {session} />
<div bind:this={bottomRef} />
<ComposeSection
  {session}
  on:itemsent={() => {
    bottomRef?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest'
    })
  }}
/>
<CharPopover />

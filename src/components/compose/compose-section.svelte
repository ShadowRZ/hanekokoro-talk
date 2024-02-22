<script lang="ts">
  import PaperPlaneTiltDuotone from 'virtual:icons/ph/paper-plane-tilt-duotone'
  import UploadSimpleDuotone from 'virtual:icons/ph/upload-simple-duotone'
  import StickerDuotone from 'virtual:icons/ph/sticker-duotone'
  import UserSwitchDuotone from '~icons/ph/user-switch-duotone'

  import type { TalkItem } from '../../types'
  import { createEventDispatcher } from 'svelte'

  export let session: number

  const dispatch = createEventDispatcher()

  import { insertMessage } from '../../store/messages'
  import { currentCharacter, placeholder, switchButton, switchCharacter } from '../../store/ui-states'
  import { resizeImageAsUrl, selectImage } from '../../lib/utils'

  let enabled = false
  let innerText: string
  let innerHTML: string

  $: enabled = innerText?.trim() !== ''
  $: if (innerText === '\n') innerHTML = ''

  const sendItem = (): void => {
    if (innerText === undefined || innerText === '') return
    const item: TalkItem = {
      charId: $currentCharacter,
      narrator: $currentCharacter === -1,
      content: {
        type: 'text',
        content: innerText
      },
      timestamp: Date.now()
    }

    insertMessage(session, item)

    dispatch('itemsent')

    innerText = ''
  }

  const uploadImage = (): void => {
    void (async () => {
      const file = await selectImage()
      if (file !== undefined) {
        const url = await resizeImageAsUrl(file, 720)
        const item: TalkItem = {
          charId: $currentCharacter,
          narrator: $currentCharacter === -1,
          content: {
            type: 'image',
            contentUrl: url
          },
          timestamp: Date.now()
        }
        insertMessage(session, item)
        dispatch('itemsent')
      }
    })()
  }

  const onKeyDown = (ev: KeyboardEvent): void => {
    if (ev.key === 'Enter') {
      // Supports Shift + Enter
      if (ev.shiftKey) return
      ev.preventDefault()
      sendItem()
    }
  }
</script>

<div
  class="box-content min-h-10 flex items-stretch justify-center px-1 border-t border-zinc-300 dark:border-zinc-800"
>
  <div class="grow flex flex-row shrink-0 items-end justify-center my-1">
    <button
      bind:this={$switchButton}
      on:click={() => {
        $switchCharacter = !$switchCharacter
      }}
      title="Switch Character"
      class="transition duration-200 w-8 h-8 justify-center flex items-center rounded-full text-blue-600 disabled:text-blue-600/50 enabled:hover:bg-blue-100 dark:enabled:hover:bg-blue-900"
    >
      <UserSwitchDuotone />
    </button>
  </div>
  <div class="flex items-center min-h-full w-full max-w-full">
    <div
      bind:innerHTML
      bind:innerText
      role="textbox"
      aria-multiline="true"
      aria-placeholder={$placeholder}
      aria-label={$placeholder}
      tabindex="0"
      contenteditable="plaintext-only"
      on:keydown={onKeyDown}
      style="overflow-wrap: anywhere"
      class="block m-2 grow break-all outline-none hover:cursor-text after:text-gray-500 empty:after:content-[attr(aria-placeholder)]"
    />
  </div>
  <div class="grow flex flex-row shrink-0 items-end justify-center my-1">
    <button
      on:click={uploadImage}
      title="Upload Image"
      disabled={$currentCharacter === -1}
      class="transition duration-200 w-8 h-8 justify-center flex items-center rounded-full text-gray-600 disabled:text-gray-600/50 enabled:hover:bg-gray-100 dark:enabled:hover:bg-gray-900"
      class:cursor-not-allowed={$currentCharacter === -1}
    >
      <UploadSimpleDuotone />
    </button>
    <!-- TODO? -->
    <!-- <button
      title="Send Sticker"
      disabled={$currentCharacter === -1}
      class="transition duration-200 w-8 h-8 justify-center flex items-center rounded-full text-gray-600 disabled:text-gray-600/50 enabled:hover:bg-gray-100 dark:enabled:hover:bg-gray-900"
      class:cursor-not-allowed={$currentCharacter === -1}
    >
      <StickerDuotone />
    </button> -->
    <button
      title="Send Message"
      disabled={!enabled}
      class="transition duration-200 w-8 h-8 justify-center flex items-center rounded-full text-orange-600 disabled:text-orange-600/50 enabled:hover:bg-orange-100 dark:enabled:hover:bg-orange-900"
      class:cursor-not-allowed={!enabled}
      on:click={sendItem}
    >
      <PaperPlaneTiltDuotone />
    </button>
  </div>
</div>

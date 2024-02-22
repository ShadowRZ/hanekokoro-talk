<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { resizeImageAsUrl, selectImage } from '../../lib/utils'

  const dispatch = createEventDispatcher()

  import Dialog from './dialog.svelte'

  import UploadDuotone from '~icons/ph/upload-duotone'
  import type { Character } from '../../types'
  import { addCharacter } from '../../store/character'

  let image: string | undefined
  let name: string | undefined
  let desc: string | undefined

  $: disabled = name === undefined || name.trim() === '' || image === undefined

  const click = (): void => {
    void (async () => {
      const file = await selectImage()
      if (file !== undefined) {
        const url = await resizeImageAsUrl(file, 128)
        image = url
      }
    })()
  }

  const confirm = (): void => {
    const char: Character = {
      id: Date.now(),
      name: name!, // eslint-disable-line @typescript-eslint/no-non-null-assertion
      avatarUrl: image! // eslint-disable-line @typescript-eslint/no-non-null-assertion
    }
    addCharacter(char)

    dispatch('close')
  }
</script>

<Dialog title="Add Character" on:close>
  <div class="flex flex-row gap-4">
    <div
      class="self-center shrink-0 relative rounded-full w-24 h-24 ring-2 ring-orange-600/50 mt-2"
    >
      <!-- svelte-ignore a11y-missing-attribute -->
      {#if image}
        <img src={image} class="w-24 h-24 absolute top-0 left-0 rounded-full" />
      {/if}
      <button
        on:click={click}
        title="Set Avatar"
        class="absolute top-0 left-0 w-24 h-24 rounded-full flex items-center justify-center transform duration-200 opacity-0 focus:opacity-100 hover:opacity-100 hover:bg-gray-600/50 focus:bg-gray-600/50"
      >
        <UploadDuotone class="w-8 h-8 text-orange-50" />
      </button>
    </div>
    <div class="flex flex-col grow">
      <label for="name">Name</label>
      <div class="rounded-md ring-1 ring-gray-400/50 my-1 p-1">
        <input
          type="text"
          id="name"
          name="name"
          required
          class="w-full outline-none bg-transparent"
          bind:value={name}
        />
      </div>
      <label for="desc">Description</label>
      <div class="rounded-md ring-1 ring-gray-400/50 my-1 p-1">
        <input
          type="text"
          id="desc"
          name="desc"
          class="w-full outline-none bg-transparent"
          bind:value={desc}
        />
      </div>
    </div>
  </div>
  <div slot="actions" class="flex flex-row gap-2">
    <button
      on:click={confirm}
      disabled={disabled}
      class="disabled:cursor-not-allowed transition duration-200 rounded-md px-2 py-1 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-600/50 text-white dark:disabled:text-white/50"
    >
      Confirm
    </button>
    <button
      on:click={() => {
        dispatch('close')
      }}
      class="transition duration-200 rounded-md px-2 py-1 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
    >
      Cancel
    </button>
  </div>
</Dialog>

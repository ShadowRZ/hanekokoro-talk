<script lang="ts">
  import { fade, scale } from 'svelte/transition'
  import { createEventDispatcher } from 'svelte'

  import XIcon from '~icons/ph/x'

  let ref: HTMLDivElement

  const dispatch = createEventDispatcher()

  export let title: string

  const onKeyDown = (ev: KeyboardEvent): void => {
    if (ev.key !== 'Escape') return

    ev.preventDefault()
    ev.stopPropagation()

    dispatch('close')
  }

  const click = (ev: MouseEvent): void => {
    const target = ev.target as HTMLElement

    if (ref?.contains(target)) return

    dispatch('close')
  }
</script>

<svelte:window on:keydown={onKeyDown} on:mousedown={click} />

<div transition:fade={{ duration: 150 }} class="absolute top-0 left-0 w-full h-full z-30 bg-gray-600/25 flex items-center justify-center dark:bg-black/75">
  <div
    bind:this={ref}
    class="mx-4 rounded-md bg-white dark:bg-black ring-gray-900 ring-0 dark:ring-1 p-2 text-left align-middle shadow-md w-full max-w-md flex flex-col gap-2"
    transition:scale={{ duration: 150, start: 0.95 }}
  >
    <div class="flex flex-row">
      <h3 class="grow font-bold text-lg">{title}</h3>
      <button
        type="button"
        title="Close"
        class="ml-2 rounded-full transition duration-200 text-black/25 hover:text-black dark:text-white/25 dark:hover:text-white hover:bg-gray-200/50"
        on:click={() => { dispatch('close') }}
      >
        <XIcon class="m-1" />
      </button>
    </div>
    <slot />
    <slot name="actions" />
  </div>
</div>

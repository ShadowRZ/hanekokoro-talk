<script lang="ts">
  import { onMount } from 'svelte'
  import { switchButton, switchCharacter } from '../../store/ui-states'
  import { fly } from 'svelte/transition'
  import CharSelector from '../selectors/char-selector.svelte'

  let ref: HTMLDivElement

  const click = (ev: MouseEvent): void => {
    const target = ev.target as HTMLElement

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if ($switchButton?.contains(target)) return
    if (ref?.contains(target)) return

    if ($switchCharacter) {
      ev.preventDefault()
      ev.stopPropagation()
      $switchCharacter = false
    }
  }

  onMount(() => {
    const unsubscribe = switchCharacter.subscribe((value) => {
      if (value) {
        document.addEventListener('click', click)
      }
    })
    return () => {
      document.removeEventListener('click', click)
      unsubscribe()
    }
  })

  const onKeyDown = (ev: KeyboardEvent): void => {
    if (ev.key !== 'Escape') return
    if (!$switchCharacter) return

    ev.preventDefault()
    ev.stopPropagation()

    $switchCharacter = false
  }
</script>

<svelte:window on:keydown={onKeyDown} />

{#if $switchCharacter}
<div bind:this={ref} transition:fly={{ y: 2, duration: 200 }} class='absolute bottom-11 left-1 z-20 rounded-md bg-white dark:bg-gray-950 ring-1 ring-black/10'>
  <div class="p-2">
    <CharSelector />
  </div>
</div>
{/if}

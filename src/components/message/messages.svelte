<script lang="ts">
  import { messages } from '../../store/messages'
  import NarratorItem from './narrator-item.svelte'
  import TalkItem from './talk-item.svelte'

  export let session: number

  $: items = $messages[session]?.items ?? []
</script>

<div class="flex flex-col gap-1 grow overflow-scroll py-1 scrollbar-none">
  <!-- eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -->
  {#each items as item (item.timestamp)}
    {#if item.narrator && item.content.type === 'text'}
      <NarratorItem content={item.content.content} />
    {:else}
      <TalkItem
        id={item.charId}
        content={item.content} />
    {/if}
  {:else}
    <div class="w-full h-full grow flex items-center justify-center">
      <p class="font-bold text-gray-600 text-xl">Write Something!</p>
    </div>
  {/each}
</div>

<style>
  .scrollbar-none {
    scrollbar-width: none;
  }
  .scrollbar-none::-webkit-scrollbar {
    display: none;
  }
</style>

<script lang="ts">
  import type { ContentImage, ContentSticker, ContentText } from '../../types'
  import CharAvatar from '../lib/char-avatar.svelte'
  import CharName from '../lib/char-name.svelte'

  export let id: number
  export let content: ContentText | ContentImage | ContentSticker
</script>

<div class="w-full flex flex-row items-start justify-start gap-2 px-1">
  <!-- TODO: Actual Image -->
  <div class="rounded-full shrink-0 w-12 h-12 overflow-clip flex items-center justify-center">
    <CharAvatar id={id} />
  </div>
  <div class="flex flex-col">
    <CharName id={id} />
    {#if content.type === 'text'}
      <div class="w-fit">
        <div class="bg-zinc-200 dark:bg-zinc-800 p-2 rounded-xl text-black dark:text-white">{content.content}</div>
      </div>
    {:else if content.type === 'image'}
      <!-- svelte-ignore a11y-missing-attribute -->
      <img src={content.contentUrl} class="rounded-lg" />
    {:else if content.type === 'sticker'}
      <!-- svelte-ignore a11y-missing-attribute -->
      <img src={content.contentUrl} />
    {/if}
  </div>
</div>

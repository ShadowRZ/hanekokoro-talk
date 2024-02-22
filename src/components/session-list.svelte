<script lang="ts">
  import { messages } from '../store/messages'
  import Header from './header.svelte'
  import SessionItem from './lib/session-item.svelte'

  $: sessionIds = $messages.keys()
</script>

<div class="shrink-0 relative w-full sm:w-72 md:w-80 border-r sm:border-zinc-300 dark:sm:border-zinc-800">
  {#each sessionIds as id}
    <SessionItem session={id} />
  {/each}
  <Header />
</div>

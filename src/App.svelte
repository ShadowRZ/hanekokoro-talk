<script lang="ts">
  import TeleportedDialogs from './components/lib/teleported-dialogs.svelte'
  import SessionList from './components/session-list.svelte'
  import SessionWindow from './components/session-window.svelte'
  import { currentSession } from './store/ui-states'
</script>

<div class="flex flex-col h-100dvh">
  <div class="grow flex flex-row">
    <SessionList />
    {#if $currentSession !== undefined}
      <div class="bg-white dark:bg-black absolute w-full sm:relative sm:w-auto grow z-5 flex flex-col h-100dvh">
        <SessionWindow session={$currentSession} />
      </div>
    {:else}
      <div class="hidden w-full h-full grow sm:flex items-center justify-center">
        <p class="font-bold text-gray-600 text-xl">Create a new session on the left.</p>
      </div>
    {/if}
  </div>
</div>

<TeleportedDialogs />

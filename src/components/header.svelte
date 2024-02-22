<script lang="ts">
  import Plus from '~icons/ph/plus'
  import InfoDuotone from '~icons/ph/info-duotone'
  import TrashDuotone from '~icons/ph/trash-duotone'
  import { aboutDialog } from '../store/ui-states'
  import { newSession } from '../store/messages'
  import { clear } from '../lib/indexeddb'
</script>

<header
  class="pointer-events-none absolute top-0 right-0 flex justify-end gap-2 p-2"
>
  <button
    on:click={() => { newSession() }}
    type="button"
    title="New Session"
    class="pointer-events-auto w-10 h-10 flex justify-center items-center rounded-full transition duration-200 bg-zinc-100/50 dark:bg-zinc-900/50 hover:bg-orange-100 dark:hover:bg-orange-900 text-orange-600 ring-orange-600 hover:ring-2"
  >
    <Plus class="w-6 h-6" />
  </button>
  <button
    on:click={() => {
      void (async () => { clear() })()
      location.reload()
    }}
    type="button"
    title="Clear Data and reload"
    class="pointer-events-auto w-10 h-10 flex justify-center items-center rounded-full transition duration-200 bg-zinc-100/50 dark:bg-zinc-900/50 hover:bg-orange-100 dark:hover:bg-orange-900 text-orange-600 ring-orange-600 hover:ring-2"
  >
    <TrashDuotone class="w-6 h-6" />
  </button>
  <button
    on:click={() => { $aboutDialog = true }}
    type="button"
    title="About"
    class="pointer-events-auto w-10 h-10 flex justify-center items-center rounded-full transition duration-200 bg-zinc-100/50 dark:bg-zinc-900/50 hover:bg-orange-100 dark:hover:bg-orange-900 text-orange-600 ring-orange-600 hover:ring-2"
  >
    <InfoDuotone class="w-6 h-6" />
  </button>
</header>

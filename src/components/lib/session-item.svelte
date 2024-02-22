<script lang="ts">
  import { contentString } from '../../lib/utils'
  import { messages } from '../../store/messages'
  import { currentSession } from '../../store/ui-states'

  import ChatsCircleDuotone from '~icons/ph/chats-circle-duotone'

  export let session: number

  $: sessionItem = $messages[session]
  $: shownSessionName = sessionItem?.nameOverride ?? 'New Session'
  $: shownDescription = contentString(sessionItem?.items?.at(-1)?.content)
</script>

<div class="flex flex-row">
  <input
    class="peer appearance-none"
    type="radio"
    id={`s-${session}`}
    name="sessions"
    value={session}
    bind:group={$currentSession}
  />
  <label
    title={shownSessionName}
    for={`s-${session}`}
    class="grow flex flex-row gap-2 p-2 border-dashed border-l-4 peer-checked:border-orange-400 hover:bg-gray-100 dark:hover:bg-gray-900"
  >
    <div
      class="w-10 h-10 flex items-center justify-center bg-gray-200/50 rounded-full"
    >
      <ChatsCircleDuotone
        class="w-6 h-6 text-orange-600 dark:text-orange-200"
      />
    </div>
    <div class="flex flex-col text-sm">
      <span
        class="font-bold"
        class:opacity-50={sessionItem?.nameOverride === undefined}
        >{shownSessionName ?? ''}</span
      >
      <span class:opacity-50={shownDescription === undefined}
        >{shownDescription ?? 'No Description'}</span
      >
    </div>
  </label>
</div>

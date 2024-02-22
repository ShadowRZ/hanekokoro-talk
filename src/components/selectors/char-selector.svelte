<script lang="ts">
  import { characters } from '../../store/character'
  import { addCharacterDialog, currentCharacter, switchCharacter } from '../../store/ui-states'
  import UserCircleDuotone from '~icons/ph/user-circle-duotone'
  import UserCirclePlusDuotone from '~icons/ph/user-circle-plus-duotone'
  import CharAvatar from '../lib/char-avatar.svelte'
</script>

<div class="flex flex-row gap-2">
  <div class="flex flex-row">
    <input
      class="peer appearance-none"
      type="radio"
      id="narrator"
      name="characters"
      value={-1}
      bind:group={$currentCharacter}
    />
    <label
      title="Narrator"
      for="narrator"
      class="transition duration-200 shrink-0 rounded-full w-10 h-10 flex items-center justify-center ring-orange-600/50 peer-checked:ring-2 peer-focus:ring-orange-600 bg-gray-200/50 dark:bg-gray-800/50"
    >
      <UserCircleDuotone aria-hidden class="w-8 h-8 text-orange-600" />
    </label>
  </div>
  {#each $characters as character (character.id)}
  <div class="flex flex-row">
    <input
      class="peer appearance-none"
      type="radio"
      id={`c-${character.id}`}
      name="characters"
      value={character.id}
      bind:group={$currentCharacter} />
    <label
      title={character.name}
      for={`c-${character.id}`}
      class="transition duration-200 shrink-0 rounded-full overflow-clip w-10 h-10 flex items-center justify-center ring-orange-600/50 peer-checked:ring-2 peer-focus:ring-orange-600"
    >
      <CharAvatar id={character.id} />
    </label>
  </div>
  {/each}
  <button
    on:click={() => {
      $switchCharacter = false
      $addCharacterDialog = true
    }}
    type="button"
    title="Add Character"
    class="transition duration-200 shrink-0 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-200/50 dark:hover:bg-gray-800/50"
  >
    <UserCirclePlusDuotone class="w-8 h-8 text-green-600/75" />
  </button>
</div>

<script lang="ts">
  import { characters } from '../../store/character'

  export let id: number

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  $: char = $characters.find((value) => value.id === id)!
</script>

<span class='font-bold flex flex-row gap-1'>
  <span>{char.name}</span>
</span>

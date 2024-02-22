<script lang="ts">
  import { characters } from '../../store/character'
  export let id: number

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  $: char = $characters.find((value) => value.id === id)!
</script>

<img alt={char.name} src={char.avatarUrl} />

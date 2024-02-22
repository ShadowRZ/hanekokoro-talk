<script lang="ts">
  import AddCharDialog from '../dialogs/add-char-dialog.svelte'

  import { aboutDialog, addCharacterDialog } from '../../store/ui-states'
  import AboutDialog from '../dialogs/about-dialog.svelte'
</script>

<!-- Manually teleported dialogs -->
{#if $addCharacterDialog}
  <AddCharDialog
    on:close={() => {
      $addCharacterDialog = false
    }}
  />
{/if}
{#if $aboutDialog}
  <AboutDialog
    on:close={() => {
      $aboutDialog = false
    }}
  />
{/if}

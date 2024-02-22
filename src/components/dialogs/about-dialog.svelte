<script lang="ts">
  import Dialog from './dialog.svelte'
</script>

<Dialog title="About" on:close>
  <div class="flex flex-col">
    <span class="font-bold">Hanekokoro Talk</span>
    <span>
      &copy; 2024 Yorusaka Miyabi -
      Built with
      <a
        class="font-bold text-orange-600 hover:underline underline-dotted"
        href="https://svelte.dev"
        target="_blank"
        rel="noreferrer">
        Svelte
      </a>
      +
      <a
        class="font-bold text-orange-600 hover:underline underline-dotted"
        href="https://github.com/nanostores/nanostores"
        target="_blank"
        rel="noreferrer">
        Nanostores
      </a>
    </span>
    <span>
      <a
        class="font-bold text-orange-600 hover:underline underline-dotted"
        href="https://github.com/ShadowRZ/hanekokoro-talk"
        target="_blank"
        rel="noreferrer">
        View Source Code
      </a>
    </span>
  </div>
</Dialog>

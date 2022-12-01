<template lang="pug">
.container.d-flex
  .wrapper.d-flex
    .icon
    .app-h4 No entries here yet
</template>

<style scoped lang="scss">
.container {
  align-items: center;
  justify-content: center;
  min-height: auto;
  margin-top: 15%;
  .wrapper {
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .icon {
      @include icon-mask("warning", 34px, 34px, var(--text-color-2));
    }
    .app-h4 {
      font-family: "Poppins", sans-serif;
      color: var(--text-color-2);
    }
  }
}
</style>

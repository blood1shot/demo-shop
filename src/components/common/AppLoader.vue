<template lang="pug">
.spinner-wrapper
  .spinner(:style="{ width: `${size}px`, height: `${size}px` }")
</template>

<script lang="ts" setup>
interface IProps {
  size?: number;
}
withDefaults(defineProps<IProps>(), {
  size: 75,
});
</script>

<style scoped lang="scss">
@mixin spinnerCircular($borderWidth, $borderAnotherColor, $borderColor) {
  border-radius: 50%;
  border-top: $borderWidth + px solid $borderAnotherColor;
  border-right: $borderWidth + px solid $borderColor;
  border-bottom: $borderWidth + px solid $borderColor;
  border-left: $borderWidth + px solid $borderColor;
}
@keyframes spinnerCircularAnimate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.spinner-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;

  .spinner {
    @include spinnerCircular(5, var(--text-color-2), transparent);
    animation: spinnerCircularAnimate 0.85s ease-in-out infinite;
  }
}
</style>

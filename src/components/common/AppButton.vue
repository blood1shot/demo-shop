<!-- eslint-disable no-undef -->
<template lang="pug">
button.btn(
  :class="{ btn_outline: outline, btn_disabled: disabled, btn_small: small, btn_icon: outline, btn_white: white }",
  :type="type",
  @click="clickHandler"
)
  .icon.icon_plus(v-if="outline")
  slot
</template>

<script lang="ts" setup>
interface IProps {
  outline?: boolean;
  white?: boolean;
  disabled?: boolean;
  small?: boolean;
  type?: string;
}
// eslint-disable-next-line no-undef
const props = withDefaults(defineProps<IProps>(), {
  outline: false,
  white: false,
  disabled: false,
  type: "",
});
// eslint-disable-next-line no-undef
const emit = defineEmits(["on-click"]);

const clickHandler = (): void => {
  if (!props.disabled) {
    emit("on-click");
  }
};
</script>

<style scoped lang="scss">
.icon {
  display: inline-block;
  margin-right: 4px;
  &.icon_plus {
    cursor: pointer;
    @include icon-mask("plus", 24px, 24px, var(--text-color));
  }
}
.btn {
  align-items: center;
  width: 100%;
  display: inline-flex;
  justify-content: center;
  padding: 14px 32px;
  border-radius: 8px;
  transition: all 0.2s ease-out;
  cursor: pointer;
  background-color: var(--text-color);
  border: 2px solid var(--text-color);
  color: var(--white);
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 28px;
  letter-spacing: 0;
  text-align: center;

  &:hover {
    background-color: transparent;
    color: var(--text-color);
  }
  &:active {
    background-color: rgb(234, 234, 234);
    border-color: var(--text-color);
  }

  &.btn_white,
  &.btn_outline {
    background-color: transparent;
    font-weight: 500;
    color: var(--text-color);
    border: 2px solid var(--text-color);

    &:hover {
      background-color: var(--text-color);
      border-color: var(--text-color);
      color: var(--white);
      .icon_plus {
        @include icon-mask("plus", 24px, 24px, var(--white));
      }
    }
    &:active {
      background-color: black;
      border-color: black;
    }
  }

  &.btn_white {
    border: none;
  }

  &.btn_icon {
    padding: 13px 35px;
  }

  &.btn_disabled {
    cursor: not-allowed;
    &:hover,
    &:active {
      color: unset;
      border-color: unset;
      background-color: unset;
    }
  }

  &.btn_small {
    padding: 10px 32px;
  }
}
</style>

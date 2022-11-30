<template lang="pug">
.outer-div(:class="{ 'outer-div_search': search }")
  fieldset.field-wrapper
    .icon.icon_search(v-if="search")
    legend.legend
      .label(v-if="modelValue && !search") {{ placeholder }}
    input(
      :value="modelValue",
      :placeholder="placeholder",
      :disabled="disabled",
      :class="{ input_search: search, input: !search }",
      onfocus="this.removeAttribute('readonly');",
      readonly,
      @input="(e) => changeHandler(e)"
    )
</template>

<script lang="ts" setup>
interface IProps {
  modelValue: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  type?: string;
  inputHeight?: number;
  search?: boolean;
}
withDefaults(defineProps<IProps>(), {
  modelValue: "",
  label: "",
  placeholder: "",
  disabled: false,
  type: "text",
  inputHeight: 132,
  search: false,
});
const emit = defineEmits(["update:modelValue"]);

const changeHandler = (e: Event): void => {
  const target = e.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>

<style scoped lang="scss">
.icon {
  display: inline-block;
  &.icon_search {
    position: absolute;
    top: 15px;
    left: 15px;
    cursor: pointer;
    @include icon-mask("search", 24px, 24px, var(--text-color-2));
  }
}
.outer-div {
  width: 100%;
}
.outer-div_search {
  width: 442px;
}
.field-wrapper {
  position: relative;
  border: none;
  border-radius: 8px;
  padding: 0 0 0 0;
  margin-left: 0;
  margin-right: 0;
  background-color: var(--white);

  .legend {
    display: block;
    height: 16px;
    position: absolute;
    left: 12px;
    top: -7px;
    .label {
      padding: 0 4px;
      transition: all ease-in-out 200ms;
      font-size: 13px;
      font-family: "Poppins", sans-serif;
      background-color: white;
      border-radius: 5px;
      color: var(--primary);
      font-weight: 500;
    }
  }

  .input {
    transition: all 200ms ease-out;
    display: block;
    border: 1px solid var(--border-color);
    width: 100%;
    border-radius: 8px;
    padding: 13px 16px 13px 16px;
    font-family: "Inter", sans-serif;
    font-size: 16px;
    font-weight: 500;
    line-height: 26px;
    letter-spacing: 0;
    color: var(--text-color);
    resize: none;
    &:focus {
      outline: none;
      border: 1px solid black;
    }
    &:hover {
      border: 1px solid black;
    }
  }
  .input_search {
    transition: all 200ms ease-out;
    display: block;
    border: 1px solid transparent;
    width: 100%;
    border-radius: 8px;
    padding: 13.5px 16px 13.5px 48px;
    font-family: "Inter", sans-serif;
    font-size: 16px;
    font-weight: 500;
    line-height: 26px;
    letter-spacing: 0;
    color: black;
    resize: none;
    background-color: var(--input-background-color);
    &:focus {
      outline: none;
      border: 1px solid black;
      &:hover {
        border: 1px solid black;
      }
    }
    &:hover {
      border: 1px solid var(--border-color);
    }
  }
}
</style>

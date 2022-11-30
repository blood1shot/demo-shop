<template lang="pug">
div
  .slider-component
    .slidecontainer
      input.slider(
        ref="input",
        :value="+modelValue",
        type="range",
        :min="min",
        :max="max",
        @input="(e) => changeHandler(e)"
      )
</template>

<script lang="ts" setup>
interface IProps {
  modelValue: number | string;
  min: number;
  max: number;
}
withDefaults(defineProps<IProps>(), {
  modelValue: 0,
  min: 0,
  max: 1600,
});

const emit = defineEmits(["update:modelValue"]);

const changeHandler = (e: Event): void => {
  const target = e.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>

<style scoped lang="scss">
.slider-component {
  .slidecontainer {
    width: 100%;
    .slider {
      -webkit-appearance: none;
      appearance: none;
      width: 100%;
      height: 4px;
      border-radius: 2px;
      background: #c2c2c2;
      outline: none;
      opacity: 0.7;
      -webkit-transition: 0.2s;
      transition: opacity 0.2s;
      &:hover {
        opacity: 1;
      }
      &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 18px;
        height: 18px;
        background: #d8a22e;
        cursor: pointer;
        border-radius: 50%;
      }
      &::-moz-range-thumb {
        width: 18px;
        height: 18px;
        background: #d8a22e;
        cursor: pointer;
        border-radius: 50%;
      }
    }
  }
  .slider-component-p {
    color: white;
  }
}

// .slider-component .slidecontainer .slider {
//   -webkit-appearance: none;
//   appearance: none;
//   width: 100%;
//   height: 4px;
//   border-radius: 2px;
//   background: #c2c2c2;
//   outline: none;
//   opacity: 0.7;
//   -webkit-transition: 0.2s;
//   transition: opacity 0.2s;
// }

// .slider-component .slidecontainer .slider:hover {
//   opacity: 1;
// }

// .slider-component .slidecontainer .slider::-webkit-slider-thumb {
//   -webkit-appearance: none;
//   appearance: none;
//   width: 18px;
//   height: 18px;
//   background: #d8a22e;
//   cursor: pointer;
//   border-radius: 50%;
// }

// .slider-component .slidecontainer .slider::-moz-range-thumb {
//   width: 18px;
//   height: 18px;
//   background: #d8a22e;
//   cursor: pointer;
//   border-radius: 50%;
// }
</style>

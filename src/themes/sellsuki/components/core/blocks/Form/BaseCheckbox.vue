<template>
  <div>
    <div class="relative mb15">
      <input
        class="m0 no-outline"
        type="checkbox"
        :id="id"
        :checked="value"
        @keyup.enter="$emit('click')"
        @click="$emit('click')"
        @blur="$emit('blur')"
        @change="$emit('change')"
        :disabled="disabled"
      >
      <label
        class="pl35 lh30 pointer"
        :for="id"
      >
        <slot/>
      </label>
    </div>
    <ValidationMessages v-if="validations" :validations="validations"/>
  </div>
</template>

<script>
import ValidationMessages from './ValidationMessages.vue'

export default {
  name: 'BaseCheckbox',
  components: {
    ValidationMessages
  },
  props: {
    id: {
      type: String,
      required: true
    },
    value: {
      type: Boolean,
      required: true
    },
    validations: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~theme/css/variables/colors';
  @import '~theme/css/helpers/functions/color';
  $color-silver: #C4C4C4;
  $color-grey: #EEEEEE;
  $color-active: color(secondary);
  $color-white: color(white);
  $color-black: #404040;

  label {
    user-select: none;
    &:before {
      content: '';
      position: absolute;
      top: 3px;
      left: 0;
      width: 20px;
      height: 20px;
      background-color: $color-grey;
      border: 1px solid $color-silver;
      cursor: pointer;
    }
  }

  input {
    position: absolute;
    top: 3px;
    left: 0;
    opacity: 0;
    &:checked + label {
      &:before {
        background-color: $color-grey;
        border-color: $color-silver;
        cursor: pointer;
      }
      &:after {
        content: '';
        position: absolute;
        top: 9px;
        left: 5px;
        width: 11px;
        height: 5px;
        border: 3px solid $color-black;
        border-top: none;
        border-right: none;
        background-color: $color-grey;
        transform: rotate(-45deg);
      }
    }
    &:hover,
    &:focus {
      + label {
        &:before {
          border-color: $color-silver;
        }
      }
    }
    &:disabled + label {
      cursor: not-allowed;
      opacity: 0.5;
      pointer-events: none;
      &:hover,
      &:focus {
        &:before {
          border-color: $color-silver;
          cursor: not-allowed;
        }
      }
    }
  }
</style>

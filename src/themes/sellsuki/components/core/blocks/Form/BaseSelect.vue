<template>
  <div class="select-wrapper relative">
    <select
      :name="name"
      :class="{
        'cl-tertiary' : options.length === 0,
        'empty': !selected
      }"
      :autocomplete="autocomplete"
      @focus="$emit('focus')"
      @blur="$emit('blur')"
      @change="$emit('input', $event.target.value)"
    >
      <option disabled selected value v-if="!selected"/>
      <option
        v-for="(option, key) in options"
        :key="key"
        :value="option.value"
        v-bind="{selected: option.value === selected}"
      >
        {{ option.label }}
      </option>
    </select>
    <label>{{ placeholder }}</label>

    <ValidationMessages v-if="validations" :validations="validations"/>
  </div>
</template>

<script>
import ValidationMessages from './ValidationMessages.vue'

export default {
  name: 'BaseSelect',
  components: {
    ValidationMessages
  },
  props: {
    id: {
      type: String,
      required: false,
      default: ''
    },
    name: {
      type: String,
      required: false,
      default: ''
    },
    options: {
      type: Array,
      required: true,
      default: () => []
    },
    selected: {
      type: String,
      required: false,
      default: ''
    },
    placeholder: {
      type: String,
      required: false,
      default: ''
    },
    autocomplete: {
      type: String,
      required: false,
      default: ''
    },
    validations: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~theme/css/variables/colors';
  @import '~theme/css/helpers/functions/color';
  @import '~theme/css/base/text';
  $color-tertiary: color(tertiary);
  $color-black: color(black);
  $color-puerto-rico: color(puerto-rico);
  $color-hover: color(tertiary, $colors-background);

.select-wrapper {
  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 1rem;
    right: 10px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 8px 6px 0 6px;
    border-color: $color-tertiary transparent transparent transparent;
    pointer-events: none;
  }

  select {
    height: 30px;
    margin-top: 10px;
    border: none;
    border-bottom: 3px solid #EEEEEE;
    width: 100%;
    -moz-appearance: none;
    -webkit-appearance: none;
    border-radius: 0;
    background-color: transparent;
    font-family: 'Nunito Sans';
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 19px;
    text-transform: capitalize;
    color: #404040;

    &:hover,
    &:focus {
      outline: none;
    }

    &:disabled,
    &:disabled + label {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }
  }
  label {
    padding-left: 10px;
    font-weight: bold;
    font-size: 14px;
    line-height: 19px;
    color: #C5C5C5;
    position: absolute;
    pointer-events: none;
    user-select: none;
    top: 10px;
    left: 8px;
    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;
  }
  select:focus ~ label, select:not(.empty) ~ label {
    padding: 0;
    top: -6px;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    color: #C5C5C5;
  }
}
</style>

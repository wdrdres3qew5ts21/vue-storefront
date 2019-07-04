<template>
  <div class="base-input-number">
    <button
      class="serif cl-accent"
      type="button"
    >
      <font-awesome-icon class="left" icon="chevron-left" size="lg"/>
    </button>
    <div
      :id="getInputId"
      type="number"
      :min="min"
      class="m0 base-input-number__input bg-cl-transparent h4"
      :focus="autofocus"
    >
      {{ value }}
    </div>
    <button
      class="serif cl-accent"
      type="button"
    >
      <font-awesome-icon class="right" icon="chevron-right" size="lg"/>
    </button>
    <ValidationMessages v-if="validations" :validations="validations" />
  </div>
</template>

<script>
import ValidationMessages from './ValidationMessages.vue'
export default {
  name: 'BaseInput',
  components: {
    ValidationMessages
  },
  data () {
    return {
    }
  },
  props: {
    value: {
      type: [String, Number],
      default: 0
    },
    name: {
      type: String,
      required: false,
      default: ''
    },
    min: {
      type: Number,
      default: 0
    },
    autofocus: {
      type: Boolean,
      required: false,
      default: false
    },
    validations: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    getInputId () {
      return `input_${this._uid}`
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~theme/css/variables/colors';
  @import '~theme/css/helpers/functions/color';

  .base-input-number {
    font-family: 'Nunito Sans';
    font-style: normal;
    display: flex;
    padding: 0 25px;

    &__input {
      text-align: center;
      width: 40px;
      font-weight: bold;
      font-size: 16px;
      line-height: 22px;
    }
  }

</style>

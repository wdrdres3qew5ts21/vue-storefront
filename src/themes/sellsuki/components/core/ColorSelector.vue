<template>
  <button
    class="bg-cl-primary color-selector"
    :class="{ active: active }"
    @click="switchFilter(id, label)"
    :aria-label="$t('Select color ') + label"
  >
    {{ label }}
  </button>
</template>

<script>
import GenericSelector from '@vue-storefront/core/compatibility/components/GenericSelector'

export default {
  mixins: [GenericSelector]
}
</script>

<style lang="scss" scoped>
  .color-selector {
    font-family: 'Nunito Sans';
    text-align: left;
    height: 40px;
    border: none;
    border-bottom: 0.5px solid #EEEEEE;
    letter-spacing: 0.1em;
    padding-left: 20px;
    font-size: 14px;
    font-weight: normal;
    width: 100%;
    color: #C5C5C5;

    &.active {
      color: #404040;
      font-weight: 800;
    }
  }
</style>

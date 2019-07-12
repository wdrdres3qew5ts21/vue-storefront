<template>
  <button
    class="bg-cl-primary size-selector"
    :class="{ active: active }"
    @click="switchFilter(id, label)"
    :aria-label="$t('Select size ') + label"
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
  .size-selector {
    text-align: left;
    height: 40px;
    border: none;
    border-bottom: 0.5px solid #EEEEEE;
    font-size: 14px;
    font-weight: bold;
    width: 100%;
    color: #C5C5C5;

    &.active {
      color: #404040;
    }
  }
</style>

<template>
  <button
    class="bg-cl-primary price-selector"
    :class="{ active: active }"
    @click="switchFilter(id, from, to)"
    :aria-label="$t('Price ') + content"
  >
    {{ content }}
  </button>
</template>

<script>
import PriceSelector from '@vue-storefront/core/compatibility/components/PriceSelector'

export default {
  mixins: [PriceSelector]
}
</script>

<style lang="scss" scoped>
.price-selector {
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

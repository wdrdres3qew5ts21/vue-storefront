<template>
  <button-full class="add-btn" @click.native="addToCart(product)" :disabled="isProductDisabled" data-testid="addToCart">
    ADD TO BASKET
  </button-full>
</template>

<script>
import { formatProductMessages } from '@vue-storefront/core/filters/product-messages'
import focusClean from 'theme/components/theme/directives/focusClean'
import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import { AddToCart } from '@vue-storefront/core/modules/cart/components/AddToCart'

export default {
  mixins: [AddToCart],
  directives: { focusClean },
  components: { ButtonFull },
  methods: {
    onAfterRemovedVariant () {
      this.$forceUpdate()
    }
  },
  computed: {
    isProductDisabled () {
      return this.disabled || formatProductMessages(this.product.errors) !== ''
    }
  },
  beforeMount () {
    this.$bus.$on('product-after-removevariant', this.onAfterRemovedVariant)
  },
  beforeDestroy () {
    this.$bus.$off('product-after-removevariant')
  }
}
</script>

<style lang="scss" scoped>
button {
  font-weight: 500;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
}
</style>

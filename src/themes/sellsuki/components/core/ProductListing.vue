<template>
  <div class="product-listing row m0 start-md">
    <div
      v-for="(product) in products"
      :key="product.id"
      class="product flex p0"
    >
      <product-tile :product="product"/>
    </div>
  </div>
</template>

<script>
import ProductTile from 'theme/components/core/ProductTile'
export default {
  name: 'ProductListing',
  components: {
    ProductTile
  },
  props: {
    products: {
      type: null,
      required: true
    },
    columns: {
      type: [Number, String],
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.product-listing {
  flex-wrap: nowrap;
  width: 100%;
  justify-content: space-between;
}

.product {
  @media (max-width: 767px) {
    max-width: 202px;
  }
}
</style>

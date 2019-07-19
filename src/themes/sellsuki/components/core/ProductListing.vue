<template>
  <div v-if="page === 'product-listing'" class="product-listing row m0 start-md">
    <div
      v-for="(product) in products"
      :key="product.id"
      class="product flex p0"
    >
      <product-tile :product="product"/>
    </div>
  </div>
  <div v-else class="category-listing row m0 start-md">
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
    },
    page: {
      type: String,
      required: false,
      default: 'category'
    }
  }
}
</script>

<style lang="scss" scoped>
.product-listing {
  flex-wrap: nowrap;
  width: 100%;
  overflow-x: auto;

  .product {
    flex: 0 0 auto;
    margin-right: 10px;
  }
}

.category-listing {
  width: 100%;
  justify-content: space-between;
}

.product {
  @media (max-width: 767px) {
    max-width: 202px;
  }
}
</style>

<template>
  <div class="product row between-xs">
    <!-- <img class="blend" v-lazy="thumbnail"> -->
    <div class="product-container col-xs-12 col-md-9 pb15">
      <img class="product-img" src="../../../../assets/product.jpg" alt="">
      <div class="product-details mb15">
        <div class="product-name">{{ product.name | htmlDecode }}</div>
        <div class="error" v-if="product.errors && Object.keys(product.errors).length > 0">
          {{ product.errors | formatProductMessages }}
        </div>
        <div class="product-sku pb20">{{ product.sku }}</div>
        <div class="pt5">
          <div class="flex options-container">
            <p class="product-options">{{ options }}</p>
            <p class="product-qty">QTY {{ product.qty }}</p>
            <div v-if="!product.totals">
              <span class="price" v-if="product.special_price">{{ product.priceInclTax * product.qty | price }} </span>
              <span class="price" v-if="product.special_price" >{{ product.originalPriceInclTax * product.qty | price }}</span>
              <span v-if="!product.special_price" class="price">{{ product.priceInclTax * product.qty | price }}</span>
            </div>
            <div v-else-if="product.totals">
              <span class="price" v-if="product.totals.discount_amount">{{ product.totals.row_total_incl_tax - product.totals.discount_amount | price }} </span>
              <span class="price" v-if="product.totals.discount_amount" >{{ product.totals.row_total_incl_tax | price }}</span>
              <span v-if="!product.totals.discount_amount" class="price">{{ product.totals.row_total_incl_tax | price }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
</div></template>

<script>
import { Product } from '@vue-storefront/core/modules/checkout/components/Product'

export default {
  mixins: [Product],
  data () {
    return {
      options: this.product.sku.substr(this.product.sku.indexOf('-') + 1)
    }
  }
}
</script>

<style scoped>
.product {
  margin: 0 -20px;
}

.product-container {
  display: flex;
  padding: 0;
}

.product-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 15px;
  padding-right: 15px;
  width: calc(100vw - 163px);
}

.product-img {
  width: 133px;
}

.product-name {
  width: calc(100% - 10px);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  color: #404040;
  text-transform: uppercase;
}

.product-sku {
  text-transform: uppercase;
  font-size: 12px;
  line-height: 16px;
  color: #C5C5C5;
}

.options-container {
  justify-content: space-between;
}

.product-options, .product-qty, .price {
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  color: #404040;
}

.price-original {
  text-decoration: line-through;
}
.blend {
  mix-blend-mode: multiply;
}
</style>

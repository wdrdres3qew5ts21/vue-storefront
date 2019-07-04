<template>
  <li class="row">
    <div @click="closeWishlist">
      <router-link :to="localizedRoute({
        name: product.type_id + '-product',
        fullPath: product.url_path,
        params: { parentSku: product.parentSku ? product.parentSku : product.sku, slug: product.slug, childSku: product.sku }
      })">
        <!-- <img v-lazy="thumbnail" > -->
        <img src="../../../../assets/product.jpg" alt="">
      </router-link>
    </div>
    <div class="container col-xs">
      <div class="product-name-container" @click="closeWishlist">
        <router-link
          class="product-name"
          :to="localizedRoute({
            name: product.type_id + '-product',
            fullPath: product.url_path,
            params: { parentSku: product.parentSku ? product.parentSku : product.sku, slug: product.slug, childSku: product.sku }
        })">
          {{ product.name | htmlDecode }}
        </router-link>
      </div>
      <div class="product-price">
        <span class="price-special" v-if="product.special_price">{{ product.priceInclTax | price }}</span>
        <span class="price-original" v-if="product.special_price" >{{ product.originalPriceInclTax | price }}</span>

        <span v-if="!product.special_price">
          {{ product.priceInclTax | price }}
        </span>
        <hr>
      </div>
      <div>
        <div class="mt5"><span @click="removeFromWishlist(product)"><remove-button class="cl-accent" /></span></div>
      </div>
    </div>
  </li>
</template>

<script>
import Product from '@vue-storefront/core/compatibility/components/blocks/Wishlist/Product'
import RemoveButton from './RemoveButton'

export default {
  components: {
    RemoveButton
  },
  mixins: [Product]
}
</script>

<style lang="scss" scoped>
.container {
  padding-left: 4%;
  vertical-align: middle;
  width: calc(100% - 180px - 4%);

  @media (max-width: 479px) {
    width: calc(100% - 133px - 4%);
  }
}

.row {
  padding-left: 8px;
  display: flex;
  align-items: center;
}

img {
  vertical-align: middle;
  width: 180px;

  @media (max-width: 479px) {
    width: 133px;
  }
}

.product-price {
  padding: 3% 0;
}

hr {
  margin-right: 7%;
  opacity: 0.3;
}

.product-name {
  text-transform: uppercase;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  color: #404040;
  text-overflow: ellipsis;
  display: block;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
}

.product-name-container {
  margin-right: 7%;
}

.col-xs {
  flex-direction: column;
}
input {
  width: 30px;
}
</style>

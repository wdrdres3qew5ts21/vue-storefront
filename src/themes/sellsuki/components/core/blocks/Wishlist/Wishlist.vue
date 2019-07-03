<template>
  <div class="wishlist cl-accent">
    <div class="row">
      <div class="col-md-12 end-xs">
        <button
          type="button"
          :aria-label="$t('Close')"
          class="w-100 inline-flex end-xs bg-cl-transparent brdr-none p0 close-btn"
          @click="closeWishlist"
        >
          <font-awesome-icon class="p15" icon="times" size="2x" style="color: #C5C5C5;" @click="closeWishlist"/>
        </button>
      </div>
    </div>
    <p class="header cl-accent ml30">
      WISH LIST
    </p>
    <div v-if="!productsInWishlist.length">
      <p class="amount cl-accent ml30">
        NO ITEMS
      </p>
      <hr class="page-break">
    </div>
    <div v-else>
      <p class="amount cl-accent ml30">
        {{ productsInWishlist.length }} ITEMS
      </p>
    </div>
    <ul class="products">
      <product v-for="product in productsInWishlist" :key="product.id" :product="product" />
    </ul>
    <div v-if="!productsInWishlist.length" class="background">
      <div
        class="background-content inline-flex bg-cl-transparent brdr-none"
        :aria-label="$t('Open wishlist')"
      >
        <i class="icons">favorite_border</i>
        <p class="background-text">
          Your wishlist is empty.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Wishlist from '@vue-storefront/core/compatibility/components/blocks/Wishlist/Wishlist'
import Product from 'theme/components/core/blocks/Wishlist/Product'
import WishlistIcon from '@vue-storefront/core/compatibility/components/blocks/Header/WishlistIcon'

export default {
  props: {
    product: {
      type: Object,
      required: false,
      default: () => { }
    }
  },
  components: {
    Product
  },
  mixins: [Wishlist, WishlistIcon]
}
</script>

<style lang="scss" scoped>
@import "~theme/css/animations/transitions";

  * {
    font-family: 'Nunito Sans';
    font-style: normal;
    opacity: 1;
  }

  .products {
    padding-left: 0;
    margin: 2% 0 0 0;
  }

  .header {
    font-weight: 800;
    font-size: 25px;
    line-height: 34px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #404040;
    letter-spacing: 0.1em;
  }

  .background {
    z-index: -1;
    position: absolute;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;

    .background-content {
      flex-direction: column;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);

      .background-text {
        font-family: Nunito Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 19px;
        color: #C5C5C5;
        padding-top: 7%;
      }

      .icons {
        text-align: center;
        font-family: 'Material Icons';
        color: #C5C5C5;
        font-size: 100px;
      }
    }
  }

  .amount {
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;
    text-transform: uppercase;
    padding: 3% 0;
    color: #404040;
    letter-spacing: 0.1em;
  }

  .page-break {
    margin: 3% 7%;
  }
</style>

<template>
  <div>
    <div class="pb20 product-container">
      <p class="cl-accent ml30 pb20 summary-title">
        PRODUCTS
      </p>
      <product v-for="product in productsInCart" :key="product.sku" :product="product"/>
      <div v-if="productsInCart && productsInCart.length" class="checkout pt20">

        <div v-for="(segment, index) in totals" :key="index" class="row pt15 px15" :v-if="segment.code !== 'grand_total'">
          <div class="price col-xs">
            {{ segment.title }}
          </div>
          <div v-if="segment.value != null" class="price price-number col-xs align-right">
            {{ segment.value | price }}
          </div>
        </div>
      </div>
    </div>
    <div class="pt20 policy">
      <p class="policy-title" v-if="!isVirtualCart">
        {{ $t('Shipping') }}
      </p>
      <p class="policy-details px10 pt10 pb20" v-if="!isVirtualCart">
        We will endeavour to fulfil your order for items listed in the Shipping Confirmation within a maximum of 30 days of the date of the Order Confirmation. If we fail to deliver the items within 30 days of the date of the Order Confirmation, you may cancel the Contract and we will reimburse you the price paid for the items and any delivery costs paid.
      </p>
      <p class="policy-title">
        {{ $t('Returns') }}
      </p>
      <p class="policy-details px10 pt10 pb20">
        You may cancel your order for any reason up to 30 days from the date on which you receive the Shipping Confirmation, by notifying us of your decision to cancel by calling our Freephone number 099 999 9999. To meet the cancellation deadline, it is sufficient for you to have sent your communication concerning your exercise of the right to cancel before the cancellation period has expired.
      </p>
    </div>
  </div>
</template>

<script>
import { CartSummary } from '@vue-storefront/core/modules/checkout/components/CartSummary'
import Product from './Product'

export default {
  components: {
    Product
  },
  mixins: [CartSummary]
}
</script>

<style lang="scss" scoped>
  .summary-title {
    @media (max-width: 767px) {
      font-weight: bold;
      font-size: 16px;
      line-height: 22px;
      letter-spacing: 0.1em;
      margin-left: 0;
    }
  }

  .product-container {
    border-bottom: 0.5px solid rgba(0, 0, 0, 0.25);
  }

  .price {
    font-size: 14px;
    line-height: 19px;
    color: #404040;
  }

  .price-number {
    letter-spacing: 0.1em;
  }

  .policy-title {
    font-weight: normal;
    font-size: 20px;
    line-height: 27px;
    color: #404040;
  }

  .policy-details {
    font-weight: 300;
    font-size: 10px;
    line-height: 14px;
    color: #404040;
  }

  .policy {
    border-bottom: 0.5px solid rgba(0, 0, 0, 0.25);
  }
</style>

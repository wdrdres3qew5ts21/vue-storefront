<template>
  <li class="row flex-nowrap">
    <div>
      <div class="ml10 bg-cl-secondary">
        <!-- <img class="image" v-lazy="thumbnail" alt="" > -->
        <img src="../../../../assets/product.jpg" alt="">
      </div>
    </div>
    <div class="col-xs flex start-xs between-sm details">
      <div>
        <div class="name">
          {{ product.name | htmlDecode }}
        </div>
        <div class="h6 cl-bg-tertiary pt3 sku" data-testid="productSku">
          {{ product.sku }}
        </div>
      </div>
      <div class="row h5 pt5 cl-accent qty">
        <p class="size">{{ size }}</p>
        <base-input-number
          :value="product.qty"
          @input="updateQuantity"
          @updateQuantity="updateQuantity"
          :min="1"
        />
        <div class="prices" v-if="!displayItemDiscounts">
          <span class="cl-error price" v-if="product.special_price">
            {{ product.priceInclTax * product.qty | price }}&nbsp;
          </span>
          <span class="h6 price" v-if="product.special_price">
            {{ product.originalPriceInclTax * product.qty | price }}
          </span>
          <span class="price" v-if="!product.special_price" data-testid="productPrice">
            {{ product.priceInclTax * product.qty | price }}
          </span>
        </div>
        <div class="prices" v-else-if="product.totals">
          <span class="cl-error price" v-if="product.totals.discount_amount">
            {{ product.totals.row_total_incl_tax - product.totals.discount_amount | price }}&nbsp;
          </span>
          <span class="price" v-if="product.totals.discount_amount">
            {{ product.totals.row_total_incl_tax | price }}
          </span>
          <span class="price" v-if="!product.totals.discount_amount">
            {{ product.totals.row_total_incl_tax | price }}
          </span>
        </div>
        <div class="prices" v-else>
          <span class="price">
            {{ product.regular_price * product.qty | price }}
          </span>
        </div>
      </div>
      <hr class="page-break">
      <div class="links">
        <div class="mt5"><span @click="removeItem"><remove-button class="cl-accent" /></span></div>
      </div>
    </div>
  </li>
</template>

<script>
import rootStore from '@vue-storefront/core/store'
import Product from '@vue-storefront/core/compatibility/components/blocks/Microcart/Product'

import RemoveButton from './RemoveButton'
import BaseInputNumber from 'theme/components/core/blocks/Form/BaseInputNumber'

export default {
  components: {
    RemoveButton,
    BaseInputNumber
  },
  mixins: [Product],
  data () {
    return {
      displayItemDiscounts: rootStore.state.config.cart.displayItemDiscounts,
      size: this.product.sku.substr(this.product.sku.indexOf('-') + 1)
    }
  }
}
</script>

<style lang="scss" scoped>
  *{
    font-family: 'Nunito Sans';
    font-style: normal;
    color: #404040;
    text-transform: uppercase;
  }

  .name {
    padding-right: 34px;
    text-overflow: ellipsis;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    width: calc(100% - 34px);
  }

  .size {
    font-size: 16px;
    line-height: 22px;
    width: 20px;
  }

  .row {
    padding-bottom: 0;
  }

  img {
    vertical-align: top;
    margin-left: -2px;
    width: 150px;
    @media (max-width: 767px) {
      width: 133px;
    }
  }

  .head {
    font-weight: bold;
    font-size: 14px;
    line-height: 19px;
  }

  .sku {
    color: #C5C5C5;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
  }

  .details {
    flex-direction: column;
    padding-left: 4%;
    vertical-align: middle;
    width: calc(100% - 180px - 4%);
    justify-content: center;

    @media (max-width: 479px) {
      width: calc(100% - 133px - 4%);
    }
  }

  .qty {
    margin: 0;
    justify-content: space-between;
    padding: 5% 7% 5% 0;

    @media (max-width: 767px) {
      font-size: 12px;
    }
  }

  .actions {
    flex-direction: column;
    @media (max-width: 767px) {
      padding: 0;
      font-size: 12px;
    }
    .links {
      @media (max-width: 767px) {
        margin-top: 20px;
      }
    }
  }

  .price {
    font-weight: bold;
    font-size: 16px;
    line-height: 22px;
  }

  input {
    width: 30px;
  }

  .flex-nowrap {
    flex-wrap: nowrap;
  }

  .page-break {
    margin: 0 7% 3% 0;
    opacity: 0.4;
  }
</style>

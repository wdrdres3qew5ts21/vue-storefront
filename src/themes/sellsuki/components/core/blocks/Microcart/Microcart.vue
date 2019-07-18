<template>
  <div
    class="microcart cl-accent"
    data-testid="microcart"
  >
    <div class="row middle-xs bg-cl-primary top-sm">
      <div class="col-xs-12 end-xs">
        <button
          type="button"
          class="p0 brdr-none bg-cl-transparent close"
          @click="closeMicrocartExtend"
          data-testid="closeMicrocart"
        >
          <font-awesome-icon class="p15" icon="times" size="2x" style="color: #C5C5C5;"/>
        </button>
      </div>
    </div>
    <p class="cl-accent heading">
      BASKET
    </p>
    <div v-if="!productsInCart.length">
      <p class="amount cl-accent">
        NO ITEMS
      </p>
      <hr class="page-break">
    </div>
    <div v-else>
      <p class="amount cl-accent">
        {{ quantity }} ITEMS
      </p>
    </div>
    <ul v-if="productsInCart.length" class="bg-cl-primary m0 px40 pb40 products">
      <product v-for="product in productsInCart" :key="product.sku" :product="product" />
    </ul>
    <div v-if="productsInCart.length" class="summary px40 cl-accent">
      <p class="m0 pt30 mb10 weight-400 summary-heading">
        BASKET SUMMARY
      </p>
      <div v-for="(segment, index) in totals" :key="index" class="row summary-details">
        <div class="col-xs subtotal">
          {{ segment.title }}
          <button v-if="appliedCoupon && segment.code === 'discount'" type="button" class="p0 brdr-none bg-cl-transparent close delete-button ml10" @click="clearCoupon">
            <i class="material-icons cl-accent">
              close
            </i>
          </button>
        </div>
        <div v-if="segment.value != null" class="col-xs align-right price">
          {{ segment.value | price }}
        </div>
      </div>
      <div class="row summary-details">
        <div v-if="OnlineOnly" class="col-xs-5">
          <div class="p0 brdr-none fs-medium-small cl-accent bg-cl-transparent">
            Discount code
          </div>
        </div>
        <div v-if="OnlineOnly" class="col-xs-7 coupon-wrapper">
          <div class="coupon-input">
            <base-input type="text" id="couponinput" page="promotion" :autofocus="true" v-model.trim="couponCode" placeholder="ADD A PROMOTION" @keyup.enter="setCoupon"/>
          </div>
          <button-outline class="promotion-btn" color="dark" :disabled="!couponCode" @click.native="setCoupon">{{ $t('Add discount code') }}</button-outline>
        </div>
      </div>
      <div class="row summary-details middle-xs" v-for="(segment, index) in totals" :key="index" v-if="segment.code === 'grand_total'">
        <div class="col-xs total-price-label">
          TOTAL
        </div>
        <div class="col-xs align-right total-price-value">
          {{ segment.value | price }}
        </div>
      </div>
      <div class="summary-break"/>
    </div>
    <div
      class="row middle-xs actions"
      v-if="productsInCart.length && !isCheckoutMode"
    >
      <div class="col-xs-12 col-sm first-sm">
        <router-link :to="localizedRoute('/')" class="no-underline cl-secondary link">
          <span class="shopping" @click="closeMicrocartExtend">
            RETURN TO SHOPPING
          </span>
        </router-link>
      </div>
      <div class="col-xs-12 first-xs col-sm-4 end-sm">
        <button-full
          :link="{ name: 'checkout' }"
          @click.native="closeMicrocartExtend"
        >
          CHECKOUT
        </button-full>
      </div>
    </div>
    <div v-if="!productsInCart.length" class="background flex">
      <div
        class="background-content inline-flex bg-cl-transparent brdr-none"
        :aria-label="$t('Open wishlist')"
      >
        <font-awesome-icon class="icons" icon="shopping-bag" size="6x" style="color: #C5C5C5;"/>
        <p class="background-text">
          Your basket is empty.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import i18n from '@vue-storefront/i18n'
import { isModuleRegistered } from '@vue-storefront/core/lib/module'

import Microcart from '@vue-storefront/core/compatibility/components/blocks/Microcart/Microcart'
import VueOfflineMixin from 'vue-offline/mixin'
import onEscapePress from '@vue-storefront/core/mixins/onEscapePress'
import InstantCheckout from 'src/modules/instant-checkout/components/InstantCheckout.vue'

import BaseInput from 'theme/components/core/blocks/Form/BaseInput'
import ButtonFull from 'theme/components/theme/ButtonFull'
import ButtonOutline from 'theme/components/theme/ButtonOutline'
import Product from 'theme/components/core/blocks/Microcart/Product'

export default {
  components: {
    Product,
    ButtonFull,
    ButtonOutline,
    BaseInput,
    InstantCheckout
  },
  mixins: [
    Microcart,
    VueOfflineMixin,
    onEscapePress
  ],
  data () {
    return {
      addCouponPressed: false,
      couponCode: '',
      componentLoaded: false,
      isInstantCheckoutRegistered: isModuleRegistered('instant-checkout'),
      quantity: 0
    }
  },
  props: {
    isCheckoutMode: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.componentLoaded = true
    })
    this.countItems()
  },
  watch: {
    productsInCart: {
      handler (val) {
        this.countItems()
      },
      deep: true
    }
  },
  methods: {
    addDiscountCoupon () {
      this.addCouponPressed = true
    },
    countItems () {
      this.quantity = 0
      this.productsInCart.map(product => {
        this.quantity += product.qty
      })
    },
    clearCoupon () {
      this.removeCoupon()
      this.addCouponPressed = false
    },
    setCoupon () {
      this.applyCoupon(this.couponCode).then(() => {
        this.addCouponPressed = false
        this.couponCode = ''
      }).catch(() => {
        this.$store.dispatch('notification/spawnNotification', {
          type: 'warning',
          message: i18n.t("You've entered an incorrect coupon code. Please try again."),
          action1: { label: i18n.t('OK') }
        })
      })
    },
    closeMicrocartExtend () {
      this.closeMicrocart()
      this.$store.commit('ui/setSidebar', false)
      this.addCouponPressed = false
    },
    onEscapePress () {
      this.closeMicrocart()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~theme/css/animations/transitions";

  * {
    font-family: 'Nunito Sans';
    font-style: normal;
  }

  .heading, .amount {
    background: white;
  }

  .heading {
    font-weight: 800;
    font-size: 25px;
    line-height: 34px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #404040;
    margin: 0;
    padding-left: 7%;
  }

  .microcart {
    height: 100%;
  }

  .microcart-btn {
    font-weight: 800;
    font-size: 14px;
    line-height: 19px;

    letter-spacing: 0.25em;

    color: #EEEEEE;
  }

  .shopping {
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;
    text-align: center;
    letter-spacing: 0.1em;

    color: #404040;

  }

  .page-break {
    margin: 3% 7%;
    opacity: 0.4;
  }

  .amount {
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;
    text-transform: uppercase;
    padding: 3% 0 3% 7%;
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
      align-items: center;

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
      }
    }
  }

  .close {
    i {
      opacity: 0.6;
    }
    &:hover,
    &:focus {
      i {
        opacity: 1;
      }
    }
  }

  .products {
    padding: 0;
  }

  .actions {
    background: #EEEEEE;
    @media (max-width: 767px) {
      padding: 5% 7% 0 7%;
    }
    .link {
      @media (max-width: 767px) {
        display: flex;
        justify-content: center;
        padding: 20px 70px;
        &.checkout {
          margin-top: 55px;
          padding: 0;
        }
      }
    }
  }

  .summary-details {
    padding: 5% 3% 0 3%;
  }

  .summary {
    background: #EEEEEE;
    padding:  0 7%;
    font-size: 14px;
  }

  .summary-heading {
    font-weight: bold;
    font-size: 20px;
    line-height: 27px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #404040;
  }

  .summary-break {
    padding: 6% 0 1% 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);
    background: #EEEEEE;
  }

  .subtotal {
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;
    color: #404040;
  }

  .price {
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;
    letter-spacing: 0.1em;
  }

  .total-price-label {
    @media (max-width: 767px) {
      font-weight: bold;
      font-size: 20px;
      line-height: 27px;
      letter-spacing: 0.1em;
      color: #404040;
    }
  }

  .total-price-value {
    @media (max-width: 767px) {
      font-weight: bold;
      font-size: 20px;
      line-height: 27px;
      letter-spacing: 0.1em;

      color: #404040;
    }
  }

  .delete-button {
    vertical-align: middle;
  }

  .coupon-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    .button-outline {
      width: 166px;
      height: 40px;
      padding: 0;

      font-weight: 800;
      font-size: 14px;
      line-height: 19px;
      text-align: center;
      letter-spacing: 0.25em;
      text-transform: uppercase;

      background: #404040;
      color: #EEEEEE;

      border: 1.5px solid #404040;
      box-sizing: border-box;
      border-radius: 0.5px;
    }

    .coupon-input {
      width: 166px;
    }
  }
</style>

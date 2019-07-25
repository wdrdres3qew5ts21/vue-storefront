<template>
  <div id="checkout">
    <div class="container">
      <div class="row" v-show="!isThankYouPage">
        <div class="col-sm-7 col-xs-12 pl0 pr0">
          <div class="checkout-title py5">
            <p class="heading px20">
              {{ $t('Checkout') }}
            </p>
            <ul>
              <li
                :class="{'active' : activeSection.personalDetails, 'filled' : Object.keys(personalDetails).length !== 0 , 'virtual' : isVirtualCart}"
                @click.prevent="edit(personalDetails, 'personalDetails')"
              >
                <p class="step-title">PERSONAL DETAILS</p>
                <div>
                  <p class="step">1</p>
                  <div class="step-line"/>
                </div>
              </li>
              <li
                v-if="!isVirtualCart"
                :class="{'active' : activeSection.shipping, 'filled' : Object.keys(shipping).length !== 0}"
                @click.prevent="edit(shipping, 'shipping')"
              >
                <p class="step-title">SHIPPING</p>
                <div>
                  <p class="step">2</p>
                  <div class="step-line"/>
                </div>
              </li>
              <li
                :class="{'active' : activeSection.payment, 'filled' : Object.keys(payment).length !== 0, 'virtual' : isVirtualCart}"
                @click.prevent="edit(payment, 'payment')"
              >
                <p class="step-title">PAYMENT</p>
                <div>
                  <p v-if="!isVirtualCart" class="step">3</p>
                  <p v-else class="step">2</p>
                  <div class="step-line"/>
                </div>
              </li>
              <li
                :class="{'active' : activeSection.orderReview, 'filled' : Object.keys(orderReview).length !== 0, 'virtual' : isVirtualCart}"
                @click.prevent="edit(orderReview, 'orderReview')"
              >
                <p class="step-title">REVIEW ORDER</p>
                <div>
                  <p v-if="!isVirtualCart" class="step">4</p>
                  <p v-else class="step">3</p>
                </div>
              </li>
            </ul>
          </div>
          <personal-details
            class="line relative"
            :is-active="activeSection.personalDetails"
            v-show="activeSection.personalDetails"
            :focused-field="focusedField"
          />
          <shipping
            class="line relative"
            :is-active="activeSection.shipping"
            v-show="activeSection.shipping"
            v-if="!isVirtualCart"
          />
          <payment
            class="line relative"
            :is-active="activeSection.payment"
            v-show="activeSection.payment"
          />
          <order-review
            class="line relative"
            :is-active="activeSection.orderReview"
            :personal-details="personalDetails"
            :shipping="shipping"
            :payment="payment"
            v-show="activeSection.orderReview"
          />
          <div id="custom-steps"/>
        </div>
        <div class="hidden-xs col-sm-5 bg-cl-secondary">
          <cart-summary />
        </div>
      </div>
    </div>
    <thank-you-page v-show="isThankYouPage" />
  </div>
</template>

<script>
import Checkout from '@vue-storefront/core/pages/Checkout'

import PersonalDetails from 'theme/components/core/blocks/Checkout/PersonalDetails'
import Shipping from 'theme/components/core/blocks/Checkout/Shipping'
import Payment from 'theme/components/core/blocks/Checkout/Payment'
import OrderReview from 'theme/components/core/blocks/Checkout/OrderReview'
import CartSummary from 'theme/components/core/blocks/Checkout/CartSummary'
import ThankYouPage from 'theme/components/core/blocks/Checkout/ThankYouPage'

export default {
  components: {
    PersonalDetails,
    Shipping,
    Payment,
    OrderReview,
    CartSummary,
    ThankYouPage
  },
  mixins: [Checkout],
  methods: {
    notifyEmptyCart () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'warning',
        message: this.$t('Shopping cart is empty. Please add some products before entering Checkout'),
        action1: { label: this.$t('OK') }
      })
    },
    notifyOutStock (chp) {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'error',
        message: chp.name + this.$t(' is out of the stock!'),
        action1: { label: this.$t('OK') }
      })
    },
    notifyNotAvailable () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'error',
        message: this.$t('Some of the ordered products are not available!'),
        action1: { label: this.$t('OK') }
      })
    },
    notifyStockCheck () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'warning',
        message: this.$t('Stock check in progress, please wait while available stock quantities are checked'),
        action1: { label: this.$t('OK') }
      })
    },
    notifyNoConnection () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'warning',
        message: this.$t('There is no Internet connection. You can still place your order. We will notify you if any of ordered products is not available because we cannot check it right now.'),
        action1: { label: this.$t('OK') }
      })
    }
  }
}
</script>

<style lang="scss">
  @import '~theme/css/base/text';
  @import '~theme/css/variables/colors';
  @import '~theme/css/helpers/functions/color';
  $bg-secondary: color(secondary, $colors-background);
  $color-tertiary: color(tertiary);
  $color-secondary: color(secondary);
  $color-error: color(error);
  $color-white: color(white);
  $color-black: color(black);

  ul {
    padding: 0;
    margin: 10px 12px;

    li {
      list-style-type: none;
      width: 25%;
      height: 82px;
      float: left;
      text-align: center;
      position: relative;

      @media (max-width: 767px) {
        .step, .step-title {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .step-title {
          height: 32px;
          font-weight: bold;
          font-size: 12px;
          line-height: 16px;
          text-align: center;
          letter-spacing: 0.1em;
          color: #C5C5C5;
        }

        div {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 50px;

          .step {
            z-index: 2;

            /* font styles */
            font-weight: bold;
            font-size: 14px;
            line-height: 19px;
            letter-spacing: 0.1em;
            color: #EEEEEE;

            /* circle background styles */
            background: #C5C5C5;
            width: 30px;
            height: 30px;
            border-radius: 50%;
          }

          .step-line {
            background: #C5C5C5;
            height: 1px;
            width: 100%;
            display: block;
            position: absolute;
            right: -50%;
            top: 56px;
          }
        }
      }
    }
  }

  .filled {
    .step-title {
      color: #404040;
    }

    div .step{
      background: #404040;
    }
  }

  .active {
    .step-title {
      color: #404040;
    }

    div .step {
      background: #404040;
      width: 40px;
      height: 40px;
    }
  }

  .virtual {
    width: 33.33%;
  }

  #checkout {
    .number-circle {
      width: 35px;
      height: 35px;

      @media (max-width: 768px) {
        width: 25px;
        height: 25px;
        line-height: 25px;
      }
    }
    .radioStyled {
      display: block;
      position: relative;
      padding-left: 35px;
      margin-bottom: 12px;
      cursor: pointer;
      font-size: 16px;
      line-height: 30px;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;

      input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
      }

      .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 25px;
        width: 25px;
        border-radius: 50%;
        border: 1px solid $bg-secondary;

        &:after {
          content: "";
          position: absolute;
          display: none;
          top: 3px;
          left: 3px;
          width: 19px;
          height: 19px;
          border-radius: 50%;
          background: $color-secondary;
        }
      }

      input:checked ~ .checkmark:after {
        display: block;
      }
    }
  }

  .line {
    &:after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 37px;
      z-index: -1;
      width: 1px;
      height: 100%;
      background-color: $bg-secondary;

      @media (max-width: 768px) {
        display: none;
      }
    }
  }

  .checkout-title {
    @media (max-width: 767px) {
      height: 150px;
      background-color: $bg-secondary;
      margin-bottom: 15px;

      .heading {
        padding-top: 20px;
        font-weight: 800;
        font-size: 25px;
        line-height: 34px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
      }
    }
  }
</style>

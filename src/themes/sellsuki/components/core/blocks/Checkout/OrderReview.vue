<template>
  <div class="order-review pt20">
    <div class="row pl20">
      <div class="col-xs-12 col-md-12" :class="{ 'cl-bg-tertiary' : !isFilled && !isActive }">
        <p class="title">
          ORDER SUMMARY
        </p>
      </div>
    </div>
    <div class="row pl20 pr20" v-show="isActive">
      <div class="hidden-xs col-sm-2 col-md-1"/>
      <div class="col-xs-12 col-sm-9 col-md-11">
        <div class="row mb15 mt10">
          <div class="col-xs-12">
            <p class="check-details">
              {{ $t('Please check if all data are correct') }}
            </p>
            <div class="row">
              <div class="col-xs-12">
                <detail-summary
                  :personal-details="personalDetails"
                  :shipping="shipping"
                  :payment="payment"
                />
                <div class="cartsummary-wrapper pt20">
                  <cart-summary />
                </div>
                <base-checkbox
                  class="checkbox col-xs-12 col-sm-12 col-md-8 mt20"
                  id="acceptTermsCheckbox"
                  @click="orderReview.terms = !orderReview.terms"
                  @blur="$v.orderReview.terms.$touch()"
                  v-model="orderReview.terms"
                  :validations="[{
                    condition: !$v.orderReview.terms.required && $v.orderReview.terms.$error,
                    text: $t('Field is required')
                  }]"
                >
                  {{ $t('I agree to') }}
                  <span
                    class="link pointer"
                    @click.prevent="$bus.$emit('modal-toggle', 'modal-terms')"
                  >
                    {{ $t('Terms and conditions') }}
                  </span>
                </base-checkbox>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row" v-show="isActive">
      <div class="hidden-xs col-sm-2 col-md-1"/>
      <div class="col-xs-12 col-sm-9 col-md-11">
        <div class="row">
          <div class="order-btn col-xs-12 col-md-8">
            <slot name="placeOrderButton">
              <button-full
                @click.native="placeOrder"
                data-testid="orderReviewSubmit"
                class="place-order-btn"
                :disabled="$v.orderReview.$invalid"
              >
                {{ $t('Place the order') }}
              </button-full>
            </slot>
          </div>
        </div>
      </div>
    </div>

    <modal name="modal-terms" >
      <p slot="header">
        {{ $t('Terms and conditions') }}
      </p>
      <div slot="content">
        <p>
          This website ("website") is operated by Luma Inc., which includes Luma stores, and Luma Private Sales. This privacy policy only covers information collected at this website, and does not cover any information collected offline by Luma. All Luma websites are covered by this privacy policy.
        </p>
        <h2>
          Luma Security
        </h2>
        <p>
          Personal information provided on the website and online credit card transactions are transmitted through a secure server. We are committed to handling your personal information with high standards of information security. We take appropriate physical, electronic, and administrative steps to maintain the security and accuracy of personally identifiable information we collect, including limiting the number of people who have physical access to our database servers, as well as employing electronic security systems and password protections that guard against unauthorized access.
        </p>
        <h2>
          Luma Privacy Policy
        </h2>
        <p>
          To help us achieve our goal of providing the highest quality products and services, we use information from our interactions with you and other customers, as well as from other parties. Because we respect your privacy, we have implemented procedures to ensure that your personal information is handled in a safe, secure, and responsible manner. We have posted this privacy policy in order to explain our information collection practices and the choices you have about the way information is collected and used.
        </p>
        <p>
          As we continue to develop the Luma website and take advantage of advances in technology to improve the services we offer, this privacy policy likely will change. We therefore encourage you to refer to this policy on an ongoing basis so that you understand our current privacy policy.
        </p>
      </div>
    </modal>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import Composite from '@vue-storefront/core/mixins/composite'

import BaseCheckbox from 'theme/components/core/blocks/Form/BaseCheckbox'
import ButtonFull from 'theme/components/theme/ButtonFull'
import CartSummary from 'theme/components/core/blocks/Checkout/CartSummary'
import DetailSummary from 'sellsuki/components/core/blocks/Checkout/DetailSummary'
import Modal from 'theme/components/core/Modal'
import { OrderReview } from '@vue-storefront/core/modules/checkout/components/OrderReview'
import ValidationError from 'theme/components/core/ValidationError'

export default {
  components: {
    BaseCheckbox,
    ButtonFull,
    CartSummary,
    Modal,
    ValidationError,
    DetailSummary
  },
  mixins: [OrderReview, Composite],
  validations: {
    orderReview: {
      terms: {
        required
      }
    }
  },
  props: {
    personalDetails: {
      type: Object,
      required: true,
      default: null
    },
    shipping: {
      type: Object,
      required: true,
      default: null
    },
    payment: {
      type: Object,
      required: true,
      default: null
    }
  },
  methods: {
    onSuccess () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'success',
        message: this.$t('You are logged in!'),
        action1: { label: this.$t('OK') }
      })
    },
    onFailure (result) {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'error',
        message: this.$t(result.result),
        action1: { label: this.$t('OK') }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .title {
    font-weight: bold;
    font-size: 20px;
    line-height: 27px;
    letter-spacing: 0.1em;
  }

  .check-details {
    font-weight: 300;
    font-size: 12px;
    line-height: 16px;
    padding-bottom: 20px;
    border-bottom: 0.5px solid rgba(0, 0, 0, 0.25);
  }

  .link {
    text-decoration: underline;
  }

  .cartsummary-wrapper {
    @media (min-width: 767px) {
      display: none;
    }
  }

  .checkbox {
    padding: 0;
  }

  .order-btn {
    padding: 0 28px;

    button {
      background: #404040;
      text-transform: uppercase;
      color: #EEEEEE;
      font-size: 14px;
      line-height: 19px;
      letter-spacing: 0.25em;
    }
  }
</style>

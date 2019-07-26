<template>
  <div>
    <header class="thank-you-title px20">
      <div class="container px0 pt30">
        <p class="category-title">
          ORDER CONFIRMATION
        </p>
        <p class="order-number pt10">
          ORDER NUMBER: {{ lastOrderConfirmation.backendOrderId }}
        </p>
        <p class="order-time">
          {{ getTime(lastOrderConfirmation.transferedAt) }}
        </p>
      </div>
    </header>
    <div class="thank-you-content px20">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-6">
            <p v-if="OnlineOnly" class="details-title pt20">
              Thank you for your purchase
            </p>
            <p v-if="OnlineOnly" class="details pt20">
              We have received your order and will send you with an order confirmation e-mail with the details of your order and a link to track its progress, You can check status of your order by using our delivery status feature.
            </p>

            <p v-if="OfflineOnly" class="details-title pt10">
              {{ $t('You are offline') }}
            </p>
            <p v-if="OfflineOnly && !isNotificationSupported" class="details py20">
              {{ $t('To finish the order just come back to our store while online. Your order will be sent to the server as soon as you come back here while online and then confirmed regarding the stock quantities of selected items') }}
            </p>
            <p v-if="OfflineOnly && isNotificationSupported && !isPermissionGranted" class="details">
              {{ $t("You can allow us to remind you about the order via push notification after coming back online. You'll only need to click on it to confirm.") }}
            </p>
            <p v-if="OfflineOnly && isNotificationSupported && isPermissionGranted" class="details">
              <strong>{{ $t('You will receive Push notification after coming back online. You can confirm the order by clicking on it') }}</strong>
            </p>
            <p v-if="!isPermissionGranted && isNotificationSupported" class="py20">
              <button-outline color="dark" @click.native="requestNotificationPermission()" >
                ALLOW NOTIFICATIONS
              </button-outline>
            </p>
            <div id="thank-you-extensions"/>
            <p class="details-title">
              {{ $t('Your Account') }}
            </p>
            <p class="details" v-html="this.$t('You can log to your account using e-mail and password defined earlier. On your account you can <b>edit your profile data,</b> check <b>history of transactions,</b> edit <b>subscription to newsletter.</b>')"/>
          </div>
          <div class="col-md-6 bg-cl-secondary thank-you-improvment">
            <p class="feedback-title pb15">
              YOUR FEEDBACK
            </p>
            <p class="mb15 feedback-detail">
              {{ $t('Your feedback is important for us. Let us know what we could improve.') }}
            </p>
            <form @submit.prevent="sendFeedback">
              <base-textarea
                class="mb25"
                type="text"
                name="body"
                v-model="feedback"
                placeholder="What we could improve"
                :autofocus="true"
              />
              <button-outline color="dark">
                SEND FEEDBACK
              </button-outline>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Composite from '@vue-storefront/core/mixins/composite'
import BaseTextarea from 'theme/components/core/blocks/Form/BaseTextarea'
import ButtonOutline from 'theme/components/theme/ButtonOutline'
import VueOfflineMixin from 'vue-offline/mixin'
import { EmailForm } from '@vue-storefront/core/modules/mailer/components/EmailForm'
import { isServer } from '@vue-storefront/core/helpers'

export default {
  name: 'ThankYouPage',
  mixins: [Composite, VueOfflineMixin, EmailForm],
  data () {
    return {
      feedback: ''
    }
  },
  computed: {
    lastOrderConfirmation () {
      return this.$store.state.order.last_order_confirmation ? this.$store.state.order.last_order_confirmation.confirmation : {}
    },
    isNotificationSupported () {
      if (isServer || !('Notification' in window)) return false
      return 'Notification' in window
    },
    isPermissionGranted () {
      if (isServer || !('Notification' in window)) return false
      return Notification.permission === 'granted'
    },
    checkoutPersonalEmailAddress () {
      return this.$store.state.checkout.personalDetails.emailAddress
    },
    mailerElements () {
      return this.$store.state.config.mailer.contactAddress
    }
  },
  methods: {
    requestNotificationPermission () {
      if (isServer) return false
      if ('Notification' in window && Notification.permission !== 'granted') {
        Notification.requestPermission()
      }
    },
    sendFeedback () {
      this.sendEmail(
        {
          sourceAddress: this.checkoutPersonalEmailAddress,
          targetAddress: this.mailerElements,
          subject: this.$t('What we can improve?'),
          emailText: this.feedback
        },
        this.onSuccess,
        this.onFailure
      )
    },
    onSuccess (message) {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'success',
        message,
        action1: { label: this.$t('OK') }
      })
      if (this.mailerElements.sendConfirmation) {
        this.sendEmail(
          {
            sourceAddress: this.mailerElements,
            targetAddress: this.checkoutPersonalEmailAddress,
            subject: this.$t('Confirmation of receival'),
            emailText: this.$t(`Dear customer,\n\nWe have received your letter.\nThank you for your feedback!`),
            confirmation: true
          }
        )
      }
    },
    onFailure (message) {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'error',
        message,
        action1: { label: this.$t('OK') }
      })
    },
    getTime (timeDate) {
      let date = timeDate.substr(0, timeDate.indexOf('T'))
      let time = timeDate.substr(timeDate.indexOf('T') + 1, timeDate.indexOf('.'))
      return `${date} ${time}`
    }
  },
  destroyed () {
    this.$store.dispatch('checkout/setThankYouPage', false)
  },
  components: {
    BaseTextarea,
    ButtonOutline
  }
}
</script>

<style lang="scss">
  .category-title {
    font-weight: 800;
    font-size: 25px;
    line-height: 34px;
    letter-spacing: 0.1em;
  }

  .order-number {
    font-weight: 600;
    font-size: 14px;
    line-height: 19px;
    letter-spacing: 0.1em;
  }

  .order-time {
    font-weight: 300;
    font-size: 12px;
    line-height: 16px;
    color: #C5C5C5;
    padding-bottom: 25px;
    border-bottom: 0.5px solid rgba(0, 0, 0, 0.25);
  }

  .thank-you-content {
    .details-title {
      font-weight: bold;
      font-size: 16px;
      line-height: 22px;
    }

    .details {
      font-weight: normal;
      font-size: 14px;
      line-height: 19px;
    }
  }
  .thank-you-improvment {
    padding: 20px;

    .feedback-title {
      font-weight: bold;
      font-size: 20px;
      line-height: 27px;
      letter-spacing: 0.1em;
    }

    .feedback-detail {
      font-weight: normal;
      font-size: 14px;
      line-height: 19px;
    }

    @media (min-width: 64em) {
      padding: 0 40px 10px;
    }

    textarea {
      min-height: 100px;
    }
  }
</style>

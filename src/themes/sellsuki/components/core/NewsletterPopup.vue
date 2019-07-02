<template>
  <modal name="modal-newsletter" :width="450">
    <p slot="header">
      NEWSLETTER
    </p>
    <div slot="content">
      <form @submit.prevent="submit(onSuccesfulSubmission)" novalidate>
        <div class="mb10">
          <p class="h4">
            Subscribe to our Newsletter and we will send you information about our new products and trends
          </p>
          <base-input
            focus
            type="email"
            name="email"
            v-model="email"
            autocomplete="email"
            :placeholder="$t('E-mail address *')"
            :validations="[
              {
                condition: $v.email.$error && !$v.email.required,
                text: $t('Field is required.')
              },
              {
                condition: !$v.email.email && $v.email.$error,
                text: $t('Please provide valid e-mail address.')
              }
            ]"
          />
        </div>
        <button-full
          class="mb35"
          type="submit"
          :disabled="this.$v.$invalid"
          @click.native="$v.email.$touch"
        >
          {{ $t('Subscribe') }}
        </button-full>
      </form>
    </div>
  </modal>
</template>
<script>
import { Subscribe } from 'src/modules/mailchimp/components/Subscribe'
import i18n from '@vue-storefront/i18n'

import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import Modal from 'theme/components/core/Modal'
import BaseInput from 'theme/components/core/blocks/Form/BaseInput.vue'

export default {
  mounted () {
    this.$nextTick(() => {
      this.$bus.$emit('modal-show', 'modal-newsletter')
    })
  },
  beforeDestroy () {
    this.$off('validation-error')
  },
  methods: {
    onSuccesfulSubmission () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'success',
        message: i18n.t('You have been successfully subscribed to our newsletter!'),
        action1: { label: i18n.t('OK') }
      })
      this.$bus.$emit('modal-hide', 'modal-newsletter')
    }
  },
  components: {
    ButtonFull,
    Modal,
    BaseInput
  },
  mixins: [
    Subscribe
  ]
}
</script>

<style lang="scss" scoped>
  p, button{
    font-family: 'Nunito Sans';
    font-style: normal;
    color: #404040;
  }

  .modal-header p {
    font-weight: 900;
    font-size: 25px;
    line-height: 34px;
    padding-left: 4%;
  }

  .h4 {
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
  }

  button {
    color: #EEEEEE;
    text-transform: uppercase;
    font-weight: 800;
    font-size: 14px;
    line-height: 19px;
    letter-spacing: 0.25em;
  }

  form {
    padding: 0 4%;
  }
</style>

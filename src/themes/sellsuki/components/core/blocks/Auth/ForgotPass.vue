<template>
  <div>
    <header class="modal-header py25 px65">
      <i
        slot="close"
        class="modal-close material-icons p15 cl-bg-tertiary"
        @click="close"
      >
        close
      </i>
      {{ $t('Reset password') }}
    </header>

    <div class="modal-content pt30 pb60 px65 cl-secondary">
      <template v-if="!passwordSent">
        <form @submit.prevent="sendEmail" novalidate>
          <div class="mb30">
            <p class="mb45" style="font-size: 16px">
              {{ $t('Enter your email to receive instructions on how to reset your password.') }}
            </p>
            <base-input
              type="email"
              name="email"
              v-model="email"
              focus
              :placeholder="$t('E-mail Address *')"
              :validations="[
                {
                  condition: !$v.email.required && $v.email.$error,
                  text: $t('E-mail Address is required.')
                },
                {
                  condition: !$v.email.email && $v.email.$error,
                  text: $t('Please provide valid E-mail Address.')
                }
              ]"
            />
          </div>
          <button-full class="mt10 mb35" type="submit">
            <div class="text-btn">{{ $t('Reset password') }}</div>
          </button-full>
          <div class="center-xs" style="text-transform: uppercase;">
            {{ $t('Return to ') }}
            <a href="#" class="secondary" @click.prevent="switchElem">
              {{ $t('log in') }}
            </a>
          </div>
        </form>
      </template>
      <template v-if="passwordSent">
        <form class="py20">
          <p class="py30 mb80" style="font-size: 16px;">
            {{ $t("We've sent password reset instructions to your email. Check your inbox and follow the link.") }}
          </p>
          <button-full class="mb35 secondary" type="submit">
            {{ $t('Home') }}
          </button-full>
        </form>
      </template>
    </div>
  </div>
</template>

<script>

import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import BaseInput from '../Form/BaseInput.vue'
import { required, email } from 'vuelidate/lib/validators'
import i18n from '@vue-storefront/i18n'

export default {
  validations: {
    email: {
      required,
      email
    }
  },
  methods: {
    close () {
      this.$bus.$emit('modal-hide', 'modal-signup')
    },
    sendEmail () {
      // todo: send email with reset password instructions

      if (this.$v.$invalid) {
        this.$v.$touch()
        this.$store.dispatch('notification/spawnNotification', {
          type: 'error',
          message: i18n.t('Please fix the validation errors'),
          action1: { label: i18n.t('OK') }
        })
        return
      }

      this.$bus.$emit('notification-progress-start', i18n.t('Resetting the password ... '))
      this.$store.dispatch('user/resetPassword', { email: this.email }).then((response) => {
        this.$bus.$emit('notification-progress-stop')
        if (response.code === 200) {
          this.passwordSent = true
        } else {
          this.$store.dispatch('notification/spawnNotification', {
            type: 'error',
            message: i18n.t(response.result) || i18n.t('Error while sending reset password e-mail'),
            action1: { label: i18n.t('OK'), action: 'close' }
          })
        }
      }).catch((err) => {
        console.error(err)
        this.$bus.$emit('notification-progress-stop')
      })
    },
    switchElem () {
      this.$store.commit('ui/setAuthElem', 'login')
    }
  },
  name: 'ForgotPass',
  data () {
    return {
      email: '',
      passwordSent: false
    }
  },
  components: {
    ButtonFull,
    BaseInput
  }
}
</script>

<style lang="scss" scoped>
  div {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;
    color: #404040;
  }
  .modal-header {
    @media (max-width: 414px) {
      padding: 50px 33px 0px 33px;
      font-weight: 800;
      font-size: 25px;
      line-height: 34px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }
  }
  .modal-content {
    @media (max-width: 414px) {
      padding: 100px 33px 0px 33px;
    }
  }
  .secondary {
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 0.1em;
  }
  .text-btn {
    font-weight: 800;
    text-align: center;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: #EEEEEE
  }
</style>

<template>
  <div>
    <i slot="close" class="modal-close material-icons p15 cl-bg-tertiary" @click="close">close</i>
    <header class="modal-header">
      {{ $t('LOGIN') }}
    </header>
    <div class="modal-content pt30 pb50 px65 cl-secondary">
      <form @submit.prevent="login" novalidate>
        <base-input
          class="mb10"
          type="email"
          name="email"
          focus
          v-model="email"
          @blur="$v.email.$touch()"
          :placeholder="$t('E-mail Address *')"
          :validations="[
            {
              condition: !$v.email.required && $v.email.$error,
              text: $t('E-mail Address is required.'),
            },
            {
              condition: !$v.email.email && $v.email.$error,
              text: $t('Please provide valid E-mail Address.')
            }
          ]"
        />
        <base-input
          class="mb10"
          type="password"
          name="password"
          v-model="password"
          @blur="$v.password.$touch()"
          :placeholder="$t('Password *')"
          :validations="[{
            condition: !$v.password.required && $v.password.$error,
            text: $t('Password is required.')
          }]"
        />
        <base-checkbox
          class="mb15 mt50"
          id="remember"
          v-model="remember"
          @click="remember = !remember"
        >
          {{ $t('Remember me') }}
        </base-checkbox>
        <div class="mb25">
          <a href="#" @click.prevent="remindPassword" style="text-decoration-line: underline">
            {{ $t('Have you forgotten your password?') }}
          </a>
        </div>
        <button-full class="mb25" type="submit" data-testid="loginSubmit">
          <div class="text-btn">{{ $t('login') }}</div>
        </button-full>
        <div class="row">
          <div class="col-xs-8">
            {{ $t('Does not have an account?') }}
          </div>
          <div class="col-xs-4 end-xs">
            <a class="secondary" href="#" @click.prevent="switchElem" data-testid="registerLink">
              {{ $t('Register') }}
            </a>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import Login from '@vue-storefront/core/compatibility/components/blocks/Auth/Login'
import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import BaseCheckbox from '../Form/BaseCheckbox.vue'
import BaseInput from '../Form/BaseInput.vue'
import { required, email } from 'vuelidate/lib/validators'
export default {
  mixins: [Login],
  validations: {
    email: {
      required,
      email
    },
    password: {
      required
    }
  },
  methods: {
    login () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        this.$store.dispatch('notification/spawnNotification', {
          type: 'error',
          message: this.$t('Please fix the validation errors'),
          action1: { label: this.$t('OK') }
        })
        return
      }
      this.callLogin()
    },
    remindPassword () {
      if (!(typeof navigator !== 'undefined' && navigator.onLine)) {
        this.$store.dispatch('notification/spawnNotification', {
          type: 'error',
          message: this.$t('Reset password feature does not work while offline!'),
          action1: { label: this.$t('OK') }
        })
      } else {
        this.callForgotPassword()
      }
    },
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
  },
  components: {
    ButtonFull,
    BaseCheckbox,
    BaseInput
  }
}
</script>
<style lang="scss" scoped>
  div {
    font-family: 'Nunito Sans', sans-serif;
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
    }
  }
  .modal-content {
    @media (max-width: 414px) {
      padding: 95px 33px 0px 33px;
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

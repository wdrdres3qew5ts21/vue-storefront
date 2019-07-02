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
      {{ $t('Register') }}
    </header>

    <div class="modal-content pt30 pb60 px65 cl-secondary">
      <form @submit.prevent="register" novalidate>
        <base-input
          class="mb10"
          type="email"
          name="email"
          autocomplete="email"
          v-model="email"
          @blur="$v.email.$touch()"
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
        <base-input
          class="mb10"
          type="text"
          name="fist-name"
          autocomplete="given-name"
          v-model="firstName"
          @blur="$v.firstName.$touch()"
          :placeholder="$t('First Name *')"
          :validations="[
            {
              condition: !$v.firstName.required && $v.firstName.$error,
              text: $t('First Name is required.')
            },
            {
              condition: !$v.firstName.minLength,
              text: $t('Name must have at least 2 letters.')
            }
          ]"
        />
        <base-input
          class="mb10"
          type="text"
          name="last-name"
          autocomplete="last-name"
          v-model="lastName"
          @blur="$v.lastName.$touch()"
          :placeholder="$t('Last Name *')"
          :validations="[{
            condition: !$v.lastName.required && $v.lastName.$error,
            text: $t('Last Name is required.')
          }]"
        />
        <base-input
          class="mb10"
          type="password"
          name="password"
          ref="password"
          autocomplete="new-password"
          v-model="password"
          @blur="$v.password.$touch()"
          :placeholder="$t('Password *')"
          :validations="[
            {
              condition: !$v.password.required && $v.password.$error,
              text: $t('Password is required.')
            },
            {
              condition: !$v.password.minLength && $v.password.$error,
              text: $t('Password must have at least 8 letters.')
            }
          ]"
        />
        <base-input
          class="mb25"
          type="password"
          name="password-confirm"
          autocomplete="new-password"
          v-model="rPassword"
          @blur="$v.rPassword.$touch()"
          :placeholder="$t('Repeat password *')"
          :validations="[
            {
              condition: !$v.rPassword.required && $v.rPassword.$error,
              text: $t('Repeat password is required.')
            },
            {
              condition: !$v.rPassword.sameAsPassword && $v.rPassword.$error,
              text: $t('Passwords must be identical.')
            }
          ]"
        />
        <base-checkbox
          class="mb10"
          id="terms"
          v-model="conditions"
          @click="conditions = !conditions"
          @blur="$v.conditions.$reset()"
          @change="$v.conditions.$touch()"
          :validations="[{
            condition: !$v.conditions.required && $v.conditions.$error,
            text: $t('You must accept the terms and conditions.')
          }]"
        >
          {{ $t('I accept terms and conditions') }} *
        </base-checkbox>
        <button-full class="mb25" type="submit">
          <div class="text-btn">{{ $t('Register') }}</div>
        </button-full>
        <div class="row">
          <div class="col-xs-8">
            {{ $t('Already have an account?') }}
          </div>
          <div class="col-xs-4 end-xs">
            <a class="secondary" href="#" @click.prevent="switchElem">
              {{ $t('Login') }}
            </a>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import Register from '@vue-storefront/core/compatibility/components/blocks/Auth/Register'
import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import BaseCheckbox from 'theme/components/core/blocks/Form/BaseCheckbox.vue'
import BaseInput from 'theme/components/core/blocks/Form/BaseInput.vue'
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'

export default {
  validations: {
    email: {
      required,
      email
    },
    firstName: {
      minLength: minLength(2),
      required
    },
    lastName: {
      required
    },
    password: {
      minLength: minLength(8),
      required
    },
    rPassword: {
      required,
      sameAsPassword: sameAs('password')
    },
    conditions: {
      required
    }
  },
  mixins: [Register],
  components: {
    ButtonFull,
    BaseCheckbox,
    BaseInput
  },
  methods: {
    register () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        this.$store.dispatch('notification/spawnNotification', {
          type: 'error',
          message: this.$t('Please fix the validation errors'),
          action1: { label: this.$t('OK') }
        })
        return
      }
      this.callRegister()
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
        message: result.result,
        action1: { label: this.$t('OK') }
      })
    }
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
      text-transform: uppercase;
    }
  }
  .modal-content {
    @media (max-width: 414px) {
      padding: 50px 33px 0px 33px;
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

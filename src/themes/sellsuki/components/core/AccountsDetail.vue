<template>
  <!-- My profile body (edit mode) -->
  <div class="row">
    <div class="lh30 flex end-md edit-section">
      <p class="account-profile">
        ACCOUNT PROFILE
      </p>
      <font-awesome-icon class="circle" icon="edit" size="lg" style="color: #404040;" @click="editAccount"/>
    </div>

    <base-input
      class="col-xs-12 col-md-6 mb10"
      type="text"
      name="first-name"
      autocomplete="given-name"
      :edit-page="accountEdit"
      :placeholder="$t('First name')"
      v-model.trim="currentUser.firstname"
      @input="$v.currentUser.firstname.$touch()"
      :validations="[
        {
          condition: !$v.currentUser.firstname.required,
          text: $t('Field is required')
        },
        {
          condition: !$v.currentUser.firstname.minLength,
          text: $t('Name must have at least 2 letters.')
        }
      ]"
    />

    <base-input
      class="col-xs-12 col-md-6 mb10"
      type="text"
      name="last-name"
      autocomplete="family-name"
      :edit-page="accountEdit"
      :placeholder="$t('Last name')"
      v-model.trim="currentUser.lastname"
      @input="$v.currentUser.lastname.$touch()"
      :validations="[{
        condition: !$v.currentUser.lastname.required,
        text: $t('Field is required')
      }]"
    />

    <base-input
      class="col-xs-12 col-md-6 mb10"
      type="email"
      name="email-address"
      autocomplete="email"
      :edit-page="accountEdit"
      :placeholder="$t('Email address')"
      v-model="currentUser.email"
      :validations="[
        {
          condition: !$v.currentUser.email.required,
          text: $t('Field is required')
        },
        {
          condition: !$v.currentUser.email.email,
          text: $t('Please provide valid e-mail address.')
        }
      ]"
    />

    <!-- Change password (edit mode) -->
    <div
      class="col-xs-12 mb15 change-password"
      v-if="accountEdit"
      id="changePassword"
      @click="changePassword = !changePassword"
    >
      {{ $t('Change my password') }}
    </div>

    <template v-if="changePassword">
      <base-input
        class="col-xs-12 col-md-6 mb15 mt10"
        type="password"
        name="old-password"
        autocomplete="current-password"
        :placeholder="$t('Current password *')"
        v-model="oldPassword"
        @input="$v.oldPassword.$touch()"
        :validations="[{
          condition: !$v.oldPassword.required && $v.oldPassword.$error,
          text: $t('Field is required')
        }]"
      />

      <div class="hidden-xs hidden-sm col-md-6 mb15 mt10"/>

      <base-input
        class="col-xs-12 col-md-6 mb15 mt10"
        type="password"
        name="password"
        autocomplete="new-password"
        :placeholder="$t('New password *')"
        v-model="password"
        @input="$v.password.$touch()"
        :validations="[{
          condition: !$v.password.required && $v.password.$error,
          text: $t('Field is required')
        }]"
      />

      <base-input
        class="col-xs-12 col-md-6 mb15 mt10"
        type="password"
        name="password-confirm"
        autocomplete="new-password"
        :placeholder="$t('Repeat new password *')"
        v-model="rPassword"
        @input="$v.rPassword.$touch()"
        :validations="[
          {
            condition: !$v.rPassword.required && $v.rPassword.$error,
            text: $t('Field is required')
          },
          {
            condition: !$v.rPassword.sameAsPassword,
            text: $t('Passwords must be identical.')
          }
        ]"
      />
    </template>

    <div class="col-xs-12 col-sm-6" v-if="accountEdit">
      <button-full
        class="update-password"
        @click.native="updateProfile"
        :disabled="checkValidation()"
      >
        Update Profile
      </button-full>
    </div>
  </div>
</template>

<script>
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'
import MyProfile from '@vue-storefront/core/compatibility/components/blocks/MyAccount/MyProfile'

import BaseCheckbox from 'theme/components/core/blocks/Form/BaseCheckbox'
import BaseSelect from 'theme/components/core/blocks/Form/BaseSelect'
import BaseInput from 'theme/components/core/blocks/Form/BaseInput'
import ButtonFull from 'theme/components/theme/ButtonFull'
import Tooltip from 'theme/components/core/Tooltip'

export default {
  components: {
    BaseCheckbox,
    BaseSelect,
    BaseInput,
    ButtonFull,
    Tooltip
  },
  mixins: [MyProfile],
  computed: {
    countryOptions () {
      return this.countries.map((item) => {
        return {
          value: item.code,
          label: item.name
        }
      })
    }
  },
  methods: {
    checkValidation () {
      if (this.changePassword && this.addCompany) {
        return this.$v.$invalid
      } else if (this.changePassword && !this.addCompany) {
        return this.$v.currentUser.$invalid || this.$v.password.$invalid || this.$v.rPassword.$invalid
      } else if (!this.changePassword && this.addCompany) {
        return this.$v.currentUser.$invalid || this.$v.userCompany.$invalid
      } else {
        return this.$v.currentUser.$invalid
      }
    },
    editAccount () {
      if (this.accountEdit === true) {
        this.exitSection()
      }
      this.accountEdit = !this.accountEdit
    }
  },
  validations: {
    currentUser: {
      firstname: {
        required,
        minLength: minLength(2)
      },
      lastname: {
        required
      },
      email: {
        required,
        email
      }
    },
    oldPassword: {
      required
    },
    password: {
      required
    },
    rPassword: {
      required,
      sameAsPassword: sameAs('password')
    },
    userCompany: {
      company: {
        required
      },
      country: {
        required
      },
      street: {
        required
      },
      house: {
        required
      },
      postcode: {
        required,
        minLength: minLength(3)
      },
      city: {
        required
      },
      taxId: {
        required,
        minLength: minLength(3)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.edit-section {
  justify-content: space-between;
  width: 100%;
  margin: 10px 8px 30px 8px;

  .account-profile {
    font-weight: bold;
    font-size: 20px;
    line-height: 27px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
}

.update-password {
  font-family: 'Nunito Sans';
  font-style: normal;
  font-weight: 800;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #EEEEEE;
}

.change-password {
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
}
</style>

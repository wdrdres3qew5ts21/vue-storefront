<template>
  <div class="mb35">
    <!-- My shipping details body (edit mode) -->
    <div class="row">
      <!-- My shipping details header -->
      <div class="lh30 flex end-md edit-section">
        <p class="m0 mb5 shipping-details">
          SHIPPING DETAILS
        </p>
        <font-awesome-icon class="circle" icon="edit" size="lg" style="color: #404040;" @click="editShipping"/>
      </div>
    </div>
    <template>
      <base-input
        class="col-xs-12 col-sm-6 mb10"
        type="text"
        name="first-name"
        autocomplete="given-name"
        :edit-page="shippingEdit"
        :placeholder="`${$t('First name')} *`"
        v-model.trim="shippingDetails.firstName"
        @input="$v.shippingDetails.firstName.$touch()"
        :validations="[
          {
            condition: !$v.shippingDetails.firstName.required && $v.shippingDetails.firstName.$error,
            text: $t('Field is required')
          },
          {
            condition: !$v.shippingDetails.firstName.minLength,
            text: $t('Name must have at least 2 letters.')
          }
        ]"
      />

      <base-input
        class="col-xs-12 col-sm-6 mb10"
        type="text"
        name="last-name"
        autocomplete="family-name"
        :edit-page="shippingEdit"
        :placeholder="`${$t('Last name')} *`"
        v-model.trim="shippingDetails.lastName"
        @input="$v.shippingDetails.lastName.$touch()"
        :validations="[{
          condition: !$v.shippingDetails.lastName.required && $v.shippingDetails.lastName.$error,
          text: $t('Field is required')
        }]"
      />

      <base-input
        class="col-xs-12 col-sm-6 mb10"
        v-if="shippingDetails.street !== '' || shippingEdit"
        type="text"
        name="street-address"
        autocomplete="address-line1"
        :edit-page="shippingEdit"
        :placeholder="`${$t('Street name')} *`"
        v-model.trim="shippingDetails.street"
        @input="$v.shippingDetails.street.$touch()"
        :validations="[{
          condition: !$v.shippingDetails.street.required && $v.shippingDetails.street.$error,
          text: $t('Field is required')
        }]"
      />

      <base-input
        class="col-xs-12 col-sm-6 mb10"
        v-if="shippingDetails.house !== '' || shippingEdit"
        type="text"
        name="apartment-number"
        autocomplete="address-line2"
        :placeholder="`${$t('House/Apartment number')} *`"
        v-model.trim="shippingDetails.house"
        @input="$v.shippingDetails.house.$touch()"
        :validations="[{
          condition: !$v.shippingDetails.house.required && $v.shippingDetails.house.$error,
          text: $t('Field is required')
        }]"
      />

      <base-input
        class="col-xs-12 col-sm-6 mb10"
        v-if="shippingDetails.city !== '' || shippingEdit"
        type="text"
        name="city"
        autocomplete="address-level2"
        :edit-page="shippingEdit"
        :placeholder="`${$t('City')} *`"
        v-model.trim="shippingDetails.city"
        @input="$v.shippingDetails.city.$touch()"
        :validations="[{
          condition: !$v.shippingDetails.city.required && $v.shippingDetails.city.$error,
          text: $t('Field is required')
        }]"
      />

      <base-input
        class="col-xs-12 col-sm-6 mb10"
        v-if="shippingDetails.region !== '' || shippingEdit"
        type="text"
        name="state"
        autocomplete="address-level1"
        :edit-page="shippingEdit"
        :placeholder="$t('State / Province')"
        v-model.trim="shippingDetails.region"
      />

      <base-input
        class="col-xs-12 col-sm-6 mb10"
        v-if="shippingDetails.postcode !== '' || shippingEdit"
        type="text"
        name="zip-code"
        autocomplete="postal-code"
        :edit-page="shippingEdit"
        :placeholder="`${$t('Zip-code')} *`"
        v-model.trim="shippingDetails.postcode"
        @input="$v.shippingDetails.postcode.$touch()"
        :validations="[
          {
            condition: !$v.shippingDetails.postcode.required && $v.shippingDetails.postcode.$error,
            text: $t('Field is required')
          },
          {
            condition: !$v.shippingDetails.postcode.minLength,
            text: $t('Zip-code must have at least 3 letters.')
          }
        ]"
      />

      <base-select
        class="col-xs-12 col-sm-6 mb10"
        v-if="shippingDetails.country !== '' || shippingEdit"
        name="countries"
        :options="countryOptions"
        :edit-page="shippingEdit"
        :selected="shippingDetails.country"
        :placeholder="$t('Country *')"
        :validations="[
          {
            condition: $v.shippingDetails.country.$error && !$v.shippingDetails.country.required,
            text: $t('Field is required')
          }
        ]"
        v-model="shippingDetails.country"
        autocomplete="country-name"
        @blur="$v.shippingDetails.country.$touch()"
        @change="$v.shippingDetails.country.$touch()"
      />

      <base-input
        class="col-xs-12 col-sm-6 mb10"
        v-if="shippingDetails.phone !== '' || shippingEdit"
        type="text"
        name="phone-number"
        autocomplete="tel"
        :edit-page="shippingEdit"
        :placeholder="$t('Phone Number')"
        v-model.trim="shippingDetails.phone"
      />

      <div class="col-xs-12 col-sm-6" v-if="shippingEdit">
        <button-full
          class="update-shipping"
          @click.native="updateDetails"
          :disabled="$v.$invalid"
        >
          UPDATE SHIPPING DETAILS
        </button-full>
      </div>
    </template>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import MyShippingDetails from '@vue-storefront/core/compatibility/components/blocks/MyAccount/MyShippingDetails'

import ButtonFull from 'theme/components/theme/ButtonFull'
import Tooltip from 'theme/components/core/Tooltip'
import BaseCheckbox from 'theme/components/core/blocks/Form/BaseCheckbox'
import BaseInput from 'theme/components/core/blocks/Form/BaseInput'
import BaseSelect from 'theme/components/core/blocks/Form/BaseSelect'

export default {
  components: {
    ButtonFull,
    Tooltip,
    BaseCheckbox,
    BaseInput,
    BaseSelect
  },
  mixins: [MyShippingDetails],
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
    editShipping () {
      if (this.shippingEdit) {
        this.exitSection()
      }
      this.shippingEdit = !this.shippingEdit
    }
  },
  validations: {
    shippingDetails: {
      firstName: {
        required,
        minLength: minLength(2)
      },
      lastName: {
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

  .shipping-profile {
    font-weight: bold;
    font-size: 20px;
    line-height: 27px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
}

.update-shipping {
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
</style>

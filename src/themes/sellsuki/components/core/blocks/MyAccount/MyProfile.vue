<template>
  <div class="mb35">
    <!-- My profile header -->
    <div class="row mb15">
      <div class="col-xs-12 col-sm-6" :class="{ 'cl-accent' : !isEdited }">
        <p class="m0 mb5 page-name">
          {{ $t('My profile') }}
        </p>
        <p class="username">
          {{ currentUser.firstname }} {{ currentUser.lastname }}
        </p>
      </div>
    </div>

    <!-- My profile body -->
    <accounts-detail/>

    <!-- My shipping body -->
    <shipping-detail/>
  </div>
</template>

<script>
import MyProfile from '@vue-storefront/core/compatibility/components/blocks/MyAccount/MyProfile'

import AccountsDetail from 'sellsuki/components/core/AccountsDetail'
import ShippingDetail from 'sellsuki/components/core/ShippingDetail'

export default {
  components: {
    AccountsDetail,
    ShippingDetail
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
  }
}
</script>

<style lang="scss" scoped>
.page-name {
  font-weight: 800;
  font-size: 25px;
  line-height: 34px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding-top: 10px;
}

.username {
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: #404040;
  padding-bottom: 17px;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.25);
}
</style>

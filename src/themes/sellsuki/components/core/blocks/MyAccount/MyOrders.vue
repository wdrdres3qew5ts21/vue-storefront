<template>
  <div class="mb35">
    <!-- My orders header -->
    <div class="row mb15">
      <div class="col-xs-12 col-sm-6">
        <p class="title m0 mb5">
          MY ORDERS
        </p>
        <p class="name" v-if="ordersHistory != undefined">
          {{ ordersHistory[0].customer_firstname }} {{ ordersHistory[0].customer_lastname }}
        </p>
      </div>
    </div>
    <!-- My orders body -->
    <div class="row">
      <div class="table-wrapper col-xs-12" v-show="!isHistoryEmpty">
        <table class="mt10">
          <thead>
            <tr ref="table_first">
              <th class="p20 serif lh20 fixed-side">Order</th>
              <th class="p20 serif lh20">Details</th>
              <th class="p20 serif lh20">&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr class="brdr-top-1 brdr-cl-bg-secondary" ref="table_first" v-for="order in ordersHistory" :key="order.entity_id">
              <td class="fs-medium lh25 fixed-side table-detail">#{{ order.entity_id }}</td>
              <td class="fs-medium lh25">
                <p class="table-detail" v-for="item in order.items" :key="item.id">{{ item.qty_ordered }} x {{ item.name }}</p>
              </td>
              <td class="fs-medium lh25">
                <span class="relative dropdown">
                  <i class="material-icons cl-secondary pointer">more_horiz</i>
                  <div class="dropdown-content align-left fs-medium-small py5">
                    <router-link class="no-underline block py10 px15" :to="localizedRoute(`/my-account/orders/${order.entity_id}`)">
                      {{ $t('View order') }}
                    </router-link>
                    <hr>
                    <a href="#" class="no-underline block py10 px15" @click.prevent="remakeOrder(skipGrouped(order.items))">{{ $t('Remake order') }}</a>
                  </div>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-xs-12 h4" v-show="isHistoryEmpty">
        <p>{{ $t('No orders yet') }}</p>
      </div>
    </div>

  </div>
</template>

<script>
import MyOrders from '@vue-storefront/core/compatibility/components/blocks/MyAccount/MyOrders'

export default {
  name: 'MyOrders',
  mixins: [MyOrders]
}
</script>

<style lang="scss" scoped>
@import '~theme/css/base/global_vars';
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-icon-hover: color(secondary, $colors-background);

* {
  color: #404040;
}

.title {
  font-weight: 800;
  font-size: 25px;
  line-height: 34px;
  letter-spacing: 0.1em;
}

.name {
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
}

th, .table-detail {
  font-size: 14px;
  line-height: 19px;
}

.table-detail {
  font-weight: normal;
}

th {
  font-weight: 600;
  background: #EEEEEE;
}

table {
  border-collapse: collapse;
  width: 100%;;

  th, td {
    text-align: left;
    padding: 20px;
    border: 0.5px solid rgba(0, 0, 0, 0.25);

    @media (max-width: 1199px) {
      padding: 10px;
    }

    @media (max-width: 767px) {
      text-align: center;
    }
  }

  i {
    vertical-align: middle;
  }

}

.dropdown {
  display: block;
  margin: -20px;
  padding: 20px;

  @media (max-width: 1199px) {
    margin: -10px;
    padding: 10px;
  }

  .dropdown-content {
    display: none;
    background: #EEEEEE;
    position: absolute;
    right: 0;
    top: 100%;
    width: 120px;
    z-index: 1;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  hr {
    margin: 0 10px;
    opacity: 0.3;
  }

  a {
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;
    color: #404040;
  }

  &:hover .dropdown-content {
    display: block;
  }

}

</style>

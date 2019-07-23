<template>
  <div class="mb35">
    <!-- My order header -->
    <div class="row">
      <div class="col-xs-12 col-sm-6 name-section">
        <p class="title m0 mb5 mt5">
          MY ORDER
        </p>
        <p class="name">
          {{ order.customer_firstname }} {{ order.customer_lastname }}
        </p>
        <hr>
      </div>
    </div>
    <div class="row mb15">
      <div class="col-xs-8 col-sm-6 order-details">
        <p class="m0 mb5 order-number">
          ORDER {{ order.entity_id }}
        </p>
        <p class="order-date">{{ order.created_at | date('MMMM D, YYYY') }}</p>
        <p class="remake-order"><a href="#" class="underline" @click.prevent="remakeOrder(skipGrouped(order.items))">{{ $t('Remake order') }}</a></p>
      </div>
      <div class="col-xs-4 order-status">
        <p class="status">
          {{ order.status | capitalize }}
        </p>
      </div>
    </div>
    <!-- My order body -->
    <div class="row fs16 mb35">
      <div class="col-xs-12 h4">
        <table class="brdr-1 brdr-cl-bg-secondary">
          <thead>
            <tr>
              <th class="serif lh20">{{ $t('Product Name') }}</th>
              <th class="serif lh20">{{ $t('SKU') }}</th>
              <th class="serif lh20">{{ $t('Price') }}</th>
              <th class="serif lh20">{{ $t('Qty') }}</th>
              <th class="serif lh20">{{ $t('Subtotal') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr class="brdr-top-1 brdr-cl-bg-secondary" v-for="item in skipGrouped(order.items)" :key="item.item_id">
              <td class="fs-medium lh25" :data-th="$t('Product Name')">{{ item.name }}</td>
              <td class="fs-medium lh25" :data-th="$t('SKU')">{{ item.sku }}</td>
              <td class="fs-medium lh25" :data-th="$t('Price')">{{ item.price_incl_tax | price }}</td>
              <td class="fs-medium lh25 align-right" :data-th="$t('Qty')">{{ item.qty_ordered }}</td>
              <td class="fs-medium lh25" :data-th="$t('Subtotal')">{{ item.row_total_incl_tax | price }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr class="brdr-top-1 brdr-cl-bg-secondary">
              <td colspan="4" class="align-right">{{ $t('Subtotal') }}</td>
              <td>{{ order.subtotal | price }}</td>
            </tr>
            <tr>
              <td colspan="4" class="align-right">{{ $t('Shipping') }}</td>
              <td>{{ order.shipping_amount | price }}</td>
            </tr>
            <tr>
              <td colspan="4" class="align-right">{{ $t('Tax') }}</td>
              <td>{{ order.tax_amount + order.discount_tax_compensation_amount | price }}</td>
            </tr>
            <tr v-if="order.discount_amount">
              <td colspan="4" class="align-right">{{ $t('Discount') }}</td>
              <td>{{ order.discount_amount | price }}</td>
            </tr>
            <tr>
              <td colspan="4" class="align-right">{{ $t('Grand total') }}</td>
              <td>{{ order.grand_total | price }}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
    <div class="row fs16 mb35">
      <div class="col-xs-12 h4">
        <h4>{{ $t('Order informations') }}</h4>
        <div class="row">
          <div class="col-sm-6 col-md-3">
            <h5>{{ $t('Shipping address') }}</h5>
            <!-- <address>
              <p>{{ shippingAddress.firstname }} {{ shippingAddress.lastname }}</p>
              <p>{{ shippingAddress.street[0] }} {{ shippingAddress.street[1] }}</p>
              <p>{{ shippingAddress.postcode }} {{ shippingAddress.city }}</p>
              <p>{{ shippingAddress.country }}</p>
            </address> -->
          </div>
          <div class="col-sm-6 col-md-3">
            <h5>{{ $t('Shipping method') }}</h5>
            <p>{{ order.shipping_description }}</p>
          </div>
          <div class="col-sm-6 col-md-3">
            <h5>{{ $t('Billing address') }}</h5>
            <address>
              <p>{{ billingAddress.firstname }} {{ billingAddress.lastname }}</p>
              <p>{{ billingAddress.street[0] }} {{ billingAddress.street[1] }}</p>
              <p>{{ billingAddress.postcode }} {{ billingAddress.city }}</p>
              <p>{{ billingAddress.country }}</p>
            </address>
          </div>
          <div class="col-sm-6 col-md-3">
            <h5>{{ $t('Payment method') }}</h5>
            <p>{{ paymentMethod }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyOrder from '@vue-storefront/core/compatibility/components/blocks/MyAccount/MyOrder'

export default {
  mixins: [MyOrder],
  mounted () {
    this.fetchProductImage()
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-tertiary: color(tertiary);
$color-white-smoke: color(white-smoke);

hr {
  color: rgba(0, 0, 0, 0.25);
  opacity: 0.3;
  margin: 22px 0;
}

.title {
  font-weight: 800;
  font-size: 25px;
  line-height: 34px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.name {
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
}

.order-details {
  .order-number {
    font-weight: bold;
    font-size: 20px;
    line-height: 27px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .order-date {
    font-style: normal;
    font-weight: 300;
    font-size: 12px;
    line-height: 16px;
  }

  .remake-order {
    margin-top: 10px;
    font-weight: 600;
    font-size: 14px;
    line-height: 19px;
    letter-spacing: 0.1em;
    text-decoration-line: underline;
    text-transform: uppercase;
  }
}

.order-status {
  padding: 0;
  display: flex;
  align-items: center;

  .status {
    /* align text to center */
    display: flex;
    align-items: center;
    justify-content: center;

    /* text style */
    font-weight: 800;
    font-size: 14px;
    line-height: 19px;
    text-align: center;
    letter-spacing: 0.25em;
    text-transform: uppercase;

    /* border style */
    border: 1.5px solid #EEEEEE;
    box-sizing: border-box;
    border-radius: 0.5px;

    /* box width and height */
    width: 115px;
    height: 40px;
  }
}

table {
  border-collapse: collapse;
  width: 100%;

  @media (max-width: 767px) {
    border-top: none;
  }

  th, td {
    text-align: left;
    padding: 20px;

    &.align-right {
      text-align: right;

      @media (max-width: 767px) {
        text-align: left;
      }

    }

    @media (max-width: 1199px) {
      padding: 10px;
    }

  }

  thead {
    @media (max-width: 767px) {
      display: none;
    }
  }

  tbody {

    tr {
      @media (max-width: 767px) {
        display: block
      }

      &:nth-child(even) {
        td {
          background-color: $color-white-smoke;
        }
      }

    }

    td {
      @media (max-width: 767px) {
        display: block;
        text-align: left;
        padding: 10px 20px;
        &:before {
          content: attr(data-th) ': ';
          font-weight: 700;
        }
      }

      &:first-child {
        @media (max-width: 767px) {
          padding: 20px 20px 10px 20px;
        }
      }

      &:last-child {
        @media (max-width: 767px) {
          padding: 10px 20px 20px 20px;
        }
      }
    }

  }

  tfoot {

    tr {
      @media (max-width: 767px) {
        display: block
      }

      &:last-child {
        td:last-child {
         padding-bottom: 20px
        }
      }

    }

    td {
      @media (max-width: 767px) {
        display: block
      }

      &:first-child {
        @media (max-width: 767px) {
          font-weight: 700;
          padding: 20px 20px 5px 20px;
        }
      }

      &:last-child {
        @media (max-width: 767px) {
          padding: 5px 20px 0 20px;
        }
      }

    }

  }

  i {
    vertical-align: middle;
  }

}

a {
  &:after {
    content: "";
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: $color-tertiary;
  }

  &:hover {
    &:after {
      opacity: 0;
    }
  }
}

address {
  font-style: normal;
}

</style>

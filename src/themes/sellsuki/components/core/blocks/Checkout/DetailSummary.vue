<template>
  <div>
    <div class="personal-details details pt20 pb15">
      <p class="section-header">PERSONAL DETAILS</p>
      <div class="row pt15">
        <div class="col-xs-6 sub-title-section">
          <p>First Name</p>
          <p>Last Name</p>
          <p>E-mail Address</p>
        </div>
        <div class="col-xs-6">
          <p>{{ personalDetails.firstName }}</p>
          <p>{{ personalDetails.lastName }}</p>
          <p>{{ personalDetails.emailAddress }}</p>
        </div>
      </div>
    </div>
    <div class="shipping-details details pt20 pb15">
      <p class="section-header">SHIPPING</p>
      <p class="details-title mt15">SHIPPING ADDRESS</p>
      <div class="row pt15">
        <div class="col-xs-6 sub-title-section">
          <p>First Name</p>
          <p>Last Name</p>
          <p>Street Name</p>
          <p>House Number</p>
          <p>City</p>
          <p>State / Province</p>
          <p>ZIP-Code</p>
          <p>Country</p>
          <p>Phone Number</p>
        </div>
        <div class="col-xs-6">
          <p>{{ shipping.firstName }}</p>
          <p>{{ shipping.lastName }}</p>
          <p>{{ shipping.streetAddress }}</p>
          <p>{{ shipping.apartmentNumber }}</p>
          <p>{{ shipping.city }}</p>
          <p>{{ shipping.state }}</p>
          <p>{{ shipping.zipCode }}</p>
          <p>{{ shipping.country }}</p>
          <p>{{ shipping.phoneNumber }}</p>
        </div>
      </div>
      <p class="details-title mt10">SHIPPING METHOD</p>
      <p v-if="shipping.shippingMethod === 'flatrate'" class="single-detail pt15">DPD Courier</p>
    </div>
    <div class="payment-details details pt20 pb15">
      <p class="section-header">PAYMENT</p>
      <p class="details-title mt15">PAYMENT ADDRESS</p>
      <p
        v-if="shipping.apartmentNumber === payment.apartmentNumber"
        class="single-detail pt15"
      >
        Address is the same as shipping
      </p>
      <div v-else class="row pt15">
        <div class="col-xs-6 sub-title-section">
          <p>First Name</p>
          <p>Last Name</p>
          <p>Street Name</p>
          <p>House Number</p>
          <p>City</p>
          <p>State / Province</p>
          <p>ZIP-Code</p>
          <p>Country</p>
          <p>Phone Number</p>
        </div>
        <div class="col-xs-6">
          <p>{{ payment.firstName }}</p>
          <p>{{ payment.lastName }}</p>
          <p>{{ payment.streetAddress }}</p>
          <p>{{ payment.apartmentNumber }}</p>
          <p>{{ payment.city }}</p>
          <p>{{ payment.state }}</p>
          <p>{{ payment.zipCode }}</p>
          <p>{{ payment.country }}</p>
          <p>{{ payment.phoneNumber }}</p>
        </div>
      </div>
      <p class="details-title mt10">PAYMENT METHOD</p>
      <p v-if="payment.paymentMethod === 'checkmo'" class="single-detail pt15">Check / Money Order</p>
      <p v-if="payment.paymentMethod === 'cashondelivery'" class="single-detail pt15">Cash on delivery</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    personalDetails: {
      type: Object,
      required: true,
      default: null
    },
    shipping: {
      type: Object,
      required: true,
      default: null
    },
    payment: {
      type: Object,
      required: true,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
  .section-header {
    font-weight: bold;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: 0.1em;
  }

  .details {
    border-bottom: 0.5px solid rgba(0, 0, 0, 0.25);
  }

  .details-title {
    /* background style */
    height: 35px;
    background: #EEEEEE;
    display: flex;
    justify-content: center;
    align-items: center;

    /* font style */
    font-weight: 600;
    font-size: 14px;
    line-height: 19px;
    letter-spacing: 0.1em;
  }

  .col-xs-6 p, .single-detail {
    padding-bottom: 5px;
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;
  }

  .single-detail {
    text-align: center;
  }

  .sub-title-section {
    p {
      text-align: right;
      color: #C5C5C5;
    }
  }
</style>

import { CATALOG_SET_PRODUCT_ORIGINAL } from './../../catalog/store/product/mutation-types';
/**
 * Component responsible for displaying single user order. Requires User module.
 */
export const UserSingleOrder = {
  name: 'UserSingleOrder',
  computed: {
    ordersHistory () {
      return this.$store.state.user.orders_history.items
    },
    order () {
      return this.ordersHistory.find(order => {
        return parseInt(order.entity_id) === parseInt(this.$route.params.orderId)
      }, (this))
    },
    paymentMethod () {
      return this.order.payment.additional_information[0]
    },
    billingAddress () {
      return this.order.billing_address
    },
    shippingAddress () {
      return this.order.extension_attributes.shipping_assignments[0].shipping.address
    },
    orderHistoryImages () {
      return this.$store.state.product.order_history_images
    },
  },
  methods: {
    remakeOrder (items) {
      items.forEach(item => {
        this.$store.dispatch('product/single', { options: { sku: item.sku }, setCurrentProduct: false, selectDefaultVariant: false }).then((product) => {
          product.qty = item.qty_ordered
          this.$store.dispatch('cart/addItem', { productToAdd: product }).then(() => { })
        })
      })
    },
    skipGrouped (items) {
      return items.filter((item) => {
        return !item.parent_item_id
      })
    },
    fetchProductImage() {
      this.$store.state.product.order_history_images = []
      this.order.items.forEach( async (item) => {
        let parentSku = ( item.sku.indexOf('-') >= 0)? item.sku.substr(0, item.sku.indexOf('-')) : item.sku
        await this.$store.dispatch('product/fetchAsync', { parentSku: parentSku, childSku: item.sku})
        this.$store.state.product.order_history_images.push(this.$store.state.product)
      })
    }
  }
}

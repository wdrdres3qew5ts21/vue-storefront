<template>
  <div>
    <div v-for="item in items" :key="item.item_id" class="product row between-xs">
      <!-- <img class="blend" v-lazy="thumbnail"> -->
      <div class="product-container col-xs-12 col-md-9 pb15">
        <img
          v-for="image in images"
          :key="image.current.sku"
          v-if="image.current.sku === item.sku"
          class="product-img"
          :src="image.productGallery[0].src" alt="">
        <div class="product-details mb15">
          <div class="product-name">{{ item.name }}</div>
          <div class="product-sku pb20">{{ item.sku }}</div>
          <div class="pt5">
            <div class="flex options-container">
              <p class="product-options">{{ getOptions(item.sku) }}</p>
              <p class="product-qty">QTY {{ item.qty }}</p>
              <p class="price">{{ item.price }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    images: {
      type: Array,
      required: true
    }
  },
  methods: {
    getOptions (sku) {
      return sku.substr(sku.indexOf('-') + 1)
    }
  }
}
</script>

<style scoped>
.product {
  margin: 0 -28px;
}

.product-container {
  display: flex;
  padding: 0;
}

.product-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 15px;
  padding-right: 15px;
  width: calc(100vw - 163px);
}

.product-img {
  width: 133px;
}

.product-name {
  width: calc(100% - 10px);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: bold;
  font-size: 15px;
  line-height: 20px;
  color: #404040;
  text-transform: uppercase;
}

.product-sku {
  text-transform: uppercase;
  font-size: 12px;
  line-height: 16px;
  color: #C5C5C5;
}

.options-container {
  justify-content: space-between;
}

.product-options, .product-qty, .price {
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  color: #404040;
}

.price-original {
  text-decoration: line-through;
}
.blend {
  mix-blend-mode: multiply;
}
</style>

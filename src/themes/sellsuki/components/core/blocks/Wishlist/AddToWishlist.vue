<template>
  <div>
    <button @click="isOnWishlist ? removeFromWishlist(product) : addToWishlist(product); changeColor()" class="p0 inline-flex middle-xs bg-cl-transparent brdr-none action pointer" type="button" data-testid="addToWishlist">
      <i class="material-icons" :style="{ color: iconColor }">{{ favoriteIcon }}</i>
    </button>
    <p v-if="!isOnWishlist">
      Add to Wish List
    </p>
    <p v-else>
      Added!
    </p>
  </div>
</template>

<script>
import { IsOnWishlist } from '@vue-storefront/core/modules/wishlist/components/IsOnWishlist'
import { AddToWishlist } from '@vue-storefront/core/modules/wishlist/components/AddToWishlist'
import { RemoveFromWishlist } from '@vue-storefront/core/modules/wishlist/components/RemoveFromWishlist'

export default {
  mixins: [ IsOnWishlist, AddToWishlist, RemoveFromWishlist ],
  computed: {
    favoriteIcon () {
      return this.isOnWishlist ? 'favorite' : 'favorite_border'
    }
  },
  data () {
    return {
      iconColor: '#404040'
    }
  },
  methods: {
    changeColor () {
      if (this.favoriteIcon === 'favorite') {
        this.iconColor = '#A71538'
      } else {
        this.iconColor = '#404040'
      }
    }
  },
  mounted () {
    this.changeColor()
  },
  watch: {
    favoriteIcon: function () {
      this.changeColor()
    }
  }
}
</script>

<style lang="scss" scoped>
div {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.material-icons {
  color: #404040;
}

p {
  font-weight: normal;
  font-size: 10px;
  line-height: 14px;
  color: #404040;
}
</style>

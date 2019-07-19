<template>
  <div id="product" itemscope itemtype="http://schema.org/Product">
    <section class="bg-cl-secondary px20 product-top-section">
      <div class="container p0">
        <section class="row product-section m0 between-xs">
          <div class="col-xs-12 col-md-6 center-xs middle-xs image p0">
            <product-gallery
              :gallery="gallery"
              :configuration="configuration"
              :product="product"
            />
          </div>
          <div class="data">
            <breadcrumbs
              class="pt40 pb20 hidden-xs"
              :routes="breadcrumbs.routes"
              :active-route="breadcrumbs.name"
            />
            <p class="mt0 product-name" data-testid="productName" itemprop="name">
              {{ product.name | htmlDecode }}
              <web-share :title="product.name | htmlDecode" text="Check this product!" class="web-share"/>
            </p>
            <div class="mb20 uppercase product-sku">
              {{ product.sku }}
            </div>
            <div itemprop="offers" itemscope itemtype="http://schema.org/Offer">
              <meta itemprop="priceCurrency" :content="currentStore.i18n.currencyCode">
              <meta itemprop="price" :content="parseFloat(product.priceInclTax).toFixed(2)">
              <div
                class="price"
                v-if="product.type_id !== 'grouped'"
              >
                <div
                  class="price cl-secondary"
                  v-if="product.special_price && product.priceInclTax && product.originalPriceInclTax"
                >
                  <span class="price">
                    {{ product.priceInclTax * product.qty | price }}
                  </span>&nbsp;
                  <span class="price">
                    {{ product.originalPriceInclTax * product.qty | price }}
                  </span>
                </div>
                <div
                  class="price"
                  v-if="!product.special_price && product.priceInclTax"
                >
                  {{ product.qty > 0 ? product.priceInclTax * product.qty : product.priceInclTax | price }}
                </div>
              </div>
              <div
                class="cl-primary variants"
                v-if="product.type_id =='configurable' && !loading"
              >
                <div class="error" v-if="product.errors && Object.keys(product.errors).length > 0">
                  {{ product.errors | formatProductMessages }}
                </div>
                <div
                  class="h5"
                  v-for="(option, index) in product.configurable_options"
                  v-if="(!product.errors || Object.keys(product.errors).length === 0) && Object.keys(configuration).length > 0"
                  :key="index"
                >
                  <div class="variants-label" data-testid="variantsLabel">
                    {{ option.label }}
                    <span class="weight-700">
                      {{ configuration[option.attribute_code ? option.attribute_code : option.label.toLowerCase()].label }}
                    </span>
                  </div>
                  <div class="row top-xs m0 pt15 pb40 variants-wrapper">
                    <div v-if="option.label == 'Color'">
                      <div class="option" @click="showFilter('color')">
                        <p class="option-title">{{ option.label }}</p>
                        <div class="expand-btn" v-if="expandView('color')">
                          <p class="expand-txt">
                            - VIEW LESS
                          </p>
                        </div>
                        <div class="expand-btn" v-else>
                          <p class="expand-txt">
                            + VIEW MORE
                          </p>
                        </div>
                      </div>
                      <color-selector
                        v-for="(c, i) in options[option.attribute_code]"
                        v-show="showColor"
                        :key="i"
                        :id="c.id"
                        :label="c.label"
                        context="product"
                        :code="option.attribute_code"
                        :class="{ active: c.id == configuration[option.attribute_code].id }"
                      />
                    </div>
                    <div class="sizes" v-else-if="option.label == 'Size'">
                      <div class="option" @click="showFilter('size')">
                        <p class="option-title">{{ option.label }}</p>
                        <div class="expand-btn" v-if="expandView('size')">
                          <p class="expand-txt">
                            - VIEW LESS
                          </p>
                        </div>
                        <div class="expand-btn" v-else>
                          <p class="expand-txt">
                            + VIEW MORE
                          </p>
                        </div>
                      </div>
                      <size-selector
                        v-for="(s, i) in options[option.attribute_code]"
                        v-show="showSize"
                        :key="i"
                        :id="s.id"
                        :label="s.label"
                        context="product"
                        :code="option.attribute_code"
                        class="mr10 mb10"
                        :class="{ active: s.id == configuration[option.attribute_code].id }"
                        v-focus-clean
                      />
                    </div>
                    <div :class="option.attribute_code" v-else>
                      <generic-selector
                        v-for="(s, i) in options[option.attribute_code]"
                        :key="i"
                        :id="s.id"
                        :label="s.label"
                        context="product"
                        :code="option.attribute_code"
                        class="mr10 mb10"
                        :class="{ active: s.id == configuration[option.attribute_code].id }"
                        v-focus-clean
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <product-links
              v-if="product.type_id =='grouped' && !loading"
              :products="product.product_links"
            />
            <product-bundle-options
              v-if="product.bundle_options && product.bundle_options.length > 0 && !loading"
              :product="product"
            />
            <product-custom-options
              v-else-if="product.custom_options && product.custom_options.length > 0 && !loading"
              :product="product"
            />
            <div class="row m0">
              <add-to-cart
                :product="product"
                :disabled="$v.product.qty.$error && !$v.product.qty.minValue"
                class="col-xs-12 col-sm-4 col-md-6"
              />
            </div>
            <div class="row p0 m0 add-to-buttons">
              <div class="col-xs-6 col-sm-3 col-md-6 product__add-to-compare">
                <button
                  @click="isOnCompare ? removeFromList('compare') : addToList('compare')"
                  class="
                    p0 inline-flex middle-xs bg-cl-transparent brdr-none
                    action h5 pointer cl-secondary
                  "
                  type="button"
                  data-testid="addToCompare"
                >
                  <i class="pr5 material-icons">compare</i>
                  <template v-if="!isOnCompare">
                    {{ $t('Add to compare') }}
                  </template>
                  <template v-else>
                    {{ $t('Remove from compare') }}
                  </template>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
    <section class="container px15 pt50 pb35 cl-accent details">
      <h2 class="m0 mb10 lh20 details-title">
        {{ $t('Product details') }}
      </h2>
      <div
        class="h4 details-wrapper"
        :class="{'details-wrapper--open': detailsOpen}"
      >
        <div class="row between-md m0">
          <div class="col-xs-12 col-sm-6 details-description">
            <div
              class="description lh30 h5"
              itemprop="description"
              v-html="product.description"
            />
          </div>
          <div class="col-xs-12 col-sm-5">
            <ul class="attributes p0 pt5 m0">
              <product-attribute
                :key="attr.attribute_code"
                v-for="attr in customAttributes"
                :product="product"
                :attribute="attr"
                empty-placeholder="N/A"
              />
            </ul>
          </div>
        </div>
      </div>
    </section>
    <related-products
      type="upsell"
      heading="MATCH WITH"
    />
    <promoted-offers single-banner />
    <related-products type="related" />
  </div>
</template>

<script>
import { minValue } from 'vuelidate/lib/validators'
import Product from '@vue-storefront/core/pages/Product'
import VueOfflineMixin from 'vue-offline/mixin'
import RelatedProducts from 'theme/components/core/blocks/Product/Related.vue'
import AddToCart from 'theme/components/core/AddToCart.vue'
import GenericSelector from 'theme/components/core/GenericSelector'
import ColorSelector from 'theme/components/core/ColorSelector.vue'
import SizeSelector from 'theme/components/core/SizeSelector.vue'
import Breadcrumbs from 'theme/components/core/Breadcrumbs.vue'
import ProductAttribute from 'theme/components/core/ProductAttribute.vue'
import ProductTile from 'theme/components/core/ProductTile.vue'
import ProductLinks from 'theme/components/core/ProductLinks.vue'
import ProductCustomOptions from 'theme/components/core/ProductCustomOptions.vue'
import ProductBundleOptions from 'theme/components/core/ProductBundleOptions.vue'
import ProductGallery from 'theme/components/core/ProductGallery'
import focusClean from 'theme/components/theme/directives/focusClean'
import WebShare from '@vue-storefront/core/modules/social-share/components/WebShare'
import BaseInputNumber from 'theme/components/core/blocks/Form/BaseInputNumber'

export default {
  components: {
    AddToCart,
    Breadcrumbs,
    ColorSelector,
    GenericSelector,
    ProductAttribute,
    ProductBundleOptions,
    ProductCustomOptions,
    ProductGallery,
    ProductLinks,
    ProductTile,
    RelatedProducts,
    SizeSelector,
    WebShare,
    BaseInputNumber
  },
  mixins: [Product, VueOfflineMixin],
  data () {
    return {
      detailsOpen: false,
      showSize: false,
      showColor: false
    }
  },
  directives: { focusClean },
  methods: {
    showDetails (event) {
      this.detailsOpen = true
      event.target.classList.add('hidden')
    },
    notifyOutStock () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'error',
        message: this.$t('The product is out of stock and cannot be added to the cart!'),
        action1: { label: this.$t('OK') }
      })
    },
    notifyWrongAttributes () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'warning',
        message: this.$t('No such configuration for the product. Please do choose another combination of attributes.'),
        action1: { label: this.$t('OK') }
      })
    },
    showFilter (filterIndex) {
      if (filterIndex === 'color') {
        this.showColor = !this.showColor
      } else if (filterIndex === 'size') {
        this.showSize = !this.showSize
      }
    },
    expandView (filterIndex) {
      if (filterIndex === 'color') {
        return this.showColor
      } else if (filterIndex === 'size') {
        return this.showSize
      }
      return false
    }
  },
  validations: {
    product: {
      qty: {
        minValue: minValue(1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-primary: color(primary);
$color-tertiary: color(tertiary);
$color-secondary: color(secondary);
$color-white: color(white);
$bg-secondary: color(secondary, $colors-background);

.product {
  &__add-to-compare {
    display: none;
    @media (min-width: 767px) {
      display: block;
    }
  }
}

.product-section {
  justify-content: center;
}

.option {
  display: flex;
  justify-content: space-between;

  .option-title {
    font-weight: bold;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #404040;
  }

  .expand-txt {
    font-size: 12px;
    font-weight: normal;
    line-height: 16px;
    letter-spacing: 0.1em;
  }
}

.breadcrumbs {
  @media (max-width: 767px) {
    margin: 15px 0;
    padding: 15px 0 0 15px;
  }
}

.error {
  color: red;
  font-weight: bold;
  padding-bottom: 15px;
}
.data {
  width: 100%;
  padding: 0;
  margin: 0 7%;

  @media (max-width: 767px) {
    border-bottom: 1px solid $bg-secondary;
  }
}

.product-name {
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #404040;

  @media (max-width: 767px) {
    margin-bottom: 8px;
    font-size: 16px;
    line-height: 22px;
  }
}

.product-sku {
  font-weight: normal;
  color: #C5C5C5;

  @media (max-width: 767px) {
    font-size: 14px;
    line-height: 19px;
  }
}

.price {
  @media (max-width: 767px) {
    font-weight: bold;
    font-size: 18px;
    line-height: 25px;
    color: #404040;
    margin-bottom: 15px;
  }
}

.variants-label {
  @media (max-width: 767px) {
    font-size: 14px;
  }
}

.variants-wrapper {
  @media (max-width: 767px) {
    padding-bottom: 30px;
  }

 .sizes {
    @media (max-width: 767px) {
      width: 100%;
    }
  }

  .size-guide {
    height: 40px;
    @media (max-width: 767px) {
      width: 100%;
      margin-left: 0;
    }
  }
}

.product-top-section {
  @media (max-width: 767px) {
    padding: 0;
    background-color: $color-white;
  }
}

.add-to-buttons {
  @media (max-width: 767px) {
    padding-top: 30px;
    /* margin-bottom: 40px;  */
  }
}

.details {
  @media (max-width: 767px) {
    margin: 6% 7%;
    padding: 0;
  }
}

.details-title {
  padding: 0 8px;

  @media (max-width: 767px) {
    padding: 0;
    font-weight: 800;
    font-size: 14px;
    line-height: 19px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #404040;
    margin: 0;
  }
}

.details-description {
  padding: 3% 0 0 0;

  .description {
    /deep/ p {
      font-weight: normal;
      font-size: 14px;
      line-height: 19px;
      color: #404040;
    }
  }
}

.details-wrapper {
  @media (max-width: 767px) {
    position: relative;
    max-height: 140px;
    overflow: hidden;
    transition: all 0.3s ease;
    font-size: 14px;
  }

  &--open {
    max-height: none;
  }
}

.details-overlay {
  @media (max-width: 767px) {
    position: absolute;
    height: 75%;
    bottom: 0;
    left: 0;
    width: 100%;
    margin: 0;
    cursor: pointer;
    background: linear-gradient(rgba($color-white, 0), rgba($color-white, 1));
    &.hidden {
      display: none;
    }
  }
}

.price-original {
  text-decoration: line-through;
}

.action {
  &:hover {
    color: $color-tertiary;
  }
}

.attributes {
  list-style-type: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.product-image {
  mix-blend-mode: multiply;
  width: 460px;
}

.web-share {
  float: right;
}
</style>

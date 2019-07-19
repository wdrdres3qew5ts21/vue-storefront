<template>
  <div id="category">
    <header class="category-header row">
      <div class="col-xs-6">
        <breadcrumbs class="breadcrumbs" :routes="breadcrumbs.routes" :active-route="category.name" />
        <p class="category-title"> {{ category.name }} </p>
        <div class="sorting align-right"><sort-by /></div>
        <p class="total">{{ productsTotal }} {{ $t('items') }}</p>
      </div>
      <div class="col-xs-6 filter-section">
        <button
          class="mobile-filters-button bg-cl-th-accent brdr-none cl-white sans-serif"
          @click="openFilters"
        >
          <font-awesome-icon class="plus" icon="plus" size="md" style="color: #EEEEEE;"/>
          {{ $t('Filters') }}
        </button>
        <div class="mobile-sorting mt10"><sort-by /></div>
      </div>
    </header>
    <div class="container p0">
      <div class="row m0 pt15">
        <div class="col-md-3 start-xs category-filters">
          <sidebar :filters="filters.available"/>
        </div>
        <div class="col-md-3 start-xs mobile-filters" v-show="mobileFilters">
          <div class="close-container absolute w-100">
            <font-awesome-icon class="p15" icon="times" size="lg" style="color: #C5C5C5;" @click="closeFilters"/>
          </div>
          <sidebar class="mobile-filters-body" :filters="filters.available"/>
        </div>
        <div class="col-md-9 p0 border-box products-list">
          <div v-if="isCategoryEmpty" class="hidden-xs">
            <h4 data-testid="noProductsInfo">{{ $t('No products found!') }}</h4>
            <p>{{ $t('Please change Your search criteria and try again. If still not finding anything relevant, please visit the Home page and try out some of our bestsellers!') }}</p>
          </div>
          <product-listing columns="2" :products="products" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Category from '@vue-storefront/core/pages/Category'
import Sidebar from '../components/core/blocks/Category/Sidebar.vue'
import ProductListing from '../components/core/ProductListing.vue'
import Breadcrumbs from '../components/core/Breadcrumbs.vue'
import SortBy from '../components/core/SortBy.vue'
import { mapGetters, mapActions } from 'vuex'
// import builder from 'bodybuilder'

export default {
  components: {
    ProductListing,
    Breadcrumbs,
    Sidebar,
    SortBy
  },
  data () {
    return {
      mobileFilters: false
    }
  },
  computed: {
    ...mapGetters({
      currentCategory: 'category/getCategoryImage'
    })
  },
  asyncData ({ store, route }) { // this is for SSR purposes to prefetch data - and it's always executed before parent component methods
    return new Promise((resolve, reject) => {
      store.dispatch('category/mergeSearchOptions', { // this is just an example how can you modify the search criteria in child components
        sort: 'updated_at:desc'
        // searchProductQuery: builder().query('range', 'price', { 'gt': 0 }).andFilter('range', 'visibility', { 'gte': 2, 'lte': 4 }) // this is an example on how to modify the ES query, please take a look at the @vue-storefront/core/helpers for refernce on how to build valid query
      })
      resolve()
    })
  },
  mounted () {
    this.searchCategoryImage(this.category.name)
  },
  methods: {
    ...mapActions({
      searchCategoryImage: 'category/searchCategoryImage'
    }),
    openFilters () {
      this.mobileFilters = true
    },
    closeFilters () {
      this.mobileFilters = false
    },
    notify () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'error',
        message: this.$t('Please select the field which You like to sort by'),
        action1: { label: this.$t('OK') }
      })
    }
  },
  mixins: [Category]
}
</script>

<style lang="scss" scoped>
  * {
    font-family: 'Nunito Sans';
  }

  .category-header {
    margin: 0 7%;
    padding: 5% 0;
    border-bottom: 0.5px solid rgba(0, 0, 0, 0.25);
  }

  .plus {
    padding-right: 8px;
  }

  .breadcrumbs {
    margin: 5% 0 3% 0;
  }

  .filter-section {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .category-filters {
    width: 242px;
  }

  .mobile-filters {
    background: white;
    display: none;
    overflow: auto;
  }

  .mobile-filters-button {
    display: flex;
    justify-content: center;
    width: 148px;
    height: 40px;
    font-weight: 600;
    font-size: 14px;
    line-height: 15px;
    text-align: center;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: #EEEEEE;
  }

  .mobile-sorting {
    display: none;
  }

  .category-title {
    font-weight: 800;
    font-size: 25px;
    line-height: 34px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #404040;
  }

  .total {
    margin: 3% 0 0 0;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #404040;
  }

  @media (max-width: 64em) {
    .products-list {
      max-width: 530px;
    }
  }

  @media (max-width: 770px) {
    .products-list {
      width: 100%;
      max-width: none;
    }

    .mobile-filters {
      display: block;
    }

    .sorting {
      display: none;
    }

    .mobile-sorting {
      display: block;
    }

    .category-filters {
      display: none;
    }

    .product-listing {
      justify-content: space-between;;
    }

    .mobile-filters {
      position: fixed;
      z-index: 5;
      padding: 0 40px;
      left: 0;
      width: 100vw;
      height: 100vh;
      top: 0;
      box-sizing: border-box;
    }

    .mobile-filters-body {
      padding-top: 50px;
    }
  }

  .close-container {
    display: flex;
    justify-content: flex-end;
    left: 0;
  }

  .close {
    margin-left: auto;
  }
</style>

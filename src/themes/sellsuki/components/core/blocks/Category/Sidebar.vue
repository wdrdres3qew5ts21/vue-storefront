<template>
  <div class="sidebar">
    <div class="sidebar__header">
      <p class="filter-heading"> {{ $t('Filter') }} </p>
    </div>
    <p class="amount" v-if="numberOfActiveFilters() === 0">NO FILTER SELECTED</p>
    <p class="amount" v-else>{{ numberOfActiveFilters() }} FILTER SELECTED</p>
    <hr>
    <div
      class="filter-list"
      v-for="(filter, filterIndex) in availableFilters"
      :key="filterIndex"
    >
      <div class="row filter-title" @click="showFilter(filterIndex)">
        <p class="filter-name">
          {{ $t(filterIndex + '_filter') }}
        </p>
        <div class="expand-btn" v-if="expandView(filterIndex)">
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
      <div class="row">
        <div class="filter" v-show="filterIndex==='color' && showColor">
          <color-selector
            context="category"
            code="color"
            v-for="(color, index) in filter"
            :key="index"
            :id="color.id"
            :label="color.label"
          />
        </div>
        <div class="filter" v-show="filterIndex==='size' && showSize">
          <size-selector
            context="category"
            code="size"
            class="size-select"
            v-for="(size, index) in sortById(filter)"
            :key="index"
            :id="size.id"
            :label="size.label"
          />
        </div>
        <div class="filter" v-show="filterIndex==='price' && showPrice">
          <price-selector
            context="category"
            class="price-select mb10 block"
            code="price"
            v-for="(price, index) in filter"
            :key="index"
            :id="price.id"
            :from="price.from"
            :to="price.to"
            :content="price.label"
          />
        </div>
        <div class="filter sidebar__inline-selecors" v-show="showGeneric">
          <generic-selector
            context="category"
            class="mr10 mb10 block"
            :code="filterIndex"
            v-for="(option, index) in filter"
            :key="index"
            :id="option.id"
            :label="option.label"
          />
        </div>
      </div>
    </div>
    <!-- add the custom controls to other available filters set in config.products.defaultFilters; must be numeric field in ES
    <div v-if="filters.erin_recommends && filters.erin_recommends.length">
      <h5>
        {{ $t('Erin recommends') }}
      </h5>
      <div
        class="size-select mr10 mb10"
        v-for="(er, index) in filters.erin_recommends"
        :key="index"
        :id="er.id"
        :label="er.label"
      >{{ er.label }}</div>
    </div>
    -->
  </div>
</template>

<script>
import Sidebar from '@vue-storefront/core/compatibility/components/blocks/Category/Sidebar'

import ColorSelector from 'theme/components/core/ColorSelector'
import SizeSelector from 'theme/components/core/SizeSelector'
import PriceSelector from 'theme/components/core/PriceSelector'
import GenericSelector from 'theme/components/core/GenericSelector'

export default {
  components: {
    ColorSelector,
    SizeSelector,
    PriceSelector,
    GenericSelector
  },
  mixins: [Sidebar],
  data () {
    return {
      showSize: false,
      showColor: false,
      showPrice: false,
      showGeneric: false
    }
  },
  methods: {
    numberOfActiveFilters () {
      return Object.keys(this.activeFilters).length
    },
    showFilter (filterIndex) {
      if (filterIndex === 'color') {
        this.showColor = !this.showColor
      } else if (filterIndex === 'size') {
        this.showSize = !this.showSize
      } else if (filterIndex === 'price') {
        this.showPrice = !this.showPrice
      } else {
        this.showGeneric = !this.showGeneric
      }
    },
    expandView (filterIndex) {
      if (filterIndex === 'color') {
        return this.showColor
      } else if (filterIndex === 'size') {
        return this.showSize
      } else if (filterIndex === 'price') {
        return this.showPrice
      } else {
        return this.showGeneric
      }
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  font-family: 'Nunito Sans';
  color: #404040;
}

.filter-heading {
  text-transform: uppercase;
  font-weight: 800;
  font-size: 25px;
  line-height: 34px;
  letter-spacing: 0.1em;
}

.filter-title {
  align-items: center;
  justify-content: space-between;
}

.expand-txt {
  font-size: 12px;
  font-weight: normal;
  line-height: 16px;
  letter-spacing: 0.1em;
}

.filter-name {
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #404040;
}

.amount {
  font-size: 14px;
  font-weight: normal;
  line-height: 19px;
  letter-spacing: 0.1em;
  margin: 3% 0;
}

hr {
  opacity: 0.4;
  margin-bottom: 0;
}

.sidebar {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 47px;
  }

  &__inline-selecors {
    display: flex;
  }
}

.filter-list {
  display: flex;
  flex-direction: column;
  padding: 4% 7%;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.25);
}

.filter {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>

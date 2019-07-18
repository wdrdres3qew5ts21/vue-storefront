<template>
  <div class="sidebar">
    <div class="sidebar__header">
      <p class="filter"> {{ $t('Filter') }} </p>
    </div>
    <p class="amount" v-if="numberOfActiveFilters() === 0">NO FILTER SELECTED</p>
    <p class="amount" v-else>{{ numberOfActiveFilters() }} FILTER SELECTED</p>
    <hr>
    <div
      v-for="(filter, filterIndex) in availableFilters"
      :key="filterIndex"
    >
      <h5>
        {{ $t(filterIndex + '_filter') }}
      </h5>

      <div v-if="filterIndex==='color'">
        <color-selector
          context="category"
          code="color"
          v-for="(color, index) in filter"
          :key="index"
          :id="color.id"
          :label="color.label"
        />
      </div>
      <div v-else-if="filterIndex==='size'">
        <size-selector
          context="category"
          code="size"
          class="size-select mr10 mb10"
          v-for="(size, index) in sortById(filter)"
          :key="index"
          :id="size.id"
          :label="size.label"
        />
      </div>
      <div v-else-if="filterIndex==='price'">
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
      <div v-else class="sidebar__inline-selecors">
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
  methods: {
    numberOfActiveFilters () {
      return Object.keys(this.activeFilters).length
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  font-family: 'Nunito Sans';
  color: #404040;
}

.filter {
  text-transform: uppercase;
  font-weight: 800;
  font-size: 25px;
  line-height: 34px;
  letter-spacing: 0.1em;
}

.amount {
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.1em;
  margin: 3% 0;
}

hr {
  opacity: 0.4;
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
</style>

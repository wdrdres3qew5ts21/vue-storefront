<template>
  <div class="breadcrumbs h5 cl-gray">
    <span v-for="link in routes" :key="link.route_link">
      <router-link :to="localizedRoute(link.route_link)">
        {{ link.name | htmlDecode }}
      </router-link> /
    </span>
  </div>
</template>

<script>
import Breadcrumbs from '@vue-storefront/core/compatibility/components/Breadcrumbs'

export default {
  mixins: [Breadcrumbs]
}
</script>

<style lang="scss" scoped>
* {
  text-transform: uppercase;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.1em;
  color: #C5C5C5;
}
</style>

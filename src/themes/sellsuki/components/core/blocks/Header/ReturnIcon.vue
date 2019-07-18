<template>
  <button type="button" class="inline-flex brdr-none" @click="goBack" data-testid="returnButton">
    <font-awesome-icon class="left" icon="arrow-left" size="lg"/>
  </button>
</template>

<script>
import ReturnIcon from '@vue-storefront/core/compatibility/components/blocks/Header/ReturnIcon'

export default {
  mixins: [ReturnIcon]
}
</script>

<style lang="scss" scoped>
button {
  background: white;
}
</style>

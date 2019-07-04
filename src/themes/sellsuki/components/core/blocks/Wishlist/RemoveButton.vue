<template>
  <button class="brdr-none bg-cl-transparent">
    <!-- <i class="material-icons h6">remove_shopping_cart</i> -->
    <font-awesome-icon icon="trash-alt" size="md" style="color: #404040;"/>
    {{ $t('Remove') }}
  </button>
</template>

<style lang="scss" scoped>
button {
  text-transform: uppercase;
  font-family: Nunito Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.1em;
  padding: 0;
}
</style>

<template>
  <button class="brdr-none bg-cl-transparent p0 middle-xs inline-flex cl-secondary">
    <font-awesome-icon class="icon" icon="trash-alt" size="md" style="color: #404040;"/>
    {{ $t('Remove') }}
  </button>
</template>

<style lang="scss" scoped>
button {
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.1em;
  padding: 0;
}

.icon {
  padding-right: 5px;
}
</style>

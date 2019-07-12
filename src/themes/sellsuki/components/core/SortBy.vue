<template>
  <div class="sort-by">
    <select
      name="sortby"
      class="cl-secondary"
      v-model="sortby"
      @change="changeOrder">
      <option selected="selected" disabled hidden value="">{{ $t('Sort By') }}</option>
      <option v-for="(option, label) in sortByAttribute" :disabled="sortby === option" :value="option" :key="option" >{{ $t(label) }}</option>
    </select>
  </div>
</template>

<script>
import SortBy from '@vue-storefront/core/compatibility/components/SortBy'
export default {
  mixins: [SortBy]
}
</script>
<style lang="scss" scoped>
    @import '~theme/css/base/text';
    .sort-by {
      display: inline-flex;
      height: 30px;
      position: relative;
      border-bottom: 3px solid #EEEEEE;
      select {
          @extend .h4;
          font-weight: 600;
          font-size: 14px;
          line-height: 19px;
          letter-spacing: 0.5px;
          color: #C5C5C5;
          border: none;
          width: 100%;
          border-radius: 0;
          background-color: transparent;
          margin-right: 0;
          &:focus {
              outline: none;
          }
      }
      &__icon {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
      }
    }
    @media (max-width: 770px) {
      .sort-by {
        width: 100%;
      }
    }
</style>

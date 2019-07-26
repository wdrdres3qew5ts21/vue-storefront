<template>
  <component
    :is="link ? 'router-link' : 'button'"
    :to="localizedRoute(link)"
    class="button-outline no-outline no-underline fs-medium py5"
    :class="{
      light : color === 'light', 'brdr-white' : color === 'light', 'cl-white' : color === 'light',
      dark : color === 'dark', 'brdr-darkgray' : color === 'dark', 'cl-secondary' : color === 'dark',
      px0 : link ? true : false,
      px40 : link ? false : true
    }"
  >
    <slot>
      Button
    </slot>
  </component>
</template>

<script>
import focusClean from 'theme/components/theme/directives/focusClean'

export default {
  name: 'ButtonOutline',
  directives: { focusClean },
  props: {
    color: {
      type: String,
      required: true
    },
    link: {
      type: String,
      default: null,
      required: false
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~theme/css/variables/colors';
  @import '~theme/css/helpers/functions/color';
  $dark-border: color(secondary);
  $white: color(white);
  $black: color(black);

  * {
    font-family: 'Nunito Sans';
  }

  .button-outline {
    width: 100%;
    border: 2px solid;
    background-color: transparent;
    font-weight: 800;
    font-size: 14px;
    line-height: 19px;
    text-align: center;
    letter-spacing: 0.25em;
  }
  .dark {
    border: 1px solid $dark-border;
    &:hover,
    &:focus {
      color: #EEEEEE;
      background: #404040;
      border-color: #404040;
    }
  }
  .light {
    &:hover,
    &:focus {
      color: #404040;
      background: #EEEEEE;
      border-color: #EEEEEE;
    }
  }
</style>

<template>
  <router-link :to="localizedRoute('/')" :title="$t('Home Page')" class="no-underline inline-flex">
    <p>
      Monolithe.
    </p>
  </router-link>
</template>

<script>
export default {
  props: {
    width: {
      type: [String, Number],
      required: true
    },
    height: {
      type: [String, Number],
      required: true
    }
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Playfair+Display&display=swap');

  p {
    margin: 0;

    font-family: Playfair Display;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 27px;

    color: #404040;
  }
</style>

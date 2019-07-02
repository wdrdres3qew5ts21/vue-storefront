<template>
  <div class="slideshow">
    <div class="slideshow__container js-slideshow">
      <img
        v-for="(slide, index) in slides.result[0].banners"
        :key="slide.id"
        :src="slide.image"
        :alt="slide.title"
        :class="{ active: isActive(index) }"
        @mouseover="stopRotation"
        @mouseout="startRotation"
        @click="changeRoute(slide.link)">
      <p class="title">NEW COLLECTIONS</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { Carousel, Slide } from 'vue-carousel'
import NoSSR from 'vue-no-ssr'
export default {
  name: 'PromotedOffers',
  components: {
    Carousel,
    Slide,
    'no-ssr': NoSSR
  },
  data () {
    return {
      current: 0,
      speed: 3000,
      timer: null
    }
  },
  props: {
    singleBanner: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    ...mapGetters({
      slides: 'promoted/getPromotedOffers'
    })
  },
  async created () {
    await this.updatePromotedOffers()
  },
  methods: {
    ...mapActions({
      updatePromotedOffers: 'promoted/updatePromotedOffers'
    }),
    startRotation: function () {
      this.timer = setInterval(this.next, this.speed)
    },
    stopRotation: function () {
      clearTimeout(this.timer)
      this.timer = null
    },
    next: function () {
      var current = this.current
      var next = current + 1

      if (next > this.slides.result[0].banners.length - 1) {
        next = 0
      }
      this.current = next
      this.setActive(this.current)
    },
    prev: function () {
      var current = this.current
      var prev = current - 1

      if (prev < 0) {
        prev = this.slides.result[0].banners.length - 1
      }

      this.current = prev
      this.setActive(this.current)
    },
    isActive: function (slide) {
      return this.current === slide
    },
    setActive: function (slide) {
      this.current = slide
    },
    changeRoute: function (link) {
      this.$router.replace({ path: link })
    }
  },
  mounted () {
    this.startRotation()
  }
}
</script>

<style lang="scss" scoped>
  @import url('https://fonts.googleapis.com/css?family=Nunito+Sans&display=swap');

  .title {
    text-transform: uppercase;
    font-family: 'Nunito Sans', sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 25px;
    line-height: 34px;
    letter-spacing: 0.1em;
    white-space: nowrap;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    color: #EEEEEE;
    transition: unset !important;
    position: absolute;
    top: 49%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: block;
    margin: 0;
  }

  /* Base styling ----- */
  body {
    display: block;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 0;
    width: 100%;
  }

  /* Slideshow styling ----- */
  .slideshow__container {
    overflow: hidden;
    position: relative;
    padding-top: 66.64%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  img {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 1s;
  }

  img:hover {
    cursor: pointer;
  }

  a {
    display: block;
  }

  .active {
    opacity: 1;
  }
</style>

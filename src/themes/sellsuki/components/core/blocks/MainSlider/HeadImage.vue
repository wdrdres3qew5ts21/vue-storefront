<template>
  <no-ssr>
    <div class="container">
      <carousel
        :per-page="1"
        :mouse-drag="true"
        :autoplay="true"
        :pagination-enabled="false"
        :loop="true"
        :autoplay-timeout="5000"
        :speed="1500"
        ref="carousel">
        <slide v-for="currentImage in allImages"
               :key="currentImage.title"
               ref="slide"
               class="slide">
          <a class="head-image w-100" href="">
            <img class="carousel-image" src="../../../../assets/banner.jpg" alt="">
            <div class="image-content">
              <p class="title" data-testid="mainSliderTitle">
                {{ currentImage.title }}
              </p>
              <p
                class="subtitle mb0"
                data-testid="mainSliderSubtitle"
              >
                {{ currentImage.subtitle }}
              </p>
            </div>
          </a>
        </slide>
      </carousel>
      <div class="blur">
        <img class="blur-image" src="../../../../assets/banner.jpg" alt="">
        <div class="image-content">
          <p class="blur-title">
            BLUR COLLECTION
          </p>
        </div>
      </div>
    </div>
  </no-ssr>
</template>

<script>
import { mapGetters } from 'vuex'
import { Carousel, Slide } from 'vue-carousel'
import NoSSR from 'vue-no-ssr'

export default {
  components: {
    Carousel,
    Slide,
    'no-ssr': NoSSR
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      allImages: 'promoted/getHeadImage'
    })
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Nunito+Sans&display=swap');

* {
  font-family: 'Nunito Sans', sans-serif;
  text-align: center;
  color: #EEEEEE;
}

.container {
  display: block;
  padding: 0;
}

.blur {
  position: relative;
  z-index: -1;
}

.carousel-image {
  width: 100%;
  padding: 0;
  display: block;
}

.blur-image {
  width: 100%;
  padding: 0;
  filter: blur(8px);
  transform: scale(1.1);
  z-index: -1;
}

.image-content {
  transition: unset !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.blur-title, .title {
  font-weight: 800;
  font-size: 30px;
  letter-spacing: 0.1em;
  line-height: 41px;
  white-space: nowrap;
  text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.75);
}

.subtitle{
  font-weight: 600;
  font-size: 15px;
  line-height: 20px;
}

a {
  text-decoration: none;
  display: block;

  &:hover {
    text-decoration: none;
  }
}

a.underline:after, a:not(.no-underline):hover:after {
  position: unset;
}
</style>

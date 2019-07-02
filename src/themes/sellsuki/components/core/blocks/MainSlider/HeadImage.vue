<template>
  <no-ssr>
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
          <div class="head-image-content">
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

.carousel-image {
  width: 100%;
  padding: 0;
  display: block;
}

.head-image-content {
  transition: unset !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.title {
  font-family: 'Nunito Sans', sans-serif;
  font-weight: 800;
  font-size: 30px;
  text-align: center;
  letter-spacing: 0.1em;
  line-height: 41px;
  white-space: nowrap;
  color: #EEEEEE;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.75);
}

.subtitle{
  font-family: 'Nunito Sans', sans-serif;
  text-align: center;
  font-weight: 600;
  font-size: 15px;
  line-height: 20px;
  color: #EEEEEE;
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

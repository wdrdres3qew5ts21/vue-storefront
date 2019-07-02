<template>
  <div class="newsletter py25 px15 bg-cl-secondary">
    <div class="container">
      <div class="newsletter-content m0 row middle-sm start-md">
        <div class="col-md-9 col-xs-12">
          <p class="subscribe">
            Subscribe to the newsletter and
          </p>
          <p class="receive">
            Receive a coupon for 10% off
          </p>
        </div>
        <div class="newsletter-button col-md-3 col-xs-12 end-md">
          <button-outline
            @click.native="showNewsletterPopup"
            color="dark"
            data-testid="openNewsletterButton"
            class="subscribe-button"
          >
            {{ $t('Subscribe') }}
          </button-outline>
          <hr>
        </div>
      </div>
    </div>
    <newsletter-popup v-if="loadNewsletterPopup"/>
  </div>
</template>

<script>
import ButtonOutline from 'theme/components/theme/ButtonOutline'
import { mapState } from 'vuex'
const NewsletterPopup = () => import(/* webpackChunkName: "vsf-newsletter-modal" */ 'theme/components/core/NewsletterPopup.vue')

export default {
  name: 'Newsletter',
  data () {
    return {
      loadNewsletterPopup: false
    }
  },
  computed: {
    ...mapState({
      isOpen: state => state.ui.newsletterPopup,
      isSubscribed: state => state.mailchimp.isSubscribed
    })
  },
  methods: {
    newsletterClick () {
      this.$store.commit('ui/setNewsletterPopup', !this.isOpen)
    },
    showNewsletterPopup () {
      this.loadNewsletterPopup = true
      this.$bus.$emit('modal-show', 'modal-newsletter')
    }
  },
  components: {
    ButtonOutline,
    NewsletterPopup
  }
}
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Nunito+Sans&display=swap');

  @media (max-width: 1023px) {
    .newsletter-button {
      padding-top: 25px;
      text-align: center;
    }
  }

  .newsletter {
    padding-bottom: 0;
  }

  p {
    font-family: Nunito Sans;
    font-style: normal;
    line-height: 19px;
    text-align: center;
    color: #404040;
  }

  .subscribe {
    font-weight: 100;
    font-size: 15px;
  }

  .receive {
    font-size: 16px;
    font-weight: 900;
  }

  .subscribe-button {
    font-family: Nunito Sans;
    font-style: normal;
    font-weight: 900;
    font-size: 14px;
    line-height: 19px;
    /* identical to box height */

    text-align: center;
    letter-spacing: 0.25em;
    text-transform: uppercase;

    /* box css */
    width: 281px;
    border: 1.5px solid #404040;
    box-sizing: border-box;
    border-radius: 0.5px;
    padding: 10px;

    color: #404040;
  }

  hr {
    margin-top: 5%;
  }

  .brdr-bottom-1 {
    border: none;
  }
</style>

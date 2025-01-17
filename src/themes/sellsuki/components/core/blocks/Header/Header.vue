<template>
  <div class="header">
    <header
      class="fixed w-100 brdr-bottom-1 bg-cl-primary brdr-cl-secondary"
      :class="{ 'is-visible': true }"
    >
      <div class="container px15">
        <div class="row between-xs middle-xs" v-if="!isCheckoutPage">
          <div class="col-md-4 col-xs-4 middle-xs">
            <div>
              <template v-if="!canGoBack">
                <hamburger-icon class="p15 icon bg-cl-secondary pointer" v-if="!canGoBack"/>
              </template>
              <template v-else>
                <return-icon class="p15 icon bg-cl-secondary pointer" v-if="canGoBack"/>
              </template>
            </div>
          </div>
          <div class="col-md-4 col-xs-4 center-xs pt5">
            <div>
              <logo width="auto" height="41px"/>
            </div>
          </div>
          <div class="col-xs-4 visible-xs">
            <div class="row">
              <div class="col-xs-6 end-xs">
                <search-icon class="p15 icon pointer" />
              </div>
              <div class="col-xs-6 start-xs">
                <microcart-icon class="p15 icon pointer" />
              </div>
            </div>
          </div>
        </div>
        <div class="row between-xs middle-xs px15 py5 checkout-header" v-if="isCheckoutPage">
          <div class="col-xs-4 col-md-3 middle-xs">
            <div>
              <router-link :to="localizedRoute('/')" class="cl-tertiary links">
                {{ $t('Return to shopping') }}
              </router-link>
            </div>
          </div>
          <div class="col-xs-4 col-md-6 center-xs">
            <logo width="auto" height="41px"/>
          </div>
        </div>
      </div>
    </header>
    <div class="header-placeholder"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CurrentPage from 'theme/mixins/currentPage'
import AccountIcon from 'theme/components/core/blocks/Header/AccountIcon'
import CompareIcon from 'theme/components/core/blocks/Header/CompareIcon'
import HamburgerIcon from 'theme/components/core/blocks/Header/HamburgerIcon'
import Logo from 'theme/components/core/Logo'
import MicrocartIcon from 'theme/components/core/blocks/Header/MicrocartIcon'
import ReturnIcon from 'theme/components/core/blocks/Header/ReturnIcon'
import SearchIcon from 'theme/components/core/blocks/Header/SearchIcon'
import WishlistIcon from 'theme/components/core/blocks/Header/WishlistIcon'

export default {
  name: 'Header',
  components: {
    AccountIcon,
    CompareIcon,
    HamburgerIcon,
    Logo,
    MicrocartIcon,
    ReturnIcon,
    SearchIcon,
    WishlistIcon
  },
  mixins: [CurrentPage],
  data () {
    return {
      navVisible: true,
      isScrolling: false,
      scrollTop: 0,
      lastScrollTop: 0,
      navbarHeight: 54
    }
  },
  computed: {
    ...mapState({
      isOpenLogin: state => state.ui.signUp,
      currentUser: state => state.user.current
    })
  },
  beforeMount () {
    window.addEventListener('scroll', () => {
      this.isScrolling = true
    }, {passive: true})

    setInterval(() => {
      if (this.isScrolling) {
        this.hasScrolled()
        this.isScrolling = false
      }
    }, 250)
  },
  methods: {
    gotoAccount () {
      this.$bus.$emit('modal-toggle', 'modal-signup')
    },
    hasScrolled () {
      this.scrollTop = window.scrollY
      if (this.scrollTop > this.lastScrollTop && this.scrollTop > this.navbarHeight) {
        this.navVisible = false
      } else {
        this.navVisible = true
      }
      this.lastScrollTop = this.scrollTop
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-icon-hover: color(secondary, $colors-background);

.header {
  margin-bottom: -54px;
  @media (max-width: 767px) {
    margin-bottom: 0;
  }

  header {
    height: 54px;
    top: 0;
    position: fixed;
    z-index: 3;
    background: none;
    border-bottom: 1px solid #EEEEEE;
    transition: top 0.2s ease-in-out;
    &.is-visible {
      top: 0;
    }
    @media (max-width: 767px) {
      background: white;
    }
  }
}

.icon {
  &:hover,
  &:focus {
    background-color: $color-icon-hover;
  }
}
.right-icons {
  //for edge
  float: right;
}
.header-placeholder {
  height: 54px;
}
.links {
  text-decoration: underline;
}
@media (max-width: 767px) {
  .row.middle-xs {
    margin: 0 -15px;

    &.py5 {
      margin: 0;
    }
  }
  .col-xs-2:first-of-type {
      padding-left: 0;
  }
  .col-xs-2:last-of-type {
      padding-right: 0;
  }
  a, span {
    font-size: 12px;
  }
}

.checkout-header {
  display: flex;
  justify-content: flex-start;
}
</style>

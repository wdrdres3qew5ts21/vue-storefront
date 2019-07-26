<template>
  <div class="sidebar-menu fixed mw-100 bg-cl-secondary">
    <div class="row outermost">
      <div class="col-xs bg-cl-primary" v-if="submenu.depth">
        <sub-btn type="back" class="bg-cl-transparent brdr-none" />
      </div>
      <div class="col-xs bg-cl-primary">
        <button
          type="button"
          :aria-label="$t('Close')"
          class="w-100 inline-flex end-xs bg-cl-transparent brdr-none p0 close-btn"
          @click="closeMenu"
        >
          <font-awesome-icon class="p15" icon="times" size="lg" style="color: #C5C5C5;"/>
        </button>
      </div>
    </div>
    <div class="row list-row">
      <div class="col-xs-12 h4 serif list-menu">
        <ul class="p0 m0 relative sidebar-menu__list" :style="mainListStyles">
          <li @click="closeMenu" class="brdr-bottom-1 brdr-cl-bg-secondary bg-cl-primary">
            <router-link
              class="block px25 py20 cl-accent no-underline"
              :to="localizedRoute('/')"
              exact
            >
              {{ $t('Home') }}
            </router-link>
          </li>
          <li @click="closeMenu" v-if="isCurrentMenuShowed" class="bg-cl-secondary">
            <router-link
              class="block px25 py20 brdr-bottom-1 brdr-cl-bg-secondary cl-accent no-underline fs-medium-small"
              :to="localizedRoute('/sale')"
              exact
            >
              SALES
            </router-link>
          </li>
          <li @click="closeMenu" v-if="isCurrentMenuShowed" class="bg-cl-secondary">
            <router-link
              class="block px25 py20 brdr-bottom-1 brdr-cl-bg-secondary cl-accent no-underline fs-medium-small"
              :to="localizedRoute('')"
              exact
            >
              NEW COLLECTION
            </router-link>
          </li>
          <li
            class="brdr-bottom-1 brdr-cl-bg-secondary bg-cl-primary flex"
            :key="category.slug"
            @click="closeMenu"
            v-for="category in visibleCategories"
          >
            <div v-if="isCurrentMenuShowed" class="subcategory-item">
              <sub-btn
                class="bg-cl-transparent brdr-none fs-medium"
                :id="category.id"
                :name="category.name"
                v-if="category.children_count > 0"
              />
              <router-link
                v-else
                class="px25 py20 cl-accent no-underline col-xs"
                :to="localizedRoute({ name: 'category', fullPath: category.url_path, params: { id: category.id, slug: category.slug }})"
              >
                {{ category.name }}
              </router-link>
            </div>

            <sub-category
              :category-links="category.children_data"
              :id="category.id"
              :parent-slug="category.slug"
              :parent-path="category.url_path"
            />
          </li>
          <li class="brdr-bottom-1 brdr-cl-secondary account-section flex">
            <div class="row account-tab">
              <div @click="login" class="col-xs-10 my-account">
                <font-awesome-icon class="account-icon" icon="user-circle" size="lg" style="color: #404040;"/>
                <sub-btn
                  v-if="currentUser"
                  :show-right-arrow="false"
                  :name="$t('My account')"
                  class="bg-cl-transparent brdr-none fs-medium-small"
                />
                <sub-category
                  v-if="currentUser"
                  :my-account-links="myAccountLinks"
                  :id="'foo'"
                  @click.native="closeMenu"
                />
                <a
                  v-if="!currentUser && isCurrentMenuShowed"
                  href="#"
                  @click.prevent="closeMenu"
                  class="account-text block w-100 py20 cl-accent no-underline fs-medium-small"
                >
                  {{ $t('My account') }}
                </a>
              </div>
              <div class="col-xs-2 wishlist">
                <wishlist-icon class="h-100 bg-cl-primary icon pointer" />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import i18n from '@vue-storefront/i18n'
import SidebarMenu from '@vue-storefront/core/compatibility/components/blocks/SidebarMenu/SidebarMenu'
import SubBtn from 'theme/components/core/blocks/SidebarMenu/SubBtn'
import SubCategory from 'theme/components/core/blocks/SidebarMenu/SubCategory'
import WishlistIcon from 'theme/components/core/blocks/Header/WishlistIcon'

export default {
  components: {
    SubCategory,
    SubBtn,
    WishlistIcon
  },
  mixins: [SidebarMenu],
  data () {
    return {
      myAccountLinks: [
        {
          id: 1,
          name: i18n.t('My profile'),
          url: '/my-account'
        },
        {
          id: 2,
          name: i18n.t('My orders'),
          url: '/my-account/orders'
        }
      ],
      componentLoaded: false
    }
  },
  computed: {
    mainListStyles () {
      return this.submenu.depth ? `transform: translateX(${this.submenu.depth * 100}%)` : false
    },
    ...mapState({
      submenu: state => state.ui.submenu,
      currentUser: state => state.user.current
    }),
    getSubmenu () {
      return this.submenu
    },
    visibleCategories () {
      return this.categories.filter(category => {
        return category.product_count > 0 || category.children_count > 0
      })
    },
    isCurrentMenuShowed () {
      return !this.getSubmenu || !this.getSubmenu.depth
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.componentLoaded = true
    })
  },
  methods: {
    login () {
      if (!this.currentUser && this.isCurrentMenuShowed) {
        this.$nextTick(() => {
          this.$bus.$emit('modal-show', 'modal-signup')
          this.$router.push({ name: 'my-account' })
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~theme/css/animations/transitions";
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$bg-secondary: color(secondary, $colors-background);
$color-gainsboro: color(gainsboro);
$color-matterhorn: color(matterhorn);
$color-mine-shaft: color(mine-shaft);

a, button {
  font-family: 'Nunito Sans';
  text-transform: uppercase;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  color: #404040;
}

.col-xs-10, .col-xs-2 {
  padding: 0;
}

.account-icon {
  padding-left: 10%;
}

.list-row, .list-items {
  height: 100%;
}

.pointer {
  padding-right: 4%;
}

.outermost {
  align-items: center;
  background: white;
}

.sidebar-menu {
  height: 100vh;
  width: 350px;
  overflow: hidden;
  background: #EEEEEE;
  display: flex;
  flex-direction: column;

  @media (max-width: 767px) {
    width: 100vh;
  }

  &__list {
    transition: transform $duration-main $motion-main;
  }

  ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    height: 100%;
  }

  li {
    width: 100%;
    background: white;

    &:last-child {
      margin-top: auto;
      align-items: center;
      justify-content: flex-start;
    }
    a {
      background: white;
    }
  }

  .subcategory-item {
    display: flex;
    width: 100%;
  }

  button {
    color: $color-mine-shaft;
    background: white;

    a {
      color: $color-mine-shaft;
    }
  }

  .close-btn {
    i {
      color: $color-gainsboro;
    }
    &:hover,
    &:focus {
      i {
        color: $color-matterhorn;
      }
    }
  }
}

.account-tab {
  width: 100%;
}

.my-account {
  display: flex;
  align-items: center;
}

.wishlist {
  display: flex;
  justify-content: center;
}
</style>

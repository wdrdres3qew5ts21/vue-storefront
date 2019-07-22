<template>
  <div>
    <ul
      v-if="children"
      class="sidebar-submenu absolute w-100 p0 bg-cl-primary"
      :style="styles"
    >
      <li
        class="brdr-bottom-1 brdr-cl-bg-secondary bg-cl-primary flex w-100"
        v-if="parentSlug"
      >
        <router-link
          class="px25 py20 cl-accent no-underline col-xs"
          :to="localizedRoute({ name: 'category', fullPath: parentPath, params: { id: id, slug: parentSlug }})"
          data-testid="categoryLink"
        >
          {{ $t('View all') }}
        </router-link>
      </li>
      <li
        class="brdr-bottom-1 brdr-cl-bg-secondary bg-cl-primary flex w-100"
        :key="link.slug"
        v-for="link in children"
      >
        <div v-if="isCurrentMenuShowed" class="subcategory-item">
          <sub-btn
            class="bg-cl-transparent brdr-none fs-medium"
            :id="link.id"
            :name="link.name"
            v-if="link.children_count > 0"
          />
          <router-link
            v-else
            class="px25 py20 cl-accent no-underline col-xs"
            :to="localizedRoute({ name: 'category', fullPath: link.url_path, params: { id: link.id, slug: link.slug }})"
          >
            {{ link.name }}
          </router-link>
        </div>
        <sub-category
          :category-links="link.children_data"
          :id="link.id"
          v-if="link.children_count > 0"
          :parent-slug="link.slug"
          :parent-path="link.url_path"
        />
      </li>
    </ul>
    <ul
      v-if="myAccountLinks"
      class="sidebar-submenu fixed w-100 p0 bg-cl-primary"
      :style="styles"
    >
      <li
        class="brdr-bottom-1 brdr-cl-bg-secondary bg-cl-primary flex w-100"
        :key="link.id"
        v-for="link in myAccountLinks"
        @click="notify(link.name)"
      >
        <router-link
          class="px25 py20 cl-accent no-underline col-xs"
          :to="localizedRoute(link.url)"
        >
          {{ link.name }}
        </router-link>
      </li>
      <li class="brdr-bottom-1 brdr-cl-bg-secondary bg-cl-primary logout-li flex w-100">
        <div @click.prevent="logout" class="col-xs-10 logout-tab">
          <font-awesome-icon class="account-icon" icon="user-circle" size="lg" style="color: #404040;"/>
          <a href="#" class="py20 cl-accent no-underline col-xs" >
            {{ $t('Logout') }}
          </a>
        </div>
        <div class="col-xs-2 wishlist-col">
          <wishlist-icon class="h-100 bg-cl-primary icon pointer" />
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import SubBtn from './SubBtn.vue'
import i18n from '@vue-storefront/i18n'
import WishlistIcon from 'theme/components/core/blocks/Header/WishlistIcon'

export default {
  name: 'SubCategory',
  components: {
    SubBtn,
    WishlistIcon
  },
  props: {
    id: {
      type: [String, Number],
      required: true
    },
    categoryLinks: {
      type: null,
      required: false,
      default: false
    },
    parentSlug: {
      type: String,
      required: false,
      default: ''
    },
    parentPath: {
      type: String,
      required: false,
      default: ''
    },
    myAccountLinks: {
      type: null,
      required: false,
      default: false
    }
  },
  computed: {
    children () {
      if (!this.$store.state.config.entities.category.categoriesDynamicPrefetch && (this.categoryLinks && this.categoryLinks.length > 0 && this.categoryLinks[0].name)) { // we're using dynamic prefetching and getting just category.children_data.id from 1.7
        return this.categoryLinks
      } else {
        return this.$store.state.category.list.filter(c => { return c.parent_id === this.id }) // return my child categories
      }
    },
    ...mapState({
      submenu: state => state.ui.submenu
    }),
    getSubmenu () {
      return this.submenu
    },
    styles () {
      const pos = this.submenu.path.indexOf(this.id)
      return pos !== -1 ? {
        zIndex: pos + 1
      } : false
    },
    isCurrentMenuShowed () {
      return this.getSubmenu && this.getSubmenu.depth && this.getSubmenu.path[this.getSubmenu.depth - 1] === this.id
    }
  },
  methods: {
    logout () {
      this.$bus.$emit('user-before-logout')
      this.$router.push(this.localizedRoute('/'))
    },
    notify (title) {
      if (title === 'My loyalty card' || title === 'My product reviews') {
        this.$store.dispatch('notification/spawnNotification', {
          type: 'warning',
          message: i18n.t('This feature is not implemented yet! Please take a look at https://github.com/DivanteLtd/vue-storefront/issues for our Roadmap!'),
          action1: { label: i18n.t('OK') }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.sidebar-submenu {
    left: 0;
    top: 0;
    min-height: 100%;
    transform: translateX(-100%);
  }

  .subcategory-item {
    display: flex;
    width: 100%;
  }

  a {
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
    color: #404040;
    text-transform: uppercase;
  }

  .logout-tab {
    display: flex;
    align-items: center;
    padding: 0;

    .account-icon {
      padding-left: 25px;
    }
  }

  ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    height: 100%;
  }

  .logout-li {
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

  .wishlist-icon {
    display: flex;
    justify-content: center;
  }
</style>

import { setupMultistoreRoutes } from '@vue-storefront/core/lib/multistore'
import App from './App.vue'
import routes from './router'
import Vue from 'vue'
import VueProgressBar from 'vue-progressbar'
import '@vue-storefront/core/lib/passive-listeners'
import { RouterManager } from '@vue-storefront/core/lib/router-manager'
import { once } from '@vue-storefront/core/helpers'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faShoppingBag, faSearch, faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

once('__VUE_EXTEND_DROPPOINT_VPB__', () => {
  Vue.use(VueProgressBar)
})

library.add(faShoppingBag, faSearch, faBars)

Vue.component('font-awesome-icon', FontAwesomeIcon)

const themeEntry = App
function initTheme (app, router, store, config, ssrContext) {
  // if youre' runing multistore setup this is copying the routed above adding the 'storeCode' prefix to the urls and the names of the routes
  // You can do it on your own and then be able to customize the components used for example for German storeView checkout
  // To do so please execlude the desired storeView from the config.storeViews.mapStoreUrlsFor and map the urls by Your own like:
  // { name: 'de-checkout', path: '/checkout', component: CheckoutCustomized },
  setupMultistoreRoutes(config, router, routes)
  RouterManager.addRoutes(routes, router)
}

export {
  themeEntry,
  initTheme
}

import { ActionTree } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import PromotedOffersState from '../types/PromotedOffersState'
import { Logger } from '@vue-storefront/core/lib/logger'
import axios from 'axios'

const actions: ActionTree<PromotedOffersState, RootState> = {
  async updatePromotedOffers ({commit, rootState}, data) {
    try {
      const promotedOffersModule = await axios.get('http://localhost:8080/api/ext/backend-api/collections')
      console.log(promotedOffersModule.data)
      commit('updatePromotedOffers', promotedOffersModule.data)
    } catch (err) {
      Logger.debug('Unable to load promotedOffers' + err)()
    }
  },
  async updateHeadImage ({commit, rootState}, data) {
    let mainImageResource = rootState.storeView && rootState.storeView.storeCode ? `banners/${rootState.storeView.storeCode}_main-image` : `main-image`
    try {
      const imageModule = await import(/* webpackChunkName: "vsf-head-img-[request]" */ `theme/resource/${mainImageResource}.json`)
      commit('SET_HEAD_IMAGE', imageModule.images)
    } catch (err) {
      Logger.debug('Unable to load headImage' + err)()
    }
  }
}

export default actions

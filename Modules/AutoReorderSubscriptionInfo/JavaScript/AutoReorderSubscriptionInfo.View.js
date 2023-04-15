// @module DME.AutoReorder.AutoReorderSubscriptionInfo
define('DME.AutoReorder.AutoReorderSubscriptionInfo.View', [
  'PageType.Base.View',
  'DME.AutoReorder.AutoReorderSubscriptionInfo.AutoReorderCollection',
  'DME.AutoReorder.AutoReorderSubscriptionInfo.AutoReorderCollectionView',
  'dme_autoreorder_autoreordersubscriptioninfo.tpl',
  'DME.AutoReorder.AutoReorderSubscriptionInfo.SS2Model',

  'Backbone',
  'Utils'
], function (
  PageTypeBaseView,
  AutoReorderCollection,
  AutoReorderCollectionView,
  dme_autoreorder_autoreordersubscriptioninfo_tpl,

  AutoReorderSubscriptionInfoSS2Model,

  Backbone,
  Utils
) {
  'use strict'

  return PageTypeBaseView.PageTypeBaseView.extend({
    template: dme_autoreorder_autoreordersubscriptioninfo_tpl,
    initialize: function initialize(options) {
      this.collection = new AutoReorderCollection()
    },
    beforeShowContent: function beforeShowContent() {
      var self = this

      this.getBreadcrumbPages = function () {
        return [
          {
            text: Utils.translate('Active Subscriptions'),
            href: '/autoreorderapp/activesubscriptions'
          }
        ]
      }

      this.title = Utils.translate('Active Subscriptions')
      var promise2 = jQuery.Deferred()
      self.childViews = {
        'DME.AutoReorder.AutoReorderSubscriptionInfo.AutoReorderCollectionView':
          function () {
            return new AutoReorderCollectionView({
              collection: self.collection
            })
          }
      }
      this.collection.fetch().then(function (res) {
        
        if (res && res.length > 0) {
          res.forEach(function(res,index){
            self.collection.models[index].attributes = res
          })
          promise2.resolve()
        } else {
          self.showNoDataMesssage = true 
          promise2.resolve()
        }
      })
      // return this.collection.fetch()
      return promise2
    },
    getContext: function getContext() {
      return {
        showNoDataMesssage: this.showNoDataMesssage
      }
    }
  })
})

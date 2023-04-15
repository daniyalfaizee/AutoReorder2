// @module DME.AutoReorder.AutoReorderItemInfo
define('DME.AutoReorder.AutoReorderItemInfo.View', [
  'dme_autoreorder_autoreorderiteminfo.tpl',

  'DME.AutoReorder.AutoReorderItemInfo.Collection',

  'DME.AutoReorder.AutoReorderItemInfo.CollectionView',
  'PageType.Base.View',
  'Utils'
], function (
  dme_autoreorder_autoreorderiteminfo_tpl,

  AutoReorderItemInfoCollection,

  AutoReorderItemInfoCollectionView,

  PageTypeBaseView,
  Utils
) {
  'use strict'

  return PageTypeBaseView.PageTypeBaseView.extend({
    template: dme_autoreorder_autoreorderiteminfo_tpl,

    initialize: function (options) {
      this.collection = new AutoReorderItemInfoCollection()
    },

    events: {},

    bindings: {},

    childViews: {},

    beforeShowContent: function beforeShowContent() {
      var self = this

      if (!!Number(this.options.routerArguments[0])) {
        this.getBreadcrumbPages = function () {
          return [
            {
              text: Utils.translate('Subscription Items'),
              href: '/autoreorderapp/reorderitemdetails'
            }
          ]
        }
        this.title = Utils.translate('Subscription Items')
        this.collection = new AutoReorderItemInfoCollection({
          id: this.options.routerArguments[0]
        })

        self.childViews = {
          'DME.AutoReorder.AutoReorderItemInfo.CollectionView': function () {
            return new AutoReorderItemInfoCollectionView({
              collection: this.collection,
              showSubscriptionItems: true
            })
          }
        }
        var promise = jQuery.Deferred()
        this.collection
          .fetchItems({
            id: this.options.routerArguments[0]
          })
          .then(function (res) {
            if (res && res.length > 0) {
              res.forEach(function (response, index) {
                self.collection.models[index].attributes = response
              })
              promise.resolve()
            } else {
              self.showNoDataMessage = true
              promise.resolve()
            }
          })

        return promise
      } else {
        this.getBreadcrumbPages = function () {
          return [
            {
              text: Utils.translate('Reorder Item Details'),
              href: '/autoreorderapp/reorderitemdetails'
            }
          ]
        }
        this.title = Utils.translate('Reorder Item Details')
        var promise2 = jQuery.Deferred()
        this.collection.fetch().then(function (res) {
          if (res && res.length > 0) {
            self.childViews = {
              'DME.AutoReorder.AutoReorderItemInfo.CollectionView':
                function () {
                  return new AutoReorderItemInfoCollectionView({
                    collection: self.collection
                  })
                }
            }
            res.forEach(function (response, index) {
              self.collection.models[index].attributes = response
            })
            promise2.resolve()
          } else {
            self.showNoDataMessage = true
            promise2.resolve()
          }
        })
        // return this.collection.fetch()
        return promise2
      }
    },
    //@method getContext @return DME.AutoReorder.AutoReorderItemInfo.View.Context
    getContext: function getContext() {
      //@class DME.AutoReorder.AutoReorderItemInfo.View.Context
      
      return {
        showNoDataMessage: this.showNoDataMessage
      }
    }
  })
})

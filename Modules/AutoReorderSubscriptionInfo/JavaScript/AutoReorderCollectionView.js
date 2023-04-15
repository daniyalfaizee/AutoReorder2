define('DME.AutoReorder.AutoReorderSubscriptionInfo.AutoReorderCollectionView', [
  'SCCollectionView',
  'DME.AutoReorder.AutoReorderSubscriptionInfo.AutoReorderSubscriptionListView',
  'dme_autoreorder_subscription_info_collection_view.tpl',
  'dme_autoreorder_subscription_info_row_view.tpl',
  'DME.AutoReorder.AutoReorderSubscriptionInfo.RowView'
], function (
  SCCollectionViewModule,
  AutoReorderSubscriptionListView,
  dme_auto_reorder_subscription_info_auto_reorder_collection_view_tpl,
  dme_autoreorder_subscription_info_row_view_tpl,
  RowView
) {
  'use strict'
  var SCCollectionView = SCCollectionViewModule.SCCollectionView
  function AutoReorderCollectionView(options) {
    
    SCCollectionView.call(this, options.collection)
    var self = this
    this.template =
      dme_auto_reorder_subscription_info_auto_reorder_collection_view_tpl

    // this.collection.on('reset add remove change destroy', function () {
    //   self.render()
    // })
    this.removeSubscription= function (e) {
      e.preventDefault()
      var id = jQuery(e.target).data('id')
      var model = this.collection.models.find(function (model) {
        return model.get('internalid') == id
      })

      model.deleteRecord({ id: id })
      this.render()
    }
  }
  AutoReorderCollectionView.prototype = Object.create(
    SCCollectionView.prototype
  )
  AutoReorderCollectionView.prototype.constructor = AutoReorderCollectionView
  AutoReorderCollectionView.prototype.getCellViewsPerRow = function () {
    return 1
  }
  AutoReorderCollectionView.prototype.getCellViewInstance = function (model) {
    
    return new AutoReorderSubscriptionListView({
      model: model
    })
  }
  // AutoReorderCollectionView.prototype.getRowViewInstance = function () {
  //   return new RowView({
  //     template: dme_autoreorder_subscription_info_row_view_tpl
  //   })
  // }

  AutoReorderCollectionView.prototype.getEvents = function () {
    return {
      'click [data-action="add-new"]': 'addNew',
      'click button[data-action="delete"]': 'removeSubscription'
    }
  }
  AutoReorderCollectionView.prototype.getContext = function () {
    return {}
  }
  return AutoReorderCollectionView
})

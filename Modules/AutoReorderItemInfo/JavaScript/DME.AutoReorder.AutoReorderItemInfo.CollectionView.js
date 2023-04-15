define('DME.AutoReorder.AutoReorderItemInfo.CollectionView', [
  'SCCollectionView',
  'DME.AutoReorder.AutoReorderItemInfo.ItemListView',
  'dme_autoreorder_item_info_row_view.tpl',
  'dme_autoreorder_item_info_collection_view.tpl'
], function (
  SCCollectionViewModule,
  AutoReorderItemInfoListView,
  dme_autoreorder_item_info_row_view_tpl,
  dme_autoreorder_item_info_collection_view_tpl
) {
  'use strict'
  var SCCollectionView = SCCollectionViewModule.SCCollectionView
  function AutoReorderItemInfoCollectionView(options) {
    SCCollectionView.call(this, options.collection)

    // this.collection = options.collection
    this.template = dme_autoreorder_item_info_collection_view_tpl
    options.hasOwnProperty('showSubscriptionItems')
      ? (this.showSubscriptionItems = options.showSubscriptionItems)
      : (this.showSubscriptionItems = false)
    
    this.removeSubscriptionItem = function (e) {
      e.preventDefault()
      var id = jQuery(e.target).data('id')
      var model = this.collection.models.find(function (model) {
        return model.get('internalid') == id
      })

      model.deleteRecord({ id: id })
      this.render()
    }
    
  }
  AutoReorderItemInfoCollectionView.prototype = Object.create(
    SCCollectionView.prototype
  )
  AutoReorderItemInfoCollectionView.prototype.constructor =
    AutoReorderItemInfoCollectionView
  AutoReorderItemInfoCollectionView.prototype.getCellViewsPerRow = function () {
    return 1
  }
  AutoReorderItemInfoCollectionView.prototype.getCellViewInstance = function (
    model
  ) {
    return new AutoReorderItemInfoListView({
      model: model,
      showSubscriptionItems: this.showSubscriptionItems
    })
  }
  // AutoReorderItemInfoCollectionView.prototype.getRowViewInstance = function () {
  //   return new RowView({
  //     template: dme_autoreorder_item_info_row_view_tpl
  //   })
  // }
  AutoReorderItemInfoCollectionView.prototype.getEvents = function () {
    return {
      'click [data-action="add-new"]': 'addNew',
      'click button[data-action="delete"]': 'removeSubscriptionItem'
    }
  }
  AutoReorderItemInfoCollectionView.prototype.getContext = function () {
    return {}
  }
  return AutoReorderItemInfoCollectionView
})

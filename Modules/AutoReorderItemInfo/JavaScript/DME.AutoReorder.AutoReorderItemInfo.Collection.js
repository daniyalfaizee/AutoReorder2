define('DME.AutoReorder.AutoReorderItemInfo.Collection', [
  'SCCollection',
  'DME.AutoReorder.AutoReorderItemInfo.SS2Model',
  'Utils'
], function (SCCollectionModel, AutoReorderItemInfoSS2Model, Utils) {
  'use strict'
  var SCCollection = SCCollectionModel.SCCollection
  function AutoReorderItemInfoCollection(models, options) {
    SCCollection.call(this, models, options)
    this.model = AutoReorderItemInfoSS2Model
    
    this.url = Utils.getAbsoluteUrl(
      getExtensionAssetsPath(
        'Modules/AutoReorderItemInfo/SuiteScript2/AutoReorderItemInfo.Service.ss'
      ),
      true
    )
    this.fetchItems = function (options) {
      this.url = Utils.getAbsoluteUrl(
        getExtensionAssetsPath(
          'Modules/AutoReorderItemInfo/SuiteScript2/AutoReorderItemInfo.Service.ss?internalid=' +
            options.id
        ),
        true
      )
      return this.fetch()
    }
  }
  AutoReorderItemInfoCollection.prototype = Object.create(
    SCCollection.prototype
  )
  AutoReorderItemInfoCollection.prototype.constructor =
    AutoReorderItemInfoCollection
  return AutoReorderItemInfoCollection
})

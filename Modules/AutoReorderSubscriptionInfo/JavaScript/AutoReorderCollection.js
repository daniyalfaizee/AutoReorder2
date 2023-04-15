define('DME.AutoReorder.AutoReorderSubscriptionInfo.AutoReorderCollection', [
  'SCCollection',
  'DME.AutoReorder.AutoReorderSubscriptionInfo.SS2Model',
  'Utils'
], function (SCCollectionModel, AutoReorderSubscriptionInfoSS2Model, Utils) {
  'use strict'
  var SCCollection = SCCollectionModel.SCCollection
  function AutoReorderCollection(models, options) {
    SCCollection.call(this, models, options)
    this.model = AutoReorderSubscriptionInfoSS2Model
    this.url = Utils.getAbsoluteUrl(
      getExtensionAssetsPath(
        'Modules/AutoReorderSubscriptionInfo/SuiteScript2/AutoReorderSubscriptionInfo.Service.ss'
      ),
      true
    )
  }
  AutoReorderCollection.prototype = Object.create(SCCollection.prototype)
  AutoReorderCollection.prototype.constructor = AutoReorderCollection
  return AutoReorderCollection
})

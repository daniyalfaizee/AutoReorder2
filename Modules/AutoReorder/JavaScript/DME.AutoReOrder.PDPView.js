define('DME.AutoReOrder.PDPView', [
  'SCView',
  'dme_autoreorder_pdp_view.tpl',
  'DME.AutoReorder.AutoReorder.SS2Model',
  'underscore'
], function (SCViewModule, dme_autoreorder_pdp_view_tpl, AutoReorderSS2Model, _) {
  'use strict'

  var SCView = SCViewModule.SCView
  function AutoReOrderPDPView(options) {
    SCView.call(this, options)
    var self = this
    this.pdp = options.pdp
    this.userInfo = options.userInfo;
    this.model = new AutoReorderSS2Model();
    this.model.set("customerInfo", this.userInfo.id);
    this.itemInfo = options.pdp.getItemInfo()
    console.log(this.pdp.getAllMatrixChilds())
    if (this.itemInfo.item.itemoptions_detail.matrixtype) {
      self.isMatrixItem = true

      options.pdp.on('afterOptionSelection', function (e) {
        self.isMatrixSubItemEligible = self.matrixItemsCheck()
        if (self.isMatrixSubItemEligible && !!self.userInfo.login) {
          self.model.set("productInfo", self.pdp.getSelectedMatrixChilds()[0].internalid);
          self.model.fetch().then(function(){
            self.isSubscribed = self.model.get("isSubscribed");
            self.render();
          });
          console.log('in 1')
        } else {
          self.isSubscribed = false;
          self.render();
          console.log('in 3')
        }
        // self.render()
      })
    }
    else if(!!self.itemInfo.item.custitem_tdc_auto_reorder_eligible && !!self.userInfo.login){
      self.pdp.on('afterShowContent', function(){
        self.model.set("productInfo", self.itemInfo.item.internalid);
        self.model.fetch().then(function(){
          self.isSubscribed = self.model.get("isSubscribed");
          self.render();
        });
      })
    }
    this.template = dme_autoreorder_pdp_view_tpl
  }

  AutoReOrderPDPView.prototype = Object.create(SCView.prototype)
  AutoReOrderPDPView.prototype.constructor = AutoReOrderPDPView
  AutoReOrderPDPView.prototype.getContext = function getContext() {
    return {
      isMatrixItem: typeof this.isMatrixItem != 'undefined' && this.isMatrixItem,
      isItemEligible:
        typeof this.isMatrixItem != 'undefined' && this.isMatrixItem
          ? this.isMatrixSubItemEligible
          : this.itemInfo.item.custitem_tdc_auto_reorder_eligible,
      reOrderDiscount:
        typeof this.isMatrixItem != 'undefined' &&
        this.isMatrixItem &&
        typeof this.selectedMatrixChilds !='undefined'
          ? this.selectedMatrixChilds[0].custitem_auto_reorder_discount
          : this.itemInfo.item.custitem_auto_reorder_discount,
        isSubscribed: !!this.isSubscribed
    }
  }
  AutoReOrderPDPView.prototype.matrixItemsCheck = function () {
    this.selectedMatrixChilds = this.pdp.getSelectedMatrixChilds()
    // console.log(this.selectedMatrixChilds);
    if (this.selectedMatrixChilds.length == 1) {
      return this.selectedMatrixChilds[0].custitem_tdc_auto_reorder_eligible
    }
    return false
  }
  return AutoReOrderPDPView
})

// continue from this.on afterappendview

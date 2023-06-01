// @module DME.AutoReorder.AutoReorder
define('DME.AutoReorder.AutoReorder.View', [
  'dme_autoreorder_autoreorder.tpl',
  'DME.AutoReorder.AutoReorder.SS2Model',
  'Backbone',
  'LiveOrder.Model',
  'SCView',
  'DME.AutoReOrder.FormView'
], function (
  dme_autoreorder_autoreorder_tpl,
  AutoReorderSS2Model,
  Backbone,
  LiveOrderModel,
  SCViewModule,
  AutoReorderFormView
) {
  ;('use strict')
  var SCView = SCViewModule.SCView

  function AutoReOrderView(options) {
    SCView.call(this, options)
    var self = this
    this.pdp = options.pdp
    this.container = options.container
    userInfo = options.userInfo;
    this.pdp.setOption('custcol_tdc_reorder_subscribed', 'F')
    this.pdp.setOption('custcol_tdc_reorder_sub_details', '')
    this.itemInfo = this.pdp.getItemInfo()
    this.model = new AutoReorderSS2Model();
    this.model.set("customerInfo", userInfo.id);
    this.cart = options.cart
    this.template = dme_autoreorder_autoreorder_tpl

    /*  Uncomment to test backend communication with an example service
				(you'll need to deploy and activate the extension first)
			*/

    // console.log('test', self.pdp.getSelectedMatrixChilds({}))
    if (this.itemInfo.item.itemoptions_detail.matrixtype) {
      self.isMatrixItem = true
      this.pdp.on('afterOptionSelection', function (e) {
        self.isMatrixSubItemEligible = self.matrixItemsCheck()
        if(!!self.isMatrixSubItemEligible && !!userInfo.login){
          self.model.set("productInfo", self.pdp.getSelectedMatrixChilds()[0].internalid);
          self.model.fetch().then(function(){
            self.isSubscribed = self.model.get("isSubscribed");
            self.render();
          });
        }
        else{
          self.isSubscribed = false;
          self.render();
        }
      })
    }
    else if(!!this.itemInfo.item.custitem_tdc_auto_reorder_eligible && !!userInfo.login){
      this.pdp.on('afterShowContent', function(){
        self.model.set("productInfo", self.itemInfo.item.internalid);
        self.model.fetch().then(function(){
          self.isSubscribed = self.model.get("isSubscribed");
          self.render();
        });
      })
    }
  }

  AutoReOrderView.prototype = Object.create(SCView.prototype)
  AutoReOrderView.prototype.constructor = AutoReOrderView
  AutoReOrderView.prototype.addPDPItemToAutoReorderSubscription = function (
    e,
    itemInfo,
    pdp,
    container,
    model
  ) {
    // var self = this

    var promise = new Promise(function (resolve, reject) {
      var lines = LiveOrderModel.getInstance()
      if (itemInfo.item['matrixchilditems_detail'] !== undefined) {
        if (itemInfo.item['matrixchilditems_detail'].length < 2) {
          lines.setOption('custcol_tdc_reorder_subscribed', 'T')
        } else {
          pdp.showMessage({
            message: 'Please select a valid option',
            type: 'error'
          })
        }
      }
      return
      _.each(lines, function (line) {
        if (line.id == e.target.id.split('-')[0]) {
          if (
            self.autoReOrderSubscribedItemDetails[line.id.toString()] ==
            undefined
          ) {
            self.autoReOrderSubscribedItemDetails[line.id.toString()] = {
              subscribed: true,
              frequency: 1
            }
          } else {
            if (e.target.name == 'item-checkbox') {
              e.target.checked == true
                ? (self.autoReOrderSubscribedItemDetails[
                    line.id.toString()
                  ].subscribed = true)
                : delete self.autoReOrderSubscribedItemDetails[
                    line.id.toString()
                  ]
            } else if (e.target.name == 'item-frequency') {
              self.autoReOrderSubscribedItemDetails[
                line.id.toString()
              ].frequency = e.target.value == 0 ? 1 : e.target.value
            } else if (e.target.name == 'item-quantity') {
              self.autoReOrderSubscribedItemDetails[
                line.id.toString()
              ].quantity = e.target.value
            }
          }
        }
      })

      resolve()
    })
    // promise.then(function () {
    //   var a = LiveOrderModel.getInstance().get('options')
    //   a.custbody_tdc_reorder_item_details = JSON.stringify(
    //     self.autoReOrderSubscribedItemDetails
    //   )
    //   self.model.set('autoReOrderSubscribedItemDetails', a, {
    //     validate: true
    //   })
    //   LiveOrderModel.getInstance().set('options', a)
    // })
  }
  AutoReOrderView.prototype.matrixItemsCheck = function () {
    this.selectedMatrixChilds = this.pdp.getSelectedMatrixChilds()
    // console.log(this.selectedMatrixChilds);
    if (this.selectedMatrixChilds.length == 1) {
      return this.selectedMatrixChilds[0].custitem_tdc_auto_reorder_eligible
    }
    return false
  }

  //@method getContext @return DME.AutoReorder.AutoReorder.View.Context
  AutoReOrderView.prototype.getContext = function getContext() {
    //@class DME.AutoReorder.AutoReorder.View.Context
    this.message = this.message || 'This Item is Available for Re-Order!!'
    // console.log(this.isMatrixItem, this.selectedMatrixChilds);
    console.log({discount: this.isMatrixItem
      ? this.pdp.getSelectedMatrixChilds()[0].custitem_auto_reorder_discount
      : this.itemInfo.item.custitem_auto_reorder_discount})
    return {
      message: this.message,
      isReOrderEligible: this.isMatrixItem
        ? this.selectedMatrixChilds !== undefined
          ? this.selectedMatrixChilds[0].custitem_tdc_auto_reorder_eligible
          : false
        : this.itemInfo.item.custitem_tdc_auto_reorder_eligible,
      discount: this.isMatrixItem
      ? this.pdp.getSelectedMatrixChilds()[0].custitem_auto_reorder_discount
      : this.itemInfo.item.custitem_auto_reorder_discount,
      isMatrixSubItemEligible: !!this.isMatrixSubItemEligible,
      isMatrixItem: !!this.isMatrixItem,
      isSubscribed: !!this.isSubscribed
    }
  }

  return AutoReOrderView
})

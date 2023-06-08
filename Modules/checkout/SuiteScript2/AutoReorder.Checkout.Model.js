/**
* @NApiVersion 2.x
* @NModuleScope Public
*/
define(['N/search'],
function (search) {
    var AutoReorderModel = {
        get: function (request) {
          var data = [];
          var productInfo = JSON.parse(request.parameters.productInfo);
          search.create({
            type: search.Type.INVENTORY_ITEM,
            filters:[
                search.createFilter({
                    name: 'internalid',
                    operator: search.Operator.ANYOF,
                    values: productInfo
                })
            ],
            columns: ['internalid', 'custitem_tdc_auto_reorder_eligible']
          }).run().each(function(res){
            if(!!res.getValue({ name: 'custitem_tdc_auto_reorder_eligible' }))
              data.push(res.getValue({ name: 'internalid' }));
            return true;
          });
          if(data.length > 0){
            search.create({
              type: 'customrecord_tdc_reorder_item_details',
              filters:[
                  search.createFilter({
                      name: 'custrecord_tdc_auto_reorder_customer',
                      join: 'custrecord_tdc_related_reorder_id',
                      operator: search.Operator.IS,
                      values: [request.parameters.customerInfo]
                  })
              ],
              columns: ['custrecord_reorder_item']
            }).run().each(function(res){
              if(data.indexOf(res.getValue({ name: 'custrecord_reorder_item' })) > -1)
                data.splice(data.indexOf(res.getValue({ name: 'custrecord_reorder_item' })), 1);
              return true;
            });
          }
          return data;
        }
    }
    return AutoReorderModel
});
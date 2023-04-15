/**
* @NApiVersion 2.x
* @NModuleScope Public
*/
define(['N/search'],
function (search) {
    var AutoReorderModel = {
        get: function (request) {
          var data = { isSubscribed: false };
          var subcriptionSearch = search.create({
            type: 'customrecord_tdc_reorder_item_details',
            filters:[
                search.createFilter({
                    name: 'custrecord_reorder_item',
                    operator: search.Operator.IS,
                    values: [request.parameters.productInfo]
                }),
                search.createFilter({
                    name: 'custrecord_tdc_auto_reorder_customer',
                    join: 'custrecord_tdc_related_reorder_id',
                    operator: search.Operator.IS,
                    values: [request.parameters.customerInfo]
                })
            ],
            columns: ['internalid']
          }).run().getRange({ start: 0, end: 1 });
          if(subcriptionSearch.length > 0)
            data.isSubscribed = true;
          return data;
        }
    }
    return AutoReorderModel
});
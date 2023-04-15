/**
 * @NApiVersion 2.x
 * @NModuleScope Public
 */
define(['./AutoReorder.SubscriptionInfo.Model', 'N/runtime'], function (
  AutoReorderSubscriptionInfoModel,
  runtime
) {
  'use strict'

  function isLoggedIn() {
    var user = runtime.getCurrentUser()
    return user.id > 0 && user.role !== 17
  }

  function service(context) {
    var response = {}

    if (isLoggedIn()) {
      switch (context.request.method) {
        case 'GET':
          if(context.request.parameters.internalid){
            response = AutoReorderSubscriptionInfoModel.getSubscriptionDetails(context.request)  
          }
          else{
            response = AutoReorderSubscriptionInfoModel.get(context.request)
          }
          break
        case 'POST':
          response = AutoReorderSubscriptionInfoModel.post(context.request)
          break
        case 'PUT':
          response = AutoReorderSubscriptionInfoModel.put(context.request)
          break
        case 'DELETE':
          response = AutoReorderSubscriptionInfoModel.delete(context.request)
          break
        default:
          response = {
            type: 'error',
            message: 'Method not supported: ' + context.request.method
          }
      }
    } else {
      response = {
        type: 'error',
        message: 'You must be logged in to use this service'
      }
    }

    context.response.write(JSON.stringify(response))
  }

  return {
    service: service
  }
})

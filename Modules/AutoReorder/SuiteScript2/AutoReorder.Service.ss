/**
* @NApiVersion 2.x
* @NModuleScope Public
*/
define(['./AutoReorder.Model'],function (AutoReorderModel) {
    "use strict";
    
    function service(context) {
        switch (context.request.method) {
            case 'GET':
                response = AutoReorderModel.get(context.request)
                break;
        }
        context.response.write(JSON.stringify(response));
    }

    return {
        service: service
    };
});


function service(request, response)
{
	'use strict';
	try 
	{
		require('DME.AutoReorder.AutoReorderSubscriptionInfo.ServiceController').handle(request, response);
	} 
	catch(ex)
	{
		console.log('DME.AutoReorder.AutoReorderSubscriptionInfo.ServiceController ', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}

function service(request, response)
{
	'use strict';
	try 
	{
		require('DME.AutoReorder.checkout.ServiceController').handle(request, response);
	} 
	catch(ex)
	{
		console.log('DME.AutoReorder.checkout.ServiceController ', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}
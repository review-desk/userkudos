var _reviewdesk = {}
_reviewdesk.debug = true;

function _reviewdesk_log(message) {

	if (!_reviewdesk || !_reviewdesk.debug)
		return;

	console.log(message);

}
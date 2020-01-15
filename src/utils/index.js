export const STATI = {
	STATUS_IDLE: 'IDLE',
	STATUS_LOADING: 'LOADING',
	STATUS_SUCCESS: 'SUCCESS',
	STATUS_ERROR: 'ERROR'
}

export const createIncludedTrees = (data) => {
	let obj = {};
    data.forEach(id => {
        obj[id] = { included: true };
    })
    return obj;
}

export const convertTime = (unix_timestamp) => {
		var ms = Number(unix_timestamp);
		console.log(ms)
		var date = new Date(ms);

		var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		var year = date.getFullYear();
		var month = months[date.getMonth()];
		var day = date.getDate();

		var hours = date.getHours();
		// Minutes part from the timestamp
		var minutes = date.getMinutes();
		// Seconds part from the timestamp
		var seconds = "0" + date.getSeconds();

		var min = String(minutes).length == 2 ? minutes : `0${minutes}`;
		console.log(minutes);

		// Will display time in 10:30:23 format
		return `Gegossen: ${day}. ${month}. ${year}, ${hours}:${min}`;
		// return day month + '.' + year + '. //' + hours + ':' + minutes.substr(-2);
}

export default {
	convertTime
};
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
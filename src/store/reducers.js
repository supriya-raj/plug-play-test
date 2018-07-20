export default function(state={}, action){
	if(action.type === "update_data") {
		state.data = action.payload;
	}
	return state;
}

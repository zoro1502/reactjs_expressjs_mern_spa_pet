
export default function commonReducer ( state, action )
{
	switch ( action.type )
	{
		case 'LOADING':
			return {
				...state,
				showLoading: action.payload,
			};
		default:
			return state;
	}
}

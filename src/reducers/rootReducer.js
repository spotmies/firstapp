const initState = {
    userDetails:[],
    myBookings:[],
    quotes:[],
    logs:[],
    messages:[]

}
const rootReducer = (state=initState,action)=>{
    console.log(action);
    if(action.type == "ADD_NEW_BOOK"){
        return{
            ...state,
            myBookings:[...state.myBookings,action.value]
        }
    }
    return state;

}
export default rootReducer
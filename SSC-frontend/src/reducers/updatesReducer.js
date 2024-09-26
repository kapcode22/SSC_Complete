
import axios from "axios";
export const getUpdates=()=>{
   return async(dispatch)=>{
      dispatch({type:'GET_UPDATES'})
      const response= await axios.get('http://localhost:5000/api/services')
      if(response){
         dispatch({type:'GET_UPDATES_COMPLETED',payload:response.data.data})
      }
      if(!response){
         dispatch({type:'GET_UPDATES_FAILED'})
      }
   }

}
const initialState = {
   isLoading: false,
   updatesData: []
 };
 
 const updateReducer = (state = initialState, action) => {
   switch (action.type) {
     case 'GET_UPDATES':
       return {
         ...state,
         isLoading: true,
       };
     case 'GET_UPDATES_COMPLETED':
       return {
         ...state,
         isLoading: false,
         updatesData: action.payload,
       };
     case 'GET_UPDATES_FAILED':
       return {
         ...state,
         isLoading: false,
         updatesData: [],
       };
     default:
       return state;
   }
 };
 
 export default updateReducer;
 
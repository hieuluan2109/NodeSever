import * as types from "./../constants/actionTypes";
const initialstate = {
  listQuestion=[],
  token:'',
}
function QuestionReducer(state,action){
  switch(action.type){
      case 'SEENQS':{
        return {
          listQuestion:action.listQuestion,
          token:action.token,
        }
      }
  }
}

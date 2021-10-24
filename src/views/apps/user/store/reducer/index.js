/* eslint-disable  */
// ** Initial State
const initialState = {
  allData: [],
  allUsers: [],
  data: [],
  total: 1,
  params: {},
  selectedUser: null,
}

const updateUsers = (user, data) => {
  user.push(data)
  return [...user]
}

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_USERS":
      return { ...state, allUsers: action.data }
    case 'UPDATE_USERS':
      return {
        ...state,
        allUsers: updateUsers(state.allUsers, action.data)
      }
    // case 'GET_ALL_DATA':
    //   return { ...state, allData: action.data }
    // case 'GET_DATA':
    //   return {
    //     ...state,
    //     data: action.data,
    //     total: action.totalPages,
    //     params: action.params
    //   }
    // case 'GET_USER':
    //   return { ...state, selectedUser: action.selectedUser }
    // case 'ADD_USER':
    //   return { ...state }
    // case "addNewUser":
    //   return { ...state, categories: action.data.categories }
    // case 'DELETE_USER':
    //   return { ...state }
    default:
      return state
  }
}
export default usersReducer;

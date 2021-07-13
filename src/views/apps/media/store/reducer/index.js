/* eslint-disable */
const initialState = {
  files: []
};

const mediaReducer = (state = initialState, action) => {
  // console.log(action);
  switch (action.type) {
    case "ADD_FILE_TO_MEDIA":
      console.log(state.files, action.data);
      const newState = { files: [...state.files, action.data] };
      return newState;

    case "REMOVE_FILE_FROM_MEDIA":
      return { files:[]};
    default:
      return state;
  }
};

export default mediaReducer;

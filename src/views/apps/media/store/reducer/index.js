/* eslint-disable */

import { findIndexToTheArray } from "../../../../../utility/Utils";
const initialState = {
  files: [],
};

const mediaReducer = (state = initialState, action) => {
  //
  switch (action.type) {
    case "ADD_FILE_TO_MEDIA":
      const newState = { files: [...state.files, action.data] };
      return newState;
    case "ADD_FILE":
      return { files: [...action.data] };
    case "REMOVE_FILE_FROM_MEDIA":
      const files = state.files;
      const idx = files.findIndex(item => item["file_id"] === action.id);

      if (idx > -1) files.splice(idx, 1);
      return { files: [...files] };
    case "CLEAR_MEDIA":
      return { ...initialState };
    default:
      return state;
  }
};

export default mediaReducer;

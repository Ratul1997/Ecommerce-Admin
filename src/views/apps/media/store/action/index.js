/* eslint-disable */

export const addFiles = data => ({
  type: "ADD_FILE",
  data: data,
});

export const addMediaFiles = data => ({
  type: "ADD_FILE_TO_MEDIA",
  data: data,
});

export const removeMediaFiles = id => ({
  type: "REMOVE_FILE_FROM_MEDIA",
  id:id,
});

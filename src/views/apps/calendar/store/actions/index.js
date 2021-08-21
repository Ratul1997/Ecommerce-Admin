/*eslint-disable*/

import axios from "axios";
import { urls } from "@urls";
import axiosInstance from "../../../../../configs/axiosInstance";
import { onErrorToast, onSuccessToast } from "../../../../common/Toaster";

// ** Fetch Events
export const fetchEvents = calendars => {
  const url = calendars
    ? urls.GET_CALENDER_EVENTS + `1?calendar=${JSON.stringify(calendars)}`
    : urls.GET_CALENDER_EVENTS + "1";
  return dispatch => {
    axios
      .get(url, {
        calendars,
      })
      .then(response => {
        dispatch({
          type: "FETCH_EVENTS",
          events: response.data.results,
        });
      });
  };
};

// ** Add Event
export const addEvent = event => {
  return (dispatch, getState) => {
    axios
      .post(urls.ADD_CALENDER_EVENT + "1", { event })
      .then(() => {
        dispatch({
          type: "ADD_EVENT",
        });
        onSuccessToast("Event Added!");
        dispatch(fetchEvents(getState().calendar.selectedCalendars));
      })
      .catch(error => {
        onErrorToast(error.data.massage);
      });
  };
};

// ** Update Event
export const updateEvent = event => {
  console.log(event);
  return dispatch => {
    axiosInstance()
      .patch(urls.UPDATE_CALENDER_EVENTS, { event })
      .then(() => {
        dispatch({
          type: "UPDATE_EVENT",
          event,
        });
        onSuccessToast("Event Updated!");
      })
      .catch(error => {
        console.log(error)
        // onErrorToast(error.data.massage);
      });
  };
};

// ** Filter Events
export const updateFilter = filter => {
  return (dispatch, getState) => {
    dispatch({
      type: "UPDATE_FILTERS",
      filter,
    });
    dispatch(fetchEvents(getState().calendar.selectedCalendars));
  };
};

// ** Add/Remove All Filters
export const updateAllFilters = value => {
  return (dispatch, getState) => {
    dispatch({
      type: "UPDATE_ALL_FILTERS",
      value,
    });
    dispatch(fetchEvents(getState().calendar.selectedCalendars));
  };
};

// ** remove Event
export const removeEvent = id => {
  console.log(id);
  return dispatch => {
    axiosInstance()
      .delete(urls.REMOVE_CALENDER_EVENTS + `${1}/${id}`, { id })
      .then(() => {
        onSuccessToast("Event Removed");
        dispatch({
          type: "REMOVE_EVENT",
          id,
        });
      })
      .catch(error => {
        onErrorToast(error.data.massage);
      });
  };
};

// ** Select Event (get event data on click)
export const selectEvent = event => {
  return dispatch => {
    dispatch({
      type: "SELECT_EVENT",
      event,
    });
  };
};

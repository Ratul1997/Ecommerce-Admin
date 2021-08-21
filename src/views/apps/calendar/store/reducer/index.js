/*eslint-disable*/
// ** Initial State
const initialState = {
  events: [],
  selectedEvent: {},
  selectedCalendars: ["Personal", "Business", "Family", "Holiday", "ETC"],
};

const calenderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_EVENTS":
      return { ...state, events: action.events };
    case "ADD_EVENT":
      return { ...state };
    case "REMOVE_EVENT":
      const id = parseInt(action.id);
      const events = state.events;
      const index = events.findIndex(item => item.id === id);
      if (index > -1) {
        events.splice(index, 1);
      }
      return { ...state, events: [...events] };
    case "UPDATE_EVENT":
      const event = action.event;
      const ids = parseInt(event.id);
      const eventsList = state.events;
      const idx = eventsList.findIndex(item => item.id === ids);
      eventsList[idx] = event;
      return { ...state, events: [...eventsList] };
    case "UPDATE_FILTERS":
      // ** Updates Filters based on action filter
      console.log("sdsd", action.filter, state);
      const filterIndex = state.selectedCalendars.findIndex(i => {
        console.log(i);
        return i === action.filter;
      });
      console.log(filterIndex);
      if (state.selectedCalendars.includes(action.filter)) {
        state.selectedCalendars.splice(filterIndex, 1);
      } else {
        state.selectedCalendars.push(action.filter);
      }
      if (state.selectedCalendars.length === 0) {
        state.events.length = 0;
      }
      console.log(state);
      return { ...state };
    case "UPDATE_ALL_FILTERS":
      // ** Updates All Filters based on action value
      const value = action.value;
      let selected = [];
      if (value === true) {
        selected = ["Personal", "Business", "Family", "Holiday", "ETC"];
      } else {
        selected = [];
      }
      return { ...state, selectedCalendars: selected };
    case "SELECT_EVENT":
      return { ...state, selectedEvent: action.event };
    default:
      return state;
  }
};

export default calenderReducer;

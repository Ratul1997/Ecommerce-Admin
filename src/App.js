/* eslint-disable  */
// ** Router Import
import Router from "./router/Router";
import { PersistGate } from "redux-persist/lib/integration/react";
import { persistStore, persistReducer } from "redux-persist";
import { store } from "./redux/storeConfig/store";
import {Provider} from 'react-redux';
const App = props => {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistStore(store)}>
          <Router />
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;

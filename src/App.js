/* eslint-disable  */
// ** Router Import
// import Router from "./router/Router";
import { Suspense, lazy } from "react";
import { PersistGate } from "redux-persist/lib/integration/react";
import { persistStore, persistReducer } from "redux-persist";
import { store } from "./redux/storeConfig/store";
import { Provider } from "react-redux";
import ability from "./configs/acl/ability";
import { ToastContainer } from "react-toastify";
import { AbilityContext } from "./utility/context/Can";
import { ThemeContext } from "./utility/context/ThemeColors";
import { IntlProviderWrapper } from "./utility/context/Internationalization";

// ** Spinner (Splash Screen)
import Spinner from "./@core/components/spinner/Fallback-spinner";

// ** Ripple Button
import "./@core/components/ripple-button";

// ** Fake Database
import "./@fake-db";

// ** PrismJS
import "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-jsx.min";

// ** React Perfect Scrollbar
import "react-perfect-scrollbar/dist/css/styles.css";

// ** React Toastify
import "@styles/react/libs/toastify/toastify.scss";

// ** Core styles
import "./@core/assets/fonts/feather/iconfont.css";
import "./@core/scss/core.scss";
import "./assets/scss/style.scss";

// ** Service Worker
import * as serviceWorker from "./serviceWorker";
// ** Lazy load app
const LazyApp = lazy(() => import("./router/Router"));

const App = props => {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistStore(store)}>
          {/* <Router /> */}
          <Suspense fallback={<Spinner />}>
            <AbilityContext.Provider value={ability}>
              <ThemeContext>
                <IntlProviderWrapper>
                  <LazyApp />
                  <ToastContainer newestOnTop />
                </IntlProviderWrapper>
              </ThemeContext>
            </AbilityContext.Provider>
          </Suspense>
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;

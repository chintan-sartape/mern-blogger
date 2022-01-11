import { FC } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import Content from "./components/layout/content";

import { ToastContainer } from "react-toastify";

import store from "./redux/store";

const App: FC = () => {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <ToastContainer
            position="top-right"
            autoClose={5000}
          />
          <Content />
        </BrowserRouter>
      </Provider>
    </div>
  )
}

export default App

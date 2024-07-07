import React, { ReactNode } from "react";
import { render } from "@testing-library/react";
import { MemoryRouter, MemoryRouterProps } from "react-router-dom";
import { Provider } from "react-redux";
import { initStore } from "../src/client/store";
import { CartApi, ExampleApi } from "../src/client/api";

interface RenderHelperOptions {
  initialEntries?: string[];
}

export default function renderHelper(
  component: ReactNode,
  options: RenderHelperOptions = {}
) {
  const { initialEntries } = options;
  const basename = '/hw/store';
  const api = new ExampleApi(basename);
  const cart = new CartApi();
  const store = initStore(api, cart);

  return render(
    <MemoryRouter initialEntries={initialEntries || ['/']}>
      <Provider store={store}>
        { component }
      </Provider>
    </MemoryRouter>
  );
}

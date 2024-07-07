import React from "react";
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/jest-globals';
import { waitFor } from "@testing-library/react";
import { Home } from "../../src/client/pages/Home";
import { Application } from "../../src/client/Application";
import { Delivery } from "../../src/client/pages/Delivery";
import { Contacts } from "../../src/client/pages/Contacts";
import renderHelper from "../renderHelper";

describe('шапка', () => {
  it('название магазина в шапке является ссылкой на главную страницу', async () => {
    const { getByText } = renderHelper(<Application/>);

    await waitFor(() => {
      expect(getByText('Kogtetochka store').getAttribute('href')).toBe('/');
    });
  });

  it('в шапке отображаются ссылки на страницы магазина (каталог, доставка, контакты), а также ссылка на корзину', async () => {
    const { getByText } = renderHelper(<Application/>);

    await waitFor(() => {
      expect(getByText('Catalog').getAttribute('href')).toBe('/catalog');
      expect(getByText('Delivery').getAttribute('href')).toBe('/delivery');
      expect(getByText('Contacts').getAttribute('href')).toBe('/contacts');
      expect(getByText('Cart').getAttribute('href')).toBe('/cart');
    });
  });
});

describe('страницы приложения', () => {
  it('по роуту / отрисовывается страница Home', async () => {
    const { getByText } = renderHelper(<Application/>);

    const homeTitle = getByText('Welcome to Kogtetochka store!');
    expect(homeTitle).toBeInTheDocument();
  })
  it('главная страница статическая', async () => {
    const { container } = renderHelper(<Home/>);

    expect(container).toMatchSnapshot('главная страница');
  })

  it('по роуту /contacts отрисовывается страница Contacts', async () => {
    const { container } = renderHelper(<Application/>, { initialEntries: ['/contacts'] });

    const contactsTitle = await waitFor(() => container.querySelector('h1'));
    expect(contactsTitle?.textContent).toBe('Contacts');
  })
  it('страница контактов статическая', async () => {
    const { container } = renderHelper(<Contacts/>);

    expect(container).toMatchSnapshot('страница контактов');
  })

  it('по роуту /delivery отрисовывается страница Delivery', async () => {
    const { container } = renderHelper(<Application/>, { initialEntries: ['/delivery'] });

    const contactsTitle = await waitFor(() => container.querySelector('h1'));
    expect(contactsTitle?.textContent).toBe('Delivery');
  })
  it('страница условий доставки статическая', async () => {
    const { container } = renderHelper(<Delivery/>);

    expect(container).toMatchSnapshot('страница условий доставки');
  })

  it('по роуту /catalog отрисовывается страница Catalog', async () => {
    const { container } = renderHelper(<Application/>, { initialEntries: ['/catalog'] });

    const contactsTitle = await waitFor(() => container.querySelector('h1'));
    expect(contactsTitle?.textContent).toBe('Catalog');
  })

  it('по роуту /cart отрисовывается страница Cart', async () => {
    const { container } = renderHelper(<Application/>, { initialEntries: ['/cart'] });

    const contactsTitle = await waitFor(() => container.querySelector('h1'));
    expect(contactsTitle?.textContent).toBe('Shopping cart');
  })
});
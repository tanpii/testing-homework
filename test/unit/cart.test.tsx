import React from "react";
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/jest-globals';
import { Cart } from "../../src/client/pages/Cart";
import { CartApi } from "../../src/client/api";
import { CartState } from "../../src/common/types";
import {waitFor} from "@testing-library/react";
import events from "@testing-library/user-event";
import { Application } from "../../src/client/Application";
import renderHelper from "../renderHelper";


const cart: CartState = {
    1: { name: 'имя товара 1', count: 1, price: 1 },
    2: { name: 'имя товара 2', count: 2, price: 2 },
    3: { name: 'имя товара 3', count: 3, price: 3 },
};

describe('Корзина', () => {
  it('в шапке рядом со ссылкой на корзину отображается количество не повторяющихся товаров в ней', async () => {
    jest.spyOn(CartApi.prototype, 'getState').mockReturnValue(cart);
            
    const { container } = renderHelper(<Application/>);
    const cartLink = await waitFor(() => container.querySelector('[href="/cart"]'));
    const cartSize = Object.keys(cart).length;

    expect(cartLink?.textContent).toBe(`Cart (${cartSize})`);
  })

  it('в корзине отображается таблица с добавленными в нее товарами', async () => {
    jest.spyOn(CartApi.prototype, 'getState').mockReturnValue(cart);
    
    const { container } = renderHelper(<Cart/>);
    const cartBody = await waitFor(() => container.querySelectorAll('tbody tr'));

    expect(cartBody).toHaveLength(Object.keys(cart).length);
  })

  it('для каждого товара отображаются название, цена, количество , стоимость', async () => {
    jest.spyOn(CartApi.prototype, 'getState').mockReturnValue(cart);

    const {container} = renderHelper(<Cart/>);
    const cartProducts = await waitFor(() => container.querySelectorAll('tbody tr'));

    cartProducts.forEach((cartProduct, index) => {
      const realProduct = cart[index + 1];

      expect(cartProduct.querySelector('.Cart-Name')?.textContent).toEqual(realProduct.name);
      expect(cartProduct.querySelector('.Cart-Price')?.textContent).toEqual('$' + realProduct.price);
      expect(cartProduct.querySelector('.Cart-Count')?.textContent).toEqual(realProduct.count.toString());
      expect(cartProduct.querySelector('.Cart-Total')?.textContent).toEqual('$' + (realProduct.price * realProduct.count));
  });
  })

  it('отображается общая стоимость заказа', async () => {
    jest.spyOn(CartApi.prototype, 'getState').mockReturnValue(cart);
    const {container} = renderHelper(<Cart/>);
    
    const orderPrice = await waitFor(() => container.querySelector('.Cart-OrderPrice'));
    const realOrderPrice = Object.values(cart).reduce((total, product) => total + product.price * product.count, 0);

    expect(orderPrice?.textContent).toEqual('$' + realOrderPrice);
  })

  it('в корзине должна быть кнопка "очистить корзину", если в ней есть товары', async () => {
    jest.spyOn(CartApi.prototype, 'getState').mockReturnValue(cart);

    const {findByText} = renderHelper(<Cart/>);
    const clearButton = await findByText('Clear shopping cart');

    expect(clearButton).toBeInTheDocument();
  })

  it('в корзине не должно быть кнопки "очистить корзину", если в ней нет товаров', async () => {
    jest.spyOn(CartApi.prototype, 'getState').mockReturnValue({});

    const { queryByText } = renderHelper(<Cart />);
    const clearButton = queryByText('Clear shopping cart');

    expect(clearButton).not.toBeInTheDocument();
});

  it('при нажатии на кнопку "очистить корзину" товары удаляются', async () => {
    jest.spyOn(CartApi.prototype, 'getState').mockReturnValue(cart);
    
    const {findByText, container} = renderHelper(<Cart/>);
    const clearCartBtn = await findByText('Clear shopping cart');
    await events.click(clearCartBtn);
    const cartBody = await waitFor(() => container.querySelectorAll('tbody tr'));

    expect(cartBody).toHaveLength(0);
  })

  it('отображается ссылка на каталог товаров, если корзина пуста', async () => {
    jest.spyOn(CartApi.prototype, 'getState').mockReturnValue({});

    const {findByRole} = renderHelper(<Cart/>)
    const link = await findByRole('link');

    expect(link.getAttribute('href')).toBe('/catalog');
  })
})
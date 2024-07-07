import '@testing-library/jest-dom';
import '@testing-library/jest-dom/jest-globals';
import { waitFor } from "@testing-library/react";
import React from "react";
import { CartApi } from "../../src/client/api";
import { Catalog } from "../../src/client/pages/Catalog";
import renderHelper from "../renderHelper";
import axios from "axios";

const products = [
  { id: 1, name: 'имя товара 1', price: 1 },
  { id: 2, name: 'имя товара 2', price: 2 },
  { id: 3, name: 'имя товара 3', price: 3 }
];

describe('страница каталога товаров', () => {
  it('в каталоге отображаются товары, полученные с api', async () => {
    jest.spyOn(axios, 'get').mockResolvedValue({
      data: products
    });

    const { getAllByTestId } = renderHelper(<Catalog/>);

    await waitFor(() => {
      const product1 = getAllByTestId(1);
      const product2 = getAllByTestId(2);
      const product3 = getAllByTestId(3);

      expect(product1).toHaveLength(2);
      expect(product2).toHaveLength(2);
      expect(product3).toHaveLength(2);
    })
  })

  it('для каждого товара отображается название, цена и ссылка на страницу с подробной информацией', async () => {
    jest.spyOn(axios, 'get').mockResolvedValue({
      data: products
    });

    const { getByText, getAllByRole } = renderHelper(<Catalog />);

    await waitFor(() => {
      products.forEach(product => {
        const name = getByText(product.name);
        const price = getByText(`$${product.price}`);
        const link = getAllByRole('link').find(a => a.getAttribute('href') === `/catalog/${product.id}`);

        expect(name).toBeInTheDocument();
        expect(price).toBeInTheDocument();
        expect(link).toBeInTheDocument();
      });
    });
  });

  it('в каталоге отображается сообщение, если товар уже добавлен в корзину', async () => {
    jest.spyOn(CartApi.prototype, 'getState').mockReturnValue({1: {name: 'имя товара', price: 1, count: 1}});

    const {container} = renderHelper(<Catalog/>);

    await waitFor(() => {
        expect(container.querySelector('.ProductItem .CartBadge')).toBeInTheDocument();
    })
  })
})
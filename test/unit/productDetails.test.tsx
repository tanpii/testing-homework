import React from "react";
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/jest-globals';
import renderHelper from "../renderHelper";
import events from "@testing-library/user-event";
import { ProductDetails } from "../../src/client/components/ProductDetails";
import { waitFor } from "@testing-library/react";
import { Product } from "../../src/common/types";

const product : Product = {
  id: 1,
  name: 'имя товара 1',
  description: 'очень крутой товар 1',
  price: 1,
  color: 'цвет 1',
  material: 'материал 1'
}

describe('информация о товаре', () => {
  it('отображаются: название товара, его описание, цена, цвет, материал и кнопка "добавить в корзину"', async () => {
    const { getByText } = renderHelper(<ProductDetails product={product}/>);

    await waitFor(() => {
      expect(getByText(product.name)).toBeInTheDocument();
      expect(getByText(product.description)).toBeInTheDocument();
      expect(getByText(`$${product.price}`)).toBeInTheDocument();
      expect(getByText(product.color)).toBeInTheDocument();
      expect(getByText(product.material)).toBeInTheDocument();
      expect(getByText('Add to Cart')).toBeInTheDocument();
    })
  });

  it('если товар уже добавлен в корзину, должно отображаться сообщение об этом', async () => {
    const { container, getByText } = renderHelper(<ProductDetails product={product}/>);
    const addToCartBtn = getByText('Add to Cart');

    await events.click(addToCartBtn);

    await waitFor(() => {
      expect(container.querySelector('.CartBadge')).toBeInTheDocument();
    })
  });
});

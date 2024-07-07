import React from "react";
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/jest-globals';
import { Cart } from "../../src/client/pages/Cart";
import { CartApi } from "../../src/client/api";
import { CartState, CheckoutResponse } from "../../src/common/types";
import events from "@testing-library/user-event";
import { waitFor } from "@testing-library/react";
import axios from "axios";
import renderHelper from "../renderHelper";

const cart: CartState = {
    1: { name: 'имя товара 1', count: 1, price: 1 },
    2: { name: 'имя товара 2', count: 2, price: 2 },
    3: { name: 'имя товара 3', count: 3, price: 3 },
};

const response: {data: CheckoutResponse} = {
    data: { id: 1 }
} 

describe('форма оформления', () => {
    it('форма отрисовывается при наличии товаров в корзине', async () => {
        jest.spyOn(CartApi.prototype, 'getState').mockReturnValue(cart);
        jest.spyOn(axios, 'post').mockResolvedValue(response);

        const {container} = renderHelper(<Cart/>);

        const cartBody = await waitFor(() => container.querySelector('.Form'));

        expect(cartBody).toBeInTheDocument();
    })

    it('после нажатия на кнопку появляется сообщение об отправке', async () => {
        jest.spyOn(CartApi.prototype, 'getState').mockReturnValue(cart);
        jest.spyOn(axios, 'post').mockResolvedValue(response);

        const { container } = renderHelper(<Cart/>);

        const inputName = await waitFor(() => container.querySelector('#f-name'));
        const inputPhone = await waitFor(() => container.querySelector('#f-phone'));
        const inputAddress = await waitFor(() => container.querySelector('#f-address'));
        const submitButton = await waitFor(() => container.querySelector('.Form-Submit'));

        if (!inputName || !inputPhone || !inputAddress || !submitButton) {
            throw new Error('One of the required elements was not found');
        }

        await events.type(inputName, 'name');
        await events.type(inputPhone, '89999999999');
        await events.type(inputAddress, 'address');
        await events.click(submitButton);

        waitFor(async () => {
            expect(container.querySelector('.Cart-SuccessMessage')).toBeInTheDocument();
        });
    })

    it('ошибка появляется при неверном вводе имени', async () => {
        jest.spyOn(CartApi.prototype, 'getState').mockReturnValue(cart);

        const { findByText } = renderHelper(<Cart/>);

        const submitButton = await findByText('Checkout');
        await events.click(submitButton);
        const nameError = await findByText('Please provide your name');

        expect(nameError).toBeInTheDocument();
    })

    it('ошибка появляется при неверном вводе телефона', async () => {
        jest.spyOn(CartApi.prototype, 'getState').mockReturnValue(cart);

        const { findByText } = renderHelper(<Cart/>);

        const submitButton = await findByText('Checkout');
        await events.click(submitButton);
        const phoneError = await findByText('Please provide a valid phone');

        expect(phoneError).toBeInTheDocument();
    })

    it('ошибка появляется при неверном вводе адреса', async () => {
        jest.spyOn(CartApi.prototype, 'getState').mockReturnValue(cart);

        const { findByText } = renderHelper(<Cart/>);

        const submitButton = await findByText('Checkout');
        await events.click(submitButton);
        const addressError = await findByText('Please provide a valid address');

        expect(addressError).toBeInTheDocument();
        
    })
})

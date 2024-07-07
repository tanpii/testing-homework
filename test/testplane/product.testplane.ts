import { bug } from "../bug";

describe('', () => {
  it('если товар уже добавлен в корзину, повторное нажатие кнопки "добавить в корзину" должно увеличивает его количество', async ({browser}) => {
      await browser.url('/hw/store/catalog/0' + bug);
      const addButton = await browser.$('.ProductDetails-AddToCart');

      await addButton.click();
      await addButton.click();

      await browser.url('/hw/store/cart' + bug);

      const productCount= await browser.$('.Cart-Count');
      const productCountText = await productCount.getText();

      expect(productCountText).toEqual('2');
  })
})
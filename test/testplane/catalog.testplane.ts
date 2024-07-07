import { bug } from "../bug";

describe("страница каталога", () => {
  it("в каталоге отображаются данные товаров, приходящие с сервера", async ({browser}) => {
    await browser.url('hw/store/catalog' + bug);
    const products = await browser.$$('.ProductItem');

    for (const product of products) {
      const name = await product.$('.ProductItem-Name');
      const price = await product.$('.ProductItem-Price');
      const nameText = await name.getText();
      const priceText = await price.getText();
      expect(nameText).toBeTruthy();
      expect(priceText).toBeTruthy();
    }
  });
});
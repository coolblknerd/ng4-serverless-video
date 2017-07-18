import { Ng2ServerlessPage } from './app.po';

describe('ng2-serverless App', () => {
  let page: Ng2ServerlessPage;

  beforeEach(() => {
    page = new Ng2ServerlessPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});

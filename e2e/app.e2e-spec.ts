import { TurpinGalleryPage } from './app.po';

describe('turpin-gallery App', function() {
  let page: TurpinGalleryPage;

  beforeEach(() => {
    page = new TurpinGalleryPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

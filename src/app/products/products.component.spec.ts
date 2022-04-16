import {ProductsComponent} from './products.component';

describe('ProductsComponent', () => {
  let fixture: ProductsComponent;
  let httpMock;
  let productServiceMock;
  let routerMock;
  let dialogMock;
  let snackBarMock;
  let loaderMock;
  let translateMock;

  beforeEach(() => {
    loaderMock = {
      showFullLoader: jest.fn()
    };
    productServiceMock = {
      getProducts: jest.fn()
    };

    fixture = new ProductsComponent(
      httpMock,
      productServiceMock,
      routerMock,
      dialogMock,
      snackBarMock,
      loaderMock,
      translateMock
    );
  });

  describe('Setup component', () => {
    describe('ngOnInit', () => {
      it('should call executeLoad', () => {
        const executeLoadSpy = jest.spyOn(fixture, 'executeLoad');
        fixture.ngOnInit();
        expect(executeLoadSpy);
      });

      describe('executeLoad', () => {
        it('should call loader.showFullLoader', () => {
          fixture.executeLoad();
          expect(loaderMock.showFullLoader).toHaveBeenCalledWith();
        });

        it('should call productService.getProducts', () => {
          productServiceMock.getProducts.mockReturnValue(undefined);
          fixture.executeLoad();
          expect(productServiceMock.getProducts).toBeCalled();
        });

      });
    });

  });


  describe('', () => {

  });

});

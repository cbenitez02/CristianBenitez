import { ModalService } from "./modal.service";

describe("ModalService", () => {
  let service: ModalService;

  beforeEach(() => {
    service = new ModalService();
  });

  it('should emit showModal$ event when  openModal is called', done => {
    service.showModal$.subscribe(data => {
      expect(data).toEqual('test data');
      done();
    });
    
    service.openModal('test data');
  })

  it('should emit onConfirm$ event when onClickConfirm is called', done => {
    service.onConfirm$.subscribe(data => {
      expect(data).toEqual('test id');
      done();
    });

    service.onClickConfirm('test id');
  });

  it('should emit showModal$ event when closeModal is called', done => {
    service.showModal$.subscribe(data => {
      expect(data).toBeNull();
      done();
    });

    service.closeModal();
  });

});
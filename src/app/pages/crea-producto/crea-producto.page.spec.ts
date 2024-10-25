import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreaProductoPage } from './crea-producto.page';

describe('CreaProductoPage', () => {
  let component: CreaProductoPage;
  let fixture: ComponentFixture<CreaProductoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreaProductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

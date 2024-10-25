import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModProductoPage } from './mod-producto.page';

describe('ModProductoPage', () => {
  let component: ModProductoPage;
  let fixture: ComponentFixture<ModProductoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModProductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

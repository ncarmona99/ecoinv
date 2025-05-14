import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CreaProductoPage } from './crea-producto.page';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { CameraService } from 'src/app/services/camera/camera.service';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { of, throwError } from 'rxjs';

describe('CreaProductoPage', () => {
  let component: CreaProductoPage;
  let fixture: ComponentFixture<CreaProductoPage>;
  let productosServiceSpy: jasmine.SpyObj<ProductosService>;
  let cameraServiceSpy: jasmine.SpyObj<CameraService>;
  let navCtrlSpy: jasmine.SpyObj<NavController>;
  let toastCtrlSpy: jasmine.SpyObj<ToastController>;
  let loadingCtrlSpy: jasmine.SpyObj<LoadingController>;

  beforeEach(async () => {
    // Crear espías para los servicios inyectados
    productosServiceSpy = jasmine.createSpyObj('ProductosService', ['agregarProducto']);
    cameraServiceSpy = jasmine.createSpyObj('CameraService', ['takePicture']);
    navCtrlSpy = jasmine.createSpyObj('NavController', ['navigateBack']);
    toastCtrlSpy = jasmine.createSpyObj('ToastController', ['create']);
    loadingCtrlSpy = jasmine.createSpyObj('LoadingController', ['create']);

    await TestBed.configureTestingModule({
      declarations: [CreaProductoPage],
      providers: [
        { provide: ProductosService, useValue: productosServiceSpy },
        { provide: CameraService, useValue: cameraServiceSpy },
        { provide: NavController, useValue: navCtrlSpy },
        { provide: ToastController, useValue: toastCtrlSpy },
        { provide: LoadingController, useValue: loadingCtrlSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreaProductoPage);
    component = fixture.componentInstance;

    // Configurar el comportamiento del LoadingController
    loadingCtrlSpy.create.and.returnValue(
      Promise.resolve({
        present: jasmine.createSpy('present'),
        dismiss: jasmine.createSpy('dismiss'),
        // Mock other properties and methods of HTMLIonLoadingElement
        addEventListener: jasmine.createSpy('addEventListener'),
        removeEventListener: jasmine.createSpy('removeEventListener'),
        dispatchEvent: jasmine.createSpy('dispatchEvent'),
        // Add other properties as needed
      } as any)
    );
  });

  it('debería crearse el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el producto con valores por defecto', () => {
    expect(component.producto).toEqual({
      codproducto: null,
      descripcion: '',
      stock: 0,
      imagen: '',
    });
  });

  it('debería tomar una foto y asignarla al producto', async () => {
    const mockImagen = 'base64-image-data';
    cameraServiceSpy.takePicture.and.returnValue(Promise.resolve(mockImagen));

    await component.tomarFoto();

    expect(cameraServiceSpy.takePicture).toHaveBeenCalled();
    expect(component.producto.imagen).toBe(mockImagen);
  });

  it('debería manejar error al tomar una foto', async () => {
    cameraServiceSpy.takePicture.and.returnValue(Promise.reject('Error al tomar la foto'));
    spyOn(console, 'error');

    await component.tomarFoto();

    expect(console.error).toHaveBeenCalledWith('Error al tomar la foto:', 'Error al tomar la foto');
  });

  it('debería crear un producto exitosamente', fakeAsync(async () => {
    productosServiceSpy.agregarProducto.and.returnValue(Promise.resolve());
    const toastSpy = jasmine.createSpyObj('toast', ['present']);
    toastCtrlSpy.create.and.returnValue(Promise.resolve(toastSpy));

    await component.crearProducto();
    tick();

    expect(productosServiceSpy.agregarProducto).toHaveBeenCalledWith(component.producto);
    expect(toastCtrlSpy.create).toHaveBeenCalledWith({
      message: 'Producto agregado exitosamente',
      duration: 2000,
      color: 'success',
    });
    expect(toastSpy.present).toHaveBeenCalled();
    expect(navCtrlSpy.navigateBack).toHaveBeenCalledWith('/hub');
  }));

  it('debería manejar error al crear un producto', fakeAsync(async () => {
    productosServiceSpy.agregarProducto.and.returnValue(Promise.reject('Error'));
    const toastSpy = jasmine.createSpyObj('toast', ['present']);
    toastCtrlSpy.create.and.returnValue(Promise.resolve(toastSpy));

    await component.crearProducto();
    tick();

    expect(productosServiceSpy.agregarProducto).toHaveBeenCalled();
    expect(toastCtrlSpy.create).toHaveBeenCalledWith({
      message: 'Error al agregar producto',
      duration: 2000,
      color: 'danger',
    });
    expect(toastSpy.present).toHaveBeenCalled();
  }));
});
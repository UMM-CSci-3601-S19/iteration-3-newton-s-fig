import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MapsComponent } from './maps.component';
import {AgmCoreModule, MapsAPILoader} from "@agm/core";

describe('MapsComponent', () => {
  let component: MapsComponent;
  let fixture: ComponentFixture<MapsComponent>;

  let mapsApiLoaderServiceStub: {
    load: () => Promise<boolean>
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[AgmCoreModule],
      declarations: [ MapsComponent ],
      providers:[{ provide: MapsAPILoader,
        useValue: mapsApiLoaderServiceStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    mapsApiLoaderServiceStub = {
      load: () => {
        return new Promise(() => {
          return true;
        });
      }
    };
    fixture = TestBed.createComponent(MapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

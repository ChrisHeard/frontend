import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelbuilderComponent } from './modelbuilder.component';

describe('ModelbuilderComponent', () => {
  let component: ModelbuilderComponent;
  let fixture: ComponentFixture<ModelbuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelbuilderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModelbuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

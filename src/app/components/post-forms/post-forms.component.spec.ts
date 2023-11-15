import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostFormsComponent } from './post-forms.component';

describe('PostFormsComponent', () => {
  let component: PostFormsComponent;
  let fixture: ComponentFixture<PostFormsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostFormsComponent]
    });
    fixture = TestBed.createComponent(PostFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

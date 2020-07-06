import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InboxComponent } from './inbox.component';
import { SidebarDirectiveComponent } from 'app/directives/sidebar/sidebar.directive';
import { NoteItemDirectiveComponent } from 'app/directives/notes/note-item.directive';
import { EditorDirectiveComponent } from 'app/directives/notes/editor.directive';
import { QuillModule } from 'ngx-quill';

describe('InboxComponent', () => {
  let component: InboxComponent;
  let fixture: ComponentFixture<InboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InboxComponent, SidebarDirectiveComponent, NoteItemDirectiveComponent, EditorDirectiveComponent ],
      imports: [ QuillModule.forRoot() ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

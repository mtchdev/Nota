import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InboxComponent } from './inbox.component';
import { AppModule } from 'app/app.module';
import { MOCK_AUTH_PROVIDER } from 'app/providers/tests/auth.mock.service';

describe('InboxComponent', () => {
    let component: InboxComponent;
    let fixture: ComponentFixture<InboxComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ AppModule ],
            providers: [ MOCK_AUTH_PROVIDER ]
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

import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AppTopBarComponent } from './app.topbar.component';
import { AppBreadcrumbComponent } from './app.breadcrumb.component';
import { BreadcrumbService } from './breadcrumb.service';
import { AppFooterComponent } from './app.footer.component';
import { AppMenuComponent, AppSubMenuComponent } from './app.menu.component';
import { ScrollPanelModule} from 'primeng/primeng';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, ScrollPanelModule ],
      declarations: [
        AppComponent,
        AppTopBarComponent,
        AppMenuComponent,
        AppSubMenuComponent,
        AppFooterComponent,
          AppBreadcrumbComponent
      ],
        providers: [BreadcrumbService]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});

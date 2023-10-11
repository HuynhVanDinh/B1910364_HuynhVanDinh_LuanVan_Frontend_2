import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ForgotPasswordDialogComponent } from './forgot-password-dialog/forgot-password-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ProgressSpinnerOverlayComponent } from './progress-spinner-overlay/progress-spinner-overlay.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TestComponent } from './test/test.component';
import { MatButtonModule } from '@angular/material/button';
import { DonviComponent } from './donvi/donvi.component';
import { CanboComponent } from './canbo/canbo.component';
import { ErrorComponent } from './error/error.component';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './canbo/home/home.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatTreeModule } from '@angular/material/tree';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ChecktokenComponent } from './checktoken/checktoken.component';
import { BaidangComponent } from './canbo/baidang/baidang.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { CustomPaginatorIntl } from './custom-paginator-intl';
import { OpenwarningComponent } from './openwarning/openwarning.component';
import { ToastrModule } from 'ngx-toastr';
import { DialogbaidangComponent } from './canbo/dialog/dialogbaidang/dialogbaidang.component';
import { EditorModule } from 'primeng/editor';
import { NgxEditorModule } from 'ngx-editor';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HosothuctapComponent } from './canbo/hosothuctap/hosothuctap.component';
import { TrangThaiPipeComponent } from './trang-thai.pipe/trang-thai.pipe.component';
import { DialogPdfComponent } from './canbo/dialog/dialog-pdf/dialog-pdf.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordDialogComponent,
    ProgressSpinnerOverlayComponent,
    TestComponent,
    DonviComponent,
    CanboComponent,
    ErrorComponent,
    LayoutComponent,
    HomeComponent,
    ChecktokenComponent,
    BaidangComponent,
    OpenwarningComponent,
    DialogbaidangComponent,
    HosothuctapComponent,
    TrangThaiPipeComponent,
    DialogPdfComponent,
  ],
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    MatFormFieldModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatButtonModule,
    MatTreeModule,
    MatMenuModule,
    MatExpansionModule,
    MatToolbarModule,
    MatSidenavModule,
    MatPaginatorModule,
    MatTableModule,
    EditorModule,
    NgxEditorModule,
    MatCheckboxModule,
    NgxExtendedPdfViewerModule,
    ToastrModule.forRoot({
      timeOut: 1500, // Thiết lập thời gian tồn tại là 1,5 giây
      progressBar: true, // Hiển thị thanh tiến trình
      progressAnimation: 'increasing',
    }),
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useClass: CustomPaginatorIntl, // Sử dụng custom PaginatorIntl
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/translations/', '.json');
}

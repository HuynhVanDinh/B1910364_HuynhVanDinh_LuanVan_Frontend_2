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
import { HomeComponent } from './home/home.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatTreeModule } from '@angular/material/tree';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ChecktokenComponent } from './checktoken/checktoken.component';
import { BaidangComponent } from './donvi/baidang/baidang.component';
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
import { DialogbaidangComponent } from './donvi/dialog/dialogbaidang/dialogbaidang.component';
import { EditorModule } from 'primeng/editor';
import { NgxEditorModule } from 'ngx-editor';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HosothuctapComponent } from './donvi/hosothuctap/hosothuctap.component';
import { TrangThaiPipeComponent } from './trang-thai.pipe/trang-thai.pipe.component';
import { DialogPdfComponent } from './donvi/dialog/dialog-pdf/dialog-pdf.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { QlCanboComponent } from './donvi/ql-canbo/ql-canbo.component';
import { QlSinhvienthuctapComponent } from './donvi/ql-sinhvienthuctap/ql-sinhvienthuctap.component';
import { DialogCanboComponent } from './donvi/dialog/dialog-canbo/dialog-canbo.component';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MatSelectModule } from '@angular/material/select';
import { NgMaterialMultilevelMenuModule } from 'ng-material-multilevel-menu';
import { MultilevelMenuService } from 'ng-material-multilevel-menu';
import { DialogPhancongCanboComponent } from './donvi/dialog/dialog-phancong-canbo/dialog-phancong-canbo.component';
import { DanhsachPhancongComponent } from './donvi/danhsach-phancong/danhsach-phancong.component';
import { PhancongCanboComponent } from './donvi/phancong-canbo/phancong-canbo.component';
import { PickListModule } from 'primeng/picklist';
import { KnobModule } from 'primeng/knob';
import { DialogChangeComponent } from './donvi/dialog/dialog-change/dialog-change.component';
import { PhancongCongviecComponent } from './canbo/phancong-congviec/phancong-congviec.component';
import { MatTabsModule } from '@angular/material/tabs';
// import { NhomSinhvienComponent } from './canbo/nhom-sinhvien/nhom-sinhvien.component';
import { CongviecSinhvienComponent } from './canbo/congviec-sinhvien/congviec-sinhvien.component';
import { NhomSinhvienComponent } from './canbo/nhom-sinhvien/nhom-sinhvien.component';
import { DialogTuanComponent } from './canbo/dialog/dialog-tuan/dialog-tuan.component';
import { DialogCongviecComponent } from './canbo/dialog/dialog-congviec/dialog-congviec.component';
import { TagModule } from 'primeng/tag';
import { NgParticlesModule } from 'ng-particles';
import { DialogDuyetcongviecComponent } from './canbo/dialog/dialog-duyetcongviec/dialog-duyetcongviec.component';
import { DialogXoaDanhgiaComponent } from './canbo/dialog/dialog-xoa-danhgia/dialog-xoa-danhgia.component';
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
    QlCanboComponent,
    QlSinhvienthuctapComponent,
    DialogCanboComponent,
    PhancongCanboComponent,
    DialogPhancongCanboComponent,
    DanhsachPhancongComponent,
    DialogChangeComponent,
    PhancongCongviecComponent,
    // NhomSinhvienComponent,
    CongviecSinhvienComponent,
    NhomSinhvienComponent,
    DialogTuanComponent,
    DialogCongviecComponent,
    DialogDuyetcongviecComponent,
    DialogXoaDanhgiaComponent,
  ],
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    MatTabsModule,
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
    MatCardModule,
    RadioButtonModule,
    MatRadioModule,
    MatSelectModule,
    NgMaterialMultilevelMenuModule,
    PickListModule,
    KnobModule,
    TagModule,
    NgParticlesModule,
    ToastrModule.forRoot({
      timeOut: 1500, // Thiết lập thời gian tồn tại là 1,5 giây
      progressBar: true, // Hiển thị thanh tiến trình
      progressAnimation: 'increasing',
    }),
  ],
  providers: [
    MultilevelMenuService,
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

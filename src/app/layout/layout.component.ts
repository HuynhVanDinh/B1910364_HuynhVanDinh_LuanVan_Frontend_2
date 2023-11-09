import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  loggedInUser: any;
  isDrawerOpen: boolean = true;
  panelOpenState = false;
  currentLanguageImage: string = '../../assets/logo/vn.gif';
  username = localStorage.getItem('username');

  constructor(
    private translate: TranslateService,
    private authService: AuthService,
    private router: Router
  ) {
    translate.setDefaultLang('vn');
  }
  ngOnInit(): void {
    // this.dataSource.data = TREE_DATA;
    // Lấy thông tin tài khoản đã đăng nhập từ AuthService
    // this.loggedInUser = this.authService.getLoggedInUser();
    this.loggedInUser = { name: this.username };
    console.log(this.loggedInUser);
  }
  // hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  logout() {
    this.authService.logout().subscribe(
      (data) => {
        console.log('Logout successful:', data);
        // Redirect to login page or perform necessary actions.
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log('Logout error:', error);
      }
    );
  }
  closeDrawer() {
    this.isDrawerOpen = !this.isDrawerOpen;
    console.log(this.isDrawerOpen);
  }
  changeLanguage(language: string) {
    if (language === 'vn') {
      this.currentLanguageImage = '../../assets/logo/vn.gif';
    } else if (language === 'en') {
      this.currentLanguageImage = '../../assets/logo/en.png';
    }
    this.translate.use(language);
  }

  menuItems = [
    {
      label: 'Trang chủ',
      icon: 'home',
      link: '/unit',
      // externalRedirect: true,
      // hrefTargetType: '_blank',
    },
    {
      label: 'Sinh viên thực tập',
      link: '/unit/ql-sinhvienthuctap',
      icon: 'school',
    },
    {
      label: 'Danh mục',
      icon: 'bookmark_manager',
      items: [
        {
          label: 'Quản lý cán bộ',
          link: '/unit/ql-canbo',
          icon: 'person',
        },
        {
          label: 'Quản lý bài đăng',
          link: '/unit/baidang',
          icon: 'post_add',
        },
      ],
    },
    {
      label: 'Phân công cán bộ',
      link: '/unit/phancong',
      icon: 'assignment_turned_in',
    },
    {
      label: 'Hồ sơ thực tập',
      link: '/unit/hosothuctap',
      icon: 'inventory',
    },
  ];
  config = {
    interfaceWithRoute: true,
    paddingAtStart: true,
    classname: 'my-custom-class',
    listBackgroundColor: 'rgb(0, 122, 27)',
    fontColor: 'white',
    backgroundColor: 'rgb(0, 122, 27)',
    selectedListFontColor: '#ff5733',
  };
}

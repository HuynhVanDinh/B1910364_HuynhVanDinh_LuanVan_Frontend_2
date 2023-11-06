import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
// import {
//   MatTreeFlatDataSource,
//   MatTreeFlattener,
// } from '@angular/material/tree';
// import { FlatTreeControl } from '@angular/cdk/tree';
// interface FoodNode {
//   name: string;
//   children?: FoodNode[];
// }

// const TREE_DATA: FoodNode[] = [
//   {
//     name: 'Fruit',
//     children: [{ name: 'Apple' }, { name: 'Banana' }, { name: 'Fruit loops' }],
//   },
//   {
//     name: 'Vegetables',
//     children: [
//       {
//         name: 'Green',
//         children: [{ name: 'Broccoli' }, { name: 'Brussels sprouts' }],
//       },
//       {
//         name: 'Orange',
//         children: [{ name: 'Pumpkins' }, { name: 'Carrots' }],
//       },
//     ],
//   },
// ];
// interface ExampleFlatNode {
//   expandable: boolean;
//   name: string;
//   level: number;
// }
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

  // treeControl = new FlatTreeControl<ExampleFlatNode>(
  //   (node) => node.level,
  //   (node) => node.expandable
  // );
  // private _transformer = (node: FoodNode, level: number) => {
  //   return {
  //     expandable: !!node.children && node.children.length > 0,
  //     name: node.name,
  //     level: level,
  //   };
  // };
  // treeFlattener = new MatTreeFlattener(
  //   this._transformer,
  //   (node) => node.level,
  //   (node) => node.expandable,
  //   (node) => node.children
  // );

  // dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

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
      externalRedirect: true,
      // hrefTargetType: '_blank',
    },
    // {
    //   label: 'trang chủ',
    //   faIcon: 'fab fa-accusoft',
    //   items: [
    //     {
    //       label: 'Item 1.1',
    //       imageIcon: '/assets/imgs/danhmuc.png',
    //       link: '/unit/ql-sinhvienthuctap',
    //       // faIcon: 'fab fa-accusoft',
    //       externalRedirect: true,
    //     },
    //     {
    //       label: 'Item 1.2',
    //       faIcon: 'fab fa-accessible-icon',
    //       items: [
    //         {
    //           label: 'Item 1.2.1',
    //           link: '/item-1-2-1',
    //           faIcon: 'fas fa-allergies',
    //         },
    //         {
    //           label: 'Item 1.2.2',
    //           faIcon: 'fas fa-ambulance',
    //           items: [
    //             {
    //               label: 'Item 1.2.2.1',
    //               link: 'item-1-2-2-1',
    //               faIcon: 'fas fa-anchor',
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //   ],
    // },
    {
      label: 'Sinh viên thực tập',
      link: '/unit/ql-sinhvienthuctap',
      icon: 'school',
      externalRedirect: true,
    },
    {
      label: 'Danh mục',
      icon: 'bookmark_manager',
      items: [
        {
          label: 'Quản lý cán bộ',
          link: '/unit/ql-canbo',
          icon: 'person',
          externalRedirect: true,
        },
        {
          label: 'Quản lý bài đăng',
          link: '/unit/baidang',
          icon: 'post_add',
          externalRedirect: true,
        },
      ],
    },
    {
      label: 'Phân công cán bộ',
      link: '/unit/phancong',
      icon: 'inventory',
      externalRedirect: true,
    },
    {
      label: 'Hồ sơ thực tập',
      link: '/unit/hosothuctap',
      icon: 'inventory',
      externalRedirect: true,
    },
  ];
  config = {
    paddingAtStart: true,
    classname: 'my-custom-class',
    listBackgroundColor: 'rgb(0, 122, 27)',
    fontColor: 'white',
    backgroundColor: 'rgb(0, 122, 27)',
    selectedListFontColor: '#ff5733',
  };
}


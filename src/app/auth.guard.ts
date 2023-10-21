import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
  const requiredRoles = next.data['roles'] as string[];// Lấy danh sách vai trò yêu cầu từ dữ liệu tuyến đường

    if (this.authService.getAuthToken()) {
      // Người dùng đã đăng nhập
      switch (true) {
        case this.authService.hasRole('ROLE_UNIT') &&
          requiredRoles.includes('unit'):
          return true; // Người dùng có vai trò admin và trang yêu cầu vai trò admin
        case this.authService.hasRole('ROLE_CADRE') &&
          requiredRoles.includes('cadre'):
          return true; // Người dùng có vai trò user và trang yêu cầu vai trò user
        // Thêm các trường hợp khác tùy theo vai trò và trang
        default:
          return this.router.createUrlTree(['/error']); // Người dùng không có quyền truy cập, chuyển hướng đến trang lỗi
      }
    } else {
      // Người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
      return this.router.createUrlTree(['/login']);
    }
  }
}

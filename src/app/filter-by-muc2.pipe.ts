import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByMuc2',
})
export class FilterByMuc2Pipe implements PipeTransform {
  transform(items: any[], mucTen: string): any[] {
    return items.filter((item) => item.phieuDiemCanbo.mucDG.tenMuc === mucTen);
  }
}

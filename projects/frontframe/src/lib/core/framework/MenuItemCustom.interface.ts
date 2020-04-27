import { MenuItem } from 'primeng/primeng';

export interface MenuItemCustom extends MenuItem {

  mat_icon?: string;
  fa_icon?: string;
  args?: any;

}

import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

import { MenuConfig } from '../wireframes/app.menu.config';
import { MenuItemCustom } from './MenuItemCustom.interface';
import { FormComponent } from '../wireframes/app.form.component';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

    private menuConfig: MenuConfig;
    private refreshSource = new Subject();
    private itemsSource = new Subject<MenuItemCustom[]>();
    private menuConfigSource = new Subject<MenuConfig>();

    refreshHandler = this.refreshSource.asObservable();
    itemsHandler = this.itemsSource.asObservable();
    menuConfigHandler = this.menuConfigSource.asObservable();

    // TODO remover o metodo getOrCreateMenuConfig(), usar o metodos getMenuConfig(paramOpcional?)
    // com um parametro opcional para decidir se instancia um novo MenuConfig ou retorn null.
    getOrCreateMenuConfig(): MenuConfig {
        if (!this.menuConfig) {
            this.menuConfig = new MenuConfig();
        }
        else {
            this.menuConfig.destroy();
            this.menuConfig.showAll();
        }
        return this.menuConfig;
    }

    getNovoMenuConfig(context: FormComponent): MenuConfig {
      const novoMenuConfig = new MenuConfig().setContext(context);
      this.menuConfigSource.next(novoMenuConfig);
      return novoMenuConfig;
    }

    getMenuConfig(): MenuConfig {
      return this.menuConfig ? this.menuConfig
                             : new MenuConfig();
    }

    setItems(items: MenuItemCustom[]) {
        this.itemsSource.next(items);
    }

    setMenuConfig(item: MenuConfig) {
        this.menuConfigSource.next(item);
    }

    refresh() {
      this.setMenuConfig(this.getMenuConfig());
      // this.refreshSource.next();
    }
}

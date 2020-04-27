import { RouterLink } from '@angular/router';

import { FormComponent } from './app.form.component';
import { MenuItemCustom } from '../framework/MenuItemCustom.interface';


export class MenuConfig {

    public showNovo = true;
    public btNovoRouterLink: RouterLink;
    public showSalvar = true;
    public showExcluir = true;
    public showVoltar = true;
    private formComponent: FormComponent;
    private extraButtonsList: MenuItemCustom[];
    private extraWidgets: any[];

    public destroy() {
        this.formComponent = null;
        this.btNovoRouterLink = null;
        this.extraButtonsList = null;
        this.extraWidgets = null;
    }

    public setShowNovo(value: boolean, routerLink?: any): MenuConfig {
        this.showNovo = value;
        this.btNovoRouterLink = routerLink;
        return this;
    }
    public setShowSalvar(value: boolean): MenuConfig {
        this.showSalvar = value;
        return this;
    }
    public setShowExcluir(value: boolean): MenuConfig {
        this.showExcluir = value;
        return this;
    }
    public setShowVoltar(value: boolean): MenuConfig {
        this.showVoltar = value;
        return this;
    }

    public setContext(value: FormComponent): MenuConfig {
        this.formComponent = value;
        return this;
    }

    public getContext(): FormComponent {
        return this.formComponent;
    }

    public hideAll(): MenuConfig {
        return this
            .setShowExcluir(false)
            .setShowNovo(false)
            .setShowSalvar(false)
            .setShowVoltar(false)
            .removerExtraButtons();
    }

    public showAll(): MenuConfig {
        return this
            .setShowExcluir(true)
            .setShowNovo(true)
            .setShowSalvar(true)
            .setShowVoltar(true);
    }

    public setExtraButtons(menuItems: MenuItemCustom[]): MenuConfig {
        this.extraButtonsList = menuItems;
        return this;
    }

    public addExtraButtons(menuItems: MenuItemCustom[]): MenuConfig {
      if ( !menuItems ) {
        return;
      }
      if ( !this.extraButtonsList ) {
        this.extraButtonsList = [];
      }
      this.extraButtonsList = menuItems.concat(this.extraButtonsList);
      return this;
    }

    public removerExtraButtons(): MenuConfig {
      this.extraButtonsList = [];
      return this;
    }

    public getExtraButtonList(): MenuItemCustom[] {
        return this.extraButtonsList;
    }

    public addExtraWidgets(widget: any): MenuConfig {
        this.extraWidgets.push(widget);
        return this;
    }

    public getExtraWidgets(): any[] {
        return this.extraWidgets;
    }

    public getExtraButtonById(id: string) {
      if (this.extraButtonsList) {
        for (let i = 0; i < this.extraButtonsList.length; i++) {
          if (this.extraButtonsList[i].id === id) {
            return this.extraButtonsList[i];
          }
        }
      }
      return null;
    }
}

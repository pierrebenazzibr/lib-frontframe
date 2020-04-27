import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ToastyModule } from 'ng2-toasty';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { AccordionModule,
         PanelModule,
         ScrollPanelModule,
         InputTextModule,
         DropdownModule,
         InputSwitchModule,
         AutoCompleteModule,
         CalendarModule,
         TabViewModule,
         MultiSelectModule,
         InputTextareaModule,
         DialogModule,
         FieldsetModule,
         RadioButtonModule,
         CardModule,
         CheckboxModule,
         InputMaskModule
        } from 'primeng/primeng';

// import { AppMenuComponent } from './core/wireframes/app.menu.component';
// import { AppBreadcrumbComponent } from './core/wireframes/app.breadcrumb.component';
// import { AppTopBarComponent } from './core/wireframes/app.topbar.component';
// import { AppFooterComponent } from './core/wireframes/app.footer.component';
// import { CoreRoutingModule } from './core-routing.module';
import { ListaComponent } from './core/list/lista.component';
import { PopoverInputComponent } from './core/framework/popover-input/popover-input.component';
import { MyDatePipe } from './core/framework/pipes/mydate.pipe';
import { MyDatetimePipe } from './core/framework/pipes/mydatetime.pipe';
import { SafePipe } from './core/framework/pipes/safe.pipe';
import { ResultsetPipe } from './core/framework/pipes/resultset.pipe';
import { PopoverDropdownlistComponent } from './core/framework/popover-dropdownlist/popover-dropdownlist.component';
// import { AuthGuard } from '../seguranca/authguard';
import { ListHandlerService } from './core/list/list-handler.service';
import { ConfirmacaoComponent } from './core/confirmacao/confirmacao.component';
// import { ToasterService } from './core/framework/toaster/toaster.service';
// import { AmbienteService } from './core/multi-tenancy/ambiente.service';

@NgModule({
  imports: [
    CommonModule,
    // CoreRoutingModule,
    AccordionModule,
    PanelModule,
    ScrollPanelModule,
    TableModule,
    OverlayPanelModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
    InputSwitchModule,
    AutoCompleteModule,
    CalendarModule,
    ToastyModule.forRoot(),
    TabViewModule,
    MultiSelectModule,
    InputTextareaModule,
    DialogModule,
    FieldsetModule,
    RadioButtonModule,
    CheckboxModule,
    NgxQRCodeModule,
    InputMaskModule
  ],
  declarations: [
    ResultsetPipe,
    MyDatePipe,
    MyDatetimePipe,
    SafePipe,
    // AppMenuComponent,
    // AppBreadcrumbComponent,
    // AppTopBarComponent,
    // AppFooterComponent,
    ListaComponent,
    PopoverInputComponent,
    PopoverDropdownlistComponent,
    ConfirmacaoComponent
  ],
  exports: [
    CommonModule,
    RouterModule,
    ResultsetPipe,
    MyDatePipe,
    MyDatetimePipe,
    SafePipe,
    // AppMenuComponent,
    // AppBreadcrumbComponent,
    // AppTopBarComponent,
    // AppFooterComponent,
    AccordionModule,
    PanelModule,
    ScrollPanelModule,
    TableModule,
    OverlayPanelModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
    InputSwitchModule,
    AutoCompleteModule,
    CalendarModule,
    ListaComponent,
    PopoverInputComponent,
    PopoverDropdownlistComponent,
    ConfirmacaoComponent,
    ToastyModule,
    TabViewModule,
    MultiSelectModule,
    InputTextareaModule,
    DialogModule,
    FieldsetModule,
    RadioButtonModule,
    CardModule,
    CheckboxModule,
    NgxQRCodeModule,
    InputMaskModule
  ],
  providers: [
    // AuthGuard,
    ListHandlerService,
    ConfirmacaoComponent,
    DatePipe,
    // ToasterService,
    // AmbienteService,
  ]
})
export class FrontframeModule { }

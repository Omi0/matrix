import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { HomeComponent } from "../components/home/home.component";
import { SuccessComponent } from "../components/success/success.component";
import { AccessService } from "../services/access.service";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "success", component: SuccessComponent, canActivate: [AccessService] }
];

@NgModule({
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, {
      useHash: false
    })
  ],
  exports: [RouterModule]
})
export class RoutesModule {}

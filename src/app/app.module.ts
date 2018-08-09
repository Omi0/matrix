import { BrowserModule } from "@angular/platform-browser";
import { NgModule, Provider } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { SuccessComponent } from "./components/success/success.component";
import { RoutesModule } from "./routes/routes.module";
import {
  WidgetComponent,
  RepeatDirective
} from "./components/widget/widget.component";
import { AccessService } from "./services/access.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SuccessComponent,
    WidgetComponent,
    RepeatDirective
  ],
  imports: [BrowserModule, CommonModule, BrowserAnimationsModule, RoutesModule],
  providers: [AccessService],
  bootstrap: [AppComponent]
})
export class AppModule {}

import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";

if (environment.production) {
  enableProdMode();
}

setTimeout(() => {
  document.body.className += "app-loaded";
}, 10000);

setTimeout(() => {
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .then(() => {})
    .catch(err => console.log(err));
}, 12500);

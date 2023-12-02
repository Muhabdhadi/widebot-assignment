import {NgModule} from "@angular/core";
import {LoadingSpinnerComponent} from "./loading-spinner/loading-spinner.component";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    declarations: [LoadingSpinnerComponent],
    imports: [TranslateModule],
    exports: [LoadingSpinnerComponent, TranslateModule]
})
export class SharedModule {}

import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable, finalize, map, tap } from "rxjs";
import { LoadingOverlayService } from "./loading-overlay.service";

@Injectable()
export class ExampleInterceptorInterceptor implements HttpInterceptor {
  constructor(private service: LoadingOverlayService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const divKey = this.service.parentDom.value // Assuming you pass the div key in the custom header
    console.log(divKey,"INTERCEPTORS RECIEVING KEY");
    
    this.service.setLoading(divKey, true); // Set the loading flag for the specific div to true
    // this.service.show();
    // console.log(this.service.loaderC1.value);

    return next.handle(request).pipe(finalize(
      ()=>{
        this.service.setLoading(divKey, false);
        this.service.hide();
      }
    ));
  }
}

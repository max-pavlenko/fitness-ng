import {Injectable} from '@angular/core';
import {HotToastService} from "@ngneat/hot-toast";
import {Content} from "@ngneat/overview/lib/views/types";
import {FirebaseError} from "@firebase/util";
import {isFirebaseError} from "../types/firebase";

@Injectable({
   providedIn: 'root'
})
export class ToastService {
   constructor(private toast: HotToastService) {}

   async promise<T>(promise: Promise<T>, {loading, success, error}: {
      loading: Content,
      success: Content,
      error: (e: FirebaseError) => Content
   }): Promise<T | null> {
      const t = this.toast.loading(loading);

      try {
         const res = await promise;
         t.updateMessage(success);
         t.updateToast({type: 'success', duration: 3000});
         return res
      } catch (e) {
         isFirebaseError(e) && t.updateMessage(error(e))
         t.updateToast({type: 'error', duration: 5000});

         return null;
      }
   }
}

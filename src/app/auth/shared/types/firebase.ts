import {FirebaseError} from '@firebase/util';

export function isFirebaseError(e: unknown): e is FirebaseError {
   return !!e && e instanceof FirebaseError;
}

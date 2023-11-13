import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModuleLoaderService {
  $moduleloading = new BehaviorSubject<number>(0);

  constructor() { }
}

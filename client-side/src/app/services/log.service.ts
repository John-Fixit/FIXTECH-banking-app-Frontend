import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor() { }

  consoleLog(){
     return [
        {firstname: 'John', lastname: 'Fixit'},
        {firstname: 'Labade', lastname: 'Raphael'},
        {firstname: 'Adeoye', lastname: 'Adesewa'}
     ]
  }
}

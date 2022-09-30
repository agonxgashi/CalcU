import { Injectable } from '@angular/core';
import { ConverterModel } from '../models/converter.model';

@Injectable({
  providedIn: 'root'
})
export class ConverterService {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  private readonly LOCALSTORAGE_KEY = 'formulas';

  constructor() { }

  public saveFormulas(formulas: ConverterModel[]) {
    const json = JSON.stringify(formulas);
    localStorage.setItem(this.LOCALSTORAGE_KEY, json);
  }

  public getFormulas(): ConverterModel[] {
    const json = localStorage.getItem(this.LOCALSTORAGE_KEY);
    if (!json) {
      return [];
    }
    return JSON.parse(json) || [];
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { ConverterModel } from 'src/shared/models/converter.model';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {
  @Input() converter: ConverterModel;
  @Input() input: string;

  constructor() { }

  public get result(): string {
    if (this.input === '') {
      return '-';
    }

    const parsedFormula = this.formula;

    try {
      // eslint-disable-next-line no-eval
      return eval(parsedFormula);
    } catch (error) {
      return 'Invalid';
    }
  }

  public get formula(): string {
    return this.converter.formula.replaceAll('@x', this.input);
  }


  ngOnInit() {
  }

}

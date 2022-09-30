import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ConverterModel } from 'src/shared/models/converter.model';
import { ConverterService } from 'src/shared/services/converter.service';
import { SettingsComponent } from './settings/settings.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  input = '';
  result: number;
  converters: ConverterModel[] = [];

  convert1: ConverterModel = {
    title: 'Test 1',
    formula: '(@x + 1) * 2'
  };

  convert2: ConverterModel = {
    title: 'Test 2',
    formula: '@x * 3'
  };

  convert3: ConverterModel = {
    title: 'EUR to USD',
    formula: '@x * 0.98'
  };

  constructor(private modalCtrl: ModalController, private convertersService: ConverterService) {}

  ngOnInit(): void {
    this.converters = this.convertersService.getFormulas();
  }

  public registerInput(input: string) {
    if (input === '.') {
      if (this.input.indexOf('.') >= 0) {
        return;
      }

      if (this.input.length === 0) {
        this.input = '0';
      }
    }

    this.input += input;
  }

  public clear() {
    if (this.input.length === 0) {
      return;
    }

    this.input = this.input.substring(0, this.input.length - 1);
  }

  async openSettings(id?: string) {
    const modal = await this.modalCtrl.create({
      component: SettingsComponent,
      componentProps: { id }
    });

    modal.present();

    await modal.onWillDismiss();
    this.converters = this.convertersService.getFormulas();
  }
}

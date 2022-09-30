import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ConverterModel } from 'src/shared/models/converter.model';
import { ConverterService } from 'src/shared/services/converter.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public converter: ConverterModel;
  public id: string;
  private isEdit = false;
  constructor(private modalCtrl: ModalController, private conerterService: ConverterService) { }

  ngOnInit() {
    this.processData(this.id);
  }

  public save() {
    const converters = this.conerterService.getFormulas();
    const editingItem = converters.findIndex(c => c.id === this.converter.id);
    if (editingItem >= 0) {
      converters[editingItem] = this.converter;
    } else {
      converters.push(this.converter);
    }
    this.conerterService.saveFormulas(converters);
    this.close();
  }

  public delete() {
    const converters = this.conerterService.getFormulas();
    const editingItem = converters.findIndex(c => c.id === this.converter.id);
    converters.splice(editingItem, 1);
    this.conerterService.saveFormulas(converters);
    this.close();
  }

  public close() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  private processData(id: string) {
    console.log(id);
    if (id) {
      const converters = this.conerterService.getFormulas();
      this.converter = converters.find(c => c.id === id);
      this.isEdit = true;
    } else {
      this.converter = {
        id: new Date().getTime().toString(),
        title: '',
        formula: '@x + 3'
      };
    }
  }
}

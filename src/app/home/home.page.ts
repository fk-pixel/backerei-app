import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  notes = [];

  constructor(private dataService: DataService, private alertCtrl: AlertController, private modalCtrl: ModalController) {
    this.dataService.getNotes().subscribe(res => {
      console.log(res);
      this.notes = res;
    });
  }
  async openNote(note: any) {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps: {id: note.id},
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.5
    });
    modal.present();
  }

  async addNote() {
    const alert = await this.alertCtrl.create({
      cssClass: "my-custom-class",
      header: 'Neues Rezept hinzufügen',
      inputs: [
        {
          name: 'title',
          placeholder: 'Eingeben Ihre Title...',
          type: 'text'
        },
        {
          name: 'zubereitung',
          placeholder: 'Erzählen Ihre Zubereitung...',
          type: 'text'
        },
        {
          name: 'zutaten',
          placeholder: 'Hinzufügen den Zutaten des Rezeptes...',
          type: 'text'
        },
        {
          name: 'bild',
          placeholder: 'Hinzufügen ein Foto für das Rezept...',
          type: 'text'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: (res) => {
            this.dataService.addNote(
              {
                title: res.title,
                zubereitung: res.zubereitung,
                zutaten: res.zutaten,
                bild: res.bild
              }
            );
          }
        },
      ]
    });
    await alert.present();
  }
}

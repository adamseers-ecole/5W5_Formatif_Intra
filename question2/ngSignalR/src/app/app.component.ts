import { Component } from '@angular/core';
import * as signalR from "@microsoft/signalr"
import { MatButtonModule } from '@angular/material/button';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [MatButtonModule]
})
export class AppComponent {
  title = 'Pizza Hub';

  private hubConnection?: signalR.HubConnection;
  isConnected: boolean = false;

  selectedChoice: number = -1;
  nbUsers: number = 0;

  pizzaPrice: number = 0;
  money: number = 0;
  nbPizzas: number = 0;

  constructor(){
    this.connect();
  }

  connect() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5282/hubs/pizza')
      .build();

    this.hubConnection!.on('UpdateNbUsers', (data) => {
        // data a le même type que ce qui a été envoyé par le serveur
        this.nbUsers = data;
        console.log(data);
    });
    this.hubConnection!.on('UpdateMoney', (data) => {
        // data a le même type que ce qui a été envoyé par le serveur
        this.money = data;
        console.log(data);
    });
    this.hubConnection!.on('UpdateNbPizzasAndMoney', (pizza, money) => {
        // data a le même type que ce qui a été envoyé par le serveur
        this.money = money;
        this.nbPizzas = pizza;
        console.log(pizza + money);
    });
    this.hubConnection!.on('UpdatePizzaPrice', (data) => {
        // data a le même type que ce qui a été envoyé par le serveur
        this.pizzaPrice = data;
        console.log(data);
    });

    this.hubConnection
        .start()
        .then(() => {
            console.log('La connexion est active!');
            // TODO: Mettre isConnected à true seulement une fois que la connection au Hub est faite
            this.isConnected = true;
          })
        .catch(err => console.log('Error while starting connection: ' + err));

  }

  selectChoice(selectedChoice:number) {
    //-	UpdateNbUsers
    this.hubConnection!.invoke('SelectChoice', selectedChoice);
    this.selectedChoice = selectedChoice;
  }

  unselectChoice() {
    //-	UpdateNbUsers 
    this.hubConnection!.invoke('UnselectChoice', this.selectedChoice);
    this.selectedChoice = -1;
  }

  addMoney() {
    //-	UpdateMoney
    this.hubConnection!.invoke('AddMoney', this.selectedChoice);
  }

  buyPizza() {
    //-	UpdateNbPizzasAndMoney
    //-	UpdatePizzaPrice
    this.hubConnection!.invoke('BuyPizza', this.selectedChoice);
  }
}

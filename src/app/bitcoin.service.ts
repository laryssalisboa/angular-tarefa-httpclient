import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface Resposta {
  time: {
    updated: string; 
  };
  disclaimer: string;
  bpi: {
    [key in 'USD' | 'GBP' | 'EUR']: {
      symbol: string;
      description: string;
      rate_float: number;
      rate: string;
    };
  };
}


interface PriceUpdate {
  timestamp: Date;
  USD: number;
  GBP: number;
  EUR: number;
}

@Injectable()
export class BitcoinService {
  currentPrice: Resposta; 
  lastUpdate: Date;

  updateList: Array<PriceUpdate> = [];

  constructor(private http: HttpClient) {}

  getAndUpdate() {
    this.http
      .get<Resposta>('https://api.coindesk.com/v1/bpi/currentprice.json')
      .subscribe((data) => {
        this.lastUpdate = new Date();
        this.currentPrice = data;
        this.updateList.push({
          timestamp: this.lastUpdate,
          USD: this.currentPrice.bpi.USD.rate_float,
          GBP: this.currentPrice.bpi.GBP.rate_float,
          EUR: this.currentPrice.bpi.EUR.rate_float,
        });
      });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


interface Resposta {
  
  id: number;
  full_name: string;
}

@Injectable()
export class GithubService {
  itens: Array<Resposta> = [];

  constructor(private http: HttpClient) {}

  
  getAll() {
    this.http
      .get<Array<Resposta>>('https://api.github.com/users/larguesa/repos')
      .subscribe((data) => {
        this.itens = data;
      });
  }
}

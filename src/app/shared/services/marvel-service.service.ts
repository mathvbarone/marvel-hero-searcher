import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Md5 } from 'ts-md5/dist/md5';

import { Observable } from 'rxjs';
import { Marvel } from '../models/marvel';
import { Results } from '../models/results';


@Injectable({
  providedIn: 'root',
})

export class MarvelService {
  private _publicKey = 'c4b5296bc35888971631d22848916410';
  private _privateKey = 'fddd97e16368b2fee706a1f6de69f30f191467d3';

  constructor(private http: HttpClient) {
  }

  private getHash(timeStamp: string): string {
    const hashGenerator: Md5 = new Md5();
    hashGenerator.appendStr(timeStamp);
    hashGenerator.appendStr(this._privateKey);
    hashGenerator.appendStr(this._publicKey);
    const hash: string = hashGenerator.end().toString();
    return hash;
  }

  private getTimeStamp(): string {
    return new Date().valueOf().toString();
  }


  getCharacters(limit = 10, nameStarts: string) {
    const timeStamp = this.getTimeStamp();
    const hash = this.getHash(timeStamp);

    const marvelCharacterUrl = 'https://gateway.marvel.com:443/v1/public/characters';
    const nameStartsUrl = `?nameStartsWith=${nameStarts}`;
    const orderByUrl = `&orderBy=-modified`;
    const limitUrl = `&limit=${limit}`;
    const hashUrl = `&ts=${timeStamp}&apikey=${this._publicKey}&hash=${hash}`;
    const requestUrl = `${marvelCharacterUrl}${nameStartsUrl}${orderByUrl}${limitUrl}${hashUrl}`;

    return this.http.get<Marvel>(requestUrl)
      .pipe(map(res => res.data.results.map(this.parseHeroes)));
  }

  parseHeroes(info: any) {
    const results: Partial<Results> = {};

    results.name = info.name;
    results.description = info.description;
    results.thumbnail = info.thumbnail;
    results.urls = info.urls;

    return results as Results;

  }

}

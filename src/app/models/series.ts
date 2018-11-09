import { Items } from './items';

export class Series {
  available: string;
  returned: string;
  collectionURI: string;
  items: Array<Items> = [];
}

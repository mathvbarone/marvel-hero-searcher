import { Items } from './items';

export class Stories {
  available: string;
  returned: string;
  collectionURI: string;
  items: Array<Items> = [];
}


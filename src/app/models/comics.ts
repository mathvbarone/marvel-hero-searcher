import { Items } from './items';

export class Comics {
	available: string;
	returned: string;
	collectionURI: string;
	items: Array<Items> = [];
}


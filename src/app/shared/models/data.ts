import { Results } from './results';

export class Data {
  offset: string;
  limit: string;
  total: string;
  count: string;
  results: Array<Results> = [];
}


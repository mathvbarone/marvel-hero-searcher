import { Urls } from './urls';
import { Thumbnail } from './thumbnail';
import { Comics } from './comics';
import { Stories } from './stories';
import { Events } from './events';
import { Series } from './series';

export class Results {
  id: string;
  name: string;
  description: string;
  modified: string;
  resourceURI: string;
  thumbnail: Thumbnail;
  comics: Comics;
  stories: Stories;
  events: Events;
  series: Series;
  urls: Array<Urls> = [];
}


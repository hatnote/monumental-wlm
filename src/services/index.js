import campaigns from './campaigns.service';
import lang from './lang.service';
import login from './login.service';
import map from './map.service';
import theme from './theme.service';
import wiki from './wiki.service';
import wikidata from './wikidata.service';
import text from './text.service';


export default () => {
  campaigns();
  lang();
  login();
  map();
  theme();
  wiki();
  wikidata();
  text();
};

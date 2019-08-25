import "./country.scss";
import template from "./country.html";

import pack from "../../../../package.json";

const CountryComponent = { controller, template };

function controller(
  $filter,
  $mdToast,
  $state,
  $stateParams,
  $window,
  WikiService,
  langService,
  mapService,
  wikidata
) {
  const vm = this;
  const langs = langService.getUserLanguages();

  vm.stateParams = $stateParams;

  const ireland = [
    {
      name: "Connacht",
      parts: [
        { name: "Galway", coordinates: "53.3333:-9.0:11" },
        { name: "Leitrim", coordinates: "54.1167:-8.0:11" },
        { name: "Mayo", coordinates: "53.9:-9.25:11" },
        { name: "Roscommon", coordinates: "53.75:-8.25:11" },
        { name: "Sligo", coordinates: "54.25:-8.6667:11" }
      ]
    },
    {
      name: "Leinster",
      parts: [
        { name: "Carlow", coordinates: "52.6667:-6.8333:11" },
        { name: "Dublin", coordinates: "53.4167:-6.25:11" },
        { name: "Kildare", coordinates: "53.1667:-6.75:11" },
        { name: "Kilkenny", coordinates: "52.5833:-7.25:11" },
        { name: "Laois", coordinates: "53.0:-7.4:11" },
        { name: "Longford", coordinates: "53.6667:-7.75:11" },
        { name: "Louth", coordinates: "53.8333:-6.5:11" },
        { name: "Meath", coordinates: "53.6667:-6.6667:11" },
        { name: "Offaly", coordinates: "53.25:-7.5:11" },
        { name: "Westmeath", coordinates: "53.5:-7.5:11" },
        { name: "Wexford", coordinates: "52.5:-6.6667:11" },
        { name: "Wicklow", coordinates: "53.0:-6.4167:11" }
      ]
    },
    {
      name: "Munster",
      parts: [
        { name: "Clare", coordinates: "52.8333:-9.0:11" },
        { name: "Cork", coordinates: "51.9667:-8.5833:11" },
        { name: "Kerry", coordinates: "52.1667:-9.75:11" },
        { name: "Limerick", coordinates: "52.5:-8.75:11" },
        { name: "Tipperary", coordinates: "52.6667:-7.8333:11" },
        { name: "Waterford", coordinates: "52.25:-7.5:11" }
      ]
    },
    {
      name: "Ulster",
      parts: [
        { name: "Cavan", coordinates: "53.9167:-7.25:11" },
        { name: "Donegal", coordinates: "54.917:-8.0:11" },
        { name: "Monaghan", coordinates: "54.244:-7.04:11" }
      ]
    }
  ];

  const uk = [
    {
      name: "",
      parts: [
        { name: "England", coordinates: "52.6:-1.14:7" },
        { name: "Scotland", coordinates: "56.4:-4.0:7" },
        { name: "Wales", coordinates: "52.3:-3.6:7" },
        { name: "Northern Ireland", coordinates: "54.6:-6.7:8" }
      ]
    }
  ];

  const us = [
    {
      name: "",
      parts: [
        { name: "Alabama", coordinates: "32.7:-86.7:6" },
        { name: "Alaska", coordinates: "64.0:-150.0:6" },
        { name: "Arizona", coordinates: "34.286667:-111.656944:6" },
        { name: "Arkansas", coordinates: "34.8:-92.2:6" },
        { name: "California", coordinates: "37.0:-120.0:6" },
        { name: "Colorado", coordinates: "39.0:-105.5:6" },
        { name: "Connecticut", coordinates: "41.6:-72.7:6" },
        { name: "Delaware", coordinates: "39.0:-75.5:6" },
        { name: "Florida", coordinates: "28.133333333:-81.631666666:6" },
        { name: "Georgia", coordinates: "33.0:-83.5:6" },
        { name: "Hawaii", coordinates: "21.311388888:-157.796388888:6" },
        { name: "Idaho", coordinates: "45.0:-114.0:6" },
        { name: "Illinois", coordinates: "40.0:-89.0:6" },
        { name: "Indiana", coordinates: "39.933333333:-86.216666666:6" },
        { name: "Iowa", coordinates: "42.0:-93.0:6" },
        { name: "Kansas", coordinates: "38.5:-98.0:6" },
        { name: "Kentucky", coordinates: "37.5:-85.0:6" },
        { name: "Louisiana", coordinates: "31.0:-92.0:6" },
        { name: "Maine", coordinates: "45.5:-69.0:6" },
        { name: "Maryland", coordinates: "39.0:-76.7:6" },
        { name: "Massachusetts", coordinates: "42.3:-71.8:6" },
        { name: "Michigan", coordinates: "44.34:-85.58:6" },
        { name: "Minnesota", coordinates: "46.0:-94.0:6" },
        { name: "Mississippi", coordinates: "33.0:-90.0:6" },
        { name: "Missouri", coordinates: "38.5:-92.5:6" },
        { name: "Montana", coordinates: "47.0:-110.0:6" },
        { name: "Nebraska", coordinates: "41.5:-100.0:6" },
        { name: "Nevada", coordinates: "39.0:-117.0:6" },
        { name: "New Hampshire", coordinates: "44.0:-71.5:6" },
        { name: "New Jersey", coordinates: "40.0:-74.5:6" },
        { name: "New Mexico", coordinates: "34.0:-106.0:6" },
        { name: "New York", coordinates: "43.0:-75.0:6" },
        { name: "North Carolina", coordinates: "35.5:-80.0:6" },
        { name: "North Dakota", coordinates: "47.5:-100.5:6" },
        { name: "Ohio", coordinates: "40.5:-82.5:6" },
        { name: "Oklahoma", coordinates: "35.5:-98.0:6" },
        { name: "Oregon", coordinates: "43.935833:-120.575:6" },
        { name: "Pennsylvania", coordinates: "41.0:-77.5:6" },
        { name: "Rhode Island", coordinates: "41.7:-71.5:6" },
        { name: "South Carolina", coordinates: "34.0:-81.0:6" },
        { name: "South Dakota", coordinates: "44.5:-100.0:6" },
        { name: "Tennessee", coordinates: "36.0:-86.0:6" },
        { name: "Texas", coordinates: "31.0:-100.0:6" },
        { name: "Utah", coordinates: "39.5:-111.5:6" },
        { name: "Vermont", coordinates: "44.0:-72.7:6" },
        { name: "Virginia", coordinates: "37.5:-79.0:6" },
        { name: "Washington", coordinates: "47.5:-120.5:6" },
        { name: "West Virginia", coordinates: "39.0:-80.5:6" },
        { name: "Wisconsin", coordinates: "44.5:-89.5:6" },
        { name: "Wyoming", coordinates: "43.0:-107.5:6" }
      ]
    }
  ];

  const fr = [
    {
      name: "Auvergne-Rhône-Alpes",
      parts: [
        {
          name: "Ain",
          coordinates: "46.083333333:5.333333333:9"
        },
        {
          name: "Allier",
          coordinates: "46.333333333:3.166666666:9"
        },
        {
          name: "Ardèche",
          coordinates: "44.666666666:4.416666666:9"
        },
        {
          name: "Cantal",
          coordinates: "45.033333333:3.1:9"
        },
        {
          name: "Drôme",
          coordinates: "44.75:5.166666666:9"
        },
        {
          name: "Isère",
          coordinates: "45.333333333:5.5:9"
        },
        {
          name: "Loire",
          coordinates: "45.439722222:4.387777777:9"
        },
        {
          name: "Haute-Loire",
          coordinates: "45.0:4.0:9"
        },
        {
          name: "Puy-de-Dôme",
          coordinates: "45.7:3.216666666:9"
        },
        {
          name: "Rhône",
          coordinates: "45.751944444:4.822777777:9"
        },
        {
          name: "Savoie",
          coordinates: "45.583333333:6.333333333:9"
        },
        {
          name: "Haute-Savoie",
          coordinates: "46.0:6.333333333:9"
        }
      ]
    },
    {
      name: "Hauts-de-France",
      parts: [
        {
          name: "Aisne",
          coordinates: "49.5:3.5:9"
        },
        {
          name: "Nord",
          coordinates: "50.621388888:3.032222222:9"
        },
        {
          name: "Oise",
          coordinates: "49.383333333:2.416666666:9"
        },
        {
          name: "Pas-de-Calais",
          coordinates: "50.95:1.85:9"
        },
        {
          name: "Somme",
          coordinates: "49.883333333:2.416666666:9"
        }
      ]
    },
    {
      name: "Provence-Alpes-Côte d'Azur",
      parts: [
        {
          name: "Alpes-de-Haute-Provence",
          coordinates: "44.095277777:6.24:9"
        },
        {
          name: "Hautes-Alpes",
          coordinates: "44.666666666:6.333333333:9"
        },
        {
          name: "Alpes-Maritimes",
          coordinates: "43.833333333:7.166666666:9"
        },
        {
          name: "Bouches-du-Rhône",
          coordinates: "43.5:5.083333333:9"
        },
        {
          name: "Var",
          coordinates: "43.400833333:6.21:9"
        },
        {
          name: "Vaucluse",
          coordinates: "44.0:5.166666666:9"
        }
      ]
    },
    {
      name: "Grand Est",
      parts: [
        {
          name: "Ardennes",
          coordinates: "49.578611111:4.586666666:9"
        },
        {
          name: "Aube",
          coordinates: "48.333333333:4.166666666:9"
        },
        {
          name: "Marne",
          coordinates: "49.0:4.25:9"
        },
        {
          name: "Haute-Marne",
          coordinates: "48.083333333:5.25:9"
        },
        {
          name: "Meurthe-et-Moselle",
          coordinates: "48.666666666:6.166666666:9"
        },
        {
          name: "Meuse",
          coordinates: "48.965555555:5.377777777:9"
        },
        {
          name: "Moselle",
          coordinates: "49.033889:6.661944:9"
        },
        {
          name: "Bas-Rhin",
          coordinates: "48.816666666:7.783333333:9"
        },
        {
          name: "Haut-Rhin",
          coordinates: "47.964167:7.319722:9"
        },
        {
          name: "Vosges",
          coordinates: "48.166666666:6.416666666:9"
        }
      ]
    },
    {
      name: "Occitanie",
      parts: [
        {
          name: "Ariège",
          coordinates: "43.0:1.5:9"
        },
        {
          name: "Aude",
          coordinates: "43.083333333:2.416666666:9"
        },
        {
          name: "Aveyron",
          coordinates: "44.25:2.7:9"
        },
        {
          name: "Gard",
          coordinates: "44.128055555:4.081666666:9"
        },
        {
          name: "Haute-Garonne",
          coordinates: "43.416666666:1.5:9"
        },
        {
          name: "Gers",
          coordinates: "43.65:0.583333333:9"
        },
        {
          name: "Hérault",
          coordinates: "43.35:3.216666666:9"
        },
        {
          name: "Lot",
          coordinates: "44.558888888:1.576388888:9"
        },
        {
          name: "Lozère",
          coordinates: "44.333333333:3.6:9"
        },
        {
          name: "Hautes-Pyrénées",
          coordinates: "43.2:0.133333333:9"
        },
        {
          name: "Pyrénées-Orientales",
          coordinates: "42.5:2.75:9"
        },
        {
          name: "Tarn",
          coordinates: "43.909722222:2.109166666:9"
        },
        {
          name: "Tarn-et-Garonne",
          coordinates: "44.0:1.333333333:9"
        }
      ]
    },
    {
      name: "Normandie",
      parts: [
        {
          name: "Calvados",
          coordinates: "49.033333333:0.25:9"
        },
        {
          name: "Eure",
          coordinates: "49.083333333:1.0:9"
        },
        {
          name: "Manche",
          coordinates: "49.05:-1.25:9"
        },
        {
          name: "Orne",
          coordinates: "48.7:0.0:9"
        },
        {
          name: "Seine-Maritime",
          coordinates: "49.666666666:0.833333333:9"
        }
      ]
    },
    {
      name: "Nouvelle-Aquitaine",
      parts: [
        {
          name: "Charente",
          coordinates: "45.833333333:0.333333333:9"
        },
        {
          name: "Charente-Maritime",
          coordinates: "45.95:-0.966666666:9"
        },
        {
          name: "Corrèze",
          coordinates: "45.333333333:1.833333333:9"
        },
        {
          name: "Creuse",
          coordinates: "46.583333333:2.05:9"
        },
        {
          name: "Dordogne",
          coordinates: "45.0:0.666666666:9"
        },
        {
          name: "Gironde",
          coordinates: "44.833333333:-0.666666666:9"
        },
        {
          name: "Landes",
          coordinates: "43.878055555:-0.867777777:9"
        },
        {
          name: "Lot-et-Garonne",
          coordinates: "44.333333333:0.5:9"
        },
        {
          name: "Pyrénées-Atlantiques",
          coordinates: "43.25:-0.833333333:9"
        },
        {
          name: "Deux-Sèvres",
          coordinates: "46.5:0.333333333:9"
        },
        {
          name: "Vienne",
          coordinates: "46.581388888:0.340555555:9"
        },
        {
          name: "Haute-Vienne",
          coordinates: "45.833333333:1.266666666:9"
        }
      ]
    },
    {
      name: "Centre-Val de Loire",
      parts: [
        {
          name: "Cher",
          coordinates: "47.081111111:2.444444444:9"
        },
        {
          name: "Eure-et-Loir",
          coordinates: "48.333333333:1.416666666:9"
        },
        {
          name: "Indre",
          coordinates: "46.766666666:1.6:9"
        },
        {
          name: "Indre-et-Loire",
          coordinates: "47.25:0.666666666:9"
        },
        {
          name: "Loir-et-Cher",
          coordinates: "47.266666666:0.666666666:9"
        },
        {
          name: "Loiret",
          coordinates: "47.916666666:2.166666666:9"
        }
      ]
    },
    {
      name: "Bourgogne-Franche-Comté",
      parts: [
        {
          name: "Côte-d'Or",
          coordinates: "47.416666666:4.833333333:9"
        },
        {
          name: "Doubs",
          coordinates: "47.166666666:6.416666666:9"
        },
        {
          name: "Jura",
          coordinates: "46.83333:5.83333:9"
        },
        {
          name: "Nièvre",
          coordinates: "47.083333333:3.5:9"
        },
        {
          name: "Haute-Saône",
          coordinates: "47.583333333:6.0:9"
        },
        {
          name: "Saône-et-Loire",
          coordinates: "46.666666666:4.7:9"
        },
        {
          name: "Yonne",
          coordinates: "47.8:3.566666666:9"
        },
        {
          name: "Territoire de Belfort",
          coordinates: "47.75:7.0:10"
        }
      ]
    },
    {
      name: "Bretagne",
      parts: [
        {
          name: "Côtes-d'Armor",
          coordinates: "48.333333333:-2.833333333:9"
        },
        {
          name: "Finistère",
          coordinates: "48.25:-4.0:9"
        },
        {
          name: "Ille-et-Vilaine",
          coordinates: "48.166666666:-1.666666666:9"
        },
        {
          name: "Morbihan",
          coordinates: "47.833333333:-2.833333333:9"
        }
      ]
    },
    {
      name: "Corse",
      parts: [
        {
          name: "Corse-du-Sud",
          coordinates: "41.85:9.033333333:9"
        },
        {
          name: "Haute-Corse",
          coordinates: "42.466666666:9.2:9"
        }
      ]
    },
    {
      name: "Pays de la Loire",
      parts: [
        {
          name: "Loire-Atlantique",
          coordinates: "47.333333333:-1.666666666:9"
        },
        {
          name: "Maine-et-Loire",
          coordinates: "47.45:-0.6:9"
        },
        {
          name: "Mayenne",
          coordinates: "48.166666666:-0.666666666:9"
        },
        {
          name: "Sarthe",
          coordinates: "48.283333333:0.216666666:9"
        },
        {
          name: "Vendée",
          coordinates: "46.670556:-1.426667:9"
        }
      ]
    },
    {
      name: "Île-de-France",
      parts: [
        {
          name: "Paris",
          coordinates: "48.856577777:2.351827777:12"
        },
        {
          name: "Seine-et-Marne",
          coordinates: "48.6:3.0:9"
        },
        {
          name: "Yvelines",
          coordinates: "48.833333333:1.916666666:9"
        },
        {
          name: "Essonne",
          coordinates: "48.5:2.283333333:10"
        },
        {
          name: "Hauts-de-Seine",
          coordinates: "48.833333333:2.2:11"
        },
        {
          name: "Seine-Saint-Denis",
          coordinates: "48.9:2.483333333:11"
        },
        {
          name: "Val-de-Marne",
          coordinates: "48.75:2.416666666:11"
        },
        {
          name: "Val-d'Oise",
          coordinates: "49.061944444:2.086111111:10"
        }
      ]
    },
    {
      name: "Outre-mer",
      parts: [
        {
          name: "Guyane",
          coordinates: "4.0:-53.0:8"
        },
        {
          name: "La Réunion",
          coordinates: "-21.1144:55.5325:11"
        },
        {
          name: "Guadeloupe",
          coordinates: "16.25:-61.5833:11"
        },
        {
          name: "Martinique",
          coordinates: "14.6666:-61:11"
        },
        {
          name: "Mayotte",
          coordinates: "-12.8430:45.1383:11"
        },
        {
          name: "Saint-Pierre-et-Miquelon",
          coordinates: "46.889:-56.219:11"
        },
        {
          name: "Saint-Barthélemy",
          coordinates: "17.897:-62.834:13"
        },
        {
          name: "Saint-Martin",
          coordinates: "18.0752:-63.06:12"
        }
      ]
    }
  ];

  init();

  function init() {
    vm.config = {
      env: $window.__env,
      package: pack
    };

    if ($stateParams.country === "ireland") {
      vm.country = "Ireland";
      vm.list = ireland;
    } else if ($stateParams.country === "uk") {
      vm.country = "United Kingdom";
      vm.list = uk;
    } else if ($stateParams.country === "france") {
      vm.country = "France";
      vm.list = fr;
    } else if ($stateParams.country === "us") {
      vm.country = "USA";
      vm.list = us;
    }
    $window.document.title = `${vm.country} – Wiki Loves Monuments Map`;
  }
}

export default () => {
  angular.module("monumental").component("moCountry", CountryComponent);
};

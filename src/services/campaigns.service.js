const CampaignService = () => {
  const service = {
    getCampaign,
  };

  const list = {
    Q262: {
      name: 'Algeria',
      code: 'dz',
      category: 'Cultural heritage monuments in Algeria',
    },
    Q228: {
      name: 'Andorra & Catalan Areas',
      code: 'ad',
      category: 'Cultural heritage monuments in Andorra',
    },
    Q399: {
      name: 'Armenia',
      code: 'am',
      category: 'Cultural heritage monuments in Armenia',
    },
    Q408: {
      name: 'Australia',
      code: 'au',
      category: 'Cultural heritage monuments in Australia',
    },
    Q40: {
      name: 'Austria',
      code: 'at',
      category: 'Cultural heritage monuments in Austria',
    },
    Q227: {
      name: 'Azerbaijan',
      code: 'az',
      category: 'Cultural heritage monuments in Azerbaijan',
    },
    Q902: {
      name: 'Bangladesh',
      code: 'bd',
      category: 'Cultural heritage monuments in Bangladesh',
    },
    Q155: {
      name: 'Brazil',
      code: 'br',
      category: 'Cultural heritage monuments in Brazil',
    },
    Q219: {
      name: 'Bulgaria',
      code: 'bg',
      category: 'Cultural heritage monuments in Bulgaria',
    },
    Q16: {
      name: 'Canada',
      code: 'ca',
      category: 'Cultural heritage monuments in Canada',
    },
    Q148: {
      name: 'China',
      code: 'cn',
      category: 'Cultural heritage monuments in China',
    },
    Q224: {
      name: 'Croatia',
      code: 'hr',
      category: 'Cultural heritage monuments in Croatia',
    },
    Q79: {
      name: 'Egypt',
      code: 'eg',
      category: 'Cultural heritage monuments in Egypt',
    },
    Q33: {
      name: 'Finland',
      code: 'fi',
      category: 'Cultural heritage monuments in Finland',
    },
    Q142: {
      name: 'France',
      code: 'fr',
      category: 'Cultural heritage monuments in France',
    },
    Q230: {
      name: 'Georgia',
      code: 'ge',
      category: 'Cultural heritage monuments in Georgia',
    },
    Q183: {
      name: 'Germany',
      code: 'de',
      category: 'Cultural heritage monuments in Germany',
    },
    Q117: {
      name: 'Ghana',
      code: 'gh',
      category: 'Cultural heritage monuments in Ghana',
    },
    Q41: {
      name: 'Greece',
      code: 'gr',
      category: 'Cultural heritage monuments in Greece',
    },
    Q668: {
      name: 'India',
      code: 'in',
      category: 'Cultural heritage monuments in India',
    },
    Q794: {
      name: 'Iran',
      code: 'ir',
      category: 'Cultural heritage monuments in Iran',
    },
    Q27: {
      name: 'Ireland',
      code: 'ie',
      category: 'Cultural heritage monuments in Ireland',
    },
    Q796: {
      name: 'Iraq',
      code: 'iq',
      category: 'Cultural heritage monuments in Iraq',
    },
    Q801: {
      name: 'Israel',
      code: 'il',
      category: 'Cultural heritage monuments in Israel',
    },
    Q38: {
      name: 'Italy',
      code: 'it',
      category: 'Cultural heritage monuments in Italy',
    },
    Q810: {
      name: 'Jordan',
      code: 'jo',
      category: 'Cultural heritage monuments in Jordan',
    },
    Q211: {
      name: 'Latvia',
      code: 'lv',
      category: 'Cultural heritage monuments in Latvia',
    },
    Q822: {
      name: 'Lebanon',
      code: 'lb',
      category: 'Cultural heritage monuments in Lebanon',
    },
    Q833: {
      name: 'Malaysia',
      code: 'my',
      category: 'Cultural heritage monuments in Malaysia',
    },
    Q1028: {
      name: 'Morocco',
      code: 'ma',
      category: 'Cultural heritage monuments in Morocco',
    },
    Q233: {
      name: 'Malta',
      code: 'mt',
      category: 'Cultural heritage monuments in Malta',
    },
    Q837: {
      name: 'Nepal',
      code: 'np',
      category: 'Cultural heritage monuments in Nepal',
    },
    Q55: {
      name: 'the Netherlands',
      code: 'nl',
      category: 'Cultural heritage monuments in the Netherlands',
    },
    Q1033: {
      name: 'Nigeria',
      code: 'ng',
      category: 'Cultural heritage monuments in Nigeria',
    },
    Q843: {
      name: 'Pakistan',
      code: 'pk',
      category: 'Cultural heritage monuments in Pakistan',
    },
    Q219060: {
      name: 'Palestine',
      code: 'ps',
      category: 'Cultural heritage monuments in Palestine',
    },
    Q419: {
      name: 'Perú',
      code: 'pe',
      category: 'Cultural heritage monuments in Perú',
    },
    Q36: {
      name: 'Poland',
      code: 'pl',
      category: 'Cultural heritage monuments in Poland',
    },
    Q159: {
      name: 'Russia',
      code: 'ru',
      category: 'Cultural heritage monuments in Russia',
    },
    Q851: {
      name: 'Saudi Arabia',
      code: 'sa',
      category: 'Cultural heritage monuments in Saudi Arabia',
    },
    Q214: {
      name: 'Slovakia',
      code: 'sk',
      category: 'Cultural heritage monuments in Slovakia',
    },
    Q884: {
      name: 'South Korea',
      code: 'kr',
      category: 'Cultural heritage monuments in South Korea',
    },
    Q29: {
      name: 'Spain',
      code: 'es',
      category: 'Cultural heritage monuments in Spain',
    },
    Q34: {
      name: 'Sweden',
      code: 'se',
      category: 'Cultural heritage monuments in Sweden',
    },
    Q858: {
      name: 'Syria',
      code: 'sy',
      category: 'Cultural heritage monuments in Syria',
    },
    Q865: {
      name: 'Taiwan',
      code: 'tw',
      category: 'Cultural heritage monuments in Taiwan',
    },
    Q869: {
      name: 'Thailand',
      code: 'th',
      category: 'Cultural heritage monuments in Thailand',
    },
    Q948: {
      name: 'Tunisia',
      code: 'tn',
      category: 'Cultural heritage monuments in Tunisia',
    },
    Q1036: {
      name: 'Uganda',
      code: 'ug',
      category: 'Cultural heritage monuments in Uganda',
    },
    Q212: {
      name: 'Ukraine',
      code: 'ua',
      category: 'Cultural heritage monuments in Ukraine',
    },
    Q145: {
      name: 'the United Kingdom',
      code: 'gb',
      category: 'Cultural heritage monuments in the United Kingdom‎',
    },
    Q30: {
      name: 'the United States',
      code: 'us',
      category: 'Cultural heritage monuments in the United States‎',
    },
    Q717: {
      name: 'Venezuela',
      code: 've',
      category: 'Cultural heritage monuments in Venezuela',
    },
  };

  return service;

  function getCampaign(monument) {
    const country = getPropertyValue(monument, 'P17');
    if (list[country.id]) {
      return angular.extend(list[country.id], {
        templateName: 'on Wikidata',
        monumentId: monument.id,
      }, getMonumentTemplate(monument, country));
    }
    return false;
  }

  function getMonumentTemplate(monument, country) {
    const m = monument;
    if (country.id === 'Q36' && getPropertyValue(m, 'P2186')) {
      return {
        templateName: 'zabytek nieruchomy',
        monumentId: getPropertyValue(m, 'P2186').substring(3),
      };
    } else if (country.id === 'Q145' && getPropertyValue(m, 'P1216')) {
      return {
        templateName: 'Listed building England',
        monumentId: getPropertyValue(m, 'P1216'),
      };
    } else if (country.id === 'Q142' && getPropertyValue(m, 'P380')) {
      return {
        templateName: 'Mérimée',
        monumentId: getPropertyValue(m, 'P380'),
      };
    } else if (country.id === 'Q34' && getPropertyValue(m, 'P1260')) {
      const value = getPropertyValue(m, 'P1260');
      if (value.includes('raa/bbr') || value.includes('raa/bbra')) {
        const split = value.split('/');
        return {
          templateName: 'BBR',
          monumentId: split[split.length - 1],
          template: `{{BBR|${split[split.length - 1]}|a}}`,
          category: 'Protected buildings in Sweden',
        };
      } else if (value.includes('raa/fmi')) {
        const split = value.split('/');
        return {
          templateName: 'Fornminne',
          monumentId: split[split.length - 1],
          category: 'Archaeological monuments in Sweden',
        };
      }
    } else if (country.id === 'Q34' && getPropertyValue(m, 'P2317')) {
      return {
        templateName: 'K-Fartyg',
        monumentId: getPropertyValue(m, 'P2317'),
        category: 'Listed historical ships in Sweden',
      };
    } else if (country.id === 'Q34' && getPropertyValue(m, 'P3426')) {
      return {
        templateName: 'Arbetslivsmuseum',
        monumentId: getPropertyValue(m, 'P3426'),
        category: 'Working Life Museums in Sweden',
      };
    } else if (country.id === 'Q40' && getPropertyValue(m, 'P2951')) {
      return {
        templateName: 'Denkmalgeschütztes Objekt Österreich',
        monumentId: getPropertyValue(m, 'P2951'),
      };
    } else if (country.id === 'Q145' && getPropertyValue(m, 'P1459')) {
      return {
        templateName: 'Listed building Wales',
        monumentId: getPropertyValue(m, 'P1459'),
        category: 'Listed buildings in Wales',
      };
    } else if (country.id === 'Q145' && getPropertyValue(m, 'P709')) {
      return {
        templateName: 'Listed building Scotland',
        monumentId: getPropertyValue(m, 'P709'),
        category: 'Listed buildings in Scotland',
      };
    } else if (country.id === 'Q145' && getPropertyValue(m, 'P1216')) {
      return {
        templateName: 'Listed building England',
        monumentId: getPropertyValue(m, 'P1216'),
        category: 'Listed buildings in England',
      };
    }
    return {};
  }

  function getPropertyValue(monument, prop) {
    if (!monument.claims[prop]) return false;
    const value = monument.claims[prop][0];
    return value.mainsnak.datavalue.value;
  }
};

export default () => {
  angular
    .module('monumental')
    .factory('campaignService', CampaignService);
};

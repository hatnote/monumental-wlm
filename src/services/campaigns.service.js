const CampaignService = () => {
  const service = {
    getCampaign
  };

  const list = {
    Q222: {
      name: "Albania",
      code: "al",
      category: "Cultural heritage monuments in Albania"
    },
    Q262: {
      name: "Algeria",
      code: "dz",
      category: "Cultural heritage monuments in Algeria"
    },
    Q399: {
      name: "Armenia",
      code: "am",
      category: "Cultural heritage monuments in Armenia"
    },
    Q408: {
      name: "Australia",
      code: "au",
      category: "Cultural heritage monuments in Australia"
    },
    Q40: {
      name: "Austria",
      code: "at",
      category: "Cultural heritage monuments in Austria"
    },
    Q227: {
      name: "Azerbaijan",
      code: "az",
      category: "Cultural heritage monuments in Azerbaijan"
    },
    Q902: {
      name: "Bangladesh",
      code: "bd",
      category: "Cultural heritage monuments in Bangladesh"
    },
    Q962: {
      name: "Benin",
      code: "bj",
      category: "Cultural heritage monuments in Benin"
    },
    Q750: {
      name: "Bolivia",
      code: "bo",
      category: "Cultural heritage monuments in Bolivia"
    },
    Q155: {
      name: "Brazil",
      code: "br",
      category: "Cultural heritage monuments in Brazil"
    },
    Q16: {
      name: "Canada",
      code: "ca",
      category: "Cultural heritage monuments in Canada"
    },
    Q224: {
      name: "Croatia",
      code: "hr",
      category: "Cultural heritage monuments in Croatia"
    },
    Q35: {
      name: "Denmark",
      code: "dk",
      category: "Cultural heritage monuments in Denmark"
    },
    Q33: {
      name: "Finland",
      code: "fi",
      category: "Cultural heritage monuments in Finland"
    },
    Q142: {
      name: "France",
      code: "fr",
      category: "Cultural heritage monuments in France"
    },
    Q183: {
      name: "Germany",
      code: "de",
      category: "Cultural heritage monuments in Germany"
    },
    Q117: {
      name: "Ghana",
      code: "gh",
      category: "Cultural heritage monuments in Ghana"
    },
    Q41: {
      name: "Greece",
      code: "gr",
      category: "Cultural heritage monuments in Greece"
    },
    Q41: {
      name: "Guinea",
      code: "gn",
      category: "Cultural heritage monuments in Guinea"
    },
    Q668: {
      name: "India",
      code: "in",
      category: "Cultural heritage monuments in India"
    },
    Q794: {
      name: "Iran",
      code: "ir",
      category: "Cultural heritage monuments in Iran"
    },
    Q27: {
      name: "Ireland",
      code: "ie",
      category: "Cultural heritage monuments in Ireland"
    },
    Q38: {
      name: "Italy",
      code: "it",
      category: "Cultural heritage monuments in Italy"
    },
    Q1246: {
      name: "Kosovo",
      code: "xk",
      category: "Cultural heritage monuments in Kosovo"
    },
    Q833: {
      name: "Malaysia",
      code: "my",
      category: "Cultural heritage monuments in Malaysia"
    },
    Q233: {
      name: "Malta",
      code: "mt",
      category: "Cultural heritage monuments in Malta"
    },
    Q1028: {
      name: "Morocco",
      code: "ma",
      category: "Cultural heritage monuments in Morocco"
    },
    Q837: {
      name: "Nepal",
      code: "np",
      category: "Cultural heritage monuments in Nepal"
    },
    Q1033: {
      name: "Nigeria",
      code: "ng",
      category: "Cultural heritage monuments in Nigeria"
    },
    Q1033: {
      name: "Norway",
      code: "no",
      category: "Cultural heritage monuments in Norway"
    },
    Q419: {
      name: "Perú",
      code: "pe",
      category: "Cultural heritage monuments in Perú"
    },
    Q928: {
      name: "the Philippines",
      code: "ph",
      category: "Cultural heritage monuments in the Philippines"
    },
    Q36: {
      name: "Poland",
      code: "pl",
      category: "Cultural heritage monuments in Poland"
    },
    Q45: {
      name: "Portugal",
      code: "pt",
      category: "Cultural heritage monuments in Portugal"
    },
    Q218: {
      name: "Romania",
      code: "ro",
      category: "Cultural heritage monuments in Romania"
    },
    Q159: {
      name: "Russia",
      code: "ru",
      category: "Cultural heritage monuments in Russia"
    },
    Q214: {
      name: "Slovakia",
      code: "sk",
      category: "Cultural heritage monuments in Slovakia"
    },
    Q215: {
      name: "Slovenia",
      code: "si",
      category: "Cultural heritage monuments in Slovenia"
    },
    Q884: {
      name: "South Korea",
      code: "kr",
      category: "Cultural heritage monuments in South Korea"
    },
    Q29: {
      name: "Spain",
      code: "es",
      category: "Cultural heritage monuments in Spain"
    },
    Q34: {
      name: "Sweden",
      code: "se",
      category: "Cultural heritage monuments in Sweden"
    },
    Q858: {
      name: "Switzerland",
      code: "ch",
      category: "Cultural heritage monuments in Switzerland"
    },
    Q865: {
      name: "Taiwan",
      code: "tw",
      category: "Cultural heritage monuments in Taiwan"
    },
    Q869: {
      name: "Thailand",
      code: "th",
      category: "Cultural heritage monuments in Thailand"
    },
    Q1036: {
      name: "Uganda",
      code: "ug",
      category: "Cultural heritage monuments in Uganda"
    },
    Q212: {
      name: "Ukraine",
      code: "ua",
      category: "Cultural heritage monuments in Ukraine"
    },
    Q145: {
      name: "the United Kingdom",
      code: "gb",
      category: "Cultural heritage monuments in the United Kingdom‎"
    },
    Q30: {
      name: "the United States",
      code: "us",
      category: "Cultural heritage monuments in the United States‎"
    }
  };

  return service;

  function getCampaign(monument) {
    const country = getPropertyValue(monument, "P17");
    if (list[country.id]) {
      return angular.extend(
        list[country.id],
        {
          templateName: "on Wikidata",
          monumentId: monument.id
        },
        getMonumentTemplate(monument, country)
      );
    }
    return false;
  }

  function getMonumentTemplate(monument, country) {
    const m = monument;
    if (country.id === "Q36" && getPropertyValue(m, "P2186")) {
      return {
        templateName: "zabytek nieruchomy",
        monumentId: getPropertyValue(m, "P2186").substring(3)
      };
    } else if (country.id === "Q145" && getPropertyValue(m, "P1216")) {
      return {
        templateName: "Listed building England",
        monumentId: getPropertyValue(m, "P1216")
      };
    } else if (country.id === "Q142" && getPropertyValue(m, "P380")) {
      return {
        templateName: "Mérimée",
        monumentId: getPropertyValue(m, "P380")
      };
    } else if (country.id === "Q34" && getPropertyValue(m, "P1260")) {
      const value = getPropertyValue(m, "P1260");
      if (value.includes("raa/bbr") || value.includes("raa/bbra")) {
        const split = value.split("/");
        return {
          templateName: "BBR",
          monumentId: split[split.length - 1],
          template: `{{BBR|${split[split.length - 1]}|a}}`,
          category: "Protected buildings in Sweden"
        };
      } else if (value.includes("raa/fmi")) {
        const split = value.split("/");
        return {
          templateName: "Fornminne",
          monumentId: split[split.length - 1],
          category: "Archaeological monuments in Sweden"
        };
      }
    } else if (country.id === "Q34" && getPropertyValue(m, "P2317")) {
      return {
        templateName: "K-Fartyg",
        monumentId: getPropertyValue(m, "P2317"),
        category: "Listed historical ships in Sweden"
      };
    } else if (country.id === "Q34" && getPropertyValue(m, "P3426")) {
      return {
        templateName: "Arbetslivsmuseum",
        monumentId: getPropertyValue(m, "P3426"),
        category: "Working Life Museums in Sweden"
      };
    } else if (country.id === "Q40" && getPropertyValue(m, "P2951")) {
      return {
        templateName: "Denkmalgeschütztes Objekt Österreich",
        monumentId: getPropertyValue(m, "P2951")
      };
    } else if (country.id === "Q145" && getPropertyValue(m, "P1459")) {
      return {
        templateName: "Listed building Wales",
        monumentId: getPropertyValue(m, "P1459"),
        category: "Listed buildings in Wales"
      };
    } else if (country.id === "Q145" && getPropertyValue(m, "P709")) {
      return {
        templateName: "Listed building Scotland",
        monumentId: getPropertyValue(m, "P709"),
        category: "Listed buildings in Scotland"
      };
    } else if (country.id === "Q145" && getPropertyValue(m, "P1216")) {
      return {
        templateName: "Listed building England",
        monumentId: getPropertyValue(m, "P1216"),
        category: "Listed buildings in England"
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
  angular.module("monumental").factory("campaignService", CampaignService);
};

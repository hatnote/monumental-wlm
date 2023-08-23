import _ from "lodash";
import EXIF from "exif-js";
import moment from "moment";

import "./monument.scss";
import template from "./monument.html";

import pack from "../../../../package.json";

const MonumentComponent = { controller, template };

function controller(
  $httpParamSerializerJQLike,
  $anchorScroll,
  $http,
  $mdDialog,
  $mdMenu,
  $mdToast,
  $q,
  $rootScope,
  $sce,
  $scope,
  $state,
  $stateParams,
  $timeout,
  $window,
  FileUploader,
  campaignService,
  localStorageService,
  loginService,
  WikiService,
  imageService,
  langService,
  leafletData,
  mapService,
  textService,
  wikidata
) {
  const vm = this;
  const baseUrl = $window.__env.baseUrl;
  const icon = mapService.getMapIcon();
  const id = $stateParams.id.includes("Q")
    ? $stateParams.id
    : `Q${$stateParams.id}`;
  const langs = langService.getUserLanguages();

  vm.actions = {
    claims: [],
    other: []
  };
  vm.busy = false;
  vm.country = null;
  vm.edit = { all: false };
  vm.image = [];
  vm.isLoggedIn = loginService.getUser();
  vm.lang = langs[0];
  vm.map = {};
  vm.queue = [];
  vm.stateParams = $stateParams;
  vm.text = null;

  vm.categoryChange = categoryChange;
  vm.getCommonsLink = getCommonsLink;
  vm.getValueLabel = getValueLabel;
  vm.getWikipediaArticle = getWikipediaArticle;
  vm.labelChange = labelChange;
  vm.login = login;
  vm.openArticleList = (menu, event) => menu.open(event);
  vm.openImage = openImage;
  vm.queryCommonsCategory = queryCommonsCategory;
  vm.saveAll = saveAll;
  vm.scrollTo = (anchor) => $anchorScroll(anchor);

  // init

  init();

  // functions

  vm.uploader = new FileUploader({
    url: `${$window.__env.baseUrl}/commons`,
    withCredentials: true
  });
  const uploader = vm.uploader;

  // FILTERS

  uploader.filters.push({
    name: "imageFilter",
    fn: (item) => {
      const type = `|${item.type.slice(item.type.lastIndexOf("/") + 1)}|`;
      return "|jpg|png|jpeg|gif|".indexOf(type) !== -1;
    }
  });

  // CALLBACKS

  vm.fileLoading = 0;

  function parseEXIFTime(time) {
    const str = time.split(" ");
    return {
      date: str[0].replace(/:/g, "-"),
      time: str.length === 2 ? str[1] : undefined
    };
  }

  function getFileDescription(fileItem) {
    const name =
      vm.monument.labels.en ||
      vm.monument.labels[vm.lang.code] ||
      vm.monument.labels[Object.keys(vm.monument.labels)[0]];

    const city = getPropertyValue("P131")
      ? vm.monument.valuesLabels[getPropertyValue("P131").id].en ||
        vm.monument.valuesLabels[getPropertyValue("P131").id][vm.lang.code] ||
        vm.monument.valuesLabels[getPropertyValue("P131").id][
          Object.keys(vm.monument.labels)[0]
        ]
      : undefined;
    const date = fileItem.metadata.DateTimeOriginal
      ? parseEXIFTime(fileItem.metadata.DateTimeOriginal)
      : undefined;
    const monumentTemplate = vm.country
      ? vm.country.template ||
        `{{${vm.country.templateName}|${vm.country.monumentId}}}`
      : `{{on Wikidata|${vm.monument.id}}}`;

    return `=={{int:filedesc}}==
{{Information
|description={{en|1=${city ? `${city}, ` : ""}${
      name.value
    }.}}${monumentTemplate}
|date=${date ? date.date : ""} ${date && date.time ? date.time : ""}
|source={{own}}
|author=[[User:${vm.isLoggedIn.name}|${vm.isLoggedIn.name}]]
|permission=
|other versions=
}}

=={{int:license-header}}==
{{self|cc-by-sa-4.0}}
${
  vm.country
    ? `{{subst:WLM-is-running|${vm.country.code}|{{Wiki Loves Monuments 2023|${vm.country.code}}}}}`
    : ""
}

${getCategory()}
[[Category:Uploaded with Monumental]]`;
  }

  function getCategory() {
    if (vm.country.code === "gb") {
      const [year, month, day] = moment().format("YYYY-MM-DD").split("-");
      const categories = [
        `[[Category:WLM-UK ${year} unfiltered ${month}-${day}]]`,
        "[[Category:Images from Wiki Loves Monuments 2023 in the United Kingdom]]",
        getPropertyValue("P1459") &&
          "[[Category:Images from Wiki Loves Monuments 2023 in Wales]]",
        getPropertyValue("P1460") &&
          "[[Category:Images from Wiki Loves Monuments 2023 in Northern Ireland]]",
        getPropertyValue("P1216") &&
          "[[Category:Images from Wiki Loves Monuments 2023 in England]]",
        (getPropertyValue("P709") || getPropertyValue("P718")) &&
          "[[Category:Images from Wiki Loves Monuments 2023 in Scotland]]",
        !getPropertyValue("P18") &&
          "[[Category:Potential image for Wikidata item]]"
      ];
      return categories.filter((category) => category).join("\n");
    }

    if (vm.category && vm.category.title) {
      return `[[${vm.category.title}]]`;
    }
    if (vm.country.code === "ie") {
      return "[[Category:Images from Wiki Loves Monuments 2023 in Ireland – missing category]]";
    }
    if (vm.country.category) {
      return `[[Category:${vm.country.category}]]`;
    }
    return "";
  }

  function readEXIF(fileItem) {
    EXIF.getData(fileItem._file, function file() {
      fileItem.metadata = EXIF.getAllTags(this);
      if (fileItem.metadata.thumbnail && fileItem.metadata.thumbnail.blob) {
        fileItem.thumbnail = URL.createObjectURL(
          fileItem.metadata.thumbnail.blob
        );
      }

      const name =
        vm.monument.labels.en ||
        vm.monument.labels[vm.lang.code] ||
        vm.monument.labels[Object.keys(vm.monument.labels)[0]];
      const city = getPropertyValue("P131")
        ? vm.monument.valuesLabels[getPropertyValue("P131").id].en ||
          vm.monument.valuesLabels[getPropertyValue("P131").id][vm.lang.code] ||
          vm.monument.valuesLabels[getPropertyValue("P131").id][
            Object.keys(vm.monument.labels)[0]
          ]
        : undefined;
      let time = fileItem.file.lastModifiedDate
        ? fileItem.file.lastModifiedDate
            .toISOString()
            .replace(/([-TZ:]|\.[0-9]*)/g, "")
        : "";
      const queueIndex = `(${
        vm.uploader.queue.indexOf(
          vm.uploader.queue
            .filter((file) => file.file.name === fileItem.file.name)
            .pop()
        ) + 1
      })`;

      if (fileItem.metadata.DateTimeOriginal) {
        const parsed = parseEXIFTime(fileItem.metadata.DateTimeOriginal);
        time = `${parsed.date}${parsed.time || ` ${queueIndex}`}`.replace(
          /([-TZ:]|\.[0-9]*)/g,
          ""
        );
      }

      const ext = fileItem.file.name.split(".").pop().toLowerCase();
      fileItem.commons.fileName = `${city ? `${city} - ` : ""}${
        name.value
      } - ${time}.${ext}`;
      fileItem.commons.description = getFileDescription(fileItem);

      fileItem.formData.push(
        ...[
          { filename: fileItem.commons.fileName },
          { text: fileItem.commons.description }
        ]
      );

      $timeout(() => {
        vm.fileLoading -= 1;
        $scope.$apply();
      });
    });
  }

  function addFormData(fileItem) {
    const data = [
      { action: "upload" },
      { format: "json" },
      { errorformat: "html" },
      { comment: `Monumental WLM ${pack.version}` },
      { watchlist: "watch" },
      { use_auth: true }
    ];
    fileItem.formData.push(...data);
  }

  uploader.onAfterAddingFile = (fileItem) => {
    fileItem.commons = {};
    vm.fileLoading += 1;
    readEXIF(fileItem);
    addFormData(fileItem);
  };
  uploader.onSuccessItem = (fileItem, response) => {
    fileItem.commons.uploaded = response.upload;
  };

  function getCategoryInfo(category) {
    WikiService.getCategoryInfo(category).then((response) => {
      vm.category = response;
    });
  }

  function getCategoryMembers(category) {
    WikiService.getCategoryMembers(category).then((data) => {
      const promises = data.map((image) =>
        WikiService.getImage(image, { iiurlheight: 75 })
      );
      $q.all(promises).then((response) => {
        vm.images = response.map((image) => image.imageinfo);
      });
    });
  }

  function getWikipediaArticle(wiki) {
    vm.showAllArticles = false;
    WikiService.getArticleHeader(wiki.code, wiki.title).then((data) => {
      wiki.article = $sce.trustAsHtml(data);
      vm.article = wiki;
      $timeout(() => {
        const height = document.querySelector(".article__text").offsetHeight;
        vm.isArticleLong = height === 320;
      });
    });
  }

  function getCommonsLink() {
    const name = vm.monument.claims.P373.values[0].value;
    return `//commons.wikimedia.org/wiki/Category:${encodeURIComponent(name)}`;
  }

  function getImage(image) {
    WikiService.getImage(image, { iiurlwidth: 640 }).then((response) => {
      vm.image.push(response.imageinfo);
    });
  }

  function getInterwiki() {
    const country = getPropertyValue("P17");
    const countryLanguages = langService.getNativeLanguages(country.id);

    vm.interwiki = {};

    vm.interwiki.all = Object.keys(vm.monument.sitelinks)
      .map((key) => vm.monument.sitelinks[key])
      .map((element) => ({
        code: element.site.replace("wiki", ""),
        title: element.title,
        link: `//${element.site.replace("wiki", "")}.wikipedia.org/wiki/${
          element.title
        }`.replace(" ", "_")
      }))
      .filter(
        (element) =>
          !element.code.includes("quote") && !element.code.includes("commons")
      );

    vm.interwiki.shown = langs
      .map((lang) => lang.code)
      .concat(countryLanguages)
      .filter((element, index, array) => array.indexOf(element) === index)
      .map((lang) => {
        const iw = vm.interwiki.all.find((element) => element.code === lang);
        return iw || { code: lang };
      });

    const article = vm.interwiki.shown.filter((iw) => iw.title);
    if (article.length) {
      getWikipediaArticle(article[0]);
    }
  }

  function getPropertyValue(prop) {
    if (!vm.monument.claims[prop]) return false;
    const value = vm.monument.claims[prop][0];

    return value.mainsnak.datavalue.value;
  }

  function labelChange(lang) {
    vm.actions.other[0] = {
      promise: setLabel,
      value: lang
    };
  }

  function login() {
    vm.loading = true;
    const current = $window.location.href;
    $window.location.href = `${baseUrl}/login?next=${encodeURIComponent(
      current
    )}`;
  }

  function categoryChange(value) {
    if (value.searchSelected) {
      value.save = undefined;
    }
    vm.actions.other[1] = {
      type: "save",
      promise: value.id ? setClaimString : addClaimString,
      value
    };
  }

  function queryCommonsCategory(text) {
    return WikiService.getCategorySearch(text);
  }

  function getValueLabel(vid) {
    const labels = vm.monument.valuesLabels;
    return (
      labels[vid][vm.lang] ||
      labels[vid].en ||
      labels[vid][Object.keys(labels[vid])[0]]
    );
  }

  function saveSingle(actions, index) {
    const promise = actions[index];
    return promise
      .promise(promise.value)
      .then((response) => {
        if (actions[index + 1]) {
          saveSingle(actions, index + 1);
        } else {
          $state.go($state.current, { id }, { reload: true });
        }
      })
      .catch((err) => {
        $mdToast.show(
          $mdToast.simple().textContent(`Error: ${err}`).hideDelay(3000)
        );
        if (actions[index + 1]) {
          saveSingle(actions, index + 1);
        } else {
          vm.busy = false;
        }
      });
  }

  function saveAll() {
    vm.busy = true;
    const actions = [...vm.actions.claims, ...vm.actions.other];
    saveSingle(actions, 0);
  }

  function recountQueue() {
    const claims = _.values(vm.monument.claims);
    vm.actions.claims = [];
    claims.forEach((claim) => {
      claim.forEach((value) => {
        if (value.action) {
          vm.actions.claims.push(value.action);
        }
      });
    });
  }

  function init() {
    vm.config = {
      env: $window.__env,
      package: pack
    };

    const queueListener = $rootScope.$on("recountQueue", () => recountQueue());
    $scope.$on("$destroy", () => queueListener());

    vm.loading = true;

    textService.getText().then((data) => {
      vm.text = data;
    });

    wikidata.getById(id).then((data) => {
      vm.monument = data;

      // WLM identifier
      vm.country = campaignService.getCampaign(data);

      // image
      if (getPropertyValue("P18")) {
        const image = getPropertyValue("P18");
        getImage(image);
      }
      // commons category
      if (getPropertyValue("P373")) {
        const category = getPropertyValue("P373");
        getCategoryInfo(category);
        getCategoryMembers(category);
      } else {
        vm.monument.claims.P373 = [{}];
      }

      getInterwiki();

      // coordinates
      if (getPropertyValue("P625")) {
        const value = getPropertyValue("P625");
        vm.map = mapService.getMapInstance({
          center: {
            lat: value.latitude,
            lng: value.longitude,
            zoom: 16
          }
        });
        vm.map.markers = {
          marker: {
            lat: value.latitude,
            lng: value.longitude,
            icon
          }
        };
        leafletData.getMap().then((map) => {
          map.scrollWheelZoom.disable();
          map.once("focus", () => {
            map.scrollWheelZoom.enable();
          });
        });
      }
      vm.loading = false;

      const title = vm.monument.labels[vm.lang.code] || vm.monument.labels.en;
      $window.document.title = `${
        title ? title.value : vm.monument.id
      } – Wiki Loves Monuments Map`;
    });
  }

  function openImage(image, event) {
    imageService.openImage({
      image,
      event,
      list: vm.images
    });
  }

  function setLabel(lang) {
    return WikiService.setLabel(id, lang, vm.monument.labels[lang].newValue);
  }

  function setClaimString(value) {
    return WikiService.setClaimString({
      id: value.id,
      property: value.mainsnak.property,
      value: value.searchSelected.title
    });
  }

  function addClaimString(value) {
    return WikiService.addClaimString({
      entity: id,
      property: "P373",
      value: value.searchSelected.title
    });
  }
}

export default () => {
  angular
    .module("monumental")
    .component("moMonument", MonumentComponent)
    .directive("loadSrc", () => ({
      link: (scope, element, attrs) => {
        let img = null;
        const loadImage = () => {
          element[0].src =
            "//upload.wikimedia.org/wikipedia/commons/f/f8/Ajax-loader%282%29.gif";
          img = new Image();
          img.src = attrs.loadSrc;
          img.onload = () => {
            element[0].src = attrs.loadSrc;
          };
        };
        scope.$watch(
          () => attrs.loadSrc,
          (newVal, oldVal) => {
            if (oldVal !== newVal) {
              loadImage();
            }
          }
        );
        loadImage();
      }
    }))
    .directive("ngThumb", [
      "$window",
      function ($window) {
        const helper = {
          support: !!($window.FileReader && $window.CanvasRenderingContext2D),
          isFile(item) {
            return angular.isObject(item) && item instanceof $window.File;
          },
          isImage(file) {
            const type = `|${file.type.slice(file.type.lastIndexOf("/") + 1)}|`;
            return "|jpg|png|jpeg|bmp|gif|".indexOf(type) !== -1;
          }
        };

        return {
          restrict: "A",
          template: "<canvas/>",
          link(scope, element, attributes) {
            if (!helper.support) return;

            const params = scope.$eval(attributes.ngThumb);

            if (!helper.isFile(params.file)) return;
            if (!helper.isImage(params.file)) return;

            const canvas = element.find("canvas");
            const reader = new FileReader();

            reader.onload = onLoadFile;
            reader.readAsDataURL(params.file);

            function onLoadFile(event) {
              const img = new Image();
              img.onload = onLoadImage;
              img.src = event.target.result;
            }

            function onLoadImage() {
              const width =
                params.width || (this.width / this.height) * params.height;
              const height =
                params.height || (this.height / this.width) * params.width;
              canvas.attr({ width, height });
              canvas[0].getContext("2d").drawImage(this, 0, 0, width, height);
            }
          }
        };
      }
    ]);
};

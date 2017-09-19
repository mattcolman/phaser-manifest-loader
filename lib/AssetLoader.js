'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _phaser = require('phaser');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function warn(type, key) {
  console.warn('phaser-manifest-loader: could not find ' + type + ' with key : ' + key);
}

var AssetLoader = function (_Plugin) {
  _inherits(AssetLoader, _Plugin);

  function AssetLoader() {
    _classCallCheck(this, AssetLoader);

    return _possibleConstructorReturn(this, (AssetLoader.__proto__ || Object.getPrototypeOf(AssetLoader)).apply(this, arguments));
  }

  _createClass(AssetLoader, [{
    key: 'init',
    value: function init(req) {
      this.req = req;
      this.loaders = {
        'audio': this.loadAudio,
        'spritesheets': this.loadSpriteSheet,
        'images': this.loadImage,
        'bitmap_fonts': this.loadBitmapFont
      };
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.loaders = null;
      _get(AssetLoader.prototype.__proto__ || Object.getPrototypeOf(AssetLoader.prototype), 'destroy', this).call(this);
    }
  }, {
    key: 'loadManifest',
    value: function loadManifest(manifest) {
      var _this2 = this;

      var assetPostfix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      return new Promise(function (resolve) {
        Object.keys(_this2.loaders).forEach(function (assetType) {
          var assets = manifest[assetType];
          if (!assets) return;
          assets.forEach(function (assetKey) {
            _this2.loaders[assetType].call(_this2, assetKey, assetPostfix);
          });
        });
        _this2.game.load.onLoadComplete.addOnce(function () {
          resolve();
        });
        _this2.game.load.start();
      });
    }
  }, {
    key: 'loadAudio',
    value: function loadAudio(key) {
      var urls = [];

      try {
        urls.push(this.req('./audio/' + key + '.mp3'));
      } catch (e) {}

      try {
        urls.push(this.req('./audio/' + key + '.ogg'));
      } catch (e) {}
      
      try {
        urls.push(this.req('./audio/' + key + '.m4a'));
      } catch (e) {}
      
      try {
        urls.push(this.req('./audio/' + key + '.wav'));
      } catch (e) {}

      if (urls.length === 0) {
        warn('audio', key);
      } else {
        this.game.load.audio(key, urls);
      }
    }
  }, {
    key: 'loadSpriteSheet',
    value: function loadSpriteSheet(key, assetPostfix) {
      var imageUrl = void 0,
          jsonUrl = void 0;
      try {
        imageUrl = this.req('./spritesheets/' + key + assetPostfix + '.png');
      } catch (e) {}

      try {
        jsonUrl = this.req('./spritesheets/' + key + assetPostfix + '.json');
      } catch (e) {}

      if (!imageUrl) warn('spriteSheet image', key);
      if (!jsonUrl) warn('spriteSheet json', key);
      this.game.load.atlasJSONArray(key, imageUrl, null, jsonUrl);
    }
  }, {
    key: 'loadImage',
    value: function loadImage(key, assetPostfix) {
      var urls = [];
      try {
        urls.push(this.req('./images/' + key + assetPostfix + '.jpg'));
      } catch (e) {}

      try {
        urls.push(this.req('./images/' + key + assetPostfix + '.png'));
      } catch (e) {}

      if (urls.length === 0) {
        warn('image', key);
      } else {
        this.game.load.image(key, urls[0]);
      }
    }
  }, {
    key: 'loadBitmapFont',
    value: function loadBitmapFont(key, assetPostfix) {
      var imageUrl = void 0,
          xmlUrl = void 0;
      try {
        imageUrl = this.req('./bitmap_fonts/' + key + assetPostfix + '.png');
      } catch (e) {}

      try {
        xmlUrl = this.req('./bitmap_fonts/' + key + assetPostfix + '.xml');
      } catch (e) {}

      if (!imageUrl) warn('bitmapFont image', key);
      if (!xmlUrl) warn('bitmapFont xml', key);
      this.game.load.bitmapFont(key, imageUrl, xmlUrl);
    }
  }]);

  return AssetLoader;
}(_phaser.Plugin);

exports.default = AssetLoader;

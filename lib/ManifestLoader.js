'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _webfontloader = require('webfontloader');

var _webfontloader2 = _interopRequireDefault(_webfontloader);

var _AssetLoader = require('./AssetLoader');

var _AssetLoader2 = _interopRequireDefault(_AssetLoader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ManifestLoader = function (_Phaser$Plugin) {
  _inherits(ManifestLoader, _Phaser$Plugin);

  function ManifestLoader() {
    _classCallCheck(this, ManifestLoader);

    return _possibleConstructorReturn(this, (ManifestLoader.__proto__ || Object.getPrototypeOf(ManifestLoader)).apply(this, arguments));
  }

  _createClass(ManifestLoader, [{
    key: 'init',
    value: function init(req) {
      this.req = req;
    }

    /**
     * [loadManifest loads a manifest of assets]
     */

  }, {
    key: 'loadManifest',
    value: function loadManifest(manifest) {
      var assetPostfix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      return Promise.all([this._loadAssets(manifest, assetPostfix), this._loadWebFonts(manifest.fonts)]);
    }
  }, {
    key: '_loadAssets',
    value: function _loadAssets(manifest, assetPostfix) {
      var _this2 = this;

      return new Promise(function (resolve) {
        var assetLoader = _this2.game.plugins.add(_AssetLoader2.default, _this2.req);
        assetLoader.loadManifest(manifest, assetPostfix).then(function () {
          _this2.game.plugins.remove(assetLoader);
          resolve();
        });
      });
    }
  }, {
    key: '_loadWebFonts',
    value: function _loadWebFonts(fonts) {
      return new Promise(function (resolve) {
        if (!fonts) {
          resolve();
        } else {
          _webfontloader2.default.load(Object.assign({}, fonts, {
            active: function active() {
              resolve();
            }
          }));
        }
      });
    }
  }]);

  return ManifestLoader;
}(Phaser.Plugin);

exports.default = ManifestLoader;
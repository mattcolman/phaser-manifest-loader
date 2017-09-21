# Change Log

## 2.1.0
- support m4a and wav (thanks @BernsteinA)
- allow loading multiple audio files and let browser choose the best (thanks @BernsteinA)

## 2.0.0
- remove the need to add an alias to your webpack config and replace with supplying ManifestLoader with a context. This is a much more stable approach and gives you more control of the context. Requiring an alias is hacky and it fails when phaser-manifest-loader is a dependency of a dependency.
- export AssetLoader. Same api as ManifestLoader but lighter as webfontloader is not included.
- Add ogg file support.

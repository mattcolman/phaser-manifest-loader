# Change Log

## 3.1.0
- remove phaser webpack dependency (loading via script tag was broken!)
- support both file-loader and json-loader for spritesheets

## 3.0.0
- change loading of spritesheet json files to expect a json url rather than a json object. (This requires the use of [file-loader](https://github.com/webpack-contrib/file-loader) for json files in your webpack config)
This change was made to support other libraries such as dragonbones. I also think it makes more sense to lazy load json files rather than include them in the main bundle (especially if you're using dragonbones!).

## 2.1.0
- support m4a and wav (thanks @BernsteinA)
- allow loading multiple audio files and let browser choose the best (thanks @BernsteinA)

## 2.0.0
- remove the need to add an alias to your webpack config and replace with supplying ManifestLoader with a context. This is a much more stable approach and gives you more control of the context. Requiring an alias is hacky and it fails when phaser-manifest-loader is a dependency of a dependency.
- export AssetLoader. Same api as ManifestLoader but lighter as webfontloader is not included.
- Add ogg file support.

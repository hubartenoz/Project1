
//=============================================================================
// Map Borders (v1.0.0)
// by Fogomax
//=============================================================================

/*:
  * @author Fogomax
  * @plugindesc Creates borders if the map is too small to the game screen

  <Fogo MapBorders>
  *
  * @help
  * ===========================================================================
  * Åú HELP
  * ===========================================================================
  * This plugin does not provide a help file
  *
  * @param Background Filename
  * @desc Filename of the background image
  * Folder: /img/system
  * @default MapBackground
  * @require 1
  * @dir img/system/
  * @type file
  *
  * @param Border Tilesheet Filename
  * @desc Filename of the border tilesheet image
  * Folder: /img/system
  * @default BorderTilesheet
  * @require 1
  * @dir img/system/
  * @type file
*/

"use strict";

var Imported = Imported || {};
Imported["Fogo_MapBorders"] = "1.0.0";

var Fogo = Fogo || {};
Fogo.MapBorders = {};

(function($) {
	$.Params = $plugins.filter(function(p) { return p.description.contains('<Fogo MapBorders>'); })[0].parameters;

	$.Background = $.Params['Background Filename'] || "";
	$.DataFilename = $.Params['Border Tilesheet Filename'] || "";

	//-----------------------------------------------------------------------------
	// Spriteset_Map
	//

	var _Spriteset_Map_createTilemap = Spriteset_Map.prototype.createTilemap;
	
	Spriteset_Map.prototype.createTilemap = function() {
		if ($gameMap.width() * $gameMap.tileWidth() < Graphics.boxWidth ||
			$gameMap.height() * $gameMap.tileHeight() < Graphics.boxHeight) {
			this.createMapBackground();
			this.createMapBorders();
		}
		_Spriteset_Map_createTilemap.call(this);
	};

	Spriteset_Map.prototype.createMapBackground = function() {
		this._mapBackground = new Sprite(ImageManager.loadSystem($.Background));
		this._baseSprite.addChild(this._mapBackground);
	};

	Spriteset_Map.prototype.createMapBorders = function() {
		this._mapBorders = new Sprite_MapBorders();
		this._baseSprite.addChild(this._mapBorders);
	};

	var _Spriteset_Map_update = Spriteset_Map.prototype.update;
	
	Spriteset_Map.prototype.update = function() {
		_Spriteset_Map_update.call(this);
		if (this._mapBorders)
			this._mapBorders.update();
	};

	//-----------------------------------------------------------------------------
	// Sprite_MapBorders
	//

	function Sprite_MapBorders() {
		this.initialize.apply(this, arguments);
	};

	Sprite_MapBorders.prototype = Object.create(Sprite.prototype);
	Sprite_MapBorders.prototype.constructor = Sprite_MapBorders;

	Sprite_MapBorders.prototype.initialize = function() {
		Sprite.prototype.initialize.call(this);
		var bw = ($gameMap.width() + 2) * $gameMap.tileWidth();
		var bh = ($gameMap.height() + 2) * $gameMap.tileHeight();
		this.bitmap = new Bitmap(bw, bh);
		this._dataBitmap = ImageManager.loadSystem($.DataFilename);
		this._dataBitmap.addLoadListener(this.refreshBitmap.bind(this));
		this.x = -($gameMap._displayX + 1) * $gameMap.tileWidth();
		this.y = -($gameMap._displayY + 1) * $gameMap.tileHeight();
	};

	Sprite_MapBorders.prototype.refreshBitmap = function() {
		var sw = $gameMap.tileWidth();
		var sh = $gameMap.tileHeight();
		var src = this._dataBitmap;
		this.bitmap.clear();
		this.bitmap.blt(src, 0, 0, sw, sh, 0, 0);
		this.bitmap.blt(src, 96, 0, sw, sh, this.bitmap.width - 48, 0);
		this.bitmap.blt(src, 0, 96, sw, sh, 0, this.bitmap.height - 48);
		this.bitmap.blt(src, 96, 96, sw, sh, this.bitmap.width - 48, this.bitmap.height - 48);
		for (var i = 1; i < $gameMap.width() + 1; i++) {
			this.bitmap.blt(src, 48, 0, sw, sh, sw * i, 0);
			this.bitmap.blt(src, 48, 96, sw, sh, sw * i, this.bitmap.height - 48);
		};
		for (var i = 1; i < $gameMap.height() + 1; i++) {
			this.bitmap.blt(src, 0, 48, sw, sh, 0, sh * i);
			this.bitmap.blt(src, 96, 48, sw, sh, this.bitmap.width - 48, sh * i);
		};
	};

	Sprite_MapBorders.prototype.update = function() {
		this.x = -($gameMap._displayX + 1) * $gameMap.tileWidth() + 1;
		this.y = -($gameMap._displayY + 1) * $gameMap.tileHeight();
	};

})(Fogo.MapBorders);
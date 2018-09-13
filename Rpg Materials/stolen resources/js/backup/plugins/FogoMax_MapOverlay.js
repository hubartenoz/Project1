


//=============================================================================
// Map Overlay (v1.0.0)
// by Fogomax
//=============================================================================

/*:
  * @author Fogomax
  * @plugindesc Allows the creation of overlay layers on the map

  <Fogo MapOverlay>
  *
  * @help
  * ===========================================================================
  * * Folder Structure
  * ===========================================================================
  *
  * Place all the images in the following folders:
  *   imgs
  *   „¤„Ÿ„Ÿ„Ÿoverlay (must be created)
  *       „¥„Ÿ„Ÿ„Ÿbrush
  *       „¥„Ÿ„Ÿ„Ÿfog
  *       „¥„Ÿ„Ÿ„Ÿlight
  *       „¤„Ÿ„Ÿ„Ÿshadow
  * 
  * ===========================================================================
  * * Notetags
  * ===========================================================================
  *
  * All the tags must be on the map notatags, all the notetags are case
  * insensive, don't use the asterisks (*).
  *
  * * <shadow: filename, speed, direcion>
  * * <brush: filename, speed, direcion>
  * * <fog: filename, speed, direcion>
  * * <light: filename, speed, direcion>
  * 
  * Where:
  *  - filename: Name of the file on the respective folder
  *  - speed: Speed in pixels of the overlay
  *  - direction: Direction of the movement, it can be: top, bottom, left or
  *               right
  *
  * If the image is static, then you can short the tags like that:
  *
  * * <shadow: filename>
  *
  * This way the overlay image will automatically have 0 speed, so it
  * won't move.
  *
  * To bind the brush layer to the screen or map, use the following notetag:
  *
  * * <brush-bind: type>
  *
  * Where "type" can be either "map" or "screen". If this tag is omitted,
  * then the brush bind is automatically set to "screen".
*/

'use strict';

var Imported = Imported || {};
Imported["Fogo_MapOverlay"] = '1.0.0';

var Fogo = Fogo || {};
Fogo.MapOverlay = {};

(function($) {
	$.Params = $plugins.filter(function(p) { return p.description.contains('<Fogo MapOverlay>'); })[0].parameters;

	$.AxisSign = {
		'top' : '1',
		'bottom' : '-1',
		'left' : '1',
		'right' : '-1'
	};

	$.SHADOW = 0;
	$.BRUSH = 1;
	$.FOG = 2;
	$.LIGHT = 3;

	$.OffsetX = 0;
	$.OffsetY = 0;
	$.Width = 0;
	$.Height = 0;

	//-----------------------------------------------------------------------------
	// ImageManager
	//

	ImageManager.loadOverlayShadow = function(filename, hue) {
		return this.loadBitmap('img/overlay/shadow/', filename, hue, false);
	};

	ImageManager.loadOverlayBrush = function(filename, hue) {
		return this.loadBitmap('img/overlay/brush/', filename, hue, false);
	};

	ImageManager.loadOverlayFog = function(filename, hue) {
		return this.loadBitmap('img/overlay/fog/', filename, hue, false);
	};

	ImageManager.loadOverlayLight = function(filename, hue) {
		return this.loadBitmap('img/overlay/light/', filename, hue, false);
	};

	//-----------------------------------------------------------------------------
	// Scene_Map
	//

	var _Scene_Map_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
	
	Scene_Map.prototype.createDisplayObjects = function() {
		_Scene_Map_createDisplayObjects.call(this);
		this.loadOverlayLayers();
	};

	Scene_Map.prototype.loadOverlayLayers = function() {
		this._overlayLayersData = [];
		var note = $dataMap.note;
		if (note.match(/<shadow\s*:\s*(.+),\s*(\d+),\s*(top|bottom|left|right)>/i)) {
			this._overlayLayers[$.SHADOW].bitmap = ImageManager.loadOverlayShadow(RegExp.$1.toLowerCase());
			this._overlayLayersData[$.SHADOW] = { speed : parseInt(RegExp.$2), direction: RegExp.$3.toLowerCase() };
		} else if (note.match(/<shadow\s*:\s*(.+)\s*>/)) {
			this._overlayLayers[$.SHADOW].bitmap = ImageManager.loadOverlayShadow(RegExp.$1.toLowerCase());
			this._overlayLayersData[$.SHADOW] = { speed : 0, direction: 0 };	
		} else {
			this._overlayLayers[$.SHADOW].bitmap = null;
			this._overlayLayersData[$.SHADOW] = null;
		}
		if (note.match(/<brush\s*:\s*(.+),\s*(\d+),\s*(top|bottom|left|right)>/i)) {
			this._overlayLayers[$.BRUSH].bitmap = ImageManager.loadOverlayBrush(RegExp.$1.toLowerCase());
			this._overlayLayersData[$.BRUSH] = { speed : parseInt(RegExp.$2), direction: RegExp.$3.toLowerCase() };
		} else if (note.match(/<brush\s*:\s*(.+)\s*>/)) {
			this._overlayLayers[$.BRUSH].bitmap = ImageManager.loadOverlayBrush(RegExp.$1.toLowerCase());
			this._overlayLayersData[$.BRUSH] = { speed : 0, direction: 0 };
		} else {
			this._overlayLayers[$.BRUSH].bitmap = null;
			this._overlayLayersData[$.BRUSH] = null;
		}
		if (note.match(/<fog\s*:\s*(.+),\s*(\d+),\s*(top|bottom|left|right)>/i)) {
			this._overlayLayers[$.FOG].bitmap = ImageManager.loadOverlayFog(RegExp.$1.toLowerCase());
			this._overlayLayersData[$.FOG] = { speed : parseInt(RegExp.$2), direction: RegExp.$3.toLowerCase() };
		} else if (note.match(/<fog\s*:\s*(.+)\s*>/)) {
			this._overlayLayers[$.FOG].bitmap = ImageManager.loadOverlayFog(RegExp.$1.toLowerCase());
			this._overlayLayersData[$.FOG] = { speed : 0, direction: 0 };
		} else {
			this._overlayLayers[$.FOG].bitmap = null;
			this._overlayLayersData[$.FOG] = null;
		}
		if (note.match(/<light\s*:\s*(.+),\s*(\d+),\s*(top|bottom|left|right)>/i)) {
			this._overlayLayers[$.LIGHT].bitmap = ImageManager.loadOverlayLight(RegExp.$1.toLowerCase());
			this._overlayLayersData[$.LIGHT] = { speed : parseInt(RegExp.$2), direction: RegExp.$3.toLowerCase() };
		} else if (note.match(/<light\s*:\s*(.+)\s*>/)) {
			this._overlayLayers[$.LIGHT].bitmap = ImageManager.loadOverlayLight(RegExp.$1.toLowerCase());
			this._overlayLayersData[$.LIGHT] = { speed : 0, direction: 0 };
		} else {
			this._overlayLayers[$.LIGHT].bitmap = null;
			this._overlayLayersData[$.LIGHT] = null;
		}
		this._brushBind = note.match(/<brush-*bind\s*:\s*(screen|map)>/i) ? RegExp.$1.toLowerCase() : 'screen';
	};

	var _Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
	
	Scene_Map.prototype.createAllWindows = function() {
		_Scene_Map_createAllWindows.call(this);
		this.createOverlayLayers();
	};

	Scene_Map.prototype.createOverlayLayers = function() {
		var offsetX = $gameMap.width() * $gameMap.tileWidth() < Graphics.boxWidth ?
			Math.abs($gameMap._displayX * $gameMap.tileWidth()) : 0;
		var offsetY = $gameMap.height() * $gameMap.tileHeight() < Graphics.boxHeight ?
			Math.abs($gameMap._displayY * $gameMap.tileHeight()) : 0;

		this._overlayLayers = [];
		this._overlayLayers[$.SHADOW] = new TilingSprite();
		this._overlayLayers[$.BRUSH] = new TilingSprite();
		this._overlayLayers[$.FOG] = new TilingSprite();
		this._overlayLayers[$.LIGHT] = new TilingSprite();

		this._overlayLayers[$.SHADOW].move(offsetX, offsetY, Graphics.width - offsetX * 2, Graphics.height - offsetY * 2);
		this._overlayLayers[$.BRUSH].move(offsetX, offsetY, Graphics.width - offsetX * 2, Graphics.height - offsetY * 2);
		this._overlayLayers[$.FOG].move(offsetX, offsetY, Graphics.width - offsetX * 2, Graphics.height - offsetY * 2);
		this._overlayLayers[$.LIGHT].move(offsetX, offsetY, Graphics.width - offsetX * 2, Graphics.height - offsetY * 2);

		this.addChild(this._overlayLayers[$.SHADOW]);
		this.addChild(this._overlayLayers[$.BRUSH]);
		this.addChild(this._overlayLayers[$.FOG]);
		this.addChild(this._overlayLayers[$.LIGHT]);
	};

	var _Scene_Map_update = Scene_Map.prototype.update;
	
	Scene_Map.prototype.update = function() {
		_Scene_Map_update.call(this);
		this.updateOverlayLayers();
	};

	Scene_Map.prototype.updateOverlayLayers = function() {
		for (var i = 0; i < this._overlayLayers.length; i++) {
			if (!this._overlayLayersData[i]) continue;
			if (i === $.BRUSH && this._brushBind === 'map') {
				this._overlayLayers[i].origin.x = Math.abs($gameMap._displayX * $gameMap.tileWidth());
				this._overlayLayers[i].origin.y = Math.abs($gameMap._displayY * $gameMap.tileHeight());
				continue;
			}
			if (this._overlayLayersData[i].speed > 0) {
				if (this._overlayLayersData[i].direction === 'top' || this._overlayLayersData[i].direction === 'bottom') {
					this._overlayLayers[i].origin.y += this._overlayLayersData[i].speed * $.AxisSign[this._overlayLayersData[i].direction];
				} else if (this._overlayLayersData[i].direction === 'left' || this._overlayLayersData[i].direction === 'right') {
					this._overlayLayers[i].origin.x += this._overlayLayersData[i].speed * $.AxisSign[this._overlayLayersData[i].direction];
				}
			}
		}
	};
})(Fogo.MapOverlay);


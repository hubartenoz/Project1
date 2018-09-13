//=============================================================================
// Map Overlays (v1.5.0)
// by Fogomax
//=============================================================================

/*:
 * @author Fogomax
 * @plugindesc v1.5.0 Allows the creation of overlay layers on the map
 *
 * @help
 * ===========================================================================
 * * Folder Structure
 * ===========================================================================
 *
 * Place all the images in the following folders:
 *   imgs
 *   └───overlay (must be created)
 *       ├───light
 *       ├───fog
 *       ├───brush
 *       ├───shadow
 *       └───under
 * 
 * ===========================================================================
 * * Notetags
 * ===========================================================================
 *
 * All the tags must be on the map notatags, all the notetags are case
 * insensive, don't use the asterisks (*).
 *
 *  <under: filename, speed, direcion, opacity>
 *  <shadow: filename, speed, direcion, opacity>
 *  <brush: filename, speed, direcion, opacity>
 *  <fog: filename, speed, direcion, opacity>
 *  <light: filename, speed, direcion, opacity>
 * 
 * Where:
 *  - filename: Name of the file on the respective folder
 *  - speed: Speed in pixels of the overlay
 *  - direction: Direction of the movement, it can be: top, bottom, left or
 *               right
 *  - opacity: Opacity of the layer (from 0 to 255)
 *
 * If the image is static, then you can short the tags like that:
 *
 *  <shadow: filename>
 *
 * This way the overlay image will automatically have 255 of opacity and
 * 0 speed, so it won't move.
 *
 * To bind the brush layer to the screen or map, use the following notetag:
 *
 *  <brush-bind: type>
 *
 * Where "type" can be either "map" or "screen". If this tag is omitted,
 * then the brush bind is automatically set to "screen".
 * 
 * ===========================================================================
 * * Huge events
 * ===========================================================================
 *
 * You can also insert the notetag <Huge Event> on event comments, this events
 * will be drawn over star tiles and below fog and light overlays.
 * 
 * ===========================================================================
 * * Plugin Commands
 * ===========================================================================
 *
 *  OverlayLayer [layer] on
 * Turns the [layer] visible.
 *
 *  OverlayLayer [layer] off
 * Turns the [layer] invisible.
 *
 *  OverlayLayer [layer] fade [a] [b] [d]
 * Fades the [layer] from the value [a] to the value [b] with the duration of
 * [d] frames.
 *
 *  OverlayLayer [layer] changeto [filename]
 * Change [layer] filename to [filename] permanently (only for the current
 * map).
 *
 * [layer] can be one of these values: under, shadow, brush, fog or light.
 *
*/

var Imported = Imported || {};
Imported["Fogo_MapOverlays"] = '1.5.0';

var Fogo = Fogo || {};
Fogo.MapOverlays = {};

(function($) {
    'use strict';

    $.AxisSign = {
        'top' : '1',
        'bottom' : '-1',
        'left' : '1',
        'right' : '-1'
    };

    $.UNDER = 0;
    $.SHADOW = 1;
    $.BRUSH = 2;
    $.FOG = 3;
    $.LIGHT = 4;

    //-----------------------------------------------------------------------------
    // ImageManager
    //

    ImageManager.loadOverlayUnder = function(filename, hue) {
        return this.loadBitmap('img/overlay/under/', filename, hue, false);
    };

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

    ImageManager.loadOverlayLayer = function(layer, filename, hue) {
        switch (layer.toLowerCase()) {
            case 'under':
                return ImageManager.loadOverlayUnder(filename, hue);
            case 'shadow':
                return ImageManager.loadOverlayShadow(filename, hue);
            case 'brush':
                return ImageManager.loadOverlayBrush(filename, hue);
            case 'fog':
                return ImageManager.loadOverlayFog(filename, hue);
            case 'light':
                return ImageManager.loadOverlayLight(filename, hue);
        }
        return null;
    };

    //-----------------------------------------------------------------------------
    // Game_System
    //

    var _Game_System_initialize = Game_System.prototype.initialize;
   
    Game_System.prototype.initialize = function() {
        _Game_System_initialize.call(this);
        this.initMapOverlayMapLayers();
        this.resetMapOverlayData();
    };

    Game_System.prototype.initMapOverlayMapLayers = function() {
        this._mapOverlayMapLayers = {};
    };

    Game_System.prototype.setMapOverlayMapLayer = function(mapid, layer, filename) {
        this._mapOverlayMapLayers[mapid] = this._mapOverlayMapLayers[mapid] || {};
        this._mapOverlayMapLayers[mapid][layer] = filename;
    };

    Game_System.prototype.setMapOverlayData = function(layer, command, commandData) {
        this._mapOverlayData = {
            requesting: true,
            layer: layer,
            command: command,
            commandData: commandData
        };
    };

    Game_System.prototype.resetMapOverlayData = function() {
        this._mapOverlayData = { requesting: false };
    };

    Game_System.prototype.mapOverlayData = function() {
        return this._mapOverlayData;
    };

    Game_System.prototype.mapOverlayMapLayers = function() {
        return this._mapOverlayMapLayers;
    };

    //-----------------------------------------------------------------------------
    // Game_Interpreter
    //

    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
   
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command.toLowerCase() === 'overlaylayer') {
            var layer = args[0].toLowerCase();
            var command = args[1].toLowerCase();
            var commandData = {};
            if (command === 'fade') {
                commandData = {
                    from: Number(args[2]),
                    to: Number(args[3]),
                    duration: Number(args[4])
                };
            } else if (command === 'changeto') {
                commandData = {
                    filename: args[2]
                };
            }
            $gameSystem.setMapOverlayData(layer, command, commandData);
        }
    };

    //-----------------------------------------------------------------------------
    // Game_Event
    //

    var _Game_Event_initialize = Game_Event.prototype.initialize;

    Game_Event.prototype.initialize = function(mapId, eventId) {
        this._isHuge = false;
        this._requestingHuge = false;
        _Game_Event_initialize.call(this, mapId, eventId);
    };

    var _Game_Event_setupPage = Game_Event.prototype.setupPage;

    Game_Event.prototype.setupPage = function() {
        _Game_Event_setupPage.call(this);
        if (!this._erased && this.page()) {
            var matched = false;

            for (var i = 0; i < this.page().list.length; i++) {
                if (this.page().list[i].code === 108 || this.page().list[i].code === 408) {
                    var comment = this.page().list[i].parameters[0];
                    var match = comment.match(/<Huge *Event>/i);
                    if (match) {
                        matched = true;
                        this._isHuge = true;
                        this._requestingHuge = true;
                        SceneManager._scene.addEventToHugeCharactersLayer(this);
                    }
                }
            }

            if (this._isHuge && !matched) {
                this._isHuge = false;
                SceneManager._scene._spriteset.removeEventFromHugeCharactersLayer(this);
            }
        }
    };

    Game_Event.prototype.removeHugeRequest = function() {
        this._requestingHuge = false;
    };

    Game_Event.prototype.requestingHuge = function() {
        return this._requestingHuge;
    };

    //-----------------------------------------------------------------------------
    // Scene_Map
    //

    var _Scene_Map_initialize = Scene_Map.prototype.initialize;
   
    Scene_Map.prototype.initialize = function() {
        _Scene_Map_initialize.call(this);
        this._displayReady = false;
    };

    var _Scene_Map_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
   
    Scene_Map.prototype.createDisplayObjects = function() {
        _Scene_Map_createDisplayObjects.call(this);
        this._displayReady = true;
        this.handleHugeCharacters();
    };

    Scene_Map.prototype.addEventToHugeCharactersLayer = function(event) {
        if (this._displayReady) {
            this._spriteset.addEventToHugeCharactersLayer(event);
            event.removeHugeRequest();
        }
    };

    Scene_Map.prototype.handleHugeCharacters = function() {
        for (var i = 0; i < $gameMap.events().length; i++) {
            var event = $gameMap.events()[i];
            if (event.requestingHuge()) {
                this.addEventToHugeCharactersLayer(event);
            }
        }
    };

    //-----------------------------------------------------------------------------
    // Spriteset_Map
    //

    Spriteset_Map.prototype.loadOverlayLayersData = function() {
        this._overlayLayersData = [];
        var note = $dataMap.note;
        var mapOverlayMapLayers = $gameSystem.mapOverlayMapLayers()[$gameMap.mapId()] || {};
        if (note.match(/<under\s*:\s*(.+),\s*(\d+),\s*(top|bottom|left|right),\s*(\d+)>/i)) {
            var filename = mapOverlayMapLayers['under'] || RegExp.$1.toLowerCase();
            this._overlayLayers[$.UNDER].bitmap = ImageManager.loadOverlayUnder(filename);
            this._overlayLayers[$.UNDER].opacity = parseInt(RegExp.$4);
            this._overlayLayersData[$.UNDER] = { speed : parseInt(RegExp.$2), direction: RegExp.$3.toLowerCase() };
        } else if (note.match(/<under\s*:\s*(.+)\s*>/)) {
            var filename = mapOverlayMapLayers['under'] || RegExp.$1.toLowerCase();
            this._overlayLayers[$.UNDER].bitmap = ImageManager.loadOverlayUnder(filename);
            this._overlayLayersData[$.UNDER] = { speed : 0, direction: 0 };   
            this._overlayLayers[$.UNDER].opacity = 255;
        } else {
            this._overlayLayers[$.UNDER].bitmap = null;
            this._overlayLayers[$.UNDER].opacity = 255;
            this._overlayLayersData[$.UNDER] = null;
        }
        if (note.match(/<shadow\s*:\s*(.+),\s*(\d+),\s*(top|bottom|left|right),\s*(\d+)>/i)) {
            var filename = mapOverlayMapLayers['shadow'] || RegExp.$1.toLowerCase();
            this._overlayLayers[$.SHADOW].bitmap = ImageManager.loadOverlayShadow(filename);
            this._overlayLayers[$.SHADOW].opacity = parseInt(RegExp.$4);
            this._overlayLayersData[$.SHADOW] = { speed : parseInt(RegExp.$2), direction: RegExp.$3.toLowerCase() };
        } else if (note.match(/<shadow\s*:\s*(.+)\s*>/)) {
            var filename = mapOverlayMapLayers['shadow'] || RegExp.$1.toLowerCase();
            this._overlayLayers[$.SHADOW].bitmap = ImageManager.loadOverlayShadow(filename);
            this._overlayLayersData[$.SHADOW] = { speed : 0, direction: 0 };   
            this._overlayLayers[$.SHADOW].opacity = 255;
        } else {
            this._overlayLayers[$.SHADOW].bitmap = null;
            this._overlayLayers[$.SHADOW].opacity = 255;
            this._overlayLayersData[$.SHADOW] = null;
        }
        if (note.match(/<brush\s*:\s*(.+),\s*(\d+),\s*(top|bottom|left|right),\s*(\d+)>/i)) {
            var filename = mapOverlayMapLayers['brush'] || RegExp.$1.toLowerCase();
            this._overlayLayers[$.BRUSH].bitmap = ImageManager.loadOverlayBrush(filename);
            this._overlayLayers[$.BRUSH].opacity = parseInt(RegExp.$4);
            this._overlayLayersData[$.BRUSH] = { speed : parseInt(RegExp.$2), direction: RegExp.$3.toLowerCase() };
        } else if (note.match(/<brush\s*:\s*(.+)\s*>/)) {
            var filename = mapOverlayMapLayers['brush'] || RegExp.$1.toLowerCase();
            this._overlayLayers[$.BRUSH].bitmap = ImageManager.loadOverlayBrush(filename);
            this._overlayLayersData[$.BRUSH] = { speed : 0, direction: 0 };
            this._overlayLayers[$.BRUSH].opacity = 255;
        } else {
            this._overlayLayers[$.BRUSH].bitmap = null;
            this._overlayLayers[$.BRUSH].opacity = 255;
            this._overlayLayersData[$.BRUSH] = null;
        }
        if (note.match(/<fog\s*:\s*(.+),\s*(\d+),\s*(top|bottom|left|right),\s*(\d+)>/i)) {
            var filename = mapOverlayMapLayers['fog'] || RegExp.$1.toLowerCase();
            this._overlayLayers[$.FOG].bitmap = ImageManager.loadOverlayFog(filename);
            this._overlayLayers[$.FOG].opacity = parseInt(RegExp.$4);
            this._overlayLayersData[$.FOG] = { speed : parseInt(RegExp.$2), direction: RegExp.$3.toLowerCase() };
        } else if (note.match(/<fog\s*:\s*(.+)\s*>/)) {
            var filename = mapOverlayMapLayers['fog'] || RegExp.$1.toLowerCase();
            this._overlayLayers[$.FOG].bitmap = ImageManager.loadOverlayFog(filename);
            this._overlayLayersData[$.FOG] = { speed : 0, direction: 0 };
            this._overlayLayers[$.FOG].opacity = 255;
        } else {
            this._overlayLayers[$.FOG].bitmap = null;
            this._overlayLayers[$.FOG].opacity = 255;
            this._overlayLayersData[$.FOG] = null;
        }
        if (note.match(/<light\s*:\s*(.+),\s*(\d+),\s*(top|bottom|left|right),\s*(\d+)>/i)) {
            var filename = mapOverlayMapLayers['light'] || RegExp.$1.toLowerCase();
            this._overlayLayers[$.LIGHT].bitmap = ImageManager.loadOverlayLight(filename);
            this._overlayLayers[$.LIGHT].opacity = parseInt(RegExp.$4);
            this._overlayLayersData[$.LIGHT] = { speed : parseInt(RegExp.$2), direction: RegExp.$3.toLowerCase() };
        } else if (note.match(/<light\s*:\s*(.+)\s*>/)) {
            var filename = mapOverlayMapLayers['light'] || RegExp.$1.toLowerCase();
            this._overlayLayers[$.LIGHT].bitmap = ImageManager.loadOverlayLight(filename);
            this._overlayLayersData[$.LIGHT] = { speed : 0, direction: 0 };
            this._overlayLayers[$.LIGHT].opacity = 255;
        } else {
            this._overlayLayers[$.LIGHT].bitmap = null;
            this._overlayLayers[$.LIGHT].opacity = 255;
            this._overlayLayersData[$.LIGHT] = null;
        }
        this._brushBind = note.match(/<brush-*bind\s*:\s*(screen|map)>/i) ? RegExp.$1.toLowerCase() : 'screen';
    };

    var _Spriteset_Map_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
   
    Spriteset_Map.prototype.createLowerLayer = function() {
        this.createOverlayLayers();
        _Spriteset_Map_createLowerLayer.call(this);
        this.addOverlayLayers();
    };

    var _Spriteset_Map_createParallax = Spriteset_Map.prototype.createParallax;
   
    Spriteset_Map.prototype.createParallax = function() {
        _Spriteset_Map_createParallax.call(this);
        this._baseSprite.addChild(this._overlayLayers[$.UNDER]);
    };

    Spriteset_Map.prototype.createOverlayLayers = function() {
        var offsetX = $gameMap.width() * $gameMap.tileWidth() < Graphics.boxWidth ?
            Math.abs($gameMap._displayX * $gameMap.tileWidth()) : 0;
        var offsetY = $gameMap.height() * $gameMap.tileHeight() < Graphics.boxHeight ?
            Math.abs($gameMap._displayY * $gameMap.tileHeight()) : 0;

        this._overlayLayers = [];
        this._overlayLayers[$.UNDER] = new TilingSprite();
        this._overlayLayers[$.SHADOW] = new Sprite();
        this._overlayLayers[$.SHADOW].z = 0;
        this._overlayLayers[$.BRUSH] = new TilingSprite();
        this._overlayLayers[$.FOG] = new TilingSprite();
        this._overlayLayers[$.LIGHT] = new TilingSprite();

        this._overlayLayers[$.UNDER].move(offsetX, offsetY, Graphics.width - offsetX * 2, Graphics.height - offsetY * 2);
        this._overlayLayers[$.SHADOW].move(offsetX, offsetY, Graphics.width - offsetX * 2, Graphics.height - offsetY * 2);
        this._overlayLayers[$.BRUSH].move(offsetX, offsetY, Graphics.width - offsetX * 2, Graphics.height - offsetY * 2);
        this._overlayLayers[$.FOG].move(offsetX, offsetY, Graphics.width - offsetX * 2, Graphics.height - offsetY * 2);
        this._overlayLayers[$.LIGHT].move(offsetX, offsetY, Graphics.width - offsetX * 2, Graphics.height - offsetY * 2);

        this._overlayOffsetX = offsetX;
        this._overlayOffsetY = offsetY;

        this._overlayLayersMotions = [];
    };

    var _Spriteset_Map_createCharacters = Spriteset_Map.prototype.createCharacters;
   
    Spriteset_Map.prototype.createCharacters = function() {
        this._tilemap.addChild(this._overlayLayers[$.SHADOW]);
        _Spriteset_Map_createCharacters.call(this);
    };

    Spriteset_Map.prototype.createHugeCharactersLayer = function() {
        this._hugeCharactersLayer = new Sprite();
        this._baseSprite.addChild(this._hugeCharactersLayer);
    };

    Spriteset_Map.prototype.addOverlayLayers = function() {
        this._baseSprite.addChild(this._overlayLayers[$.BRUSH]);
        this.createHugeCharactersLayer();
        this._baseSprite.addChild(this._overlayLayers[$.FOG]);
        this._baseSprite.addChild(this._overlayLayers[$.LIGHT]);
        this.loadOverlayLayersData();
    };

    var _Spriteset_Map_update = Spriteset_Map.prototype.update;
   
    Spriteset_Map.prototype.update = function() {
        _Spriteset_Map_update.call(this);
        this.updateOverlayLayers();
    };

    Spriteset_Map.prototype.updateOverlayLayers = function() {
        for (var i = 0; i < this._overlayLayers.length; i++) {
            if (!this._overlayLayersData[i]) continue;
            if (i === $.SHADOW) {
                if ($gameMap.width() * $gameMap.tileWidth() < Graphics.boxWidth) {
                    this._overlayLayers[i].pivot.x = 0;
                } else {
                    this._overlayLayers[i].pivot.x = $gameMap._displayX * $gameMap.tileWidth();
                }
                if ($gameMap.height() * $gameMap.tileHeight() < Graphics.boxHeight) {
                    this._overlayLayers[i].pivot.y = 0;
                } else {
                    this._overlayLayers[i].pivot.y = $gameMap._displayY * $gameMap.tileHeight();
                }
                continue;   
            }
            if (i === $.BRUSH && this._brushBind === 'map') {
                this._overlayLayers[i].origin.x = Math.abs($gameMap._displayX * $gameMap.tileWidth()) - this._overlayOffsetX;
                this._overlayLayers[i].origin.y = Math.abs($gameMap._displayY * $gameMap.tileHeight()) - this._overlayOffsetY;
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

        if ($gameSystem.mapOverlayData().requesting) {
            var data = $gameSystem.mapOverlayData();
            var layer = this.getLayerByName(data.layer);
            if (layer) {
                this.executeMapOverlayCommand(layer, data.command, data.commandData);
            }
            $gameSystem.resetMapOverlayData();
        }

        this.updateOverlayLayersMotions();
    };

    Spriteset_Map.prototype.updateOverlayLayersMotions = function() {
        for (var i = 0; i < this._overlayLayersMotions.length; i++) {
            var motion = this._overlayLayersMotions[i];
            if (motion.duration > 0) {
                motion.duration--;
                this._overlayLayers[motion.layerIndex].opacity += motion.speed;
            } else {
                this._overlayLayersMotions.splice(this._overlayLayersMotions.indexOf(motion), 1);
            }
        }
    };

    Spriteset_Map.prototype.executeMapOverlayCommand = function(layer, command, data) {
        if (['on', 'off'].contains(command)) {
            layer.visible = command === 'on';
        }
        if (command === 'fade') {
            var difference = data.to - data.from;
            this._overlayLayersMotions.push({
                layerIndex: this._overlayLayers.indexOf(layer),
                speed: difference / data.duration,
                duration: data.duration
            });
            layer.opacity = data.from;
        }
        if (command === 'changeto') {
            var layerName = this.getLayerName(layer);
            $gameSystem.setMapOverlayMapLayer($gameMap.mapId(), layerName, data.filename);
            layer.bitmap = ImageManager.loadOverlayLayer(layerName, data.filename);
        }
    };

    Spriteset_Map.prototype.addEventToHugeCharactersLayer = function(event) {
        var sprite = this._characterSprites.filter(function(sprite) { return sprite._character === event; });
        if (sprite.length && sprite[0]) {
            this._hugeCharactersLayer.addChild(sprite[0]);
        }
    };

    Spriteset_Map.prototype.removeEventFromHugeCharactersLayer = function(event) {
        var sprite = this._characterSprites.filter(function(sprite) { return sprite._character === event; });
        if (sprite.length && sprite[0]) {
            this._hugeCharactersLayer.removeChild(sprite[0]);
            this._tilemap.addChild(sprite[0]);
        }
    };

    Spriteset_Map.prototype.getLayerName = function(layer) {
        var names = ['under', 'shadow', 'brush', 'fog', 'light'];
        return this._overlayLayers.indexOf(layer) < 0 ? null : names[this._overlayLayers.indexOf(layer)];
    };

    Spriteset_Map.prototype.getLayerByName = function(name) {
        var names = ['under', 'shadow', 'brush', 'fog', 'light'];
        return names.indexOf(name) < 0 ? null : this._overlayLayers[names.indexOf(name)];
    };

})(Fogo.MapOverlays);
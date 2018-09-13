
//=============================================================================
// RHachicho Status Screen (v1.0.2)
// by Fogomax
//=============================================================================

/*:
  * @author Fogomax
  * @plugindesc Alternative Status Screen

  <Fogo RHachichoStatusScreen>
  *
  * @help
  * ===========================================================================
  * Åú HELP
  * ===========================================================================
  *
  * @param === Images ===
  * @desc 
  * @default 
  *
  * @param Background Filename
  * @desc Filename of the background image
  * Folder: /img/status_screen
  * @default Background
  * @require 1
  * @dir img/status_screen/
  * @type file
  *
  * @param Bottom Left Filename
  * @desc Filename of the bottom left image
  * Folder: /img/status_screen
  * @default BottomLeft
  * @require 1
  * @dir img/status_screen/
  * @type file
  *
  * @param Top Right Filename
  * @desc Filename of the top right image
  * Folder: /img/status_screen
  * @default TopRight
  * @require 1
  * @dir img/status_screen/
  * @type file
  *
  * @param Status Background Filename
  * @desc Filename of the status background image
  * Folder: /img/status_screen
  * @default StatusBackground
  * @require 1
  * @dir img/status_screen/
  * @type file
  *
  * @param Separator Filename
  * @desc Filename of the separator image
  * Folder: /img/status_screen
  * @default Separator
  * @require 1
  * @dir img/status_screen/
  * @type file
  *
  * @param Equipment Background Filename
  * @desc Filename of the background that is placed behind the equipment image
  * Folder: /img/status_screen
  * @default EquipBackground
  * @require 1
  * @dir img/status_screen/
  * @type file
  *
  * @param 
  * @desc 
  * @default 

  * @param === Images Cordinates ===
  * @desc 
  * @default 
  *
  * @param Bottom Left Coordinates
  * @desc Coordinates of the bottom left image.
  * Format: x, y (bottom-left anchor)
  * @default 0, 1080
  *
  * @param Top Right Coordinates
  * @desc Coordinates of the top right image.
  * Format: x, y (top-right anchor)
  * @default 1920, 0
  *
  * @param Status Background Coordinates
  * @desc Coordinates of the status background image.
  * Format: x, y (top-left anchor)
  * @default 30, 260
  *
  * @param Actor Bust Coordinates
  * @desc Coordinates of the actor bust image.
  * Format: x, y (middle-bottom anchor)
  * @default 1308, 1080
  *
  * @param 
  * @desc 
  * @default 
  *
  * @param === Windows ===
  * @desc 
  * @default 
  *
  * @param Status Coordinates
  * @desc Coordinates of the status window.
  * Format: x, y (top-left anchor)
  * @default 30, 260
  *
  * @param Status Size
  * @desc Size in pixels of the status window
  * Format: [x]x[y] (Example: 200x400)
  * @default 348x645
  *
  * @param Equipment Background Width
  * @desc Width in pixels of the equipment background image
  * @default 324
  *
  * @param 
  * @desc 
  * @default 
  *
  * @param === Vocab ===
  * @desc 
  * @default 
  *
  * @param Attack Short Text
  * @desc Short text for Attack
  * Default: ATK
  * @default ATK
  *
  * @param Defense Short Text
  * @desc Short text for Defense
  * Default: DEF
  * @default DEF
  *
  * @param Magical Attack Short Text
  * @desc Short text for Magical Attack
  * Default: MAT
  * @default MAT
  *
  * @param Magical Defense Short Text
  * @desc Short text for MDefense
  * Default: MDF
  * @default MDF
  *
  * @param Agility Short Text
  * @desc Short text for Agility
  * Default: AGI
  * @default AGI
  *
  * @param Luck Short Text
  * @desc Short text for Luck
  * Default: LUK
  * @default LUK
  *
  * @param Experience Short Text
  * @desc Short text for Experience
  * Default: EXP
  * @default EXP
  *
  * @param Max Level
  * @desc Text to display on the EXP Bar when the player is on the max level. Leave empty to disable.
  * Default: MAX LEVEL
  * @default MAX LEVEL
  *
  * @noteParam Status Screen
  * @noteRequire 1
  * @noteDir img/status_screen/
  * @noteType file
  * @noteData actors
*/

"use strict";

var Imported = Imported || {};
Imported["Fogo_RHachichoStatusScreen"] = "1.0.2";

var Fogo = Fogo || {};
Fogo.RHachichoStatusScreen = {};

(function($) {
	$.Params = $plugins.filter(function(p) { return p.description.contains('<Fogo RHachichoStatusScreen>'); })[0].parameters;

	$.BackgroundFilename = $.Params['Background Filename'];
	$.BottomLeftFilename = $.Params['Bottom Left Filename'];
	$.TopRightFilename = $.Params['Top Right Filename'];
	$.StatusBackgroundFilename = $.Params['Status Background Filename'];
	$.SeparatorFilename = $.Params['Separator Filename'];
	$.EquipmentBackgroundFilename = $.Params['Equipment Background Filename'];
	$.EquipmentBackgroundWidth = parseInt($.Params['Equipment Background Width']);

	if ($.Params['Bottom Left Coordinates'].match(/(\d+)\s*,\s*(\d+)/)) {
		$.BottomLeftCoordinates = {};
		$.BottomLeftCoordinates.x = parseInt(RegExp.$1);
		$.BottomLeftCoordinates.y = parseInt(RegExp.$2);
	}
	if ($.Params['Top Right Coordinates'].match(/(\d+)\s*,\s*(\d+)/)) {
		$.TopRightCoordinates = {};
		$.TopRightCoordinates.x = parseInt(RegExp.$1);
		$.TopRightCoordinates.y = parseInt(RegExp.$2);
	}
	if ($.Params['Status Background Coordinates'].match(/(\d+)\s*,\s*(\d+)/)) {
		$.StatusBackgroundCoordinates = {};
		$.StatusBackgroundCoordinates.x = parseInt(RegExp.$1);
		$.StatusBackgroundCoordinates.y = parseInt(RegExp.$2);
	}
	if ($.Params['Status Coordinates'].match(/(\d+)\s*,\s*(\d+)/)) {
		$.StatusCoordinates = {};
		$.StatusCoordinates.x = parseInt(RegExp.$1);
		$.StatusCoordinates.y = parseInt(RegExp.$2);
	}
	if ($.Params['Actor Bust Coordinates'].match(/(\d+)\s*,\s*(\d+)/)) {
		$.ActorBustCoordinates = {};
		$.ActorBustCoordinates.x = parseInt(RegExp.$1);
		$.ActorBustCoordinates.y = parseInt(RegExp.$2);
	}
	if ($.Params['Status Size'].match(/(\d+)\s*x\s*(\d+)/)) {
		$.StatusSize = {};
		$.StatusSize.width = parseInt(RegExp.$1);
		$.StatusSize.height = parseInt(RegExp.$2);
	}

	$.ATK = $.Params['Attack Short Text'];
	$.DEF = $.Params['Defense Short Text'];
	$.MAT = $.Params['Magical Attack Short Text'];
	$.MDF = $.Params['Magical Defense Short Text'];
	$.AGI = $.Params['Agility Short Text'];
	$.LUK = $.Params['Luck Short Text'];
	$.EXP = $.Params['Experience Short Text'];
	$.MaxLevel = $.Params['Max Level'];

	//-----------------------------------------------------------------------------
	// ImageManager
	//

	ImageManager.loadStatusScreen = function(filename, hue) {
		return this.loadBitmap('img/status_screen/', filename, hue, false);
	};

	//-----------------------------------------------------------------------------
	// Scene_Status
	//

	var _Scene_Status_create = Scene_Status.prototype.create;
	
	Scene_Status.prototype.create = function() {
		Scene_MenuBase.prototype.create.call(this);
		this._statusWindow = new Window_StatusScreen();
		this._statusWindow.setHandler('cancel',   this.popScene.bind(this));
		this._statusWindow.setHandler('pagedown', this.nextActor.bind(this));
		this._statusWindow.setHandler('pageup',   this.previousActor.bind(this));
		this.addWindow(this._statusWindow);
		this.createAllSprites();
		this.refreshActor();
	};

	Scene_Status.prototype.createBackground = function() {
		this._backgroundSprite = new Sprite();
		this._backgroundSprite.bitmap = ImageManager.loadStatusScreen($.BackgroundFilename);
		this._statusBackgroundSprite = new Sprite();
		this._statusBackgroundSprite.bitmap = ImageManager.loadStatusScreen($.StatusBackgroundFilename);
		this._statusBackgroundSprite.x = $.StatusBackgroundCoordinates.x;
		this._statusBackgroundSprite.y = $.StatusBackgroundCoordinates.y;
		this.addChild(this._backgroundSprite);
		this.addChild(this._statusBackgroundSprite);
		this._equipSpritesLayer = new Sprite();
		this.addChild(this._equipSpritesLayer);
	};

	Scene_Status.prototype.createAllSprites = function() {
		this._equipSprites = [];
		this._topRightSprite = new Sprite();
		this._bottomLeftSprite = new Sprite();
		this._actorBustSprite = new Sprite();
		this._topRightSprite.bitmap = ImageManager.loadStatusScreen($.TopRightFilename);
		this._bottomLeftSprite.bitmap = ImageManager.loadStatusScreen($.BottomLeftFilename);
		this._topRightSprite.x = $.TopRightCoordinates.x;
		this._topRightSprite.y = $.TopRightCoordinates.y;
		this._bottomLeftSprite.x = $.BottomLeftCoordinates.x;
		this._bottomLeftSprite.y = $.BottomLeftCoordinates.y;
		this._actorBustSprite.x = $.ActorBustCoordinates.x;
		this._actorBustSprite.y = $.ActorBustCoordinates.y;
		this._topRightSprite.anchor.set(1, 0);
		this._bottomLeftSprite.anchor.set(0, 1);
		this._actorBustSprite.anchor.set(0.5, 1);
		this.addChild(this._topRightSprite);
		this.addChild(this._actorBustSprite);
		this.addChild(this._bottomLeftSprite);
	};

	var _Scene_Status_refreshActor = Scene_Status.prototype.refreshActor;
	
	Scene_Status.prototype.refreshActor = function() {
		_Scene_Status_refreshActor.call(this);
		this._actorBustSprite.bitmap = ImageManager.loadStatusScreen(this._actor.actor().meta['Status Screen']);
		for (var i = 0; i < this._equipSprites.length; i++) {
			this.removeEquipSprite(this._equipSprites[i]);
		};
		this._equipSprites = [];
		var equipBgBitmap = ImageManager.loadStatusScreen("EquipBackground");
		var x = $.StatusCoordinates.x + ($.StatusSize.width - $.EquipmentBackgroundWidth) / 2;
		for (var i = 0; i < this._statusWindow._equipY.length; i++) {
			var y = this._statusWindow._equipY[i];
			var sprite = new Sprite();
			sprite.x = x;
			sprite.y = $.StatusCoordinates.y + y;
			sprite.bitmap = equipBgBitmap;
			this._equipSprites.push(sprite);
			this.addEquipSprite(sprite);
		};
	};

	Scene_Status.prototype.addEquipSprite = function(equipSprite) {
		this._equipSpritesLayer.addChild(equipSprite);
	};

	Scene_Status.prototype.removeEquipSprite = function(equipSprite) {
		this._equipSpritesLayer.removeChild(equipSprite);
	};

	//-----------------------------------------------------------------------------
	// Window_StatusScreen
	//

	function Window_StatusScreen() {
		this.initialize.apply(this, arguments);
	};

	Window_StatusScreen.prototype = Object.create(Window_Status.prototype);
	Window_StatusScreen.prototype.constructor = Window_StatusScreen;

	Window_StatusScreen.prototype.initialize = function() {
		Window_Status.prototype.initialize.call(this);
		this.x = $.StatusCoordinates.x;
		this.y = $.StatusCoordinates.y;
		this.width = $.StatusSize.width;
		this.height = $.StatusSize.height;
		this.opacity = 0;
		this._equipY = [];
	};

	Window_StatusScreen.prototype.refresh = function() {
		this.contents.clear();
		this._equipY = [];

		var separatorPositions = [];
		var x = 0;
		var y = 0;

		if (this._actor) {
			var actor = this._actor;
			var lineHeight = this.lineHeight();
			var mw = $.StatusSize.width / 2;
			
			var nameW = this.textWidth(actor.name());
			this.drawActorName(actor, x, y, nameW);
			this.drawActorLevel(actor, this.width - (120 + this.textPadding()), y);
			y += lineHeight;

			this.drawActorHp(actor, x, y, this.width - this.standardPadding() * 2);
			y += lineHeight;
			this.drawActorMp(actor, x, y, this.width - this.standardPadding() * 2);
			y += lineHeight;
			this.drawActorExp(actor, x, y, this.width - this.standardPadding() * 2);

			y += lineHeight;
			separatorPositions.push(y + 9);
			
			y += lineHeight / 3 + 9;
			var sw = mw  - this.textWidth($.ATK);
			var swx = this.textWidth($.ATK);
			this.drawText($.ATK, x + 9, y);
			this.drawText(actor.atk, x + swx, y, sw, 'center');
			this.drawText($.DEF, x + mw + 6, y);
			this.drawText(actor.def, mw + swx, y, sw, 'center');

			y += lineHeight;
			this.drawText($.MAT, x + 9, y);
			this.drawText(actor.mat, x + swx, y, sw, 'center');
			this.drawText($.MDF, x + mw + 6, y);
			this.drawText(actor.mdf, mw + swx, y, sw, 'center');

			y += lineHeight;
			this.drawText($.AGI, x + 9, y);
			this.drawText(actor.agi, x + swx, y, sw, 'center');
			this.drawText($.LUK, x + mw + 6, y);
			this.drawText(actor.luk, mw + swx, y, sw, 'center');

			y += lineHeight + 9;
			separatorPositions.push(y);

			y += lineHeight / 3 + 2;
			var equips = this._actor.equips();
			var count = Math.min(equips.length, this.maxEquipmentLines());
			for (var i = 0; i < count; i++) {
				this.drawItemName(equips[i], x + 18, y + 48 * i + 6);
				this._equipY.push(y + 48 * i + 2 + lineHeight / 2);
			}
		}

		var bitmapSeparator = ImageManager.loadStatusScreen($.SeparatorFilename);
		var c = this.contents;
		bitmapSeparator.addLoadListener(function() {
			for (var i = 0; i < separatorPositions.length; i++) {
				c.blt(bitmapSeparator, 0, 0, bitmapSeparator.width, bitmapSeparator.height, x, separatorPositions[i]);
			}
		});
	};

	Window_StatusScreen.prototype.drawActorExp = function(actor, x, y, width) {
		width = width || 186;
		var color1 = this.tpGaugeColor1();
		var color2 = this.tpGaugeColor2();
		var value1 = this._actor.currentExp();
		var value2 = this._actor.nextLevelExp();
		var expRate = value1 / value2;
		if (this._actor.isMaxLevel())
			expRate = 1;
		this.drawGauge(x, y, width, expRate, color1, color2);
		this.changeTextColor(this.systemColor());
		this.drawText($.EXP, x, y, 44);
		this.changeTextColor(this.normalColor());
		if (this._actor.isMaxLevel() && $.MaxLevel) {
			this.drawText($.MaxLevel, x + width - this.textWidth($.MaxLevel), y, this.textWidth($.MaxLevel), 'right');
		} else {
			this.drawCurrentAndMax(value1, value2, x, y, width,
								   this.tpColor(actor), this.normalColor());
			
		}
	};

})(Fogo.RHachichoStatusScreen);
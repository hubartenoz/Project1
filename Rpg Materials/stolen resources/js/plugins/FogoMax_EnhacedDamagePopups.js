//=============================================================================
// Enhanced Battle Popups (v1.0.1)
// by Fogomax
//=============================================================================

/*:
  * @author Fogomax
  * @plugindesc Enhances the default battle popups

  <Fogo EnhancedBattlePopups>
  *
  * @help
  * ===========================================================================
  * ● Set Max Popup Height
  * ===========================================================================
  * To set the max height that a popup can go, use this notetag (it works with
  * actors and enemies):
  *
  *   <Damage Max Offset Y: x>
  *
  * Where "x" is the max height in pixels.
  *
  * ===========================================================================
  * ● States and Buffs popups
  * ===========================================================================
  * To set a popup text on states, use this notetag:
  *
  *   <Popup>
  *   Text: text
  *   Color: color
  *   Size: size
  *   Face: face
  *   </Popup>
  *
  * Where "text" is the text of the popup, "color" is the color in CSS text,
  * "size" is the size of the text in pixels and "face" is the face of the text
  * in CSS format. Examples:
  *
  *   <Popup>
  *   Text: You has been poisoned!
  *   Color: green
  *   Size: 30
  *   Face: Helvetica, sans-serif
  *   </Popup>
  *
  *   <Popup>
  *   Text: You has been silenced!
  *   Color: #cc2e2e
  *   Size: 17
  *   Face: GameFont, Verdana, Arial, Courier New
  *   </Popup>
  *
  * @param == Popups ==
  * @desc 
  * @default 
  *
  * @param Default Damage Filename
  * @desc Filename of the default damage image
  * Folder: /img/system/enhanced_battle_popups/
  * @default Damage
  *
  * @param Critical Damage Filename
  * @desc Filename of the critical damage image
  * Folder: /img/system/enhanced_battle_popups/
  * @default Critical
  *
  * @param Heal Damage Filename
  * @desc Filename of the heal image
  * Folder: /img/system/enhanced_battle_popups/
  * @default Heal
  *
  * @param Default Damage Offset Y
  * @desc Default damage offset Y
  * @default 50
  *
  * @param Popup X Speed
  * @desc Speed in pixels of the popups in the x-axis
  * @default 0.5
  *
  * @param Popup Duration
  * @desc Duration of the popups (in frames)
  * 1 second = 60 frames
  * @default 60
  *
  * @param Opacity Duration
  * @desc Duration of the popups opacity (the time that it will take to fadeout)
  * 1 second = 60 frames
  * @default 60
  *
  * @param 
  * @desc 
  * @default 
  *
  * @param == Buffs ==
  * @desc 
  * @default 
  *
  * @param Max HP
  * @desc The popup configuration for this buff. Leave it blank for no popup. Format: "text", "color", size, "face"
  * @default "+ Max HP!", "white", 25, "GameFont, Verdana, Arial, Courier New"
  *
  * @param Max MP
  * @desc The popup configuration for this buff. Leave it blank for no popup. Format: "text", "color", size, "face"
  * @default "+ Max MP!", "white", 25, "GameFont, Verdana, Arial, Courier New"
  *
  * @param Attack
  * @desc The popup configuration for this buff. Leave it blank for no popup. Format: "text", "color", size, "face"
  * @default "+ Attack!", "white", 25, "GameFont, Verdana, Arial, Courier New"
  *
  * @param Defense
  * @desc The popup configuration for this buff. Leave it blank for no popup. Format: "text", "color", size, "face"
  * @default "+ Defense!", "white", 25, "GameFont, Verdana, Arial, Courier New"
  *
  * @param M.Attack
  * @desc The popup configuration for this buff. Leave it blank for no popup. Format: "text", "color", size, "face"
  * @default "+ M.Attack!", "white", 25, "GameFont, Verdana, Arial, Courier New"
  *
  * @param M.Defense
  * @desc The popup configuration for this buff. Leave it blank for no popup. Format: "text", "color", size, "face"
  * @default "+ M.Defense!", "white", 25, "GameFont, Verdana, Arial, Courier New"
  *
  * @param Agility
  * @desc The popup configuration for this buff. Leave it blank for no popup. Format: "text", "color", size, "face"
  * @default "+ Agility!", "white", 25, "GameFont, Verdana, Arial, Courier New"
  *
  * @param Luck
  * @desc The popup configuration for this buff. Leave it blank for no popup. Format: "text", "color", size, "face"
  * @default "+ Luck!", "white", 25, "GameFont, Verdana, Arial, Courier New"
*/

var Imported = Imported || {};
Imported["Fogo_EnhancedBattlePopups"] = "1.0.1";

var Fogo = Fogo || {};
Fogo.EnhancedBattlePopups = {};

(function($) {
	'use strict';

	$.Params = $plugins.filter(function(p) { return p.description.contains('<Fogo EnhancedBattlePopups>'); })[0].parameters;

	$.DefaultDamageFilename = $.Params['Default Damage Filename'];
	$.CriticalDamageFilename = $.Params['Critical Damage Filename'];
	$.HealDamageFilename = $.Params['Heal Damage Filename'];
	$.OffsetXAmount = Number($.Params['Popup X Speed']);
	$.DefaultDamageOffsetY = Number($.Params['Default Damage Offset Y']);
	$.Duration = Number($.Params['Popup Duration']);
	$.OpacityDuration = Number($.Params['Opacity Duration']);
	$.DamageSide = 1;
	$.MaxHPData = eval('[' + $.Params['Max HP'] + ']');
	$.MaxMPData = eval('[' + $.Params['Max MP'] + ']');
	$.AttackData = eval('[' + $.Params['Attack'] + ']');
	$.DefenseData = eval('[' + $.Params['Defense'] + ']');
	$.MAttackData = eval('[' + $.Params['M.Attack'] + ']');
	$.MDefenseData = eval('[' + $.Params['M.Defense'] + ']');
	$.AgilityData = eval('[' + $.Params['Agility'] + ']');
	$.LuckData = eval('[' + $.Params['Luck'] + ']');

	$.BuffsData = [$.MaxHPData, $.MaxMPData, $.AttackData, $.DefenseData, $.MAttackData, $.MDefenseData, $.AgilityData, $.LuckData];
	$.BuffsData = $.BuffsData.map(function(data) { return { text: data[0], color: data[1], size: data[2], face: data[3] }});

	//-----------------------------------------------------------------------------
	// ImageManager
	//

	ImageManager.loadEnhancedPopups = function(filename, hue) {
		return this.loadBitmap('img/system/enhanced_battle_popups/', filename, hue, false);
	};

	//-----------------------------------------------------------------------------
	// DataManager
	//

	var _DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;

	DataManager.isDatabaseLoaded = function() {
		if (!_DataManager_isDatabaseLoaded.call(this)) return false;
		this.loadDamageMaxOffsetY();
		return true;
	};

	DataManager.loadDamageMaxOffsetY = function() {
		for (var i = $dataActors.length - 1; i >= 0; i--) {
			if (!$dataActors[i]) continue;
			var note = $dataActors[i].note;
			var r = /<DAMAGE[ -]*MAX[ -]*OFFSET[ -]*Y[ -]*:[ -]*(\d+)>/i;
			$dataActors[i].damageMaxOffsetY = note.match(r) ? parseInt(RegExp.$1) : $.DefaultDamageOffsetY;
		};

		for (var i = $dataEnemies.length - 1; i >= 0; i--) {
			if (!$dataEnemies[i]) continue;
			var note = $dataEnemies[i].note;
			var r = /<DAMAGE[ -]*MAX[ -]*OFFSET[ -]*Y[ -]*:[ -]*(\d+)>/i;
			$dataEnemies[i].damageMaxOffsetY = note.match(r) ? parseInt(RegExp.$1) : $.DefaultDamageOffsetY;
		};

		for (var i = $dataStates.length - 1; i >= 0; i--) {
			if (!$dataStates[i]) continue;
			var note = $dataStates[i].note;
			var notelines = note.split(/[\r\n]+/);
			var readingState = false;
			var text = '';
			var color = '';
			var size = 0;
			var face = '';

			for (var j = 0; j < notelines.length; j++) {
				var line = notelines[j];
				if (line.match(/<POPUP>/i)) {
					readingState = true;
				}
				if (!readingState) continue;
				if (line.match(/TEXT[ ]*:[ ]*(.+)/i)) {
					text = RegExp.$1;
				}
				if (line.match(/COLOR[ ]*:[ ]*(.+)/i)) {
					color = RegExp.$1;
				}
				if (line.match(/SIZE[ ]*:[ ]*(\d+)/i)) {
					size = parseInt(RegExp.$1);
				}
				if (line.match(/FACE[ ]*:[ ]*(.+)/i)) {
					face = RegExp.$1;
				}
				if (line.match(/<\/POPUP>/i)) {
					readingState = false;
				}
			}

			var r = /<DAMAGE[ -]*MAX[ -]*OFFSET[ -]*Y[ -]*:[ -]*(\d+)>/i;
			$dataStates[i].damageMaxOffsetY = note.match(r) ? parseInt(RegExp.$1) : $.DefaultDamageOffsetY;
			$dataStates[i].popupText = text;
			$dataStates[i].popupColor = color;
			$dataStates[i].popupSize = size;
			$dataStates[i].popupFace = face;
		};
	};

	//-----------------------------------------------------------------------------
	// Game_BattlerBase
	//

	var _Game_BattlerBase_clearStates = Game_BattlerBase.prototype.clearStates;
	
	Game_BattlerBase.prototype.clearStates = function() {
		_Game_BattlerBase_clearStates.call(this);
		this._statePopups = [];
	};

	var _Game_BattlerBase_clearBuffs = Game_BattlerBase.prototype.clearBuffs;
	
	Game_BattlerBase.prototype.clearBuffs = function() {
		_Game_BattlerBase_clearBuffs.call(this);
		this._buffPopups = [];
	};

	var _Game_BattlerBase_addNewState = Game_BattlerBase.prototype.addNewState;
	
	Game_BattlerBase.prototype.addNewState = function(stateId) {
		_Game_BattlerBase_addNewState.call(this, stateId);
		var state = $dataStates[stateId];
		if (state.popupText !== '') {
			this._statePopups.push({
				text: state.popupText,
				size: state.popupSize,
				color: state.popupColor,
				face: state.popupFace
			});
		}
	};

	var _Game_BattlerBase_increaseBuff = Game_BattlerBase.prototype.increaseBuff;
	
	Game_BattlerBase.prototype.increaseBuff = function(paramId) {
		var lastBuffAmount = this._buffs[paramId];
		_Game_BattlerBase_increaseBuff.call(this, paramId);
		var buff = $.BuffsData[paramId];
		if (buff && lastBuffAmount !== this._buffs[paramId]) {
			this._buffPopups.push({
				text: buff.text,
				size: buff.size,
				color: buff.color,
				face: buff.face
			});
		}
	};

	Game_Battler.prototype.shiftStatePopup = function() {
		return this._statePopups.shift();
	};

	Game_Battler.prototype.isStatePopupRequested = function() {
		return this._statePopups.length > 0;
	};

	Game_Battler.prototype.shiftBuffPopup = function() {
		return this._buffPopups.shift();
	};

	Game_Battler.prototype.isBuffPopupRequested = function() {
		return this._buffPopups.length > 0;
	};

	//-----------------------------------------------------------------------------
	// Sprite_Battler
	//

	var _Sprite_Battler_initMembers = Sprite_Battler.prototype.initMembers;
	
	Sprite_Battler.prototype.initMembers = function() {
		_Sprite_Battler_initMembers.call(this);
		this._statesBuffsPopups = [];
		this._buffPopups = [];
	};

	Sprite_Battler.prototype.setupDamagePopup = function() {
		if (this._battler.isDamagePopupRequested()) {
		  if (this._battler.isSpriteVisible()) {
			var sprite = new Sprite_Damage();
			sprite.x = this.x + this.damageOffsetX();
			sprite.y = this.y + this.damageOffsetY();
			sprite.setup(this._battler);
			sprite.fixPosition(this._battler, this);
			sprite.setSide($.DamageSide);
			this.pushDamageSprite(sprite);
			BattleManager._spriteset.addChild(sprite);
			this._battler.clearResult();
			$.DamageSide *= -1;
		  }
		} else {
		  this._battler.clearDamagePopup();
		}
	};

	var _Sprite_Battler_updateMain = Sprite_Battler.prototype.updateMain;
	
	Sprite_Battler.prototype.updateMain = function() {
		_Sprite_Battler_updateMain.call(this);
		this.updateStateBuffPopups();
	};

	Sprite_Battler.prototype.updateStateBuffPopups = function() {
		if (this._statesBuffsPopups.length > 0) {
			if (!this._statesBuffsPopups[0].isPlaying()) {
				this.removeChild(this._statesBuffsPopups[0]);
				this._statesBuffsPopups.shift();
			}
		}

		while (this._battler.isStatePopupRequested()) {
			var popup = this._battler.shiftStatePopup();
			this.createPopup(popup);
		}

		while (this._battler.isBuffPopupRequested()) {
			var popup = this._battler.shiftBuffPopup();
			this.createPopup(popup)
		}
	};

	Sprite_Battler.prototype.createPopup = function(popup) {
		if (this._statesBuffsPopups.length > 0) {
			var heightBuffer = this._statesBuffsPopups.reduce(function(sum, popup) {
				return sum + popup.bitmap.fontSize;
			}, 0);
			for (var i = 0; i < this._statesBuffsPopups.length; i++) {
				this._statesBuffsPopups[i].y -= heightBuffer;
			};
		}

		var sprite = new Sprite_FloatingDamage(popup);
		sprite.setup(this._battler, this);
		this._statesBuffsPopups.push(sprite);
		this.addChild(sprite);
	};

	//-----------------------------------------------------------------------------
	// Sprite_Damage
	//

	var _Sprite_Damage_initialize = Sprite_Damage.prototype.initialize;
	
	Sprite_Damage.prototype.initialize = function() {
		_Sprite_Damage_initialize.call(this);
		this._damageDefaultBitmap = this._damageBitmap;
		this._damageNormalBitmap = ImageManager.loadEnhancedPopups($.DefaultDamageFilename);
		this._damageCritialBitmap = ImageManager.loadEnhancedPopups($.CriticalDamageFilename);
		this._damageHealBitmap = ImageManager.loadEnhancedPopups($.HealDamageFilename);
		this._damageBitmap = this._damageNormalBitmap;
		this._type = 'normal';
		this._result = 0;
		this._side = 0;
		this._duration = $.Duration;
		this._damageMaxOffsetY = $.DefaultDamageOffsetY;
		this._yVelocity = this._damageMaxOffsetY / $.Duration;
		this._accumulatedY = 0;
		this._updateOpacity = false;
		this._opacityDuration = 255 / $.OpacityDuration;
		this._isPlaying = true;
		this._battlerX = 0;
		this._battlerY = 0;
		this._positionFixed = false;
	};

	Sprite_Damage.prototype.setup = function(target, sprite) {
		this._result = target.shiftDamagePopup();
		var result = this._result;
		if (target.isActor()) {
			this._damageMaxOffsetY = target.actor().damageMaxOffsetY;
		} else if (target.isEnemy()) {
			this._damageMaxOffsetY = target.enemy().damageMaxOffsetY;
		}
		this._yVelocity = this._damageMaxOffsetY / $.Duration;
		if (result.critical) {
			this._damageBitmap = this._damageCritialBitmap;
			this._type = 'critical';
		}
		if (result.hpAffected && result.hpDamage < 0) {
			this._damageBitmap = this._damageHealBitmap;
			this._type = 'heal';
		}
		if (result.missed || result.evaded) {
			this._type = 'default';
			this._damageBitmap = this._damageDefaultBitmap;
			this.createMiss();
		} else if (result.hpAffected) {
			this._result = Math.abs(result.hpDamage);
			this.createDigits(0, this._result);
		} else if (target.isAlive() && result.mpDamage !== 0) {
			this._result = result.mpDamage;
			this.createDigits(0, this._result);
		}
		if (this._type === 'heal') {
			this._side = 0;
		}
	};

	Sprite_Damage.prototype.fixPosition = function(battler, sprite) {
		if (sprite && !this._positionFixed) {
			this._positionFixed = true;
			this._sprite = sprite;
			this._battler = battler;
			this.x = sprite.x;
			this.y = sprite.y;
			this._battlerX = this.x;
			this._battlerY = this.y;
			if (this._battler && this._battler.isActor() && this._sprite._mainSprite) {
				this.y += this._sprite._mainSprite.height;
			}
		}
	};

	Sprite_Damage.prototype.setSide = function(side) {
		if (this._type !== 'heal')
			this._side = side;
	};
	
	var _Sprite_Damage_update = Sprite_Damage.prototype.update;
	
	Sprite_Damage.prototype.update = function() {
		_Sprite_Damage_update.call(this);
		if (this._sprite && !this._updateOpacity) {
			this.x = this._battlerX;
			this.y = this._battlerY;
			if (this._battler && this._battler.isActor() && this._sprite._mainSprite) {
				this.y += this._sprite._mainSprite.height / 2;
			}
		}

		this._accumulatedY += this._yVelocity;
		if (this._accumulatedY >= this._damageMaxOffsetY) {
			this._updateOpacity = true;
		}
	};

	Sprite_Damage.prototype.updateChild = function(sprite) {
		if (this._accumulatedY < this._damageMaxOffsetY) {
			sprite.x += $.OffsetXAmount * this._side;
			sprite.y -= this._yVelocity;
		}
		sprite.opacity = this.opacity;
		sprite.setBlendColor(this._flashColor);
	};

	Sprite_Damage.prototype.updateOpacity = function() {
		if (this._updateOpacity) {
			this.opacity -= this._opacityDuration;
			if (this.opacity <= 0) {
				this._isPlaying = false;
			}
		}
	};

	Sprite_Damage.prototype.getWidth = function() {
		return this._result.toString().length * this.digitWidth();
	};

	Sprite_Damage.prototype.getHeight = function() {
		return this.digitHeight();
	};

	var _Sprite_Damage_digitHeight = Sprite_Damage.prototype.digitHeight;
	
	Sprite_Damage.prototype.digitHeight = function() {
		switch (this._type) {
			case 'normal':
			return this._damageNormalBitmap ? this._damageNormalBitmap.height : 0;
			case 'critical':
			return this._damageCritialBitmap ? this._damageCritialBitmap.height : 0;
			case 'heal':
			return this._damageHealBitmap ? this._damageHealBitmap.height : 0;
		}
		return _Sprite_Damage_digitHeight.call(this);
	};

	var _Sprite_Damage_digitWidth = Sprite_Damage.prototype.digitWidth;

	Sprite_Damage.prototype.digitWidth = function() {
		switch (this._type) {
			case 'normal':
			return this._damageNormalBitmap ? this._damageNormalBitmap.width / 10 : 0;
			case 'critical':
			return this._damageCritialBitmap ? this._damageCritialBitmap.width / 10 : 0;
			case 'heal':
			return this._damageHealBitmap ? this._damageHealBitmap.width / 10 : 0;
		}
		return _Sprite_Damage_digitWidth.call(this);
	};

	Sprite_Damage.prototype.isPlaying = function() {
		return this._isPlaying;
	};

	//-----------------------------------------------------------------------------
	// Sprite_FloatingDamage
	//

	function Sprite_FloatingDamage() {
		this.initialize.apply(this, arguments);
	}

	Sprite_FloatingDamage.prototype = Object.create(Sprite.prototype);
	Sprite_FloatingDamage.prototype.constructor = Sprite_FloatingDamage;

	Sprite_FloatingDamage.prototype.initialize = function(popup) {
		Sprite.prototype.initialize.call(this);
		this.bitmap = new Bitmap(1, 1);
		this._duration = $.Duration;
		this._damageMaxOffsetY = $.DefaultDamageOffsetY;
		this._yVelocity = this._damageMaxOffsetY / $.Duration;
		this._accumulatedY = 0;
		this._updateOpacity = false;
		this._opacityDuration = 255 / $.OpacityDuration;
		this._isPlaying = true;
		this._popup = popup;
		this.anchor.x = 0.5;
		this.anchor.y = 0.5;
		this.createText();
	};

	Sprite_FloatingDamage.prototype.createText = function() {
		this.bitmap.textColor = this._popup.color;
		this.bitmap.fontSize = this._popup.size;
		var w = this.bitmap.measureTextWidth(this._popup.text);
		this.bitmap = new Bitmap(w, this._popup.size);
		this.bitmap.textColor = this._popup.color;
		this.bitmap.fontSize = this._popup.size;
		this.bitmap.fontFace = this._popup.face;
		this.bitmap.outlineColor = 'black';
		this.bitmap.drawText(this._popup.text, 0, 0, w, this._popup.size);
	};

	Sprite_FloatingDamage.prototype.setup = function(target, sprite) {
		if (sprite) {
			this.y = -sprite.height / 2;
			if (target && target.isActor() && sprite._mainSprite) {
				this.y += sprite._mainSprite.height / 2;
			}
		}

		if (target.isActor()) {
			this._damageMaxOffsetY = target.actor().damageMaxOffsetY;
		} else if (target.isEnemy()) {
			this._damageMaxOffsetY = target.enemy().damageMaxOffsetY;
		}

		this._yVelocity = this._damageMaxOffsetY / $.Duration;
	};

	Sprite_FloatingDamage.prototype.update = function() {
		this._accumulatedY += this._yVelocity;
		if (this._accumulatedY >= this._damageMaxOffsetY) {
			this._updateOpacity = true;
		}
		if (this._accumulatedY < this._damageMaxOffsetY) {
			this.y -= this._yVelocity;
		}
		if (this._updateOpacity) {
			this.opacity -= this._opacityDuration;
			if (this.opacity <= 0) {
				this._isPlaying = false;
			}
		}
	};

	Sprite_FloatingDamage.prototype.isPlaying = function() {
		return this._isPlaying;
	};

	//-----------------------------------------------------------------------------
	// Spriteset_Battle
	//

	var _Spriteset_Battle_initialize = Spriteset_Battle.prototype.initialize;
	
	Spriteset_Battle.prototype.initialize = function() {
		_Spriteset_Battle_initialize.call(this);
		var preloadDamageNormalBitmap = ImageManager.loadEnhancedPopups($.DefaultDamageFilename);
		var preloadDamageCritialBitmap = ImageManager.loadEnhancedPopups($.CriticalDamageFilename);
		var preloadDamageHealBitmap = ImageManager.loadEnhancedPopups($.HealDamageFilename);
	};

})(Fogo.EnhancedBattlePopups);
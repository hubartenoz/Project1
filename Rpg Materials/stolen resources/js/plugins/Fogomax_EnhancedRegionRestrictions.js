
//=============================================================================
// Enhanced Region Restrictions (v1.0.0)
// by Fogomax
// Based on Region Restrictions by Yanfly
//=============================================================================

/*:
  * @author Fogomax
  * @plugindesc Allows the creation of special passability rules based on the region ID of the tile
  <Fogo EnhancedRegionRestrictions>
  *
  * @help
  * ===========================================================================
  *  * Plugin Command
  * ===========================================================================
  *
  * Available plugin commands:
  *
  *   RegionRestrictionRule x r
  *
  *    Sets the rule of the region of ID "x" to "r". Where "r" can be:
  *     - "allow": Allows the region for the player and all events.
  *     - "restrict": Restricts the region for the player and all events.
  *
  *    This command will override all the other rules (e.g. notetags).
  *    Examples:
  *     RegionRestrictionRule 15 allow
  *     RegionRestrictionRule 3 allow
  *     RegionRestrictionRule 7 restrict
  *
  *   RegionRestrictionRule x reset
  *
  *    Erases the especial rule from the region of ID "x", so the other
  *    factors will be considered (e.g. regions on the plugin parameters).
  *
  *    Examples:
  *     RegionRestrictionRule 3 reset
  *     RegionRestrictionRule 12 reset
  *
  * ===========================================================================
  *  * Notetags
  * ===========================================================================
  *
  * Insert this notetags on the Map Properties window:
  *
  *   <Player Restrict Region: x>
  *   <Player Restrict Region: x, x, x>
  *   Restricts region x for the player on this particular map. Use multiple x
  *   to mark more regions.
  *
  *   <Event Restrict Region: x>
  *   <Event Restrict Region: x, x, x>
  *   Restricts region x for all events on this particular map. Use multiple x
  *   to mark more regions.
  *
  *   <All Restrict Region: x>
  *   <All Restrict Region: x, x, x>
  *   Restricts region x for the player and all events on this particular map.
  *   Use multiple x to mark more regions.
  *
  *   <Player Allow Region: x>
  *   <Player Allow Region: x, x, x>
  *   Allows region x for the player on this particular map. Use multiple x
  *   to mark more regions.
  *
  *   <Event Allow Region: x>
  *   <Event Allow Region: x, x, x>
  *   Allows region x for all events on this particular map. Use multiple x
  *   to mark more regions.
  *
  *   <All Allow Region: x>
  *   <All Allow Region: x, x, x>
  *   Allows region x for the player and all events on this particular map.
  *   Use multiple x to mark more regions.
  *
  *
  * @param === Player ===
  * @desc This region ID will always allow player passability.
  * To use multiple regions, separate them by commas.
  * @default 0

  * @param Player Allow
  * @desc This region ID will always allow player passability.
  * To use multiple regions, separate them by commas.
  * @default 0
  *
  * @param Player Restrict
  * @desc This region ID will restrict the player from entering.
  * To use multiple regions, separate them by commas.
  * @default 0
  *
  * @param
  * @desc
  * @default

  * @param === Event ===
  * @desc This region ID will always allow player passability.
  * To use multiple regions, separate them by commas.
  * @default 0
  *
  * @param Event Allow
  * @desc This region ID will always allow events passability.
  * To use multiple regions, separate them by commas.
  * @default 0
  *
  * @param Event Restrict
  * @desc This region ID will restrict all events from entering.
  * To use multiple regions, separate them by commas.
  * @default 0
  *
  * @param
  * @desc
  * @default

  * @param === All ===
  * @desc This region ID will always allow player passability.
  * To use multiple regions, separate them by commas.
  * @default 0
  *
  * @param All Restrict
  * @desc This region ID will restrict players and events.
  * To use multiple regions, separate them by commas.
  * @default 0
  *
  * @param All Allow
  * @desc This region ID will always allow both passability.
  * To use multiple regions, separate them by commas.
  * @default 0
*/

'use strict';

var Imported = Imported || {};
Imported["Fogo_EnhancedRegionRestrictions"] = "1.0.0";

var Fogo = Fogo || {};
Fogo.EnhancedRegionRestrictions = {};

(function($) {
	$.Params = $plugins.filter(function(p) { return p.description.contains('<Fogo EnhancedRegionRestrictions>'); })[0].parameters;

	$.PlayerAllowRegions = eval('[' + $.Params['Player Allow'] + ']');
	$.PlayerRestrictRegions = eval('[' + $.Params['Player Restrict'] + ']');
	$.EventAllowRegions = eval('[' + $.Params['Event Allow'] + ']');
	$.EventRestrictRegions = eval('[' + $.Params['Event Restrict'] + ']');
	$.AllAllowRegions = eval('[' + $.Params['All Allow'] + ']');
	$.AllRestrictRegions = eval('[' + $.Params['All Restrict'] + ']');
	$.EspecialAllowRegions = [];
	$.EspecialRestrictRegions = [];

	//-----------------------------------------------------------------------------
	// DataManager
	//

	DataManager.processERRNotetags = function() {
		if (!$dataMap) return;
		$dataMap.playerAllowRegions = $.PlayerAllowRegions.concat($.AllAllowRegions);
		$dataMap.playerRestrictRegions = $.PlayerRestrictRegions.concat($.AllRestrictRegions);
		$dataMap.eventAllowRegions = $.EventAllowRegions.concat($.AllAllowRegions);
		$dataMap.eventRestrictRegions = $.EventRestrictRegions.concat($.AllRestrictRegions);
		if (!$dataMap.note) return;
		var notedata = $dataMap.note.split(/[\r\n]+/);
		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			var array = line.match(/<:player\s*allow\s*region\s*:\s*(\d+(?:\s*,\s*\d+)*)>/i) ? $.ListToArray(RegExp.$1) : [];
			$dataMap.playerAllowRegions.concat(array);

			array = line.match(/<:player\s*restrict\s*region\s*:\s*(\d+(?:\s*,\s*\d+)*)>/i) ? $.ListToArray(RegExp.$1) : [];
			$dataMap.playerRestrictRegions.concat(array);

			array = line.match(/<:event\s*allow\s*region\s*:\s*(\d+(?:\s*,\s*\d+)*)>/i) ? $.ListToArray(RegExp.$1) : [];
			$dataMap.eventAllowRegions.concat(array);

			array = line.match(/<:event\s*restrict\s*region\s*:\s*(\d+(?:\s*,\s*\d+)*)>/i) ? $.ListToArray(RegExp.$1) : [];
			$dataMap.eventRestrictRegions.concat(array);

			array = line.match(/<:all\s*allow\s*region\s*:\s*(\d+(?:\s*,\s*\d+)*)>/i) ? $.ListToArray(RegExp.$1) : [];
			$dataMap.playerAllowRegions.concat(array);
			$dataMap.eventAllowRegions.concat(array);

			array = line.match(/<:all\s*restrict\s*region\s*:\s*(\d+(?:\s*,\s*\d+)*)>/i) ? $.ListToArray(RegExp.$1) : [];
			$dataMap.playerRestrictRegions.concat(array);
			$dataMap.eventRestrictRegions.concat(array);
		}
	}

	//-----------------------------------------------------------------------------
	// Game_Map
	//

	var _Game_Map_setup = Game_Map.prototype.setup;
	
	Game_Map.prototype.setup = function(mapId) {
		_Game_Map_setup.call(this, mapId);
		if ($dataMap) DataManager.processERRNotetags();
	};

	Game_Map.prototype.playerAllowRegions = function() {
		if (!$dataMap.playerAllowRegions) DataManager.processERRNotetags();
		return $dataMap.playerAllowRegions;
	};

	Game_Map.prototype.playerRestrictRegions = function() {
		if (!$dataMap.playerRestrictRegions) DataManager.processERRNotetags();
		return $dataMap.playerRestrictRegions;
	};

	Game_Map.prototype.eventAllowRegions = function() {
		if (!$dataMap.eventAllowRegions) DataManager.processERRNotetags();
		return $dataMap.eventAllowRegions;
	};

	Game_Map.prototype.eventRestrictRegions = function() {
		if (!$dataMap.eventRestrictRegions) DataManager.processERRNotetags();
		return $dataMap.eventRestrictRegions;
	};

	Game_Map.prototype.addEspecialAllowRegion = function(regionId) {
		if (!$.EspecialAllowRegions.contains(regionId)) {
			$.EspecialAllowRegions.push(regionId);
		}
		if ($.EspecialRestrictRegions.contains(regionId)) {
			$.EspecialRestrictRegions.splice($.EspecialRestrictRegions.indexOf(regionId), 1);
		}
	};

	Game_Map.prototype.addEspecialRestrictRegion = function(regionId) {
		if (!$.EspecialRestrictRegions.contains(regionId)) {
			$.EspecialRestrictRegions.push(regionId);
		}
		if ($.EspecialAllowRegions.contains(regionId)) {
			$.EspecialAllowRegions.splice($.EspecialAllowRegions.indexOf(regionId), 1);
		}
	};

	Game_Map.prototype.resetEspecialRegion = function(regionId) {
		if ($.EspecialRestrictRegions.contains(regionId)) {
			$.EspecialRestrictRegions.splice($.EspecialRestrictRegions.indexOf(regionId), 1);
		}
		if ($.EspecialAllowRegions.contains(regionId)) {
			$.EspecialAllowRegions.splice($.EspecialAllowRegions.indexOf(regionId), 1);
		}
	};

	//-----------------------------------------------------------------------------
	// Game_CharacterBase
	//

	var _Game_CharacterBase_isMapPassable = Game_CharacterBase.prototype.isMapPassable;
	
	Game_CharacterBase.prototype.isMapPassable = function(x, y, d) {
		if (this.isEspecialRegionAllow(x, y, d)) return true;
		if (this.isEspecialRegionRestrict(x, y, d)) return false;
		if (this.isPlayerRegionRestrict(x, y, d)) return false;
		if (this.isEventRegionRestrict(x, y, d)) return false;
		if (this.isPlayerRegionAllow(x, y, d)) return true;
		if (this.isEventRegionAllow(x, y, d)) return true;
		return _Game_CharacterBase_isMapPassable.call(this, x, y, d);
	};

	Game_CharacterBase.prototype.isEspecialRegionAllow = function(x, y, d) {
		var regionId = this.getNextRegionId(x, y, d);
		if (regionId === 0) return false;
		return $.EspecialAllowRegions.contains(regionId);
	};

	Game_CharacterBase.prototype.isEspecialRegionRestrict = function(x, y, d) {
		var regionId = this.getNextRegionId(x, y, d);
		if (regionId === 0) return false;
		return $.EspecialRestrictRegions.contains(regionId);
	};

	Game_CharacterBase.prototype.isPlayerRegionAllow = function(x, y, d) {
		if (this.isEvent()) return false;
		var regionId = this.getNextRegionId(x, y, d);
		if (regionId === 0) return false;
		return $gameMap.playerAllowRegions().contains(regionId);
	};

	Game_CharacterBase.prototype.isPlayerRegionRestrict = function(x, y, d) {
		if (this.isEvent()) return false;
		if (this.isThrough()) return false;
		var regionId = this.getNextRegionId(x, y, d);
		if (regionId === 0) return false;
		return $gameMap.playerRestrictRegions().contains(regionId);
	};

	Game_CharacterBase.prototype.isEventRegionAllow = function(x, y, d) {
		if (this.isPlayer()) return false;
		var regionId = this.getNextRegionId(x, y, d);
		if (regionId === 0) return false;
		return $gameMap.eventAllowRegions().contains(regionId);
	};

	Game_CharacterBase.prototype.isEventRegionRestrict = function(x, y, d) {
		if (this.isPlayer()) return false;
		if (this.isThrough()) return false;
		var regionId = this.getNextRegionId(x, y, d);
		if (regionId === 0) return false;
		return $gameMap.eventRestrictRegions().contains(regionId);
	};

	Game_CharacterBase.prototype.getNextRegionId = function(x, y, d) {
		switch (d) {
		case 1:
			return $gameMap.regionId(x - 1, y + 1);
			break;
		case 2:
			return $gameMap.regionId(x + 0, y + 1);
			break;
		case 3:
			return $gameMap.regionId(x + 1, y + 1);
			break;
		case 4:
			return $gameMap.regionId(x - 1, y + 0);
			break;
		case 5:
			return $gameMap.regionId(x + 0, y + 0);
			break;
		case 6:
			return $gameMap.regionId(x + 1, y + 0);
			break;
		case 7:
			return $gameMap.regionId(x - 1, y - 1);
			break;
		case 8:
			return $gameMap.regionId(x + 0, y - 1);
			break;
		case 9:
			return $gameMap.regionId(x + 1, y - 1);
			break;
		default:
			return $gameMap.regionId(x, y);
			break;
		}
	};

	Game_CharacterBase.prototype.isPlayer = function() {
		return false;
	};

	Game_CharacterBase.prototype.isEvent = function() {
		return false;
	};

	//-----------------------------------------------------------------------------
	// Game_Player
	//

	Game_Player.prototype.isPlayer = function() {
		return true;
	};

	//-----------------------------------------------------------------------------
	// Game_Event
	//

	Game_Event.prototype.isEvent = function() {
		return true;
	};

	//-----------------------------------------------------------------------------
	// Game_Vehicle
	//

	var _Game_Vehicle_isLandOk = Game_Vehicle.prototype.isLandOk;
	
	Game_Vehicle.prototype.isLandOk = function(x, y, d) {
		if (!_Game_Vehicle_isLandOk.call(this, x, y, d)) return false;
		if (this.isAirship()) {
			d = 5;
			$gamePlayer._through = false;
		}
		if ($gamePlayer.isPlayerRegionForbid(x, y, d)) {
			if (this.isAirship()) $gamePlayer._through = true;
			return false;
		}
		if ($gamePlayer.isPlayerRegionAllow(x, y, d)) {
			if (this.isAirship()) $gamePlayer._through = true;
			return true;
		}
		return true;
	};

	//-----------------------------------------------------------------------------
	// Game_Interpreter
	//

	var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		_Game_Interpreter_pluginCommand.call(this, command, args);
		if (command.toLowerCase() === 'regionrestrictionrule') {
			var regionId = parseInt(args[0]);
			if (args[1].toLowerCase() === 'allow') {
				$gameMap.addEspecialAllowRegion(regionId);
			} else if (args[1].toLowerCase() === 'restrict') {
				$gameMap.addEspecialRestrictRegion(regionId);
			} else if (args[1].toLowerCase() === 'reset') {
				$gameMap.resetEspecialRegion(regionId);
			}
		}
	};

	//-----------------------------------------------------------------------------
	// Utils
	//

	$.ListToArray = function(str) {
		return eval('[' + str + ']');
	};

})(Fogo.EnhancedRegionRestrictions);
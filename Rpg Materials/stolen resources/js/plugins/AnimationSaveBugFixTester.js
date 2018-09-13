//=============================================================================
// Animation Save Bug Fix (v1.3) Rev2
// by Fogomax
//=============================================================================

/*:
 * @author Fogomax
 * @plugindesc This plugin fixes the bug that turns impossible to save the game
 * while an event running in parallel mode is playing an animation on itself.
 *
 * @help
 * ===========================================================================
 * » Description
 * ===========================================================================
 *
 * This plugin fixes the bug that turns impossible to save the game while
 * an event running in parallel mode is playing an animation on itself.
 *
 * It is plug-and-play, no configuration is required. Place this plugin on 
 * the top of the plugin list.
 *
 * ===========================================================================
 * » License
 * ===========================================================================
 * WTFPL – Do What the frick You Want to Public License
 * http://www.wtfpl.net/txt/copying/
*/

(function() {
	'use strict';

	//-----------------------------------------------------------------------------
	// DataManager
	//

	var _DataManager_makeSaveContents = DataManager.makeSaveContents;
	
	DataManager.makeSaveContents = function() {
		var contents = _DataManager_makeSaveContents.call(this);
		if (contents.map) {
			var events = contents.map._events;
			var affected = this.resolveCircularReference(events);
			contents.map._events = JsonEx.makeDeepCopy(events);
			var newEvents = this.addCircularReference(events, affected);
			$gameMap._events = newEvents;
		}
		return contents;
	};

	DataManager.addCircularReference = function(events, affected) {
		var newEvents = []
		for (var i = 0; i < events.length; i++) {
			if (!events[i]) continue;
			var copy = JsonEx.makeDeepCopy(events[i]);
			for (var j = 0; j < affected.length; j++) {
				if (events[i].eventId() === affected[j]) {
					copy._interpreter._character = events[i];
				}
			}
			newEvents.push(copy);
		}
		return newEvents;
	};

	DataManager.resolveCircularReference = function(events) {
		var affected = [];
		for (var i = 0; i < events.length; i++) {
			if (!events[i]) continue;
			if (events[i]._interpreter && events[i]._interpreter._character === events[i]) {
				events[i]._interpreter._character = null;
				affected.push(events[i].eventId());
			}
		}
		return affected;
	};

	//-----------------------------------------------------------------------------
	// Game_Interpreter
	//

	var _Game_Interpreter_updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
	
	Game_Interpreter.prototype.updateWaitMode = function() {
		if (!this._character && ['route', 'animation', 'balloon'].contains(this._waitMode)) {
			this._waitMode = '';
			return false;
		}
		return _Game_Interpreter_updateWaitMode.call(this);
	};

})();
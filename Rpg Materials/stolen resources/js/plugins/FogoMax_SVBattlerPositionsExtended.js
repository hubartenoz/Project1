//=============================================================================
// Position SV Battlers (Extended) (v1.0.0)
// by Fogomax
//=============================================================================

/*:
  * @author Fogomax
  * @plugindesc Allows to set the exact position of each SV Battler

  <Fogo PositionSVBattlersExtended>
  * @help
  * ===========================================================================
  * Åú How to Use
  * ===========================================================================
  * Just insert the position values in the parameters and the battles will
  * start in their respective positions.
  * 
  * @param Actor1 Position X
  * @desc Position X of Actor1
  * (Default: 600)
  * @default 600
  *
  * @param Actor1 Position Y
  * @desc Position Y of Actor1
  * (Default: 280)
  * @default 280
  * 
  * @param Actor2 Position X
  * @desc Position X of Actor2
  * (Default: 632)
  * @default 632
  *
  * @param Actor2 Position Y
  * @desc Position Y of Actor2
  * (Default: 328)
  * @default 328
  * 
  * @param Actor3 Position X
  * @desc Position X of Actor3
  * (Default: 664)
  * @default 664
  *
  * @param Actor3 Position Y
  * @desc Position Y of Actor3
  * (Default: 376)
  * @default 376
  * 
  * @param Actor4 Position X
  * @desc Position X of Actor4
  * (Default: 696)
  * @default 696
  *
  * @param Actor4 Position Y
  * @desc Position Y of Actor4
  * (Default: 424)
  * @default 424
  * 
  * @param Actor5 Position X
  * @desc Position X of Actor5
  * (Default: 728)
  * @default 728
  *
  * @param Actor5 Position Y
  * @desc Position Y of Actor5
  * (Default: 472)
  * @default 472
  * 
  * @param Actor6 Position X
  * @desc Position X of Actor6
  * (Default: 760)
  * @default 760
  *
  * @param Actor6 Position Y
  * @desc Position Y of Actor6
  * (Default: 520)
  * @default 520
*/

"use strict";

var Imported = Imported || {};
Imported["Fogo_PositionSVBattlersExtended"] = "1.0.0";

var Fogo = Fogo || {};
Fogo.PositionSVBattlersExtended = {};

(function($) {
	$.Params = $plugins.filter(function(p) { return p.description.contains('<Fogo PositionSVBattlersExtended>'); })[0].parameters;
	$.actorPosition = [];
	for (var i = 0; i < 6; i++) {
		$.actorPosition[i] = {};
		$.actorPosition[i].x = parseInt($.Params['Actor' + (i + 1) + ' Position X']);
		$.actorPosition[i].y = parseInt($.Params['Actor' + (i + 1) + ' Position Y']);
	}

	//-----------------------------------------------------------------------------
	// Sprite_Actor
	//

	Sprite_Actor.prototype.setActorHome = function(index) {
		this.setHome($.actorPosition[index].x, $.actorPosition[index].y);
	};
})(Fogo.PositionSVBattlersExtended);
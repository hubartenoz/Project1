//=============================================================================
// Entourage Party System (v1.0.1)
// by Fogomax
//=============================================================================r

/*:
  * @author Fogomax
  * @plugindesc Creates a new party whose actors help the battler party.

  <Fogo EntouragePartySystem>
  *
  * @help
  * ===========================================================================
  * * HELP
  * ===========================================================================
  *
  * This plugins creates the Entourage Party. This party is separated from the
  * battle party (the default party of the game), so they only appear in their
  * respective scene (Scene_Entourage).
  *
  * ===========================================================================
  * * Creation of an actor
  * ===========================================================================
  *
  * To create an actor, use this notetag (all the notetags are case insensive,
  * don't use the asterisks (*)):
  * * <Entourage Actor>
  *
  * Now always when you add this actor the the default party members, it will
  * be sent to the entourage party. The actor now needs a biography that will
  * be shown on the entourage scene. To add this, simply use the bio tag:
  *
  * * <Bio>
  * * You can write you text here.
  * * With all the lines you need.
  * * </Bio>
  *
  * You can use the commands of the Message Core of Yanfly to customize your
  * text.
  *
  * ===========================================================================
  * * Skills
  * ===========================================================================
  *
  * All the entourage party members can also learn skills. This skills can be
  * used on the battle party members, but not on the entourage party members.
  * This skills can be used from the menu and never on the battle.
  *
  * ===========================================================================
  * * Passive Skills
  * ===========================================================================
  *
  * Different from the battle party, the entourage party members can have
  * passive skills. All the passive skills have to be included on the passive
  * skills tag:
  *
  * * <Passive skills>
  * * ... your passive skills here ...
  * * </Passive skills>
  *
  * This skills are only active on the map. These are all the types of passive
  * skills:
  *
  * - Gold per time:
  *   > gold ([time]): [amount]
  *   The party gains certain amount of gold per time. The time have to be with
  *   "s" (to seconds) or "m" (to minutes) after the number. Examples:
  *     * gold (5s): 300
  *       The party gains 300 of gold every 5 seconds
  *
  *     * gold (10m): 5000
  *       The party gains 5000 of gold every 10 minutes
  *
  * - Item per time:
  *   > item ([time]): [item_id] ([amount]x)
  *   The party gains an amount of items per time. The time have to be with
  *   "s" (to seconds) or "m" (to minutes) after the number. Examples:
  *     * item (80s): 1 (3x)
  *       The party gains the item of ID 1 (3 times) every 80 seconds
  *
  *     * item (15m): 3 (10x)
  *       The party gains the item of ID 3 (10 times) every 15 minutes
  *
  * - Battle bonus EXP:
  *   > battle bonus exp: [bonus exp]
  *   The party gains an bonus EXP after every battle (if they win). Examples:
  *     * battle bonus exp: 300
  *       The party gains 300 extra EXP after every battle
  *
  * - HP per steps:
  *   > hp ([steps_num] steps): [amount]
  *   The party gains an amount of HP per steps. Example:
  *     * hp (20 steps): 30
  *       The party gains 30 of HP every 20 steps
  *
  *     * hp (50 steps): 100
  *       The party gains 100 of HP every 50 steps
  *
  * - MP per steps:
  *   > MP ([steps_num] steps): [amount]
  *   The party gains an amount of MP per steps. Example:
  *     * mp (10 steps): 20
  *       The party gains 20 of MP every 10 steps
  *
  *     * mp (30 steps): 120
  *       The party gains 120 of MP every 30 steps
  *
  * - Code per time:
  *   > code ([time]): [code]
  *   A code is executed within an interval of time. The time have to be with
  *   "s" (to seconds) or "m" (to minutes) after the number. Examples:
  *     * code (5s): console.log("Hello Entourage!")
  *       "Hello Entourage" will be printed on the console every 5 seconds
  *
  *     * code (10m): $gameVariables.setValue(1, $gameVariables.value(1) + 2)
  *       Increases the value of the variable of ID 1 by 2.
  *
  * A complete example:
  *
  * * <Passive skills>
  * *   gold (2m): 200
  * *   item (50s): 5 (1x)
  * *   item (10m): 7 (3x)
  * *   code (5m): $gameVariables.setValue(3, $gameVariables.value(3) + 1)
  * * </Passive skills>
  *
  * This actor will: give 200 of gold every 2 minutes, give the item of ID 5
  * every 50 seconds, give the item of ID 7 every 10 minutes (3 times) and
  * will increase the value of the variable of ID 3 every 5 minutes.
  *
  * ===========================================================================
  * * Talk
  * ===========================================================================
  *
  * You can set a common event ID to be executed when the command "Talk" is
  * activated. To do this, use this notetag:
  *
  * * <Talk Event ID: [id]>
  *
  * Where [id] is the ID of the common event.
  *
  * ===========================================================================
  * * Customizing the Scene Entourage
  * ===========================================================================
  *
  * You can customize a lot of the scene through the plugin parameters, but two
  * items need have attention: the name of the actor and his burst.
  * The name of the actors is set by images, their name must follow this
  * pattern: ActorName[ID], where [ID] is the ID of the actor in the database.
  * Example: ActorName5. 
  * 
  * The bust images must follow this pattern: ActorBust[ID], where ID is the
  * ID of the actor in the database. Example: ActorBust2.
  *
  * Don't forget that all the images of this plugins must be in the folder
  * "entourage" (/imgs/entourage).
  *
  * @param == Profile Window ==
  * @desc 
  * @default 
  *
  * @param Profile Name Height
  * @desc Height of the name image of the profile window
  * Default: 40
  * @default 40
  *
  * @param Profile Lines
  * @desc Number of lines of the profile window
  * Default: 4
  * @default 4
  *
  * @param PW Opacity
  * @desc Opacity of the profile window
  * 255 = 100% visible | 0 = 0% visible
  * Default: 255
  * @default 255
  *
  * @param 
  * @desc 
  * @default 
  *
  * @param == Actor List Window ==
  * @desc 
  * @default 
  *
  * @param Actors List Width
  * @desc Width of the Actor List window (in percentage)
  * Default: 30%
  * @default 30%
  *
  * @param Character Height
  * @desc Height of the characters sprites (in pixels)
  * Default: 48
  * @default 48
  *
  * @param Actors List Visible Items
  * @desc Number of items that will be visible on the Actors List
  * Default: 8
  * @default 8
  *
  * @param ALW Opacity
  * @desc Opacity of the Actor List window
  * 255 = 100% visible | 0 = 0% visible
  * Default: 255
  * @default 255
  *
  * @param 
  * @desc 
  * @default 
  *
  * @param == Actor Status Window ==
  * @desc 
  * @default 
  *
  * @param Actor Status Width
  * @desc Width of the status window (in percentage)
  * Default: 70%
  * @default 70%
  *
  * @param ASW Opacity
  * @desc Opacity of the status window
  * 255 = 100% visible | 0 = 0% visible
  * Default: 255
  * @default 255
  *
  * @param 
  * @desc 
  * @default 
  *
  * @param == Actor Command Window ==
  * @desc 
  * @default 
  *
  * @param Width
  * @desc Width of the window (in pixels)
  * Default: 400
  * @default 400
  *
  * @param Margin Left
  * @desc Margin left of the window (in pixels)
  * Default: 30
  * @default 30
  *
  * @param Margin Bottom
  * @desc Margin bottom of the window (in pixels)
  * Default: 30
  * @default 30
  *
  * @param Always open?
  * @desc The command window will be always open
  * Default: true
  * @default true
  *
  * @param Cancel command?
  * @desc There will have a "Cancel" command on the window? True: yes | False: no
  * Default: true
  * @default true
  *
  * @param Vocab: "Cancel"
  * @desc The word that will be the Cancel command
  * Default: Cancel
  * @default Cancel
  *
  * @param Vocab: "Skills"
  * @desc The word that will be the Skill command
  * Default: Skills
  * @default Skills
  *
  * @param Vocab: "Talk"
  * @desc The word that will be the Talk command
  * Default: Talk
  * @default Talk
  *
  * @param ACW Opacity
  * @desc Opacity of the window
  * 255 = 100% visible | 0 = 0% visible
  * Default: 255
  * @default 255
  *
  * @param 
  * @desc 
  * @default 
  *
  * @param == MP Bar ==
  * @desc 
  * @default 
  *
  * @param MP Margin Left
  * @desc Margin left of the MP Bar (in pixels)
  * Default: 30
  * @default 30
  *
  * @param MP Width
  * @desc Width of the MP Bar (in pixels)
  * Default: 364
  * @default 364
  *
  * @param 
  * @desc 
  * @default 
  *
  * @param == Skills Help Window ==
  * @desc 
  * @default 
  *
  * @param Lines Number
  * @desc Number of lines
  * Default: 3
  * @default 3
  *
  * @param 
  * @desc 
  * @default 
  *
  * @param == Skills Window ==
  * @desc 
  * @default 
  *
  * @param SW Lines Number
  * @desc Number of lines of the skills window (in pixels)
  * Default: 4
  * @default 4
  *
  * @param 
  * @desc 
  * @default 
  *
  * @param == Background ==
  * @desc 
  * @default 
  *
  * @param Background Image
  * @desc The name of the image that will be the background
  * Leave it empty to use the map as background
  * @default Background
  *
  * @param 
  * @desc 
  * @default 
  *
  * @param == Entourage Actors ==
  * @desc 
  * @default 
  *
  * @param Receive EXP
  * @desc The entourage party members will receive EXP from the battle? Yes: true | No: false | Default: true
  * @default true
  *
  * @param Show Level Up?
  * @desc When the entourage party members level up, show the message? Yes: true | No: false | Default: true
  * @default true
  *
  * @param 
  * @desc 
  * @default 
  *
  * @param == Debug ==
  * @desc 
  * @default 
  *
  * @param Turn ON Debug?
  * @desc The plugin will print on the console a usefull message if something goes wrong. Default: true
  * @default true
*/

"use strict";

var Imported = Imported || {};
Imported["Fogo_EntouragePartySystem"] = "1.0.1";

var Fogo = Fogo || {};
Fogo.EntouragePartySystem = {};

(function($) {
	$.Params = $plugins.filter(function(p) { return p.description.contains('<Fogo EntouragePartySystem>'); })[0].parameters;

	$.ProfileNameHeight = parseInt($.Params['Profile Name Height'] || 40);
	$.ProfileLines = parseInt($.Params['Profile Lines'] || 4);
	$.PWOpacity = parseInt($.Params['PW Opacity'] || 255);
	$.ActorsListWindowWidth = parseInt($.Params['Actors List Width'] || 30);
	$.CharacterHeight = parseInt($.Params['Character Height'] || 48);
	$.ActorsListItemsNum = parseInt($.Params['Actors List Visible Items'] || 8);
	$.ALWOpacity = parseInt($.Params['ALW Opacity'] || 255);
	$.ActorStatusWindowWidth = parseInt($.Params['Actor Status Width'] || 70);
	$.ASWOpacity = parseInt($.Params['ASW Opacity'] || 255);
	$.ActorCommandWidth = parseInt($.Params['Width'] || 400);
	$.ActorCommandMarginLeft = parseInt($.Params['Margin Left'] || 30);
	$.ActorCommandMarginBottom = parseInt($.Params['Margin Bottom'] || 30);
	$.ActorCommandAlwaysOpen = ($.Params['Always Open?'] || 'true').toLowerCase() === 'true';
	$.ActorCommandUseCancel = ($.Params['Cancel command?'] || 'true').toLowerCase() === 'true';
	$.ActorCommandCancel = $.Params['Vocab: "Cancel"'] || "Cancel";
	$.ActorCommandSkills = $.Params['Vocab: "Skills"'] || "Skills";
	$.ActorCommandTalk = $.Params['Vocab: "Talk"'] || "Talk";
	$.ACWOpacity = parseInt($.Params['ACW Opacity'] || 255);
	$.MPMarginLeft = parseInt($.Params['MP Margin Left'] || 30);
	$.MPWidth = parseInt($.Params['MP Width'] || 364);
	$.SkillsHelpWindowLines = parseInt($.Params['Lines Number'] || 3);
	$.SkillsWindowLines = parseInt($.Params['SW Lines Number'] || 4);
	$.Background = $.Params['Background Image'] || "";
	$.ReceiveEXP = ($.Params['Receive EXP'] || 'true').toLowerCase() === 'true';
	$.ShowLevelUp = ($.Params['Show Level Up?'] || 'true').toLowerCase() === 'true';
	$.DebugOn = ($.Params['Turn ON Debug?'] || 'true').toLowerCase() === 'true';

	//-----------------------------------------------------------------------------
	// DataManager
	//

	var _DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;

	DataManager.isDatabaseLoaded = function() {
		if (!_DataManager_isDatabaseLoaded.call(this)) return false;
		this.loadEntourageActors();
		return true;
	};

	DataManager.loadEntourageActors = function() {
		for (var i = $dataActors.length - 1; i >= 0; i--) {
			if (!$dataActors[i]) continue;
			var note = $dataActors[i].note;
			var notelines = note.split(/[\r\n]+/);
			var r = /<Entourage *Actor>/i;
			$dataActors[i].isEntourageActor = r.test($dataActors[i].note);
			var m = note.match(/<Bio>\s*([\s\S]*)<\/Bio>/i);
			$dataActors[i].bio = m ? m[1] : "";
			var m2 = note.match(/<Talk *Event *ID: *(\d+)>/i);
			$dataActors[i].talkEventId = m2 ? parseInt(m2[1]) : 0;
			var readingPassiveSkills = false;
			var passiveSkills = [];
			for (var j = 0; j < notelines.length; j++) {
				if (notelines[j].match(/<passive\s*skills>/i))
					readingPassiveSkills = true;
				if (!readingPassiveSkills) continue;
				if (notelines[j].match(/gold\s*\((\d+)(s|m)\):\s*(\d+)/i)) {
					passiveSkills.push({
						type: 'gold',
						amount: parseInt(RegExp.$3),
						time: (RegExp.$2 === ("m" || "M") ? +RegExp.$1 * 60 : +RegExp.$1) * 1000
					});
				}
				if (notelines[j].match(/item\s*\((\d+)(s|m)\):\s*(\d+)\s*\((\d+)x\)/i)) {
					passiveSkills.push({
						type: 'item',
						itemId: parseInt(RegExp.$3),
						amount: parseInt(RegExp.$4),
						time: (RegExp.$2 === ("m" || "M") ? +RegExp.$1 * 60 : +RegExp.$1) * 1000
					});
				}
				if (notelines[j].match(/battle\s*bonus\s*exp:\s*(\d+)/i)) {
					passiveSkills.push({
						type: 'battleBonusExp',
						amount: parseInt(RegExp.$1),
					});
				}
				if (notelines[j].match(/hp\s*\((\d+)\s*steps\):\s*(\d+)/i)) {
					passiveSkills.push({
						type: 'hpSteps',
						steps: parseInt(RegExp.$1),
						amount: parseInt(RegExp.$2),
					});
				}
				if (notelines[j].match(/mp\s*\((\d+)\s*steps\):\s*(\d+)/i)) {
					passiveSkills.push({
						type: 'mpSteps',
						steps: parseInt(RegExp.$1),
						amount: parseInt(RegExp.$2),
					});
				}
				if (notelines[j].match(/code\s*\((\d+)(s|m)\):\s*(.+)/i)) {
					passiveSkills.push({
						type: 'code',
						time: (RegExp.$2 === ("m" || "M") ? +RegExp.$1 * 60 : +RegExp.$1) * 1000,
						code: RegExp.$3
					});
				}
				if (notelines[j].match(/<\/passive skills>/i))
					readingPassiveSkills = false;
			}
			$dataActors[i].entouragePassiveSkills = passiveSkills;
		};
	};

	//-----------------------------------------------------------------------------
	// ImageManager
	//

	ImageManager.loadEntourage = function(filename, hue) {
		return this.loadBitmap('img/entourage/', filename, hue, false);
	};

	//-----------------------------------------------------------------------------
	// ImageManager
	//

	var _BattleManager_gainExp = BattleManager.gainExp;

	BattleManager.gainExp = function() {
		_BattleManager_gainExp.call(this);
		var exp = this._rewards.exp;
		$gameParty.entourage().forEach(function(actor) {
			actor.gainExp(exp);
		});
	};

	//-----------------------------------------------------------------------------
	// Game_Party
	//

	var _Game_Party_initialize = Game_Party.prototype.initialize;
	
	Game_Party.prototype.initialize = function() {
		_Game_Party_initialize.call(this);
		this._entourageActors = [];
		this._phBySteps = [];
		this.refreshPassiveSkillsBySteps();
	};

	Game_Party.prototype.refreshPassiveSkillsBySteps = function() {
		this._phBySteps = [];
		for (var i = 0; i < this.entourage().length; i++) {
			if (this.entourage()[i].actor().entouragePassiveSkills) {
				var actor = this.entourage()[i].actor();
				var actorPassiveSkillsBySteps = this.getPassiveSkillsBySteps(actor.entouragePassiveSkills);
				for (var j = 0; j < actorPassiveSkillsBySteps.length; j++) {
					actorPassiveSkillsBySteps[j].nextSteps = actorPassiveSkillsBySteps[j].steps + this._steps;
					this._phBySteps.push(actorPassiveSkillsBySteps[j]);
				};
			}
		};
	};

	Game_Party.prototype.setupStartingMembers = function() {
		this._actors = [];
		$dataSystem.partyMembers.forEach(function(actorId) {
			if ($gameActors.actor(actorId)) {
				if ($gameActors.actor(actorId).actor().isEntourageActor){
					this._entourageActors.push(actorId);
				}
				else {
					this._actors.push(actorId);
				}
			}
		}, this);
		this.refreshPassiveSkillsBySteps();
	};

	var _Game_Party_addActor = Game_Party.prototype.addActor;
	
	Game_Party.prototype.addActor = function(actorId) {
		if ($dataActors[actorId] && $dataActors[actorId].isEntourageActor) {
			if (!this._entourageActors.contains(actorId)) {
				this._entourageActors.push(actorId);
				this.refreshPassiveSkillsBySteps();
				if (SceneManager._scene instanceof Scene_Map)
					SceneManager._scene.refreshPassiveSkillsByTime();
			}
		} else {
			_Game_Party_addActor.call(this, actorId);
		}
	};

	var _Game_Party_removeActor = Game_Party.prototype.removeActor;
	
	Game_Party.prototype.removeActor = function(actorId) {
		if ($dataActors[actorId] && $dataActors[actorId].isEntourageActor) {
			if (this._entourageActors.contains(actorId)) {
				this._entourageActors.splice(this._entourageActors.indexOf(actorId), 1);
				this.refreshPassiveSkillsBySteps();
				if (SceneManager._scene instanceof Scene_Map)
					SceneManager._scene.refreshPassiveSkillsByTime();
			}
		} else {
			_Game_Party_removeActor.call(this, actorId);
		}
	};

	var _Game_Party_increaseSteps = Game_Party.prototype.increaseSteps;
	
	Game_Party.prototype.increaseSteps = function() {
		_Game_Party_increaseSteps.call(this);
		for (var i = 0; i < this._phBySteps.length; i++) {
			if (this._steps >= this._phBySteps[i].nextSteps) {
				this._phBySteps[i].nextSteps += this._phBySteps[i].steps;
				if (SceneManager._scene instanceof Scene_Map)
					SceneManager._scene.executePassiveSkill(this._phBySteps[i], i);
			}
		};
	};

	Game_Party.prototype.entourage = function() {
		return this._entourageActors.map(function(id) {
			return $gameActors.actor(id);
		});
	};

	Game_Party.prototype.getPassiveSkillsBySteps = function(passiveSkills) {
		return passiveSkills.filter(function(h) { return h.type === 'hpSteps' || h.type === 'mpSteps'; });
	};

	//-----------------------------------------------------------------------------
	// Game_Troop
	//

	var _Game_Troop_expTotal = Game_Troop.prototype.expTotal;
	
	Game_Troop.prototype.expTotal = function() {
		return _Game_Troop_expTotal.call(this) + this.entourageExpBonus();
	};

	Game_Troop.prototype.entourageExpBonus = function() {
		var bonus = 0;
		for (var i = 0; i < $gameParty.entourage().length; i++) {
			if ($gameParty.entourage()[i].actor().entouragePassiveSkills) {
				var actor = $gameParty.entourage()[i].actor();
				var actorPassiveSkillsWithEXP = this.getPassiveSkillsWithBattleBonusEXP(actor.entouragePassiveSkills);
				for (var j = 0; j < actorPassiveSkillsWithEXP.length; j++) {
					bonus += actorPassiveSkillsWithEXP[j].amount;
				};
			}
		};
		return bonus;
	};

	Game_Troop.prototype.getPassiveSkillsWithBattleBonusEXP = function(passiveSkills) {
		return passiveSkills.filter(function(h) { return h.type === 'battleBonusExp'; });
	};

	//-----------------------------------------------------------------------------
	// Game_Actor
	//

	var _Game_Actor_finalExpRate = Game_Actor.prototype.finalExpRate;
	
	Game_Actor.prototype.finalExpRate = function() {
		return this.isEntourageMember() ? $.ReceiveEXP ? this.exr : 0 : _Game_Actor_finalExpRate.call(this);
	};

	Game_Actor.prototype.isEntourageMember = function() {
		return this.actor().isEntourageActor;
	};

	Game_Actor.prototype.shouldDisplayLevelUp = function() {
		return $.ShowLevelUp;
	};

	//-----------------------------------------------------------------------------
	// Scene_Map
	//

	var _Scene_Map_initialize = Scene_Map.prototype.initialize;
	
	Scene_Map.prototype.initialize = function() {
		_Scene_Map_initialize.call(this);
		this._now = Date.now();
		this._phByTime = [];
		this.refreshPassiveSkillsByTime();
	};

	var _Scene_Map_update = Scene_Map.prototype.update;
	
	Scene_Map.prototype.update = function() {
		_Scene_Map_update.call(this);
		for (var i = 0; i < this._phByTime.length; i++) {
			if (Date.now() > this._phByTime[i].nextTime) {
				this._phByTime[i].nextTime += this._phByTime[i].time;
				this.executePassiveSkill(this._phByTime[i], i);
			}
		};
	};

	Scene_Map.prototype.refreshPassiveSkillsByTime = function() {
		this._phByTime = [];
		for (var i = 0; i < $gameParty.entourage().length; i++) {
			if ($gameParty.entourage()[i].actor().entouragePassiveSkills) {
				var actor = $gameParty.entourage()[i].actor();
				var actorPassiveSkillsByTime = this.getPassiveSkillsByTime(actor.entouragePassiveSkills);
				for (var j = 0; j < actorPassiveSkillsByTime.length; j++) {
					actorPassiveSkillsByTime[j].nextTime = actorPassiveSkillsByTime[j].time + Date.now();
					this._phByTime.push(actorPassiveSkillsByTime[j]);
				};
			}
		};
	};

	Scene_Map.prototype.executePassiveSkill = function(skill, index) {
		switch(skill.type) {
			case 'gold':
				$gameParty.gainGold(skill.amount);
				break;
			case 'item':
				$gameParty.gainItem($dataItems[skill.itemId], skill.amount);
				break;
			case 'hpSteps':
				this.recoverAllHp(skill.amount);
				break;
			case 'mpSteps':
				this.recoverAllMp(skill.amount);
				break;
			case 'code':
				eval(skill.code);
				break;
		}
	};

	Scene_Map.prototype.recoverAllHp = function(amount) {
		$gameParty.members().forEach(function(actor) {
			actor.gainHp(amount);
		});
	};

	Scene_Map.prototype.recoverAllMp = function(amount) {
		$gameParty.members().forEach(function(actor) {
			actor.gainMp(amount);
		});
	};

	Scene_Map.prototype.getPassiveSkillsByTime = function(passiveSkills) {
		return passiveSkills.filter(function(h) { return h.type === 'gold' || h.type === 'item' || h.type === 'code'; });
	};

	//-----------------------------------------------------------------------------
	// Scene_Entourage
	//

	$.Scene_Entourage = Scene_Entourage;

	function Scene_Entourage() {
		this.initialize.apply(this, arguments);
	}

	Scene_Entourage.prototype = Object.create(Scene_Base.prototype);
	Scene_Entourage.prototype.constructor = Scene_Entourage;

	Scene_Entourage.prototype.initialize = function() {
		Scene_Base.prototype.initialize.call(this);
		this._lastStatusCommandIndex = 0;
	};

	Scene_Entourage.prototype.create = function() {
		Scene_Base.prototype.create.call(this);
		this.createBackground();
		this.createWindows();
	};

	Scene_Entourage.prototype.createBackground = function() {
		this._backgroundSprite = new Sprite();
		if ($.Background === "")
			this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
		else
			this._backgroundSprite.bitmap = ImageManager.loadEntourage($.Background);
		this.addChild(this._backgroundSprite);
	};

	Scene_Entourage.prototype.createSecondaryWindowLayer = function() {
		var width = Graphics.boxWidth;
		var height = Graphics.boxHeight;
		var x = (Graphics.width - width) / 2;
		var y = (Graphics.height - height) / 2;
		this._secondaryWindowLayer = new WindowLayer();
		this._secondaryWindowLayer.move(x, y, width, height);
		this.addChild(this._secondaryWindowLayer);
	};

	Scene_Entourage.prototype.createWindows = function() {
		this.createWindowLayer();
		this.createSecondaryWindowLayer();

		var actorsListWidth = $.ActorsListWindowWidth / 100 * Graphics.width;

		this._bioWindow = new Window_Bio();
		this._bioWindow.opacity = $.PWOpacity;

		this._statusCommandWindow = new Window_ActorStatusCommand(actorsListWidth + $.ActorCommandMarginLeft);
		this._statusCommandWindow.setHandler('skills', this.onStatusCommandSkills.bind(this));
		this._statusCommandWindow.setHandler('talk', this.onStatusCommandTalk.bind(this));
		this._statusCommandWindow.setHandler('cancel', this.onStatusCommandCancel.bind(this));
		this._statusCommandWindow.opacity = $.ACWOpacity;
		this._statusCommandWindow.select(-1);
		this._statusCommandWindow.deactivate();
		this._statusCommandWindow.close();

		var mpY = this._statusCommandWindow.y - this._bioWindow.height - this._bioWindow.padding * 3 - 10;
		this._actorStatusWindow = new Window_ActorStatus(actorsListWidth, this._bioWindow, mpY);
		this._actorStatusWindow.opacity = $.ASWOpacity;

		this._actorsListWindow = new Window_ActorsList(this._bioWindow, this._actorStatusWindow);
		if ($gameParty.entourage().length > 0)
			this._actorsListWindow.setHandler('ok', this.onActorsListOk.bind(this));
		this._actorsListWindow.setHandler('cancel', this.onActorsListCancel.bind(this));
		this._actorsListWindow.opacity = $.ALWOpacity;

		this.addWindow(this._bioWindow);
		this.addWindow(this._actorsListWindow);
		this.addWindow(this._actorStatusWindow);
		this.addSecondaryWindow(this._statusCommandWindow);
		this.createSkillWindows();
		this.createBattlePartyWindow();
	};

	Scene_Entourage.prototype.createSkillWindows = function() {
		this._skillsHelpWindow = new Window_Help($.SkillsHelpWindowLines);
		this._skillsHelpWindow.width = $.ActorStatusWindowWidth / 100 * Graphics.width;
		this._skillsHelpWindow.hide();
		this._skillsWindow = new Window_ActorSkills();
		this._skillsWindow.setHelpWindow(this._skillsHelpWindow);
		this._skillsWindow.setHandler('ok',     this.onSkillOk.bind(this));
		this._skillsWindow.setHandler('cancel', this.onSkillCancel.bind(this));
		this.addSecondaryWindow(this._skillsHelpWindow);
		this.addSecondaryWindow(this._skillsWindow);
	};

	Scene_Entourage.prototype.createBattlePartyWindow = function() {
		this._battlePartyWindow = new Window_MenuActor();
		this._battlePartyWindow.setHandler('ok',     this.onActorOk.bind(this));
		this._battlePartyWindow.setHandler('cancel', this.onActorCancel.bind(this));
		this.addWindow(this._battlePartyWindow);
	};

	Scene_Entourage.prototype.onActorsListOk = function() {
		this._statusCommandWindow.open();
		this._statusCommandWindow.activate();
		this._statusCommandWindow.select(this._lastStatusCommandIndex);
	};

	Scene_Entourage.prototype.onActorsListCancel = function() {
		this.popScene();
	};

	Scene_Entourage.prototype.onStatusCommandSkills = function() {
		this._statusCommandWindow.close();
		this._skillsWindow.setActor(this.actor());
		this._skillsWindow.show();
	};

	Scene_Entourage.prototype.onStatusCommandTalk = function() {
		this.callCommonEvent(this.actor().actor().talkEventId);
	};

	Scene_Entourage.prototype.onStatusCommandCancel = function() {
		var index = this._statusCommandWindow.index();
		this._lastStatusCommandIndex = index === 2 && $.ActorCommandUseCancel ? 0 : index;
		this._statusCommandWindow.select(-1);
		this._statusCommandWindow.close();
		this._actorsListWindow.activate();
	};

	Scene_Entourage.prototype.onSkillOk = function() {
		this._statusCommandWindow.close();
		this._skillsWindow.hide();
		this.actor().setLastMenuSkill(this._skillsWindow.item());
		this.determineItem();
	};

	Scene_Entourage.prototype.onSkillCancel = function() {
		this._skillsWindow.hide();
		this._statusCommandWindow.open();
		this._statusCommandWindow.activate();
	};

	Scene_Entourage.prototype.onActorOk = function() {
		if (this.canUseSkill()) {
			this.useSkill();
		} else {
			SoundManager.playBuzzer();
		}
	};

	Scene_Entourage.prototype.onActorCancel = function() {
		this._battlePartyWindow.hide();
		this._battlePartyWindow.deactivate();
		this._skillsWindow.activate();
		this._skillsWindow.show();
	};

	Scene_Entourage.prototype.determineItem = function() {
		var action = new Game_Action(this.actor());
		var item = this.skill();
		action.setItemObject(item);
		if (action.isForFriend()) {
			this.showBattlePartyWindow();
			this._battlePartyWindow.selectForItem(this.skill());
		} else {
			if ($.DebugOn) console.log("Error: Entourage actors can only use items on the battle party");
			this.activateItemWindow();
		}
	};

	Scene_Entourage.prototype.canUseSkill = function() {
		return this.actor().canUse(this.skill()) && this.isItemEffectsValid();
	};

	Scene_Entourage.prototype.useSkill = function() {
		SoundManager.playUseItem();
		this.actor().useItem(this.skill());
		this.applyItem();
		if ($gameTemp.isCommonEventReserved()) {
			SceneManager.push(Scene_Map);
		}
		this.checkGameover();
		this.refresh();
	};

	Scene_Entourage.prototype.itemTargetActors = function() {
		var action = new Game_Action(this.actor());
		action.setItemObject(this.skill());
		if (!action.isForFriend()) {
			return [];
		} else if (action.isForAll()) {
			return $gameParty.members();
		} else {
			return [$gameParty.members()[this._battlePartyWindow.index()]];
		}
	};

	Scene_Entourage.prototype.isItemEffectsValid = function() {
		var action = new Game_Action(this.actor());
		action.setItemObject(this.skill());
		return this.itemTargetActors().some(function(target) {
			return action.testApply(target);
		}, this);
	};

	Scene_Entourage.prototype.applyItem = function() {
		var action = new Game_Action(this.actor());
		action.setItemObject(this.skill());
		this.itemTargetActors().forEach(function(target) {
			for (var i = 0; i < action.numRepeats(); i++) {
				action.apply(target);
			}
		}, this);
		action.applyGlobal();
	};

	Scene_Entourage.prototype.refresh = function() {
		this._battlePartyWindow.refresh();
		this._skillsWindow.refresh();
		this._actorStatusWindow.refresh();
	};

	Scene_Entourage.prototype.callCommonEvent = function(id) {
		var commonEvent = $dataCommonEvents[id];
		if (commonEvent) {
			$gameTemp.reserveCommonEvent(id);
			SceneManager.push(Scene_Map);
		} else {
			if ($.DebugOn) console.log("Invalid Common Event ID");
			this._statusCommandWindow.activate();
		}
	};

	Scene_Entourage.prototype.showBattlePartyWindow = function() {
		this._battlePartyWindow.show();
		this._battlePartyWindow.activate();
        this._statusCommandWindow.hide();
	};

	Scene_Entourage.prototype.addSecondaryWindow = function(window) {
		this._secondaryWindowLayer.addChild(window);
	};

	Scene_Entourage.prototype.actor = function() {
		return $gameParty.entourage()[this._actorsListWindow._index];
	};

	Scene_Entourage.prototype.skill = function() {
		return this._skillsWindow.item();
	};

	//-----------------------------------------------------------------------------
	// Window_Bio
	//

	function Window_Bio() {
		this.initialize.apply(this, arguments);
	};

	Window_Bio.prototype = Object.create(Window_Help.prototype);
	Window_Bio.prototype.constructor = Window_Bio;

	Window_Bio.prototype.initialize = function() {
		var width = Graphics.boxWidth;
		var height = $.ProfileNameHeight + this.textPadding() + this.fittingHeight($.ProfileLines);
		Window_Base.prototype.initialize.call(this, 0, 0, width, height);
		this._text = '';
		this.createTitleSprite();
	};

	Window_Bio.prototype.createTitleSprite = function() {
		this._title = new Sprite();
		this._title.x = this.padding;
		this._title.y = this.padding;
		this.addChild(this._title);
	};

	Window_Bio.prototype.setActor = function(actor) {
        if (actor) {
            this.setText(actor ? actor.actor().bio : '');
            this._title.bitmap = ImageManager.loadEntourage('ActorName' + actor._actorId);
        }
	};

	Window_Bio.prototype.refresh = function() {
		this.contents.clear();
		this.drawTextEx(this._text, this.textPadding(), $.ProfileNameHeight + this.textPadding());
	};

	//-----------------------------------------------------------------------------
	// Window_ActorsList
	//

	function Window_ActorsList() {
		this.initialize.apply(this, arguments);
	};

	Window_ActorsList.prototype = Object.create(Window_Selectable.prototype);
	Window_ActorsList.prototype.constructor = Window_ActorsList;

	Window_ActorsList.prototype.initialize = function(helperWindow, statusWindow) {
		var h = Graphics.height - helperWindow.height;
		var w = $.ActorsListWindowWidth / 100 * Graphics.width;
		Window_Selectable.prototype.initialize.call(this, 0, helperWindow.height, w, h);
		this.setStatusWindow(statusWindow);
		this.setHelpWindow(helperWindow);
		this.refresh();
		this.select(0);
		this.activate();
	};

	Window_ActorsList.prototype.drawItem = function(index) {
		var rect = this.itemRectForText(index);
		var actor = $gameParty.entourage()[index];
		this.drawActorCharacter(actor, this.textPadding(), rect.y + rect.height / 2);
		var textX = rect.x + this.textPadding() * 2 + 52;
		this.contents.drawText(actor.name(), textX, rect.y, rect.width, rect.height, this.itemTextAlign());
	};

	Window_ActorsList.prototype.drawCharacter = function(characterName, characterIndex, x, y) {
		var bitmap = ImageManager.loadCharacter(characterName);
		var self = this;
		bitmap.addLoadListener(function() {
			var big = ImageManager.isBigCharacter(characterName);
			var pw = bitmap.width / (big ? 3 : 12);
			var ph = bitmap.height / (big ? 4 : 8);
			var n = characterIndex;
			var sx = (n % 4 * 3 + 1) * pw;
			var sy = (Math.floor(n / 4) * 4) * ph;
			self.contents.blt(bitmap, sx, sy, pw, ph, x, y - ph / 2);
		});
	};

	Window_ActorsList.prototype.updateHelp = function() {
		this._helpWindow.setActor($gameParty.entourage()[this._index]);
		this._statusWindow.setActor($gameParty.entourage()[this._index]);
	};

	Window_ActorsList.prototype.setStatusWindow = function(statusWindow) {
		this._statusWindow = statusWindow;
	};

	Window_ActorsList.prototype.maxItems = function() {
		return $gameParty.entourage().length;
	};

	Window_ActorsList.prototype.itemHeight = function() {
		var innerHeight = this.height - this.padding * 2;
		return Math.floor(innerHeight / this.numVisibleRows());
	};

	Window_ActorsList.prototype.numVisibleRows = function() {
		return $.ActorsListItemsNum;
	};

	Window_ActorsList.prototype.itemTextAlign = function() {
		return 'left';
	};

	//-----------------------------------------------------------------------------
	// Window_ActorStatus
	//

	function Window_ActorStatus() {
		this.initialize.apply(this, arguments);
	};

	Window_ActorStatus.prototype = Object.create(Window_Selectable.prototype);
	Window_ActorStatus.prototype.constructor = Window_ActorStatus;

	Window_ActorStatus.prototype.initialize = function(x, referenceWindow, mpY) {
		var h = Graphics.height - referenceWindow.height;
		var w = $.ActorStatusWindowWidth / 100 * Graphics.width;
		Window_Selectable.prototype.initialize.call(this, x, referenceWindow.height, w, h);
		this._actor = null;
		this._mpY = mpY;
		this.createBustSprite();
	};

	Window_ActorStatus.prototype.createBustSprite = function() {
		this._bustSprite = new Sprite();
		this._bustSprite.x = this.x + this.width;
		this._bustSprite.y = this.y + this.height;
		this.addChild(this._bustSprite);
	};

	Window_ActorStatus.prototype.setupBust = function() {
		var bitmap = ImageManager.loadEntourage('ActorBust' + this._actor._actorId);
		bitmap.addLoadListener(function() {
			this._bustSprite.x = this.width - bitmap.width - this.padding;
			this._bustSprite.y = this.height - bitmap.height - this.padding;
		}.bind(this));
		this._bustSprite.bitmap = bitmap;
	};

	Window_ActorStatus.prototype.setActor = function(actor) {
		if (actor && this._actor != actor) {
			this._actor = actor;
			this.setupBust();
			this.refresh();
		}
	};

	Window_ActorStatus.prototype.refresh = function() {
		this.contents.clear();
		this.drawParameters(this.padding, this.padding);
		this.drawMpBar();
	};

	Window_ActorStatus.prototype.drawParameters = function(x, y) {
		var lineHeight = this.lineHeight();
		for (var i = 0; i < 6; i++) {
			var paramId = i + 2;
			var y2 = y + lineHeight * i;
			this.changeTextColor(this.systemColor());
			this.drawText(TextManager.param(paramId), x, y2, 160);
			this.resetTextColor();
			this.drawText(this._actor.param(paramId), x + 160, y2, 60, 'right');
		}
	};

	Window_ActorStatus.prototype.drawMpBar = function() {
		this.drawActorMp(this._actor, $.MPMarginLeft, this._mpY, $.MPWidth);
	};

	//-----------------------------------------------------------------------------
	// Window_ActorStatusCommand
	//

	function Window_ActorStatusCommand() {
		this.initialize.apply(this, arguments);
	}

	Window_ActorStatusCommand.prototype = Object.create(Window_Command.prototype);
	Window_ActorStatusCommand.prototype.constructor = Window_ActorStatusCommand;

	Window_ActorStatusCommand.prototype.initialize = function(x) {
		Window_Command.prototype.initialize.call(this, x, 0);
		this.y = Graphics.height - this.height - $.ActorCommandMarginBottom;
		this.hide();
	};

	Window_ActorStatusCommand.prototype.windowWidth = function() {
		return $.ActorCommandWidth;
	};

	Window_ActorStatusCommand.prototype.numVisibleRows = function() {
		return $.ActorCommandUseCancel ? 3 : 2;
	};

	Window_ActorStatusCommand.prototype.makeCommandList = function() {
		this.addCommand($.ActorCommandSkills, 'skills');
		this.addCommand($.ActorCommandTalk,  'talk');
		if ($.ActorCommandUseCancel)
			this.addCommand($.ActorCommandCancel,  'cancel');
	};

	Window_ActorStatusCommand.prototype.open = function() {
		if (!this.visible)
			this.show();
		Window_Command.prototype.open.call(this);
	};

	Window_ActorStatusCommand.prototype.close = function() {
		if ($.ActorCommandAlwaysOpen && $gameParty.entourage().length > 0) {
			if (!this.visible)
				this.show();
			return;
		}
		Window_Command.prototype.close.call(this);
	};

	//-----------------------------------------------------------------------------
	// Window_ActorSkills
	//
	// The window for selecting a skill to use on the battle screen.

	function Window_ActorSkills() {
		this.initialize.apply(this, arguments);
	}

	Window_ActorSkills.prototype = Object.create(Window_SkillList.prototype);
	Window_ActorSkills.prototype.constructor = Window_ActorSkills;

	Window_ActorSkills.prototype.initialize = function() {
		var x = $.ActorsListWindowWidth / 100 * Graphics.width;
		var y = Graphics.height - this.fittingHeight($.SkillsWindowLines);
		var width = $.ActorStatusWindowWidth / 100 * Graphics.width;
		var height = this.fittingHeight($.SkillsWindowLines);
		Window_SkillList.prototype.initialize.call(this, x, y, width, height);
		this.hide();
	};

	Window_ActorSkills.prototype.setHelpWindow = function(helpWindow) {
		Window_SkillList.prototype.setHelpWindow.call(this, helpWindow);
		this._helpWindow.x = this.x;
		this._helpWindow.y = this.y - this.height + this.padding * 2;
	};

	Window_ActorSkills.prototype.makeItemList = function() {
		this._data = this._actor ? this._actor.skills() : [];
	};

	Window_ActorSkills.prototype.show = function() {
		this.activate();
		this.selectLast();
		this.showHelpWindow();
		Window_SkillList.prototype.show.call(this);
	};

	Window_ActorSkills.prototype.hide = function() {
		Window_SkillList.prototype.hide.call(this);
		if (this._helpWindow)
			this._helpWindow.hide();
	};

})(Fogo.EntouragePartySystem);
var Scene_Entourage = Fogo.EntouragePartySystem.Scene_Entourage;
var showSceneEntourage = function() { SceneManager.push(Scene_Entourage); };
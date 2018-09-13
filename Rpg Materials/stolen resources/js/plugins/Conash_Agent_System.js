//=============================================================================
// Agent System (v1.1.9)
// by 2095conash
//=============================================================================r

/*:
  * @author 2095conash
  * @plugindesc Creates system by which hidden actors can go on missions for a set amount of real time. (Version 1.1.9)
  *
  * @help
  * ===========================================================================
  * * HOW TO USE
  * ===========================================================================
  * For every actor you want to be an agent please use the following format to
  * mark them as an agent as well as detailing their missions
  * <Agent>
  * <Mission 1>
  * <Name- Recruiting Troops>
  * <Desc- You recruit soldiers nimrod!>
  * <Req- V:10,2>
  * <Time- 0:00:01>
  * <Cost- I:10,2|G:500>
  * <Reward- I:3,2|V:10>
  * </Mission 1>
  *
  * The <Agent> tag is used to mark them as an agent.
  *
  * The <Mission X> and </Mission X> tags are used to mark the boundaries of the mission info
  *
  * the <Name- > tag is used to denote the name of the mission
  *
  * the <Dexc- > tag is used to better describe the mission
  *
  * The <Req- > tag is used to denote requirements that will lock out a mission
  * If the requirement has a V, it will use the first number to find the variable
  * and then lock off the mission if it is equal to or greater than the second number
  * If you'd rather use a switch, please mark it with an S and use only 1 number
  *
  * The <Time- > tag is used to denote how much time it will take to finish the mission
  *
  * The <Cost- > tag is used to denote the cost of the mission. Use G:X to mark how much
  * Currency the player will spend, and I:X,Y to denote the quantity (Y) of item X required
  * Due to display limitations, missions can only have up to 2 'costs', use a | to seperate
  * them from one another.
  *
  * The <Reward- > tag works like the cost tag only in regards to rewards given. You can
  * also specify a variable hear by using V:X instead so that on completion Variable X
  * will increase by one.
  *
  * ===========================================================================
  * * YANFLY MENU SETUP
  * ===========================================================================
  *
  * To set this up to work with the Yanfly menu manager, for the 'Main mind'
  * section please enter this.showSceneAgent.bind(this)
  * the rest can be handled as you see fit.
  *
  *
  * All other information needed is explained in the parameters
  *
  *
  * @param Agent Variable
  * @desc This is the number of the variable that determines current mission maximum Timer
  * @default 1
  *
  * @param Mission Max
  * @desc This is the number of missions every agent will have. It is recommented to go no higher than 6.
  * @default 5
  *
  * @param Agent Menu Windowskin
  * @desc Determines if the agent menu should use windowskin or a background image. Set to True or true for windowskin.
  * @default True
  *
  * @param Agent Menu Background
  * @desc The name of the file for the agent menu background (as found in the img/menus folder)
  * @default Agent Background
  *
  * @param Agent Menu Text size
  * @desc This is the size of text in all Scene_Agent menus. Standard text size is 28. I recommend trying 42 and experimenting.
  * @default 42
  *
  * @param Agent List Length
  * @desc Width of the Agent List window (In Percent)
  * Default: 30%
  * @default 30%
  *
  * @param Agent Background 1
  * @desc The name of the file for inactive or incomplete missions (as found in the system images)
  * @default Agent1
  *
  * @param Agent Background 2
  * @desc The name of the file for completed missions (as found in the system images)
  * @default Agent2
  */


var Conash = {};
Conash.Agent_System = {};


(function(){

	var parameters = PluginManager.parameters('Conash_Agent_System');
	var agent_variable=Number(parameters['Agent Variable']);
	var mission_cap=parseInt(parameters['Mission Max']);
	var agent_length=parseInt(parameters['Agent List Length'] || 30);
	var agent_background_1 = parameters['Agent Background 1'];
	var agent_background_2 = parameters['Agent Background 2'];
	var scene_background = parameters['Agent Menu Background'];
	var agent_text_size = parseInt(parameters['Agent Menu Text size']);
	var agent_windowskin = parameters['Agent Menu Windowskin'];

//	var $agent_timers = [];

	//-----------------------------------------------------------------------------
	// DataManager
	//

	var _agent_DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
	//var _agent_DataManager_createGameObjects = DataManager.createGameObjects;

	DataManager.isDatabaseLoaded = function() {
		if (!_agent_DataManager_isDatabaseLoaded.call(this)) return false;
		this.loadAgentActors();
		return true;
	};

	//DataManager.createGameObjects = function() {
	//	_agent_DataManager_createGameObjects.call(this);
	//	$agent_timers = [];
	//};

	DataManager.loadAgentActors = function() {
		for (var i = $dataActors.length - 1; i >= 0; i--) {
			if (!$dataActors[i]) continue;
			var note = $dataActors[i].note;
			var notelines = note.split(/[\r\n]+/);
			var r = /<Agent>/i;
			$dataActors[i].isAgentActor = r.test($dataActors[i].note);
		};
	};

	Game_Timer.prototype.agentReset = function() {
    	this._agentTimers=[];
    	this._agentCharacters=[];
    	this._agentMissions=[];
	};

	Game_Timer.prototype.newAgent = function(time, actor, mission) {
		if (this._agentTimers==null) {
    		this._agentTimers=[];
    		this._agentCharacters=[];
    		this._agentMissions=[];
		}
		this._agentTimers.push(time);
		this._agentCharacters.push(actor);
		this._agentMissions.push(mission);
	};

	Game_Timer.prototype.agentLength = function() {
		if (this._agentTimers==undefined) {
    		this._agentTimers=[];
    		this._agentCharacters=[];
    		this._agentMissions=[];
		}
		return (this._agentTimers.length || 0);
	};

	Game_Timer.prototype.agentTimer = function(index) {
		if (this._agentTimers==null) {
    		this._agentTimers=[];
    		this._agentCharacters=[];
    		this._agentMissions=[];
		}
		return this._agentTimers[index];
	};

	Game_Timer.prototype.agentCharacter = function(index) {
		if (this._agentTimers==null) {
    		this._agentTimers=[];
    		this._agentCharacters=[];
    		this._agentMissions=[];
		}
		return this._agentCharacters[index];
	};

	Game_Timer.prototype.agentMission = function(index) {
		if (this._agentTimers==null) {
    		this._agentTimers=[];
    		this._agentCharacters=[];
    		this._agentMissions=[];
		}
		return this._agentMissions[index];
	};

	Game_Timer.prototype.includeCharacter = function(actor) {
		if (this._agentTimers==null) {
    		this._agentTimers=[];
    		this._agentCharacters=[];
    		this._agentMissions=[];
		}
		//return (this._agentCharacters.indexOf(actor)>-1);
		for (i=0; i < this._agentCharacters.length; i++) {
			if (this._agentCharacters[i].id == actor.id) {
				return true;
			}
		}
		return false;
	};

	Game_Timer.prototype.agentRemove = function(index) {
		if (this._agentTimers==null) {
    		this._agentTimers=[];
    		this._agentCharacters=[];
    		this._agentMissions=[];
		} else {
			this._agentTimers.splice(index,1);
			this._agentCharacters.splice(index,1);
			this._agentMissions.splice(index,1);
		}
	};

	//-----------------------------------------------------------------------------
	// Game_Party
	//

	var _agent_Game_Party_initialize = Game_Party.prototype.initialize;
	
	Game_Party.prototype.initialize = function() {
		_agent_Game_Party_initialize.call(this);
		this._agentActors = [];
	};

	Game_Party.prototype.agent = function() {
		if (this._agentActors==undefined) {this._agentActors = [];};
		return this._agentActors;
	};

	var _agent_Game_Party_setupStartingMembers = Game_Party.prototype.setupStartingMembers;

	Game_Party.prototype.setupStartingMembers = function() {
		this._actors = [];
		$dataSystem.partyMembers.forEach(function(actorId) {
			if ($gameActors.actor(actorId)) {
				if ($gameActors.actor(actorId).actor().isAgentActor){
					this._agentActors.push(actorId);
				} else {
					_agent_Game_Party_setupStartingMembers.call(this);
				}
			}
		}, this);
	};

	var _agent_Game_Party_addActor = Game_Party.prototype.addActor;
	
	Game_Party.prototype.addActor = function(actorId) {
		if (this._agentActors==undefined) {this._agentActors = [];};
		if ($dataActors[actorId] && $dataActors[actorId].isAgentActor) {
			if (!this._agentActors.contains(actorId)) {
				this._agentActors.push(actorId);
			}
		} else {
			_agent_Game_Party_addActor.call(this, actorId);
		}
	};

	var _agent_Game_Party_removeActor = Game_Party.prototype.removeActor;
	
	Game_Party.prototype.removeActor = function(actorId) {
		if (this._agentActors==undefined) {_agent_Game_Party_removeActor.call(this, actorId);};
		if ($dataActors[actorId] && $dataActors[actorId].isAgentActor) {
			if (this._agentActors.contains(actorId)) {
				this._agentActors.splice(this._agentActors.indexOf(actorId), 1);
			}
		} else {
			_agent_Game_Party_removeActor.call(this, actorId);
		}
	};

	// Game Actor

	Game_Actor.prototype.isAgentMember = function() {
		return this.actor().isAgentActor;
	};

	//-----------------------------------------------------------------------------
	// Window_Agent
	//
	// The window for displaying current Agent missions

	function Window_Agent() {
    	this.initialize.apply(this, arguments);
	}

	Window_Agent.prototype = Object.create(Window_Base.prototype);
	Window_Agent.prototype.constructor = Window_Agent;

	Window_Agent.prototype.initialize = function() {
    	var width = this.windowWidth();
   		var height = this.windowHeight();
   		Window_Base.prototype.initialize.call(this, Graphics.boxWidth-198, -18, width, height);
    	this.opacity = 0;
    	this.contentsOpacity = 250;
    	this._showCount = 0;
    	this.refresh();
	};

	Window_Agent.prototype.windowWidth = function() {
    	return 180+(18*2);
	};

	Window_Agent.prototype.windowHeight = function() {
    	return 120+(18*2);
	};

	Window_Agent.prototype.update = function() {
    	Window_Base.prototype.update.call(this);
    	if (this._showCount > 0) {
        	this.updateFadeIn();
        	this._showCount--;
    	}
	};

	Window_Agent.prototype.updateFadeIn = function() {
    	this.contentsOpacity += 16;
	};

	Window_Agent.prototype.updateFadeOut = function() {
    	this.contentsOpacity -= 16;
	};

	Window_Agent.prototype.open = function() {
    	this.refresh();
    	this._showCount = 150;
	};

	Window_Agent.prototype.close = function() {
    	this._showCount = 0;
	};

	Window_Agent.prototype.refresh = function() {
    	this.contents.clear();
    	//if ($gameMap.displayName()) {
        	var width = this.contentsWidth();
        	this.drawBackground(0, 0, width, this.lineHeight()*2);
        	var step;
        	var incomplete = true;
			for (step = 0; step < $gameVariables.value(agent_variable); step++) {
				incomplete=true;
				if ($gameTimer.agentLength()>step) {
					incomplete=($gameTimer.agentTimer(step)>Graphics.frameCount);
				}
 				this.drawAgentBackground(incomplete, 60*(step%3), 60*(Math.floor(step/3)));
				if ($gameTimer.agentLength()>step) {
					this.drawCharacter($gameTimer.agentCharacter(step), 60*(step%3), 60*(Math.floor(step/3)));
				}
			}
    	//}
	};

	Window_Agent.prototype.drawCharacter = function(actor, x, y) {
		var bitmap = ImageManager.loadCharacter(actor.characterName);
		x+=6;
		y+=26;
		var self = this;
		bitmap.addLoadListener(function() {
			var big = ImageManager.isBigCharacter(actor.characterName);
			var pw = bitmap.width / (big ? 3 : 12);
			var ph = bitmap.height / (big ? 4 : 8);
			var n = actor.characterIndex;
			var sx = (n % 4 * 3 + 1) * pw;
			var sy = (Math.floor(n / 4) * 4) * ph;
			self.contents.blt(bitmap, sx, sy, pw, ph, x, y - ph / 2);
		});
	};

	Window_Agent.prototype.drawBackground = function(x, y, width, height) {
    	var color1 = this.dimColor1();
    	var color2 = this.dimColor2();
    	this.contents.gradientFillRect(x, y, width / 2, height, color2, color2);
    	this.contents.gradientFillRect(x + width / 2, y, width / 2, height, color2, color2);
	};

	Window_Agent.prototype.drawAgentBackground = function(complete, x, y) {
		if (complete) {
			imagename=agent_background_1
		}
		else {
			imagename=agent_background_2
		}
    	var bitmap = ImageManager.loadSystem(imagename);
    	this.contents.blt(bitmap, 0, 0, 60, 60, x, y);
	};

	//Scene Map

	var _agent_Scene_Map_Start= Scene_Map.prototype.start;
	var _agent_Scene_Map_Stop= Scene_Map.prototype.stop;
	var _agent_Scene_Map_Terminate= Scene_Map.prototype.terminate;
	var _agent_Scene_Map_updateScene= Scene_Map.prototype.updateScene;
	var _agent_Scene_Map_createAllWindows= Scene_Map.prototype.createAllWindows;
	var _agent_Scene_Map_callMenu= Scene_Map.prototype.callMenu;
	var _agent_Scene_Map_launchBattle= Scene_Map.prototype.launchBattle;

	Scene_Map.prototype.start = function(){
		_agent_Scene_Map_Start.call(this);
		this._agentWindow.open();
	};

	Scene_Map.prototype.stop = function(){
		_agent_Scene_Map_Stop.call(this);
    	this._agentWindow.close();
	};

	Scene_Map.prototype.terminate = function(){
		_agent_Scene_Map_Terminate.call(this);
    	if (!SceneManager.isNextScene(Scene_Battle)) {
        	this._agentWindow.hide();
    	}
    	this.removeChild(this._agentWindow);
	};

	Scene_Map.prototype.updateScene = function(){
		_agent_Scene_Map_updateScene.call(this);
    	if (!SceneManager.isSceneChanging()) {
        	this._agentWindow.refresh();
    	}
	};

	Scene_Map.prototype.createAllWindows = function(){
		_agent_Scene_Map_createAllWindows.call(this);
    	this.createAgentWindow();
	};

	Scene_Map.prototype.callMenu = function(){
		_agent_Scene_Map_callMenu.call(this);
    	this._agentWindow.hide();
	};

	Scene_Map.prototype.launchBattle = function(){
		_agent_Scene_Map_launchBattle.call(this);
    	this._agentWindow.hide();
	};

	Scene_Map.prototype.createAgentWindow = function() {
    	this._agentWindow = new Window_Agent();
    	this.addWindow(this._agentWindow);
    	this._agentWindow.show()
	};

	//Scene Agent
	//$.Scene_Agent=Scene_Agent;

	function Scene_Agent() {
		this.initialize.apply(this, arguments);
	}

	Scene_Agent.prototype = Object.create(Scene_Base.prototype);
	Scene_Agent.prototype.constructor = Scene_Agent;

	Scene_Agent.prototype.initialize = function() {
		Scene_Base.prototype.initialize.call(this);
	};

	Scene_Agent.prototype.create = function() {
		Scene_Base.prototype.create.call(this);
		this.createBackground();
		this.createWindows();
	};

	Scene_Agent.prototype.createBackground = function() {
		if (agent_windowskin== 'true' || agent_windowskin== 'True') {return;};
		this._backgroundSprite = new Sprite();
		this._backgroundSprite.bitmap = ImageManager.loadBitmap('img/menus/', scene_background, 0, false);;
		this.addChild(this._backgroundSprite);
	};

	Scene_Agent.prototype.createWindows = function() {
		this.createWindowLayer();

	//	var actorsListWidth = $.ActorsListWindowWidth / 100 * Graphics.width;

		this._desWindow = new Window_Agent_Description();
	//	this._desWindow.setHandler('ok', this.onDescriptionOk.bind(this));
	//	this._desWindow.setHandler('cancel', this.onMissionListCancel.bind(this));

		this._missionWindow = new Window_Agent_Missions(this._desWindow);
		this._missionWindow.setHandler('ok', this.onMissionListOk.bind(this));
		this._missionWindow.setHandler('cancel', this.onMissionListCancel.bind(this));

		this._agentsListWindow = new Window_Agent_List(this._desWindow, this._missionWindow);
		if ($gameParty.agent().length > 0) 
			this._agentsListWindow.setHandler('ok', this.onActorsListOk.bind(this));
		this._agentsListWindow.setHandler('cancel', this.onActorsListCancel.bind(this));

		this.addWindow(this._desWindow);
		this.addWindow(this._agentsListWindow);
		this.addWindow(this._missionWindow);
	};

	Scene_Agent.prototype.onActorsListOk = function() {
	//	this.missionCompleteCheck()
		if (this.missionCompleteCheck()) {
			this._agentsListWindow.activate();
		} else {
			this._desWindow.missionReward(undefined);
			this._missionWindow.open();
			this._missionWindow.activate();
			this._missionWindow.select(0);
			this._missionWindow.setHelpWindow(this._desWindow);
		};
	};

	Scene_Agent.prototype.missionCompleteCheck = function() {
		for (i=0; i<$gameTimer.agentLength(); i++) {
			if ($gameTimer.agentCharacter(i).id==$dataActors[$gameParty.agent()[this._agentsListWindow._index]].id) {
				if ($gameTimer.agentTimer(i)>Graphics.frameCount) {
					return false;
				} else {
					this.awardReward(i);
					this._desWindow.missionReward(i);
					this._desWindow.refresh();
					this._missionWindow.refresh();
					return true;
				}
			}
		}
		return;
	};

	Scene_Agent.prototype.awardReward = function(index) {
		var mission = $gameTimer.agentMission(index);
		var reward = $dataActors[$gameParty.agent()[this._agentsListWindow._index]].note;
		reward=reward.slice(reward.indexOf('<Mission '+(mission+1).toString()+'>'), reward.indexOf('</Mission '+(mission+1).toString()+'>'));
		reward=reward.slice(reward.indexOf('<Reward- '), reward.length);
		reward=reward.slice(9, reward.indexOf('>'));
		for (i=0;i<2; i++) {
			this.giveReward(reward);
			if (reward.indexOf('|')>-1) {
				reward=reward.slice(reward.indexOf('|')+1, reward.length);
			} else {
				i=2;
			}
		};
		$gameTimer.agentRemove(index);
	};

	Scene_Agent.prototype.giveReward = function (reward) {
		switch (reward[0]) {
			case 'I': $gameParty.gainItem($dataItems[parseInt(reward.slice(reward.indexOf(':')+1, reward.length))], parseInt(reward.slice(reward.indexOf(',')+1, reward.length)));
					break;
			case 'G': $gameParty.gainGold(parseInt(reward.slice(reward.indexOf(':')+1, reward.length)));
					break;
			case 'V': var variable= parseInt(reward.slice(reward.indexOf(':')+1, reward.length))
					$gameVariables.setValue(variable, $gameVariables.value(variable)+1);
					break;
			case 'S': var variable= parseInt(reward.slice(reward.indexOf(':')+1, reward.length))
					$gameSwitches.setValue(variable, true);
					break;
		}
	};

	Scene_Agent.prototype.onActorsListCancel = function() {
		this.popScene();
	};

	Scene_Agent.prototype.onMissionListOk = function() {
		this.missionCost();
		this.onMissionListCancel();
		this._missionWindow.refresh();
		//else {this.playBuzzerSound();};
	};

	Scene_Agent.prototype.missionCost = function() {
		var full_cost = this._missionWindow._actor.note;
		var mission = this._missionWindow._index;
		full_cost=full_cost.slice(full_cost.indexOf('<Mission '+(mission+1).toString()+'>'), full_cost.indexOf('</Mission '+(mission+1).toString()+'>'));
		full_cost=full_cost.slice(full_cost.indexOf('<Cost- '), full_cost.length);
		full_cost=full_cost.slice(7, full_cost.indexOf('>'));
	//	if (this.costCheck(full_cost)) {
			this.newMission();
			this._desWindow.refresh();
			for (i=0;i<2; i++) {
				this.removeCost(full_cost);
				if (full_cost.indexOf('|')>-1) {
					full_cost=full_cost.slice(full_cost.indexOf('|')+1, full_cost.length);
				} else {
					i=2;
				}
			};
		//};
	};

	Scene_Agent.prototype.removeCost = function(cost) {
		switch (cost[0]) {
			case 'I': $gameParty.loseItem($dataItems[parseInt(cost.slice(cost.indexOf(':')+1, cost.length))], parseInt(cost.slice(cost.indexOf(',')+1, cost.length)), false);
					break;
			case 'G': $gameParty.loseGold(parseInt(cost.slice(cost.indexOf(':')+1, cost.length)));
					break;
		}
	};

	Scene_Agent.prototype.newMission = function() {
		this._missionWindow.timeArray();
	};

	Scene_Agent.prototype.onMissionListCancel = function() {
		this._missionWindow.deselect();
		this._agentsListWindow.open();
		this._agentsListWindow.activate();
	};

	Scene_Agent.prototype.refresh = function() {
		this._agentsListWindow.refresh();
		this._missionWindow.refresh();
		this._desWindow.refresh();
	};

	Scene_Agent.prototype.actor = function() {
		return $gameParty.agent()[this._agentsListWindow._index];
	};

	//Window Agent List

	function Window_Agent_List() {
		this.initialize.apply(this, arguments);
	};

	Window_Agent_List.prototype = Object.create(Window_Selectable.prototype);
	Window_Agent_List.prototype.constructor = Window_Agent_List;

	Window_Agent_List.prototype.initialize = function(helperWindow, statusWindow) {
		var h = Graphics.height-helperWindow.height;
		var w = agent_length / 100 * Graphics.width;
		Window_Selectable.prototype.initialize.call(this, 0, helperWindow.height, w, h);
		this.setStatusWindow(statusWindow);
		this.setHelpWindow(helperWindow);
		this.refresh();
		this.select(0);
		this.activate();
		if (!(agent_windowskin=='True' || agent_windowskin=='true')) {this.opacity = 0;};
	};

	Window_Agent_List.prototype.lineHeight = function() {
    	return agent_text_size+8;
	};

	Window_Agent_List.prototype.standardFontSize = function() {
    	return agent_text_size;
	};

	Window_Agent_List.prototype.standardBackOpacity = function() {
		if (agent_windowskin=='True' || agent_windowskin=='true') {
			return 192;
		} else {
			return 0;
		}
	};

	Window_Agent_List.prototype.drawItem = function(index) {
		var rect = this.itemRectForText(index);
		var actor = $dataActors[$gameParty.agent()[index]];
		this.drawActorCharacter(actor, this.textPadding(), rect.y + rect.height / 2);
		var textX = rect.x + this.textPadding() * 2 + 52;
		this.contents.drawText(actor.name, textX, rect.y, rect.width, rect.height, this.itemTextAlign());
	};

	Window_Agent_List.prototype.drawActorCharacter = function(actor, x, y) {
    	this.drawCharacter(actor.characterName, actor.characterIndex, x, y);
	};

	Window_Agent_List.prototype.drawCharacter = function(characterName, characterIndex, x, y) {
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

	Window_Agent_List.prototype.updateHelp = function() {
		this._helpWindow.setActor($dataActors[$gameParty.agent()[this._index]]);
		this._statusWindow.setActor($dataActors[$gameParty.agent()[this._index]]);
		this._helpWindow.missionReward(undefined);
	};

	Window_Agent_List.prototype.setHelpWindow = function(helpWindow) {
		this._helpWindow = helpWindow;
	};

	Window_Agent_List.prototype.setStatusWindow = function(statusWindow) {
		this._statusWindow = statusWindow;
	};

	Window_Agent_List.prototype.maxItems = function() {
		return $gameParty.agent().length;
	};

	Window_Agent_List.prototype.itemHeight = function() {
		var innerHeight = this.height - this.padding * 2;
	//	return Math.floor(innerHeight / this.numVisibleRows());
		return this.lineHeight();
	};

	Window_Agent_List.prototype.numVisibleRows = function() {
	//	return $.ActorsListItemsNum;
	};

	Window_Agent_List.prototype.itemTextAlign = function() {
		return 'left';
	};


	//Window Mission Description

	function Window_Agent_Description() {
		this.initialize.apply(this, arguments);
	};

	Window_Agent_Description.prototype = Object.create(Window_Help.prototype);
	Window_Agent_Description.prototype.constructor = Window_Agent_Description;

	Window_Agent_Description.prototype.initialize = function() {
		var x = agent_length / 100 * Graphics.width;
		var width = (100-agent_length) / 100 * Graphics.width;
		var height = this.fittingHeight(3) + this.textPadding();
		Window_Base.prototype.initialize.call(this, x, 0, width, height);
		var _text = '';
		var _actor= $dataActors[$gameParty.agent()[0]];
		var _mission=-1;
		if (!(agent_windowskin=='True' || agent_windowskin=='true')) {this.opacity = 0;};
	};

	Window_Agent_Description.prototype.lineHeight = function() {
    	return agent_text_size+8;
	};

	Window_Agent_Description.prototype.standardFontSize = function() {
    	return agent_text_size;
	};

	Window_Agent_Description.prototype.standardBackOpacity = function() {
		if (agent_windowskin=='True' || agent_windowskin=='true') {
			return 192;
		} else {
			return 0;
		}
	};

	Window_Agent_Description.prototype.setMission = function(mission) {
     //   if (mission) {
        	this._mission=(mission);
        //    this._showReward=undefined;
            this.refresh();
     //   }
	};

	Window_Agent_Description.prototype.setActor = function(actor) {
        if (actor) {
        	//if (_actor) {
        		if (this._actor!=actor) {this._mission=-1;}
            	this._actor=actor;
            //	this._showReward=undefined;
        	//} else {
        	//	var _actor=actor;
        	//}
            this.refresh();
        }
	};

	Window_Agent_Description.prototype.setText = function() {
		if (!(this._showReward==undefined)) {
			this.showReward();
			return;
		}
		if (this._mission==-1) {
			this.drawTextEx(this._actor.profile, 0, 0);
			return;
		};
		var full_mission = this._actor.note;
		var x=0;
		var y=0;
		var text_width=32+this.textWidth('Lust Essence:00');
		full_mission=full_mission.slice(full_mission.indexOf('<Mission '+(this._mission+1).toString()+'>'), full_mission.indexOf('</Mission '+(this._mission+1).toString()+'>'));
		var name = full_mission.slice(full_mission.indexOf('<Desc- '), full_mission.length);
		name=name.slice(7, name.indexOf('>')+1)
   		this.resetTextColor();
		for (i=0;i<3; i++) {
			if (name.indexOf('|')>-1) {
				this.drawText(name.slice(0, name.indexOf('|')), x, this.lineHeight()*i, this.width-text_width);
				name=name.slice(name.indexOf('|')+1, name.length);
			} else {
				this.drawText(name.slice(0, name.indexOf('>')), x, this.lineHeight()*i, this.width-text_width);
				i=3;
			};
		}
    	this.changeTextColor(this.systemColor());
    	x= this.width-(this.textWidth('Missions: 0/0')+36)
    	this.drawText(('Missions: '+ ($gameTimer.agentLength()).toString()+'/'+$gameVariables.value(agent_variable).toString()), x, y, this.textWidth('Missions: 0/0'));
    	x=0;
		y+=this.lineHeight();
		var reward=full_mission.slice(full_mission.indexOf('<Reward- '), full_mission.length);
		reward=reward.slice(9, reward.indexOf('>'));
		for (i=0;i<2; i++) {
			this.resetTextColor();
			this.drawReward(reward, this.width-text_width, this.lineHeight*(i+1), text_width);
			if (reward.indexOf('|')>-1) {
				reward=reward.slice(reward.indexOf('|')+1, reward.length);
			} else {
				i=2;
			}
		};

	};

	Window_Agent_Description.prototype.missionReward = function(mission) {
		this._showReward=mission;
	}

	Window_Agent_Description.prototype.refresh = function() {
		this.contents.clear();
		this.setText();
	//	this.drawTextEx(this._text, this.textPadding(), this.textPadding());
	};

	Window_Agent_Description.prototype.showReward = function(mission) {
		this.contents.clear();
		var full_mission = this._actor.note;
		var x=0;
		var y=0;
		full_mission=full_mission.slice(full_mission.indexOf('<Mission '+(this._showReward+1).toString()+'>'), full_mission.indexOf('</Mission '+(this._showReward+1).toString()+'>'));
   		this.resetTextColor();
		this.drawText(this._actor.name + ' has completed their mission!', x, y, this.width);
		y+=this.lineHeight();
		var reward=full_mission.slice(full_mission.indexOf('<Reward- '), full_mission.length);
		reward=reward.slice(9, reward.indexOf('>'));
	//	var rewards=(reward.match(/|/g)).length;
		var text_width=this.width-this.standardPadding()-x;
		for (i=0;i<2; i++) {
    		this.resetTextColor();
			this.drawReward(reward, x+((text_width+this.textPadding())*i), y, text_width);
			if (reward.indexOf('|')>-1) {
				reward=reward.slice(reward.indexOf('|')+1, reward.length);
			} else {
				i=2;
			}
		};
	//	this.setText();
	//	this.drawTextEx(this._text, this.textPadding(), this.textPadding());
	};

	Window_Agent_Description.prototype.drawReward = function (reward, x, y, width) {
		switch (reward[0]) {
			case 'I': 	var item=$dataItems[parseInt(reward.slice(reward.indexOf(':')+1, reward.length))]
						this.drawItemName(item, x, y, width - this.textWidth(':00'));
						x+=32;
						var number_x = x+this.textWidth(item.name);
						if (number_x>x+width-this.textWidth(':00')) {number_x=x+(width-this.textWidth(':00'));};
						this.changeTextColor(this.systemColor());
       					this.drawText(':'+parseInt(reward.slice(reward.indexOf(',')+1, reward.length)), number_x, y, this.textWidth(':00'), 'right');
					break;
			case 'G': this.drawCurrencyValue(parseInt(reward.slice(reward.indexOf(':')+1, reward.length)), TextManager.currencyUnit, x, y, width);
					break;
		}
	}

	//Window Mission List

	function Window_Agent_Missions() {
		this.initialize.apply(this, arguments);
	};

	Window_Agent_Missions.prototype = Object.create(Window_Selectable.prototype);
	Window_Agent_Missions.prototype.constructor = Window_Agent_Missions;

	Window_Agent_Missions.prototype.initialize = function(referenceWindow) {
		var h = Graphics.height - referenceWindow.height;
		var x = agent_length / 100 * Graphics.width;
		Window_Selectable.prototype.initialize.call(this, x, referenceWindow.height, Graphics.width-x, h);
		var _actor = $dataActors[$gameParty.agent()[0]];
		this.setHelpWindow(referenceWindow);
		if (!(agent_windowskin=='True' || agent_windowskin=='true')) {this.opacity = 0;};
	};

	Window_Agent_Missions.prototype.lineHeight = function() {
    	return agent_text_size+8;
	};

	Window_Agent_Missions.prototype.standardFontSize = function() {
    	return agent_text_size;
	};

	Window_Agent_Missions.prototype.itemWidth = function() {
    	return 650;
	};

	Window_Agent_Missions.prototype.standardBackOpacity = function() {
		if (agent_windowskin=='True' || agent_windowskin=='true') {
			return 192;
		} else {
			return 0;
		}
	};

	Window_Agent_Missions.prototype.setActor = function(actor) {
		if (actor && this._actor != actor) {
			this._actor = actor;
			this.refresh();
		}
	};

	Window_Agent_Missions.prototype.isCurrentItemEnabled = function() {
		return (this.validMission(this._index) && this.costCheck(this._index))
	};

	Window_Agent_Missions.prototype.validMission = function(mission) {
		if ($gameTimer.agentLength()>=$gameVariables.value(agent_variable)) {return false;}
		if ($gameTimer.includeCharacter(this._actor)) {return false;}
		var requirements = this._actor.note;
		requirements=requirements.slice(requirements.indexOf('<Mission '+(mission+1).toString()+'>'), requirements.indexOf('</Mission '+(mission+1).toString()+'>'));
		if (requirements.indexOf('<Req-')==-1) {return true;}
		requirements=requirements.slice(requirements.indexOf('<Req- '), requirements.length);
		requirements=requirements.slice(6, requirements.indexOf('>'));
		if (requirements[0]=='V') {
			requirements=requirements.slice(requirements.indexOf(':')+1, requirements.length);
			if ($gameVariables.value(parseInt(requirements))>parseInt(requirements.slice(requirements.indexOf(',')+1,requirements.length))) {return false;}
		}
		if (requirements[0]=='S') {
			requirements=requirements.slice(requirements.indexOf(':')+1, requirements.length);
			if ($gameSwitches.value(parseInt(requirements))) {return false;}
		}
		return true;
	};

	Window_Agent_Missions.prototype.costCheck = function(mission) {
		var cost = this._actor.note;
		cost=cost.slice(cost.indexOf('<Mission '+(mission+1).toString()+'>'), cost.indexOf('</Mission '+(mission+1).toString()+'>'));
		cost=cost.slice(cost.indexOf('<Cost- '), cost.length);
		cost=cost.slice(7, cost.indexOf('>'));
		for (i=0;i<2; i++) {
			switch (cost[0]) {
				case 'I': var item =$dataItems[parseInt(cost.slice(cost.indexOf(':')+1, cost.length))]
					if (parseInt(cost.slice(cost.indexOf(',')+1, cost.length))>$gameParty.numItems(item) ) {return false;};
						break;
				case 'G': if (parseInt(cost.slice(cost.indexOf(':')+1, cost.length))>$gameParty.gold()) {return false;};
						break;
			}
			if (cost.indexOf('|')>-1) {
				cost=cost.slice(cost.indexOf('|')+1, cost.length);
			} else {
				i=2;
			}
		};
		return true;
	};

	//var _agent_window_selectable_select = Window_Selectable.prototype.select

	Window_Agent_Missions.prototype.select = function(index) {
		Window_Selectable.prototype.select.call(this, index);
        this.updateHelp();
	};

	Window_Agent_Missions.prototype.refresh = function() {
		this.contents.clear();
		var step =0
        while(step<mission_cap){
             this.drawMission(step);
             step +=1;
        };
		if (this._helpWindow==null) {return;};
		this._helpWindow.setMission(this._index);
            // this.drawMission(2);
	};

	Window_Agent_Missions.prototype.updateHelp = function() {
		if (this._helpWindow==null) {return;};
		this._helpWindow.setMission(this._index);
	};

	Window_Agent_Missions.prototype.setHelpWindow = function(helpWindow) {
		this._helpWindow = helpWindow;
	};

	Window_Agent_Missions.prototype.drawMission = function(step) {
		if (this._actor == null) {return;}
		var x = this.textPadding();
	//	var y = this.textPadding()+(this.lineHeight()*step);
		var y = (this.lineHeight()*2)*step;
		var full_mission = this._actor.note;
		full_mission=full_mission.slice(full_mission.indexOf('<Mission '+(step+1).toString()+'>'), full_mission.indexOf('</Mission '+(step+1).toString()+'>'));
		var name = full_mission.slice(full_mission.indexOf('<Name- '), full_mission.length);
		name=name.slice(7, name.indexOf('>'))
		if (this.validMission(step) && this.costCheck(step)) {
			this.resetTextColor();
		} else {
			this.changeTextColor(this.textColor(7));
		}
		this.drawText(name, x, y, this.itemWidth()-(this.textWidth('00:00:00')+this.textPadding()));
	//	x+=(this.width/5)+this.textWidth('00')
		//Reward text
	//	var item=parseInt(reward.slice(reward.indexOf(':')+1, reward.length));
	//	this.drawItemName($dataItems[item], x, y, 100);
		var time=full_mission.slice(full_mission.indexOf('<Time- '), full_mission.length);
		time = time.slice(7, time.indexOf('>'));
		this.resetTextColor();
	//	this.drawText(time, x, y, this.textWidth('0:00:00'));
		x=this.itemWidth()-this.textWidth('0:00:00');
		this.drawRemainingTime(time,step,x,y);
		x=32;
		y+=this.lineHeight();
		var reward=full_mission.slice(full_mission.indexOf('<Cost- '), full_mission.length);
		reward=reward.slice(7, reward.indexOf('>'));
	//	var rewards=(reward.match(/|/g)).length;
		var reward_width=(this.itemWidth()/2)-this.textPadding();
		for (i=0;i<2; i++) {
			this.resetTextColor();
			this.drawReward(reward, x, y, reward_width);
			x+=this.textPadding() +reward_width;
			if (reward.indexOf('|')>-1) {
				reward=reward.slice(reward.indexOf('|')+1, reward.length);
			} else {
				i=2;
			}
		};
	};

	Window_Agent_Missions.prototype.drawRemainingTime = function(time, mission, x, y) {
		for (i=0; i<$gameTimer.agentLength(); i++) {
			var test=$gameTimer.agentTimer(i);
			if ($gameTimer.agentCharacter(i).id==this._actor.id && $gameTimer.agentMission(i)==mission) {
				var time=test-Graphics.frameCount;
				var temp=Math.floor(time/216000);
				if (temp<1) {temp=0;};
				var display=temp.toString()+':';
				if (time>215999) {time=(time%216000);};
				temp=(Math.floor(time/3600));
				if (temp<1) {temp=0;};
				if (temp<10) {display+='0';};
				display+=temp.toString()+':';
				if (time>3599) {time=time%3600;};
				temp=Math.floor(time/60);
				if (temp<10) {display+='0';};
				if (temp <0) {temp=0;};
				display+=temp.toString();
				this.drawText(display, x, y, this.textWidth('0:00:00'));
				return;
			}
		}
		this.drawText(time, x, y, this.textWidth('0:00:00'));
	};

	Window_Agent_Missions.prototype.drawReward = function (reward, x, y, width) {
		switch (reward[0]) {
			case 'I': 	var item=$dataItems[parseInt(reward.slice(reward.indexOf(':')+1, reward.length))]
						this.drawItemName(item, x, y, width - this.textWidth(':00'));
						x+=32;
						var number_x = x+this.textWidth(item.name);
						if (number_x>x+width-this.textWidth(':00')) {number_x=x+(width-this.textWidth(':00'));};
						this.changeTextColor(this.systemColor());
       					this.drawText(':'+parseInt(reward.slice(reward.indexOf(',')+1, reward.length)), number_x, y, this.textWidth(':00'), 'right');
					break;
			case 'G': this.drawCurrencyValue(parseInt(reward.slice(reward.indexOf(':')+1, reward.length)), TextManager.currencyUnit, x, y, width);
					break;
		}
	};

	Window_Agent_Missions.prototype.timeArray = function(){
		if (!this._actor) {return;}
		var time = this._actor.note;
		time=time.slice(time.indexOf('<Mission '+(this._index+1).toString()+'>'), time.indexOf('</Mission '+(this._index+1).toString()+'>'));
		time=time.slice(time.indexOf('<Time- '), time.length);
		time = time.slice(7, time.indexOf('>'));
		var new_frames=parseInt(time);
		if (time.indexOf(':')>-1) {
			time= time.slice(time.indexOf(':')+1, time.length);
			new_frames = (new_frames*60)+parseInt(time);
		}
		if (time.indexOf(':')>-1) {
			time= time.slice(time.indexOf(':')+1, time.length);
			new_frames = (new_frames*60)+parseInt(time);
		}
		new_frames*=60;
		$gameTimer.newAgent(Graphics.frameCount+new_frames, this._actor, this._index);
	};

	Window_Agent_Missions.prototype.maxItems = function() {
		return mission_cap;
	};

	Window_Agent_Missions.prototype.itemHeight = function() {
		return this.lineHeight()*2;
	};

	Scene_Menu.prototype.showSceneAgent = function() {
		SceneManager.push(Scene_Agent);
	};
})();
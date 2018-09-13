// Battle Actors EX

/*:
* @plugindesc v1.0 Shows the current actor on command during battle.
* @author Soulpour777
*
* @param Image Start X
* @desc This is the original x axis of the image before it is being shown during combat.
* @default 800
*
* @param Image Stop X
* @desc This is the x axis needed before the image stops moving. (Start X / 2)
* @default 400
*
* @param Image Start Y
* @desc This is the original y axis of the image before it is being shown during combat.
* @default 180
*
* @param Opacity Clearing
* @desc The clearing speed of the image to be shown on the screen (Fade Effect).
* @default 8
*
* @param Moving Speed
* @desc The moving speed of the image to be shown on the screen (Move Effect).
* @default 20
*
* @help

SOUL_MV Battle Actors EX

Intructions:

Place the images under the img / pictures folder.

1.0 - A simple actor show image.

NEW - 1.3.3. - Changeable actor images via plugin commands.

The DEFAULT battle bust of the actors are their names. You
can change this via a plugin command.

PLUGIN COMMANDS:

BattleActors Change ActorID GraphicName
where ActorID is the actor id you want to change the battle bust
where GraphicName is the name of the image from the pictures folder you
want to substitute the default one.

e.g.

BattleActors Change 1 Aldo2
^ in here, you've set Actor 1's battle bust into Aldo2.

*
*/

(function(){

  var SOUL_MV = SOUL_MV || {};
  SOUL_MV.BattleActors = SOUL_MV.BattleActors || {};

  SOUL_MV.BattleActors._soulpour_actorBattlersDisplay_createDisplayObjects = Scene_Battle.prototype.createDisplayObjects;
  SOUL_MV.BattleActors._soulpour_actorBattlersDisplay_startActorCommandSelection = Scene_Battle.prototype.startActorCommandSelection;
  SOUL_MV.BattleActors._soulpour_actorBattlersDisplay_update = Scene_Battle.prototype.update;
  SOUL_MV.BattleActors._soulpour_actorBattlersDisplay_startPartyCommandSelection = Scene_Battle.prototype.startPartyCommandSelection;
  SOUL_MV.BattleActors._soulpour_actorBattlersDisplay_selectEnemySelection = Scene_Battle.prototype.selectEnemySelection;

  SOUL_MV.BattleActors.params = PluginManager.parameters('SOUL_MV Battle Actors EX');
  SOUL_MV.BattleActors.startX = Number(SOUL_MV.BattleActors.params['Image Start X'] || 800);
  SOUL_MV.BattleActors.startY = Number(SOUL_MV.BattleActors.params['Image Start Y'] || 180);
  SOUL_MV.BattleActors.stopX = Number(SOUL_MV.BattleActors.params['Image Stop X'] || 400);
  SOUL_MV.BattleActors.opacityClearing = Number(SOUL_MV.BattleActors.params['Opacity Clearing'] || 8);
  SOUL_MV.BattleActors.movingSpeed = Number(SOUL_MV.BattleActors.params['Moving Speed'] || 20);

  SOUL_MV.BattleActors.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
      // to alias all current plugin commands:
      SOUL_MV.BattleActors.Game_Interpreter_pluginCommand.call(this, command, args);

      // BattleActors Change ActorID GraphicName
      if (command === 'BattleActors') {
        if (args[0] === 'Change') {
          $gameParty.battleMembers()[Number(args[1])-1]._battleBust = String(args[2]);
        }
      }
  };

  SOUL_MV.BattleActors._endCommandSelection = Scene_Battle.prototype.endCommandSelection;
  Scene_Battle.prototype.endCommandSelection = function() {
      SOUL_MV.BattleActors._endCommandSelection.call(this);
      this.revertActorBattlerPosition();     
  };

  // we are now going to create a configurable variable that defines the battle bust.
  SOUL_MV.BattleActors.Game_Actor_setup = Game_Actor.prototype.setup;
  Game_Actor.prototype.setup = function(actorId) {
      SOUL_MV.BattleActors.Game_Actor_setup.call(this, actorId);
      this._battleBust = this._name;
  };

  Scene_Battle.prototype.createDisplayObjects = function() {
      SOUL_MV.BattleActors._soulpour_actorBattlersDisplay_createDisplayObjects.call(this);
      this.createActorSprite();
  };

  Scene_Battle.prototype.createActorSprite = function() {
    this._actorSprite = new Sprite();
    this._actorSprite.opacity = 0;
    this._actorSprite.x = SOUL_MV.BattleActors.startX;
    this._actorSprite.y = SOUL_MV.BattleActors.startY;
    this.addChildAt(this._actorSprite,1);
  }

  Scene_Battle.prototype.startActorCommandSelection = function() {
      SOUL_MV.BattleActors._soulpour_actorBattlersDisplay_startActorCommandSelection.call(this);
      this._actorSprite.bitmap = ImageManager.loadPicture($gameParty.battleMembers()[BattleManager.actor().index()]._battleBust);
      this._changeBattlerOpacity = true;
  };

  Scene_Battle.prototype.update = function() {
      SOUL_MV.BattleActors._soulpour_actorBattlersDisplay_update.call(this);
      if (this._changeBattlerOpacity) {
        if (this._actorSprite.opacity != 255) {
          this._actorSprite.opacity += SOUL_MV.BattleActors.opacityClearing;
        }
        if (this._actorSprite.x != SOUL_MV.BattleActors.stopX) {
          this._actorSprite.x -= SOUL_MV.BattleActors.movingSpeed;
        }      
      }

      if (this._actorCommandWindow.active)this._changeBattlerOpacity = true; // checks whether the show is true.
      
  };

  Scene_Battle.prototype.revertActorBattlerPosition = function() {
    this._actorSprite.opacity = 0;
    this._actorSprite.x = SOUL_MV.BattleActors.startX;
    this._actorSprite.y = SOUL_MV.BattleActors.startY; 
  }


  Scene_Battle.prototype.startPartyCommandSelection = function() {
      SOUL_MV.BattleActors._soulpour_actorBattlersDisplay_startPartyCommandSelection.call(this);
      this._changeBattlerOpacity = false;
      this.revertActorBattlerPosition();
  };

  Scene_Battle.prototype.selectEnemySelection = function() {
      SOUL_MV.BattleActors._soulpour_actorBattlersDisplay_selectEnemySelection.call(this);
      this._changeBattlerOpacity = false;
      this.revertActorBattlerPosition();      
  };
  SOUL_MV.BattleActors._soulpour_actorBattlersDisplay_selectActorSelection = Scene_Battle.prototype.selectActorSelection;
  Scene_Battle.prototype.selectActorSelection = function() {
      SOUL_MV.BattleActors._soulpour_actorBattlersDisplay_selectActorSelection.call(this);
      this._changeBattlerOpacity = false;
      this.revertActorBattlerPosition();       
  };
  SOUL_MV.BattleActors._soulpour_actorBattlersDisplay_onSkillOk = Scene_Battle.prototype.onSkillOk;
  Scene_Battle.prototype.onSkillOk = function() {
      SOUL_MV.BattleActors._soulpour_actorBattlersDisplay_onSkillOk.call(this);
      this._changeBattlerOpacity = false;
      this.revertActorBattlerPosition();            
  };
  SOUL_MV.BattleActors._soulpour_actorBattlersDisplay_onSkillCancel = Scene_Battle.prototype.onSkillCancel;
  Scene_Battle.prototype.onSkillCancel = function() {
      SOUL_MV.BattleActors._soulpour_actorBattlersDisplay_onSkillCancel.call(this);
      this._changeBattlerOpacity = false;
      this.revertActorBattlerPosition();        
  };

})();
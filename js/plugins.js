// Generated by RPG Maker.
// Do not edit this file directly.
var $plugins =
[
{"name":"Community_Basic","status":true,"description":"Plugin used to set basic parameters.","parameters":{"cacheLimit":"20","screenWidth":"1366","screenHeight":"768","changeWindowWidthTo":"","changeWindowHeightTo":"","renderingMode":"auto","alwaysDash":"off"}},
{"name":"EnemyBook","status":true,"description":"Displays detailed statuses of enemies.","parameters":{"Unknown Data":"??????"}},
{"name":"MadeWithMv","status":true,"description":"Show a Splash Screen \"Made with MV\" and/or a Custom Splash Screen before going to main screen.","parameters":{"Show Made With MV":"true","Made with MV Image":"MadeWithMv","Show Custom Splash":"false","Custom Image":"","Fade Out Time":"120","Fade In Time":"120","Wait Time":"160"}},
{"name":"YEP_EventChasePlayer","status":true,"description":"v1.03 Quando um jogador está na proximidade de um certo\nevento, o evento começará a seguir ou fugir do jogador.","parameters":{"Sight Lock":"300","See Player":"true","Alert Timer":"120","Alert Balloon":"1","Alert Sound":"Attack1","Alert Common Event":"0"}},
{"name":"YEP_QuestJournal","status":true,"description":"v1.01 Insert a quest journal system into your game!","parameters":{"---Main Menu---":"","Quest Command":"Quest","Show Command":"true","Enable Command":"true","Auto Place Command":"true","---Quest Menu---":"","Quest Category Window":"{\"---Categories---\":\"\",\"Category Order\":\"[\\\"available\\\",\\\"completed\\\",\\\"failed\\\",\\\"all\\\"]\",\"Available Text\":\"\\\\i[192]Available (%1)\",\"Completed Text\":\"\\\\i[191]Completed (%1)\",\"Failed Text\":\"\\\\i[194]Failed (%1)\",\"All Text\":\"\\\\i[189]All Quests (%1)\",\"Cancel Text\":\"\\\\i[161]Close\",\"---Window Settings---\":\"\",\"X\":\"0\",\"Y\":\"0\",\"Width\":\"Graphics.boxWidth / 3\",\"Height\":\"this.fittingHeight(this.numVisibleRows())\",\"Rows\":\"4\",\"Columns\":\"1\",\"Line Height\":\"36\",\"Font Face\":\"GameFont\",\"Font Size\":\"28\",\"Standard Padding\":\"18\",\"Text Padding\":\"6\",\"Text Alignment\":\"left\",\"Standard Opacity\":\"255\",\"Back Opacity\":\"192\",\"Window Skin\":\"Window\"}","Quest List Window":"{\"---Types---\":\"\",\"Show Types\":\"true\",\"Type Order\":\"[\\\"\\\\\\\\c[6]Main Quests\\\",\\\"\\\\\\\\c[4]Side Quests\\\",\\\"\\\\\\\\c[3]Character Quests\\\",\\\"\\\\\\\\c[5]Tutorial Quests\\\"]\",\"List Open Symbol\":\"-\",\"List Closed Symbol\":\"+\",\"Type Text Format\":\"%1%2 (%3)\",\"Quest Indent\":\"0\",\"Show Empty\":\"false\",\"Read Quest\":\"\\\\i[121]Read Quest\",\"Cancel\":\"\\\\i[16]Cancel\",\"---Window Settings---\":\"\",\"X\":\"0\",\"Y\":\"Graphics.boxHeight - height\",\"Width\":\"Graphics.boxWidth / 3\",\"Height\":\"Graphics.boxHeight - this.fittingHeight(4)\",\"Line Height\":\"36\",\"Font Face\":\"GameFont\",\"Font Size\":\"28\",\"Standard Padding\":\"18\",\"Text Padding\":\"6\",\"Standard Opacity\":\"255\",\"Back Opacity\":\"192\",\"Type Alignment\":\"left\",\"Quest Alignment\":\"left\",\"Window Skin\":\"Window\"}","Quest Title Window":"{\"---Window Settings---\":\"\",\"No Quest Title\":\"\\\\c[4]Quest Journal\",\"X\":\"Graphics.boxWidth - width\",\"Y\":\"0\",\"Width\":\"Graphics.boxWidth * 2 / 3\",\"Height\":\"this.fittingHeight(1)\",\"Line Height\":\"36\",\"Font Face\":\"GameFont\",\"Font Size\":\"28\",\"Standard Padding\":\"18\",\"Text Padding\":\"6\",\"Text Alignment\":\"center\",\"Standard Opacity\":\"255\",\"Back Opacity\":\"192\",\"Window Skin\":\"Window\"}","Quest Data Window":"{\"---Data Settings---\":\"\",\"No Data Text\":\"\\\"Welcome to the \\\\\\\\c[4]Quest Journal\\\\\\\\c[0].\\\\n\\\\nHere, you can review over the various\\\\nquests given to you by people from all\\\\nover the world.\\\"\",\"Quest Data Format\":\"\\\"<WordWrap>\\\\\\\\{%1\\\\\\\\}\\\\n<br>\\\\\\\\c[4]Level:\\\\\\\\c[0] %2\\\\n<br>\\\\\\\\c[4]From:\\\\\\\\c[0] %3\\\\n<br>\\\\\\\\c[4]Location:\\\\\\\\c[0] %4\\\\n<br>\\\\n<br>\\\\\\\\c[4]Description:\\\\\\\\c[0]\\\\n<br>%5\\\\n<br>\\\\n<br>\\\\\\\\c[4]Objectives:\\\\\\\\c[0]\\\\n<br>%6\\\\n<br>\\\\n<br>\\\\\\\\c[4]Rewards:\\\\\\\\c[0]\\\\n<br>%7\\\\n<br>\\\\n<br>%8\\\"\",\"Uncleared Objective\":\"\\\\i[160]%1\",\"Completed Objective\":\"\\\\i[165]%1\",\"Failed Objective\":\"\\\\i[162]%1\",\"Unclaimed Reward\":\"\\\\i[160]%1\",\"Claimed Reward\":\"\\\\i[163]%1\",\"Denied Reward\":\"\\\\i[161]%1\",\"Load Delay\":\"30\",\"---Window Settings---\":\"\",\"X\":\"Graphics.boxWidth - width\",\"Y\":\"Graphics.boxHeight - height\",\"Width\":\"Graphics.boxWidth * 2 / 3\",\"Height\":\"Graphics.boxHeight - this.fittingHeight(1)\",\"Line Height\":\"36\",\"Font Face\":\"GameFont\",\"Font Size\":\"28\",\"Standard Padding\":\"18\",\"Text Padding\":\"6\",\"Standard Opacity\":\"255\",\"Back Opacity\":\"192\",\"Window Skin\":\"Window\",\"Scroll Speed\":\"4\"}","Lunatic Mode":"{\"---Quest Menu---\":\"\",\"Before Create Windows\":\"\\\"// Variables\\\\n//   background - background image used for the menu\\\\n//   windowLayer - sprite layer that contains all windows\\\\n//\\\\n// background.bitmap = ImageManager.loadTitle1(\\\\\\\"Book\\\\\\\");\\\\n// this.fitScreen(background);\\\"\",\"After Create Windows\":\"\\\"// Variables\\\\n//   background - background image used for the menu\\\\n//   windowLayer - sprite layer that contains all windows\\\"\",\"Close Quest Menu\":\"\\\"// Variables\\\\n//   background - background image used for the menu\\\\n//   windowLayer - sprite layer that contains all windows\\\"\",\"---Quest Status---\":\"\",\"Quest Add\":\"\\\"// Variables:\\\\n//   questId - ID of the quest being added\\\\n//\\\\n// console.log('Quest ' + questId + ' successfully added!')\\\"\",\"Quest Remove\":\"\\\"// Variables:\\\\n//   questId - ID of the quest being removed\\\\n//\\\\n// console.log('Quest ' + questId + ' successfully removed!')\\\"\",\"Quest Complete\":\"\\\"// Variables:\\\\n//   questId - ID of the quest set to completed\\\\n//\\\\n// console.log('Quest ' + questId + ' status changed to Completed!')\\\"\",\"Quest Fail\":\"\\\"// Variables:\\\\n//   questId - ID of the quest set to failed\\\\n//\\\\n// console.log('Quest ' + questId + ' status changed to Failed!')\\\"\",\"Quest Available\":\"\\\"// Variables:\\\\n//   questId - ID of the quest set to available\\\\n//\\\\n// console.log('Quest ' + questId + ' status changed to Available!')\\\"\",\"---Description---\":\"\",\"Change Description\":\"\\\"// Variables:\\\\n//   questId - ID of the quest whose description is changed\\\\n//   index - Description index being changed to\\\\n//\\\\n// console.log('Quest ' + questId + ' description index changed to ' + index)\\\"\",\"---Objectives---\":\"\",\"Show Objective\":\"\\\"// Variables:\\\\n//   questId - ID of the quest whose objectives are altered\\\\n//   objectiveId - ID of the objective being shown\\\\n//\\\\n// console.log('Quest ' + questId + ' objective ' + objectiveId + ' changed to shown!')\\\"\",\"Hide Objective\":\"\\\"// Variables:\\\\n//   questId - ID of the quest whose objectives are altered\\\\n//   objectiveId - ID of the objective being hidden\\\\n//\\\\n// console.log('Quest ' + questId + ' objective ' + objectiveId + ' changed to hidden!')\\\"\",\"Complete Objective\":\"\\\"// Variables:\\\\n//   questId - ID of the quest whose objectives are altered\\\\n//   objectiveId - ID of the objective being completed\\\\n//\\\\n// console.log('Quest ' + questId + ' objective ' + objectiveId + ' changed to completed!')\\\"\",\"Fail Objective\":\"\\\"// Variables:\\\\n//   questId - ID of the quest whose objectives are altered\\\\n//   objectiveId - ID of the objective having failed\\\\n//\\\\n// console.log('Quest ' + questId + ' objective ' + objectiveId + ' changed to failed!')\\\"\",\"Normalize Objective\":\"\\\"// Variables:\\\\n//   questId - ID of the quest whose objectives are altered\\\\n//   objectiveId - ID of the objective normalized\\\\n//\\\\n// console.log('Quest ' + questId + ' objective ' + objectiveId + ' changed to normal!')\\\"\",\"---Rewards---\":\"\",\"Show Reward\":\"\\\"// Variables:\\\\n//   questId - ID of the quest whose rewards are altered\\\\n//   rewardId - ID of the reward being shown\\\\n//\\\\n// console.log('Quest ' + questId + ' reward ' + rewardId + ' becomes shown!')\\\"\",\"Hide Reward\":\"\\\"// Variables:\\\\n//   questId - ID of the quest whose rewards are altered\\\\n//   rewardId - ID of the reward being hidden\\\\n//\\\\n// console.log('Quest ' + questId + ' reward ' + rewardId + ' becomes hidden!')\\\"\",\"Claim Reward\":\"\\\"// Variables:\\\\n//   questId - ID of the quest whose rewards are altered\\\\n//   rewardId - ID of the reward becoming claimed\\\\n//\\\\n// console.log('Quest ' + questId + ' reward ' + rewardId + ' is now claimed!')\\\"\",\"Deny Reward\":\"\\\"// Variables:\\\\n//   questId - ID of the quest whose rewards are altered\\\\n//   rewardId - ID of the reward becoming denied\\\\n//\\\\n// console.log('Quest ' + questId + ' reward ' + rewardId + ' is now denied!')\\\"\",\"Normalize Reward\":\"\\\"// Variables:\\\\n//   questId - ID of the quest whose rewards are altered\\\\n//   rewardId - ID of the reward normalized\\\\n//\\\\n// console.log('Quest ' + questId + ' reward ' + rewardId + ' is normalized!')\\\"\",\"---Subtext---\":\"\",\"Change Subtext\":\"\\\"// Variables:\\\\n//   questId - ID of the quest whose subtext is changed\\\\n//   index - Subtext index being changed to\\\\n//\\\\n// console.log('Quest ' + questId + ' subtext index changed to ' + index)\\\"\"}","---Quest List---":"","Quest 1":"","Quest 2":"","Quest 3":"","Quest 4":"","Quest 5":"","Quest 6":"","Quest 7":"","Quest 8":"","Quest 9":"","Quest 10":"","Quest 11":"","Quest 12":"","Quest 13":"","Quest 14":"","Quest 15":"","Quest 16":"","Quest 17":"","Quest 18":"","Quest 19":"","Quest 20":"","Quest 21":"","Quest 22":"","Quest 23":"","Quest 24":"","Quest 25":"","Quest 26":"","Quest 27":"","Quest 28":"","Quest 29":"","Quest 30":"","Quest 31":"","Quest 32":"","Quest 33":"","Quest 34":"","Quest 35":"","Quest 36":"","Quest 37":"","Quest 38":"","Quest 39":"","Quest 40":"","Quest 41":"","Quest 42":"","Quest 43":"","Quest 44":"","Quest 45":"","Quest 46":"","Quest 47":"","Quest 48":"","Quest 49":"","Quest 50":"","Quest 51":"","Quest 52":"","Quest 53":"","Quest 54":"","Quest 55":"","Quest 56":"","Quest 57":"","Quest 58":"","Quest 59":"","Quest 60":"","Quest 61":"","Quest 62":"","Quest 63":"","Quest 64":"","Quest 65":"","Quest 66":"","Quest 67":"","Quest 68":"","Quest 69":"","Quest 70":"","Quest 71":"","Quest 72":"","Quest 73":"","Quest 74":"","Quest 75":"","Quest 76":"","Quest 77":"","Quest 78":"","Quest 79":"","Quest 80":"","Quest 81":"","Quest 82":"","Quest 83":"","Quest 84":"","Quest 85":"","Quest 86":"","Quest 87":"","Quest 88":"","Quest 89":"","Quest 90":"","Quest 91":"","Quest 92":"","Quest 93":"","Quest 94":"","Quest 95":"","Quest 96":"","Quest 97":"","Quest 98":"","Quest 99":"","Quest 100":""}},
{"name":"YEP_CoreEngine","status":true,"description":"v1.28 Needed for the majority of Yanfly Engine Scripts. Also\r\ncontains bug fixes found inherently in RPG Maker.","parameters":{"---Screen---":"","Screen Width":"1366","Screen Height":"768","Scale Battlebacks":"true","Scale Title":"true","Scale Game Over":"true","Open Console":"false","Reposition Battlers":"true","GameFont Load Timer":"0","Update Real Scale":"false","Collection Clear":"true","---Gold---":"","Gold Max":"99999999","Gold Font Size":"20","Gold Icon":"313","Gold Overlap":"A lotta","---Items---":"","Default Max":"99","Quantity Text Size":"20","---Parameters---":"","Max Level":"999","Actor MaxHP":"99999","Actor MaxMP":"99999","Actor Parameter":"9999","Enemy MaxHP":"999999","Enemy MaxMP":"99999","Enemy Parameter":"9999","---Battle---":"","Animation Rate":"4","Flash Target":"false","Show Events Transition":"true","Show Events Snapshot":"true","---Map Optimization---":"","Refresh Update HP":"true","Refresh Update MP":"true","Refresh Update TP":"false","---Font---":"","Chinese Font":"SimHei, Heiti TC, sans-serif","Korean Font":"Dotum, AppleGothic, sans-serif","Default Font":"GameFont, Verdana, Arial, Courier New","Font Size":"28","Text Align":"left","---Windows---":"","Digit Grouping":"true","Line Height":"36","Icon Width":"32","Icon Height":"32","Face Width":"144","Face Height":"144","Window Padding":"18","Text Padding":"6","Window Opacity":"192","Gauge Outline":"true","Gauge Height":"18","Menu TP Bar":"true","---Window Colors---":"","Color: Normal":"0","Color: System":"16","Color: Crisis":"17","Color: Death":"18","Color: Gauge Back":"19","Color: HP Gauge 1":"20","Color: HP Gauge 2":"21","Color: MP Gauge 1":"22","Color: MP Gauge 2":"23","Color: MP Cost":"23","Color: Power Up":"24","Color: Power Down":"25","Color: TP Gauge 1":"28","Color: TP Gauge 2":"29","Color: TP Cost Color":"29"}},
{"name":"SRD_SuperToolsEngine","status":true,"description":"The heart of all maker-style plugins; it adds a playtesting editor that can be opened with F12.","parameters":{"Connect Editor":"true","Auto Open Window":"false","Auto Move Window":"true","Menu Editor Exempt List":"[\"Window_BattleLog\",\"Window_MapName\"]"}},
{"name":"SRD_HUDMaker","status":true,"description":"Allows developers to create their own map-based HUD through an in-game GUI window!","parameters":{"Active Updating":"false","Show During Events":"transparent","Map Global Condition":"","Battle Global Condition":"","Disable Delete Key":"true"}},
{"name":"SRD_SwitchShop","status":true,"description":"Allows you to create a Shop that turns ON Switches when something is purchased from the Shop.","parameters":{"Help Window Lines":"3","Buy Window Cols":"1"}},
{"name":"YEP_RegionRestrictions","status":true,"description":"v1.04 Use regions to block out Events and/or the player from\nbeing able to venture into those spots.","parameters":{"Player Restrict":"1","Event Restrict":"9","All Restrict":"19","Player Allow":"2","Event Allow":"8","All Allow":"28"}},
{"name":"YEP_PartySystem","status":true,"description":"v1.13 Replaces the default 'Formation' command with a new\nmenu for players to easily change party formations.","parameters":{"---General---":"","Max Battle Members":"4","Show Battle Command":"true","Enable Battle Command":"true","Battle Cooldown":"1","Maximum Followers":"4","EXP Distribution":"false","---Menu---":"","Help Window":"false","Text Alignment":"center","Change Command":"Change","Remove Command":"Remove","Revert Command":"Revert","Finish Command":"Finish","---Selection---":"","Empty Text":"- Empty -","Actor Face":"true","Actor Sprite":"true","---List---":"","Remove Icon":"16","Show Sprite":"true","Sprite Y Buffer":"16","In Party Text Color":"6","---Locking---":"","Lock First Actor":"false","Locked Icon":"195","Required Icon":"205","---Detail Window---":"","Enable Detail Window":"true","List Width":"300","Actor Parameters":"Parameters","Actor Equipment":"Equipment"}}
];

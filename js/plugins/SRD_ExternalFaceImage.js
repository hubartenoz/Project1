/*:
 * @plugindesc Places the face image outside of the message box.
 * @author SumRndmDde
 *
 * @param Face X Offset
 * @desc The x position of the face image.
 * @type number
 * @default 90
 *
 * @param Face Y Offset
 * @desc The y position of the face image.
 * @type number
 * @default 90
 *
 * @param Face Background Image
 * @desc The file used for the background of the face. Place in the system folder!
 * @type file
 * @dir img/system/
 * @require 1
 * @default
 *
 * @help
 *
 * External Face Image
 * Version 1.02
 * Kaliyo Commission
 *
 * Just insert a background image into the parameters, and the plugin will
 * take care of the rest! ~
 */

var SRD = SRD || {};
SRD.ExternalFaceImage = SRD.ExternalFaceImage || {};

var Imported = Imported || {};
Imported["SumRndmDde External Face Image"] = 1.02;

(function(_) {

"use strict";

var params = PluginManager.parameters('SRD_ExternalFaceImage');

_.x = parseInt(params['Face X Offset']);
_.y = parseInt(params['Face Y Offset']);
_.img = String(params['Face Background Image']);

_.setFaceBitmap = function(mainBit, faceName, faceIndex, x, y, width, height) {
	width = width || Window_Base._faceWidth;
	height = height || Window_Base._faceHeight;
	var bitmap = ImageManager.loadFace(faceName);
	var pw = Window_Base._faceWidth;
	var ph = Window_Base._faceHeight;
	var sw = Math.min(width, pw);
	var sh = Math.min(height, ph);
	var sx = faceIndex % 4 * pw + (pw - sw) / 2;
	var sy = Math.floor(faceIndex / 4) * ph + (ph - sh) / 2;
	mainBit.blt(bitmap, sx, sy, sw, sh, 0, 0);
};

_.Window_Message_update = Window_Message.prototype.update;
Window_Message.prototype.update = function() {
	_.Window_Message_update.apply(this, arguments);
	if(this._faceContainer && this.openness !== 255) {
		this._faceContainer.alpha = 0;
	}
};

Window_Message.prototype.createFaceSprite = function() {
	this._faceContainer = new PIXI.Container();
	this._faceSprite = new Sprite();
	this._faceSprite.bitmap = new Bitmap(Window_Base._faceWidth, Window_Base._faceHeight);
	this._faceContainer.x = _.x;
	this._faceContainer.y = -(200) + _.y;
	this._faceSprite.anchor.set(0.5);
	var back = new Sprite(ImageManager.loadSystem(_.img));
	back.anchor.set(0.5);
	this._faceContainer.addChild(back);
	this._faceContainer.addChild(this._faceSprite);
	this.addChild(this._faceContainer);
};

Window_Message.prototype.drawMessageFace = function() {
	if(!this._faceSprite || !this._faceContainer) {
		this.createFaceSprite();
	}
	if($gameMessage.faceName() === '') {
		this._faceContainer.alpha = 0;
	} else {
		this._faceContainer.alpha = 1;
		this._faceSprite.bitmap.clear();
		_.setFaceBitmap(this._faceSprite.bitmap, $gameMessage.faceName(), $gameMessage.faceIndex(), 0, 0);
		ImageManager.releaseReservation(this._imageReservationId);
	}
};

Window_Message.prototype.newLineX = function() {
	return 0;
};

})(SRD.ExternalFaceImage);
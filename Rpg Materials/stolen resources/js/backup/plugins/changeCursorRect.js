
Window_MenuStatus.prototype.updateCursor = function() {
    if (this._cursorAll) {
        var allRowsHeight = this.maxRows() * this.itemHeight();
        this.setCursorRect(0, 0, this.contents.width, allRowsHeight);
        this.setTopRow(0);
    } else if (this.isCursorVisible()) {
        var rect = this.itemRect(this.index());
        rect.x += 0; // Positive number to move cursor right, negative number to move cursor left.
        rect.y += 40; // positive number to move cursor down, negative number to move cursor up.
        rect.width += -10; //positive number to make cursor thicker horizontally, negative number to make cursor thinner horizontally.
        rect.height += -80; // positive number to make cursor thicker vertically, negative number to make cursor thinner vertically.
        this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
    } else {
        this.setCursorRect(0, 0, 0, 0);
    }
};
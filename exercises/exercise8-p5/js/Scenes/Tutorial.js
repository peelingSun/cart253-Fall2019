/**
  Tutorial()
  @constructor args: characterPortrait
    Assigns portrait.
    inits default state parameters in parent State prototype.
  @Assigns a tag to this scene to identify it.
  @Updates the scene with the provided map.
*/
class Tutorial extends State {
  constructor(stateConfig, stateData, characterPortrait) {
    super(stateConfig, stateData);
    this.characterPortrait = characterPortrait;
  }
  updateState() {
    this.updateText();
  }

  /**
    updateClicks()
    @arg: updateClickCounter.
      callbacks the function updateClickCounter in the UISystem after this is done.
    @Listens to mousePressed in main.js.
  */
  updateClicks(updateClickCounter) {
    this.contextMenuDisplayed = false;
    this.readyToChangeState = true;
    readyVoice.play();
  }

  updateText() {
    const specialNarrationLineSpacing = 100;
    const dialogueLineSpacing = this.stateData.tSize;
    let specialNarrationPosY = this.stateData.specialNarrationPosY;
    let dialoguePosY = this.stateData.dialoguePosY;
    // The semi-transparent bg behind the dialogue choices
    let dialogueBg = this.stateData.dialoguePosY - this.stateData.dialogueTSize;
    const dialogueBgSize = this.stateData.dialogueTSize + 10;

    for(let i = 0; i < this.stateData.specialNarration.length; i++) {
      // Adds incremented line spacing
      specialNarrationPosY += specialNarrationLineSpacing;
      push();
      fill(this.stateData.textColor);
      textSize(this.stateData.tSize);
      text(this.stateData.specialNarration[i], this.stateData.specialNarrationPosX, specialNarrationPosY);
      pop();
    }
    for(let k = 0; k < this.stateData.dialogue.length; k++) {
      dialogueBg += dialogueLineSpacing;
      push();
      fill(20, 255, 60, 30);
      rect(this.stateData.dialoguePosX, dialogueBg, this.dialogueAverageTextWidth, dialogueBgSize);
      pop();
    }
    for(let j = 0; j < this.stateData.dialogue.length; j++) {
      dialoguePosY += dialogueLineSpacing;
      push();
      fill(this.stateData.textColor);
      textSize(this.stateData.dialogueTSize);
      text(this.stateData.dialogue[j], this.stateData.dialoguePosX, dialoguePosY);
      pop();
    }
  }
}

/**
  Spiritual Desert scene. Explores spirituality in the context of
  struggling in a directionless situation.

*/
class SpiritualDesert extends Scene {
  constructor(sceneData, actorFactory, tileMapExplorer, spiritualDesertVoiceActing){
    super(sceneData);
    this.spiritualDesertVoiceActing = spiritualDesertVoiceActing;
    this.playedVoiceActing = false;
    this.dialogueAverageTextWidth = this.textLineWidth(this.sceneData.dialogue);
    this.actorFactory = actorFactory;
    this.actorArray = [];
    this.tileMapExplorer = tileMapExplorer;
    this.timesComplained = 0;
    this.succeededMinigame = false; // Whether the player completed the mini-game
    this.combinationCount = 0; // Counter for how many times the player has guessed at the mini-game
    this.maxCombinationLength = 4; // The max number of attempts at the mini-game
    this.successfulCombination = ["left", "right", "left", "down"]; // The right key combination
    this.contriteAdam = new Prisoner(width / 2, height / 2, TILE_SIZE, color(200, 200, 0), 40, this.actorFactory.avatarMale);
  }
  /**
    Updates the scene.

  */
  updateScene() {
    console.log(this.contriteAdam.movementsCounter);
    if(!this.playedVoiceActing) {
      this.spiritualDesertVoiceActing.play();
      this.playedVoiceActing = true;
    }
    this.displayCinematic();
    this.displayCaptions();
    //this.contriteAdam.protestOutloud(this.sceneData, this.timesComplained);
    if(!this.succeededMinigame) { //if we didn't succeed at the mini-game yet
      // Player feedback for the number of times they have moved yet and if it failed.
      if(this.contriteAdam.movementsCounter === this.maxCombinationLength - 2) {
        this.displayFailMessage();
      }
      this.contriteAdam.displayKeyPressed();
      this.checkMoveCombination();
    }
  }
  /**
    Creates a little cinematic scene.

  */
  displayCinematic() {
    background(this.sceneData.bgColor); // Black
    this.contriteAdam.display(this.sceneData.sizeMultiplier);
  }
  /**
    Displays the text.

  */
  displayCaptions() {
    const narrationLineSpacing = 200;
    const dialogueLineSpacing = this.sceneData.tSize;
    let narrationPosY = this.sceneData.narrationPosY;
    let dialoguePosY = this.sceneData.dialoguePosY;
    let dialogueBg = this.sceneData.dialoguePosY - this.sceneData.dialogueTSize;
    const dialogueBgSize = this.sceneData.dialogueTSize + 10;
    for(let i = 0; i < this.sceneData.narration.length; i++) {
      narrationPosY += narrationLineSpacing;
      push();
      fill(this.sceneData.textColor);
      textSize(this.sceneData.tSize);
      text(this.sceneData.narration[i], this.sceneData.narrationPosX, narrationPosY);
      pop();
    }
    for(let k = 0; k < this.sceneData.dialogue.length; k++) {
      dialogueBg += dialogueLineSpacing;
      push();
      fill(20, 255, 60, 30); // TODO remove hardcoded values
      rect(this.sceneData.dialoguePosX, dialogueBg, this.dialogueAverageTextWidth, dialogueBgSize);
      pop();
    }
    for(let j = 0; j < this.sceneData.dialogue.length; j++) {
      dialoguePosY += dialogueLineSpacing;
      push();
      fill(this.sceneData.textColor);
      textSize(this.sceneData.dialogueTSize);
      text(this.sceneData.dialogue[j], this.sceneData.dialoguePosX, dialoguePosY);
      pop();
    }
  }
  /**
    mousePressed events. To be implemented later.

  */
  mousePressed() {
    console.log("Mouse pressed");
  }
  /**
    Handles keyboard inputs.

  */
  keyPressed(TILE_SIZE) {
    let sceneKeyPressEvent = null;
    this.contriteAdam.keyPressed(TILE_SIZE);
    sceneKeyPressEvent = this.checkMoveCombination();
    return sceneKeyPressEvent;
  }
  /**
    Checks if the player got the right input combination. There is a right order.

  */
  checkMoveCombination() {
    // Allocate a copy of the queue, also resets attempts upon recall of this function.
    let miniGameAttempt = [];
    // If the player moved four times (max combinations)
    if(this.contriteAdam.movementCombination.isFull()) {
      // Store the results
      while(!this.contriteAdam.movementCombination.isEmpty()) {
        miniGameAttempt.push(this.contriteAdam.movementCombination.dequeue());
      }
      console.log("Results: " + miniGameAttempt);
      // Validate the results by comparing the values at equal indexes.
      for(let i = 0; i < miniGameAttempt.length; i++) {
        if(miniGameAttempt[i] !== this.successfulCombination[i]) {
          // Leave the function if a key press doesn't match.
          return;
        }
      }
      // If we didn't return, then we must have succeeded at the mini-game
      this.succeededMiniGame = true;
      if(this.succeededMiniGame) {
        alert("Succeess");
        return "succeededAtHoudiniMiniGame";
      }
    }
  }
  /**
    Displays fail message.

  */
  displayFailMessage() {
    push();
    textSize(this.tSize);
    fill(this.textColor);
    text("Wrong combination. Try again.", this.sceneData.failMessagePosX, this.sceneData.failMessagePosY);
    pop();
  }
}

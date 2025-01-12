/**
  FirstJob
  @constructor args: characterPortrait
    Assigns portrait.
    inits default state parameters in parent State prototype.
  @Assigns a tag to this scene to identify it.
  @Updates the scene with the provided map.
*/
class FirstJob extends State {
    constructor(stateConfig, stateData, UILayer, characterPortrait) {
      super(stateConfig, stateData, UILayer);
      this.characterPortrait = characterPortrait;
      this.positivityGrowthFactor = 50;
      this.positivityDecayFactor = 35; // Could become increasingly larger relative to growth factor by age slice.
      this.resetPositivity();
      this.resetStateTimer();
      this.positivityScore = 0; // Final positivity score for this slice of life when leaving state.
    }

    /**
      updateState()
      @no custom args.
      @Updates this state.
    */
    updateState() {
      this.setFrameRate();
      this.updateStateTimer();
      this.autoDecreasePositivity(this.positivityDecayFactor)
      this.incrementPositivity(this.positivityGrowthFactor)
      this.displayPositivity();
      this.curveDecayFactor();
      this.displayPortrait();
      this.spawnMentalSchemas();
      this.displayStateTimer();
      // Change scene after the duration of state
      if(this.stateTimer >= this.stateDuration) {
        this.readyToChangeState = true;
        congratulations.play();
      }
    }

    /**
      spawnMentalSchemas()
      @arg:
      @spawn allison's thoughts (stored in an array) in random coordinates to create a mental map.
        also known as a mental schema or script.
      @allows the player to redirect their x-y values towards the portrait.
        The positive or negative thoughts that touch her will be the life choice of that slice of life.
        Output should be displayed in the life bar skills.
    */
    spawnMentalSchemas() {
      // Instructions
      push();
      fill(0, 255, 255);
      textSize(42);
      text("First Job at the office!", width/2, height/2);
      pop();

      push();
      stroke(255, 0, 0);
      strokeWeight(this.strokeW);
      fill(0);
      textSize(this.tSizer);
      push();
      translate(width/2, height/2);
      // TODO replace with array of different positive or negative thoughts
      text("I'm not competent.", sin(this.timerAngle) * 200, cos(this.timerAngle) * 200);
      pop();

      push();
      translate(0, 0);
      stroke(255, 0, 0);
      strokeWeight(5);
      textSize(this.tSizer);
      text("I'm going to fail.", random(width/2, width), random(height/2, height));
      pop();

      // Hold any key down or mouse button to think about the opposite
      if(keyIsPressed || mouseIsPressed) {
        // Re-display the colored portrait to show the character's renewed self-confidence
        push();
        imageMode(CENTER);
        image(this.characterPortrait, 300, 640, this.characterPortrait.width, this.characterPortrait.height);
        pop();

        push();
        noStroke();
        fill(0, 255, 0);
        textSize(42);
        text("I don't mind starting somewhere!", mouseX - 250, mouseY);
        pop();
      }
      else {
        push();
        noStroke();
        fill(255, 0, 0);
        textSize(42);
        text("I'm a failure", mouseX - 250, mouseY);
        pop();
      }
        this.modifyStroke();
    }
    updateClicks(updateClickCounter) {
      this.contextMenuDisplayed = false;
    }
}

/**
  HighSchool()
  @constructor args: characterPortrait
    Assigns portrait.
    inits default state parameters in parent State prototype.
  @Assigns a tag to this scene to identify it.
  @Updates the scene with the provided map.
*/
class HighSchool extends State {
    constructor(stateConfig, stateData, UILayer, characterPortrait) {
      super(stateConfig, stateData, UILayer);
      this.characterPortrait = characterPortrait;
      this.positivityGrowthFactor = 50;
      this.positivityDecayFactor = 25; 
      this.resetPositivity();
      this.resetStateTimer();
      this.stateDuration = 120;
      this.positivityScore = 0; 
    }

    /**
      updateState()
      @no custom args.
      @Updates this state.
    */
    updateState() {
      this.updateStateTimer();
      this.autoDecreasePositivity(this.positivityDecayFactor)
      this.incrementPositivity(this.positivityGrowthFactor)
      this.displayPositivity();
      this.displayStateTimer();
      this.displayPortrait();
      this.spawnMentalSchemas();
      if(this.stateTimer >= this.stateDuration) {
        this.readyToChangeState = true;
        if(this.positivityScore < 0) {
        }
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
      text("Game Psychologist: Nice glasses.", 50, 250);
      pop();

      push();
      fill(0);
      textSize(42);
      // TODO replace with array of different positive or negative thoughts
      text("I am unattractive", random(width/2, width), random(height/2, height));
      pop();
      // Hold any key down to think about the opposite
      if(keyIsPressed || mouseIsPressed) {
        push();
        fill(0, 255, 0);
        textSize(42);
        text("Nah, I am beautiful.", mouseX - 250, mouseY);
        pop();
      }
      else {
        push();
        noStroke();
        fill(255, 0, 0);
        textSize(42);
        text("Nah, I'm ugly...", mouseX - 250, mouseY);
        pop();
      }
    }

    /**
      updateClicks()
      @arg: updateClickCounter.
        callbacks the function updateClickCounter in the UISystem after this is done.
      @Listens to mousePressed in main.js.
    */
    updateClicks(updateClickCounter) {
      this.contextMenuDisplayed = false;
    }
}
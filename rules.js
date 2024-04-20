class Start extends Scene {
    create() {
        console.log(this.engine.storyData);

        this.engine.setTitle(this.engine.storyData.Title); // TODO: replace this text using this.engine.storyData to find the story title
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation); // TODO: replace this text by the initial location of the story
    }
}

class Location extends Scene {
    create(key) {
        if (key == "Stove") {
            this.engine.storyData.Soup_Cooked = true;
        }
        let locationData = this.engine.storyData.Locations[key]; // TODO: use `key` to get the data object for the current story location
        this.engine.show(locationData.Body); // TODO: replace this text by the Body of the location data

        console.log(key);
        
        if(locationData.Choices) { // TODO: check if the location has any Choices
            for(let choice of locationData.Choices) { // TODO: loop over the location's Choices
                if ((this.engine.storyData.Pot_Collected == false) && (choice.Target == "Stove")) {
                    continue;
                }
                if ((this.engine.storyData.Pot_Collected == true) && (choice.Text == "Get out the Pot")) {
                    continue;
                }
                if ((this.engine.storyData.Soup_Cooked == false) && (choice.Text == "Deliver the Soup")) {
                    continue;
                }
                this.engine.addChoice(choice.Text, choice); // TODO: use the Text of the choice
                // TODO: add a useful second argument to addChoice so that the current code of handleChoice below works
            }
        } else {
            this.engine.addChoice("The end.")
        }
    }

    handleChoice(choice) {
        if(choice && choice.Target && !choice.Sub) {
            this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(Location, choice.Target);
        } else if (choice && choice.Target && choice.Sub) {
            this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(Sub_Location, choice.Target);
        } else {
            this.engine.gotoScene(End);
        }
    }
}

class Sub_Location extends Location {
    create(key) {
        if (key == "Cabinets") {
            this.engine.storyData.Pot_Collected = true;
        }
        let locationData = this.engine.storyData.Locations[key]; 
        let num = Math.floor(Math.random() * locationData.Dialouge.length);
        //console.log(locationData.Dialouge.length);
        this.engine.show(locationData.Dialouge[num]);
        console.log(num);
        
        if(locationData.Choices) { 
            for(let choice of locationData.Choices) {
                if ((this.engine.storyData.Pot_Collected == true) && (choice.Text == "Get out the Pot")) {
                    continue;
                }
                if ((this.engine.storyData.Soup_Cooked == false) && (choice.Text == "Deliver the Soup")) {
                    continue;
                }
                this.engine.addChoice(choice.Text, choice); 
            }
        } else {
            this.engine.addChoice("The end.")
        }
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');
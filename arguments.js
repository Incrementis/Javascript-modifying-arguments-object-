/*
	NOTE:
	====================================================================================================
	
	Parts of the code below could be optimized by using OOP, but due to simplicity and
	demonstration purpose, it is kept as it is.
	
	
	TIP:
	Mark a word with the mouse/keyboard to highlite every same word within the whole document(Notepad++)
	
	====================================================================================================
*/




/*

	===========
	ALL OBJECTS
	===========

*/


var Disc =
{
	
	Name: "Disc",//Just needed once in "Reset()"
	isChecked: false,
	changeStyle: document.getElementById('disc').style,
	Reset: document.getElementById('disc-feature'),
	hasFeature: function()
	{
		
		var Feature = document.getElementById('disc-feature').style
		
		Feature.visibility = "visible";
		
	}
	
}


var Can =
{
	
	isChecked: false,
	changeStyle: document.getElementById('can').style,
	Reset: document.getElementById('can-feature'),
	hasFeature: function()
	{
		
		var Feature = document.getElementById('can-feature').style
		
		Feature.visibility = "visible";
		
	}
	
}


var Binocular =
{
	
	isChecked: false,
	changeStyle: document.getElementById('binocular').style,
	Reset: document.getElementById('binocular-feature'),
	hasFeature: function()
	{
		
		var Feature = document.getElementById('binocular-feature').style
		
		Feature.visibility = "visible";
		
	}
	
}


var Ingredients = 
{
	List: [Disc, Can, Binocular],
}


var Substance = 
{
	
	isTransformed: false,
	hasIngredient: false,
	changeForm: document.getElementById('substance'),
	/*
		ATTENTION: 
		Object "argument" is converted into an array. 
	*/
	Transforming: function(ingredient)
	{
	
		this.isTransformed = true;
		
		//Saving the arguments into an array and cutting out the first parameter "ingredient"
		var args = [].slice.call(arguments, 1);
		
		args[0]();	
		
	}
	
}




/*

	==========================
	CHECKING, TRANSFORM, RESET
	==========================

*/

//Purpose: Visualizing check or uncheck the ingredients
function Checking(clicked)
{
	var Ingredient = Ingredients.List[clicked];

	//Change opacity
	if(Ingredient.isChecked === false)
	{
		Ingredient.isChecked = true;
		Ingredient.changeStyle.opacity = 0.5;
		
	}
	else
	{
		Ingredient.isChecked = false;
		Ingredient.changeStyle.opacity = 1;
		
	}
	
	
}


//Purpose: Shows the result of the fusion
function Transform()
{
	
	var allIngredients = Ingredients.List.length;
		
	//Checking if any ingredient is selected
	for(var ingredient = 0; ingredient < allIngredients; ingredient++)
	{
		
		if(Ingredients.List[ingredient].isChecked && Substance.isTransformed === false)
		{
			//For later use
			Substance.hasIngredient = true;
			
		}
		
	}
	
	
	
	//Not changing the substance form if no ingredient was chosen!
	if(Substance.hasIngredient === false)
	{
		alert("Please choose an ingredient!")
	}
	else
	{
		
		//Changing the look of substance and activating all chosen ingredients features
		if(Substance.isTransformed === false)
		{
			for(var ingredient = 0; ingredient < allIngredients; ingredient++)
			{
				if(Ingredients.List[ingredient].isChecked)
				{
					//Object
					var selectedIngredient = Ingredients.List[ingredient];
					//Method
					var Feature = selectedIngredient.hasFeature;
					
					/*
						ATTENTION:
						This is where the ingredients feature is activated 
					*/
					Substance.Transforming(selectedIngredient, Feature);
					
				}
				
			}
			
			//Visualizing the new form in browser
			Substance.changeForm.src="transformation/TV.png";

		}
		else
		{
			alert("Please RESET!");
		}
		
	}	
	
}//Transform



//Purpose: Resets all changes
function Reset()
{

	Substance.hasIngredient = false;
	Substance.isTransformed = false;
	Substance.changeForm.src="Magic.png";
	
	//Reseting all Ingredients
	for(var clicked = 0; clicked < Ingredients.List.length; clicked++)
	{	

		Ingredients.List[clicked].isChecked = false;
		Ingredients.List[clicked].changeStyle.opacity = 1;
		Ingredients.List[clicked].Reset.style.visibility = "hidden";
		
		//Only for Audio
		if(Ingredients.List[clicked].Name === "Disc")
		{
			
			Ingredients.List[clicked].Reset.currentTime = 0;
			Ingredients.List[clicked].Reset.pause();
			
		}

	}
	
}

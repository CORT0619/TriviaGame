var app = {

	qAndA:[{question: "What is the name of the second movie in the divergent series?",
			pos1: "Allegiant",
			pos2: "Insurgent",
			pos3: "Reliance",
			pos4: "Defiance",
			imgUrl: "assets/images/insurgent.jpg"},
		   {question: "What trilogy of superhero movies featured actor Tobey Maguire as the main character?",
			pos1: "X-Men",
			pos2: "Batman",
			pos3: "Spider-Man",
			pos4: "Superman",
			imgUrl: "assets/images/spidey.jpg"},
		   {question: "In the X-Men movies what is the name of Patrick Stewart's character?",
			pos1: "Professor X",
			pos2: "Professor K",
			pos3: "Mr. X",
			pos4: "Agent M",
			imgUrl: "assets/images/xmen.jpg"},
		   {question: "Which movie starred Michael J. Fox and was filmed in the 80s?",
			pos1: "Ferris Bueller's Day Off",
			pos2: "Back to the Future",
			pos3: "E.T. the Extra-Terrestrial",
			pos4: "Ghostbusters",
			imgUrl: "assets/images/back-to-future.jpg"},
		   {question: "What movie used the term a dream within a dream?",
		    pos1: "Shutter Island",
		    pos2: "The Adjustment Bureau",
		    pos3: "Avatar",
		    pos4: "Inception",
			imgUrl: "assets/images/inception.jpg"}],

	correctAnswers: ['Insurgent', 'Spider-Man', 'Professor X', 'Back to the Future', 'Inception'],

	userAnswers: [],

	incrementQs: 0,
	beginInt: 0,

	timer: 45,
	btnClicked: false,
	numberCorrect: 0,
	numberIncorrect: 0,
	numberUnAnswered: 0,


	beginGame: function(){

		if(app.incrementQs == app.qAndA.length){

			app.gameFinished();
			app.timer = 45;

		} else {

			if(app.incrementQs >= 1){
				clearInterval(app.displayNextInt);
				$('#gameStart').show();
				$('#divAnswers').hide();
				app.timer = 45;
				$('#time').html(app.timer); //??
			}

			$('p.questions').html(app.qAndA[app.incrementQs].question);
			$('p.answer1').html(app.qAndA[app.incrementQs].pos1);
			$('p.answer2').html(app.qAndA[app.incrementQs].pos2);
			$('p.answer3').html(app.qAndA[app.incrementQs].pos3);
			$('p.answer4').html(app.qAndA[app.incrementQs].pos4);

			app.beginInt = setInterval(app.count, 1000);

		}


	},

	count: function(){

		app.timer--;
		$('#time').html(app.timer);

		if(app.timer == 0){

			app.oufOfTime();

		} else if(app.btnClicked == true && app.correctAnswers[app.incrementQs] == app.userAnswers[app.incrementQs]){
		
			app.answersCorrect();

		} else if(app.btnClicked == true && app.correctAnswers[app.incrementQs] != app.userAnswers[app.incrementQs]){

			app.answersWrong();
		}

	},

	answersCorrect: function(){

		if(newImg != ""){

			$('#pic').empty();
		}

		$('#divAnswers').show();
		$('#gameStart').hide();
		$('#outOfTime').hide();
		$('#wrongMsg').hide();	
		$('#correctMsg').show();
		$('#pCorrectAnswer').hide();	
		$('#answers').css('display', 'block');
		$('#timeRemaining').css('display', 'block');
		$('#elapsedTime').html(app.timer);

		clearInterval(app.beginInt);

		var newImg = $("<img>").attr('src', app.qAndA[app.incrementQs].imgUrl).attr('width', '115px').attr('id', 'correctMovieImage');

		$('#pic').append(newImg);		
		app.btnClicked = false;

		app.displayNextInt = setInterval(app.beginGame, 5000);
		app.numberCorrect++;
		app.incrementQs++;
	},

	answersWrong: function(){

		if(newImg != ""){

			$('#pic').empty();
		}

		$('#divAnswers').show();
		$('#gameStart').hide();
		$('#outOfTime').hide();
		$('#wrongMsg').show();
		$('#correctMsg').hide();
		$('#pCorrectAnswer').show();
		$('#pCorrectAnswer span').html(app.correctAnswers[app.incrementQs]);
		$('#timeRemaining').css('display', 'block');
		$('#elapsedTime').html(app.timer);
		clearInterval(app.beginInt);

		var newImg = $("<img>").attr('src', app.qAndA[app.incrementQs].imgUrl).attr('width', '115px').attr('id', 'correctMovieImage');

		$('#pic').append(newImg);

		app.btnClicked = false;
		app.displayNextInt = setInterval(app.beginGame, 5000);
		app.numberIncorrect++;
		app.incrementQs++;
	},

	oufOfTime: function(){

		if(newImg != ""){

			$('#pic').empty();
		}

		app.userAnswers.push(""); // placeholder, MAY NEED TO CHANGE
		$('#divAnswers').show();
		$('#gameStart').hide();
		$('#pCorrectAnswer span').html(app.correctAnswers[app.incrementQs]);
		$('#pCorrectAnswer').show();
		$('#correctMsg').hide();
		$('#wrongMsg').hide();		
		$('#timeRemaining').css('display', 'block');
		$('#elapsedTime').html(app.timer);	
		clearInterval(app.beginInt);
		var newImg = $("<img>").attr('src', app.qAndA[app.incrementQs].imgUrl).attr('width', '115px').attr('id', 'correctMovieImage');

		$('#pic').append(newImg);

		app.numberUnAnswered++;

		app.displayNextInt = setInterval(app.beginGame, 5000);

		app.incrementQs++;	

	},

	restart: function(){

		app.incrementQs = 0;
		app.userAnswers.length = 0;
		$('#time').html("45");

		app.beginGame();
		$('#gameStart').show();
		$('#gameComplete').hide();
		$('#restartPlaceholder').css('display', 'none');
		clearInterval(app.displayNextInt);
		$('#elapsedTime').empty();
		app.numberCorrect = 0;
		app.numberIncorrect = 0;
		app.numberUnAnswered = 0;
	},

	gameFinished: function(){

		$('#restartPlaceholder').css('display', 'block');
		$('#divAnswers').hide();
		$('#gameStart').hide();

		$('#gameComplete').css('display', 'block');

		$('#gameOverCorrect span').html(app.numberCorrect);
		$('#gameOverIncorrect span').html(app.numberIncorrect);
		$('#unanswered span').html(app.numberUnAnswered);
		app.timer = 45;
	}
};


$(document).ready(function(){

	$('#begin').on('click', function(){

		$('div#gameStart').css('display', 'block');
		$('#btnWrapper').css('display', 'none');
		$('.questions').html(app.beginGame);

	});

	$('.answers').on('click', function(){

		app.userAnswers.push($(this).text());
		app.btnClicked = true;

	});

	$('#restartPlaceholder').on('click', function(){

		app.restart();
		
	});

});
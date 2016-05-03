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
			imgUrl: ""},
		   {question: "In the X-Men movies what is the name of Patrick Stewart's character?",
			pos1: "Professor X",
			pos2: "Professor K",
			pos3: "Mr. X",
			pos4: "Agent M",
			imgUrl: ""},
		   {question: "Which movie starred Michael J. Fox and was filmed in the 80s?",
			pos1: "Ferris Bueller's Day Off",
			pos2: "Back to the Future",
			pos3: "E.T. the Extra-Terrestrial",
			pos4: "Ghostbusters",
			imgUrl: ""},
		   {question: "What movie used the term a dream within a dream?",
		    pos1: "Shutter Island",
		    pos2: "The Adjustment Bureau",
		    pos3: "Avatar",
		    pos4: "Inception",
			imgUrl: ""}],

	correctAnswers: ['Insurgent', 'Spider-Man', 'Professor X', 'Back to the Future', 'Inception'],

	userAnswers: [],

	//timePerQuestion: 45 * 1000,

	incrementQs: 0,
	beginInt: 0,
	timer: 45,
	btnClicked: false,

	beginGame: function(){

		$('p.questions').html(app.qAndA[app.incrementQs].question);
		$('p.answer1').html(app.qAndA[app.incrementQs].pos1);
		$('p.answer2').html(app.qAndA[app.incrementQs].pos2);
		$('p.answer3').html(app.qAndA[app.incrementQs].pos3);
		$('p.answer4').html(app.qAndA[app.incrementQs].pos4);

		app.beginInt = setInterval(app.count, 1000);
		this.incrementQs++;
		//console.log(app.incrementQs);

	},

	count: function(){

		app.timer--;
		$('#time').html(app.timer);

		if(app.timer == 0){

			/*clearInterval(app.beginInt);
			$('#gameStart').hide();
			$('#divCorrectAnswers').show();
			$('#pCorrectAnswer span').html(app.correctAnswers[app.incrementQs]);
			$('#pCorrectAnswer span').css('font-weight', 'bold');

			console.log(app.correctAnswers[app.incrementQs]);

			$('#elapsedTime').html(app.timer);*/

			app.oufOfTime();

		//} else if(app.userAnswers.length != 0 && app.userAnswers.length != app.incrementQs+1){
		} else if(app.btnClicked == true && app.correctAnswers[app.incrementQs] == app.userAnswers[app.incrementQs]){
		
			console.log("length is " + app.userAnswers.length);
			console.log("other is " + app.incrementQs+1);	

			app.answersCorrect();

		/*	$('#timeRemaining').css('display', 'block');

			$('#elapsedTime').html(app.timer);

			clearInterval(app.beginInt);
			console.log(app.userAnswers);

			$('#divCorrectAnswers').show();
			$('#gameStart').hide();
			app.btnClicked = false;*/

		} else if(app.btnClicked == true && app.correctAnswers[app.incrementQs] != app.userAnswers[app.incrementQs]){

			app.answersWrong();
		}

	},

	answersCorrect: function(){

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

		var newImg = $("<img>").attr('src', app.qAndA[app.incrementQs].imgUrl).attr('width', '100px').attr('id', 'correctMovieImage');

		$('#pic').append(newImg);		
		app.btnClicked = false;
	},

	answersWrong: function(){

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

		var newImg = $("<img>").attr('src', app.qAndA[app.incrementQs].imgUrl).attr('width', '100px').attr('id', 'correctMovieImage');

		$('#pic').append(newImg);

		app.btnClicked = false;

	},

	oufOfTime: function(){

		app.userAnswers.push(""); // placeholder, MAY NEED TO CHANGE
		$('#divAnswers').show();
		$('#gameStart').hide();
		$('#pCorrectAnswer span').html(app.correctAnswers[app.incrementQs]);
		$('#pCorrectAnswer').show();
		$('#correctMsg').hide();
		$('#wrongMsg').hide();		
		$('#timeRemaining').css('display', 'block');
		$('#elapsedTime').html(app.timer);	

		var newImg = $("<img>").attr('src', app.qAndA[app.incrementQs].imgUrl).attr('width', '100px').attr('id', 'correctMovieImage');

		$('#pic').append(newImg);					

	}


};


$(document).ready(function(){

	$('#begin').on('click', function(){

		$('div#gameStart').css('display', 'block');
		//$(this).css('display', 'none');
		$('#btnWrapper').css('display', 'none');
		$('.questions').html(app.beginGame);

	});

	$('.answers').on('click', function(){

		app.userAnswers.push($(this).text());
		console.log(app.userAnswers);
		app.btnClicked = true;

	});





});
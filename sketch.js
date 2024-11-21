
//Most of the doc was done in css but there are a few poorly written javascript functions to supplement lol
//Ths file primarily handles the transiitons in the introduction and timings as well as the cookies 

// references:
// // https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie (for document.cookie)
// // source for scroll animations: https://css-tricks.com/books/greatest-css-tricks/scroll-animation/ 


let buttonContainer;
let collectedTime = '';

let delayScroll = 15000;

//joke array for the joke cookies :)
let jokes = [
  "Why couldn't the bicycle stand up by itself? It was two tired.",
  "How does a penguin build its house? Igloos it together.",
  "Why did the scarecrow win an award? Because he was outstanding in his field.",
  "I don't trust stairs. They're always up to something.",
  "I only know 25 letters of the alphabet. I don't know y.",
  "I used to play piano by ear, but now I use my hands.",
  "I’m reading a book on anti-gravity. It’s impossible to put down.",
  "I'm afraid for the calendar. Its days are numbered.",
  "What do you call a fish wearing a bowtie? Sofishticated.",
  "What’s orange and sounds like a parrot? A carrot!"
];


function setup() {
  noCanvas();

  //making and styling button in intro for accepting "privacy policy"
  buttonContainer = document.getElementById('buttonContainer');

  let acceptButton = createButton('I AGREE');
  acceptButton.parent(buttonContainer);
  acceptButton.mousePressed(startDoc);
  acceptButton.style('background-color', '#020d29');
  acceptButton.style('border', 'none');
  acceptButton.style('font-family', 'barlow');
  acceptButton.style('font-size', '20px');
  acceptButton.style('padding', '10px');
  acceptButton.style('color', '#f134ee');
  acceptButton.style('margin-top', '-10px');
}

function draw() {
  //empty since I'm not using p5's canvas
}

//prevent scrolling past intro intiially
document.body.style.overflow = 'hidden';
setTimeout(() => {
  document.body.style.overflow = 'auto'; 
}, delayScroll);


function startDoc() {
  let currentTime = getTime();

  //cookie for the first button click to get time they arrived on site
  document.cookie = `buttonClick=${currentTime}; path=/; max-age=3600`; // cookie expires in 1 hour
  console.log('cookie collected:', currentTime);

  collectedTime = currentTime;

  buttonContainer.classList.add("fadeout");

  let areYouSureText = document.getElementById('areYouSureText');
  areYouSureText.classList.add('fadeInOut');

  areYouSureText.addEventListener('animationend', () => {
    let collectedTimeText = document.getElementById('collectedTimeText');
    collectedTimeText.insertAdjacentHTML('beforeend', `<p><b>You came onto the website at this time: <br> ${collectedTime}</b></p> <p>Wonder what else you agreed to...?</p>`);
    collectedTimeText.classList.add('fadeIn');

    collectedTimeText.addEventListener('animationend', () => {
      let introEnd = document.querySelector('.introduction');
      introEnd.classList.add('fadeout');
    }, { once: true });

  }, { once: true });
}

//getting formatted EST time
function getTime() {
  let timeOptions = {
    timeZone: 'America/New_York',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  };
  let formatter = new Intl.DateTimeFormat('en-US', timeOptions);
  return formatter.format(new Date());
}

//selecting a random joke from the array and adding it as a new document.cookie
function randomJokeCookie() {
  let randomIndex = Math.floor(Math.random() * jokes.length);
  let randomJoke = jokes[randomIndex];
  let cookieTime = new Date().getTime();
  let cookieName = `cookieJoke_${cookieTime}`;

  document.cookie = `${cookieName}=${randomJoke}; max-age=3600; path=/`;
  console.log('a joke cookie was added!');
}


//add a new joke cookie every 2min
setInterval(randomJokeCookie, 120000); // 120000ms = 2min

//for the scroll effects in the doc (this was from a source in references)
window.addEventListener('scroll', () => {
  document.body.style.setProperty('--scroll', window.scrollY / (document.body.offsetHeight - window.innerHeight));
}, false);


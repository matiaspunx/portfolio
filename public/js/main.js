//'use strict';
/* jshint esversion: 6 */

let draw_btn = document.querySelector('.mdl-layout__drawer');
let msjTextfield = document.querySelector('#msjTextfield');
let header = document.querySelector('.portfolio-header');
let si_btn = document.querySelector('.signin-btn');
let so_btn = document.querySelector('.signout-btn');
let en_btn = document.querySelector('.btn-enviar');
let save_msj = document.querySelector('.save-msj');
let worksListElement = document.getElementById('myWorks');
let prevScroll = 58; // header height
let userAvatar = document.querySelector('.user-avatar');
let userNameSpan = document.querySelector('.user-name');

// template para monstrar los trabajos cargados desde firebase
var WORK_TPL =
  '<div class="mdl-cell mdl-card mdl-shadow--4dp portfolio-card">' +
  '<div class="mdl-card__media pic"><img class="article-image" src="" alt=""></div>' +
  '<div class="mdl-card__title title"><h2 class="mdl-card__title-text"></h2></div>' +
  '<div class="mdl-card__supporting-text text"></div>' +
  '<div class="mdl-card__actions mdl-card--border url"><a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect mdl-button--accent" href="http://movistar.com.ar">Ver online</a></div>' +
  '</div>';

// body event para revisar el drawer
document.body.addEventListener("click", drawCLick);

function drawCLick() {
  if (draw_btn.classList.contains('is-visible')) {
    document.body.style.overflow = 'hidden';
  }else{
    document.body.style.overflow = 'auto';
  }
}

window.onscroll = function() {
  let currScroll = window.pageYOffset;
  if(currScroll > prevScroll) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

function signIn() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
}
function signOut() {
  firebase.auth().signOut();
}
function initFirebaseAuth() {
  firebase.auth().onAuthStateChanged(authStateObserver);
}
function getProfilePicUrl() {
  return firebase.auth().currentUser.photoURL || '/images/profile_placeholder.png';
}
function getUserName() {
  return firebase.auth().currentUser.displayName;
}
function getUserMail() {
  return firebase.auth().currentUser.email;
}
function isUserSignedIn() {
  return !!firebase.auth().currentUser;
}

// Cargar los trabajos
function loadWorks() {
  // Carga los ultimos 12 trabajos y escucha si hay nuevos.
  var callback = function (snap) {
    var data = snap.val();
    displayWorks(snap.key, data.title, data.text, data.workUrl, data.imageUrl);
  };
  firebase.database().ref('/works/').limitToLast(12).on('child_added', callback);
  firebase.database().ref('/works/').limitToLast(12).on('child_changed', callback);
}

function displayWorks(key, title, text, workUrl, imageUrl) {
  var div = document.getElementById(key);
  // Si no existe el trabajo creamos un div
  if (!div) {
    var container = document.createElement('div');
    container.innerHTML = WORK_TPL;
    div = container.firstChild;
    div.setAttribute('id', key);
    worksListElement.appendChild(div);
  }

  if (imageUrl) {
    div.querySelector('.pic img').setAttribute('src', imageUrl);
  }

  div.querySelector('.title h2').textContent = title;

  var textElement = div.querySelector('.text');
  if (text) {
    textElement.textContent = text;
    // Replace all line breaks by <br>.
    textElement.innerHTML = textElement.innerHTML.replace(/\n/g, '<br>');
  }

  if (workUrl) {
    div.querySelector('.url a').setAttribute('href', workUrl);
  }

  // Show the card fading-in and scroll to view the new message.
  setTimeout(function () {
    div.classList.add('visible');
  }, 1);
}

// Guarda el msj en la base de datos.
function saveMessage() {
  event.preventDefault();
  let msj = event.target.querySelector('.save-msj-text').value;
  let msj_form = event.target;
  let msj_ok = document.querySelector('.msj-ok');
  event.target.querySelector('.save-msj-text').value = '';
  // resetMaterialTextfield(msjTextfield);
  msj_form.style.display = 'none';
  document.querySelector('.the-user').textContent = getUserName();
  msj_ok.style.display = 'block';
  // Agrega un nuevo mensaje a la base de datos.
  return firebase.database().ref('/mensajes/').push({
    name: getUserName(),
    mail: getUserMail(),
    text: msj,
    profilePicUrl: getProfilePicUrl()
  }).catch(function (error) {
    console.error('Error al escribir el mensaje en la base de datos', error);
  });
}

function authStateObserver(user) {
  if (user) {
    let profilePicUrl = getProfilePicUrl();
    let userName = getUserName();
    userAvatar.setAttribute('src', profilePicUrl);
    userNameSpan.textContent = userName;
    si_btn.style.display = 'none';
    so_btn.style.display = 'block';
    en_btn.style.display = 'block';
  } else {
    userAvatar.setAttribute('src', '');
    userNameSpan.textContent = '';
    si_btn.style.display = 'block';
    so_btn.style.display = 'none';
    en_btn.style.display = 'none';
  }
}

function checkSetup() {
  if (!window.firebase || !firebase.app().options) {
    console.log('No importaste ni configuraste el SDK de Firebase.');
  }
}

checkSetup();

si_btn.addEventListener('click', signIn);
so_btn.addEventListener('click', signOut);
save_msj.addEventListener('submit', saveMessage);

initFirebaseAuth();
loadWorks();
const questions = [
  {question:"HTML нені білдіреді?",answers:["HyperText Markup Language","HighText Machine Language","HyperTool Multi Language","Home Tool Markup Language"],correct:0,explanation:"HTML — веб-беттің құрылымын құруға арналған белгілеу тілі."},
  {question:"CSS-тің негізгі қызметі қандай?",answers:["Деректер қорын басқару","Веб-бетті безендіру","Серверді іске қосу","Файлдарды архивтеу"],correct:1,explanation:"CSS веб-беттің түсін, өлшемін, орналасуын және сыртқы көрінісін реттейді."},
  {question:"JavaScript не үшін қолданылады?",answers:["Тек сурет салу үшін","Компьютерді өшіру үшін","Веб-бетке интерактивтілік қосу үшін","Мәтінді басып шығару үшін ғана"],correct:2,explanation:"JavaScript батырма, тест, мәзір сияқты элементтердің әрекетін басқарады."},
  {question:"URL дегеніміз не?",answers:["Компьютердің жады","Веб-ресурстың мекенжайы","Бағдарламалау тілі","Антивирус түрі"],correct:1,explanation:"URL — интернеттегі веб-беттің немесе басқа ресурстың мекенжайы."},
  {question:"Веб-сайтты ашуға арналған бағдарлама қалай аталады?",answers:["Браузер","Калькулятор","Архиватор","Драйвер"],correct:0,explanation:"Браузер веб-сайттарды ашуға және көруге мүмкіндік береді."}
];
const questionCounter=document.getElementById("question-counter");
const progressFill=document.getElementById("progress-fill");
const questionTitle=document.getElementById("question");
const answersContainer=document.getElementById("answers");
const feedback=document.getElementById("feedback");
const nextButton=document.getElementById("next-btn");
const quizArea=document.getElementById("quiz-area");
const resultArea=document.getElementById("result-area");
const scoreElement=document.getElementById("score");
const resultMessage=document.getElementById("result-message");
const restartButton=document.getElementById("restart-btn");
let currentQuestion=0,score=0,answered=false;
function showQuestion(){
  answered=false;
  const item=questions[currentQuestion];
  questionCounter.textContent=`${currentQuestion+1} / ${questions.length} сұрақ`;
  progressFill.style.width=`${((currentQuestion+1)/questions.length)*100}%`;
  questionTitle.textContent=item.question;
  answersContainer.innerHTML="";
  feedback.textContent="";
  feedback.className="feedback";
  nextButton.disabled=true;
  nextButton.innerHTML=currentQuestion===questions.length-1?'Нәтижені көру <span>→</span>':'Келесі сұрақ <span>→</span>';
  item.answers.forEach((answer,index)=>{
    const button=document.createElement("button");
    button.className="answer-btn";
    button.type="button";
    button.innerHTML=`<span class="answer-letter">${String.fromCharCode(65+index)}</span><span></span>`;
    button.querySelector("span:last-child").textContent=answer;
    button.addEventListener("click",()=>chooseAnswer(index));
    answersContainer.appendChild(button);
  });
}
function chooseAnswer(selectedIndex){
  if(answered)return;
  answered=true;
  const item=questions[currentQuestion];
  const buttons=[...answersContainer.querySelectorAll(".answer-btn")];
  buttons.forEach((button,index)=>{
    button.disabled=true;
    if(index===item.correct)button.classList.add("correct");
    if(index===selectedIndex&&index!==item.correct)button.classList.add("wrong");
  });
  if(selectedIndex===item.correct){
    score++;
    feedback.textContent=`Дұрыс! ${item.explanation}`;
    feedback.classList.add("good");
  }else{
    feedback.textContent=`Қате жауап. ${item.explanation}`;
    feedback.classList.add("bad");
  }
  nextButton.disabled=false;
}
function showResult(){
  quizArea.classList.add("hidden");
  resultArea.classList.remove("hidden");
  scoreElement.textContent=score;
  if(score===questions.length)resultMessage.textContent="Керемет! Барлық сұраққа дұрыс жауап бердің.";
  else if(score>=3)resultMessage.textContent="Жақсы нәтиже! Біліміңді тағы да жетілдіре түс.";
  else resultMessage.textContent="Жақсы бастама! Қайталап өтіп, біліміңді тексер.";
}
nextButton.addEventListener("click",()=>{
  if(!answered)return;
  if(currentQuestion<questions.length-1){currentQuestion++;showQuestion();}
  else showResult();
});
restartButton.addEventListener("click",()=>{
  currentQuestion=0;score=0;
  resultArea.classList.add("hidden");
  quizArea.classList.remove("hidden");
  showQuestion();
});
showQuestion();

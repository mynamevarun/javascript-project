window.addEventListener("load",init1);
function init1(){
    console.log('varun');
   document.getElementById("next1").addEventListener("click",function(){
        quizOperations.index++;
        console.log(quizOperations.index);
        quizOperations.buildQuiz(quizOperations.qu[quizOperations.index]);
   })
   document.getElementById("previous").addEventListener("click",function(){
        quizOperations.index--;
        console.log(quizOperations.index);
        quizOperations.buildQuiz(quizOperations.qu[quizOperations.index]);
   })
document.getElementById("submit").addEventListener("click",function(){
   console.log("submited");
})
}

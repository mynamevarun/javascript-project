// const quizOperations={
//  qu:[],
//  index:0,
//  fetchQuestion(){
//     let questions=firebase.database().ref("/questions");   
//     questions.once("value",function(snapshot){
//     let questions=snapshot.val();
//     //console.log(questions);
//        for(let question in questions){              
//              quizOperations.qu.push(questions[question])
//              //console.log(quizOperations.qu);            
//              // console.log(questions[question]);
//        }
//       //  console.log(quizOperations.qu); 
//        quizOperations.buildQuiz(quizOperations.qu[0]);
//     }).catch(err=>console.log("error is",err));
// },
//  buildQuiz(question){    
//     console.log(question); 
//     const output = [];   //for storimg output
//     const answers = []; //for our answer choice
//     //console.log(question.options)
//     let options=question.options;
//    //  console.log(options);
//     options.forEach((option,index)=>{    
//          // console.log(option);  
//          answers.push(
//            `<label>
//               <input type="radio" name="question" value="${index+1}">
//               ${index+1} :
//                ${(option)}
//            </label>`
//          );
//        });

//     // add this question and its answers to the output
//          output.push(
//             `<div class="slide">
//              <div class="question"> ${question.name} </div>
//              <div class="answers"> ${answers.join("")} </div>
//              </div>`
//          );
        
//    //  console.log(output.join(""));
//     //finally combine our output list into one string of HTML and put it on the page

//     document.getElementById("quiz").innerHTML= output.join("");
// //     //console.log(document.getElementById("next1"));
// //     document.getElementById("next1").addEventListener("click",function(){
// //       quizOperations.index++;
// //       console.log(quizOperations.index);
// //       quizOperations.buildQuiz(quizOperations.qu[quizOperations.index]);
// //  })
// //  document.getElementById("previous").addEventListener("click",function(){
// //       quizOperations.index--;
// //       console.log(quizOperations.index);
// //       quizOperations.buildQuiz(quizOperations.qu[quizOperations.index]);
// //  })
// // document.getElementById("submit").addEventListener("click",function(){
// //  console.log("submited");
// // })
//    }
// }




//ROUGH CODE

const quizOperations={
   qu:[],
   //index:0,
   currentQuestion:0,//used for current question pointer
   createButton(){
      // console.log("I AM YOU ",quizOperations.qu.length);
       for(let i=0;i<quizOperations.qu.length;i++){
         //  console.log("I AM BUTTON CREATER");
          var but=document.createElement("button");
          but.id="but"+i;
          but.style="border-radius:50%";
          but.className="btn btn-success jump-but";
          but.innerText=i+1;
          but.color="blue";          
          //console.log(but);
         //  console.log(but);
         //  but.addEventListener("click",function(){
         //     console.log("I AM LISTENER",but.id);
         //     quizOperations.showQuestion(parseInt(but.innerText-1));
         //  });
          document.getElementById("jump").appendChild(but);          
       }
   //     for(let i=0;i<quizOperations.qu.length;i++){
   //       console.log(document.getElementById("but"+i));
   //          document.getElementById("but"+i).addEventListener("click",function(){
   //         console.log("I AM ",but.innerText)
   //      quizOperations.showQuestion(parseInt(but.innerText-1));
   //   })
   //}
   },
   fetchQuestions(){
      let questions=firebase.database().ref("/questions");   
       questions.once("value",function(snapshot){
          let questions=snapshot.val();
          //console.log(questions);
             for(let question in questions){              
                   quizOperations.qu.push(questions[question])
                   //console.log(quizOperations.qu);            
                   // console.log(questions[question]);
             }
            //console.log("outside",quizOperations.qu);            
            quizOperations.createButton(); 
            quizOperations.buildQuiz();              
            document.getElementById('timer').innerHTML = "10:00";
            quizOperations.startTimer();
          }).catch(err=>console.log("error is",err)).catch(err=>console.log("errr",err));
          
      },
      buildQuiz(){    
            //  console.log(question); 
             const output = [];   //for storimg output
              //for our answer choice
             //console.log(question.options)
             
            //  console.log(options);
            this.qu.forEach((question,indexQ)=>{
               // console.log(indexQ);
               let options=question.options;
               const answers = [];
             options.forEach((option,indexO)=>{    
                  // console.log(option);  
                  answers.push(
                    `<label>
                       <input type="radio" name="question${indexQ}" value="${indexO+1}">
                       ${indexO+1} :
                        ${(option)}
                    </label>`
                  );
                });
               
             // add this question and its answers to the output
                  output.push(
                     `<div class="slide">
                      <div class="question">Q.${indexQ+1} ${question.name} </div>
                      <div class="answers"> ${answers.join("")} </div>
                      </div>`
                  );
               });
                 
            //  console.log(output.join(""));
             //finally combine our output list into one string of HTML and put it on the page
         
             document.getElementById("quiz").innerHTML= output.join("");             
             this.showQuestion(0); 
             this.initListen();
       },
       initListen(){
             //console.log(document.getElementById("next1"));
             document.getElementById("next1").addEventListener("click",this.showNext);
             document.getElementById("previous").addEventListener("click",this.showPrevious);
             document.getElementById("submit").addEventListener("click",this.showResult); 
             //document.getElementById("submit").addEventListener("click",function(){location.href="../../../result.html"});                           
             var but=document.getElementsByClassName("jump-but");
             //   console.log(but);
             for(i=0;i<quizOperations.qu.length;i++){
                     //  console.log(but[i]);
                     but[i].addEventListener("click",function(){
                        for(let j=0;j<this.id.split("").pop();j++){
                            quizOperations.isChecked(j);
                        }
                        if(quizOperations.currentQuestion>=this.id.split("").pop())
                           for(let j=quizOperations.currentQuestion;j>0;j--)
                           quizOperations.isChecked(j);
                     //console.log(this.id,this.innerText);
                     quizOperations.showQuestion(parseInt(this.innerText)-1);            
                 })
               }                    
       },     
       isChecked(n){
         var inp=document.getElementsByName("question"+n);
         var count=0;
         for(let i=0;i<inp.length;i++){
            console.log(inp[i].checked);
            if(!inp[i].checked){
                count++;
            }
         }
         if(count==4){
          document.getElementById("but"+n).style="background-color:grey;border-radius:50%";
         }
         else{
          document.getElementById("but"+n).style="background-color:green;border-radius:50%";
         }
       } ,
        showNext(){
           quizOperations.isChecked(quizOperations.currentQuestion);
        
             quizOperations.showQuestion(quizOperations.currentQuestion+1);
        },    
        showPrevious(){
         quizOperations.isChecked(quizOperations.currentQuestion);
       
         quizOperations.showQuestion(quizOperations.currentQuestion-1);
        },
        showResult(){
           console.log("I AM RESULT FUNCTION");
             var ansCont=document.getElementsByClassName("answers");
             let correct=0;
             let score=0;
            //  console.log(ansCont);
             let totalScore=0;
             quizOperations.qu.forEach(
                (question,indexQ)=>{
                        totalScore+=parseInt(question.score);
                       var uans=(ansCont[indexQ].querySelector('input[name=question'+indexQ+']:checked')||{}).value;                
                       if(uans==(question.rans.charCodeAt(0)-64)){
                           correct++;
                           score=score+parseInt(question.score);
                        }                        
                })
                //HERE IS MY RESULT
                console.log(totalScore);
                if(score<(totalScore/2)) {
                      document.getElementById("main").innerHTML=`USER : ${localStorage.userid}<br><b>CORRECT QUESSTIONS ARE: </b>${correct} OUT OF ${quizOperations.qu.length}<br><b>SCORE IS:</b>${score}<br><span style="color:red">YOU ARE FAIL</span>`;            
                      document.getElementById("main").style="margin:auto;padding:auto;color:white;font-size:3em;font-family:arial;"                                    
                }
                else{
                  document.getElementById("main").innerHTML=`USER : ${localStorage.userid}<br><b>CORRECT QUESSTIONS ARE: </b>${correct} OUT OF ${quizOperations.qu.length}<br><b>SCORE IS:</b>${score}<br><span style="color:green">YOU ARE PASS</span>`;            
                  document.getElementById("main").style="margin:auto;padding:auto;color:white;font-size:3em;font-family:arial;"                                                
                }
                document.getElementById('timer').innerText="00:00";       
        },
        showQuestion(n){
           var questionDisp=document.getElementsByClassName("slide");
         //   console.log(questionDisp,quizOperations.currentQuestion);
           questionDisp[this.currentQuestion].classList.remove("active-slide");
           questionDisp[n].classList.add("active-slide");
           quizOperations.currentQuestion=n;
           if(this.currentQuestion===0){
               document.getElementById("previous").style.display = 'none';
           }
           else{
               document.getElementById("previous").style.display = 'inline-block';
           }
           if(this.currentQuestion===questionDisp.length-1){
               document.getElementById("next1").style.display = 'none';
               document.getElementById("submit").style.display = 'inline-block';
           }
           else{
               document.getElementById("next1").style.display = 'inline-block';
               document.getElementById("submit").style.display = 'none';
           }                
        },
      //   setTimer(){      
      //    03 + ":" + 00;
      //  startTimer();
       
       startTimer() {
         //console.log("I AM TIMER");
         var presentTime = document.getElementById('timer').innerHTML;
         //console.log(presentTime);
         var timeArray = presentTime.split(/[:]+/); //this is for splliting the array from colon
         var m = parseInt(timeArray[0]);
         var s = parseInt(quizOperations.checkSecond((timeArray[1] - 1)));
         //console.log(m,s);
         if(s==59){m=m-1}
         if(m<0){
            // alert('timer completed');
            quizOperations.showResult();
         }
         
         document.getElementById('timer').innerHTML =
           m + ":" + s;
         setTimeout(quizOperations.startTimer, 1000);
       },       
       checkSecond(sec) {
         if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
         if (sec < 0) {sec = "59"};
         return sec;
       }               
}
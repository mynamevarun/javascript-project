window.addEventListener("load",init);
function init(){
   // isLogin();
   registerEvent();
}
function isLogin(){
    if(!(localStorage.userid && localStorage.userid.trim().length>0)){
        location.href="../../main.html";
    }
}
function registerEvent(){
    document.getElementById('start').addEventListener("click",start);   
}
async function start(){
    var promise=fetch("http://127.0.0.1:5500/rules.html");
   // console.log("hiiiiiiiiiiiii",promise);
    await promise.then(response=>response.text().then(data=>document.getElementById("main").innerHTML=data).catch(err=>console.log("error",err))).catch(err=>console.log("error is",err));
    // var scripts=document.getElementsByTagName("script");
    // console.log(scripts,scripts.length);
    // for(let i=0;i<scripts.length;i++){
    //     console.log("varun");
    //     eval(scripts[i].innerHTML);
    // }
    // var but=document.createElement("button");
    // but.innerText="NEXT";
    // but.id="next";
    // document.getElementById("button").appendChild(but);
    // but.addEventListener("click",quiz);

}
function quiz(){
    console.log(document.getElementById("next"));
    document.getElementById("next").style="display:none";
    var promise=fetch("http://127.0.0.1:5500/quiz.html");
    // var script = document.createElement('script');
    //  script.src = "scripts/student/quizcontroller.js";
    //  script.async = false;
    //  document.getElementById("main").appendChild(script); 
    promise.then(response=>response.text().then(
        data=>{document.getElementById("main").innerHTML=data;
       
}).catch(err=>console.log("error",err))).catch(err=>console.log("error is",err));
    quizOperations.fetchQuestions();       
}

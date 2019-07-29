// Button Click Attach
window.addEventListener('load',init);
var countDown;
const printCounter=()=>
    document.querySelector('#id').innerText = countDown.next().value;
   // document.querySelector('#id').innerHTML = "<b>"+countDown.next().value+"</b>";

function toggleRed(){
    var id = this.getAttribute('qid');
console.log("Toggle Red Call ",this, 'Id is ',id);

var tr = this.parentNode.parentNode;
tr.classList.toggle('alert-danger');
questionOperations.toggleMark(id);
updateCount();
//tr.className = 'alert-danger';
}

 function saveToServer(){
    // var lastAdded = questionOperations.questions[questionOperations.questions.length-1];
    // var id = lastAdded.id;
    questionOperations.questions.forEach((obj)=>{
        let id=obj.id;
        let promise = firebase.database().ref('/questions/'+id).set(obj);
        console.log("teriii");      
          promise.then(data=>{
             alert("Record Saved in DB");
        }).catch(err=>{
                 alert("Error During DB Add");
                 console.log("Error in FB ",err);
        })
      });
}

function init(){
    isLogin();
    fetchIdFromDb();
    countDown = autoGen();
  //  printCounter();
    updateCount();
    registerEvents();
    showHide();  
    //createSortIcon();
}
function fetchIdFromDb(){
    var promise=firebase.database().ref("/questions");
    promise.once("value",function(snapshot){
       var questions=snapshot.val();
       var id;
       for(let key in questions){
            id=key;
       }
    //    console.log(id);
    document.getElementById("id").innerText=id;
    }).catch(err=>console.log("error is",err));
}
function isLogin(){
    if(!(localStorage.userid && localStorage.userid.trim().length>0)){
        location.href="../../main.html";
    }
}
function printQuestions(questions){
    document.querySelector('#questions').innerHTML = '';
    questions.forEach(printQuestion);
    updateCount();
}

// function createSortIcon(className){
//     var th=document.querySelectorAll("th");
//     console.log(th);
//     th.forEach(a=>{
//         if(a.id=="option11"||a.id=="option12"||a.id=="option13"||a.id=="option14"||a.id=="rans1"||a.id=="operations1");
//        else
//         console.log(document.getElementById(a.id).appendChild(document.createElement("i").classList="fas fa-chevron-down hand mr-2"))});
// }

function deleteQuestion(){
    questionOperations.remove();
    printQuestions(questionOperations.questions);
}
function searchIt(){
    var val = document.querySelector('#searchValue').value;
    var key = document.querySelector('#searchby').value;
    if(key!='-1'){
            var subArr = questionOperations.search(key,val);
            printQuestions(subArr);
    }
}
function load(){
    if(localStorage){
        if(localStorage.questions){
            questionOperations.questions = JSON.parse(localStorage.questions);
            printQuestions(questionOperations.questions);
            updateCount();
        }
        else{
            alert("No Data Exist to Load");
        }
    }
    else{
        alert("Ur Browser is Outdated");
    }
}
function save(){
    if(localStorage){
       localStorage.questions=JSON.stringify(questionOperations.questions);
       alert("Record Saved");
    }
    else{
        alert("Ur Browser is Outdated");
    }
}
function fetchFromServer(){
    // single record
    //firebase.database().ref('/questions/100')
    // all 
    var questions= firebase.database().ref('/questions');
    questions.on('value',(snapshot)=>{
        var allQuestionsObj = snapshot.val();
        for(let key in allQuestionsObj){
            let questionObj = allQuestionsObj[key];
            questionOperations.add(questionObj);
        }
        printQuestions(questionOperations.questions);
        updateCount();
    })

}
function edit(){
    let tempId=document.getElementById("id").innerText;
    let id=this.getAttribute("qid");
    let questionObject=questionOperations.questions.find(obj=>obj.id==id);
    for(key in questionObject){
        // console.log(key)
        if(key=="id"){
            document.getElementById(key).innerText=questionObject[key];
            continue;
        }
        if(key=="options"){           
            for(let i=1;i<=questionObject[key].length;i++){
               // console.log(questionObject[key][i-1]);
                document.getElementById("option"+i).value=questionObject[key][i-1];                        
            }
            continue;
        }
        if(key=="markForDelete"){
            continue;
        }
        // console.log(key);
        document.getElementById(key).value=questionObject[key];
    }
}
function update(){
    let questionObject=new Question();
    for(let key in questionObject){
        if(key=="id"){
            questionObject[key]=document.getElementById(key).innerText;
            continue;
        }
        if(key=="options"){    
            let options=[];                
            for(let i=1;i<=4;i++){
               // console.log(questionObject[key][i-1]);
               options[i-1] =document.getElementById("option"+i).value;                    
            }
            questionObject[key]=options;
            continue;
        }
        if(key=="markForDelete"){
            questionObject[key]=false;
            continue;
        }
        // console.log(key);
        questionObject[key]=document.getElementById(key).value;
    }
    questionOperations.updateArr(id,questionObject);
    printQuestions(questionOperations.questions);
    document.getElementById("id").innerText=parseInt(questionOperations.questions[questionOperations.questions.length-1].id)+1;
    clear();9
}
function clear(){
    let elements=document.querySelectorAll('.form-control');
    console.log(elements);
    for(let i=0;i<elements.length;i++){
         elements[i].value="";
    }
}
function sort(){
    console.log(this.className)
    var yes=this.className.split("").includes("u");
    console.log(yes);
   questionOperations.sortArr(this.parentNode.id,yes);
   printQuestions(questionOperations.questions)
}
function showHide(){
    console.log("I AM SHOWHIDE")
   document.getElementById("sbox-search").classList.toggle("searchbox");
}
function registerEvents(){ 
    var classname=document.getElementsByName("sort");
    for (var i = 0; i < classname.length; i++) {
        classname[i].addEventListener('click', sort, false);
    }    
   // document.getElementsByClassName("up").addEventListener("click",sort) 
    document.getElementById("update").addEventListener("click",update);
    document.querySelector('#fetchserver').addEventListener('click',fetchFromServer);
    document.querySelector('#savetoserver').addEventListener('click',saveToServer);
    document.querySelector('#load').addEventListener('click',load);
    document.querySelector('#save').addEventListener('click',save);
    document.querySelector('#searchValue').addEventListener('change',searchIt);
    document.getElementById('search').addEventListener('click',showHide);
    document.getElementById('delete').addEventListener('click',deleteQuestion);
    document.getElementById('add').addEventListener('click',addQuestion);
    document.getElementById('clear').addEventListener('click',clear);
}
function createIcon(className,fn,id){
    var icon = document.createElement("i");
    icon.className=className;    
    icon.setAttribute("qid",id);
    icon.addEventListener("click",fn);
    return icon;
    // <i class="fas fa-trash"></i>
}
function updateCount(){
     document.querySelector('#total').innerText = questionOperations.length();
     document.querySelector('#mark').innerText = questionOperations.countMark();
     document.querySelector('#unmark').innerText = questionOperations.questions.length-questionOperations.countMark();
}
function printQuestion(questionObject){
    var tbody = document.querySelector('#questions');
    var tr = tbody.insertRow();
    var index = 0;
    for(let key in questionObject){
        if(key=='markForDelete'){
            continue;
        }
        if(key =='options'){
            let options = questionObject[key];
            for(let option of options){
                tr.insertCell(index).innerText = option;
                index++;
            }
            continue;
        }
        tr.insertCell(index).innerText =  questionObject[key];
        index++;
    }  // loop ends
    var td = tr.insertCell(index);
    td.appendChild(createIcon('fas fa-trash mr-2 hand',toggleRed,questionObject.id));  
    td.appendChild(createIcon('fas fa-edit hand',edit,questionObject.id));
}
function addQuestion(){
    var questionObject = new Question();
    for(let key in questionObject){
        if(key=='markForDelete'){
            continue;
        }
        if(key=='id'){
            questionObject[key]= document.getElementById(key).innerText;
            continue;
        }
        if(key=='options'){
            let options = [];
            for(let i = 1; i<=4;i++){
                options.push(document.getElementById('option'+i).value);
            }
            questionObject[key] = options;
            continue;
        }
        questionObject[key]= document.getElementById(key).value;
    }
    questionOperations.add(questionObject);
    printQuestion(questionObject);
    updateCount();
    printCounter();
    // console.log("Add Question Call");
    // var fieldsname = ['id','name']; //keys
    // var fieldsvalue = []; //values
    // var index = 0;
    // // Loop
    // fieldvalue[index]= document.getElementById(fieldsname[index]).value;
   // var id = document.getElementById('id').value;
    //var name = document.getElementById('name').value;
}
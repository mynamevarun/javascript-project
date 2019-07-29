window.addEventListener("load",init);
function init(){
    user();
}
function* autoGen(){
    var counter = fetchIdFromDb();
    while(true){
        yield counter;
        counter++;
    }
}

function user(){
  // console.log("i am user",localStorage.userid,document.getElementsByClassName("h2")[0]);
     document.getElementById("h1").innerText=`WELCOME ${localStorage.userid}`;
}
function fetchIdFromDb(){
    var promise=firebase.database().ref("/questions");
    promise.once("value",function(snapshot){
       var questions=snapshot.val();
       var id;
       for(let key in questions){
            id=key;
       }
    return id;
    }).catch(err=>console.log("error is",err));
}
window.addEventListener("load",init);
function init(){
    registerEvent();
    showHide();
}
function registerEvent(){
    document.getElementById("login").addEventListener("click",function(){        
        document.getElementById("upsign").style="display:none";
        showHide();
    });
    document.getElementById("toggleReg").addEventListener("click",function(){
        showHide();
        document.getElementById("upsign").style="display:block";
    });
    document.getElementById("dologin").addEventListener("click",doLogin);
    document.getElementById("register").addEventListener("click",register);
}
function showHide(){
    document.getElementById("sign").classList.toggle("hide");
}
async function doLogin(){
    var userid=document.getElementById("userid").value;  // Value come from the Text Box
    var pwd=document.getElementById("password").value;
    var log=document.getElementsByName("login");
    let log_type="";
    for(i=0;i<log.length;i++){
        if(log[i].checked==true)
           log_type=log[i].value;
    }
    if(log_type=="student"){
           var students=firebase.database().ref("/student");
           students.once("value",snapshot=>{
           var students=snapshot.val();
           for(let student in students){
                var obj=students[student];
                if(obj.userid==userid && obj.password==pwd && log_type=="student"){
                    localStorage="";
                    localStorage.userid=userid;
                    location.href="student.html";
                }
                else{
                  message = "Invalid Userid or Password";
                  document.getElementById('error').innerText=message;
                  reset();
                }
            }
           })
    }
    else{
       var admin=firebase.database().ref("/admin");
       await admin.once("value",snapshot=>{
       var ad=snapshot.val();     
       for(let key in ad){
             var obj=ad[key];        
             if(obj.userid==userid && obj.password==pwd && log_type=="admin"){
                localStorage="";
                localStorage.userid=userid;
                location.href="crud.html";
             }    
             else {
                  message = "Invalid Userid or Password";
                  document.getElementById('error').innerText=message;
                  reset();
             }
        }   
       })
    }
}

function  reset(){
    document.getElementById("password").value="";
    document.getElementById("userid").value="";
}

async function register(){    
    var user=document.getElementById("ruser").value;
    var email=document.getElementById("remail").value;
    var pass=document.getElementById("rpass").value;
    var cpass=document.getElementById("rcpass").value;
    if(user=="" || email=="" || pass=="" ||cpass==""){
              alert("you dont have provide sufficient details");
    }
    else{
        let yes=false;
        let students=await firebase.database().ref("/student");
        // console.log(students);
        // console.log("hiiii");
        await students.once("value",snapshot=>
        {
            var students=snapshot.val();
            for(key in students){         
               if(key==user){                
                  yes=true;
                }
           }
        })       
        // console.log(yes)
        if(!yes){
            if(pass===cpass){
               var stu=new Student(user,pass,email);
               var promise= firebase.database().ref(/student/+user).set(stu);
               await promise.then(data=>alert("Registration Done.Do login to use website ")).catch(err=>console.log("error is",err));
               showHide();
               document.getElementById("upsign").style="display:none";            
            }    
            else 
                alert("password does not matched");  
        } 
        else{
                alert("user name is already taken");
        }
    }
}
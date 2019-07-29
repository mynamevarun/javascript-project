const questionOperations = {
    questions:[],
    add(questionObject){      
        this.questions.push(questionObject);        
    },
    countMark(){
        return this.questions.filter(question=>question.markForDelete).length;
    },
    toggleMark(id){
        var questionObject = this.questions.find(question=>question.id==id);
        questionObject.markForDelete = !questionObject.markForDelete;
    },
    remove(){
       this.questions =  this.questions.filter(question=>!question.markForDelete);
    },
    updateArr(id,questionObject){
       this.questions[this.questions.findIndex(obj=>obj.id==id)]=questionObject;
    },
    search(key,value){        
        if(!value){
            return this.questions;
        }
       return  this.questions.filter(question=>question[key]==value);
    },
    length(){
        return this.questions.length;
         
    },
    sortArr(key,yes){
       if(yes)
       this.questions.sort((a,b)=>{ return (a[key.substring(0,key.length-1)].toString().localeCompare(b[key.substring(0,key.length-1)].toString()))});            
       else
       this.questions.sort((a,b)=>{ return (b[key.substring(0,key.length-1)].toString().localeCompare(a[key.substring(0,key.length-1)].toString()))});            
      
    }
}
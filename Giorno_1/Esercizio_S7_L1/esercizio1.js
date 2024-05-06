
class User {
    constructor  (_firstname, _lastname, _age, _location){
    this.firstname = _firstname;
    this.lastname = _lastname;
    this.age = _age;
    this.location = _location;
    }
    checkAge(other) {
        if(this.age<other.age){
            return `${this.firstname} è più giovane di ${other.firstname}`
        }
        else{
           return `${this.firstname} è più vecchio di ${other.firstname}`
        }
    }
    
}

const user1 = new User("Andrea", "Ciraldo", "24", "Bronte");
const user2 = new User("Ilario", "Alicante", "36", "Livorno");

console.log(user1.checkAge(user2))
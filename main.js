// initializing the elements

var errorValue = document.querySelector('.error');
var tip_per_person = document.querySelector('.tip_per_person');
var total_per_person = document.querySelector('.total_per_person');
var resetBtn = document.querySelector('.reset');
var validInput = true;

//validate the the inputs esppecially the number of people input field
function validateInput(input_value){

    if (isNaN(input_value) || input_value < 1){
        errorValue.innerHTML = "wrong input or empty field";
        errorValue.style.display = "block";
        validInput = false;
        return validInput;
    }
    else {
        errorValue.innerHTML ="";
        validInput = true;
        return validInput;
    }
}

//add event listiners to tip buttons
var num_of_tipBtns = document.querySelectorAll(".tipBtn").length;

for(var x = 0; x < num_of_tipBtns; x++){
    document.querySelectorAll(".tipBtn")[x].addEventListener("click", function(){
        //get the value of dollars from the input field
        var price = document.querySelector("#amount").value;

        // get the value of number of people from the input field
        var num_people = document.querySelector("#num_people").value;
        
        //getting the value or label on the button
        var buttonValue = this.innerHTML;

        //checking for correct input before doing calculations
        if(validateInput(num_people)){
            // calculating tip amount person
            tip_per_person.innerHTML = '$' + tipPerPerson(price, buttonValue, num_people).toFixed(2);

            // calculating the total amount to be paid 
            total_per_person.innerHTML = '$' + totalPaidPerPerson(price, tipPerPerson(price, buttonValue, num_people), num_people).toFixed(2);

            resetBtn.classList.add('active');
            checkButton();
            this.classList.add('active');
        }

        }
    );
}

// custom input for calculation
document.querySelector('#custom').addEventListener("change",function(){
    //get the value of dollars from the input field
    var price = document.querySelector("#amount").value;

    // get the value of number of people from the input field
    var num_people = document.querySelector("#num_people").value;

    console.log(this.value)
    // calculating tip amount person
    tip_per_person.innerText = tipPerPerson(price,this.value, num_people).toFixed(2);

    // calculating the total amount to be paid 
    total_per_person.innerText = totalPaidPerPerson(price, tipPerPerson(price, this.value, num_people), num_people).toFixed(2);

    resetBtn.classList.add('active');
    checkButton();

} );

// 


//  calculator logic
function tipPerPerson(cost, percentage, numOfPeople){

    // calculating tip amount person
    var tip_amount = cost * (getButtonValue(percentage) / 100);
    var tipAmount_per_person = tip_amount / numOfPeople;
    
    return  tipAmount_per_person;
}

function totalPaidPerPerson(cost, tipAmount, numOfPeople){
    
    // calculating the total amount to be paid person
    var totalAmount = cost / numOfPeople;
    var totalAmount_person = totalAmount + tipAmount;
    
    return totalAmount_person;
}

//geting the percentage value from the button
function  getButtonValue(value){
    if(value.length == 2 && value.includes('%')){
        var getValue = value.slice(0,1);
        return getValue;
    }
    else if(value.length == 3){
        var getValue = value.slice(0, 2);
        return getValue;
    }
    else{
        return value;
    }
}

// checkiing to see if a button contains class called active

function checkButton(){
    
    for(var x = 0; x < num_of_tipBtns; x++){
        currentBtn = document.querySelectorAll('.tipBtn')[x];
        if (currentBtn.classList.contains('active') == true){
            currentBtn.classList.remove('active');
    }
 }   
}

// when reset button is clicked 

resetBtn.addEventListener('click', function (){
    var value = '$0.00';
    document.querySelector("#amount").value = "";
    document.querySelector("#num_people").value = "";
    document.querySelector('#custom').value ="";

    tip_per_person.innerHTML = value;
    total_per_person.innerHTML = value;
       
    this.classList.remove('active');
    checkButton();

});

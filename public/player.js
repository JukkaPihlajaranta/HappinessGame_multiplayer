//Const objects
const infoboxObj = document.getElementById('infoboxBase');
const tempInfo = document.getElementById('tempInfo'); //temp infobox
let infoboxWidth = infoboxObj.getBoundingClientRect().width;

const barWidth = 130; //progressbar width


//BARS
const happinessBar = document.getElementById('happiness_bar');
const energyBar = document.getElementById('energy_bar');
const intoxicationBar = document.getElementById('intoxication_bar');
const timeProgressBar = document.getElementById('monthly_time_bar');
const relationshipBar = document.getElementById('relationship_bar');
const educationBar = document.getElementById('education_bar');
const jobBar = document.getElementById('job_bar');

//IMAGES
const icon_house = document.getElementById('icon_house');
const icon_houselux = document.getElementById('icon_houselux');
const icon_pet = document.getElementById('icon_pet');
const icon_jobapplication = document.getElementById('icon_jobapplication');
const icon_postpackage = document.getElementById('icon_postpackage');
const icon_petfood1 = document.getElementById('icon_petfood1');
const icon_petfood2 = document.getElementById('icon_petfood2');
const icon_exercise = document.getElementById('icon_exercise');
const icon_yoga = document.getElementById('icon_yoga');
const icon_rent = document.getElementById('icon_rent');
const icon_beauty = document.getElementById('icon_beauty');

//OTHER SCOREBOARD TEXTS
const happinessText = document.getElementById('happiness_text');
const monthlyTimeText = document.getElementById('monhlytime_text');
const energyText = document.getElementById('energy_text');
const intoxicationText = document.getElementById('intoxication_text');
const salaryText = document.getElementById('salaryText'); //scoreboard salary text
const moneyText = document.getElementById('moneyText'); //scoreboard money text
const relationshipObj = document.getElementById('relationship_obj'); //scoreboard relationshipstatus text
const jobObj = document.getElementById('jobText');  //scoreboard job text
const educationText = document.getElementById('education_obj');
const weekText = document.getElementById('week_text');

//Destination button row
const moveButtons = document.querySelector('.moveButtons');


//Opponent
const opponent_time_text = document.getElementById('opponent_time_text');
const opponent_time_bar = document.getElementById('opponent_time_bar');
const opponent_happiness_text = document.getElementById('opponent_happiness_text');
const opponent_happiness_bar = document.getElementById('opponent_happiness_bar');
const opponent_moneyText = document.getElementById('opponent_moneyText');
const opponent_events = document.getElementById('opponent_events');

//add back button to "browser"
//put tinder and relationship ready -- maybe with functino

//pet things
//add item show page to home
//change the better home background to something else
//bar hookup thing better

//Player attributes
let currentPlayerAttributes = {
    happinessTotal: 0,
    happinessPoints: 15,
    moneyPoints: 200,
    energyLevel: 50,
    intoxicationLevel: 0,
    
    petID: 0,
    // hasPet: false,
    petFoodAmount: 0,
    petWeeklyDue: false,

    homeID: 0,
    rentToDue: true,
    randomForRenting: 2,

    educationId: 0,
    educationProgress: 0,
    educationEnroll: false,

    currentYogaEnhancer: 0,
    exerciseLvl: 0,

    beautyFactor: 0,

    relationshipID: 0,
    relationshipStrenght: 0,
    tinderPossibilites: 0,
    newlyMet: false,

    currentWorkId: 0,
    playerWorkLevel: 0,
    jobPendingTime: 0,
    workExperience: 0,
    workStress: 0,

    itemInPostAnnouncement: 0,
    jobIdPending: null,

    currentItems: [],              //purchased items
    postPackageInPost: false,
    showPostMessage: false,

    //different happinesses
    forestHappiness: 2,
    internetHappiness: 1,

}

const workExperienceRequired = 10;
const weeklytimeToCompare = 168;
const studyingTimeToConsume = 30;
const yogaEnhance = 20;

let weeklyTime = 168;
let weekNumber = 1;
let randomizeNewOnlineContent = true;


//Items
let randomizedOnlineItems = [];         //randomized items in Online shop
let postPackagePending = 0;


//Jobs
let showJobs = true; //show jobs if applied or not

let randomizedOnlineJobs = [];

currentPlayerAttributes.tinderPossibilites = 5+Math.floor(Math.random()*34);


//OBJECTS LISTS
const relationships = [
    {
        relationshipStatus: "Single",
        happinessPoints: 0},

    {
        relationshipStatus: "Complicated",
        happinessPoints: -10},
    {
        relationshipStatus: "Just met",
        happinessPoints: 13},
    {
        relationshipStatus: "Dating",
        happinessPoints: 21},
    {
        relationshipStatus: "Relationship",
        happinessPoints: 32},
];

const pets = [
    {
        petAcquireCost: 0,
        petFoodCost: 0,
        petPenalty: 0,
        weeklyPetTime: 0,
        happinessPoints: 0},
    {
        petAcquireCost: 599,
        petFoodCost: 109,
        petPenalty: 250,
        weeklyPetTime: 12,
        happinessPoints: 18}
    
];

const education = [{
    degree: "Basic",
    cost: 0,
    happinessPoints: 0},

{
    degree: "College",
    cost: 250,
    happinessPoints: 6},

{
    degree: "Bachelor",
    cost: 430,
    happinessPoints: 14},

{
    degree: "Master",
    cost: 590,
    happinessPoints: 22},

];

const rentHomes = [{
        rent: 182,
        homeName: "Lo-cost appartment",
        deposit: 120,
        happinessPoints: 0},
    {
        rent: 449,
        homeName: "Luxurious home",
        deposit: 320,
        happinessPoints: 12}
];

const jobs = [

    //WORK LEVEL 0
    {
        id: 0,
        worklevel: 0,
        job: "Unemployed",
        energyConsumption: 0,
        educationReq: 0,
        salary: 0,
        description: "You can do better than this.",
        happinessPoinst: 0},

    {
        id: 1,
        worklevel: 0,
        job: "Fast food cook",
        energyConsumption: 35,
        educationReq: 0,
        salary: 38,
        description: "You will prepare fast food meals.",
        happinessPoinst: 5},
    {
        id: 2,
        worklevel: 0,
        job: "Cleaner",
        energyConsumption: 32,
        educationReq: 0,
        salary: 34,
        description: "You will clean what you're told.",
        happinessPoinst: 5},

    {
        id: 3,
        worklevel: 0,
        job: "Const. worker",
        energyConsumption: 48,
        educationReq: 0,
        salary: 48,
        description: "Hard work, somewhat good pay.",
        happinessPoinst: 5},

    {
        id: 10,
        worklevel: 0,
        job: "Garbage driver",
        energyConsumption: 40,
        educationReq: 0,
        salary: 43,
        description: "Pla pla pla",
        happinessPoinst: 5},

    {
        id: 11,
        worklevel: 0,
        job: "Postman",
        energyConsumption: 32,
        educationReq: 0,
        salary: 35,
        description: "Pla pla pla",
        happinessPoinst: 5},

    {
        id: 12,
        worklevel: 0,
        job: "Factory worker",
        energyConsumption: 44,
        educationReq: 0,
        salary: 46,
        description: "Pla pla pla",
        happinessPoinst: 5},

    {
        id: 13,
        worklevel: 0,
        job: "Street fundraising",
        energyConsumption: 10,
        educationReq: 0,
        salary: 17,
        description: "Pla pla pla",
        happinessPoinst: 10},

    {
        id: 14,
        worklevel: 0,
        job: "Birthday clown",
        energyConsumption: 12,
        educationReq: 0,
        salary: 19,
        description: "Pla pla pla",
        happinessPoinst: 11},


    //WORK LEVEL 1 -----------------------------------------------------------------------------------------------
    {
        id: 4,
        worklevel: 1,
        job: "Line manager",
        energyConsumption: 60,
        educationReq: 1,
        salary: 72,
        description: "Hard work, somewhat good pay.",
        happinessPoinst: 8},
    {
        id: 5,
        worklevel: 1,
        job: "Receptionist",
        energyConsumption: 40,
        educationReq: 1,
        salary: 48,
        description: "You will work at the hotel reception.",
        happinessPoinst: 12},

    {
        id: 6,
        worklevel: 0,
        job: "Tailor",
        energyConsumption: 43,
        educationReq: 1,
        salary: 52,
        description: "Your hands are your best tool.",
        happinessPoinst: 11},

    {
        id: 15,
        worklevel: 0,
        job: "Personal trainer",
        energyConsumption: 40,
        educationReq: 1,
        salary: 48,
        description: "Your hands are your best tool.",
        happinessPoinst: 11},

    {
        id: 16,
        worklevel: 0,
        job: "Seller",
        energyConsumption: 49,
        educationReq: 1,
        salary: 59,
        description: "Sell! Sell! Sell! Sell! Sell! Seeeell! ",
        happinessPoinst: 7},
    

    //WORK LEVEL 2 -----------------------------------------------------------------------------------------------
    {
        id: 7,
        worklevel: 2,
        job: "Sales manager",
        energyConsumption: 62,
        educationReq: 2,
        salary: 93,
        description: "You job is to sell as much as possible.",
        happinessPoinst: 9},

    {
        id: 8,
        worklevel: 2,
        job: "Real estate agent",
        energyConsumption: 71,
        educationReq: 2,
        salary: 107,
        description: "You're the one who gives home to people.",
        happinessPoinst: 7},

    {
        id: 9,
        worklevel: 1,
        job: "Content creator",
        energyConsumption: 52,
        educationReq: 2,
        salary: 78,
        description: "You create digital content you desire the most.",
        happinessPoinst: 15},

    //WORK LEVEL 3 -----------------------------------------------------------------------------------------------

    {
        id: 19,
        worklevel: 3,
        job: "Factory manager",
        energyConsumption: 67,
        educationReq: 2,
        salary: 134,
        description: "?",
        happinessPoinst: 10},

    {
        id: 20,
        worklevel: 3,
        job: "Coder",
        energyConsumption: 57,
        educationReq: 2,
        salary: 114,
        description: "?",
        happinessPoinst: 10},

    {
        id: 21,
        worklevel: 3,
        job: "Pharmacist",
        energyConsumption: 60,
        educationReq: 2,
        salary: 120,
        description: "?",
        happinessPoinst: 10},

    //WORK LEVEL 4 -----------------------------------------------------------------------------------------------

    {
        id: 22,
        worklevel: 4,
        job: "Lawyer",
        energyConsumption: 69,
        educationReq: 3,
        salary: 207,
        description: "?",
        happinessPoinst: 8},

    {
        id: 23,
        worklevel: 4,
        job: "Lawyer",
        energyConsumption: 64,
        educationReq: 3,
        salary: 192,
        description: "?",
        happinessPoinst: 8},

    {
        id: 24,
        worklevel: 4,
        job: "Doctor",
        energyConsumption: 67,
        educationReq: 3,
        salary: 201,
        description: "?",
        happinessPoinst: 12},

];

const onlineItems = [
    {
        itemId: 1,
        item: "Coffee mug",
        img: "./img/items/Item_CoffeeMugSprite.png",
        cost: 5,
        description: "Convenient coffee mug. Your coffee will taste better.",
        itemHappiness: 1},
    {
        itemId: 2,
        item: "Magnifying glass",
        img: "./img/items/Item_MagnifyingGlassSprite.png",
        cost: 16,
        description: "Your eyes will get blurry as you're growning older.",
        itemHappiness: 2},
    {
        itemId: 3,
        item: "Oil can",
        img: "./img/items/Item_OilCanSprite.png",
        cost: 35,
        description: "Some lubrication to the bearings and joints.",
        itemHappiness: 3},
    {
        itemId: 4,
        item: "Slingshot",
        img: "./img/items/Item_SlingShotSprite.png",
        cost: 20,
        description: "Do not aim to a neightbour's window!",
        itemHappiness: 3},
    {
        itemId: 5,
        item: "Leaf blower",
        img: "./img/items/Item_LeafBlowerSprite.png",
        cost: 120,
        description: "Take a control over leaves on your yard.",
        itemHappiness: 4},
    {
        itemId: 6,
        item: "Table fan",
        img: "./img/items/Item_TableFanSprite.png",
        cost: 39,
        description: "When it's hot, you'll need this.",
        itemHappiness: 3},
    {
        itemId: 7,
        item: "Excercise bike",
        img: "./img/items/Item_ExcerciseBikeSprite.png",
        cost: 190,
        description: "Get yourself to a good shape!",
        itemHappiness: 8},
    {
        itemId: 8,
        item: "Credit card",
        img: "./img/items/Item_CreditCardSprite.png",
        cost: 10,
        description: "Unlimited happiness. Maybe we counterfeited or maybe not.",
        itemHappiness: -3},
    {
        itemId: 9,
        item: "CPU",
        img: "./img/items/Item_ChipSprite.png",
        cost: 200,
        description: "Enhances the speed of your PC.",
        itemHappiness: 3},
    {
        itemId: 10,
        item: "Car battery",
        img: "./img/items/Item_CarBatterySprite.png",
        cost: 70,
        description: "Car battery full of energy.",
        itemHappiness: 3},
    {
        itemId: 11,
        item: "UAZ-3303",
        img: "./img/items/Item_UAZSprite.png",
        cost: 1170,
        description: "With this UAZ you can drive basically anywhere.",
        itemHappiness: 10},
    {
        itemId: 12,
        item: "Pick axe",
        img: "./img/items/Item_PickAxeSprite.png",
        cost: 97,
        description: "This helps you to find some gold or just put it on your wall..",
        itemHappiness: 3},
    {
        itemId: 13,
        item: "Chest",
        img: "./img/items/Item_ChestSprite.png",
        cost: 177,
        description: "Anchient chest. Very nice for the furnishing your home.",
        itemHappiness: 5},
    {
        itemId: 14,
        item: "Pieces of emerald",
        img: "./img/items/Item_EmeraldSprite.png",
        cost: 499,
        description: "Some nice jewelry.",
        itemHappiness: 3},
    {
        itemId: 15,
        item: "Cable",
        img: "./img/items/Item_CableSprite.png",
        cost: 20,
        description: "A cable to connect two devices to each other. No further information.",
        itemHappiness: 1},
    {
        itemId: 16,
        item: "Shovel",
        img: "./img/items/Item_ShovelSprite.png",
        cost: 16,
        description: "A shovel for your need.",
        itemHappiness: 2},
    {
        itemId: 17,
        item: "VCR",
        img: "./img/items/Item_VCRSprite.png",
        cost: 35,
        description: "A little bit older technology. Fully functional, if you don't use it",
        itemHappiness: 1},
    {
        itemId: 18,
        item: "VHS",
        img: "./img/items/Item_VHSSprite.png",
        cost: 55,
        description: "You'll never know, what you find on this tape. Excelusive material!",
        itemHappiness: 3},
    {
        itemId: 19,
        item: "Pizza boxes",
        img: "./img/items/Item_PizzaBoxes.png",
        cost: 3,
        description: "These are empty.",
        itemHappiness: 0},
        
];



function SetInfoBoxPosition(){
    
    infoboxObj.style.transform = `translate3d(${0}px, ${-containerRects.height}px, 0)`;
    infoboxObj.style.height =`${containerRects.height}x`;
    
    
    tempInfo.style.transform = `translate3d(${3}px, ${-containerRects.height - document.querySelector('.prefs-wrapper').getBoundingClientRect().height}px, 0)`;
    
    $(tempInfo).fadeOut(0);
    ReduceTime_Check(0); //updates all the things
    infoboxWidth = infoboxObj.getBoundingClientRect().width;
    
    ManageMoveButtons('off');
};



//ATTRIBUTE FUNCTIONS --------------------------------------------------------------------------------------
function UpdateBarAndTexts(){
    TotalHappinessCalculation();
    
    happinessText.innerHTML = 'Happiness: '+ currentPlayerAttributes.happinessTotal + "%";
    
    anime({
        targets: happinessBar,
        width: currentPlayerAttributes.happinessTotal*(barWidth/100),
        easing: 'linear',
        duration: 500

    });


    energyText.innerHTML = 'Energy: '+ currentPlayerAttributes.energyLevel + "%";
    // energyBar.style.width = currentPlayerAttributes.energyLevel + "%";
    
    //Energybar anim
    anime({
        targets: energyBar,
        width: currentPlayerAttributes.energyLevel*(barWidth/100),
        easing: 'linear',
        duration: 500

    });

    intoxicationText.innerHTML = 'Intoxication: '+ currentPlayerAttributes.intoxicationLevel*20 + "%";
    // intoxicationBar.style.width = currentPlayerAttributes.intoxicationLevel*20 + "%";

    anime({
        targets: intoxicationBar,
        width: (currentPlayerAttributes.intoxicationLevel *20)*(barWidth/100),
        easing: 'linear',
        duration: 500

    });

    jobObj.innerHTML = jobs[currentPlayerAttributes.currentWorkId].job;
    
    anime({
        targets: jobBar,
        width: (currentPlayerAttributes.workExperience *10)*(barWidth/100),
        easing: 'linear',
        duration: 500

    });


    relationshipObj.innerHTML = relationships[currentPlayerAttributes.relationshipID].relationshipStatus;

    anime({
        targets: relationshipBar,
        width: (currentPlayerAttributes.relationshipStrenght *10)*(barWidth/100),
        easing: 'linear',
        duration: 500

    });

    educationText.innerHTML = education[currentPlayerAttributes.educationId].degree;

    anime({
        targets: educationBar,
        width: (currentPlayerAttributes.educationProgress *20)*(barWidth/100),
        easing: 'linear',
        duration: 500

    });

    //Checking relationship status
    if (currentPlayerAttributes.relationshipID != 0){


    }

    
    salaryText.innerHTML =  jobs[currentPlayerAttributes.currentWorkId].salary + "€/day";
    currentPlayerAttributes.moneyPoints > 0 ? moneyText.className = "UI_text scoreboard green" : moneyText.className = "UI_text scoreboard red";
    moneyText.innerHTML = currentPlayerAttributes.moneyPoints + '€';
    



    if (postPackagePending != 0 && weeklyTime <= currentPlayerAttributes.itemInPostAnnouncement  && currentPlayerAttributes.showPostMessage){
        ShowTempMessage('Package in post!', 'package');
        OpponentEvents("has a package in the post.");
        currentPlayerAttributes.postPackageInPost = true;
        currentPlayerAttributes.showPostMessage = false;
    }



    ManageScoreBoard_Images();
    OpponentUpdates(weeklyTime, currentPlayerAttributes.happinessTotal, currentPlayerAttributes.moneyPoints);
}

function ShowTempMessage(message, image){

    // $(tempInfo).slideDown(500).delay(5000).slideUp(500);
    $(tempInfo).fadeIn(500).delay(2500).fadeOut(500);
    switch (image){
        case 'sms':
            tempInfo.innerHTML = `<div class="twoColumns20-80">
                                    <div class="basicCell"><img src="./img/icons/SMS_Sprite.png" height="40px"></div> 
                                    <div class="optiontext green">${message}</div>
                                </div>`;        
            break;

        case 'rejection':
            tempInfo.innerHTML = `<div class="twoColumns20-80">
                                    <div class="basicCell"><img src="./img/icons/Sprite_RejectionLetter.png" height="40px"></div> 
                                    <div class="optiontext orange">${message}</div>
                                </div>`;        
            break;

        case 'package':
            tempInfo.innerHTML = `<div class="twoColumns20-80">
                                    <div class="basicCell"><img src="./img/icons/Icon_Letter.png" height="40px"> </div>
                                    <div class="optiontext green">${message}</div>
                                </div>`;        
            break;

        case 'relationship':
            tempInfo.innerHTML = `<div class="twoColumns20-80">
                                    <div class="basicCell"><img src="./img/icons/Icon_RelationshipSprite.png" height="40px"> </div>
                                    <div class="optiontext green">${message}</div>
                                </div>`;        
            break;
    }
    
    
}

function WorkChecker(){

    //When jobs is pending
    if (currentPlayerAttributes.jobIdPending != null && weeklyTime <= currentPlayerAttributes.jobPendingTime  ){
        
        const rand = Math.floor(Math.random()*5);
        //Decider if you got the job or not
        console.log(rand + " != 4???");

        const tempJobPending = FindWithAttr(jobs, "id", currentPlayerAttributes.jobIdPending); //jobs is given with id number
        if (jobs[tempJobPending].worklevel <= currentPlayerAttributes.playerWorkLevel && rand != 4 && jobs[tempJobPending].educationReq <= currentPlayerAttributes.educationId){

            currentPlayerAttributes.currentWorkId = tempJobPending;
            ShowTempMessage(`Congratulations! You got the job!<br><br> Now you can start working as ${jobs[tempJobPending].job}.`, 'sms');
            OpponentEvents(`got a job as a ${jobs[tempJobPending].job}!`);
        }

        else if (jobs[tempJobPending].worklevel > currentPlayerAttributes.playerWorkLevel){
            ShowTempMessage("Unfortunately you didn't get the job. You are lacking work experience.", 'rejection');
            OpponentEvents("failed to get a job.");
        }

        else if (jobs[tempJobPending].educationReq > currentPlayerAttributes.educationId){
            ShowTempMessage("Unfortunately you didn't get the job. You are lacking some education.", 'rejection');
            OpponentEvents("failed to get a job.");
        }

        else{
            ShowTempMessage("Unfortunately you didn't get the job. All of the candidates including you were really good, but you weren't the our choice.", 'rejection');
            OpponentEvents("failed to get a job.");
        }

        showJobs = true;
        currentPlayerAttributes.jobIdPending = null;
        RandomizeJobs();
        // randomizeNewOnlineContent = true;
    }


}

function ReduceTime_Check(decreaseTimeAmount){

    weeklyTime -= decreaseTimeAmount;
    
    if (weeklyTime < 0){
        
        
        weeklyTime = 0;
        
        ManageMoveButtons('weekChange');
        $(infoboxObj).slideUp(500);

        OpponentEndOfWeek();
        


        //randomize something to upcoming week.
        //if worked too much, feel sick and take some time away
    }

    ColorTimeBar(weeklyTime, timeProgressBar);
    
    anime({
        targets: timeProgressBar,
        width: (weeklyTime/weeklytimeToCompare)*barWidth,
        easing: 'linear',
        duration: 500

    });


    monthlyTimeText.innerHTML = "Time: " + Math.ceil((weeklyTime/weeklytimeToCompare)*100) + "%";
    weekText.innerText = "Week # " + weekNumber;

    
    WorkChecker();
    
    UpdateBarAndTexts();
}

function TotalHappinessCalculation(){
    
    let extraHappinesPoints = 0;

    if (currentPlayerAttributes.currentItems.length > 0){
        currentPlayerAttributes.currentItems.forEach(item => {
            for (var i = 0; i < onlineItems.length; i++){
                if (item == onlineItems[i].itemId){
                    extraHappinesPoints += onlineItems[i].itemHappiness;
                }
            }
        });
    }
    
    // console.log("Money happinesspoints: " +  Math.floor(currentPlayerAttributes.moneyPoints/1000));

    extraHappinesPoints += Math.floor(currentPlayerAttributes.moneyPoints/1000);
    extraHappinesPoints += pets[currentPlayerAttributes.petID].happinessPoints;
    extraHappinesPoints += education[currentPlayerAttributes.educationId].happinessPoints;
    extraHappinesPoints += jobs[currentPlayerAttributes.currentWorkId].happinessPoinst;
    extraHappinesPoints += relationships[currentPlayerAttributes.relationshipID].happinessPoints;
    extraHappinesPoints += rentHomes[currentPlayerAttributes.homeID].happinessPoints;
    extraHappinesPoints += currentPlayerAttributes.intoxicationLevel;
    currentPlayerAttributes.happinessTotal = currentPlayerAttributes.happinessPoints + extraHappinesPoints;

    if (currentPlayerAttributes.happinessTotal > 100){
        currentPlayerAttributes.happinessTotal = 100;
    }

}

function RandomizeJobs(){

    randomizedOnlineJobs = [];
    let jobsToShow = [];

    //make a copy of jobs array
    jobs.forEach(el => {  // jobsToShow = {...jobs};
        jobsToShow.push(el);
    });

    //First Delete current and unemloyment jobs from the list
    jobsToShow.splice(currentPlayerAttributes.currentWorkId, 1);
    if (currentPlayerAttributes.currentWorkId != 0){
        jobsToShow.splice(0, 1);
    }
    
    //Push to randomizejob list and delete from temp list        
    for (var i = 0; i < 4; i++){
        let randJob = Math.floor(Math.random()*jobsToShow.length);
        randomizedOnlineJobs.push(jobsToShow[randJob]);
        jobsToShow.splice(randJob, 1); //delete jobs, which are listed from the temp array
    }
}

//EXECUTED FROM game.js
function ChooseDirection(destination){
   
    switch (destination){

        case "Home":
            if (currentPlayerAttributes.homeID == 0){
                EnteringHome();
            }
            else{
            // <img src="./img/building_texts/Out_HomeBetterImg.png" width="${infoboxWidth}px">
            infoboxObj.innerHTML = `<div class="UI_text center">
                                    
                                    </div>
                                    <br>
                                    <div class="text-topic">Lo-cost appartments</div>
                                    <div class="UI_text description">This is where rest of the people lives in.</div>
                                    <div class="oneColumn border"></div>
                                    <br><div class="optiontext red">You don't live here.</div><br>`;


                if (currentPlayerAttributes.randomForRenting == 0){
                infoboxObj.innerHTML += `<div class="twoColumns40-60">
                                        <div class="basicCell"><button class="btn" onclick="RentHomeAction(0)">Rent!</button></div>
                                        <div id="rentHouse_text" class="optiontext green">Rent this appartment. Deposit is ${rentHomes[0].deposit}€. Addition to this rently fee is ${rentHomes[0].rent}€</div>
                                        </div>`;
                }
                else {
                infoboxObj.innerHTML += `<br>
                                        <div class="optiontext red">These no available appartments</div>`;
                }
            }

            break;
            
        case "BetterHome":
            if (currentPlayerAttributes.homeID == 1){
                EnteringHome();
            }

            else{
                infoboxObj.innerHTML = `<div class="UI_text center">
                                            <img src="./img/building_texts/Out_HomeBetterImg.png" width="${infoboxWidth}px">
                                        </div>
                                        <br>
                                        <div class="text-topic">Luxurious appartments</div>
                                        <div class="UI_text description">This is were happy people live.</div>
                                        <div class="oneColumn border"></div>
                                        <br><div class="optiontext red">You don't live here.</div><br>`;
                
                if (currentPlayerAttributes.randomForRenting == 0){
                    infoboxObj.innerHTML += `<div class="twoColumns40-60">
                                            <div class="basicCell"><button class="btn" onclick="RentHomeAction(1)">Rent!</button></div>
                                            <div id="rentHouse_text" class="optiontext green">Rent this appartment. Deposit is ${rentHomes[1].deposit}€. Addition to this rently fee is ${rentHomes[1].rent}€</div>
                                            </div>`;
                }

                else {
                    infoboxObj.innerHTML += `<br>
                                                <div class="optiontext red">These no available appartments</div>`;
                }
            }

            break;

        case "Bar":
            infoboxObj.innerHTML = `<div class="UI_text center">
                                        <img src="./img/building_texts/In_BarImg.png" width="${infoboxWidth}px">
                                    </div>
                                    <br>
                                    <div class="text-topic">This n' that BAR!</div>
                                    <div class="UI_text description">Please have a drink or two. Don't cause any trouble.</div>

                                    <div class="oneColumn border"></div>
                                    <br>
                                        <div class="twoColumns40-60">
                                            <div class="basicCell"><button class="btn" onclick="BarAction('drink')">Buy a drink</button></div>
                                            <div id="drink_bar" class="optiontext green">Alcohol increases your happiness and conficence temporary. 5€/drink.</div>
                                        </div>
                                    


                                        <div class="twoColumns40-60">
                                            <div class="basicCell"><button class="btn" onclick="BarAction('sosialize')">Socialize</button></div>
                                            <div id="sosialize_bar" class="optiontext green">Check if you are able to get some company.</div>
                                        </div>
                                    
                                        <div class="twoColumns40-60">
                                            <div class="basicCell"><button class="btn" onclick="BarAction('dance')">Dance</button></div>
                                            <div id="dance_bar" class="optiontext green">Show your dance moves on the dance floor.</div>
                                        </div>

                                    `;
                                    break;

        case "Mall":
            infoboxObj.innerHTML = `<div class="UI_text center">
                                    <img src="./img/building_texts/In_PostImg.png" width="${infoboxWidth}px">
                                    </div>
                                    <div class="text-topic">The Mall</div>
                                    <div class="UI_text description">Everything you need and little bit more.</div>
                                    <div class="oneColumn border"></div>
                                    <br>
                                         
                                    <div class="UI_text middleTopic">Barber - beauty saloon</div>
                                    <div class="oneColumn underline"></div>
                                    <div class="twoColumns40-60">
                                        <div class="basicCell"><button class="btn" onclick="MallActions('beauty')">Purchase</button></div>
                                        <div id="xx" class="optiontext green">Makes you more appealing. Cost 50€.</div>
                                    </div>

                                    
                                    <div class="UI_text middleTopic">Petstore</div>
                                    <div class="oneColumn underline"></div>
                                    `;


            if (currentPlayerAttributes.petID == 0){
             infoboxObj.innerHTML += `
                                    <div class="twoColumns40-60">
                                        <div class="basicCell"><button class="btn" onclick="PetStoreAction('acquire')">Purchase</button></div>
                                        <div id="xx" class="optiontext green">Nice little fellow. Remember you have to take good care of it. Acquire price is ${pets[1].petAcquireCost}€</div>
                                    </div>`
            }

            if (currentPlayerAttributes.petID == 1){
                infoboxObj.innerHTML += `
                                       <div class="twoColumns40-60">
                                           <div class="basicCell"><button class="btn" onclick="PetStoreAction('acquire')">Give it up</button></div>
                                           <div id="xx" class="optiontext green">If you are unable to take care of your pet, we are happy to take it back.</div>
                                       </div>`
            }


            infoboxObj.innerHTML += `<div class="twoColumns40-60">
                                        <div class="basicCell"><button class="btn" onclick="PetStoreAction('petfood')">Purchase</button></div>
                                        <div id="xx" class="optiontext green">You need to feed your pet. Only ${pets[1].petFoodCost}€ for 2 weeks!</div>
                                    </div>


                                    <div class="UI_text middleTopic">Post office</div>
                                    <div class="oneColumn underline"></div>
                                    

                                    `;
            
            if (currentPlayerAttributes.postPackageInPost){
                infoboxObj.innerHTML += `
                                        <div class="twoColumns40-60">
                                            <div class="basicCell"><button class="btn" onclick="MallActions('postPackage')">Reclame</button></div>
                                            <div id="xx" class="optiontext green">Here's something you ordered.
                                                <div class="basicCell"><img src="./img/icons/PostPackageSprite.png" height="40px"></div>
                                            </div>
                                        </div>
                                        `;
            }

            if (!currentPlayerAttributes.postPackageInPost){
                infoboxObj.innerHTML += `
                                        <div class="twoColumns40-60">
                                        <div></div>
                                            <div class="optiontext orange">You don't have anything to reclame.</div>
                                            
                                        </div>
                                        `;

            }






            break;
        
        case "Forest":
            infoboxObj.innerHTML =  `<div class="UI_text center">
                                    <img src="./img/building_texts/In_ForestImg.png" width="${infoboxWidth}px">
                                    </div>
                                    <div class="text-topic"><span style='color:green'>Forest</span></div>
                                    <div class="UI_text description">Here's where your soul rests.</div>
                                    <div class="oneColumn border"></div>
                                    <br>
                                    

                                    <div class="twoColumns40-60">
                                        <div class="basicCell"><button class="btn" onclick="ForestAction()">Wander</button></div>
                                        <div id="forestText" class="optiontext green">Forest is a source of happiness.</div>
                                    </div>
                                    <br>
                                    <div class="UI_text description">
                                    Forest is a base of the nature where all the creatures live and where they breed.
                                    Forest is a base of the nature where all the creatures live and where they breed. 
                                    Forest is a base of the nature where all the creatures live and where they breed.</div>
                                    `;
        
            break;

        case "School":
            infoboxObj.innerHTML = `<div class="text-topic">School</div>
                                    <div class="UI_text description">Here you are able to study and enhance your knowledge on things you're interested in.</div>
                                    
                                    <div class="oneColumn border"></div>
                                    <br>`


                                if (currentPlayerAttributes.educationId < 3 && !currentPlayerAttributes.educationEnroll){
                                    infoboxObj.innerHTML +=  
                                    `<div class="twoColumns40-60">
                                        <div class="basicCell"><button class="btn" onclick="SchoolAction()">Purchase enroll</button></div>
                                    <div id="educationEnroll_text" class="optiontext green">Purchase the enroll for ${education[currentPlayerAttributes.educationId+1].degree} with ${education[currentPlayerAttributes.educationId+1].cost}€.</div>
                                    </div>
                                    `;
                                }
                                
                                else if (currentPlayerAttributes.educationEnroll){
                                    infoboxObj.innerHTML +=  
                                    `<div class="twoColumns40-60">
                                        <div class="basicCell"><button class="btn" onclick="SchoolAction()">Study</button></div>
                                    <div id="educationEnroll_text" class="optiontext green">Study study hard!</div>
                                    </div>
                                    `;
                                }

                                else{
                                    infoboxObj.innerHTML += `<div class="optiontext green">Nothing for you any. You are total master! </div>`;
                                }
                            


                                break;


        case "Sports":
            infoboxObj.innerHTML = `<div class="UI_text center">
                                    <img src="./img/building_texts/In_SportsImg.png" width="${infoboxWidth}px">
                                    </div>
                                    <div class="text-topic"><span style='color:salmon'>Sports center</span></div>
                                    <div class="UI_text description">Pump up your muscles and spirit! Ugh..</div>
                                    <div class="oneColumn border"></div>
                                    <br>
                                    
                                    
                                    <div class="twoColumns40-60">
                                        <div class="basicCell"><button class="btn" onclick="SportsAction('sports')">Gym</button></div>
                                        <div id="xxxx" class="optiontext green">Get some muscles pencil neck. You feel much happier after that.</div>
                                    </div>


                                    <div class="twoColumns40-60">
                                        <div class="basicCell"><button class="btn" onclick="SportsAction('yoga')">Yoga</button></div>
                                    <div id="xxxxx" class="optiontext green">Yoga is the best for you mentally.</div>
                                </div>

                                `;

            break;


    }


    if (weeklyTime > 0){
        $(infoboxObj).slideDown(400);
    }
    

    
}

//HOME ACTIONS------------------------------------------------------------------------------------------------
function EnteringHome(){ //entering some of the homes

    if (currentPlayerAttributes.homeID == 0){
        infoboxObj.innerHTML = `<div class="UI_text center">
                                <img src="./img/building_texts/Home_Image.png" width="${infoboxWidth}px">
                                </div>
                                <div class="text-topic">Lo-cost appartment</div>
                                <div class="UI_text description">This is where some people live.</div>
                                <div class="oneColumn border"></div>
                                <br>`
        infoboxObj.className = "infoboxBase";

    }
    
    else if (currentPlayerAttributes.homeID == 1){
        infoboxObj.innerHTML = `<div class="UI_text center">
                                <img src="./img/building_texts/In_HomeBetterImg.png" width="${infoboxWidth}px">
                                </div>
                                <div class="text-topic">Luxurious appartment</div>
                                <div class="UI_text description">This is where successful people live.</div>
                                <div class="oneColumn border"></div>
                                <br>`
        infoboxObj.className = "infoboxBase lux";

    }

    //COPY THE LIST
    if(randomizeNewOnlineContent){
        randomizedOnlineItems = [];
        let tempCopyItemList =[];
        onlineItems.forEach(item => {
            tempCopyItemList.push(item);
        })
    
        
        // if (currentItems.length > 0){
            //IF CURRENT ITEMS AREN'T VISIBLE IN THE SHOP!
            // for (var i = 0; i < tempCopyItemList.length; i++){
            //     for (var j = 0; j < currentItems.length; j++){
            //         if (tempCopyItemList[i].itemId == currentItems[j]){
            //             // console.log("Deleting index: ", FindWithAttr(randomizedOnlineItems, "itemId", currentItems[j]));
            //             tempCopyItemList.splice(FindWithAttr(tempCopyItemList, "itemId", currentItems[j]) , 1);
            //             // console.log("deleted: ", currentItems[j]);    
            //         }
            //     }    
            // }

            //Push to randomizeItem list and delete from temp list

        // }

        for (var i = 0; i < 3; i++){ //display 3 items
            const randItem = Math.floor(Math.random()*tempCopyItemList.length)
            randomizedOnlineItems.push(tempCopyItemList[randItem]);
            tempCopyItemList.splice(randItem, 1);
        }
        

        RandomizeJobs();


        randomizeNewOnlineContent = false;
    }



    CheckHome_AdditionalActions();

    if (currentPlayerAttributes.currentItems.length > 0){
        infoboxObj.innerHTML += 
        `<div class="UI_text middleTopic">Your items</div>
        
            <div class="twoColumns40-60">
                <div class="basicCell">${AddHomeStuffButton("Show items", 'showitems')}</div>
                <div id="worktext_home" class="optiontext green">Show household items.</div>
            </div>
        <br>
        `;
    }

    infoboxObj.innerHTML += `<div class="UI_text middleTopic">Home activities</div>
        
                            <div class="twoColumns40-60">
                                <div class="basicCell">${AddHomeStuffButton("Rest", 'sleep')}</div>
                                <div class="optiontext green" id="sleeptext_home">Take a rest and increase your energy.</div>
                            </div>



                            <div class="twoColumns40-60">
                                <div class="basicCell">${AddHomeStuffButton("Internet", 'internettime')}</div>
                                <div id="internet_home" class="optiontext green">Spend some quality time in internet.</div>
                            </div>

                            <div class="twoColumns40-60">
                                <div class="basicCell">${AddHomeStuffButton("Online shop", 'orderonline')}</div>
                                <div class="optiontext green">Buy something online to cheer up your life.</div>
                            </div>

                            <div class="twoColumns40-60">
                                <div class="basicCell">${AddHomeStuffButton("Check jobs", 'checkonlinejobs')}</div>
                                <div class="optiontext green">Get a job. There's plenty of jobs online.</div>
                            </div>
                            `;


                            // <div class="twoColumns40-60">
                            //     <div class="basicCell">${AddHomeStuffButton("Tinder", 'tinder')}</div>
                            //     <div class="optiontext magenta">Try to hook up with someone.</div>
                            // </div>



    function CheckHome_AdditionalActions(){

        
        if (currentPlayerAttributes.currentWorkId != 0 || currentPlayerAttributes.rentToDue || currentPlayerAttributes.petID != 0 && currentPlayerAttributes.petWeeklyDue || currentPlayerAttributes.relationshipID != 0){
            infoboxObj.innerHTML += `<div class="UI_text middleTopic">Current duties</div>
                                    `;

            if (currentPlayerAttributes.currentWorkId != 0){
                infoboxObj.innerHTML += 
                `
                <div class="twoColumns40-60">
                    <div class="basicCell">${AddHomeStuffButton("Go to work", 'gotowork')}</div>
                    <div id="worktext_home" class="optiontext green">Earn some money!</div>
                </div>
                `;
            }

            if (currentPlayerAttributes.petID != 0 && currentPlayerAttributes.petWeeklyDue){
                infoboxObj.innerHTML += 
                `
                <div class="twoColumns40-60">
                    <div class="basicCell">${AddHomeStuffButton("Pet care", 'petcare')}</div>
                    <div id="pettext_home" class="optiontext green">Each week you have to contribute some time with your pet. This will just take ${pets[currentPlayerAttributes.petID].weeklyPetTime} of your time.</div>
                </div>
                `;
            }
        
            if (currentPlayerAttributes.rentToDue){
                infoboxObj.innerHTML += 
                `
                
                <div class="twoColumns40-60">
                    <div class="basicCell">${AddHomeStuffButton("Pay rent", 'payrent')}</div>
                    <div id="rent_text" class="optiontext green">Your rent ${rentHomes[currentPlayerAttributes.homeID].rent}€.</div>
                </div>
                `;
            }

            if (currentPlayerAttributes.relationshipID != 0){
                infoboxObj.innerHTML += 
                `
                
                <div class="twoColumns40-60">
                    <div class="basicCell">${AddHomeStuffButton("Relationship", 'relationship')}</div>
                    <div id="rent_text" class="optiontext green">Spend some quality time with your partner.</div>
                </div>
                `;
            }

            infoboxObj.innerHTML += `<br>`;
        }
    }


    function AddHomeStuffButton(text, action){
        return `<button class="btn" onclick="ActionsAtHome('${action}')">${text}</button>`;
    }

    UpdateBarAndTexts();
};



function ActionsAtHome(action){

    switch (action){
        case 'sleep':
            
            document.getElementById('sleeptext_home').innerHTML ="You feel energized now."; //changes current text
            
            if (currentPlayerAttributes.intoxicationLevel > 0){currentPlayerAttributes.intoxicationLevel--;}
            if (currentPlayerAttributes.happinessPoints < 20){ currentPlayerAttributes.happinessPoints += 3; }
            
            if (currentPlayerAttributes.energyLevel < (75 + currentPlayerAttributes.currentYogaEnhancer)){ 
                AddEnergy(5+currentPlayerAttributes.exerciseLvl); 
            }
            
            ReduceTime_Check(3); //executes also update function
            break;

        case 'tinder':
            //consumes time and add longterm happiness possibility
            OpponentEvents('is checking the tinder.');

            ReduceTime_Check(60); //executes also update function 3
            break;

        case 'internettime':
                        
            if (currentPlayerAttributes.internetHappiness > 0){ 
                currentPlayerAttributes.internetHappiness--;
                currentPlayerAttributes.happinessPoints++; 
            }
            document.getElementById('internet_home').innerHTML = "Hehee.. funny cat videos...";
            OpponentEvents('is laughing at cat videos...');
            ReduceTime_Check(5); //executes also update function
            break;

        case 'orderonline':
            OpenOnlineShop();
            break;

        case 'gotowork':
            const elem = document.getElementById('worktext_home');
            if (jobs[currentPlayerAttributes.currentWorkId].energyConsumption <= currentPlayerAttributes.energyLevel && currentPlayerAttributes.intoxicationLevel == 0){
                currentPlayerAttributes.moneyPoints += jobs[currentPlayerAttributes.currentWorkId].salary;
                currentPlayerAttributes.energyLevel -= jobs[currentPlayerAttributes.currentWorkId].energyConsumption;
                
                currentPlayerAttributes.workExperience++;

                elem.innerHTML =  `<div>You earned $${jobs[currentPlayerAttributes.currentWorkId].salary}!</div>`;
                // Take some rest, you might be tired.</br>;
                elem.className = "optiontext green";
                currentPlayerAttributes.workStress++;

                if (currentPlayerAttributes.workExperience > workExperienceRequired){
                    currentPlayerAttributes.playerWorkLevel++;
                    currentPlayerAttributes.workExperience = 0;
                    ShowTempMessage("You're more experienced now. Maybe you should applying for more demanding jobs.", 'sms')
                }

                ReduceTime_Check(10); //executes also update function
                
            }

            else if(currentPlayerAttributes.intoxicationLevel > 0){
                elem.innerHTML = "You are drunk. Get some sleep.";
                elem.className = "optiontext red";
            }

            else{
                
                elem.innerHTML = "You are too tired to do that. Get some rest.";
                elem.className = "optiontext red";
            }

            break;

        case 'checkonlinejobs':   
            OpenOnlineJobs();
            ReduceTime_Check(1); //executes also update function
            break;

        case 'petcare':
            if (weeklyTime >= pets[currentPlayerAttributes.petID].weeklyPetTime){
                
                currentPlayerAttributes.happinessPoints += 2;
                currentPlayerAttributes.petWeeklyDue = false;
                ReduceTime_Check(pets[currentPlayerAttributes.petID].weeklyPetTime);
                EnteringHome();
            }
            else{
                const rentText = document.getElementById('pettext_home');
                rentText.innerHTML = `Not enough time to contribute. Your pet only needed ${pets[currentPlayerAttributes.petID].weeklyPetTime} of your time.`;
                rentText.className = 'optiontext red';
            }
            break;
        case 'payrent':
        
            if (currentPlayerAttributes.moneyPoints >= rentHomes[currentPlayerAttributes.homeID].rent  && currentPlayerAttributes.rentToDue){
                currentPlayerAttributes.moneyPoints -= rentHomes[currentPlayerAttributes.homeID].rent
                currentPlayerAttributes.rentToDue = false;
                ShowTempMessage('The payment transaction was successful.', 'sms');
                OpponentEvents('had money to pay the rent.');
                EnteringHome();
            }
            else{
                const rentText = document.getElementById('rent_text');
                rentText.innerHTML = `Not enough money. The amount is ${rentHomes[currentPlayerAttributes.homeID].rent}€`;
                rentText.className = 'optiontext red';
            }
            ReduceTime_Check(1); //executes also update function
            break;

        case 'showitems':
            infoboxObj.innerHTML = `<div class="xx">${AddHomeButton('<img src="./img/icons/Button_Back.png" height="20px">','Home')}</div>
                                    <div class="text-topic">Your items</div>
                                    <div class="oneColumn border"></div>
                                    
                                    `;
            currentPlayerAttributes.currentItems.forEach(item =>{
                infoboxObj.innerHTML += `<div class="twoColumns30-70">
                                            <div class="optiontext yellow">${onlineItems[item].item}</div>
                                            <div class="basicCell"><img src="${onlineItems[item].img}" height="80px"></div>
                                        </div>`;
            });
            
            break;

        case 'relationship':
            infoboxObj.innerHTML = `<div class="xx">${AddHomeButton('<img src="./img/icons/Button_Back.png" height="20px">','Home')}</div>
                                    <div class="text-topic">Relationship</div>
                                    <div class="UI_text description">Healthy relationship is the most important things in your life</div>
                                    <div class="oneColumn border"></div>
                                    
                                    <div class="twoColumns40-60">
                                        <div class="basicCell"><button class="btn" onclick="RelationshipAction('relationship_walk')">Go to walk</button></div>
                                        <div class="optiontext green" id="relationship_walkTxt">Go to a romantic walk.</div>
                                    </div>
                                    <div class="twoColumns40-60">
                                        <div class="basicCell"><button class="btn" onclick="RelationshipAction('relationship_restaurant')">Restaurant</button></div>
                                        <div class="optiontext green">Eat in a restaurant. Cost 120€.</div>
                                    </div>
                                `;
                                    

            break;
     

    }

    // function AddHomeStuffButton(text, action){
    //     return `<button class="btn" onclick="ActionsAtHome('${action}')">${text}</button>`;
    // }

};

//ONLINE JOBS---------------------------------------------------------------------------------------------------
function OpenOnlineJobs(){

    infoboxObj.className = "infoboxBase net";
    infoboxObj.innerHTML = `<div class="browserBase">${AddHomeButton('<img src="./img/icons/Button_Back.png" height="20px">','Home')}<div class="browser">http://www.somejobs.com</div></div>
                            <br>`;
    infoboxObj.scrollTop = 0;

    if (showJobs){
        for (var i = 0; i < randomizedOnlineJobs.length; i++){
            // let rand = Math.floor(Math.random()*jobsToShow.length);
            infoboxObj.innerHTML += ShowJobs(randomizedOnlineJobs[i]);
            // jobsToShow.splice(rand, 1); //delete jobs, which are listed from the temp array
        }
    }
    else{
        infoboxObj.innerHTML = `<div class="browserBase">${AddHomeButton('<img src="./img/icons/Button_Back.png" height="20px">','Home')}<div class="browser">http://www.somejobs.com/#5435</div></div>
        <div class="twoColumns30-70">
            <div class="basicCell"></div>
            <div class="UI_text description">Hello Sir,<br><br>
            We are still in the reqruiting process and cannot give any further information at the moment.<br><br>
            Thank you for your patient.<br><br>
            Best regards,<br>
            HR Manager
            </div>
        </div>`
    }



    function ShowJobs(allwork){

        //different color, if worklevel is too high
        if (currentPlayerAttributes.playerWorkLevel < allwork.worklevel || currentPlayerAttributes.educationId < allwork.educationReq) {
            return  `
            <div class="twoColumns40-60 topicBorder">
                <div class="optiontext orange">${allwork.job}</div><div class="optiontext dark">${AddJobApplyButton(allwork)}</div>
            </div>

            <div class="oneColumn border"></div>

            <div class="twoColumns40-60 moreBottom">
                <div class="optiontext gray">Description: </div><div class="optiontext white">${allwork.description}</div>
                <div class="optiontext gray">Salary: </div><div class="optiontext green">$${allwork.salary}/day</div>
            </div><br>`;
        }
        else{
            return  `
            
            <div class="twoColumns40-60 topicBorder">
                <div class="optiontext green">${allwork.job}</div><div class="optiontext dark">${AddJobApplyButton(allwork)}</div>
            </div>
            
            <div class="oneColumn border"></div>

            <div class="twoColumns40-60 moreBottom">
                <div class="optiontext gray">Description: </div><div class="optiontext white">${allwork.description}</div>
                <div class="optiontext gray">Salary: </div><div class="optiontext green">$${allwork.salary}/day</div>
            </div><br>`;
        }
        
        

        
    }

    //Add the button
    function AddJobApplyButton(allwork){
        return `<button class="btn green" onclick="ApplyForJob(${allwork.id}, '${allwork.job}')">Apply!</button>`;
    }
};

function ApplyForJob(workID, jobName){
    showJobs = false;
    currentPlayerAttributes.jobIdPending = workID;
    currentPlayerAttributes.jobPendingTime = weeklyTime - 20;
    if (currentPlayerAttributes.jobPendingTime < 0){
        currentPlayerAttributes.jobPendingTime = 1;
    }
    ReduceTime_Check(3);
    infoboxObj.innerHTML = `<div class="browserBase">${AddHomeButton('<img src="./img/icons/Button_Back.png" height="20px">','Home')}<div class="browser">http://www.somejobs.com/#5435</div></div>
                            <div class="twoColumns30-70">
                                <div class="basicCell"><img src="./img/icons/JobApplicationSprite.png" height="70px"></div>
                                <div class="UI_text description">Hello Sir,<br><br>
                                Thank you for submitting your application letter for ${jobName} position. We want to fulfill this position as quickly as possible.<br><br>
                                You'll heard from us soon.<br><br>
                                Best regards,<br>
                                HR Manager
                                </div>
                            </div>`

};



//ONLINE SHOPPING------------------------------------------------------------------------------------------------
function OpenOnlineShop(){

    infoboxObj.className = "infoboxBase net";
    infoboxObj.innerHTML = `<div class="browserBase">${AddHomeButton('<img src="./img/icons/Button_Back.png" height="20px">','Home')}<div class="browser">http://www.somestuff.com/</div></div>
                            <br>`;
    infoboxObj.scrollTop = 0;

    if (postPackagePending == 0){
        for (var i = 0; i < randomizedOnlineItems.length; i++){

            
            //ONLINE ITEMS
            if (randomizedOnlineItems[i].cost <= currentPlayerAttributes.moneyPoints){
                infoboxObj.innerHTML +=  `
                <div class="twoColumns40-60 topicBorder">
                <div class="UI_text middleTopic">${randomizedOnlineItems[i].item}</div>
                <div class="optiontext dark"><button class="btn green" onclick="OrderOnlineItem(${randomizedOnlineItems[i].itemId}, ${randomizedOnlineItems[i].cost})">Purchase</button></div>
                </div>
                <div class="oneColumn border"></div>

                <div class="twoColumns40-60">
                    <div><img src="${randomizedOnlineItems[i].img}" height="80px"></div>
                    <div>
                        <span class="optiontext blueish">${randomizedOnlineItems[i].description}</span><br>
                        <span class="optiontext green">${randomizedOnlineItems[i].cost}€</span>
                    </div>
                    
                    
                <br>`;
            }

            else{
                infoboxObj.innerHTML +=  `
                <div class="twoColumns40-60 topicBorder">
                <div class="UI_text middleTopic">${randomizedOnlineItems[i].item}</div>
                <div class="optiontext dark"></div>
                </div>
                <div class="oneColumn border"></div>
                
                <div class="twoColumns40-60">
                    <div><img src="${randomizedOnlineItems[i].img}" height="80px"></div>
                    <div>
                        <span class="optiontext blueish">${randomizedOnlineItems[i].description}</span><br>
                        <span class="optiontext red">${randomizedOnlineItems[i].cost}€</span>
                    </div>
                <br>`
            }
        }

    }
    else{
        infoboxObj.innerHTML = `<div class="browserBase">${AddHomeButton('<img src="./img/icons/Button_Back.png" height="20px">','Home')}<div class="browser">http://www.somestuff.com/order#21123</div></div>
                                <br><div class="UI_text description">Hi there stranger! <br><br>
                                Thanks for buying this. I'll post the item right a way! The follow-up code is #5473829543 432 5432 21123. Be sure to write that down. The package should be there shortly.<br><br>

                                Regards, <br>
                                the seller
                                </div>`;
    }

    ReduceTime_Check(1);

    
};

function ForestAction(){
    if (currentPlayerAttributes.forestHappiness > 0 && weeklyTime >= 6){
        const forestText = document.getElementById('forestText');
        forestText.innerHTML = "You feel so much happier."
        
        currentPlayerAttributes.forestHappiness--;
        currentPlayerAttributes.happinessPoints++;
        ReduceTime_Check(6);
    }
};

function MallActions(action){

    switch (action){
        case 'postPackage':
            if (currentPlayerAttributes.postPackageInPost){

                currentPlayerAttributes.currentItems.push(FindWithAttr(onlineItems, "itemId", postPackagePending));
                
                postPackagePending = 0;
                currentPlayerAttributes.postPackageInPost = false;
                UpdateBarAndTexts();
                ChooseDirection('Mall');
            }
        
        
            break;

        case 'beauty':
            if (currentPlayerAttributes.beautyFactor == 0 && currentPlayerAttributes.moneyPoints >= 50) {
                currentPlayerAttributes.moneyPoints -= 50;
                currentPlayerAttributes.beautyFactor += 5;
                OpponentEvents('went to beauty salon.');
            }
            ReduceTime_Check(5);
            break;






    }



        // else{
        //     infoboxObj.innerHTML += `<br>
        //                             <div class="optiontext red">You don't have any packages.
        //                             <br><br>`;
        // }
};


//BAR---------------------------------------------------------------------------------------------------
function BarAction(action){
    switch (action){

        case 'drink':
            const barText = document.getElementById('drink_bar');

            if (currentPlayerAttributes.intoxicationLevel > 4){
                barText.innerHTML = "You have drank enough, so maybe it's enough for now.";
                barText.className = "optiontext red";
                OpponentEvents('has drinked too much...');
                ReduceTime_Check(1); //executes also update function
            }
            else if (currentPlayerAttributes.moneyPoints < 5){
                barText.innerHTML = "Not enough currency to buy alcohol. :/";
                barText.className = "optiontext red";
                

            }

            else{
                barText.innerHTML = "Mmm.. good. You feel a little bit happier.";
                currentPlayerAttributes.moneyPoints -= 5;
                currentPlayerAttributes.intoxicationLevel++;
                OpponentEvents('is having a drink!');
                ReduceTime_Check(3 + currentPlayerAttributes.intoxicationLevel); //executes also update function
            }
            //if not too toxicated and have money
            break;

        case 'sosialize':
            const rand1 = Math.floor(Math.random()*(30 - currentPlayerAttributes.intoxicationLevel - currentPlayerAttributes.beautyFactor - (currentPlayerAttributes.educationId*3)));
                // console.log(rand1);
            if (rand1 == 5 && currentPlayerAttributes.relationshipID == 0 && currentPlayerAttributes.intoxicationLevel != 5 && currentPlayerAttributes.intoxicationLevel != 4) {
                const sosializeText = document.getElementById('sosialize_bar');
                sosializeText.innerHTML = 'You found some company!'
                sosializeText.className = 'optiontext magenta'
                currentPlayerAttributes.relationshipID = 2;
                currentPlayerAttributes.newlyMet = true;
                OpponentEvents('met someone.');
            }
            else{
                OpponentEvents('is trying to talk to people..');
            }
            
            ReduceTime_Check(4); //executes also update function
            break;
        
        case 'dance':
            const rand2 = Math.floor(Math.random()*(27 + currentPlayerAttributes.intoxicationLevel - Math.floor(1.5*currentPlayerAttributes.beautyFactor)  - currentPlayerAttributes.educationId))
            
            if (rand2 == 5 && currentPlayerAttributes.relationshipID == 0 && currentPlayerAttributes.intoxicationLevel != 5 && currentPlayerAttributes.intoxicationLevel != 4){
                const danceText = document.getElementById('dance_bar');
                danceText.innerHTML = 'You were able charm someone with your dancing!';
                danceText.className = 'optiontext magenta';
                currentPlayerAttributes.relationshipID = 2;
                currentPlayerAttributes.newlyMet = true;
            }

            OpponentEvents('is showing some dance moves!');

            ReduceTime_Check(4); //executes also update function
            break;
    }
    // UpdateBarAndTexts();
};

//RELATIONSHIP-----------------------------------------------------------------------------------------
function RelationshipAction(id){
    
    switch (id){
        case 'relationship_walk':
            const relationship_walkTxt = document.getElementById('relationship_walkTxt');
            relationship_walkTxt.innerHTML = "You had a nice and loooong walk out side.";
            currentPlayerAttributes.relationshipStrenght++;
            // ShowTempMessage('You had a nice and loooong walk out side.', 'relationship');
            ReduceTime_Check(10);
            break;
    
        case 'relationship_restaurant':
            if (currentPlayerAttributes.moneyPoints >= 120){
                currentPlayerAttributes.relationshipStrenght +=2;
                currentPlayerAttributes.moneyPoints -= 120;
                // ShowTempMessage('Very romantic lunch. The cost was 80€ and good stable relationship.', 'relationship');
                ReduceTime_Check(7);
            }
            
            break;

    }

    if (currentPlayerAttributes.relationshipStrenght > 9){
        switch (currentPlayerAttributes.relationshipID){
            case 1: //complicated
                currentPlayerAttributes.relationshipID = 3;
                break;
            
            case 2: //just met
                currentPlayerAttributes.relationshipID = 3;
                break;

            case 3: //dating
                currentPlayerAttributes.relationshipID = 4;
                break;
            
            case 4: //complicated
                currentPlayerAttributes.relationshipID = 4;
                break;

        }
        currentPlayerAttributes.relationshipStrenght = 0;
    }

};

//PET-------------------------------------------------------------------------------------------------------------
function PetStoreAction(acquireOrFood){

    switch (acquireOrFood){
        case 'acquire':

            //buying a pet
            if (currentPlayerAttributes.moneyPoints >= pets[1].petAcquireCost && currentPlayerAttributes.petID == 0){
                currentPlayerAttributes.moneyPoints -= pets[1].petAcquireCost;
                currentPlayerAttributes.petID = 1;
        
                
                OpponentEvents('bought a pet.');
                currentPlayerAttributes.petWeeklyDue = true;
                ReduceTime_Check(1);
                ChooseDirection('Mall');
            }
            else if (currentPlayerAttributes.petID == 1){ //giving out the pet
                currentPlayerAttributes.petID = 0;
                currentPlayerAttributes.petWeeklyDue = false;
                OpponentEvents("decided to give out the pet.");
                ReduceTime_Check(5);
                ChooseDirection('Mall');
            }
            else{
                
                ReduceTime_Check(1);
            }

            break;



        case 'petfood':
            if (currentPlayerAttributes.moneyPoints >= pets[1].petFoodCost && currentPlayerAttributes.petFoodAmount < 1){
                currentPlayerAttributes.moneyPoints -= pets[1].petFoodCost;
                currentPlayerAttributes.petFoodAmount = 2;
        
                OpponentEvents('bought some pet food. Mmm..');

                ReduceTime_Check(1);
                ChooseDirection('Mall');
            }

                break;


    }




    // document.getElementById(`pet-text-${item}`).innerHTML = "Great! You bought this nice little fellow. Remember to keep good care of it."
    // pet-text-
    ReduceTime_Check(1);
};

//RENT-------------------------------------------------------------------------------------------------------------
function RentHomeAction(home){

    if (home == 0 && currentPlayerAttributes.moneyPoints >= rentHomes[0].deposit){
        currentPlayerAttributes.moneyPoints -= rentHomes[0].deposit;
        currentPlayerAttributes.moneyPoints += rentHomes[1].deposit;
        currentPlayerAttributes.homeID = 0;
        currentPlayerAttributes.rentToDue = true;
        ShowTempMessage('You just rented yourself ' + rentHomes[0].homeName +'. Remember to pay your rent for this month.', 'sms');
        OpponentEvents('rented an appartment.');
    }

    else if (home == 1 && currentPlayerAttributes.moneyPoints >= rentHomes[1].deposit){
        currentPlayerAttributes.moneyPoints -= rentHomes[1].deposit;
        currentPlayerAttributes.moneyPoints += rentHomes[0].deposit;
        currentPlayerAttributes.homeID = 1;
        currentPlayerAttributes.rentToDue = true;
        ShowTempMessage('You just rented yourself ' + rentHomes[1].homeName +'. Remember to pay your rent for this month.', 'sms');
        OpponentEvents('rented an appartment.');
    }

}

//EDUCATION-------------------------------------------------------------------------------------------------------------
function SchoolAction(){

    if (currentPlayerAttributes.moneyPoints >= education[currentPlayerAttributes.educationId+1].cost && !currentPlayerAttributes.educationEnroll){
        currentPlayerAttributes.moneyPoints -= education[currentPlayerAttributes.educationId+1].cost
        currentPlayerAttributes.educationEnroll = true;
        ChooseDirection('School'); //for reload
        ShowTempMessage('You puchased enroll for ' + education[currentPlayerAttributes.educationId+1].degree, 'sms');
    }

    else if(currentPlayerAttributes.educationEnroll && weeklyTime > studyingTimeToConsume){
        currentPlayerAttributes.educationProgress++;
        ReduceTime_Check(studyingTimeToConsume);
        

        if(currentPlayerAttributes.educationProgress == 5){
            currentPlayerAttributes.educationId++;
            currentPlayerAttributes.educationEnroll = false;
            currentPlayerAttributes.educationProgress = 0;
            //message to panel congrats etc.
            ReduceTime_Check(0);
            ShowTempMessage('You made it! ' + education[currentPlayerAttributes.educationId].degree, 'sms');
            ChooseDirection('School'); //for reload
        }
    }

    else{
        const educationEnroll = document.getElementById('educationEnroll_text');
        educationEnroll.innerHTML = "You don't have enough money or time to go further.";
        educationEnroll.className = "optiontext red";
    }

}

//SPORTS--------------------------------------------------------------------------------------------------------------
function SportsAction(sport){

    if (sport == 'yoga'){
        if (currentPlayerAttributes.currentYogaEnhancer == 0){
            
            currentPlayerAttributes.currentYogaEnhancer+=yogaEnhance;
            
        }
        ReduceTime_Check(3);
    }

    else if(sport == 'sports'){

        if (currentPlayerAttributes.exerciseLvl <= 5){
            currentPlayerAttributes.exerciseLvl++;
            
        }
        ReduceTime_Check(2);
    }

    
}

//HELPER FUNCTIONS----------------------------------------------------------------------------------------------------------------------------------------------
function FindWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}

function AddHomeButton(picture){
    return `<button class="btn" onclick="EnteringHome()">${picture}</button>`;
};

function ManageMoveButtons(reason){

    switch (reason){
        case "off":
        $(btn_blockingPanel).fadeOut(500);

        break;

    case "weekChange":
        $(btn_blockingPanel).fadeIn(500);
        btn_blockingPanel_centerTopic.innerHTML = "Wait for opponent to finish this week..";

        break;

    case "playerMovement":
        $(btn_blockingPanel).fadeIn(500);
        btn_blockingPanel_centerTopic.innerHTML = "Moving";

        break;
        
    }

}

function ManageScoreBoard_Images(){

    currentPlayerAttributes.petID == 1 ? icon_pet.style.display = "block" : icon_pet.style.display = "none";
    currentPlayerAttributes.homeID == 0 ? icon_house.style.display ="block" : icon_house.style.display ="none";
    currentPlayerAttributes.homeID == 1 ? icon_houselux.style.display ="block" : icon_houselux.style.display ="none";
    currentPlayerAttributes.jobIdPending ? icon_jobapplication.style.display ="block" : icon_jobapplication.style.display ="none";
    currentPlayerAttributes.postPackageInPost ? icon_postpackage.style.display ="block" : icon_postpackage.style.display ="none";
    currentPlayerAttributes.exerciseLvl == 0 ? icon_exercise.style.display ="none" : icon_exercise.style.display ="block";
    currentPlayerAttributes.currentYogaEnhancer == 0 ? icon_yoga.style.display = "none" : icon_yoga.style.display = "block";
    currentPlayerAttributes.rentToDue ? icon_rent.style.display = "block" : icon_rent.style.display = "none";
    currentPlayerAttributes.beautyFactor ? icon_beauty.style.display = "block" : icon_beauty.style.display = "none";


    switch (currentPlayerAttributes.petFoodAmount){
        case 0:
            icon_petfood1.style.display ="none";
            icon_petfood2.style.display ="none";
            break;
        case 1:
            icon_petfood1.style.display ="block";
            icon_petfood2.style.display ="none";
            break;
        case 2:
            icon_petfood1.style.display ="none";
            icon_petfood2.style.display ="block";
            break;

    }
}

function ColorTimeBar(weeklyTime, barName){

    if (weeklyTime >= weeklytimeToCompare * 0.66) {
        barName.style.background = "linear-gradient(to right, white, lime)";
    }

    if (weeklyTime < weeklytimeToCompare * 0.66 && weeklyTime > 168 * 0.33){
        barName.style.background = "linear-gradient(to right, white, orange)";
    }

    if (weeklyTime <= weeklytimeToCompare * 0.33){
        barName.style.background = "linear-gradient(to right, white, red)";
    }
}


function OrderOnlineItem(itemId, cost){
    
    
    if (cost <= currentPlayerAttributes.moneyPoints){
        currentPlayerAttributes.moneyPoints -= cost;
        postPackagePending = itemId;
        infoboxObj.innerHTML = `<div class="browserBase">${AddHomeButton('<img src="./img/icons/Button_Back.png" height="20px">','Home')}<div class="browser">http://www.somestuff.com/order#21123</div></div>
                                <br><div class="UI_text description">Hi there stranger! <br><br>
                                Thanks for buying this. I'll post the item right a way! The follow-up code is #5473829543 432 5432 21123. Be sure to write that down. The package should be there shortly.<br><br>

                                Regards, <br>
                                the seller
                                </div>`;

        currentPlayerAttributes.itemInPostAnnouncement = weeklyTime - 15;
        if (currentPlayerAttributes.itemInPostAnnouncement < 0){
            currentPlayerAttributes.itemInPostAnnouncement = 1;
        }
        currentPlayerAttributes.showPostMessage = true;
        UpdateBarAndTexts();
    }
};

function AddEnergy(addedEnergy){
    
    if(addedEnergy > 100){
        currentPlayerAttributes.energyLevel = 100;
    }
    
    currentPlayerAttributes.energyLevel += addedEnergy;
}
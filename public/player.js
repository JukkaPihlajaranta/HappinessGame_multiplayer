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
const icon_exercise2 = document.getElementById('icon_exercise2');
const icon_exercise3 = document.getElementById('icon_exercise3');
const icon_drugs = document.getElementById('icon_drugs');
// const icon_exercise5 = document.getElementById('icon_exercise5');
const icon_yoga = document.getElementById('icon_yoga');
const icon_rent = document.getElementById('icon_rent');
const icon_beauty = document.getElementById('icon_beauty');

//OTHER SCOREBOARD TEXTS
const happinessText = document.getElementById('happiness_text');
const monthlyTimeText = document.getElementById('monhlytime_text');
const energyText = document.getElementById('energy_text');
const intoxicationText = document.getElementById('intoxication_text');
// const salaryText = document.getElementById('salaryText'); //scoreboard salary text
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
const opponent_time_text2 = document.getElementById('opponent_time_text2');
const opponent_time_bar2 = document.getElementById('opponent_time_bar2');
const opponent_happiness_text = document.getElementById('opponent_happiness_text');
const opponent_happiness_bar = document.getElementById('opponent_happiness_bar');
const opponent_happiness_text2 = document.getElementById('opponent_happiness_text2');
const opponent_happiness_bar2 = document.getElementById('opponent_happiness_bar2');
const opponent_moneyText = document.getElementById('opponent_moneyText');
const opponent_moneyText2 = document.getElementById('opponent_moneyText2');

const opponent_icon_house = document.getElementById('opponent_icon_house');
const opponent_icon_houselux = document.getElementById('opponent_icon_houselux');
const opponent_icon_education = document.getElementById('opponent_icon_education');
const opponent_icon_pet = document.getElementById('opponent_icon_pet');
const opponent_icon_relationship = document.getElementById('opponent_icon_relationship');

const opponent_icon_house2 = document.getElementById('opponent_icon_house2');
const opponent_icon_houselux2 = document.getElementById('opponent_icon_houselux2');
const opponent_icon_education2 = document.getElementById('opponent_icon_education2');
const opponent_icon_pet2 = document.getElementById('opponent_icon_pet2');
const opponent_icon_relationship2 = document.getElementById('opponent_icon_relationship2');

//General
const opponent_events = document.getElementById('opponent_events');



const startingAttributes = {
    happinessTotal: 0,
    happinessPoints: 10,
    moneyPoints: 200,
    energyLevel: 75,
    intoxicationLevel: 0,
    
    //time
    weeklyTime: 168,
    weekNumber: 1,

    //Pet
    petID: 0,
    petFoodAmount: 0,
    petWeeklyDue: false,

    //VoluntaireTime
    volunteerTime: 2,

    //Home
    homeID: 0,
    rentToDue: true,
    randomForRenting: 2,

    //education
    educationId: 0,
    educationProgress: 0,
    educationEnroll: false,
    schoolAction: 0,

    //training
    currentYogaEnhancer: 0,
    exerciseLvl: 0,
    gymTimes: 10,

    //Misc
    beautyFactor: 0,
    barGig: true,
    barShiftDone: false,
    lotteryTickets: 0,

    //relationship
    relationshipID: 1,
    relationshipStrenght: 0,

    //work
    currentWorkId: 0,            //work player is doing
    playerWorkLevel: 0,          //0-4
    jobPendingTime: 0,
    jobIdPending: null,
    justHired: false,
    workExperience: 0,           //gathering experience, when 10 ==> level
    workStress: 0,              //if more than 6 ==> ill, if 0 player will get fired
    showJobs: true,
    weeklyUnemployedPay: true,

    //items and collecting
    currentItems: [],            //purchased items
    itemPostArrivingTime: 0,    //when item will arrive to post
    itemIdToReclaim: null,          //item ID to reclaim in post office
    itemPackageInPost: false,
    showPostMessage: false,
    currentItemPrices: [],      //selling item
    itemSellingIdPrice: [],
    itemSellingTime: 0,
    
    
    
    
    policeAlertTime: null,

    //Illegal
    hitmanTarget_Time: [],
    illegalPostArrivingTime: 0,
    illegalIdToReclaim: null,
    drugs: 0,
    fakeEducation: false,

    //different happinesses
    forestHappiness: 1,
    internetHappiness: 1,
    mallActions: 1,

}


//Player attributes
let currentPlayerAttributes = {};
// let opponentJobIds = [];

const workExperienceRequired = 10;
const weeklytimeToCompare = 168;
const studyingTimeToConsume = 30;
const volunteerConsumptionTime = 12;
const unemploymentBenefit = 43;
const yogaEnhance = 20;
let lotteryWinCount = 0

const massagePrice = 50;
const beautyPrice = 40;
const moviePrice = 35;
const lotteryPrice = 5;

//Prices and fines
const overWorkFee = 60;
const policeFine = 120;
const drugsPrice = 40;
const hitmanPrice = 620;
const barBlockerPay = 29;

let randomizeNewOnlineContent = true;
let weeklyChangeEvents = [];

//Items
let randomizedOnlineItems = [];         //randomized items in Online shop
let randomizedOnlineJobs = [];


//OBJECTS LISTS
const relationships = [
    {
        relationshipStatus: "Broke up",
        weeklyAdded_Happiness: 0,
        happinessPoints: -10},
    {
        relationshipStatus: "Single",
        weeklyAdded_Happiness: 0,
        happinessPoints: 0},
    {
        relationshipStatus: "Dating",
        weeklyAdded_Happiness: 1,
        happinessPoints: 10},
    {
        relationshipStatus: "Relationship",
        weeklyAdded_Happiness: 2,
        happinessPoints: 20},
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
        happinessPoints: 15}
    
];

const education = [
    {
    degree: "Basic",
    cost: 0,
    fakePrice: 0,
    happinessPoints: 0},

{
    degree: "College",
    cost: 250,
    fakePrice: 80,
    happinessPoints: 6},

{
    degree: "Bachelor",
    cost: 430,
    fakePrice: 130,
    happinessPoints: 12},

{
    degree: "Master",
    cost: 590,
    fakePrice: 180,
    happinessPoints: 18},

];

const rentHomes = [
    {
        rent: 182,
        homeName: "Lo-cost apartment",
        deposit: 120,
        happinessPoints: 0},
    {
        rent: 329,
        homeName: "Luxurious home",
        deposit: 249,
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
        description: "You will prepare fast food meals. This doesn't require work level or degree.",
        happinessPoinst: 5},

    {
        id: 2,
        worklevel: 0,
        job: "Cleaner",
        energyConsumption: 32,
        educationReq: 0,
        salary: 34,
        description: "You will clean what you're told. This doesn't require work level or degree.",
        happinessPoinst: 5},

    {
        id: 3,
        worklevel: 0,
        job: "Const. worker",
        energyConsumption: 48,
        educationReq: 0,
        salary: 48,
        description: "Hard work, somewhat good pay. This doesn't require work level or degree.",
        happinessPoinst: 5},

    {
        id: 10,
        worklevel: 0,
        job: "Garbage driver",
        energyConsumption: 40,
        educationReq: 0,
        salary: 43,
        description: "You'll collect all the garbage. This doesn't require work level or degree.",
        happinessPoinst: 5},

    {
        id: 11,
        worklevel: 0,
        job: "Postman",
        energyConsumption: 32,
        educationReq: 0,
        salary: 35,
        description: "This doesn't require work level or degree.",
        happinessPoinst: 4},

    {
        id: 12,
        worklevel: 0,
        job: "Factory worker",
        energyConsumption: 44,
        educationReq: 0,
        salary: 46,
        description: "This doesn't require work level or degree.",
        happinessPoinst: 3},

    {
        id: 13,
        worklevel: 0,
        job: "Street fundraising",
        energyConsumption: 10,
        educationReq: 0,
        salary: 17,
        description: "This doesn't require work level or degree.",
        happinessPoinst: 10},

    {
        id: 14,
        worklevel: 0,
        job: "Birthday clown",
        energyConsumption: 12,
        educationReq: 0,
        salary: 19,
        description: "This doesn't require work level or degree.",
        happinessPoinst: 11},


    //WORK LEVEL 1 -----------------------------------------------------------------------------------------------
    {
        id: 4,
        worklevel: 1,
        job: "Line manager",
        energyConsumption: 60,
        educationReq: 1,
        salary: 75,
        description: "Hard work, somewhat good pay. This requires work level 1 and college degree.",
        happinessPoinst: 8},

    {
        id: 5,
        worklevel: 1,
        job: "Receptionist",
        energyConsumption: 40,
        educationReq: 1,
        salary: 50,
        description: "You will work at the hotel reception. This requires work level 1 and college degree.",
        happinessPoinst: 7},

    {
        id: 6,
        worklevel: 0,
        job: "Tailor",
        energyConsumption: 43,
        educationReq: 1,
        salary: 54,
        description: "Your hands are your best tool. This doesn't require work level, but college degree.",
        happinessPoinst: 11},

    {
        id: 15,
        worklevel: 0,
        job: "Personal trainer",
        energyConsumption: 40,
        educationReq: 1,
        salary: 50,
        description: "This requires work level 1 and college degree.",
        happinessPoinst: 8},

    {
        id: 16,
        worklevel: 0,
        job: "Seller",
        energyConsumption: 49,
        educationReq: 1,
        salary: 61,
        description: "Sell! Sell! Sell! Sell! Sell! Seeeell! This requires work level 1 and college degree.",
        happinessPoinst: 4},
    

    //WORK LEVEL 2 -----------------------------------------------------------------------------------------------
    {
        id: 7,
        worklevel: 2,
        job: "Sales manager",
        energyConsumption: 62,
        educationReq: 2,
        salary: 93,
        description: "Your job is to sell as much as possible.This requires work level 2 and college degree.",
        happinessPoinst: 9},

    {
        id: 8,
        worklevel: 2,
        job: "Real estate agent",
        energyConsumption: 71,
        educationReq: 2,
        salary: 107,
        description: "You're the one who gives home to people. This requires work level 2 and college degree.",
        happinessPoinst: 5},

    {
        id: 9,
        worklevel: 1,
        job: "Content creator",
        energyConsumption: 52,
        educationReq: 2,
        salary: 78,
        description: "You create digital content you desire the most. This requires work level 1 and college degree.",
        happinessPoinst: 13},

    //WORK LEVEL 3 -----------------------------------------------------------------------------------------------

    {
        id: 19,
        worklevel: 3,
        job: "Factory manager",
        energyConsumption: 67,
        educationReq: 2,
        salary: 134,
        description: "This requires work level 3 and bachelor degree.",
        happinessPoinst: 5},

    {
        id: 20,
        worklevel: 3,
        job: "Coder",
        energyConsumption: 57,
        educationReq: 2,
        salary: 114,
        description: "This requires work level 3 and bachelor degree.",
        happinessPoinst: 10},

    {
        id: 21,
        worklevel: 3,
        job: "Pharmacist",
        energyConsumption: 60,
        educationReq: 2,
        salary: 120,
        description: "This requires work level 3 and bachelor degree.",
        happinessPoinst: 7},

    //WORK LEVEL 4 -----------------------------------------------------------------------------------------------

    {
        id: 22,
        worklevel: 4,
        job: "Lawyer",
        energyConsumption: 69,
        educationReq: 3,
        salary: 207,
        description: "This requires work level 4 and masters degree.",
        happinessPoinst: 7},

    {
        id: 23,
        worklevel: 4,
        job: "Factory director",
        energyConsumption: 64,
        educationReq: 3,
        salary: 192,
        description: "This requires work level 4 and masters degree.",
        happinessPoinst: 5},

    {
        id: 24,
        worklevel: 4,
        job: "Doctor",
        energyConsumption: 49,
        educationReq: 3,
        salary: 201,
        description: "This requires work level 4 and masters degree.",
        happinessPoinst: 10},

];

const onlineItems = [
    {
        itemId: 1,
        item: "Coffee mug",
        img: "./img/items/Item_CoffeeMugSprite.png",
        cost: 5,
        description: "Convenient coffee mug. Your coffee will taste better.",
        itemHappiness: 0},
    {
        itemId: 2,
        item: "Magnifying glass",
        img: "./img/items/Item_MagnifyingGlassSprite.png",
        cost: 16,
        description: "Your eyes will get blurry as you're growning older.",
        itemHappiness: 0},
    {
        itemId: 3,
        item: "Oil can",
        img: "./img/items/Item_OilCanSprite.png",
        cost: 35,
        description: "Some lubrication to the bearings and joints.",
        itemHappiness: 0},
    {
        itemId: 4,
        item: "Slingshot",
        img: "./img/items/Item_SlingShotSprite.png",
        cost: 20,
        description: "Do not aim to a neightbour's window!",
        itemHappiness: 0},
    {
        itemId: 5,
        item: "Leaf blower",
        img: "./img/items/Item_LeafBlowerSprite.png",
        cost: 120,
        description: "Take a control over leaves on your yard.",
        itemHappiness: 0},
    {
        itemId: 6,
        item: "Table fan",
        img: "./img/items/Item_TableFanSprite.png",
        cost: 39,
        description: "When it's hot, you'll need this.",
        itemHappiness: 0},
    {
        itemId: 7,
        item: "Excercise bike",
        img: "./img/items/Item_ExcerciseBikeSprite.png",
        cost: 190,
        description: "Get yourself to a good shape!",
        itemHappiness: 0},
    {
        itemId: 8,
        item: "Credit card",
        img: "./img/items/Item_CreditCardSprite.png",
        cost: 10,
        description: "Unlimited happiness. Maybe we counterfeited or maybe not.",
        itemHappiness: 0},
    {
        itemId: 9,
        item: "CPU",
        img: "./img/items/Item_ChipSprite.png",
        cost: 200,
        description: "Enhances the speed of your PC.",
        itemHappiness: 0},
    {
        itemId: 10,
        item: "Car battery",
        img: "./img/items/Item_CarBatterySprite.png",
        cost: 70,
        description: "Car battery full of energy.",
        itemHappiness: 0},
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
        itemHappiness: 0},
    {
        itemId: 13,
        item: "Chest",
        img: "./img/items/Item_ChestSprite.png",
        cost: 177,
        description: "Anchient chest. Very nice for the furnishing your home.",
        itemHappiness: 0},
    {
        itemId: 14,
        item: "Pieces of emerald",
        img: "./img/items/Item_EmeraldSprite.png",
        cost: 499,
        description: "Some nice jewelry.",
        itemHappiness: 5},
    {
        itemId: 15,
        item: "Cable",
        img: "./img/items/Item_CableSprite.png",
        cost: 20,
        description: "A cable to connect two devices to each other. No further information.",
        itemHappiness: 0},
    {
        itemId: 16,
        item: "Shovel",
        img: "./img/items/Item_ShovelSprite.png",
        cost: 16,
        description: "A shovel for your need.",
        itemHappiness: 0},
    {
        itemId: 17,
        item: "VCR",
        img: "./img/items/Item_VCRSprite.png",
        cost: 35,
        description: "A little bit older technology. Fully functional, if you don't use it",
        itemHappiness: 0},
    {
        itemId: 18,
        item: "VHS",
        img: "./img/items/Item_VHSSprite.png",
        cost: 55,
        description: "You'll never know, what you find on this tape. Excelusive material!",
        itemHappiness: 0},
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
    anime({
        targets: energyBar,
        width: currentPlayerAttributes.energyLevel*(barWidth/100),
        easing: 'linear',
        duration: 500

    });

    intoxicationText.innerHTML = 'Intoxication: '+ currentPlayerAttributes.intoxicationLevel*20 + "%";
    anime({
        targets: intoxicationBar,
        width: (currentPlayerAttributes.intoxicationLevel *20)*(barWidth/100),
        easing: 'linear',
        duration: 500

    });

    currentPlayerAttributes.playerWorkLevel == 0 ? jobObj.innerHTML = jobs[currentPlayerAttributes.currentWorkId].job : jobObj.innerHTML = "(" + currentPlayerAttributes.playerWorkLevel + ") " + jobs[currentPlayerAttributes.currentWorkId].job;
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

    currentPlayerAttributes.fakeEducation ? educationText.innerHTML = "<span style='color:red'>" + education[currentPlayerAttributes.educationId+1].degree + " (fake) </span>" : educationText.innerHTML = education[currentPlayerAttributes.educationId].degree;
    anime({
        targets: educationBar,
        width: (currentPlayerAttributes.educationProgress *20)*(barWidth/100),
        easing: 'linear',
        duration: 500

    });

    currentPlayerAttributes.moneyPoints > 0 ? moneyText.className = "UI_text scoreboard green" : moneyText.className = "UI_text scoreboard red";
    moneyText.innerHTML = currentPlayerAttributes.moneyPoints + '€ <span style="color:black; text-weight:500">' + jobs[currentPlayerAttributes.currentWorkId].salary + "€/day</span>";;
    

    if (currentPlayerAttributes.weeklyTime <= currentPlayerAttributes.illegalPostArrivingTime  && currentPlayerAttributes.showPostMessage ||
        currentPlayerAttributes.weeklyTime <= currentPlayerAttributes.itemPostArrivingTime  && currentPlayerAttributes.showPostMessage){
        // ShowTempMessage('A package in post! Go to mall to reclaim it.', 'package');
        GameEventMessage(`<span style="color:lime">A package in post! Go to mall to reclaim it.</span>`);
        


        currentPlayerAttributes.itemPackageInPost = true;
        currentPlayerAttributes.showPostMessage = false;
    }

    if (currentPlayerAttributes.weeklyTime <= currentPlayerAttributes.hitmanTarget_Time[1]){
        InitiateTheHit(currentPlayerAttributes.hitmanTarget_Time);
        GameEventMessage(`<span style="color:cyan">The hit has been delivered...</span>`);
        // ShowTempMessage(`Hit has been delivered.`, 'sms');
        currentPlayerAttributes.hitmanTarget_Time = [];
    }

    if (currentPlayerAttributes.weeklyTime <= currentPlayerAttributes.itemSellingTime && currentPlayerAttributes.itemSellingIdPrice.length > 1){

        GameEventMessage(`<span style="color:lime">You just sold your item with ${currentPlayerAttributes.itemSellingIdPrice[1]}€!.</span>`);
        // ShowTempMessage(`You just sold your item with ${currentPlayerAttributes.itemSellingIdPrice[1]}€!.`, 'money');
        currentPlayerAttributes.moneyPoints += currentPlayerAttributes.itemSellingIdPrice[1];
               
        var tempIndex = currentPlayerAttributes.currentItems.findIndex(number => number == currentPlayerAttributes.itemSellingIdPrice[0]); //search for item index in current item list
        currentPlayerAttributes.currentItems.splice(tempIndex, 1); //remove item from current item list
        
        currentPlayerAttributes.itemSellingIdPrice = []; //empty list
        RandomizeItemPrices();
        UpdateBarAndTexts();
    }

    if (currentPlayerAttributes.weeklyTime < currentPlayerAttributes.policeAlertTime){
        
        CheckPlayerIllegalActions();
        currentPlayerAttributes.policeAlertTime = null;
    }

    ManageScoreBoard_Images();
    OpponentUpdates();
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

        case 'money':
            tempInfo.innerHTML = `<div class="twoColumns20-80">
                                    <div class="basicCell"><img src="./img/icons/Icon_MoneySprite.png" height="40px"></div> 
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

function ReduceTime_Check(decreaseTimeAmount){

    currentPlayerAttributes.weeklyTime -= decreaseTimeAmount;
    
    if (currentPlayerAttributes.weeklyTime <= 0){
        
        
        currentPlayerAttributes.weeklyTime = 0;
        
        ManageMoveButtons('weekChange');
        $(infoboxObj).slideUp(500);

        OpponentEndOfWeek();
        


        //randomize something to upcoming week.
        //if worked too much, feel sick and take some time away
    }

    ColorTimeBar(currentPlayerAttributes.weeklyTime, timeProgressBar);
    
    anime({
        targets: timeProgressBar,
        width: Math.ceil(currentPlayerAttributes.weeklyTime/weeklytimeToCompare*barWidth),
        easing: 'linear',
        duration: 500

    });


    monthlyTimeText.innerHTML = "Time: " + Math.ceil((currentPlayerAttributes.weeklyTime/weeklytimeToCompare)*100) + "%";
    weekText.innerText = "Week # " + currentPlayerAttributes.weekNumber;

    
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

    // if (currentPlayerAttributes.happinessTotal < 0){
        // currentPlayerAttributes.happinessTotal = 0;
    // }

}



//EXECUTED FROM game.js // TEXTS
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
                                        <div id="rentHouse_text" class="optiontext green">Rent this apartment. Apparentment deposit is ${rentHomes[0].deposit}€, which you have to pay right away. Rent is ${rentHomes[0].rent}€/month. The apartment is very nice though.</div>
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
                                            <div id="rentHouse_text" class="optiontext green">Rent this apartment. Deposit is ${rentHomes[1].deposit}€. Addition to this rently fee is ${rentHomes[1].rent}€</div>
                                            </div>`;
                }

                else {
                    infoboxObj.innerHTML += `<br>
                                                <div class="optiontext red">These no available appartments</div>`;
                }
            }

        break;

        case "Bar":
            infoboxObj.className = "infoboxBase";
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
            
            if (currentPlayerAttributes.randomForRenting == 1 && currentPlayerAttributes.barGig){
                infoboxObj.innerHTML += `<div class="twoColumns40-60">
                                        <div class="basicCell"><button class="btn yellow" onclick="BarAction('gig')">Go to gig!</button></div>
                                        <div id="gig_bartext" class="optiontext green">There is a gig downstairs. This is the most popular band in town. The tickets cost 59€/pcs.</div>
                                        </div>`;

            }

            if (currentPlayerAttributes.randomForRenting == 2 && !currentPlayerAttributes.barShiftDone){
                infoboxObj.innerHTML += `<div class="twoColumns40-60">
                                        <div class="basicCell"><button class="btn green" onclick="BarAction('blocking')">Work!</button></div>
                                        <div id="gig_bartext" class="optiontext green">If you are unemployed, This n' that BAR offers you to do a work shift at bar. You'll get ${barBlockerPay}€.</div>
                                        </div>`;

            }

                


        break;

        case "Mall":
            infoboxObj.className = "infoboxBase";
            infoboxObj.innerHTML = `<div class="UI_text center">
                                    <img src="./img/building_texts/In_MallImg.png" width="${infoboxWidth}px">
                                    </div>
                                    <div class="text-topic"><span style='color:cyan'>The Mall</span></div>
                                    <div class="UI_text description">Everything you need and little bit more.</div>
                                    <div class="oneColumn border"></div>
                                    <br>
                                         
                                    <div class="UI_text middleTopic"><span style='color:cyan'>Barber - beauty saloon</span></div>
                                    <div class="twoColumns40-60">
                                        <div class="basicCell"><button class="btn" onclick="MallActions('beauty')">Go for it</button></div>
                                        <div id="xx" class="optiontext green">Makes you more appealing. Cost ${beautyPrice}€.</div>
                                    </div>

                                    <br>

                                    <div class="UI_text middleTopic"><span style='color:cyan'>Massage house</span></div>
                                    <div class="twoColumns40-60">
                                        <div class="basicCell"><button class="btn yellow" onclick="MallActions('massage')">To massage</button></div>
                                        <div id="mall_coffeehouse" class="optiontext green">Get a massage for ${massagePrice}€. You'll be happier and feeling more energetic.</div>
                                    </div>

                                    <br>

                                    <div class="UI_text middleTopic"><span style='color:cyan'>Movie theater</span></div>
                                    <div class="twoColumns40-60">
                                        <div class="basicCell"><button class="btn yellow" onclick="MallActions('movie')">To movies</button></div>
                                        <div id="mall_moviestext" class="optiontext green">Go and watch a random movie. The cost is ${moviePrice}€. If you like the movie, you might supprise quite a bit.</div>
                                    </div>

                                    <br>

                                    <div class="UI_text middleTopic"><span style='color:cyan'>Kiosk</span></div>
                                    <div class="twoColumns40-60">
                                        <div class="basicCell"><button class="btn" onclick="MallActions('lottery')">Buy</button></div>
                                        <div id="mall_kiosktext" class="optiontext green">Buy a lottery ticket or even couple of them. The odds are good.. of course. The cost is ${lotteryPrice}€/ticket.</div>
                                    </div>

                                    <br>

                                    <div class="UI_text middleTopic"><span style='color:cyan'>Petstore</span></div>
                                    `;


            if (currentPlayerAttributes.petID == 0){
             infoboxObj.innerHTML += `
                                    <div class="twoColumns40-60">
                                        <div class="basicCell"><button class="btn" onclick="PetStoreAction('acquire')">Acquire</button></div>
                                        <div id="xx" class="optiontext green">This is adorable little fellow! Remember you have to take good care of it. Acquire price is ${pets[1].petAcquireCost}€. You'll get also 2 weeks of food.</div>
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
                                        <div class="basicCell"><button class="btn" onclick="PetStoreAction('petfood')">Buy</button></div>
                                        <div id="xx" class="optiontext green">You need to feed your pet. Only ${pets[1].petFoodCost}€ for 2 weeks!</div>
                                    </div>

                                    <br>

                                    <div class="UI_text middleTopic"><span style='color:cyan'>Post office</span></div>
                                  

                                    `;
            
            if (currentPlayerAttributes.itemPackageInPost){
                infoboxObj.innerHTML += `
                                        <div class="twoColumns40-60">
                                            <div class="basicCell"><button class="btn green" onclick="MallActions('postPackage')">Reclaim</button></div>
                                            <div id="xx" class="optiontext green">Here's something you ordered.
                                                <div class="basicCell"><img src="./img/icons/PostPackageSprite.png" height="40px"></div>
                                            </div>
                                        </div>

                                        <br>
                                        `;
            }

            if (!currentPlayerAttributes.itemPackageInPost){
                infoboxObj.innerHTML += `
                                        <div class="twoColumns40-60">
                                        
                                        <div></div>
                                        <div class="optiontext orange">Nothing for you at the moment.</div>    
                                        </div>

                                        <br>
                                        `;

            }
            if(currentPlayerAttributes.weeklyUnemployedPay){
                infoboxObj.innerHTML += `<div class="UI_text middleTopic"><span style='color:cyan'>Unemployment office</span></div>

                                        <div class="twoColumns40-60">
                                            <div class="basicCell"><button class="btn green" onclick="MallActions('unemployment')">Reclaim</button></div>
                                            <div id="xx" class="optiontext green">If you are unemployed, government grants you unemployment benefit. It's  ${unemploymentBenefit}€/week.</div>
                                        </div>

                                        
                                        `;
            }



        break;
        
        case "Forest":
            infoboxObj.className = "infoboxBase";
            infoboxObj.innerHTML =  `<div class="UI_text center">
                                    <img src="./img/building_texts/In_ForestImg.png" width="${infoboxWidth}px">
                                    </div>
                                    <div class="text-topic"><span style='color:green'>Forest</span></div>
                                    <div class="UI_text description">Here's where your soul rests.</div>
                                    <div class="oneColumn border"></div>
                                    <br>
                                    

                                    <div class="twoColumns40-60">
                                        <div class="basicCell"><button class="btn yellow" onclick="ForestAction()">Wander</button></div>
                                        <div id="forestText" class="optiontext green">Forest is a source of happiness.</div>
                                    </div>
                                    <br>
                                    <div class="UI_text description">
                                    I understand my comrades of the woods, And they know me completely. Not an oak
                                    But is my brother, strong, reserved, sincere. Along the happy, peaceful forest ways
                                    That wind so intimately through the trees I hold a calm communion with my friends,
                                    The pines and gentle birches. </div>
                                    `;
        
        break;



        case "School":
            infoboxObj.className = "infoboxBase";
            infoboxObj.innerHTML = `<div class="UI_text center">
                                    <img src="./img/building_texts/In_SchoolImg.png" width="${infoboxWidth}px">
                                    </div>
                                    <div class="text-topic"><span style='color:navajowhite'>School and library</span></div>
                                    <div class="UI_text description">This is the place where knowledge lives in.</div>
                                    
                                    <div class="oneColumn border"></div>
                                    <br>
                                    
                                    <div class="twoColumns40-60">
                                    <div class="basicCell"><button class="btn yellow" onclick="SchoolAction('library')">Library</button></div>
                                    <div id="schoolText" class="optiontext green">Ready a book or magazine. Spend restful time in total peace.</div>
                                    </div>
                                    `;


                                if (currentPlayerAttributes.educationId < 3 && !currentPlayerAttributes.educationEnroll){
                                    infoboxObj.innerHTML +=  
                                    `<div class="twoColumns40-60">
                                        <div class="basicCell"><button class="btn" onclick="SchoolAction('school')">Enroll</button></div>
                                    <div id="educationEnroll_text" class="optiontext green">Enroll to ${education[currentPlayerAttributes.educationId+1].degree} with ${education[currentPlayerAttributes.educationId+1].cost}€.</div>
                                    </div>
                                    `;
                                }
                                
                                else if (currentPlayerAttributes.educationEnroll){
                                    infoboxObj.innerHTML +=  
                                    `<div class="twoColumns40-60">
                                        <div class="basicCell"><button class="btn" onclick="SchoolAction('school')">Study</button></div>
                                    <div id="educationEnroll_text" class="optiontext green">Study study hard!</div>
                                    </div>
                                    `;
                                }

                                else{
                                    infoboxObj.innerHTML += `<div class="optiontext green">Nothing for you any. You are total master! </div>`;
                                }
        break;


        case "Sports":
            infoboxObj.className = "infoboxBase";
            infoboxObj.innerHTML = `<div class="UI_text center">
                                    <img src="./img/building_texts/In_SportsImg.png" width="${infoboxWidth}px">
                                    </div>
                                    <div class="text-topic"><span style='color:salmon'>Sports center</span></div>
                                    <div class="UI_text description">Pump up your muscles and spirit! Ugh..</div>
                                    <div class="oneColumn border"></div>
                                    <br>
                                    
                                    
                                    <div class="twoColumns40-60">
                                        <div class="basicCell"><button class="btn green" onclick="SportsAction('sports')">Gym</button></div>
                                        <div id="sports_gymText" class="optiontext green">Get some muscles pencil neck. You feel much happier after that.</div>
                                    </div>


                                    <div class="twoColumns40-60">
                                        <div class="basicCell"><button class="btn green" onclick="SportsAction('yoga')">Yoga</button></div>
                                    <div id="sports_yogaText" class="optiontext green">Yoga is the best for you mentally.</div>
                                </div>

                                <div class="twoColumns40-60">
                                <div class="basicCell"><button class="btn green" onclick="SportsAction('sauna')">Sauna</button></div>
                                    <div id="sports_swimText" class="optiontext green">Spend some time in sauna. It reduces your work stress!</div>
                                </div>

                                `;

        break;

        case "Church":
            infoboxObj.className = "infoboxBase";
            infoboxObj.innerHTML = `<div class="UI_text center">
                                <img src="./img/building_texts/In_ChurchImg.png" width="${infoboxWidth}px">
                                </div>
                                <div class="text-topic"><span style='color:darkseagreen'>Church</span></div>
                                <div class="UI_text description">Hopefully you will find something you are looking for(?)</div>
                                <div class="oneColumn border"></div>
                                <br>
                                
                                <div class="twoColumns40-60">
                                <div class="basicCell"><button class="btn yellow" onclick="ChurchAction('leap')">Take it!</button></div>
                                    <div id="xx" class="optiontext green">This is a leap of faith! You might be happier or less happier after this.</div>
                                </div>

                                <br>

                                <div class="twoColumns40-60">
                                <div class="basicCell"><button class="btn yellow" onclick="ChurchAction('volunteer')">Volunteer!</button></div>
                                    <div id="church_volunteerText" class="optiontext green">Do some charity work. This takes time and energy, but gives you back a lot of happiness. You have to be unemployed to participate.</div>
                                </div>
                                `;
        break;
    }


    $(infoboxObj).slideDown(400);

    
}

//HOME ACTIONS------------------------------------------------------------------------------------------------
function EnteringHome(){ //entering some of the homes

    if (currentPlayerAttributes.homeID == 0){
        infoboxObj.innerHTML = `<div class="UI_text center">
                                <img src="./img/building_texts/Home_Image.png" width="${infoboxWidth}px">
                                </div>
                                <div class="text-topic"><span style='color:sienna'>Lo-cost apartment</span></div>
                                <div class="UI_text description">This is where some people live.</div>
                                <div class="oneColumn border"></div>
                                <br>`
        infoboxObj.className = "infoboxBase";

    }
    
    

    if (currentPlayerAttributes.homeID == 1){
        infoboxObj.innerHTML = `<div class="UI_text center">
                                <img src="./img/building_texts/In_HomeBetterImg.png" width="${infoboxWidth}px">
                                </div>
                                <div class="text-topic"><span style='color:peachpuff'>Luxurious apartment</span></div>
                                <div class="UI_text description">This is where successful people live.</div>
                                <div class="oneColumn border"></div>
                                <br>`
        infoboxObj.className = "infoboxBase lux";

    }

    infoboxObj.innerHTML += `<div class="twoColumns40-60">
                                <div class="basicCell">${AddHomeStuffButton("Rest", 'sleep')}</div>
                                <div class="optiontext green" id="sleeptext_home">Take a rest and increase your energy.</div>
                            </div>`;

    //COPY THE LIST
    if(randomizeNewOnlineContent){
        randomizedOnlineItems = [];
        let tempCopyItemList =[];
        onlineItems.forEach(item => {
            tempCopyItemList.push(item);
    })
        
    
    
        //randomize new prices

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
        
        RandomizeItemPrices();
        RandomizeJobs();


        randomizeNewOnlineContent = false;
    }



    Show_AdditionalHomeActions();
    Show_ItemsAtHome();
    

    // <div class="twoColumns40-60">
    // <div class="basicCell">${AddHomeStuffButton("Test test", 'tinder')}</div>
    // <div class="optiontext magenta">Try to hook up with someone.</div>
    // </div>

    //Basic home activities
    infoboxObj.innerHTML += `<div class="UI_text middleTopic">World wide web</div>


                            <div class="twoColumns40-60">
                                <div class="basicCell"><button class="btn yellow" onclick="ActionsAtHome('internettime')">Web leisure</button></div>
                                <div id="internet_home" class="optiontext green">Spend some quality time in internet.</div>
                            </div>

                            <div class="twoColumns40-60">
                                <div class="basicCell">${AddHomeStuffButton("Trading", 'orderonline')}</div>
                                <div class="optiontext green">You'll find items people selling at www.somestuff.com</div>
                            </div>

                            <div class="twoColumns40-60">
                                <div class="basicCell">${AddHomeStuffButton("Jobs", 'checkonlinejobs')}</div>
                                <div class="optiontext green">You'll find available jobs at www.somejobs.com</div>
                            </div>


                            `;


    Show_DarkWeb_PoliceActions();



    function Show_AdditionalHomeActions(){

        
        if (currentPlayerAttributes.currentWorkId != 0 || currentPlayerAttributes.rentToDue || currentPlayerAttributes.petID != 0 && currentPlayerAttributes.petWeeklyDue || currentPlayerAttributes.relationshipID > 1){
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

            if (currentPlayerAttributes.relationshipID > 1){
                infoboxObj.innerHTML += `   <div class="twoColumns40-60">
                                            <div class="basicCell"><button class="btn" onclick="RelationshipAction()">Relationship</button></div>
                                            <div class="optiontext green" id="relationship_walkTxt">Spend time with your partner. Have nice long walk, make a nice meal, watch a romantic movie.</div>
                                            </div>
                
                                        `;
            }

            infoboxObj.innerHTML += `<br>`;
        }
    }

    function Show_ItemsAtHome(){

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


    }

    function Show_DarkWeb_PoliceActions(){
        if (numberOfPlayersForGame > 1){                                                                        //change to 1!!!!!!!!!!!
            infoboxObj.innerHTML +=  `<div class="twoColumns40-60">
                                        <div class="basicCell"><button class="btn darknet" onclick="ActionsAtHome('darknet')">Dark web</button></div>
                                        <div class="optiontext orange">In the otherside of the law. www.darknet.com</div>
                                    </div>
                                    <br>`

            if (currentPlayerAttributes.policeAlertTime == null){
                infoboxObj.innerHTML +=  `<div class="twoColumns40-60">
                                            <div class="basicCell"><button class="btn police" onclick="ActionsAtHome('police')">Tip off</button></div>
                                            <div id="police_text" class="optiontext blueish">You can tip the officals, if you have a doubt something illegal is happening at the moment. The investigation will take a little time.</div>
                                        </div>
                                        `;

            }
            else{
                infoboxObj.innerHTML +=  `<div class="twoColumns40-60">
                                        <div class="basicCell"></div>
                                        <div id="police_text" class="optiontext blueish">Investigation currently running...</div>
                                        </div>
                                        `;
            }

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
            // if (currentPlayerAttributes.happinessPoints < 20){ currentPlayerAttributes.happinessPoints += 3; }
            
            if (currentPlayerAttributes.energyLevel < (75 + currentPlayerAttributes.currentYogaEnhancer)){ 
                AddEnergy(5+currentPlayerAttributes.exerciseLvl); 
            }
            
            if (currentPlayerAttributes.jobIdPending){
                ChooseDirection('Home');
            }

            ReduceTime_Check(3); //executes also update function
            break;

        case 'tinder':
            //consumes time and add longterm happiness possibility
            OpponentEvents('is checking the tinder.');
            // currentPlayerAttributes.happinessPoints = 100;
            ReduceTime_Check(60); //executes also update function 3
            
            break;

        case 'internettime':
                        
            if (currentPlayerAttributes.internetHappiness > 0){ 
                currentPlayerAttributes.internetHappiness--;
                currentPlayerAttributes.happinessPoints++; 
            }

            const randomMessage = Math.floor(Math.random()*3)

            if(randomMessage == 0){
                document.getElementById('internet_home').innerHTML = "Hehee.. funny cat videos...";
                OpponentEvents('is laughing at cat videos...');
            }

            if (randomMessage == 1){
                document.getElementById('internet_home').innerHTML = "Hehee.. russian drivers";
                OpponentEvents('is laughing at russian drivers..');
            }

            if (randomMessage == 2){
                document.getElementById('internet_home').innerHTML = "Hehee.. weird internet videos..";
                OpponentEvents('is laughing at weird internet videos...');
            }
            
            if (currentPlayerAttributes.jobIdPending){
                ChooseDirection('Home');
            }

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

                if (currentPlayerAttributes.workExperience > workExperienceRequired && currentPlayerAttributes.playerWorkLevel < 4){
                    currentPlayerAttributes.playerWorkLevel++;
                    currentPlayerAttributes.workExperience = 0;
                    GameEventMessage(`<span style="color:lime">You're more experienced now. Maybe you should applying for more demanding jobs.</span>`);
                    // ShowTempMessage("You're more experienced now. Maybe you should applying for more demanding jobs.", 'sms')
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
            if (currentPlayerAttributes.weeklyTime >= pets[currentPlayerAttributes.petID].weeklyPetTime){
                
                currentPlayerAttributes.happinessPoints += 1;
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
                GameEventMessage(`<span style="color:lime">The rent transaction was carried out successfully.</span>`);
                // ShowTempMessage('The payment transaction was successful.', 'sms');
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
                                    <div class="UI_text description">You can sell the items you own. The prices do vary between different times.</div>
                                    <div class="oneColumn border"></div>
                                    
                                    `;
            
            if (currentPlayerAttributes.itemSellingIdPrice.length == 0){
                for (var i = 0; i < currentPlayerAttributes.currentItems.length; i++){
                    infoboxObj.innerHTML += `<div class="columns30-30-30">
    
                    <div class="optiontext yellow">${onlineItems[startingAttributes.currentItems[i]].item}<br>Original cost: ${onlineItems[startingAttributes.currentItems[i]].cost}€</div>
                    <div class="basicCell"><img src="${onlineItems[startingAttributes.currentItems[i]].img}" height="80px"></div>
                    <div class="basicCell"><button class="btn green" onclick="SellItem(${onlineItems[startingAttributes.currentItems[i]].itemId},${currentPlayerAttributes.currentItemPrices[i]})">Sell for ${currentPlayerAttributes.currentItemPrices[i]}€</button></div>
                    
                    </div>
                    `;
    
                }

            }
            else{
                infoboxObj.innerHTML += `<br>
                                            <div class="UI_text description">You have item sell currently pending.</div>`
                                            ;
            }


            
            break;


        case 'darknet':   
                OpenDarkNet();
        
            break;
            
        case 'police':   

            currentPlayerAttributes.policeAlertTime = currentPlayerAttributes.weeklyTime - 15;
            if (currentPlayerAttributes.policeAlertTime < 0){
                currentPlayerAttributes.policeAlertTime = 1;
            }
            EnteringHome();

            break;
    }


};

//ONLINE JOBS---------------------------------------------------------------------------------------------------
function OpenOnlineJobs(){

    infoboxObj.className = "infoboxBase net";
    infoboxObj.innerHTML = `<div class="browserBase">${AddHomeButton('<img src="./img/icons/Button_Back.png" height="20px">','Home')}<div class="browser">http://www.somejobs.com</div></div>
                            <br>`;
    infoboxObj.scrollTop = 0;

    if (currentPlayerAttributes.showJobs){
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

        const fakeEducationLvl = currentPlayerAttributes.fakeEducation ? 1 : 0;  // if fake education

        //different color, if worklevel is too high
        if (currentPlayerAttributes.playerWorkLevel < allwork.worklevel || (currentPlayerAttributes.educationId + fakeEducationLvl) < allwork.educationReq) {
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





//ONLINE SHOPPING------------------------------------------------------------------------------------------------
function OpenOnlineShop(){

    infoboxObj.className = "infoboxBase net";
    infoboxObj.innerHTML = `<div class="browserBase">${AddHomeButton('<img src="./img/icons/Button_Back.png" height="20px">','Home')}<div class="browser">http://www.somestuff.com/</div></div>
                            <br>`;
    infoboxObj.scrollTop = 0;

    if (currentPlayerAttributes.itemIdToReclaim == null){
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

//OPEN DARKNET----------------------------------------------------------------------------------------------
function OpenDarkNet(){

    infoboxObj.className = "infoboxBase darknet";
    infoboxObj.innerHTML = `<div class="browserBase">${AddHomeButton('<img src="./img/icons/Button_Back.png" height="20px">','Home')}<div class="browser">http://www.darknet.com/</div></div>
                            <br>
                            <div class="UI_text description"><span style="font-weight:900">Disclamer:</span> All of these illegal activities may be reported to police by someone and then you are on your own.</div>  `;
    infoboxObj.scrollTop = 0;

    if (currentPlayerAttributes.illegalIdToReclaim == null){ //time to deliver these illegal things

    infoboxObj.innerHTML += `<div class="twoColumns40-60">
                                <div class="basicCell"><button class="btn" onclick="BuyFake('education')">Buy!</button></div>
                                <div class="optiontext orange" id="xx">Selling a fake degree for ${education[currentPlayerAttributes.educationId+1].degree}. You'll receive it nearest post office. It only costs 
                                ${education[currentPlayerAttributes.educationId+1].fakePrice}€. </div>
                            </div>
                            
                            <br>

                            <div class="twoColumns40-60">
                                <div class="basicCell"><button class="btn" onclick="BuyFake('drugs')">Buy!</button></div>
                                <div class="optiontext orange" id="xx">Selling some 'enhancers' to double your studying speed. Do not get caught. Price ${drugsPrice}€</div>
                            </div>

                            <br>
                            <div class="twoColumns40-60">
                                <div class="basicCell">
                                ${HitmanOrder()}
                                
                                </div>
                                <div class="optiontext orange" id="hitman_text">Hire an anonymous to cause some trouble one of the target(s) mentioned left. I'll take the whole payment at once. The cost is ${hitmanPrice}€/target.</div>
                            </div>
                            `;

                            
    }

    else{
        infoboxObj.innerHTML = `<div class="browserBase">${AddHomeButton('<img src="./img/icons/Button_Back.png" height="20px">','Home')}<div class="browser">http://www.darknet.com/order#432s42</div></div>
                                <br><div class="UI_text description">What do you want? <br><br>
                                The delivery is on its way.<br><br>

                                Don't try to contact me a meanwhile.<br>

                                <br>
                                -the man
                                </div>`;
    }

    ReduceTime_Check(1);

    function HitmanOrder(){

        if (opponentName.length == 1){
            return `<button class="btn" onclick="OrderHitman('${opponentId[0]}')">Target ${opponentName[0]}</button>`;

        }

        else if (opponentName.length == 2){
            return `<button class="btn" onclick="OrderHitman('${opponentId[0]}')">${opponentName[0]}</button><br><br>
                    <button class="btn" onclick="OrderHitman('${opponentId[1]}')">${opponentName[1]}</button>`;
        }

    }

};

//FOREST---------------------------------------------------------------------------------------------------
function ForestAction(){
    if (currentPlayerAttributes.forestHappiness > 0 && currentPlayerAttributes.weeklyTime >= 10){
        const forestText = document.getElementById('forestText');
        forestText.innerHTML = "You feel so much happier."
        OpponentEvents("wanders in woods." );
        currentPlayerAttributes.forestHappiness--;
        currentPlayerAttributes.happinessPoints++;
        ReduceTime_Check(10);
    }
};

//MALL---------------------------------------------------------------------------------------------------
function MallActions(action){

    switch (action){
        case 'postPackage':
            if (currentPlayerAttributes.itemPackageInPost){

                if (currentPlayerAttributes.itemIdToReclaim != null){
                    currentPlayerAttributes.currentItems.push(FindWithAttr(onlineItems, "itemId", currentPlayerAttributes.itemIdToReclaim)); //adding to player inventory
                }
                
                if (currentPlayerAttributes.illegalIdToReclaim != null){

                    if (currentPlayerAttributes.illegalIdToReclaim == 'education'){ currentPlayerAttributes.fakeEducation = true; }
                    else if (currentPlayerAttributes.illegalIdToReclaim == 'drugs'){ currentPlayerAttributes.drugs += 5; }
                }

                currentPlayerAttributes.illegalIdToReclaim = null;
                currentPlayerAttributes.itemIdToReclaim = null;
                currentPlayerAttributes.itemPackageInPost = false;
                UpdateBarAndTexts();
                ChooseDirection('Mall');
            }
        
        
            break;

        case 'beauty':
            if (currentPlayerAttributes.beautyFactor == 0 && currentPlayerAttributes.moneyPoints >= beautyPrice) {
                currentPlayerAttributes.moneyPoints -= beautyPrice;
                currentPlayerAttributes.beautyFactor += 5;
                currentPlayerAttributes.happinessPoints++;
                OpponentEvents('trying to look good.');
            }
            ReduceTime_Check(5);
            break;

        case 'massage':
            if (currentPlayerAttributes.mallActions != 0 && currentPlayerAttributes.moneyPoints >= massagePrice) {
                currentPlayerAttributes.moneyPoints -= massagePrice;
                currentPlayerAttributes.energyLevel += 20;
                currentPlayerAttributes.mallActions--;
                currentPlayerAttributes.happinessPoints++;

                OpponentEvents('is having a massage...');
                document.getElementById('mall_coffeehouse').innerHTML = "You feel happier after massage and more energetic!";
                ReduceTime_Check(6);
            }
            
            break;

        case 'movie':
            if (currentPlayerAttributes.mallActions != 0 && currentPlayerAttributes.moneyPoints >= moviePrice) {

                currentPlayerAttributes.moneyPoints -= moviePrice;
                currentPlayerAttributes.mallActions--;
                
                OpponentEvents('went to movies...');

                const mall_moviestext = document.getElementById('mall_moviestext');

                const randomPoints = Math.floor(Math.random()*2)
                if (randomPoints == 1){
                    currentPlayerAttributes.happinessPoints += 2;
                    mall_moviestext.className = "optiontext green";
                    mall_moviestext.innerHTML = "The movie was great! Ah.. what a great experience.";
                }
                else{
                    currentPlayerAttributes.happinessPoints--;
                    mall_moviestext.className = "optiontext red";
                    mall_moviestext.innerHTML = "The movie sucked! You felt screwed...";
                }
                ReduceTime_Check(5);
            }
            
        break;


        case 'lottery':
            if (currentPlayerAttributes.moneyPoints >= lotteryPrice) {

                currentPlayerAttributes.moneyPoints -= lotteryPrice;
                currentPlayerAttributes.lotteryTickets++;
                
                OpponentEvents('is buying some lottery tickets...');

                
                ReduceTime_Check(0);
            }
            
        break;

        case 'unemployment':
            if (currentPlayerAttributes.weeklyUnemployedPay && currentPlayerAttributes.currentWorkId == 0) {

                currentPlayerAttributes.weeklyUnemployedPay = false;
                currentPlayerAttributes.moneyPoints += unemploymentBenefit;
                
                // ShowTempMessage(`You just received ${unemploymentBenefit}€ as government unemployment benefit.`, 'money');
                GameEventMessage(`<span style="color:lime">You just received ${unemploymentBenefit}€ as government unemployment benefit.</span>`);
                ReduceTime_Check(0);
                ChooseDirection('Mall');
            }
            
        break;
        
    }
    
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
                
                
            if (rand1 == 5 && currentPlayerAttributes.relationshipID == 1 && currentPlayerAttributes.intoxicationLevel != 5 && currentPlayerAttributes.intoxicationLevel != 4) {
                const sosializeText = document.getElementById('sosialize_bar');
                sosializeText.innerHTML = 'You found some company!';
                sosializeText.className = 'optiontext magenta';
                currentPlayerAttributes.relationshipID = 2;
                currentPlayerAttributes.relationshipStrenght = 3;
                GameEventMessage('<span style="color:magenta">You met someone!</span>');
                // ShowTempMessage('You met someone.', 'relationship');
                OpponentEvents('met someone.');
            }
            else{
                OpponentEvents('is trying to talk to people..');
            }
            
            ReduceTime_Check(4); //executes also update function
            break;
        
        case 'dance':
            const rand2 = Math.floor(Math.random()*(27 + currentPlayerAttributes.intoxicationLevel - Math.floor(1.5*currentPlayerAttributes.beautyFactor)  - currentPlayerAttributes.educationId));
            
            if (rand2 == 5 && currentPlayerAttributes.relationshipID == 1 && currentPlayerAttributes.intoxicationLevel != 5 && currentPlayerAttributes.intoxicationLevel != 4){
                const danceText = document.getElementById('dance_bar');
                danceText.innerHTML = 'You were able charm someone with your dancing!';
                danceText.className = 'optiontext magenta';
                currentPlayerAttributes.relationshipID = 2;
                currentPlayerAttributes.relationshipStrenght = 3;
                // ShowTempMessage('You met someone.', 'relationship');
                GameEventMessage('<span style="color:magenta">You met someone!</span>');
                OpponentEvents('met someone.');
            }
            else{
                OpponentEvents('is showing some dance moves!');
            }
            

            ReduceTime_Check(4); //executes also update function
            break;

        case 'gig':
            

            if (currentPlayerAttributes.moneyPoints >= 59 && currentPlayerAttributes.barGig){
                currentPlayerAttributes.moneyPoints -= 59;
                currentPlayerAttributes.happinessPoints += 4;
                currentPlayerAttributes.barGig = false;
                
                const rand2 = Math.floor(Math.random()*(10 + currentPlayerAttributes.intoxicationLevel - Math.floor(currentPlayerAttributes.beautyFactor)  - currentPlayerAttributes.educationId));
                
                if(rand2 == 0 && currentPlayerAttributes.relationshipID == 0 && currentPlayerAttributes.intoxicationLevel != 5 && currentPlayerAttributes.intoxicationLevel != 4){
                    currentPlayerAttributes.relationshipID = 2;
                    currentPlayerAttributes.relationshipStrenght = 3;
                    OpponentEvents('met someone.');
                    GameEventMessage('<span style="color:magenta">What great gig and you met someone!</span>');
                    // ShowTempMessage("What great gig and you met someone!", 'sms');
                }

                else{
                    GameEventMessage(`<span style="color:green">What great gig, but you didn't meet anyone special! You happiness increased by 4.</span>`);
                    // ShowTempMessage("What great gig, but you didn't meet anyone special!", 'sms');
                }
                
                ReduceTime_Check(5);
            }
            else{
                
                gig_bartext.innerHTML = "You don't have this kind of money. Go away!";
                gig_bartext.className= "optiontext red";
            }
        ChooseDirection('Bar');

        break;

        case 'blocking':
            if (currentPlayerAttributes.currentWorkId == 0 && !currentPlayerAttributes.barShiftDone){

                currentPlayerAttributes.moneyPoints += barBlockerPay;
                currentPlayerAttributes.barShiftDone = true;
                GameEventMessage(`<span style="color:lime">You made ${barBlockerPay}€ by doing a shift at This n' that BAR!</span>`);
                // ShowTempMessage("You received some money by doing one shift at This n' that BAR!", 'money')
                ReduceTime_Check(5);
                ChooseDirection('Bar');
            }

            break;
    }


    // UpdateBarAndTexts();
};

//RELATIONSHIP-----------------------------------------------------------------------------------------
function RelationshipAction(){
    
    
        
    const relationship_walkTxt = document.getElementById('relationship_walkTxt');
    relationship_walkTxt.innerHTML = "You spend a nice time with your partner, walking outside, cooking a nice meal and doing all kinds of nice things together...";
    relationship_walkTxt.className = "optiontext magenta";
    currentPlayerAttributes.relationshipStrenght++;
    // currentPlayerAttributes.moneyPoints -= 5;
    // currentPlayerAttributes.happinessPoints++;
    
    ReduceTime_Check(18);
            
    
        // case 'relationship_restaurant':
        //     if (currentPlayerAttributes.moneyPoints >= 120){
        //         currentPlayerAttributes.relationshipStrenght +=2;
        //         currentPlayerAttributes.moneyPoints -= 120;
        //         // ShowTempMessage('Very romantic lunch. The cost was 80€ and good stable relationship.', 'relationship');
        //         ReduceTime_Check(7);
        //     }
            
        //     break;

    // if (currentPlayerAttributes.relationshipStrenght > 7){
    //     currentPlayerAttributes.happinessPoints++;
    // }


    
    if (currentPlayerAttributes.relationshipStrenght > 9 && currentPlayerAttributes.relationshipID == 2){

        currentPlayerAttributes.relationshipID++;
        currentPlayerAttributes.relationshipStrenght = 3;
    }

    else if (currentPlayerAttributes.relationshipStrenght > 8 && currentPlayerAttributes.relationshipID == 3){
        currentPlayerAttributes.relationshipStrenght = 9;
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
                currentPlayerAttributes.petFoodAmount = 2;
                
                OpponentEvents('bought a pet.');
                currentPlayerAttributes.petWeeklyDue = true;

                if (currentPlayerAttributes.weeklyTime < 50){
                    currentPlayerAttributes.petWeeklyDue = false;
                }

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
        // currentPlayerAttributes.rentToDue = true;
        GameEventMessage(`<span style="color:lime">You just rented yourself ${rentHomes[0].homeName}. Remember to pay your rent next month.</span>`);
        // ShowTempMessage('You just rented yourself ' + rentHomes[0].homeName +'. Remember to pay your rent for this month.', 'sms');
        OpponentEvents('rented an apartment.');
    }

    else if (home == 1 && currentPlayerAttributes.moneyPoints >= rentHomes[1].deposit){
        currentPlayerAttributes.moneyPoints -= rentHomes[1].deposit;
        currentPlayerAttributes.moneyPoints += rentHomes[0].deposit;
        currentPlayerAttributes.homeID = 1;
        // currentPlayerAttributes.rentToDue = true;
        GameEventMessage(`<span style="color:lime">You just rented yourself ${rentHomes[1].homeName}. Remember to pay your rent next month.</span>`);
        // ShowTempMessage('You just rented yourself ' + rentHomes[1].homeName +'. Remember to pay your rent for this month.', 'sms');
        OpponentEvents('rented an apartment.');
    }

};

//EDUCATION-------------------------------------------------------------------------------------------------------------
function SchoolAction(action){

    if (action == 'school'){

        const drugEnhancer = currentPlayerAttributes.drugs > 0 ? 15 : 0;

        if (currentPlayerAttributes.moneyPoints >= education[currentPlayerAttributes.educationId+1].cost && !currentPlayerAttributes.educationEnroll){
            currentPlayerAttributes.moneyPoints -= education[currentPlayerAttributes.educationId+1].cost
            currentPlayerAttributes.educationEnroll = true;
            ChooseDirection('School'); //for reload
            GameEventMessage(`<span style="color:lime">You enrolled for ${education[currentPlayerAttributes.educationId+1].degree}</span>`);
            // ShowTempMessage('You enrolled for ' + education[currentPlayerAttributes.educationId+1].degree, 'sms');
            OpponentEvents('enrolled for a degree.');
            // + education[currentPlayerAttributes.educationId+1].degree + "."
            
            ReduceTime_Check(0);
        }
    
        else if(currentPlayerAttributes.educationEnroll && currentPlayerAttributes.weeklyTime > (studyingTimeToConsume - drugEnhancer)){
            currentPlayerAttributes.educationProgress++;

            if (drugEnhancer > 0) {currentPlayerAttributes.drugs--; }
            

            ReduceTime_Check(studyingTimeToConsume - drugEnhancer);
            
    
            if(currentPlayerAttributes.educationProgress == 5){
                currentPlayerAttributes.educationId++;
                currentPlayerAttributes.fakeEducation = false;
                currentPlayerAttributes.educationEnroll = false;
                currentPlayerAttributes.educationProgress = 0;
                //message to panel congrats etc.
                ReduceTime_Check(0);
                GameEventMessage(`<span style="color:lime">You made it! Your current degree is ${education[currentPlayerAttributes.educationId].degree}</span>`);
                
                // ShowTempMessage('You made it! Your current degree is ' + education[currentPlayerAttributes.educationId].degree, 'sms');
                // OpponentEvents('Gratuated for ' + education[currentPlayerAttributes.educationId].degree + "!" );
                ChooseDirection('School'); //for reload
            }
        }
    
        else{
            const educationEnroll = document.getElementById('educationEnroll_text');
            educationEnroll.innerHTML = "You don't have enough money or time to go further.";
            educationEnroll.className = "optiontext red";
        }
        

    }

    if (action == 'library'){
        if (currentPlayerAttributes.schoolAction == 0 && currentPlayerAttributes.weeklyTime >= 10){
            currentPlayerAttributes.schoolAction++;
            currentPlayerAttributes.happinessPoints++;
            OpponentEvents('enjoys library.' );
        }

        ReduceTime_Check(10);
    }


};

//SPORTS--------------------------------------------------------------------------------------------------------------
function SportsAction(sport){

    if (sport == 'yoga'){
        if (currentPlayerAttributes.currentYogaEnhancer == 0){
            
            currentPlayerAttributes.currentYogaEnhancer += yogaEnhance;
            OpponentEvents('went for yoga.' );
            ReduceTime_Check(3);    
        }
        
    }

    if(sport == 'sports'){

        const sports_gymText = document.getElementById('sports_gymText');
        
        if (currentPlayerAttributes.exerciseLvl <= 2 && currentPlayerAttributes.gymTimes > 0){
            currentPlayerAttributes.exerciseLvl++;
            currentPlayerAttributes.gymTimes--;
            OpponentEvents('hit the gym.' );
            ReduceTime_Check(4);
        
            sports_gymText.innerHTML = "That was very good workout...";
            sports_gymText.className = "optiontext green";
        }

        else if (currentPlayerAttributes.exerciseLvl > 2){
            sports_gymText.innerHTML = "You have already pumped enough for this week. Your muscles says no...";
            sports_gymText.className = "optiontext red";
        }

        else{
            
            sports_gymText.innerHTML = "You have already spend 10 training times from your gym card in this month. Come back for more in the next month.";
            sports_gymText.className = "optiontext red";
        }
        
    }

    if(sport == 'sauna'){

        const sports_swimText = document.getElementById('sports_swimText');

        if (currentPlayerAttributes.workStress > 3){
            currentPlayerAttributes.workStress--;
            
            sports_swimText.innerHTML = "You feel much more relaxed now and your work stress has been reduced...!";
            sports_swimText.className = "optiontext green";

            OpponentEvents('enjoyed sauna.' );
            
            ReduceTime_Check(10);
        }
        else{
            sports_swimText.innerHTML = "You don't feel like going to sauna at the moment.";
            sports_swimText.className = "optiontext red";
        }
        
        
    }
    
};

//CHURCH------------------------------------------------------------------------------------------------------------
function ChurchAction(action){

    switch (action){
        case 'leap':
            const randomAmount = Math.floor(Math.random()*12)-6;

            currentPlayerAttributes.happinessPoints += randomAmount;
            OpponentEvents('took a leap of fate.' );
            ReduceTime_Check(4);
            break;

        case 'volunteer':

            const church_volunteerText = document.getElementById('church_volunteerText');

            if (currentPlayerAttributes.weeklyTime >= volunteerConsumptionTime && currentPlayerAttributes.energyLevel >= (volunteerConsumptionTime * 5) 
                && currentPlayerAttributes.currentWorkId == 0 && currentPlayerAttributes.volunteerTime > 0){
                
                currentPlayerAttributes.weeklyTime -= volunteerConsumptionTime;
                currentPlayerAttributes.energyLevel -= volunteerConsumptionTime*5;
                currentPlayerAttributes.happinessPoints += 3;
                currentPlayerAttributes.volunteerTime--;
                church_volunteerText.className = "optiontext green";
                church_volunteerText.innerHTML = "You have participated in volunteer work. You feel tired, but much happier!";

                ReduceTime_Check(volunteerConsumptionTime);
                
            }

            else if(currentPlayerAttributes.volunteerTime == 0){
                church_volunteerText.innerHTML = "There's no volunteer work for this week! Come back next week.";
                church_volunteerText.className = "optiontext red";
            }

            else{
                church_volunteerText.innerHTML = "Not enough time or energy to do the work. Remember you have to unemployed.";
                church_volunteerText.className = "optiontext red";
            }


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

};

function ManageScoreBoard_Images(){

    currentPlayerAttributes.petID == 1 ? icon_pet.style.display = "block" : icon_pet.style.display = "none";
    currentPlayerAttributes.homeID == 0 ? icon_house.style.display ="block" : icon_house.style.display ="none";
    currentPlayerAttributes.homeID == 1 ? icon_houselux.style.display ="block" : icon_houselux.style.display ="none";
    currentPlayerAttributes.jobIdPending ? icon_jobapplication.style.display ="block" : icon_jobapplication.style.display ="none";
    currentPlayerAttributes.itemPackageInPost ? icon_postpackage.style.display ="block" : icon_postpackage.style.display ="none";
    
    currentPlayerAttributes.drugs > 0 ? icon_drugs.style.display ="block" : icon_drugs.style.display ="none";
    currentPlayerAttributes.currentYogaEnhancer == 0 ? icon_yoga.style.display = "none" : icon_yoga.style.display = "block";
    currentPlayerAttributes.rentToDue ? icon_rent.style.display = "block" : icon_rent.style.display = "none";
    currentPlayerAttributes.beautyFactor ? icon_beauty.style.display = "block" : icon_beauty.style.display = "none";

    switch (currentPlayerAttributes.exerciseLvl){
        case 0:
            icon_exercise.style.display ="none";
            icon_exercise2.style.display ="none";
            icon_exercise3.style.display ="none";
            
            
        break;
        
        case 1:
            icon_exercise.style.display ="block";
            icon_exercise2.style.display ="none";
            icon_exercise3.style.display ="none";
            
            
        break;
        case 2:
            icon_exercise.style.display ="block";
            icon_exercise2.style.display ="block";
            icon_exercise3.style.display ="none";
            
            
        break;
        case 3:
            icon_exercise.style.display ="block";
            icon_exercise2.style.display ="block";
            icon_exercise3.style.display ="block";
            
        break;


    }



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
};

function ColorTimeBar(targetWeeklyTime, barName){

    if (targetWeeklyTime >= weeklytimeToCompare * 0.66) {
        barName.style.background = "linear-gradient(to right, white, lime)";
    }

    if (targetWeeklyTime < weeklytimeToCompare * 0.66 && targetWeeklyTime > 168 * 0.33){
        barName.style.background = "linear-gradient(to right, white, orange)";
    }

    if (targetWeeklyTime <= weeklytimeToCompare * 0.33){
        barName.style.background = "linear-gradient(to right, white, red)";
    }
};

function OrderOnlineItem(itemId, cost){
    
    
    if (cost <= currentPlayerAttributes.moneyPoints){
        currentPlayerAttributes.moneyPoints -= cost;
        currentPlayerAttributes.itemIdToReclaim = itemId;
        infoboxObj.innerHTML = `<div class="browserBase">${AddHomeButton('<img src="./img/icons/Button_Back.png" height="20px">','Home')}<div class="browser">http://www.somestuff.com/order#21123</div></div>
                                <br><div class="UI_text description">Hi there stranger! <br><br>
                                Thanks for buying this. I'll post the item right a way! The follow-up code is #5473829543 432 5432 21123. Be sure to write that down. The package should be there shortly.<br><br>

                                Regards, <br>
                                the seller
                                </div>`;

        currentPlayerAttributes.itemPostArrivingTime = currentPlayerAttributes.weeklyTime - 15;
        if (currentPlayerAttributes.itemPostArrivingTime < 0){
            currentPlayerAttributes.itemPostArrivingTime = 1;
        }
        currentPlayerAttributes.showPostMessage = true;
        UpdateBarAndTexts();
    }
};

function AddEnergy(addedEnergy){
    
    if(addedEnergy > 100){
        currentPlayerAttributes.energyLevel = 100;
    }
    
    currentPlayerAttributes.energyLevel += addedEnergy + (currentPlayerAttributes.homeID * 2);
};

function SellItem(id, price){

    currentPlayerAttributes.itemSellingIdPrice[0] = FindWithAttr(onlineItems, "itemId", id);
    currentPlayerAttributes.itemSellingIdPrice[1] = price;

    currentPlayerAttributes.itemSellingTime = currentPlayerAttributes.weeklyTime - 15;

    if (currentPlayerAttributes.itemSellingTime < 0){
        currentPlayerAttributes.itemSellingTime = 1;
    }

    ReduceTime_Check(7);
    // console.log(currentPlayerAttributes.itemSellingIdPrice);
    EnteringHome();
};

function RandomizeJobs(){

    randomizedOnlineJobs = [];
    let jobsToShow = [];

    //make a copy of jobs array
    jobs.forEach(el => {  // jobsToShow = {...jobs};
        jobsToShow.push(el);
    });

    

    //First Delete current and unemloyment jobs from the  
    jobsToShow.splice(currentPlayerAttributes.currentWorkId, 1); //first take player current work out whether if unemployed or not
    if (currentPlayerAttributes.currentWorkId != 0){
        jobsToShow.splice(0, 1);                                //second take zero out if player is not unemployed
    }
    
    if (numberOfPlayersForGame > 1 && opponentJobs[0] != 0){
        jobsToShow.splice(FindWithAttr(jobsToShow, "id", opponentJobs[0]) , 1);
    }

    if (numberOfPlayersForGame > 2 && opponentJobs[1] != 0){
        jobsToShow.splice(FindWithAttr(jobsToShow, "id", opponentJobs[1]) , 1);
    }

    

    //Push to randomizejob list and delete from temp list        
    for (var i = 0; i < 4; i++){
        let randJob = Math.floor(Math.random()*jobsToShow.length);
        randomizedOnlineJobs.push(jobsToShow[randJob]);
        jobsToShow.splice(randJob, 1); //delete jobs, which are listed from the temp array
    }
};

function RandomizeItemPrices(){
    if (currentPlayerAttributes.currentItems.length > 0){

        currentPlayerAttributes.currentItemPrices = []; //empty price list

        //Randomize price
        for (var i = 0; i < currentPlayerAttributes.currentItems.length; i++){

            const randomPrice2 = Math.floor(Math.random()*50);
            let randomPrice = 0;            

            if (onlineItems[currentPlayerAttributes.currentItems[i]].cost <= 70){
                randomPrice = onlineItems[currentPlayerAttributes.currentItems[i]].cost + Math.floor(randomPrice2*0.4) ;
            }

            else if (onlineItems[currentPlayerAttributes.currentItems[i]].cost > 70 && onlineItems[currentPlayerAttributes.currentItems[i]].cost <= 300){
                randomPrice = Math.ceil(onlineItems[currentPlayerAttributes.currentItems[i]].cost +  Math.floor(randomPrice2*0.6));
            }

            else{
                randomPrice = Math.ceil(onlineItems[currentPlayerAttributes.currentItems[i]].cost +  Math.floor(randomPrice2 * 0.9));
            }
            
            currentPlayerAttributes.currentItemPrices.push(randomPrice);
        }
    }
};

function ApplyForJob(workID, jobName){
    currentPlayerAttributes.showJobs = false;
    currentPlayerAttributes.jobIdPending = workID;
    currentPlayerAttributes.jobPendingTime = currentPlayerAttributes.weeklyTime - 20;
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

function WorkChecker(){

    //When jobs is pending
    if (currentPlayerAttributes.jobIdPending != null && currentPlayerAttributes.weeklyTime <= currentPlayerAttributes.jobPendingTime  ){
        
        const rand = Math.floor(Math.random()*5);
        //Random decider if you got the job or not
        console.log(rand + " != 4???");

        const fakeEducationLvl = currentPlayerAttributes.fakeEducation ? 1 : 0;  // if fake education

        const tempJobPending = FindWithAttr(jobs, "id", currentPlayerAttributes.jobIdPending); //jobs is given with id number
        if (jobs[tempJobPending].worklevel <= currentPlayerAttributes.playerWorkLevel && rand != 4 && jobs[tempJobPending].educationReq <= currentPlayerAttributes.educationId + fakeEducationLvl){

            currentPlayerAttributes.currentWorkId = tempJobPending;
            GameEventMessage(`<span style="color:lime">Congratulations! You got the job! Now you can start working as ${jobs[tempJobPending].job}.</span>`);
            // ShowTempMessage(`Congratulations! You got the job!<br><br> Now you can start working as ${jobs[tempJobPending].job}.`, 'sms');
            currentPlayerAttributes.justHired = true;
            OpponentEvents(`got a new job!`);
            // ${jobs[tempJobPending].job}
        }

        else if (jobs[tempJobPending].worklevel > currentPlayerAttributes.playerWorkLevel){
            GameEventMessage(`<span style="color:orange; text-shadow: 1px 1px black;">Unfortunately you didn't get the job. You were lacking in work experience.</span>`);
            // ShowTempMessage("Unfortunately you didn't get the job. You are lacking work experience.", 'rejection');
            OpponentEvents("failed to get a job.");
        }

        else if (jobs[tempJobPending].educationReq > currentPlayerAttributes.educationId){
            GameEventMessage(`<span style="color:orange; text-shadow: 1px 1px black;">Unfortunately you didn't get the job. You were lacking in education.</span>`);
            // ShowTempMessage("Unfortunately you didn't get the job. You are lacking some education.", 'rejection');
            OpponentEvents("failed to get a job.");
        }

        else{
            GameEventMessage(`<span style="color:orange">Unfortunately you didn't get the job. All of the candidates including you were really good, but you weren't the our choice.</span>`);
            // ShowTempMessage("Unfortunately you didn't get the job. All of the candidates including you were really good, but you weren't the our choice.", 'rejection');
            OpponentEvents("failed to get a job.");
        }

        currentPlayerAttributes.showJobs = true;
        currentPlayerAttributes.jobIdPending = null;
        RandomizeJobs();
        // randomizeNewOnlineContent = true;
    }


}

//ILLEGAL ----------------------------------------------------------------------------------------------------------------------
function BuyFake(fakeSubject){

    switch (fakeSubject){
        case 'education':
            if (currentPlayerAttributes.moneyPoints >= education[currentPlayerAttributes.educationId+1].fakePrice){
                currentPlayerAttributes.moneyPoints -= education[currentPlayerAttributes.educationId+1].fakePrice;
                currentPlayerAttributes.illegalPostArrivingTime = currentPlayerAttributes.weeklyTime - 15;
                
                currentPlayerAttributes.illegalIdToReclaim = 'education';

                if (currentPlayerAttributes.illegalPostArrivingTime < 0){ currentPlayerAttributes.illegalPostArrivingTime = 1; }

                currentPlayerAttributes.showPostMessage = true;
            }
        break;

        case 'drugs':

            if (currentPlayerAttributes.moneyPoints >= drugsPrice){
                currentPlayerAttributes.moneyPoints -= drugsPrice;

                currentPlayerAttributes.illegalPostArrivingTime = currentPlayerAttributes.weeklyTime - 15;
                currentPlayerAttributes.illegalIdToReclaim = 'drugs';

                if (currentPlayerAttributes.illegalPostArrivingTime < 0){ currentPlayerAttributes.illegalPostArrivingTime = 1; }
                currentPlayerAttributes.showPostMessage = true;
            }
        break;

    }

    infoboxObj.innerHTML = `<div class="browserBase">${AddHomeButton('<img src="./img/icons/Button_Back.png" height="20px">','Home')}<div class="browser">http://www.darknet.com/order#432s42</div></div>
                            <br><div class="UI_text description">Hi! <br><br>
                            Thanks for the purchase. There are eyes everywhere, we have to be cautious. But yea.. the delivery is own its way.<br><br>

                            Thanks. Bye.<br>

                            <br>
                            -the man
                            </div>`;

}

function OrderHitman(id){


    if (currentPlayerAttributes.moneyPoints >= hitmanPrice){
        currentPlayerAttributes.moneyPoints -= hitmanPrice;


        currentPlayerAttributes.hitmanTarget_Time[1] = currentPlayerAttributes.weeklyTime - 15;
        if (currentPlayerAttributes.hitmanTarget_Time[1] < 0){ currentPlayerAttributes.hitmanTarget_Time[1] = 1; }
        
        currentPlayerAttributes.hitmanTarget_Time[0] = id;

        ReduceTime_Check(1);

        infoboxObj.innerHTML = `<div class="browserBase">${AddHomeButton('<img src="./img/icons/Button_Back.png" height="20px">','Home')}<div class="browser">http://www.darknet.com/order#432s42</div></div>
                                <br><div class="UI_text description">Hi! <br><br>
                                Thanks for the purchase. There are eyes everywhere, we have to be cautious. But yea.. the delivery is own its way.<br><br>

                                Thanks. Bye.<br>

                                <br>
                                -the man
                                </div>`;
    }

    else{
        const hitman_text = document.getElementById('hitman_text');
        hitman_text.innerHTML = "Not enough money.";
        hitman_text.className = "optiontext red";
    }


}


//WEEK CHANGE FUNCTIONS----------------------------------------------------------------------------------------------------------
function Relationship_WeekChange(){

    if (currentPlayerAttributes.relationshipID == 0){
        weeklyChangeEvents.push('relationship_recovery');
        currentPlayerAttributes.relationshipID = 1;
    }

    //declining relationship
    if (currentPlayerAttributes.relationshipID > 1){
        
        currentPlayerAttributes.relationshipStrenght -= 2;

        //dropping relationship strenght
        if (currentPlayerAttributes.relationshipStrenght <= 0){
            switch (currentPlayerAttributes.relationshipID){

                case 2: //dating => broke up
                    currentPlayerAttributes.relationshipID = 0;
                    currentPlayerAttributes.happinessPoints -= 5;
                    weeklyChangeEvents.push('relationship_brokeup');
                    OpponentEvents("broke up." );
                    break;

                case 3: //Relationship => broke up
                    currentPlayerAttributes.relationshipID = 0;
                    currentPlayerAttributes.happinessPoints -= 8;
                    OpponentEvents("broke up." );
                    weeklyChangeEvents.push('relationship_brokeup');
                    break;
                
            }
            currentPlayerAttributes.relationshipStrenght = 0; //if broken up
        }

        currentPlayerAttributes.happinessPoints += relationships[currentPlayerAttributes.relationshipID].weeklyAdded_Happiness;
    }
}

function Lottery_WeekChange(){

    if (currentPlayerAttributes.lotteryTickets > 0){

        lotteryWinCount = 0;

        for (var i = 0; i < currentPlayerAttributes.lotteryTickets; i++){
            const randomTicketResult = Math.floor(Math.random()*25);
            currentPlayerAttributes.lotteryTickets--;

            if (randomTicketResult == 5){
                currentPlayerAttributes.moneyPoints += 500;
                currentPlayerAttributes.happinessPoints += 2;
                lotteryWinCount++;
            }

        }
        if (lotteryWinCount > 0){ weeklyChangeEvents.push('lottery'); }
        if (lotteryWinCount == 0){ weeklyChangeEvents.push('no_win_lottery'); }
        
    }

    

}

function Rent_WeekChange(){

    if (currentPlayerAttributes.rentToDue){
        currentPlayerAttributes.moneyPoints -= Math.ceil(rentHomes[currentPlayerAttributes.homeID].rent * 2); 
        currentPlayerAttributes.rentToDue = false;
        currentPlayerAttributes.happinessPoints -= 10;
        weeklyChangeEvents.push('rent');
     
    }
}

function Work_WeekChange(){

    if (currentPlayerAttributes.currentWorkId != 0){
    
        if (currentPlayerAttributes.workStress < 1 && !currentPlayerAttributes.justHired){ //don't go work at all
            currentPlayerAttributes.currentWorkId = 0;
            currentPlayerAttributes.happinessPoints -= 10;
            
            weeklyChangeEvents.push('losejob');
        }
        
        else if(currentPlayerAttributes.workStress > 5){
            currentPlayerAttributes.weeklyTime -= 60;
            currentPlayerAttributes.moneyPoints -= 60;
            currentPlayerAttributes.happinessPoints -= 5;

            weeklyChangeEvents.push('work_too_much');
        }

        currentPlayerAttributes.workStress = 0;
    }
}

function Pet_WeekChange(){

    if (currentPlayerAttributes.petID > 0){

        if (currentPlayerAttributes.petWeeklyDue){
            
            weeklyChangeEvents.push('pet_decare');
            // ShowTempMessage("You haven't taken care of your pet. You had to take it to a vet. The fee was " + pets[currentPlayerAttributes.petID].petPenalty +"€", 'sms');
            currentPlayerAttributes.moneyPoints -= pets[currentPlayerAttributes.petID].petPenalty;
            currentPlayerAttributes.happinessPoints -= 5;
        }
        

        if (currentPlayerAttributes.petFoodAmount == 0){
            weeklyChangeEvents.push('no_petfood');
            currentPlayerAttributes.moneyPoints -= pets[currentPlayerAttributes.petID].petPenalty;
            currentPlayerAttributes.happinessPoints -= 5;
        }

        currentPlayerAttributes.petFoodAmount == 0 ? currentPlayerAttributes.petFoodAmount == 0 : currentPlayerAttributes.petFoodAmount--; //decrease pet food
        currentPlayerAttributes.petWeeklyDue = true;
    }
}

function Messages_WeekChange(messageArray){

    // console.log(messageArray);

    tempInfo.innerHTML = `<div class="twoColumns20-80">
                        <div class="basicCell"><img src="./img/icons/SMS_Sprite.png" height="40px"></div> 
                        <div class="optiontext green">${messageArray[0]}</div>
                        </div>`;   


    //start from second element ==> 1
    for (var i = 1; i < messageArray.length; i++){

        tempInfo.innerHTML += '<br>' + messageToShow(messageArray[i]);
    }

    
    $(tempInfo).slideDown(500).delay(3000+(messageArray.length*800)).slideUp(500);

    function messageToShow(message){

        switch (message){
            case 'rent':

                return `<div class="twoColumns20-80">
                    <div class="basicCell"><img src="./img/icons/Icon_RentDue.png" height="40px"></div> 
                    <div class="optiontext red_bold">You didn't pay your rent in last week. You were due to pay double rent ${rentHomes[currentPlayerAttributes.homeID].rent*2}€.</div>
                </div>`; 
                
            case 'losejob':
                return `<div class="twoColumns20-80">
                    <div class="basicCell"><img src="./img/icons/Icon_OccupationSprite.png" height="40px"></div> 
                    <div class="optiontext red_bold">You neglected your work and got fired. You're unemployed once again.</div>
                </div>`; 

            case 'work_too_much':
                return `<div class="twoColumns20-80">
                    <div class="basicCell"><img src="./img/icons/Sprite_RejectionLetter.png" height="40px"></div> 
                    <div class="optiontext red_bold">You worked too much and felt a little bit sick for awhile. You lost some time in recover. The doctor fee was ${overWorkFee}€.</div>
                </div>`; 

            case 'pet_decare':
                return `<div class="twoColumns20-80">
                    <div class="basicCell"><img src="./img/icons/Sprite_RejectionLetter.png" height="40px"></div> 
                    <div class="optiontext red_bold">You didn't takee care of your pet and had to visit a vet. The fee was ${pets[currentPlayerAttributes.petID].petPenalty}€.</div>
                </div>`; 

            case 'no_petfood':
                return `<div class="twoColumns20-80">
                    <div class="basicCell"><img src="./img/icons/Sprite_RejectionLetter.png" height="40px"></div> 
                    <div class="optiontext red_bold">Your pet didn't have any food. You had to pay a visit to vet. The fee was ${pets[currentPlayerAttributes.petID].petPenalty}€.</div>
                </div>`; 

            case 'relationship_brokeup':
                return `<div class="twoColumns20-80">
                    <div class="basicCell"><img src="./img/icons/Icon_RelationshipSprite.png" height="40px"></div> 
                    <div class="optiontext red_bold">Unfortuntately your relationship didn't work out...</div>
                </div>`; 



            //oranges
            case 'rentToDue':
                return `<div class="twoColumns20-80">
                    <div class="basicCell"><img src="./img/icons/Icon_RentDue.png" height="40px"></div> 
                    <div class="optiontext orange">Rent to due during this week!</div>
                </div>`; 

            case 'no_win_lottery':
                return `<div class="twoColumns20-80">
                    <div class="basicCell"><img src="./img/icons/Icon_MoneySprite.png" height="40px"></div> 
                    <div class="optiontext orange">You didn't win in the lottery unfortunately!</div>
                </div>`; 




            //happy
            case 'lottery':
                return `<div class="twoColumns20-80">
                    <div class="basicCell"><img src="./img/icons/Icon_MoneySprite.png" height="40px"></div> 
                    <div class="optiontext green">You won in lottery! Total amount was ${lotteryWinCount*500}€!!</div>
                </div>`; 

            case 'relationship_recovery':
                return `<div class="twoColumns20-80">
                    <div class="basicCell"><img src="./img/icons/Icon_RelationshipSprite.png" height="40px"></div> 
                    <div class="optiontext green">You finally recovered from your hard brake up.</div>
                </div>`; 

        }


   
    }
}
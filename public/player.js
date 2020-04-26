//Const objects
const infoboxObj = document.getElementById('infoboxBase');
const tempInfo = document.getElementById('tempInfo'); //temp infobox
let infoboxWidth = infoboxObj.getBoundingClientRect().width;

const barWidth = 130; //progressbar width


//BARS AND TEXTS
const happinessBar = document.getElementById('happiness_bar');
const energyBar = document.getElementById('energy_bar');
const intoxicationBar = document.getElementById('intoxication_bar');
const timeProgressBar = document.getElementById('monthly_time_bar');
const relationshipBar = document.getElementById('relationship_bar');

//OTHER SCOREBOARD TEXTS
const happinessText = document.getElementById('happiness_text');
const monthlyTimeText = document.getElementById('monhlytime_text');
const energyText = document.getElementById('energy_text');
const intoxicationText = document.getElementById('intoxication_text');
const salaryText = document.getElementById('salaryText'); //scoreboard salary text
const moneyText = document.getElementById('moneyText'); //scoreboard money text
const relationshipObj = document.getElementById('relationship_obj'); //scoreboard relationshipstatus text
const jobObj = document.getElementById('jobText');  //scoreboard job text
const homeText = document.getElementById('home_obj');
const petText = document.getElementById('pet_obj');
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
//maybe add education
//pet things
//add item show page to home
//change the better home background to something else
//bar hookup thing better

//Player attributes
let currentPlayerAttributes = {
    happinessPoints: 20,
    moneyPoints: 250,
    energyLevel: 50,
    intoxicationLevel: 0,
    
    petID: 0,
    petMonthlyDue: false,

    homeID: 0,
    rentToDue: true,
    
    relationshipID: 0,
    relationshipStrenght: 0,
    tinderPossibilites: 0,

    currentWorkId: 0,
    playerWorkLevel: 0,
    jobPendingTime: 0,
    workExperience: 0,
}

const workExperienceRequired = 6;
let happinessTotal = 0;
let extraHappinesPoints = 0;
let weekNumber = 1;
let weeklytimeToCompare = 168;
let weeklyTime = 168;
let randomizeNewOnlineContent = true;


//Items
let itemInPostAnnouncement;
let currentItems = [];                  //purchased items
let randomizedOnlineItems = [];         //randomized items in Online shop
let postPackagePending = 0;
let postPackageInPost = false;
let showPostMessage = false;

//Jobs
let showJobs = true; //show jobs if applied or not
let jobIdPending = null; //applied job, after 10s it shows, if job was success or not
let randomizedOnlineJobs = [];

currentPlayerAttributes.tinderPossibilites = 5+Math.floor(Math.random()*34);


//OBJECTS LISTS
const relationships = [
    {
        relationshipStatus: "Single",
        happinessPoints: 0},

    {
        relationshipStatus: "Complicated",
        happinessPoints: -3},
    {
        relationshipStatus: "Just met",
        happinessPoints: 6},
    {
        relationshipStatus: "Dating",
        happinessPoints: 12},
    {
        relationshipStatus: "In a relationship",
        happinessPoints: 25},
]

const pets = [
    {
        petType: "None",
        petAcquireCost: 0,
        petCostWeek: 0,
        happinessPoints: 0,
        storeText: "", 
        careInstructions: ""},
    {
        petType: "Dog",
        petAcquireCost: 490,
        petCostWeek: 73,
        happinessPoints: 15,
        storeText: "Adoreable fellow.",
        careInstructions: "Take dog for a walk and feed her."},

    {
        petType: "Parrot",
        petAcquireCost: 220,
        petCostWeek: 55,
        happinessPoints: 11,
        storeText: "Can learn all of your words.",
        careInstructions: "Clean the cage and feed your parrot."},
    {
        petType: "Cat",
        petAcquireCost: 210,
        petCostWeek: 51,
        happinessPoints: 7,
        storeText: "Purrling all the time.",
        careInstructions: "Empty the litter box and feed your cat."},
    {
        petType: "Hamster",
        petAcquireCost: 80,
        petCostWeek: 15,
        happinessPoints: 6,
        storeText: "Minding its own business.",
        careInstructions: "Clean the cage and feed your hamster."},
    {
        petType: "Snake",
        petAcquireCost: 80,
        petCostWeek: 15,
        happinessPoints: 6,
        storeText: "Sneaky company. Doesn't make quick moves.",
        careInstructions: "Clean the cage and feed your hamster."},
];

const education = [{
    subject: "Technology",
    cost: 250,
    happinessPoints: 1},

{
    subject: "Culture",
    cost: 109,
    happinessPoints: 1},

{
    subject: "Art",
    cost: 99,
    happinessPoints: 1},

{
    subject: "Economy",
    cost: 140,
    happinessPoints: 1}
];

const rentHomes = [{
        rent: 182,
        homeName: "Lo-cost appart.",
        happinessPoints: 0},
    {
        rent: 549,
        homeName: "Luxurious home",
        happinessPoints: 10}
];

const jobs = [

    //WORK LEVEL 1
    {
        id: 0,
        worklevel: 0,
        job: "Unemployed",
        energyConsumption: 0,
        salary: 0,
        description: "You can do better than this.",
        happinessPoinst: 0},

    {
        id: 1,
        worklevel: 0,
        job: "Fast food cook",
        energyConsumption: 32,
        salary: 41,
        description: "You will prepare fast food meals.",
        happinessPoinst: 5},
    {
        id: 2,
        worklevel: 0,
        job: "Cleaner",
        energyConsumption: 30,
        salary: 38,
        description: "You will clean what you're told.",
        happinessPoinst: 5},

    {
        id: 3,
        worklevel: 0,
        job: "Const. worker",
        energyConsumption: 52,
        salary: 48,
        description: "Hard work, somewhat good pay.",
        happinessPoinst: 5},
    
    //WORK LEVEL 1
    {
        id: 4,
        worklevel: 1,
        job: "Line manager",
        energyConsumption: 62,
        salary: 89,
        description: "Hard work, somewhat good pay.",
        happinessPoinst: 10},
    {
        id: 5,
        worklevel: 1,
        job: "Receptionist",
        energyConsumption: 35,
        salary: 59,
        description: "You will work at the hotel reception.",
        happinessPoinst: 10},

    {
        id: 6,
        worklevel: 1,
        job: "Tailor",
        energyConsumption: 41,
        salary: 67,
        description: "Your hands are your best tool.",
        happinessPoinst: 11},

    
    //WORK LEVEL 2
    {
        id: 7,
        worklevel: 2,
        job: "Factory manager",
        energyConsumption: 67,
        salary: 120,
        description: "You will be working as factory manager.",
        happinessPoinst: 12},

    {
        id: 8,
        worklevel: 2,
        job: "Real estate agent",
        energyConsumption: 71,
        salary: 128,
        description: "You're the one who gives home to people.",
        happinessPoinst: 12},

    {
        id: 9,
        worklevel: 2,
        job: "Content creator",
        energyConsumption: 52,
        salary: 98,
        description: "You create digital content you desire the most.",
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
}





//ATTRIBUTE FUNCTIONS --------------------------------------------------------------------------------------
function UpdateBarAndTexts(){
    AddedItemHappiness();
    
    happinessText.innerHTML = 'Happiness: '+ happinessTotal + "%";
    // happinessBar.style.width = happinessTotal + "%";
    
    anime({
        targets: happinessBar,
        width: happinessTotal*(barWidth/100),
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
    petText.innerHTML = pets[currentPlayerAttributes.petID].petType;
    homeText.innerHTML = rentHomes[currentPlayerAttributes.homeID].homeName;
    salaryText.innerHTML =  jobs[currentPlayerAttributes.currentWorkId].salary + "€/day";
    currentPlayerAttributes.moneyPoints > 0 ? moneyText.className = "UI_text scoreboard green" : moneyText.className = "UI_text scoreboard red";
    moneyText.innerHTML = currentPlayerAttributes.moneyPoints + '€';
    relationshipObj.innerHTML = relationships[currentPlayerAttributes.relationshipID].relationshipStatus;

    if (currentPlayerAttributes.workExperience > workExperienceRequired){
        currentPlayerAttributes.playerWorkLevel++;
        currentPlayerAttributes.workExperience = 0;
        ShowTempMessage("You're more experienced now. Maybe you should applying for more demanding jobs.", 'sms')
    }

    if (postPackagePending != 0 && itemInPostAnnouncement > weeklyTime && showPostMessage){
        ShowTempMessage('Package in post!', 'package');
        OpponentEvents("has a package in the post.");
        postPackageInPost = true;
        showPostMessage = false;
    }

    //When jobs is pending
    if (jobIdPending != null && currentPlayerAttributes.jobPendingTime > weeklyTime ){
        
        const rand = Math.floor(Math.random()*4);
        //Decider if you got the job or not
        console.log(rand + " != 3???");

        const tempJobPending = FindWithAttr(jobs, "id", jobIdPending);
        if (jobs[tempJobPending].worklevel <= currentPlayerAttributes.playerWorkLevel && rand != 3){

            currentPlayerAttributes.currentWorkId = tempJobPending;
            ShowTempMessage(`Congratulations! You got the job!<br><br>
            Now you can start working as ${jobs[tempJobPending].job}.`, 'sms');
            OpponentEvents(`got a job as a ${jobs[tempJobPending].job}!`);
        }

        else if (jobs[tempJobPending].worklevel > currentPlayerAttributes.playerWorkLevel){
            ShowTempMessage("Unfortunately you didn't get the job. You are lacking work experience.", 'rejection');
            OpponentEvents("failed to get a job.");
        }

        else{
            ShowTempMessage("Unfortunately you didn't get the job. All of the candidates including you were really good, but you weren't the our choice.", 'rejection');
            OpponentEvents("failed to get a job.");
        }

        showJobs = true;
        jobIdPending = null;
        randomizeNewOnlineContent = true;
        UpdateBarAndTexts();
    }

    OpponentUpdates(weeklyTime, happinessTotal, currentPlayerAttributes.moneyPoints);
}

function ShowTempMessage(message, image){

    // $(tempInfo).slideDown(500).delay(5000).slideUp(500);
    $(tempInfo).fadeIn(500).delay(5000).fadeOut(500);
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
                                    <div class="basicCell"><img src="./img/icons/Button_Post.png" height="40px"> </div>
                                    <div class="optiontext green">${message}</div>
                                </div>`;        
            break;
    }
    
    
}

function ReduceTime_Check(decreaseTimeAmount){

    weeklyTime -= decreaseTimeAmount;
    
    if (weeklyTime < 0){
        
        
        weeklyTime = 0;
        
        ManageMoveButtons('weekChange');
        $(infoboxObj).slideUp(500);

        //sending info to opponent
        OpponentEvents('is end of this week.');
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

    
    
    
    UpdateBarAndTexts();
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

function AddedItemHappiness(){
    
    extraHappinesPoints = 0;

    if (currentItems.length > 0){
        currentItems.forEach(item => {
            for (var i = 0; i < onlineItems.length; i++){
                if (item == onlineItems[i].itemId){
                    extraHappinesPoints += onlineItems[i].itemHappiness;
                }
            }
        });
    }
    
    extraHappinesPoints += pets[currentPlayerAttributes.petID].happinessPoints;
    //education happiness 
    extraHappinesPoints += relationships[currentPlayerAttributes.relationshipID].happinessPoints;
    extraHappinesPoints += rentHomes[currentPlayerAttributes.homeID].happinessPoints;
    extraHappinesPoints += currentPlayerAttributes.intoxicationLevel;
    happinessTotal = currentPlayerAttributes.happinessPoints + extraHappinesPoints;

    if (happinessTotal >= 100 ){
        console.log("You have done it!");
    }
}

function AddEnergy(addedEnergy){
    
    if(addedEnergy > 100){
        currentPlayerAttributes.energyLevel = 100;
    }
    
    currentPlayerAttributes.energyLevel += addedEnergy;
}

//EXECUTED FROM script.js
function ChooseDirection(destination){
   
    switch (destination){

        case "Home":
            if (currentPlayerAttributes.homeID == 0){
                EnteringHome();
            }
            else{
                infoboxObj.innerHTML = `<br><div class="optiontext red">You don't live in here.</div><br>`
            }
            
            break;
            
        case "BetterHome":
            if (currentPlayerAttributes.homeID == 1){
                EnteringHome();
            }
            else{
                infoboxObj.innerHTML = `<img src="./img/building_texts/BetterHome_Outside.png" height="140px">
                                        <br><div class="optiontext red">You don't live here.</div><br>`
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

        case "PostOffice":
            infoboxObj.innerHTML = `<div class="UI_text center">
                                    <img src="./img/building_texts/In_PostImg.png" width="${infoboxWidth}px">
                                    </div>
                                    <div class="text-topic">Central post office</div>
                                    <div class="UI_text description">Here you receive your post packages.</div>
                                    <div class="oneColumn border"></div>`;

            if (postPackageInPost){
                infoboxObj.innerHTML += `<div class="twoColumns20-80">
                                            <div class="basicCell"><img src="./img/icons/PostPackageSprite.png" height="40px"></div>
                                            <div class="optiontext green">Here's your package.</div>
                                        </div>`;
                currentItems.push(FindWithAttr(onlineItems, "itemId", postPackagePending));
                
                postPackagePending = 0;
                postPackageInPost = false;
                UpdateBarAndTexts();
            }
            else{
                infoboxObj.innerHTML += `<br>
                                        <div class="optiontext red">You don't have any packages.
                                        <br><br>`;
            }

            break;
        
        case "SomeStore":
            infoboxObj.innerHTML = `<div class="text-topic">Store??</div>
                                    Nothing yet in here. We are still under maintenance. `;
        
            break;

        case "School":
            infoboxObj.innerHTML = `<div class="text-topic">School</div>
                                    <div class="UI_text description">Here you are able to study and enhance your knowledge on things you're interested in.</div>
                                    <div class="oneColumn border"></div>
                                    <br>`;
        


            break;


        case "PetStore":
            infoboxObj.innerHTML = `<div class="text-topic">Petstore</div>
                                    <div class="UI_text description">Here you can find a pet you can really relate to.</div>
                                    <div class="oneColumn border"></div><br>
                                    <div class="twoColumns40-60 topicBorder">
                                        <div class="UI_text middleTopic">Pet to choose</div>
                                        <div class="UI_text middleTopic">Pricing</div>
                                    </div>
                                    `;
            
            for (var i = 1; i < pets.length; i++){ //starts from 1

                if (currentPlayerAttributes.petID == i){
                    // console.log("pass pet");
                }

                else if (currentPlayerAttributes.moneyPoints >= pets[i].petAcquireCost){
                    infoboxObj.innerHTML += `
                                    <div class="twoColumns40-60 moreBottom">
                                    <div class="basicCell"><button class="btn" onclick="PetStoreAction(${i})">${pets[i].petType}</button></div>
                                    <div id="pet-text-${i}" class="optiontext green">${pets[i].storeText} The aquire price is ${pets[i].petAcquireCost}€. Upkeep cost is ${pets[i].petCostWeek}€</div>
                                </div>
                                `;
                }
                else{
                    infoboxObj.innerHTML += `
                                    <div class="twoColumns40-60 moreBottom">
                                    <div class="basicCell"><div class="optiontext orange">You cannot afford this one.</div></div>
                                    <div class="optiontext green">The acquire price for this fellow is ${pets[i].petAcquireCost}€. Upkeep cost is ${pets[i].petCostWeek}€</div>
                                </div>
                                `;
                }
                
            }

            break;


    }

    $(infoboxObj).slideDown(400);

    
}

//HOME ACTIONS------------------------------------------------------------------------------------------------
function EnteringHome(){ //entering some of the homes

    infoboxObj.innerHTML = `<div class="UI_text center">
                                <img src="./img/building_texts/Home_Image.png" width="${infoboxWidth}px">
                            </div>
                            <div class="text-topic">Lo-cost appartment</div>
                            <div class="UI_text description">This is your current appartment.</div>
                            <div class="oneColumn border"></div>
                            <br>`
    infoboxObj.className = "infoboxBase";

    //COPY THE LIST
    if(randomizeNewOnlineContent){
        randomizedOnlineItems = [];
        let tempCopyItemList =[];
        onlineItems.forEach(item => {
            tempCopyItemList.push(item);
        })
    
        
        if (currentItems.length > 0){
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

        }

        for (var i = 0; i < 3; i++){ //display 3 items
            const randItem = Math.floor(Math.random()*tempCopyItemList.length)
            randomizedOnlineItems.push(tempCopyItemList[randItem]);
            tempCopyItemList.splice(randItem, 1);
        }
        

        
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
        for (var i = 0; i < 3; i++){
            let randJob = Math.floor(Math.random()*jobsToShow.length);
            randomizedOnlineJobs.push(jobsToShow[randJob]);
            jobsToShow.splice(randJob, 1); //delete jobs, which are listed from the temp array
        }

        randomizeNewOnlineContent = false;
    }



    CheckHome_AdditionalActions();

    if (currentItems.length > 0){
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
                                <div class="basicCell">${AddHomeStuffButton("Tinder", 'tinder')}</div>
                                <div class="optiontext magenta">Try to hook up with someone.</div>
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

    function CheckHome_AdditionalActions(){

        
        if (currentPlayerAttributes.currentWorkId != 0 || currentPlayerAttributes.rentToDue || currentPlayerAttributes.petID != 0 && currentPlayerAttributes.petMonthlyDue){
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

            if (currentPlayerAttributes.petID != 0 && currentPlayerAttributes.petMonthlyDue){
                infoboxObj.innerHTML += 
                `
                <div class="twoColumns40-60">
                    <div class="basicCell">${AddHomeStuffButton("Pet care", 'petcare')}</div>
                    <div id="pettext_home" class="optiontext green">${pets[currentPlayerAttributes.petID].careInstructions} Your current upkeep cost is ${pets[currentPlayerAttributes.petID].petCostWeek}€.</div>
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
            if (currentPlayerAttributes.energyLevel < 75){ AddEnergy(5); }
            
            ReduceTime_Check(3); //executes also update function
            break;

        case 'tinder':
            //consumes time and add longterm happiness possibility
            OpponentEvents('is checking the tinder.');

            ReduceTime_Check(100); //executes also update function 3
            break;

        case 'internettime':
                        
            if (currentPlayerAttributes.happinessPoints < 35){ currentPlayerAttributes.happinessPoints += 6; }
            document.getElementById('internet_home').innerHTML = "Hehee.. very funny cat videos...";

            ReduceTime_Check(3); //executes also update function
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
                ReduceTime_Check(10); //executes also update function
                
            }

            else if(currentPlayerAttributes.intoxicationLevel > 0){
                elem.innerHTML = "You are drunk. Get some sleep.";
                elem.className = "optiontext red";
            }

            else{
                
                elem.innerHTML = "You are too tired to do that. Get some sleep.";
                elem.className = "optiontext red";
            }

            break;

        case 'checkonlinejobs':   
            OpenOnlineJobs();
            ReduceTime_Check(1); //executes also update function
            break;

        case 'petcare':
            if (currentPlayerAttributes.moneyPoints >= pets[currentPlayerAttributes.petID].petCostWeek){
                currentPlayerAttributes.moneyPoints -= pets[currentPlayerAttributes.petID].petCostWeek;
                currentPlayerAttributes.happinessPoints += 4;
                currentPlayerAttributes.petMonthlyDue = false;
                ReduceTime_Check(3);
                EnteringHome();
            }
            else{
                const rentText = document.getElementById('pettext_home');
                rentText.innerHTML = `Not enough money to take care of your pet. The current upkeep cost is ${pets[currentPlayerAttributes.petID].petCostWeek}€`;
                rentText.className = 'optiontext red';
            }
            break;
        case 'payrent':
        
            if (currentPlayerAttributes.moneyPoints >= rentHomes[currentPlayerAttributes.homeID].rent  && currentPlayerAttributes.rentToDue){
                currentPlayerAttributes.moneyPoints -= rentHomes[currentPlayerAttributes.homeID].rent
                currentPlayerAttributes.rentToDue = false;
                ShowTempMessage('The payment transaction was successful.', 'sms');
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
            infoboxObj.innerHTML = `<div class="xx">${AddButton('<img src="./img/icons/Button_Back.png" height="20px">','Home')}</div>
                                    <div class="text-topic">Your items</div>
                                    <div class="oneColumn border"></div>
                                    
                                    `;
            currentItems.forEach(item =>{
                infoboxObj.innerHTML += `<div class="twoColumns30-70">
                                            <div class="optiontext yellow">${onlineItems[item].item}</div>
                                            <div class="basicCell"><img src="${onlineItems[item].img}" height="80px"></div>
                                        </div>`;
            });
            
            break;
            
    }

};


//ONLINE JOBS---------------------------------------------------------------------------------------------------
function OpenOnlineJobs(){

    infoboxObj.className = "infoboxBase net";
    infoboxObj.innerHTML = `<div class="browserBase">${AddButton('<img src="./img/icons/Button_Back.png" height="20px">','Home')}<div class="browser">http://www.somejobs.com</div></div>
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
        infoboxObj.innerHTML = `<div class="browserBase">${AddButton('<img src="./img/icons/Button_Back.png" height="20px">','Home')}<div class="browser">http://www.somejobs.com/#5435</div></div>
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
        if (currentPlayerAttributes.playerWorkLevel < allwork.worklevel) {
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
    jobIdPending = workID;
    currentPlayerAttributes.jobPendingTime = weeklyTime - 20;
    ReduceTime_Check(3);
    infoboxObj.innerHTML = `<div class="browserBase">${AddButton('<img src="./img/icons/Button_Back.png" height="20px">','Home')}<div class="browser">http://www.somejobs.com/#5435</div></div>
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
    infoboxObj.innerHTML = `<div class="browserBase">${AddButton('<img src="./img/icons/Button_Back.png" height="20px">','Home')}<div class="browser">http://www.somestuff.com/</div></div>
                            <br>`;
    infoboxObj.scrollTop = 0;

    if (postPackagePending == 0){
        for (var i = 0; i < randomizedOnlineItems.length; i++){

            
            //ONLINE ITEMS
            if (randomizedOnlineItems[i].cost <= currentPlayerAttributes.moneyPoints){
                infoboxObj.innerHTML +=  `
                <div class="twoColumns40-60 topicBorder">
                <div class="UI_text middleTopic">${randomizedOnlineItems[i].item}</div>
                <div class="optiontext dark"><button class="btn green" onclick="OrderAnItem(${randomizedOnlineItems[i].itemId}, ${randomizedOnlineItems[i].cost})">Purchase</button></div>
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
            // <div class="optiontext dark">Price: </div>
            // <div class="optiontext dark">Description: </div>
            // <div class="twoColumns40-60 moreBottom">
            // </div>
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
        infoboxObj.innerHTML = `<div class="browserBase">${AddButton('<img src="./img/icons/Button_Back.png" height="20px">','Home')}<div class="browser">http://www.somestuff.com/order#21123</div></div>
                                <br><div class="UI_text description">Hi there stranger! <br><br>
                                Thanks for buying this. I'll post the item right a way! The follow-up code is #5473829543 432 5432 21123. Be sure to write that down. The package should be there shortly.<br><br>

                                Regards, <br>
                                the seller
                                </div>`;
    }

    ReduceTime_Check(1);
    // infoboxObj.innerHTML += `${AddButton('Return', 'Home')}`;
};

function OrderAnItem(itemId, cost){
    
    
    if (cost <= currentPlayerAttributes.moneyPoints){
        currentPlayerAttributes.moneyPoints -= cost;
        postPackagePending = itemId;
        infoboxObj.innerHTML = `<div class="browserBase">${AddButton('<img src="./img/icons/Button_Back.png" height="20px">','Home')}<div class="browser">http://www.somestuff.com/order#21123</div></div>
                                <br><div class="UI_text description">Hi there stranger! <br><br>
                                Thanks for buying this. I'll post the item right a way! The follow-up code is #5473829543 432 5432 21123. Be sure to write that down. The package should be there shortly.<br><br>

                                Regards, <br>
                                the seller
                                </div>`;
        itemInPostAnnouncement = weeklyTime - 15;
        showPostMessage = true;
        UpdateBarAndTexts();
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
                OpponentEvents('is short with money.');

            }

            else{
                barText.innerHTML = "Mmm.. good. You feel a little bit happier.";
                currentPlayerAttributes.moneyPoints -= 5;
                currentPlayerAttributes.intoxicationLevel++;
                OpponentEvents('is having a good time at the bar!');
                ReduceTime_Check(3 + currentPlayerAttributes.intoxicationLevel); //executes also update function
            }
            //if not too toxicated and have money
            break;

        case 'sosialize':
            const rand1 = Math.floor(Math.random()*(15 - currentPlayerAttributes.intoxicationLevel));
            
            if (rand1 == 1 && currentPlayerAttributes.relationshipID == 0){
                const sosializeText = document.getElementById('sosialize_bar');
                sosializeText.innerHTML = 'You found some company!'
                sosializeText.className = 'optiontext magenta'
                currentPlayerAttributes.relationshipID = 2;
                OpponentEvents('met someone.');
            }
            else{
                OpponentEvents('is trying to sosialize...');
            }
            
            ReduceTime_Check(2); //executes also update function
            break;
        
        case 'dance':
            const rand2 = Math.floor(Math.random()*(13 + currentPlayerAttributes.intoxicationLevel))
            
            if (rand2 == 1 && currentPlayerAttributes.relationshipID == 0){
                const danceText = document.getElementById('dance_bar');
                danceText.innerHTML = 'You were able charm someone with your dancing!';
                danceText.className = 'optiontext magenta';
                currentPlayerAttributes.relationshipID = 2;
                
            }

            OpponentEvents('is showing some dance moves!');

            ReduceTime_Check(1); //executes also update function
            break;
    }
    // UpdateBarAndTexts();
};

//PET-------------------------------------------------------------------------------------------------------------
function PetStoreAction(item){
    currentPlayerAttributes.moneyPoints -= pets[item].petAcquireCost;
    currentPlayerAttributes.petID = item;
    ChooseDirection('PetStore');
    currentPlayerAttributes.petMonthlyDue = true;
    // document.getElementById(`pet-text-${item}`).innerHTML = "Great! You bought this nice little fellow. Remember to keep good care of it."
    // pet-text-
    ReduceTime_Check(1);
};


//HELPER FUNCTIONS
function FindWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}

function AddButton(text, action){
    return `<button class="btn" onclick="ChooseDirection('${action}')">${text}</button>`;
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
document.addEventListener('DOMContentLoaded', () =>{

    const statsBumper = document.querySelector('.statsBumper');
    const statusBar = document.querySelector('.characterStatusBar');
    const bumperText = document.querySelector('.bumperText');
    const modal = document.getElementById('modal');
    const wipeOverlay = document.getElementById('wipeOverlay');
    const continueButton = document.getElementById('continueChosenButton');
    const statsButton = document.getElementById('statsButton');
    const statsScreen = document.getElementById('statsScreen');
    const architectClass = document.getElementById('architectClass');
    const sovereignOfTheCitadelClass = document.getElementById('SovereignOfTheCitadelClass');
    const akashicClass = document.getElementById('akashicClass');
    const machinistClass = document.getElementById('machinistClass');
    const closeStatWindow = document.getElementById('closeStatWindow');
    const showHealthOnMainScreen = document.getElementById('showHealthOnMainScreen');
    const showCreativityOnMainScreen = document.getElementById('showCreativityOnMainScreen');
    const showXPOnMainScreen = document.getElementById('showXPOnMainScreen');


    if(localStorage.getItem("PlayerProfile") !== null)
    {
        modal.style.display = "none";
        console.log("saved profile found");
        
        updateUI();
    }



    continueButton.addEventListener("click", () => {
        
        continueButton.classList.add('isClicked');

        wipeOverlay.classList.add('isHiding');
        updateUI();
    });


    closeStatWindow.addEventListener("click", () => {
        statsScreen.style.visibility = "hidden";
        updateUI();
    })



    function updateUI(){

        const savedProfile = localStorage.getItem("PlayerProfile");

        if(savedProfile)
        {

            const mainScreenHealthBarWidth  = document.getElementById('mainScreenHealthBarWidth');
            const mainScreenCreativityBarWidth = document.getElementById('mainScreenCreativityBarWidth');
            const mainScreenXPBarWidth = document.getElementById('mainScreenXPBarWidth');
            const showCharacterSpriteMainScreen = document.getElementById('showCharacterSpriteMainScreen');

            const playerData = JSON.parse(savedProfile);
            const healthPercentageMainScreen = (playerData.CurrentHealth / playerData.MaxHealth) * 100;
            const creavtivityPercentageMainScreen = (playerData.CurrentCreativity / playerData.MaxCreativity) * 100;
            const xpPercentageMainScreen = (playerData.CurrentXP / playerData.NextLevelXP) * 100;

            showHealthOnMainScreen.innerHTML = `${playerData.CurrentHealth} / ${playerData.MaxHealth}`;
            mainScreenHealthBarWidth.style.width = `${healthPercentageMainScreen}%`;

            showCreativityOnMainScreen.innerHTML = `${playerData.CurrentCreativity} / ${playerData.MaxCreativity}`;
            mainScreenCreativityBarWidth.style.width = `${creavtivityPercentageMainScreen}%`;

            showXPOnMainScreen.innerHTML = `${playerData.CurrentXP} / ${playerData.NextLevelXP}`;
            mainScreenXPBarWidth.style.width = `${xpPercentageMainScreen}%`;


            if(playerData.ClassName === "Sovereign of the Citadel")
            {
                showCharacterSpriteMainScreen.src = 'images/SovereignOfTheCitadel.png';
            }

            else if(playerData.ClassName === "Machinist")
            {
                showCharacterSpriteMainScreen.alt = 'Sprite In Progress';
            }

            else if(playerData.ClassName === "Architect")
            {
                showCharacterSpriteMainScreen.alt = 'Sprite In Progress';
            }

            else if(playerData.ClassName === "Akashic")
            {
                showCharacterSpriteMainScreen.alt = 'Sprite In Progress';
            }
        }
    }

    statsButton.addEventListener("click", () => {

        statsScreen.style.visibility = "visible";   
        const savedProfile = localStorage.getItem("PlayerProfile");
        const showClassNameOnStatScreen = document.getElementById('showClassNameOnStatScreen');
        const showLevelOnStatScreen = document.getElementById('showLevelOnStatScreen');
        const showHealthOnStatScreen = document.getElementById('showHealthOnStatScreen');
        const showCreativityOnStatScreen = document.getElementById('showCreativityOnStatScreen');
        const showXPOnStatScreen = document.getElementById('showXPOnStatScreen');
        const showProcessingOnStatScreen = document.getElementById('showProcessingOnStatScreen');
        const showResilienceOnStatScreen = document.getElementById('showResilienceOnStatScreen');
        const showEfficiencyOnStatScreen = document.getElementById('showEfficiencyOnStatScreen');
        const showLogicOnStatScreen = document.getElementById('showLogicOnStatScreen');
        const showStatPointOnStatScreen = document.getElementById('showStatPointOnStatScreen');
        const healthBarWidth = document.getElementById('healthBarWidth');
        const creativityBarWidth = document.getElementById('creativityBarWidth');
        const xpBarWidth = document.getElementById('xpBarWidth');

        if(savedProfile !== null)
        {
            console.log("profile found to display stats");

            const playerData = JSON.parse(savedProfile);
            const healthPercentage = (playerData.CurrentHealth / playerData.MaxHealth) * 100;
            const creativityPercentage = (playerData.CurrentCreativity / playerData.MaxCreativity) * 100;
            const xpPercentage = (playerData.CurrentXP / playerData.NextLevelXP) * 100;

            showClassNameOnStatScreen.innerHTML = `Class: ${playerData.ClassName}`;
            showLevelOnStatScreen.innerHTML = `${playerData.Level}`;
            showHealthOnStatScreen.innerHTML = `${playerData.CurrentHealth} / ${playerData.MaxHealth}`;
            healthBarWidth.style.width = `${healthPercentage}%`;
            showCreativityOnStatScreen.innerHTML = `${playerData.CurrentCreativity} / ${playerData.MaxCreativity}`;
            creativityBarWidth.style.width = `${creativityPercentage}%`;
            showXPOnStatScreen.innerHTML = `${playerData.CurrentXP} / ${playerData.NextLevelXP}`;
            xpBarWidth.style.width = `${xpPercentage}%`;
            showProcessingOnStatScreen.innerHTML = `${playerData.Processing}`;
            showResilienceOnStatScreen.innerHTML = `${playerData.Resilience}`;
            showEfficiencyOnStatScreen.innerHTML = `${playerData.Efficiency}`;
            showLogicOnStatScreen.innerHTML = `${playerData.Logic}`;
            showStatPointOnStatScreen.innerHTML = `Available Stat Points: ${playerData.UnallocatedStatPoints}`

        }




    });




    architectClass.addEventListener("click", () => {

        const message = ["Synchronisation with the System..... Complete", "You have been granted the class: [Architect]", "Welcome to the Codex Player"]
        const displayMessage = document.getElementById('classChosenMessage');

        let messageIndex = 0;
        let characterIndex = 0;
        let typeInterval;

        displayMessage.innerHTML = "";

        const userSetting = {
            ClassName: "Architect",
            Level: 1,
            Processing: 5,
            Resilience: 5,
            Efficiency: 5,
            Logic: 5,
            CurrentCreativity: 10,
            MaxCreativity: 10,
            CurrentHealth: 10,
            MaxHealth: 10,
            CurrentXP: 0,
            NextLevelXP: 10,
            ByteCoins: 0,
            UnallocatedStatPoints: 0,
            Tasks: {Dailies: [], todos: []},
            Inventory: []
        }


        userSetting.Logic = userSetting.Logic.valueOf() + 2;
        userSetting.Efficiency = userSetting.Efficiency.valueOf() + 1;

        const userSettingString = JSON.stringify(userSetting);
        localStorage.setItem('PlayerProfile', userSettingString);
        
        modal.style.display = "none";
        wipeOverlay.classList.add('isWiping');


        function typeChar(){

            console.log("running function");

            if(messageIndex >= message.length)
            {
                continueButton.style.opacity = 1;
                clearInterval(typeInterval);
                return;
            }

            const messageLine = message[messageIndex];
            const currentChar = messageLine.charAt(characterIndex);

            displayMessage.innerHTML += currentChar;
            characterIndex++;


            if(characterIndex >= messageLine.length)
            {
                messageIndex++;
                characterIndex = 0;
                displayMessage.innerHTML += '<br>';
            }

        }


        typeInterval = setInterval(typeChar, 50);






        console.log("Profile Saved");



    })

    sovereignOfTheCitadelClass.addEventListener("click", () => {

        const message = ["Synchronisation with the System..... Complete", "You have been granted the class: [Sovereign of the Citadel] ", "Welcome to the Codex Player"]
        const displayMessage = document.getElementById('classChosenMessage');

        let messageIndex = 0;
        let characterIndex = 0;
        let typeInterval;

        displayMessage.innerHTML = "";


        const userSetting = {
            ClassName: "Sovereign of the Citadel",
            Level: 1,
            Processing: 5,
            Resilience: 5,
            Efficiency: 5,
            Logic: 5,
            CurrentCreativity: 10,
            MaxCreativity: 10,
            CurrentHealth: 10,
            MaxHealth: 10,
            CurrentXP: 0,
            NextLevelXP: 10,
            ByteCoins: 0,
            UnallocatedStatPoints: 0,
            Tasks: {Dailies: [], todos: []},
            Inventory: []
        }


        userSetting.Resilience = userSetting.Resilience.valueOf() + 2;
        userSetting.Logic = userSetting.Logic.valueOf() + 1;

        const userSettingString = JSON.stringify(userSetting);
        localStorage.setItem('PlayerProfile', userSettingString);
        modal.style.display = "none";
        wipeOverlay.classList.add('isWiping');


        
        function typeChar(){

            console.log("running function");

            if(messageIndex >= message.length)
            {
                continueButton.style.opacity = 1;
                clearInterval(typeInterval);
                return;
            }

            const messageLine = message[messageIndex];
            const currentChar = messageLine.charAt(characterIndex);

            displayMessage.innerHTML += currentChar;
            characterIndex++;


            if(characterIndex >= messageLine.length)
            {
                messageIndex++;
                characterIndex = 0;
                displayMessage.innerHTML += '<br>';
            }

        }


        typeInterval = setInterval(typeChar, 50);







        console.log("Profile Saved");


    })



    akashicClass.addEventListener("click", () => {

        const message = ["Synchronisation with the System..... Complete", "You have been granted the class: [Akashic] ", "Welcome to the Codex Player"]
        const displayMessage = document.getElementById('classChosenMessage');

        let messageIndex = 0;
        let characterIndex = 0;
        let typeInterval;

        displayMessage.innerHTML = "";
        
        
        const userSetting = {
            ClassName: "Akashic",
            Level: 1,
            Processing: 5,
            Resilience: 5,
            Efficiency: 5,
            Logic: 5,
            CurrentCreativity: 10,
            MaxCreativity: 10,
            CurrentHealth: 10,
            MaxHealth: 10,
            CurrentXP: 0,
            NextLevelXP: 10,
            ByteCoins: 0,
            UnallocatedStatPoints: 0,
            Tasks: {Dailies: [], todos: []},
            Inventory: []
        }


        userSetting.Logic = userSetting.Logic.valueOf() + 2;
        userSetting.Efficiency = userSetting.Efficiency.valueOf() + 1;


        const userSettingString = JSON.stringify(userSetting);
        localStorage.setItem('PlayerProfile', userSettingString);
        modal.style.display = "none";
        wipeOverlay.classList.add('isWiping');


        function typeChar(){

            console.log("running function");

            if(messageIndex >= message.length)
            {
                continueButton.style.opacity = 1;
                clearInterval(typeInterval);
                return;
            }

            const messageLine = message[messageIndex];
            const currentChar = messageLine.charAt(characterIndex);

            displayMessage.innerHTML += currentChar;
            characterIndex++;


            if(characterIndex >= messageLine.length)
            {
                messageIndex++;
                characterIndex = 0;
                displayMessage.innerHTML += '<br>';
            }

        }


        typeInterval = setInterval(typeChar, 50);
        
        


        console.log("Profile Saved");



    })




    machinistClass.addEventListener("click", () => {


        const message = ["Synchronisation with the System..... Complete", "You have been granted the class: [Machinist] ", "Welcome to the Codex Player"];
        const displayMessage = document.getElementById('classChosenMessage');

        let messageIndex = 0;
        let characterIndex = 0;
        let typeInterval;

        displayMessage.innerHTML = "";
         

        const userSetting = {
            ClassName: "Machinist",
            Level: 1,
            Processing: 5,
            Resilience: 5,
            Efficiency: 5,
            Logic: 5,
            CurrentCreativity: 10,
            MaxCreativity: 10,
            CurrentHealth: 10,
            MaxHealth: 10,
            CurrentXP: 0,
            NextLevelXP: 10,
            ByteCoins: 0,
            UnallocatedStatPoints: 0,
            Tasks: {Dailies: [], todos: []},
            Inventory: []
        };


        userSetting.Efficiency = userSetting.Efficiency.valueOf() + 2;
        userSetting.Resilience = userSetting.Resilience.valueOf() + 1;


        const userSettingString = JSON.stringify(userSetting);
        localStorage.setItem('PlayerProfile', userSettingString);
        modal.style.display = "none";
        wipeOverlay.classList.add('isWiping');


        function typeChar(){

            console.log("running function");

            if(messageIndex >= message.length)
            {
                continueButton.style.opacity = 1;
                clearInterval(typeInterval);
                return;
            }

            const messageLine = message[messageIndex];
            const currentChar = messageLine.charAt(characterIndex);

            displayMessage.innerHTML += currentChar;
            characterIndex++;


            if(characterIndex >= messageLine.length)
            {
                messageIndex++;
                characterIndex = 0;
                displayMessage.innerHTML += '<br>';
            }

        }


        typeInterval = setInterval(typeChar, 50);
        
        


        console.log("Profile Saved");

        


    })




    statsBumper.addEventListener("click", () =>{

        statusBar.classList.toggle('isHidden');

        if(statusBar.classList.contains('isHidden'))
        {
            bumperText.textContent = 'Show Stats';
        }
        else
        {
            bumperText.textContent = 'Hide Stats';
        }


    });

});


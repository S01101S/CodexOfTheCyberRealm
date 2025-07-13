document.addEventListener('DOMContentLoaded', () =>{

    const statsBumper = document.querySelector('.statsBumper');
    const statusBar = document.querySelector('.characterStatusBar');
    const bumperText = document.querySelector('.bumperText');
    const modal = document.getElementById('modal');
    const wipeOverlay = document.getElementById('wipeOverlay');
    const continueButton = document.getElementById('continueChosenButton');


    continueButton.addEventListener("click", () => {
        

        continueButton.classList.add('isClicked');

        wipeOverlay.classList.add('isHiding');

    });




    const architectClass = document.getElementById('architectClass');
    const sovereignOfTheCitadelClass = document.getElementById('SovereignOfTheCitadelClass');
    const akashicClass = document.getElementById('akashicClass');
    const machinistClass = document.getElementById('machinistClass');

    


    if(localStorage.getItem("PlayerProfile") !== null)
    {
        modal.style.display = "none";
        console.log("saved profile found");
    }



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
            ClassName: "The Akashic",
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
            ClassName: "The Machinist",
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


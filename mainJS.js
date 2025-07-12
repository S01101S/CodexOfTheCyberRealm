document.addEventListener('DOMContentLoaded', () =>{

    const statsBumper = document.querySelector('.statsBumper');
    const statusBar = document.querySelector('.characterStatusBar');
    const bumperText = document.querySelector('.bumperText');
    const modal = document.getElementById('modal');




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
        console.log("Profile Saved");



    })

    sovereignOfTheCitadelClass.addEventListener("click", () => {

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
        console.log("Profile Saved");


    })



    akashicClass.addEventListener("click", () => {
        
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
        console.log("Profile Saved");



    })




    machinistClass.addEventListener("click", () => {

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
        }


        userSetting.Efficiency = userSetting.Efficiency.valueOf() + 2;
        userSetting.Resilience = userSetting.Resilience.valueOf() + 1;


        const userSettingString = JSON.stringify(userSetting);
        localStorage.setItem('PlayerProfile', userSettingString);
        console.log("Profile Saved");

        


    })



    window.onclick = function(event){
        if(event.target == modal){
            modal.style.display = "none";
        }
    }


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


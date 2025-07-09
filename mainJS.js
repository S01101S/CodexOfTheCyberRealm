document.addEventListener('DOMContentLoaded', () =>{

    const statsBumper = document.querySelector('.statsBumper');
    const statusBar = document.querySelector('.characterStatusBar');
    const bumperText = document.querySelector('.bumperText')


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


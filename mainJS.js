document.addEventListener('DOMContentLoaded', () =>{

    const statsBumper = document.querySelector('.statsBumper');
    const statusBar = document.querySelector('.characterStatusBar');
    const bumperText = document.querySelector('.bumperText');
    const modal = document.getElementById('modal');
    const modalButton = document.getElementById('myBtn');
    const span = document.querySelector('.close');

    modalButton.onclick = function(){
        modal.style.display = "block";
    }

    span.onclick = function(){
        modal.style.display = "none";
    }

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


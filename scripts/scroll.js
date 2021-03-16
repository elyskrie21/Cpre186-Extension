function scrollToRecipe() {
    let printElement;
    let aElments = document.body.querySelectorAll('a');

    aElments.forEach((element) => {
        text = element.textContent.toLowerCase();
        if (text.includes('print') || text.includes('print recipe')) {
            printElement = element;
        }
    });

    if (printElement == undefined) {
        let buttons = document.body.querySelectorAll('button');

        buttons.forEach((element) => {
            text = element.textContent.toLowerCase();
            if (text.includes('print') || text.includes('print recipe')){
                printElement = element; 
            }
        });
    }

    printElement.scrollIntoView(true, {
        behavior: 'smooth',
        block: 'end'
    })
}

scrollToRecipe()
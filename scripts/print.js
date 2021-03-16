function printRecipe() {
    let printElement;
    let aElments = document.body.querySelectorAll('a');

    for (const element of aElments) {
        console.log("Here is an element: " + element);
        text = element.textContent.toLowerCase();
        if (text.includes("print") || text.includes("print recipe")) {
          printElement = element;
          break;
        }
      }    

    if (printElement == undefined) {
        let buttons = document.body.querySelectorAll("button");
    
        for (const element of buttons) {
          text = element.textContent.toLowerCase();
          if (text.includes("print") || text.includes("print recipe")) {
            printElement = element;
            break; 
          }
        }
      }
    printElement.click()

}

printRecipe()
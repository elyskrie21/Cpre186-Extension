aElements = document.body.querySelectorAll('a')
console.log(aElements)

aElements.forEach(element => {
    console.log(element.textContent)
    text = element.textContent.toLowerCase()
    if (text.includes('print') || text.includes('print recipe')) {
        console.log("This element can print " + element)
        console.log(element.href)
        window.open(element.href)
    }
});
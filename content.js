alert('this is working')
document.body.querySelectorAll('a').forEach(function(node) {
    if (node.text.toLowerCase().includes('print recipe')) {
        let classes = node.className;
        alert(classes)
    }
});
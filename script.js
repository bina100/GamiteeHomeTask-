/*
A function that creates a color for each element
Checks if the element already exists in the dictionary then
returns the existing color otherwise 
sends to the function to create a new color
*/
function getColor(nameElement){
    if(!dictColor[nameElement]){
        var color = getRandomColor();
        dictColor[nameElement] = color;  
        return dictColor[nameElement]
    } 
    return dictColor[nameElement]
}

/*
A function that creates a random color
*/
function getRandomColor(){
    var letters = '0123456789ABCDEF';
    var color = '#';
    for(var i=0; i<6; i++){
        color += letters[Math.floor(Math.random()*16)];
    }
    return color;
}

/*
A function that adds a new div to the parent for each son element
*/
function addElement (name, color, father, count) {
    var colorElement = color;
    var nameElement = name;
    var father = father;
    const newDiv = document.createElement("div"); // create a new div element
    newDiv.style.border = "solid "+colorElement+"";
    newDiv.style.margin = "2%";
    newDiv.id = ""+nameElement+count;
    newDiv.className = "divClass";
    newDiv.draggable = true;
    const newContent = document.createTextNode(" "+nameElement); // and give it some content
    newDiv.appendChild(newContent); // add the text node to the newly created div
    document.getElementById(father).appendChild(newDiv); // add the newly created element and its content into the DOM
    return newDiv.id;
}

/*
A recursive function that sends to the addElement function 
and if the element has sons sends the son to the function itself- FoundChild
*/
function FoundChild(root, idFather, countChildElement){
    var numChild = 0;
    while(root.children[numChild]!=null && numChild<countChildElement){ //Checks if he has children who have not yet passed them
        var color=getColor(root.children[numChild].nodeName)
        var idFather1 = addElement(root.children[numChild].nodeName,color, idFather,numChild);
        FoundChild(root.children[numChild], idFather1, root.children[numChild].childElementCount);
        dictElement[idFather1] = root.children[numChild];
        numChild++;
    }
}

var dictColor={} //A dictionary of colors, a different color for each element type
var dictElement={}; //A dictionary of elements, keeps for each box its original object To know which element to paint when the mouse moves over the box

//The first div of body
var bodyElement =document.body;
var len = bodyElement.childElementCount;
var color=getColor("body");
var bodyDiv = document.createElement('div');
bodyDiv.style.border = "solid "+color+"";
bodyDiv.style.flexDirection = "column";
bodyDiv.id = "bodyDiv";
bodyDiv.className = "divClass";
const newContent = document.createTextNode("BODY");
bodyDiv.appendChild(newContent);
document.body.appendChild(bodyDiv);
dictElement[bodyDiv.id] = bodyElement;
FoundChild(bodyElement, bodyDiv.id, len);

var dragged = null; //The element currently being dragged
var droped = null; //The element being dropped

/*
Event listener that checks if the mouse moves over the boxes 
and painting  the elements up with a light background and 
checks if an element is dragged/ dropped in the boxes and drags/ drops the element up
*/
document.querySelectorAll('.divClass').forEach(item=>{
    item.addEventListener('mouseover', event =>{
        if(item.id != "bodyDiv"){ //Paint only the elements of the body and not the entire screen
            dictElement[item.id].style.backgroundColor = "#E9967A";
        }
    })
    item.addEventListener('mouseout', event =>{
        dictElement[item.id].style.backgroundColor = "";
    })
    item.addEventListener('dragstart', event => { 
        dragged = event.target; //Saves the pressed element to dragged
    })
    item.addEventListener('dragover', event => {
        event.preventDefault()
      })
    item.addEventListener('drop', event => { 
        droped = event.target //Saves the element where the mouse was released from a click
        droped.appendChild(dragged); //Add the dragged element to the droped element child in the boxes
        dictElement[droped.id].appendChild(dictElement[dragged.id]); //Add the dragged element to the droped element child
    })
})





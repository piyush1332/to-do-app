export const createElement = (obj) => {
    const element = document.createElement(obj.element);
    const attributeList = obj.attribute;
    const eventList = obj.event;
    // creating element attributes
    for( const key in attributeList ) {
        element.setAttribute(key , attributeList[key]);
    }
    // attaching event functions
    for( const event in eventList ) {
        element[event] = function() { eventList[event](this) }
    }
    return element;
}

export const structureElements = ( variableName , elementProperties , taskText ) => {
    const elementContainer = {};
    const structure = [ [ 1 , 5 ] , [ 4 , null ] , [ 2 , 6 ]  , [ 3 , 7 ] ];
    variableName.map( (value , index) => elementContainer[value] = createElement(elementProperties[index]));
    structure.map((value) => elementContainer[variableName[value[0]]].appendChild(value[1] === null ? document.createTextNode(taskText) : elementContainer[variableName[value[1]]] ));
    structure.map((value) => elementContainer[variableName[0]].appendChild(elementContainer[variableName[value[0]]]));
    return elementContainer;
}

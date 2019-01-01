import ReactDOM from 'react-dom';

export const calcFunction = (parentWidth, widthInPercent, widthInPixel ) => {
    return parentWidth *  widthInPercent / 100 - widthInPixel
}
    
export const getFullWidth = (self) => {
    const node = ReactDOM.findDOMNode(self)
    return node.offsetWidth
}

export const getWidthById = (id) => {
    return document.getElementById(id).offsetWidth
}

export const getBodyWidth = () => {
    return 
}
export const getParentFullWidth = (self) => {
    const node = ReactDOM.findDOMNode(self)
    console.log(node)
    
}

export const returnAsCalcFunction = (widthInPercent, operator, widthInPixel) => {
    return "calc(" + widthInPercent + "% " + operator + " " + widthInPixel + "px)"
}

export const returnAsSeconds = (numberOfSeconds) => {
    return numberOfSeconds + "s"
}
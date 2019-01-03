const getElementByMouesPosition = (x, y, classesAlowed=null, returnMany=true) => {
    const elements = document.elementsFromPoint(x, y).filter(element => {
        if (classesAlowed){
            return classesAllowed.includes(element.className)
        }
        return true
    })
    return returnMany ? elements : element[0]
}
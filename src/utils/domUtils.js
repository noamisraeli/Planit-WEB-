export const getElementByMouesPosition = (x, y, classesAllowed=null, returnMany=true) => {
    const elements = document.elementsFromPoint(x, y).filter(element => {
        if (classesAllowed){
            return classesAllowed.includes(element.className)
        }
        return true
    })
    return returnMany ? elements : elements[0]
}
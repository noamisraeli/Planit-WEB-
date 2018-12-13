

export function getHourAsPixels(date1, date2, hourAsPixel){
    return Math.abs(date1 - date2) / 36e5 * hourAsPixel
}

export function getPixelsAsHour(length, startTime, hourAsPixel){
    return new Date(startTime.getTime() + length / hourAsPixel * 36e5)

}

export function getItimByItemID(listOfItems, ItemId){
    for(let index=0; index < listOfItems.length; index++){
        if(listOfItems.id === ItemId){
            return listOfItems[index]
        }
    }
}
export function getMainNode(self){
    return
}
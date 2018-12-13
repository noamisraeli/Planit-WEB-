
const _mainWidth = window.outerWidth

export function recalculateStyle(widhtPercentage){
    if (typeof(widhtPercentage) === "number"){
        return _mainWidth / 100 * widhtPercentage
    }
    return  _mainWidth / 100 * new Number(widhtPercentage.slice(0, -1))
}


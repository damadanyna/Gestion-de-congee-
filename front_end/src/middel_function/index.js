export default class MiddelFunction {
    static cutStr(str, end) {
        if (str.length > end - 3) {
            return str.substring(0, end - 3) + '...'
        } else return str
    }
}
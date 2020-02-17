export default class DateService {
    constructor() {}
    public static getDayName(num: number) {
        let d = num % 7;
        d = d === 0 ? 7 : d;
        var days = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ];
        return days[d - 1];
    }

    public static getMonthName(num: number) {
        var months = [
            'JANUARY',
            'FEBRUARY ',
            'MARCH',
            'APRIL',
            'MAY',
            'JUNE',
            'JULY',
            'AUGUST',
            'SEPTEMBER',
            'OCTOBER',
            'NOVEMBER',
            'DECEMBER '
        ];
        return months[num - 1];
    }
    public static diffDays(date1, date2) {
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return diffDays;
    }
    public static diifWeaks(date1, date2) {
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        var diffWeak = Math.ceil(timeDiff / (1000 * 3600 * 24 * 7));
        return diffWeak;
    }

    public static groupQuestions(start, end, type, data) {
        let temp = [];
        let result = [];
        for (let i = 0; i < data['length']; i++) {
            if (temp.indexOf(data[i]['FLD_TEXT']) === -1) {
                temp.push(data[i]['FLD_TEXT']);
                let obj = {
                    FLD_START_DATE: data[i]['FLD_START_DATE'],
                    FLD_END_DATE: data[i]['FLD_END_DATE'],
                    FLD_TEXT: data[i]['FLD_TEXT'],
                    details: ''
                };
                result.push(obj);
            }
        }
        for (let i = 0; i < temp.length; i++) {
            let d = data.filter(x => x.FLD_TEXT === temp[i]);
            result[i].details = this.setPart(start, end, type, d);
        }
        return result;
    }
    public static setPart(startDate: Date, endDate: Date, type: number, data) {
        let res = [];
        res = [];
        for (let i = 0; i < data.length; i++) {
            let obj = {
                datepartAverage: data[i]['avg_result'],
                date: data[i]['datepart'],
                dateGroup: data[i]['datepart_group']

            };
            res.push(obj);
        }
        return res;
    }
}

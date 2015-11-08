export default function makeMonth(startingDate) {
    const beginningOfMonth = new Date(startingDate)
    beginningOfMonth.setDate(1);

    let alreadyStarted = false;

    let currentDay = beginningOfMonth;
    let previousDay = new Date(currentDay);
    let month = [];
    let week = [];

    previousDay.setDate(currentDay.getDate() - 1);

    while (true) {
        previousDay = currentDay;
        currentDay = new Date(previousDay);
        currentDay.setDate(previousDay.getDate() + 1);

        if (currentDay.getDate() == 1 && alreadyStarted) {
            month.push(week)
            break;
        }

        alreadyStarted = true;

        // if the day has looped back around and its a week
        if (currentDay.getDay() < previousDay.getDay()) {
            month.push(week);
            week = [];
        }


        if (currentDay.getDay() >= 1 && currentDay.getDay() <= 5) {
            week.push(currentDay);
        }
    }

    return month;
}
import moment from 'moment';

export default function makeMonth(startingDate) {
    const beginningOfMonth = new Date(startingDate)
    beginningOfMonth.setDate(1);

    let alreadyStarted = false;

    console.log('beginningOfMonth', beginningOfMonth);

    let currentDay = beginningOfMonth;
    let previousDay = new Date(currentDay);
    let month = [];
    let week = [
        currentDay,
    ];

    previousDay.setDate(currentDay.getDate() - 1);

    while (true) {
        previousDay = currentDay;
        currentDay = new Date(previousDay);
        currentDay.setDate(previousDay.getDate() + 1);

        console.group(currentDay);
        console.log('Previous day:', previousDay)

        if (currentDay.getDate() == 1 && alreadyStarted) {
            console.log('this condition for day', currentDay);
            console.log('pushing week into month:', week);
            month.push(week)
            break;
        }

        alreadyStarted = true;

        // if the day has looped back around and its a week
        if (currentDay.getDay() < previousDay.getDay()) {
            console.log('if the day has looped back around and its a week');
            console.log('pushing week into month:', week);
            month.push(week);
            week = [];
        }

        if (currentDay.getDay() >= 1 && currentDay.getDay() <= 5) {
            console.log('day is that weird condition');
            console.log({previousDay});
            console.log({currentDay});
            week.push(currentDay);
        }

        console.groupEnd();
    }
    console.groupEnd();

    return month.map((week) => {
      const firstMoment = moment(week[0]);
      const lastMoment = moment(week[week.length - 1]);

      let description = firstMoment.format('Do');
      if (week.length === 1) {
        description += ` ${firstMoment.format('MMMM')}`;
      } else {
        description += ` - ${lastMoment.format('Do MMMM')}`;
      }

      return {
        description,
        quantity: week.length,
      }
    });
}
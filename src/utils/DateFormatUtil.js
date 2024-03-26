
const DateFormatUtil = (props) => {

    const {event_date} = props

    const date = new Date(event_date);
    return new Intl.DateTimeFormat(
        'en-GB', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    }).format(date);
    };
    
export default DateFormatUtil;
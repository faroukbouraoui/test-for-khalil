import moment from "moment";


const getCurrentLocalDate = (props,date)=>{
    
    if(props.auth.lang == 'fr'){
      moment.locale("fr");
      return moment(date).format('L')
    }
    if(props.auth.lang == 'ar'){
      moment.locale("ar-tn");
      return date
    }
}

export default getCurrentLocalDate
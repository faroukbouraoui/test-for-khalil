import detectBrowserLanguage from 'detect-browser-language'
import messagesAr from "../../lang/ar";
import messagesFr from "../../lang/fr";


const getLanguage=(props)=>{
   if(! props.auth.lang && detectBrowserLanguage() =='fr'){
   
     return  messagesFr
   }
   if(! props.auth.lang && detectBrowserLanguage() =='ar'){
     return messagesAr
   }
   if(props.auth.lang == 'fr'){
     return messagesFr
   }
   if(props.auth.lang == 'ar'){
     return messagesAr
   }

  return messagesFr
 }
  export default getLanguage


import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Row, Col, Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom'
import contactIllustration from '../assets/img/contact-illustration.png'
import { apiURL } from "../Config/Config";
import isEmail from "validator/lib/isEmail";
import getLanguage from "./utilFunction/language"


const Contact = (props)=>{
    const [contact, setContact]= useState({nom:'',email:'',tel:'',sujet:'',message:'', validation:{error:[true,true,true,true,true], errorMsg:["required","required","required","required","required"]}});
    const [contactError, setContactError] = useState([true,true,true,true,true]);
    const [contactErrorMsg, setContactErrorMsg] =  useState(['','','','','']);
    useEffect(() => { 
        window.scrollTo(0, 0)
    }, []);



    const onChangeData=(value,key,index)=>{
        let aux ={...contact}
            aux[key]=value
            if(key=="nom"){
              if(value.trim()===''){
                aux.validation.error[index]=true
                aux.validation.errorMsg[index]='required'
              }else{
                aux.validation.error[index]=false
                aux.validation.errorMsg[index]=''
              }
            }
            
            
            if(key=="email"){
              if(value.trim()===''){
                aux.validation.error[index]=true
                aux.validation.errorMsg[index]='required'
              }
              if(!isEmail(value)){
            
            aux.validation.error[index]=true
            aux.validation.errorMsg[index]='verifier que vous avez saisir une adresse email valide'
          }
              else{
                aux.validation.error[index]=false
                aux.validation.errorMsg[index]=''
              }
            }
            if(key == "tel"){
                if(value.trim() ===''){
                    aux.validation.error[index]=true
                    aux.validation.errorMsg[index]='required' 
                }
                if(isNaN(value) || value.length <7){
                    aux.validation.error[index]=true
                    aux.validation.errorMsg[index]='verifier que vous avez saisir un numéro de téléphone valide' 
                }
                else{
                    aux.validation.error[index]=false
                    aux.validation.errorMsg[index]='' 
                }
            }
            if(key == "sujet"){
                if(value.trim() ===''){
                    aux.validation.error[index]=true
                    aux.validation.errorMsg[index]='required' 
                }
                else{
                    aux.validation.error[index]=false
                    aux.validation.errorMsg[index]='' 
                }
            }
            if(key == "message"){
                if(value.trim() ===''){
                    aux.validation.error[index]=true
                    aux.validation.errorMsg[index]='required' 
                }
                else{
                    aux.validation.error[index]=false
                    aux.validation.errorMsg[index]='' 
                }
            }
            setContact(aux)
        }

        const submitForm =async()=>{
            const ERROR = [...contact.validation.error]
            const ERROR_MSG=[...contact.validation.errorMsg]
            setContactError(ERROR)
            setContactErrorMsg(ERROR_MSG)
            
            if(!contact.validation.error.includes(true)){
                let formdata =new FormData()
                            formdata.append('name',contact.nom)
                            formdata.append('email',contact.email)
                            formdata.append('tel',contact.tel)
                            formdata.append('subject',contact.sujet)
                            formdata.append('message',contact.message)
                            formdata.append('admin_id',1)
                    
                            const requestOptions = {
                              method: 'POST',
                              body: formdata
                            };
                const data = await fetch(apiURL+"/contact/add", requestOptions);
                if(data.status == 201){
                const dataJson = await data.json();
                setContact('');
                window.location.reload()
                }            
            }
        }

    return(

        <>
            {/* Contact banner */}
            <section className="contact-banner">
                <Row align="middle" gutter={130}>
                    <Col sm={24} md={10}>
                        <h2 className={props.auth.lang+"_contact-title"}>{getLanguage(props).Contact}</h2>
                        <p className={props.auth.lang+"_contact-help-text"}>{getLanguage(props).ContactText1}</p>
                    </Col>
                    <Col sm={24} md={14}>
                        <p className={props.auth.lang+"_contact-testimonial-text"}>
                        {getLanguage(props).ContactText2}
                        </p>
                    </Col>
                </Row>
            </section>
            {/* Contact Form */}
            <section className="contact-content">
                <Row >
                    <Col xs={24} sm={24} md={11} className="contact-form-column">
                        <Form name="">
                            <Form.Item style={{ marginBottom: 18 }} name={['user', 'name']}>
                                <Input placeholder={getLanguage(props).VotreNom} style={props.auth.lang == 'ar'?{textAlign:"right"}:null} className="contact-input-shadow contact-form-input" onChange={(e)=>onChangeData(e.target.value,'nom',0)} />
                                {contactError[0]&&<div style={{color:'red'}}>{contactErrorMsg[0]}</div>}
                            </Form.Item>
                            <Form.Item style={{ marginBottom: 18 }} name={['user', 'email']}>
                                <Input placeholder={getLanguage(props).Email} style={props.auth.lang == 'ar'?{textAlign:"right"}:null} className="contact-input-shadow contact-form-input" onChange={(e)=>onChangeData(e.target.value,'email',1)} />
                                {contactError[1]&&<div style={{color:'red'}}>{contactErrorMsg[1]}</div>}
                            </Form.Item>
                            <Form.Item style={{ marginBottom: 18 }} name={['user', 'phone']}>
                                <Input placeholder={getLanguage(props).Tel} style={props.auth.lang == 'ar'?{textAlign:"right"}:null} className="contact-input-shadow contact-form-input" onChange={(e)=>onChangeData(e.target.value,'tel',2)} />
                                {contactError[2]&&<div style={{color:'red'}}>{contactErrorMsg[2]}</div>}
                            </Form.Item>
                            <Form.Item style={{ marginBottom: 18 }} name={['user', 'sujet']} >
                                <Input placeholder={getLanguage(props).Subject} style={props.auth.lang == 'ar'?{textAlign:"right"}:null} className="contact-input-shadow contact-form-input" onChange={(e)=>onChangeData(e.target.value,'sujet',3)} />
                                {contactError[3]&&<div style={{color:'red'}}>{contactErrorMsg[3]}</div>}
                            </Form.Item>
                            <Form.Item style={{ marginBottom: 18 }} name={['user', 'message']}>
                                <Input.TextArea placeholder={getLanguage(props).message} style={props.auth.lang == 'ar'?{textAlign:"right"}:null} className="contact-input-shadow contact-form-textarea-input" onChange={(e)=>onChangeData(e.target.value,'message',4)} />
                                {contactError[4]&&<div style={{color:'red'}}>{contactErrorMsg[4]}</div>}
                            </Form.Item>
                            <Form.Item style={{ marginBottom: 18 }}>
                                <Button htmlType="submit" className={props.auth.lang+"_contact-btn-form"} onClick={submitForm}>
                                 {getLanguage(props).Envoyer}
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col sm={24} md={13} className="contact-illustration-column">
                    <div className="contact-illustration"></div>
                        <img src={contactIllustration} className="contact-illustration-img mobileHidden"/>
                    </Col>
                </Row>
            </section>
        </>
    )
}


const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => {
        dispatch(action);
        },
    };
};
const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        };
    };
      
export default connect(mapStateToProps, mapDispatchToProps)(Contact);
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom'
import email from '../assets/img/email.png'
import facebook from '../assets/img/facebook.png'
import getLanguage from "./utilFunction/language"

const Footer = (props)=>{
    useEffect(() => { 
        window.scrollTo(0, 0)
    }, []);

    return(

        <>
            <div className="footer">
                <Row align="top" style={props.auth.lang == 'ar'?{direction:"rtl"}: null}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <h2 className={props.auth.lang+"_left-grid-footer-title"}>{getLanguage(props).aProps}</h2>
                        <p className={props.auth.lang+"_left-grid-footer-content"}>
                        {getLanguage(props).footerContent1}<br /><br />
                        {getLanguage(props).footerContent2}
                        </p>
                        {props.auth.lang =='ar'?<Link to="/contact">
                            <Button className={props.auth.lang+"_footer-contact-button"}>{getLanguage(props).ContactezNous}</Button>
                        </Link>:null}
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12} className={props.auth.lang+"_footer-left-padding"}>
                        <h2 className={props.auth.lang+"_right-grid-footer-title"}>{getLanguage(props).Contact}</h2>
                        <div className="footer-email-display">
                            <a href="mailto:info@26Janvier.tn"> <img src={email}/></a>
                            <a href="mailto:info@26Janvier.tn" className={props.auth.lang+"_footer-email-text"}>info@26janvier.tn</a>
                        </div>
                        <h2 className={props.auth.lang+"_footer-media-title"}>{getLanguage(props).RetrouvezNous}</h2>
                        <a href="https://www.facebook.com/Mansinech26/" target="_blank" rel="noopener noreferrer">
                            <img src={facebook} className="a"/>
                        </a>
                        {props.auth.lang =='fr'?<Link to="/contact">
                            <Button className={props.auth.lang+"_footer-contact-button"}>{getLanguage(props).ContactezNous}</Button>
                        </Link>:null}
                    </Col>
                </Row>
            </div>
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
      
export default connect(mapStateToProps, mapDispatchToProps)(Footer);
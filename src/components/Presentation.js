import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom'
import dochouse from '../assets/img/doc-house-logo.png'
import afak from '../assets/img/afak-logo.png'
import ugtt from '../assets/img/ugtt-logo.png'
import ftdes from '../assets/img/ftdes-logo.png'
import ltdh from '../assets/img/ltdh.png'
import getLanguage from "./utilFunction/language";


const Presentation = (props)=>{
    useEffect(() => { 
        window.scrollTo(0, 0)
    }, []);



return(

        <>
            {/* Presentation Image-Text */}
            <section className="slider-presentation-section">
                <h1 className={props.auth.lang+"_presentation-title"}>{getLanguage(props).presentationTitle}</h1>
                
                <p className={props.auth.lang+"_presentation-description"}>
                {getLanguage(props).presentationDescription}
                </p>
            </section>
            {/* Presentation text */}
            <section className="presentation-content-section">
            {props.auth.lang=='fr'?<p className="presentation-content">
            {getLanguage(props).presentationContentOne} <br /><br /><br />
            <b className="">1.&nbsp;</b> {getLanguage(props).presentationContentTwo} <br /><br /><br />
            <b>2.&nbsp;</b> {getLanguage(props).presentationContentThree}<br /><br /><br />
            <b>3.&nbsp;</b> {getLanguage(props).presentationContentFour}
            </p>:<p className={props.auth.lang+"_presentation-content"}>
            {getLanguage(props).presentationContentFive} <br /><br /><br />
            <b className="">1.&nbsp;</b>  {getLanguage(props).presentationContentSix} <br /><br /><br />
            <b>2.&nbsp;</b> {getLanguage(props).presentationContentSeven}<br /><br /><br />
            <b>3.&nbsp;</b> {getLanguage(props).presentationContentEight}
            </p>}
                
            </section>
            {/* Presentation partners */}
            <section className="presentation-organizer-section">
                <div className={props.auth.lang+"_presentation-organizer-title-display"}>
                    <span className="presentation-organizer-title-decoration"></span>
                    <h2 className={props.auth.lang+"_presentation-organizer-title"}>{getLanguage(props).presentationOrganizerTitle}</h2>
                </div>
                <Row justify="center" gutter={[20, 20]}>
                    <Col sm={24} md={12} lg={12} className="presentation-column">
                            <div className="presentation-organizer">
                            <div className={props.auth.lang+"_presentation-organizer1"}>
                                <img src={ugtt} className="presentation-organizer-icon"/>
                                <h2 className={props.auth.lang+"_presentation-organizer-icon-title"}>
                                    {getLanguage(props).presentationOrgIconTitle}
                                </h2>
                            </div>
                                <p className={props.auth.lang+"_presentation-organizer-content"}>
                                    {getLanguage(props).presentationOrgCentent}
                                </p>
                            </div>
                        </Col>
                        <Col sm={24} md={12} lg={12} className="presentation-column">
                            <div className="presentation-organizer">
                            <div className={props.auth.lang+"_presentation-organizer1"}>
                                <img src={dochouse} className="presentation-organizer-icon"/>
                                <h2 className={props.auth.lang+"_presentation-organizer-icon-title"}>{getLanguage(props).presentationOrgIconTitleOne}</h2>
                                </div>
                                <p className={props.auth.lang+"_presentation-organizer-content"}>{getLanguage(props).presentationOrgCententOne}</p>
                            </div>
                        </Col>
                        <Col sm={24} md={12} lg={8} className="presentation-column">
                            <div className="presentation-organizer">
                            <div className={props.auth.lang+"_presentation-organizer1"}>
                                <img src={afak} className="presentation-organizer-icon"/>
                                <h2 className={props.auth.lang+"_presentation-organizer-icon-title1"}>{getLanguage(props).presentationOrgIconTitle1} </h2>
                                </div>
                                <p className={props.auth.lang+"_presentation-organizer-content"}>{getLanguage(props).presentationOrgCententTwo}</p>
                            </div>
                        </Col>
                        <Col sm={24} md={12} lg={8} className="presentation-column">
                            <div className="presentation-organizer">
                            <div className={props.auth.lang+"_presentation-organizer1"}>
                                <img src={ftdes} className="presentation-organizer-icon"/>
                                <h2 className={props.auth.lang+"_presentation-organizer-icon-title1"}>{getLanguage(props).presentationOrgIconTitleThree}</h2>
                                </div>
                                <p className={props.auth.lang+"_presentation-organizer-content"}>{getLanguage(props).presentationOrgCententThree}</p>
                            </div>
                        </Col>
                        <Col sm={24} md={12} lg={8} className="presentation-column">
                            <div className="presentation-organizer">
                            <div className={props.auth.lang+"_presentation-organizer1"}>
                                <img src={ltdh} className="presentation-organizer-icon"/>
                                <h2 className={props.auth.lang+"_presentation-organizer-icon-title1"}>{getLanguage(props).presentationOrgIconTitleFour}</h2>
                                </div>
                                <p className={props.auth.lang+"_presentation-organizer-content"}>{getLanguage(props).presentationOrgCententFour}</p>
                            </div>
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
      
export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
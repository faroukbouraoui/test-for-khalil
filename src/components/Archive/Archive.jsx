import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Row, Col, Button, Card } from 'antd';
import { Link } from 'react-router-dom'
import archiveItem1 from '../../assets/img/archiveArticlePhoto.png'
import archiveItem2 from '../../assets/img/brochureCommuniquerArchive.png'
import archiveItem3 from '../../assets/img/ArchivePhoto.png'
import archiveItem4 from '../../assets/img/archiveVideo.png'
import archiveItem5 from '../../assets/img/archiveRapportPublications.png'
import archiveItem6 from '../../assets/img/archiveAutresResources.png'
import getLanguage from "../utilFunction/language"


const Archive = (props)=>{
    useEffect(() => { 
        window.scrollTo(0, 0)
    }, []);

    const goToArticle =()=>{
        window.location='/archive/article'
    }
    const goToPhoto =()=>{
        window.location='/archive/photo'
    }
    const goToBrochure =()=>{
        window.location='/archive/brochure'
    }
    const goToVideo =()=>{
        window.location="/archive/video"
    }
    const goToRapport =()=>{
        window.location='/archive/rapport'
    }
    const goToAutreRessource =()=>{
        window.location='/archive/autre-ressources'
    }


return(

        <>
            {/* Archive Image-Text */}
            <section className={props.auth.lang+"_slider-archive-section"}>
                <h1 className={props.auth.lang+"_presentation-title"}>{getLanguage(props).ArchiveArchive}</h1>
                <p className={props.auth.lang+"_presentation-description"}>{getLanguage(props).ArchiveTextPresentation}
                </p>
            </section>
            {/* Presentation text */}
            <section className="archive-content-section">
                <Row className="articles-row" justify="center" gutter={[19, 19]}>                
                    <Col xs={24} sm={24} md={8} className="archive-img-container">
                        <Link to="/archive/article">
                            <div class="archive-card-overlay"></div>
                            <img src={archiveItem1} className="archives-img"/>    
                            <h3 className={props.auth.lang+"_archive-title-card"}>{getLanguage(props).Articles}</h3>   
                        </Link>                 
                    </Col>                            
                    <Col xs={24} sm={24} md={8} className="archive-img-container">
                    <Link to="/photos">
                        <div class="archive-card-overlay"></div>
                        <img  src={archiveItem3} className="archives-img"/>    
                        <h3 className={props.auth.lang+"_archive-title-card"}>{getLanguage(props).Photos}</h3>       
                    </Link>             
                    </Col>                                        
                    <Col xs={24} sm={24} md={8} className="archive-img-container">
                    <Link to="/brochures">
                        <div class="archive-card-overlay"></div>
                        <img src={archiveItem2} className="archives-img"/>    
                        <h3 className={props.auth.lang+"_archive-title-card"}>{getLanguage(props).BrochuresCommuniqués}</h3>                    
                    </Link>
                    </Col>                                     
                    <Col xs={24} sm={24} md={8} className="archive-img-container">
                    <Link to="/videos">
                        <div class="archive-card-overlay"></div>
                        <img src={archiveItem4} className="archives-img"/>    
                        <h3 className={props.auth.lang+"_archive-title-card"}>{getLanguage(props).Videos}</h3>  
                    </Link>                  
                    </Col>              
                    <Col xs={24} sm={24} md={8} className="archive-img-container">
                    <Link to="/rapports">
                        <div class="archive-card-overlay"></div>
                        <img src={archiveItem5} className="archives-img"/>    
                        <h3 className={props.auth.lang+"_archive-title-card"}>{getLanguage(props).RapportsPublications}</h3>                    
                    </Link>
                    </Col>                                        
                    <Col xs={24} sm={24} md={8} className="archive-img-container">
                    <Link to="/ressources">
                        <div class="archive-card-overlay"></div>
                        <img src={archiveItem6} className="archives-img"/>    
                        <h3 className={props.auth.lang+"_archive-title-card"}>{getLanguage(props).AutresRessources}</h3>    
                    </Link>               
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
      
export default connect(mapStateToProps, mapDispatchToProps)(Archive);
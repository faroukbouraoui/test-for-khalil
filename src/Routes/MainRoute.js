import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import LandingPage from './../components/LandingPage';
import Presentation from './../components/Presentation';
import Program from './../components/Program';
import Media from './../components/Media';
import Contact from './../components/Contact';
import Testimonial from './../components/Testimonial';
import Projection from './../components/Projection';
import Plaidoyer from './../components/Plaidoyer';
import PrivateRoute from "./PrivateRoute/PrivateRoute"
import Archive from "../components/Archive/Archive";
import Article from "../components/Archive/Article";
import SingleProgram from "../components/SingleProgram";
import Ressources from "../components/Ressources";
import Photos from "../components/Photos";
import Brochures from "../components/Brochures";
import Videos from "../components/Videos";
import Rapports from "../components/Rapports";
import detectBrowserLanguage from 'detect-browser-language'
import { connect } from "react-redux";

const MainRoute = (props) => {
  const [userLanguage, setUserLanguage] = useState(false);
  useEffect(() => { 
    window.scrollTo(0, 0)
    setUserLanguage(detectBrowserLanguage())
    if(detectBrowserLanguage() == 'fr-FR'){
      const action = {type:'SET_CURRENT_USER', lang:'fr', token:null}
      props.dispatch(action);
    }
    if(detectBrowserLanguage() == 'ar-AR'){
      const action = {type:'SET_CURRENT_USER', lang:'ar', token:null}
      props.dispatch(action);
    }
    if(props.auth.lang == 'fr'){
      const action = {type:'SET_CURRENT_USER', lang:'fr', token:null}
      props.dispatch(action);
    }
    if(props.auth.lang == 'ar'){
      const action = {type:'SET_CURRENT_USER', lang:'ar', token:null}
      props.dispatch(action);
    }
    if(!props.auth.lang || props.auth.lang == null){
      const action = {type:'SET_CURRENT_USER', lang:'fr', token:null}
      props.dispatch(action);
    }
    
}, []);

  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/" component={LandingPage} />
        <PrivateRoute exact path="/presentation" component={Presentation} />
        <PrivateRoute exact path="/program" component={Program} />
        <PrivateRoute exact path="/media" component={Media} />
        <PrivateRoute exact path="/contact" component={Contact} />
        <PrivateRoute exact path="/testimonial" component={Testimonial} />
        <PrivateRoute exact path="/projection" component={Projection} />
        <PrivateRoute exact path="/plaidoyer" component={Plaidoyer} />
        <PrivateRoute exact path="/archive" component={Archive} />
        <PrivateRoute exact path="/archive/article" component={Article} />
        <PrivateRoute exact path="/program/single" component={SingleProgram} />
        <PrivateRoute exact path="/ressources" component={Ressources} />
         <PrivateRoute exact path="/photos" component={Photos} />
        <PrivateRoute exact path="/brochures" component={Brochures} />
        <PrivateRoute exact path="/videos" component={Videos} />
        <PrivateRoute exact path="/rapports" component={Rapports} />
      </Switch>
    </Router>
  );
};
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

export default connect(mapStateToProps, mapDispatchToProps) (MainRoute);
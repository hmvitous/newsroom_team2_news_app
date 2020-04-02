import React, { useEffect } from "react";
import { useDispatch, connect, useSelector } from "react-redux";
import ArticleList from "./components/ArticleList";
import { Grommet, Main, Heading, Button } from "grommet";
import { grommet } from "grommet/themes";
import SpecificArticle from "./components/SpecificArticle";
import PaymentForm from "./components/PaymentForm";
import { Elements } from "react-stripe-elements";
import LoginForm from "./components/LoginForm";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import axios from "axios";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./components/LanguageSelector";
import i18n from "./i18n";

const App = props => {
  const { t } = useTranslation();
  const edition = useSelector(state => state.session.edition);
  const dispatch = useDispatch();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async pos => {
      const currentSession = await axios.post(
        "http://localhost:3000/api/sessions",
        {
          location: {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          }
        }
      );
      dispatch({
        type: "SET_CURRENT_SESSION",
        payload: { session: { edition: currentSession.data.session.edition } }
      });
    });
  });
  return (
    <Grommet full theme={grommet}>
      <h1 onClick={() => i18n.changeLanguage("es")} style={{cursor:"pointer"}}>Spanish</h1>
      <Main fill align="center" justify="center"> 
        <Heading>Urban Living <LanguageSelector /> </Heading> {t("tagline")}
        <Heading margin="small" level="4" id="welcome-message">
          {" "}
          {`${edition} Edition`}{" "}
        </Heading>{" "}
        {props.state.showLogoutButton && <LogoutButton />}
        {props.state.showLoginButton && <LoginButton />}
        {props.state.showLoginForm && <LoginForm />}
        {props.state.successMessage && (
          <Heading level="2" id="success-message">
            {props.state.successMessage}
          </Heading>
        )}
        {props.state.successMessage && (
          <Button
            label="To The News!"
            onClick={() =>
              props.dispatch({
                type: "TO_THE_NEWS",
                payload: { successMessage: false }
              })
            }
          />
        )}
        {props.state.showArticleList && <ArticleList />}
        {props.state.readArticle && <SpecificArticle />}
        {props.state.showPaymentForm && (
          <Elements>
            <PaymentForm />
          </Elements>
        )}
      </Main>
    </Grommet>
  );
};

const mapStateToProps = state => {
  return {
    state: state
  };
};
export default connect(mapStateToProps)(App);

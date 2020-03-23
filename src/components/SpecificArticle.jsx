import React, { Component } from "react";
import { connect } from "react-redux";
import { Box, Grommet, Button } from "grommet";
import { grommet } from "grommet/themes";

class SpecificArticle extends Component {
  render() {
    let specArticle;
    if (this.props.readArticle !== undefined) {
      specArticle = this.props.readArticle;
    }
    return (
      <Grommet full theme={grommet}>
        <Box 
        direction="row"
        border={{ color: "brand", size: "small" }}
        pad="medium"
        margin="medium"
        className="article"
        id={specArticle.id}>
          <div>
            <div className="spec-title">
              <h2>{specArticle.title}</h2>
            </div>
            <div className="spec-content">
              <p>{specArticle.content}</p>
            </div>
            <div className="created-date">
              <p>Submitted on {specArticle.created_at}</p>
            </div>
          </div>
        </Box>
        <Box align="center">
          <Button 
            type="submit"
            label="Back"
            onClick={() => this.props.dispatch({type: "HIDE_ARTICLE"})}>
          </Button>
        </Box>
      </Grommet>
    );
  }
}

const mapStateToProps = state => {
  return {
    readArticle: state.readArticle
  };
};

export default connect(mapStateToProps)(SpecificArticle);
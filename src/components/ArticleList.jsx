import React, { Component } from "react";
import { Box, Grommet, Button } from "grommet";
import { grommet } from "grommet/themes";
import axios from "axios";
import { connect } from "react-redux";

class ArticleList extends Component {
  componentDidMount() {
    axios.get("/articles").then(response => {
      this.props.dispatch({
        type: "ARTICLES",
        payload: { articleList: response.data.articles }
      });
    });
  }
  render() {
    let articleDisplay;
    if (this.props.articleList !== []) {
      articleDisplay = this.props.articleList.map(article => {
        return (
          <Box
            direction="row"
            border={{ color: "brand", size: "large" }}
            pad="medium"
            margin="medium"
            className="article"
          >
            <div className="article-box">
              <div className="feature-article">
                <div className="article-headline">
                  <h2>{article.title}</h2>

                  <div className="article-teaser">
                    <p>{article.teaser}</p>
                  </div>
                  <Button type="submit" primary label="Read More"></Button>
                </div>
              </div>
            </div>
          </Box>
          
        );
      });
    }
    return (
    <Grommet full theme={grommet}>
      {articleDisplay}
    </Grommet>
    )
  }
}

const mapStateToProps = state => {
  return {
    articleList: state.articleList
  };
};

export default connect(mapStateToProps)(ArticleList);

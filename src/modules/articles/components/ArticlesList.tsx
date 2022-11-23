import { IArticleShortData } from '../articles-reducer';
import styled from 'styled-components';

import { Link } from 'gatsby';
import React from 'react';

// import '@Components/Pagination.css';

const ArticleListElement = styled.div``;

interface ArticlesListProps {
  articles?: IArticleShortData[];
}

const ArticlesList: React.FC<ArticlesListProps> = ({ articles }) => {
  if (!articles) {
    console.warn('No articles to show');
    return null;
  }

  return (
    <>
      {articles.map((article) => (
        <ArticleListElement>
          <Link to={article.slug}>
            <h2>{article.title}</h2>
          </Link>
          <strong>{article.date}</strong>
          <p>{article.slug}</p>
        </ArticleListElement>
      ))}
    </>
  );
};

export default ArticlesList;

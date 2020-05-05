import React from "react";
import { Helmet } from 'react-helmet';

import content from '../../assets/content';
const { meta: { title, url, twitter, description, image } } = content;

const MetaTags = () => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta
        name="title" content={title}
      />
      <meta
        name="description"
        content={description}
      />
      <meta
        property="og:url"
        content={url}
      />
      <meta 
        property="og:type"
        content="website"
      />
      <meta
        property="og:title"
        content={title}
      />
      <meta
        property="og:description"
        content={description}
      />
      <meta
        property="og:image"
        content={image}
      />
      <meta
        name="twitter:card"
        content="summary"
      />
      <meta
        name="twitter:site"
        content={twitter}
      />
      <meta
        name="twitter:creator"
        content={twitter}
      />
      <meta
        name="twitter:url"
        content={url}
      />
      <meta
        name="twitter:title"
        content={title}
      />
      <meta
        name="twitter:description"
        content={description}
      />
      <meta
        name="twitter:image"
        content={image}
      />
      <meta
        itemprop="name"
        content={title}
      />
      <meta
        itemprop="description"
        content={description}
      />
      <meta
        itemprop="image"
        content={image}
      />
    </Helmet>
  );
}

export default MetaTags;
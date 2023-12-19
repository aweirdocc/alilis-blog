const createOgUrl = (relativePath) => {
  const host = 'https://blog.alilis.space';

  if (relativePath.startsWith('/')) {
    return host + relativePath;
  } else {
    return host + '/' + relativePath;
  }
}

const handleHeadMeta = (context) => {
  const { description, title, relativePath } = context.pageData;

  const ogUrl = ["meta", { property: "og:url", content: createOgUrl(relativePath.slice(0, -3)) + '.html' }];
  const ogTitle = ["meta", { property: "og:title", content: title }];
  const ogDescription = ["meta", { property: "og:description", content: description || context.description }];

  return [
    ogUrl,
    ogTitle,
    ogDescription
  ];
}

export default handleHeadMeta;
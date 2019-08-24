export default function getUrlParams(url) {
  const query = url.split('?')[1];

  if (!query) {
    return {};
  }

  return (/^[?#]/.test(query) ? query.slice(1) : query).split('&').reduce((params, param) => {
    const [key, value] = param.split('=');
    params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : ''; // eslint-disable-line no-param-reassign
    return params;
  }, {});
}

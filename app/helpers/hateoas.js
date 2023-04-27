function getUri(req) {
  return `${req.protocol}://${req.get("host")}/api`;
}

function woodHateoas(req, wood) {
  const id=wood.id;
  return [
    { rel: "self", method: "GET", href: `${getUri(req)}/woods/${id}` },
    { rel: "all", method: "GET", href: `${getUri(req)}/woods` },
    { rel: "sameHardness", method: "GET", href: `${getUri(req)}/woods/${wood.hardness.id}` },
    { rel: "create", method: "POST", href: `${getUri(req)}/woods` },
    { rel: "update", method: "PUT", href: `${getUri(req)}/woods/${id}` },
    { rel: "delete", method: "DELETE", href: `${getUri(req)}/woods/${id}` },
  ];
}

module.exports = {
  woodHateoas,
};

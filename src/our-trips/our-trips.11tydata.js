const trips = require("../_data/trips.json");

module.exports = {
  eleventyComputed: {
    crumbs: (data) => {
      const t = trips.find((x) => x.slug === data.tripSlug);
      return t ? [{ label: "Our Trips", url: "/our-trips" }, { label: t.name }] : data.crumbs;
    },
    faqSchema: (data) => !!data.tripSlug,
    faqs: (data) => data.faqs || (trips.find((x) => x.slug === data.tripSlug) || {}).faqs,
  },
};

const hasDomainRegEx = /\.[\S]{2,}$/;

const hasDomain = value => hasDomainRegEx.test(value);

export { hasDomain };

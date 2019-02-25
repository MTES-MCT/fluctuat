const numberRegEx = /^\d+([.,]\d+)?$/;

const isQuantity = (number) => numberRegEx.test(number);

export { isQuantity }

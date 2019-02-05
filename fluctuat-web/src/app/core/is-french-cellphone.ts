const cellPhoneRegEx = /(?:(?:\+|00)33|0)\s*[6-7](?:[\s.-]*\d{2}){4}/;

const isFrenchCellPhone = (phone) => cellPhoneRegEx.test(phone);

export { isFrenchCellPhone }

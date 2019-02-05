const cellPhoneRegEx = /^[\s]*0[6-7](?:[\s]*\d{2}){4}[\s]*$/;

const isFrenchCellPhone = (phone) => cellPhoneRegEx.test(phone);

export { isFrenchCellPhone }

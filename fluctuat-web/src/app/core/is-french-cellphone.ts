const cellphoneRegEx = /^[\s]*0[6-7](?:[\s]*\d{2}){4}[\s]*$/;

const isFrenchCellphone = (phone) => cellphoneRegEx.test(phone);

export { isFrenchCellphone }

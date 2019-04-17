/**
 * Convert a french phone to international format
 * @param cellphone to be converted
 */
export const convert = (cellphone: string): string =>
  // add french prefix
  '+33'.concat(
    cellphone.replace(/\s/g, '') // remove spaces
      .substring(1)// remove first 0
  );

/** Remove empty emails and transform emails to mailjet model */
export const getValidReceivers = (emails) =>
  // filter empty emails
  emails
    .filter(item => !!item.email)
    // map to mailjet model
    .map(item => ({ Email: item.email, Name: item.name || '' }));

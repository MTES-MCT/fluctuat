export interface EmailData {
  to: {
    email: string,
    name: string
  },
  subject: string,
  body: {
    text: string,
    html: string
  }
}

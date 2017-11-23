const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default emails => {
  const invalidEmails = emails
    .split(',')
    .map(email => email.trim())
    .filter(email => email.length && re.test(email) === false); //valid true - invalid false. we want to capture the emails that are invalid ( we check length to ensure the error does not pop when there is no email after a comma )

  if (invalidEmails.length) {
    return `These emails are invalid: ${invalidEmails}`;
  }
};

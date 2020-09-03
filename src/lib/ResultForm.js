class ResultForm {
  constructor(message, isError) {
    this.message = message;
    this.isError = isError;
  }

  getMessage = () => {
    return this.message;
  }

  getIsError = () => {
    return this.isError;
  }
}

export default ResultForm;

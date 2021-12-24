

function formatResult(data, errorMesg) {
  if (errorMesg instanceof Error) {
    return {
      successful: false,
      errorMesg: errorMesg.name + ': ' + errorMesg.message + ': ' + errorMesg.stack,
      data: null
    }
  } else if (typeof errorMesg === 'string') {
    return {
      successful: false,
      errorMesg: errorMesg,
      data: null
    }
  }
  return {
    successful: true,
    data: data
  }
}

export default formatResult;
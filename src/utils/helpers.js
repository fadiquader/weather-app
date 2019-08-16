export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        // `lat=${coords.latitude}&lon=${coords.longitude}`
        resolve({
          lat: coords.latitude,
          lon: coords.longitude
        });
      }, ({ code, message }) => {
        reject({
          code,
          message
        })
      })
    } else {
      reject({
        code: 2,
        message: 'Geolocation is not supported in your browser. '
      })
    }

  })
}

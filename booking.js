const { bookingData } = require("./data/bookingData");

const checkAvailability = (roomId, startTime, endTime) => {
   const result = bookingData
      .filter(room => room.roomId === roomId)
      .map(booking => {
         if (startTime < booking.startTime && endTime <= booking.startTime) {
            return true;
         } else if (startTime >= booking.endTime) {
            return true;
         } else {
            return false;
         };
      });

   for (const res of result) {
      if (res === false) {
         return false
      }
   };
   return true;
};
console.log(checkAvailability("A102", "2019-09-30 13:00:00", "2019-09-30 16:00:00"));


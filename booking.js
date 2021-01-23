const { bookingData } = require("./data/bookingData");
const dayjs = require("dayjs");
const weekOfYear = require('dayjs/plugin/weekOfYear')
dayjs.extend(weekOfYear);

//2a.
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
//console.log(checkAvailability("A102", "2019-09-30 13:00:00", "2019-09-30 16:00:00"));


//2b.
const getBookingsForWeek = (roomId, weekNo) => {
  
   const targetRoom =  bookingData.filter(room => room.roomId === roomId);
   const allDay = targetRoom
   .filter(roomList => dayjs(roomList.startTime).format("YYYY-MM-DD") === weekNo);

   const thisWeek = targetRoom
   .filter(roomList => dayjs(roomList.startTime).week() === dayjs(weekNo).week());

   const nextWeek = targetRoom
   .filter(roomList => dayjs(roomList.startTime).week() === dayjs(weekNo).week() + 1);
   
   const wholeMonth = targetRoom
   .filter(roomList => dayjs(roomList.startTime).month() === dayjs(weekNo).month());
   
   return { allDay, thisWeek, nextWeek, wholeMonth }
};

const result = getBookingsForWeek("A101", "2019-09-28");
console.log(result);


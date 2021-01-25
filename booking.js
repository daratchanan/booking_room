const { bookingData } = require("./data/bookingData");
const dayjs = require("dayjs")
const weekOfYear = require('dayjs/plugin/weekOfYear');
dayjs.extend(weekOfYear);

//2a.
const checkAvailability = (roomId, startTime, endTime) => {
   const targetRoom = bookingData.filter(room => room.roomId === roomId);
   console.log(targetRoom);

   const result = targetRoom.map(booking => {
      if (startTime < booking.startTime && endTime <= booking.startTime) {
         return true;
      } else if (startTime >= booking.endTime) {
         return true;
      } else {
         return false;
      }
   });

   for (const res of result) {
      if (res === false) {
         return false;
      }
   };
   return true;
   //console.log(result);
};
//checkAvailability("A101", "2019-09-28 13:00:00", "2019-09-28 14:00:00")
//console.log(checkAvailability("A101", "2019-09-28 18:00:00", "2019-09-29 13:00:00"));

//2b.
const getBookingForWeek = (roomId, weekNo) => {
   const targetRoom = bookingData.filter(room => room.roomId === roomId);
   const allDay = targetRoom
   .filter(day => dayjs(day.startTime).format("YYYY-MM-DD") === dayjs(weekNo).format("YYYY-MM-DD"));
   const thisWeek = targetRoom
   .filter(day => dayjs(day.startTime).week() === dayjs(weekNo).week());
   const nextWeek = targetRoom
   .filter(day => dayjs(day.startTime).week() === dayjs(weekNo).week() +1);
   const wholeMonth = targetRoom
   .filter(day => dayjs(day.startTime).month() === dayjs(weekNo).month());

   return { allDay, thisWeek, nextWeek, wholeMonth }
}

const {allDay, thisWeek} = getBookingForWeek("A101", "2019-09-28");
console.log(allDay);
console.log(thisWeek);


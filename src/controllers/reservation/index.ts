import createReservationController from "./createReservation";
import getReservationsController from "./getReservations";
import getReservationController from "./getReservation";
import cancelReservationController from "./cancelReservation";
function isStatusValid(status: string) {
  return ["active", "cancelled", "all", "completed"].includes(status);
}
export {
  createReservationController,
  getReservationsController,
  getReservationController,
  cancelReservationController,
  isStatusValid,
};

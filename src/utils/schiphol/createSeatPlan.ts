interface Seat {
  seatNumber: string;
  class: "Business" | "Economy";
  isOccupied: boolean;
}

type Row = Seat[];

function createSeatPlan(
  totalRows: number = 30,
  businessClassRows: number = 5
): Row[] {
  const rows: Row[] = [];

  for (let i = 1; i <= totalRows; i++) {
    const row: Row = [];
    const seatClass = i <= businessClassRows ? "Business" : "Economy";

    // Assuming A-F seats for Economy and D-E for Business
    const seats =
      seatClass === "Economy" ? ["A", "B", "C", "D", "E", "F"] : ["D", "E"];

    seats.forEach((seat) => {
      row.push({ seatNumber: seat + i, class: seatClass, isOccupied: false });
    });

    rows.push(row);
  }

  return rows;
}

function occupyPercentageOfSeats(seatPlan: Row[], percentage: number): Row[] {
  const totalSeats = seatPlan.length * seatPlan[0].length;
  const numberOfSeatsToOccupy = Math.floor((percentage * totalSeats) / 100);

  for (let i = 0; i < numberOfSeatsToOccupy; i++) {
    const randomRow = Math.floor(Math.random() * seatPlan.length);
    const randomSeat = Math.floor(Math.random() * seatPlan[0].length);

    seatPlan[randomRow][randomSeat].isOccupied = true;
  }

  return seatPlan;
}

function getSeatPlan(): Row[] {
  const seatPlan = createSeatPlan(30, 5);
  occupyPercentageOfSeats(seatPlan, 50);

  console.log(seatPlan);
  return seatPlan;
}
function getEmptySeatPlan(): Row[] {
  const seatPlan = createSeatPlan(30, 5);
  return seatPlan;
}
export {
  createSeatPlan,
  occupyPercentageOfSeats,
  getSeatPlan,
  getEmptySeatPlan,
};

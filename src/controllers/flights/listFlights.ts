import { RequestWithUser, ParsedLinks } from "../../types";
import database from "../../utils/database";
import sendResponse from "../../utils/sendResponse";
import { Response } from "express";
import API from "../../utils/schiphol/api";
function validateDate(date: string) {
  //yyyy-mm-dd
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(date);
}
function validateDirection(direction: string) {
  return direction === "A" || direction === "D";
}
export default async (req: RequestWithUser, res: Response) => {
  let { date, direction, page, fromDate, toDate } = req.query;
  if (date && !validateDate(`${date}`)) {
    return sendResponse(req, res, 400, {
      message: "error",
      error: "invalid_date",
    });
  }
  if ((date && fromDate) || (date && toDate) || (date && fromDate && toDate)) {
    return sendResponse(req, res, 400, {
      message: "error",
      error: "date_and_from_to_date_cannot_be_used_together",
    });
  }
  if (fromDate && toDate) {
    if (!validateDate(`${fromDate}`) || !validateDate(`${toDate}`)) {
      return sendResponse(req, res, 400, {
        message: "error",
        error: "invalid_date",
      });
    }
    let daysBetween =
      Math.floor(
        (Date.parse(`${toDate}`) - Date.parse(`${fromDate}`)) / 86400000
      ) + 1; // if daysBetween is bigger than 3, schiphol api returns 400

    if (daysBetween > 3) {
      return sendResponse(req, res, 400, {
        message: "error",
        error: "from_to_date_cannot_be_more_than_3_days",
      });
    }
  }

  if (direction && !validateDirection(`${direction}`)) {
    return sendResponse(req, res, 400, {
      message: "error",
      error: "invalid_direction",
    });
  }

  function getQueryString() {
    let queryString = "?";
    if (date && validateDate(`${date}`)) {
      queryString += `scheduleDate=${date}&`;
    }
    if (fromDate) {
      queryString += `fromScheduleDate=${fromDate}&`;
    }
    if (toDate) {
      queryString += `toScheduleDate=${toDate}&`;
    }
    if (direction && validateDirection(`${direction}`)) {
      queryString += `flightDirection=${direction}&`;
    }
    if (page && parseInt(`${page}`) > 0) {
      queryString += `page=${page}&`;
    }
    console.log(queryString);

    return queryString;
  }
  function parseLinkHeader(header: string): ParsedLinks {
    const links: ParsedLinks = {};
    const parts = header.split(", ");
    parts.forEach((p) => {
      const section = p.split("; ");
      const urlPart = section[0].match(/page=(\d+)/); // Extracting page number
      if (!urlPart) return;

      const pageNumber = urlPart[1]; // Get the page number
      const name = section[1].replace(/rel="(.*)"/, "$1").trim();
      links[name as keyof ParsedLinks] = parseInt(pageNumber);
    });
    return links;
  }

  const {
    data: { flights },
    status,
    headers,
  } = await API.get("/flights" + getQueryString());
  if (status !== 200) {
    return sendResponse(req, res, 500, {
      message: "error",
      error: "schiphol_api_error",
    });
  }
  let pagination = parseLinkHeader(headers.link);
  if (
    pagination.last &&
    parseInt(`${page}`) > 0 &&
    pagination.last < parseInt(`${page}`)
  ) {
    return sendResponse(req, res, 400, {
      message: "error",
      error: "page_not_found",
    });
  }
  return sendResponse(req, res, 200, {
    message: "success",
    flights,
    pagination: parseLinkHeader(headers.link),
  });
};

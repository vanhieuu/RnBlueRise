import axios from "axios";
import moment from "moment";
import { AppModule } from "@common";
import { CalendarHolidayResponse, ItemCalendar } from "@config/type";

const API_KEY = "AIzaSyATNruHcfizP3O2gomECf-hx7HH5CMIOj0";
const CALENDAR_ID = "vi.vietnamese#holiday@group.v.calendar.google.com";

// Function to dynamically get time range for the current year
const getTimeRange = () => {
  const currentYear = moment().year();
  return {
    timeMin: `${currentYear}-01-01T00:00:00Z`,
    timeMax: `${currentYear}-12-31T23:59:59Z`,
  };
};

export const fetchVietnameseHolidays = async (): Promise<Record<string, any>> => {
  try {
    const { timeMin, timeMax } = getTimeRange();
    const cacheKey = `holidays_${moment().year()}`;

    // Check if holidays are already cached
    const cachedHolidays = await AppModule.MMKVStorage.getString(cacheKey);
    if (cachedHolidays) {
      return JSON.parse(cachedHolidays); // Return cached data if exists
    }

    // Fetch holidays from API
    const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events?key=${API_KEY}&timeMin=${timeMin}&timeMax=${timeMax}`;
    const response = await axios.get<CalendarHolidayResponse>(url);
    
    // Format data for markedDates
    const formattedHolidays: Record<string, any> = {};
    response.data?.items?.forEach((event: ItemCalendar) => {
      if (event.start.date) {
        formattedHolidays[event.start.date] = {
          marked: true,
          dotColor: "red",
          customStyles: {
            container: { backgroundColor: "#ffcccc" },
            text: { color: "red", fontWeight: "bold" },
          },
          holidayName: event.summary,
        };
      }
    });

    // Save to MMKV cache
    await AppModule.MMKVStorage.setString(cacheKey, JSON.stringify(formattedHolidays));

    return formattedHolidays;
  } catch (error) {
    console.error("Error fetching holidays:", error);
    return {};
  }
};

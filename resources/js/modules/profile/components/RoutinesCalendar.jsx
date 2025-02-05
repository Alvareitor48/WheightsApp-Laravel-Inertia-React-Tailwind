import Calendar from "react-calendar";
import { useDashboard } from "../contexts/dashboardContext";

const RoutinesCalendar = () => {
    const { sessions, setCalendarDay } = useDashboard();
    const today = new Date();
    const lastMonth = new Date(
        today.getFullYear(),
        today.getMonth() - 1,
        today.getDate()
    );
    const handleClickDay = (value) => {
        const clickedDate = value.toLocaleDateString("fr-CA");
        const matchingSession = sessions.find(
            (session) => session.date === clickedDate
        );
        if (matchingSession) {
            setCalendarDay(clickedDate);
        } else {
            setCalendarDay("");
        }
    };
    return (
        <>
            <h2 className="text-responsive-h4 mb-4">Calendario</h2>
            <div className="rounded-lg overflow-hidden relative">
                <Calendar
                    className="!bg-transparent !text-white !border-none !rounded-lg p-2 w-full h-full !text-responsive-select"
                    onClickDay={handleClickDay}
                    minDate={lastMonth}
                    maxDate={today}
                    tileClassName={({ date }) => {
                        const dateString = date.toLocaleDateString("fr-CA");

                        const todayString = new Date().toLocaleDateString(
                            "fr-CA"
                        );

                        const isWorkoutDay = sessions.some(
                            (session) => session.date === dateString
                        );

                        if (dateString === todayString) return "today";
                        if (isWorkoutDay) return "workout-day";
                        return "normal-day";
                    }}
                />
            </div>
        </>
    );
};

export default RoutinesCalendar;

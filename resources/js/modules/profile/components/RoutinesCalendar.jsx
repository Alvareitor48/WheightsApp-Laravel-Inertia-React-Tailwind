import Calendar from "react-calendar";
import { useDashboard } from "../contexts/dashboardContext";
import { SubscriptionPopUp } from "./SubscriptionPopUp";
import { usePremiumOrAdminCheck } from "@/shared/hooks/usePremiumOrAdminCheck";

const RoutinesCalendar = () => {
    const { sessions, setCalendarDay } = useDashboard();
    const today = new Date();
    const lastMonth = new Date(
        today.getFullYear(),
        today.getMonth() - 1,
        today.getDate()
    );
    const { isPopUpOpen, setIsPopUpOpen, isPremium } = usePremiumOrAdminCheck();
    const handleClickDay = (value) => {
        const clickedDate = new Date(value);
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        const matchingSession = sessions.find(
            (session) => session.date === value.toLocaleDateString("fr-CA")
        );
        if (clickedDate <= oneMonthAgo) {
            if (!isPremium) {
                setCalendarDay(null);
                setIsPopUpOpen(true);
            } else {
                if (matchingSession) {
                    setCalendarDay(value.toLocaleDateString("fr-CA"));
                } else {
                    setCalendarDay("");
                }
            }
        } else {
            if (matchingSession) {
                setCalendarDay(value.toLocaleDateString("fr-CA"));
            } else {
                setCalendarDay("");
            }
        }
    };

    return (
        <>
            <h2 className="text-responsive-h4 mb-4">Calendario</h2>
            <div className="rounded-lg overflow-hidden relative">
                <Calendar
                    className="!bg-transparent !text-white !border-none !rounded-lg p-2 w-full h-full !text-responsive-select"
                    onClickDay={handleClickDay}
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
            <SubscriptionPopUp
                isOpen={isPopUpOpen}
                onClose={() => setIsPopUpOpen(false)}
            />
        </>
    );
};

export default RoutinesCalendar;

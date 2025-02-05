import { useState } from "react";
import { m } from "motion/react";
import SimpleLayout from "@/shared/layouts/SimpleLayout";
import BodyHighlight from "../components/BodyHighlight";
import RoutinesCalendar from "../components/RoutinesCalendar";
import MaxWeights from "../components/MaxWeights";
import ExercisesForMuscle from "../components/ExercisesForMuscle";
import { DashboardProvider } from "../contexts/dashboardContext";
import { DashboardMain } from "../components/DashboardMain";
export default function Dashboard({ sessions }) {
    return (
        <SimpleLayout>
            <DashboardProvider sessions={sessions}>
                <DashboardMain></DashboardMain>
            </DashboardProvider>
        </SimpleLayout>
    );
}

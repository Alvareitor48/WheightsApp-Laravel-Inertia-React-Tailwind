import SimpleLayout from "@/shared/layouts/SimpleLayout";
import { DashboardProvider } from "../contexts/dashboardContext";
import { DashboardMain } from "../components/DashboardMain";
import {Head} from "@inertiajs/react";
export default function Dashboard({ sessions, bodyHighLightData }) {
    return (
        <SimpleLayout>
            <Head title="Dashboard" />
            <DashboardProvider
                sessions={sessions}
                bodyHighLightData={bodyHighLightData}
            >
                <DashboardMain></DashboardMain>
            </DashboardProvider>
        </SimpleLayout>
    );
}

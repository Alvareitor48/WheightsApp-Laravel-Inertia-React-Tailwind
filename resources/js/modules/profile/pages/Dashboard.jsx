import SimpleLayout from "@/shared/layouts/SimpleLayout";
import { DashboardProvider } from "../contexts/dashboardContext";
import { DashboardMain } from "../components/DashboardMain";
export default function Dashboard({ sessions, bodyHighLightData }) {
    return (
        <SimpleLayout>
            <DashboardProvider
                sessions={sessions}
                bodyHighLightData={bodyHighLightData}
            >
                <DashboardMain></DashboardMain>
            </DashboardProvider>
        </SimpleLayout>
    );
}

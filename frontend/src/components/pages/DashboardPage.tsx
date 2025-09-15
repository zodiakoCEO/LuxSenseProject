import React from "react";
import DefaultLayout from "../templates/DefaultLayout";
import MetricsDashboard from "../organism/MetricsDashboard";

const DashboardPage: React.FC = () => {
    return (
        <DefaultLayout>
            <MetricsDashboard/>
        </DefaultLayout>
    )
}

export default DashboardPage;

//verificar conexion con el dispositivo antes de renderisar 
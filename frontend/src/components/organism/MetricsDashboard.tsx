import React from "react";
import styled from "styled-components";
import Title from "../atoms/Title";
import MetricCard from "../molecules/MetricCard";
import CarrouselCard from "../molecules/CarrouselCard";

const DashboardContainer = styled.div`
    flex:1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    background-color: #ffffff;
    `;

const CardContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    `;

    const MetricsDashboard: React.FC = () => {
        return (
            <DashboardContainer>
                <Title>Dashboard</Title>
                <CardContainer>
                    <MetricCard title="New Costumers" value="81%" subtitle="Month to date (162)" chartColor="#10b981"/>
                    <MetricCard title="New Costumers" value="81%" subtitle="Month to date (162)" chartColor="#10b981"/>
                    <MetricCard title="New Costumers" value="81%" subtitle="Month to date (162)" chartColor="#10b981"/>
                    <MetricCard title="New Costumers" value="81%" subtitle="Month to date (162)" chartColor="#10b981"/>
                    <MetricCard title="New Costumers" value="81%" subtitle="Month to date (162)" chartColor="#10b981"/>
                    <MetricCard title="New Costumers" value="81%" subtitle="Month to date (162)" chartColor="#10b981"/>
                    <CarrouselCard
                        value="940$"
                        items={[
                            { label: "TV", amount: "1,227" },
                            { label: "Fairs", amount: "1,069" },
                            { label: "Display", amount: "975" },
                            { label: "Search", amount: "819" },
                            { label: "Social", amount: "776" },
                        ]}
                    />
                </CardContainer>
            </DashboardContainer>
        )
    }

    export default MetricsDashboard
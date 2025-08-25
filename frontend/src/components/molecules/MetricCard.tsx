import React from "react";
import styled from "styled-components";
import CardTitle from "../atoms/CardTitle";
import CardValue from "../atoms/CardValue";
import CardSubtitle from "../atoms/CardSubtitle";
import ChartPlaceholder from "../atoms/ChartPlaceHolder";

const CardContainer = styled.div`
    background-color: #ffffff;
    padding: 1rem;
    border-radius: 0.75rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    width: 15rem;
    text-align: center;
    margin: 1rem;
    `;

interface MetricCardProps {
    title: string;
    value: string | number;
    subtitle: string;
    chartColor?: string;
}

const MetricCard: React.FC<MetricCardProps> =({ title, value, subtitle, chartColor = '#e5e7eb' }) => {
    return (
        <CardContainer>
            <CardTitle>{title}</CardTitle>
            <CardValue>{value}</CardValue>
            <CardSubtitle>{subtitle}</CardSubtitle>
            <ChartPlaceholder color={chartColor}/>
        </CardContainer>
    )
}

export default MetricCard
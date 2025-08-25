import React from "react";
import styled from "styled-components";

const StyledChartPlaceHolder = styled.div`
    height: 4rem;
    background-color: gray;
    border-radius: 0.5rem;
    `;

interface ChartPlaceholderProps {
    color?: string;
}

const ChartPlaceholder: React.FC<ChartPlaceholderProps> = ({ color = 'e5e7eb' }) => {
    return (
        <StyledChartPlaceHolder style={{background: color}}/>
    )
}

export default ChartPlaceholder;
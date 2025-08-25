import React from "react";
import styled from "styled-components";
import CardValue from "../atoms/CardValue";
import BigIcon from "../atoms/BigIcon";

const CarrouselCardContainer = styled.div`
    background-color: #bfdbfe;
    padding: 1.5rem;
    border-radius: 0.75rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    width: 20rem;
    text-align: center;
    margin: 1rem;
    `
const CorrouselItems = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
    `;

const CarrouselItem = styled.div`
    color: #1e40af;
    font-size: 0.875rem;
    `;

interface CarrouselCardProps {
    value: string | number;
    items: {label: string; amount: string | number}[];
}

const CarrouselCard: React.FC<CarrouselCardProps> = ({ value, items }) => {
    return (
        <CarrouselCardContainer>
            <CardValue>{value}</CardValue>
            <BigIcon ariaLabel="lighthub">💡</BigIcon>
            <div>LuxSense</div>
            <CorrouselItems>
                {items.map((item, index)=> (
                    <CarrouselItem key={index}>
                        {item.label}: ${item.amount}
                    </CarrouselItem>
                ))}
            </CorrouselItems>
        </CarrouselCardContainer>
    )
}

export default CarrouselCard
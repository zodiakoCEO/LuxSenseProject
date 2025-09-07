import React from "react";
import styled from "styled-components";

const StyledImage = styled.img`
    max-width: 100%;
    `;

interface ImageProps {
    src: string;
    alt: string;
    width?: string;
    height?: string;
}

const Image: React.FC<ImageProps> = ({ src, alt, width, height }) => {
    return (
        <StyledImage src={src} alt={alt} width={width} height={height} />
    )
}

export default Image
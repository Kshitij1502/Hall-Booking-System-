import styled from 'styled-components';

export const HallCard = styled.div`
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin-bottom: 20px;
`;

export const HallImage = styled.img`
    width: 100%;
    max-height: 200px;
    object-fit: cover;
    border-radius: 8px;
`;

export const HallTitle = styled.h3`
    font-size: 18px;
    margin: 10px 0;
`;

export const HallDetails = styled.p`
    font-size: 14px;
    color: #555;
`;

export const HallButton = styled.button`
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #0056b3;
    }
`;

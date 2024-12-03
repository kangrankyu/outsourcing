import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

export const InputStyle = styled.input`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    transition: border-color 0.3s;

    &:focus {
        border-color: #007bff;
        outline: none;
    }
`;

export const SearchButton = styled.button`
    margin: 10px;
    padding: 8px 10px;
    font-size: 16px;
    color: white;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }
`;

export const PlaceList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 20px 0;
    width: 100%;
`;

export const PlaceItem = styled.li`
    background-color: white;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    padding: 5px;
    margin-bottom: 5px;
    transition: box-shadow 0.3s;
    cursor: pointer;

    &:hover {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    h3 {
        margin: 0;
        font-size: 16px;
        color: #333;
    }

    p {
        margin: 5px 0 0;
        color: #666;
    }
`;

export const Pagination = styled.div`
    display: flex;
    justify-content: center;
    margin-top: -10px;

    button {
        margin: 0 5px;
        padding: 5px 10px;
        border: none;
        border-radius: 4px;
        background-color: #007bff;
        color: white;
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover {
            background-color: #0056b3;
        }

        // 비활성화 시
        &:disabled {
            background-color: #ccc;
            cursor: not-allowed;
        }
    }
`;

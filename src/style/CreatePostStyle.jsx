import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 1300px;
    max-height: 100vh;
    padding: 20px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`

export const FormWrapper = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 20px;
`

export const ImgInputStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
`

export const BoxInputStyle = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 50px;
`

export const InputGroup = styled.div`
    margin-bottom: 15px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 20px;

    label {
        margin-bottom: 5px;
        font-weight: bold;
    }

    input, select {
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    width: 400px;
    height: 50px;
    box-sizing: border-box;
}

    input:hover {
    background-color: #f0f0f0;
    border-color: #999;
}
`;

export const ReasonInputGroup = styled.div`
    margin-bottom: 15px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 20px;

    label {
    margin-bottom: 5px;
    font-weight: bold;
    }

    input {
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    width: 400px;
    height: 100px;
    box-sizing: border-box;
}

    input:hover {
    background-color: #f0f0f0;
    border-color: #999;
}
`;

export const Button = styled.button`
    padding: 10px;
    background-color: #3949AB;
    color: white;
    border: none;
    border-radius: 15px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }
`;

export const FileUploadLabel = styled.label`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #c3c3c3;
    padding: 10px;
    width: 400px;
    height: 300px;
    border-radius: 10px;
    margin-bottom: 5px;
    cursor: pointer;
    position: relative;
    // 자식요소 넘칠 경우 잘리도록 설정하는 것
    overflow: hidden;

    .remove-button {
        position: absolute;
        top: 10px;
        right: 10px;
        background: none;
        border: 3px dotted #dc3545;
        border-radius: 50px;
        color: #dc3545;
        cursor: pointer;
        font-weight: bold;
    }
    img {
        width: 100%;
        height: 100%;
        // 이미지 비율을 유지하면서 상위 요소에 맞게 잘림
        object-fit: cover; 
    }
    p {
        font-size: 50px;
        color: white;
    }
    input {
        display: none;
    }
`;

export const FileUploadContent = styled.p`
    text-align: center;
`

export const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    margin-top: -40px;
`
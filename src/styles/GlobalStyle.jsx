import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

*, *::before, *::after {
    box-sizing: border-box;
}

/* body 스타일 */
body {
    margin: 0;
    padding: 0;
    background-color: #F3F3F3; // 배경색 이걸로 합시다 어차피 거의 안보이겠지만!
    font-family: 'Pretendard', sans-serif; // 프리텐다드 쓸까요??
    color: #333; // 블랙 말고 이정도 괜찮은가요??
    line-height: 1.5;
}

/* 버튼 기본 스타일 */
button {
    background-color: #3949ab;
    color: #FFFFFF;
    font-family: 'Pretendard', sans-serif;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem; // rem 단위 익숙하지 않아서 잘모르겠음..
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease; // 지피티가 이거넣으래
    
    &:hover {
        background-color: #616fcc;
    }
}

`;

export default GlobalStyle;

// 질문1) box-sizingL border-box에서 *::before, *::after는 왜 쓰는 건지?

import React, { useEffect } from 'react';
import { useState } from 'react';
import { Wrapper, InputGroup, Button, FileUploadLabel, InputWrapper, BoxInputStyle, FileUploadContent, FormWrapper, ImgInputStyle, ReasonInputGroup } from '../styles/CreatePostStyle';
import supabase from '../utils/supabaseClient';
import { v4 as uuid } from 'uuid';


const CreatePost = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [rating, setRating] = useState('');
    const [content, setContent] = useState('');
    const [imgFile, setImgFile] = useState(null);
    const [imgUrl, setImgUrl] = useState(null);
    // const [latitude, setLatitude] = useState('');
    // const [longitude, setLongitude] = useState('');
    const [userId, setUserId] = useState('');
    const [review, setReview] = useState([]);

    // 로그인한 사람 데이터 찾기
    useEffect(() => {
        const fetchData = async () => {
            const { data: userData, error: userError } = await supabase.auth.getUser();
            console.log({ userData });
            if (userError) {
                console.error("Error:", userError);
                return;
            }
            if (userData.user) {
                setUserId(userData.user.id);
            }
        };
        fetchData();
    }, []);

    // 이미지파일 업로드 시 임시 url
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                // 이미지 미리보기 URL설정
                setImgUrl(e.target.result);
            };
            reader.readAsDataURL(selectedFile);
            setImgFile(selectedFile);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newFileName = uuid();

        // supabase storage에 이미지 url 추가
        const { data: reviewImgData, error: reviewImgError } = await supabase.storage.from("reviewImg").upload(`reviewImg/${newFileName}`, imgFile);
        if (reviewImgError) {
            console.error("Error:", reviewImgError);
            return;
        }

        // 이미지 url 가져오기
        const { data: urlData } = supabase.storage.from("reviewImg").getPublicUrl(reviewImgData.path);

        // supabase에 추가
        const { data: postData, error: postError } = await supabase.from("reviews").insert({
            name: name,
            address: address,
            rating: parseInt(rating),
            content: content,
            user_id: userId,
            img_url: urlData.publicUrl,
            // latitude: latitude,
            // longitude: longitude,
        }).select();
        if (postError) {
            console.error("Error", postError);
        }
        setReview([...review, postData]);
        setName('');
        setAddress('');
        setRating('');
        setContent('');
        setImgFile(null);
    }

    const removeBtn = () => {
        setImgUrl(null);
        setImgFile(null);
    }

    return (
        <Wrapper>
            <h1>나만의 맛집 소개</h1>
            <FormWrapper onSubmit={handleSubmit}>
                <BoxInputStyle>
                    <ImgInputStyle>
                        <FileUploadLabel htmlFor="fileInput">
                            {imgFile ? (<img src={imgUrl} />) : (<p>+</p>)}
                            <input
                                type="file"
                                id="fileInput"
                                onChange={handleFileChange}
                            />
                            {imgFile && (
                                <button type='button' onClick={removeBtn} className="remove-button">X</button>
                            )}
                        </FileUploadLabel>
                        {!imgFile ? (<FileUploadContent>가게 사진 or 음식 사진을 올려주세요!</FileUploadContent>) : ("")}
                    </ImgInputStyle>
                    <InputWrapper>
                        <InputGroup>
                            <label>상호명</label>
                            <input type='text' value={name} placeholder='상호명을 입력해주세요' onChange={(e) => setName(e.target.value)} required />
                        </InputGroup>
                        <InputGroup>
                            <label>주소</label>
                            <input type='text' value={address} placeholder='주소를 입력해주세요' onChange={(e) => setAddress(e.target.value)} required />
                        </InputGroup>
                        <InputGroup>
                            <label>평점</label>
                            <select value={rating} onChange={(e) => setRating(e.target.value)} required>
                                <option value="">평점을 선택해주세요</option>
                                {[1, 2, 3, 4, 5].map((star, index) => (
                                    <option key={index} value={index + 1}>
                                        {star}
                                    </option>
                                ))}
                            </select>
                        </InputGroup>
                        <ReasonInputGroup>
                            <label>추천 이유</label>
                            <input
                                type="text"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder='음식, 직원태도, 위생상태, 주차 등 어떤 점이 좋았나요?'
                                required
                            />
                        </ReasonInputGroup>
                    </InputWrapper>
                </BoxInputStyle>
                <Button type='submit'>게시글 작성하기</Button>
            </FormWrapper>
        </Wrapper>
    );
}

export default CreatePost;

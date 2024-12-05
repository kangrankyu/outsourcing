import { useEffect } from 'react';
import { useState } from 'react';
import { Wrapper, InputGroup, Button, FileUploadLabel, InputWrapper, BoxInputStyle, FileUploadContent, FormWrapper, ImgInputStyle, ReasonInputGroup, CenterWrapper } from '../styles/CreatePostStyle';
import supabase from '../utils/supabaseClient';
import { v4 as uuid } from 'uuid';
import PlaceSearch from '../components/PlaceSearch';
import Modal from '../components/SearchModal';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [rating, setRating] = useState('');
    const [content, setContent] = useState('');
    const [imgFile, setImgFile] = useState(null);
    const [imgUrl, setImgUrl] = useState(null);
    const [userId, setUserId] = useState('');
    const [review, setReview] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    // restaurants 에 들어갈 데이터 상태관리
    const [restaurantName, setRestaurantName] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [restaurantAddress, setRestaurantAddress] = useState('');
    const [phone, setPhone] = useState('');

    const navigate = useNavigate();

    // 로그인한 사람 데이터 찾기
    useEffect(() => {
        const fetchData = async () => {
            const { data: userData, error: userError } = await supabase.auth.getUser();
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

        // 입력값이 빈 경우 alert을 띄우고 함수 종료
        if (!name || !address || !rating || !content) {
            alert("모든 필드를 채워주세요!");
            return;
        }

        // 파일이 없을 경우 alert를 띄우고 함수 종료
        if (!imgFile) {
            alert("사진을 업로드해주세요!");
            return;
        }

        // supabase storage에 이미지 url 추가
        const { data: reviewImgData, error: reviewImgError } = await supabase.storage.from("reviewImg").upload(`reviewImg/${newFileName}`, imgFile);
        if (reviewImgError) {
            console.error("Error:", reviewImgError);
            return;
        }

        // 이미지 url 가져오기
        const { data: urlData } = supabase.storage.from("reviewImg").getPublicUrl(reviewImgData.path);

        // restaurants 에 데이터 넣기
        const { data: restaurantData, error: restaurantError } = await supabase.from("restaurants").insert({
            name: restaurantName,
            latitude: latitude, // 위도
            longitude: longitude, // 경도
            address: restaurantAddress,
            tel: phone,
        }).select();
        if (restaurantError) {
            console.error("Error:", restaurantError);
        } else {
            console.log("Success:", restaurantData);
        }

        // 추가한 restaurants의 id 값 가지고오기
        const restaurantId = restaurantData[0].id;

        // supabase에 추가
        const { data: postData, error: postError } = await supabase.from("reviews").insert({
            name,
            address: restaurantAddress,
            rating: parseInt(rating),
            content,
            user_id: userId,
            img_url: urlData.publicUrl,
            // 가게의 ID 리뷰에 연결
            restaurantsid: restaurantId,
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

        alert('게시글 작성이 완료되었습니다!')
        navigate('/mypage');
    }

    const removeBtn = (e) => {
        e.preventDefault();
        setImgUrl(null);
        setImgFile(null);
    }

    // 모달에서 선택된 장소의 주소를 설정하는 함수
    const handleAddressSelect = (selectedAddress) => {
        setAddress(selectedAddress);
        setIsModalOpen(false);
    };

    return (
        <CenterWrapper>
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
                                    <button type="button" onClick={removeBtn} className="remove-button">X</button>
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
                                <input type='text'
                                    value={address}
                                    placeholder='주소를 검색해주세요'
                                    readOnly
                                    onClick={() => setIsModalOpen(true)}
                                    required />
                                {isModalOpen && (
                                    <Modal onClose={() => setIsModalOpen(false)}>
                                        <PlaceSearch
                                            setRestaurantName={setRestaurantName}
                                            setLatitude={setLatitude}
                                            setLongitude={setLongitude}
                                            setRestaurantAddress={setRestaurantAddress}
                                            setPhone={setPhone}
                                            onSelectAddress={handleAddressSelect} />
                                    </Modal>
                                )}
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
        </CenterWrapper>
    );
}

export default CreatePost;

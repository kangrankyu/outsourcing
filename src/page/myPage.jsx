import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';
import supabase from '../utils/supabaseClient';

// Styled Components
const PageContainer = styled.div`
  background-color: #f3f3f3;
  padding: 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px;
`;

const NicknameWrapper = styled.div`
  margin-bottom: 20px;
  text-align: center;

  h2 {
    font-size: 24px;
    font-weight: bold;
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: start;
  width: 100%;
  max-width: 1200px;
`;

const Card = styled.div`
  border: 1px solid #ccc;
  padding: 16px;
  width: calc(25% - 30px);
  height: 400px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 4px;
    margin-bottom: 12px;
  }

  .placeholder {
    width: 100%;
    height: 180px;
    background-color: #ddd;
    border-radius: 4px;
    margin-bottom: 12px;
  }

  h3 {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 8px;
  }

  p {
    margin: 4px 0;
    font-size: 12px;
    color: #555;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 40%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: 4px;
    margin-bottom: 20px;
  }

  .placeholder {
    width: 100%;
    height: 300px;
    background-color: #ddd;
    border-radius: 4px;
    margin-bottom: 20px;
  }

  h3 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 12px;
  }

  p {
    margin: 8px 0;
    font-size: 14px;
    color: #555;
  }

  button {
    margin-top: 20px;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
  }

  .button-group {
    display: flex;
    justify-content: space-between;
  }
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 16px;

  span {
    width: 100px;
    font-weight: bold;
    margin-right: 16px;
  }
`;

const StyledInput = styled.input`
  flex: 1;
  border: none;
  border-bottom: 1px solid #ccc;
  font-size: 16px;
  padding: 4px 0;
  outline: none;

  &:focus {
    border-bottom: 2px solid #3949ab;
  }
`;

const StyledTextarea = styled.textarea`
  flex: 1;
  height: 100px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  padding: 8px;
  outline: none;

  &:focus {
    border: 1px solid #3949ab;
  }
`;

const SelectInput = styled.select`
  flex: 1;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;

  &:focus {
    border: 1px solid #3949ab;
  }
`;

const MyPage = () => {
  const [selectedReview, setSelectedReview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedReview, setEditedReview] = useState(null);

  const queryClient = useQueryClient();

  const { data: nickname, isLoading: isNicknameLoading } = useQuery({
    queryKey: ['nickname'],
    queryFn: async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser();
      const { data } = await supabase.from('users').select('nickname').eq('id', user.id).single();
      console.log({ data });
      return data.nickname;
    }
  });

  const { data: reviews, isLoading: isReviewsLoading } = useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser();
      const { data } = await supabase
        .from('reviews')
        .select('id, content, rating, name, address, img_url')
        .eq('user_id', user.id);
      return data || [];
    }
  });

  const updateMutation = useMutation({
    mutationFn: async (updatedReview) => {
      const { error } = await supabase
        .from('reviews')
        .update({
          content: updatedReview.content,
          rating: updatedReview.rating,
          name: updatedReview.name,
          address: updatedReview.address
        })
        .eq('id', updatedReview.id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['reviews']);
      alert('리뷰가 수정되었습니다.');
      closeModal();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (reviewId) => {
      const { error } = await supabase.from('reviews').delete().eq('id', reviewId);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['reviews']);
      alert('리뷰가 삭제되었습니다.');
      closeModal();
    }
  });

  const openModal = (review) => {
    setSelectedReview(review);
    setEditedReview({ ...review });
    setIsModalOpen(true);
    setIsEditing(false);
  };

  const closeModal = () => {
    setSelectedReview(null);
    setEditedReview(null);
    setIsModalOpen(false);
    setIsEditing(false);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    if (editedReview) {
      updateMutation.mutate(editedReview);
    }
  };

  if (isNicknameLoading || isReviewsLoading) {
    return <PageContainer>Loading...</PageContainer>;
  }

  return (
    <PageContainer>
      <NicknameWrapper>
        <h2>{nickname}님</h2>
      </NicknameWrapper>

      <CardContainer>
        {reviews.map((review) => (
          <Card key={review.id} onClick={() => openModal(review)}>
            {review.img_url ? (
              <img src={review.img_url} alt={`${review.name} 이미지`} />
            ) : (
              <div className="placeholder" />
            )}
            <h3>상호명 : {review.name}</h3>
            <p>주소 : {review.address}</p>
            <p>평점: {review.rating}</p>
            <p>리뷰: {review.content.length > 30 ? `${review.content.substring(0, 30)}...` : review.content}</p>
          </Card>
        ))}
      </CardContainer>

      {isModalOpen && selectedReview && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            {selectedReview.img_url ? (
              <img src={selectedReview.img_url} alt={`${selectedReview.name} 이미지`} />
            ) : (
              <div className="placeholder" />
            )}
            {isEditing ? (
              <>
                <Label>
                  <span>상호명:</span>
                  <StyledInput
                    value={editedReview.name}
                    onChange={(e) => setEditedReview({ ...editedReview, name: e.target.value })}
                  />
                </Label>
                <Label>
                  <span>주소:</span>
                  <StyledInput
                    value={editedReview.address}
                    onChange={(e) => setEditedReview({ ...editedReview, address: e.target.value })}
                  />
                </Label>
                <Label>
                  <span>평점:</span>
                  <SelectInput
                    value={editedReview.rating}
                    onChange={(e) => setEditedReview({ ...editedReview, rating: e.target.value })}
                  >
                    <option value="" disabled>
                      평점 선택
                    </option>
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <option key={rating} value={rating}>
                        {rating}
                      </option>
                    ))}
                  </SelectInput>
                </Label>
                <Label>
                  <span>리뷰:</span>
                  <StyledTextarea
                    value={editedReview.content}
                    onChange={(e) => setEditedReview({ ...editedReview, content: e.target.value })}
                  />
                </Label>
              </>
            ) : (
              <>
                <h3>상호명 : {selectedReview.name}</h3>
                <p>주소 : {selectedReview.address}</p>
                <p>평점: {selectedReview.rating}</p>
                <p>리뷰: {selectedReview.content}</p>
              </>
            )}
            <div className="button-group">
              <button style={{ backgroundColor: '#f3f3f3', color: 'black' }} onClick={handleEditToggle}>
                {isEditing ? '취소' : '수정'}
              </button>
              {isEditing ? (
                <button style={{ backgroundColor: '#3949ab', color: 'white' }} onClick={handleSave}>
                  저장
                </button>
              ) : (
                <button
                  style={{ backgroundColor: '#3949ab', color: 'white' }}
                  onClick={() => deleteMutation.mutate(selectedReview.id)}
                >
                  삭제
                </button>
              )}
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
    </PageContainer>
  );
};

export default MyPage;

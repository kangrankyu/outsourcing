# 목차
1. [프로젝트 소개](#프로젝트-소개)
2. [팀원 역할 소개](#팀원-역할-소개)
3. [프로젝트 목표](#프로젝트-목표)
4. [기능구현](#기능-구현)
5. [개발기간](#개발기간)
6. [와이어프레임](#와이어프레임)
7. [supabase 구조](#supabase-구조)
8. [트러블 슈팅](#트러블-슈팅)

# 프로젝트 소개 : 서식여지도 

서울을 방문하는 사람들에게 한국관광공사가 지정한 신뢰할 수 있는 맛집 정보를 제공합니다. 지도에서 맛집 정보를 제공받고 이미 방문했던 사람들의 리뷰를 확인하며 서울의 다양한 맛집을 탐방할 수 있습니다. 


# 팀원 역할 소개
| 강란규 | 최혜진 | 조동희 | 엄정은 | 김민정 | 신상용 |
| --- | --- | --- | --- | --- | --- |
| 팀장 | 팀원 | 팀원 | 팀원 | 팀원 | 팀원 |
| signup | create post | login | home | mypage | community |


# 프로젝트 목표
- 지도 서비스를 지원하는 웹사이트를 만들기
- 전역 상태 관리 라이브러리
-  Supabase를 활용한 CRUD
-  react-router-dom을 활용한 라우팅 처리

# 기능구현
## Login page
로그인 페이지는 사용자가 로그인할 수 있도록 제공되는 화면입니다. 이메일과 비밀번호를 입력하면 서버와 통신하여 사용자의 인증 상태를 확인하고 확인이 완료되면 홈 화면으로 이동하게 됩니다.

 - 사용자가 입력한 이메일과 비밀번호를 이용해 서버로 로그인 요청을 보냅니다.
로그인 성공 시 사용자 데이터를 저장하고 홈 화면으로 이동합니다.

 - 계정이 있다면 로그인 성공 후 useNavigate를 사용하여 홈페이지로 이동시키고 계정이 없다면 회원가입 페이지로 이동합니다.
전역 상태 관리:

 - 로그인 성공 시 UserContext를 통해 사용자 정보를 전역적으로 저장하여 다른 컴포넌트에서 접근할 수 있도록 합니다.


## Signup page
회원가입 페이지는 사용자가 애플리케이션에 계정을 등록할 수 있도록 하는 기능을 제공합니다. 사용자는 이메일, 비밀번호 등 필수 정보를 입력하면, 회원가입이 완료된 후 로그인 페이지로 이동하게 됩니다.

 - 사용자는 이메일, 비밀번호 등 필요한 정보를 입력하여 계정을 생성할 수 있습니다.
회원가입 완료 시 완료 메시지가 알림으로 표시됩니다.

 - signUpNewUser API를 통해 회원가입 요청을 처리하고 tablenickname 함수를 통해 사용자 고유 정보를 데이터베이스에 저장합니다.

 - react-router-dom의 useNavigate를 사용하여 회원가입 완료 후 로그인 페이지로 자동 이동합니다.


## Create post
Create post페이지는 사용자가 자신이 방문한 맛집을 소개하는 게시글을 작성할 수 있도록 하는 화면입니다. 사용자는 가게 이름, 주소, 사진, 평점, 추천 이유 등을 입력하여 게시글을 등록할 수 있습니다. 입력된 데이터는 Supabase 데이터베이스에 저장됩니다.

 - useEffect를 사용하여 Supabase에 저장되어 있는 사용자 ID를 가져와 해당 사용자가 가게 정보 (상호명, 주소, 평점, 추천 이유)를 입력하고 가게 사진 또는 음식 사진을 업로드할 수 있습니다. 입력된 데이터를 Supabase의 restaurants 및 reviews 테이블에 저장합니다.

 - PlaceSearch 컴포넌트를 통해 주소를 검색하고 선택할 수 있습니다. 선택된 주소와 함께 위도, 경도, 전화번호 등 세부 정보가 Supabase의 reviews 및 restaurants 테이블에 저장됩니다.

 - 필수 입력 값이 비어있거나 이미지 업로드가 되지 않을 경우 사용자에게 알림을 제공하며 데이터베이스 또는 파일 업로드 중 오류 발생 시, 콘솔에 에러를 출력하고 사용자에게 알립니다.



## Mypage
마이페이지는 사용자가 자신이 등록한 리뷰를 확인하고, 수정하거나 삭제할 수 있는 기능을 제공합니다. 등록된 리뷰를 카드 형식으로 표시하며, 리뷰를 클릭하면 상세 정보를 볼 수 있는 모달이 열립니다.

 - 로그인된 사용자의 닉네임을 상단에 표시합니다.

 -  useQuery로 사용자가 등록한 데이터를 가져와 카드 형태로 확인할 수 있으며 리뷰 카드를 클릭하면 모달이 열리며, 리뷰의 상세 내용을 확인할 수 있습니다.
리뷰 수정:

 - 모달에서 수정 버튼을 클릭하면, 리뷰의 내용(상호명, 주소, 평점, 리뷰)을 수정할 수 있는 입력 필드가 활성화됩니다. 또한 모달에서 삭제 버튼을 클릭하면 해당 리뷰가 삭제됩니다.


## Community page
게시판 페이지는 사용자가 등록된 레스토랑 리스트를 확인하고, 각 레스토랑에 대해 리뷰를 작성하거나 수정할 수 있도록 제공하는 화면입니다. 레스토랑 정보를 카드 형태로 표시하며, 무한 스크롤과 리뷰 편집 기능을 포함합니다.

 - Supabase API를 호출하여 restaurants 테이블에서 데이터를 가져와 레스토랑 리스트를 표시합니다. 각 레스토랑 카드는 이름, 주소, 평점, 이미지 등 정보를 포함합니다.

 - 각 레스토랑에 대해 이미 작성된 리뷰를 수정할 수 있습니다.
사용자는 평점과 리뷰 내용을 입력하거나 수정하여 데이터를 업데이트할 수 있습니다. 리뷰 작성 또는 수정 시 StarRating 컴포넌트를 통해 별점을 선택할 수 있습니다.

 - 초기에는 최대 20개의 레스토랑을 불러오며, 스크롤 시 더 많은 데이터를 로드할 수 있습니다.


## Home  page
 홈페이지는 사용자가 지도에서 레스토랑 위치를 확인하고, 레스토랑 리스트를 함께 볼 수 있도록 구현한 메인 홈페이지입니다. 사용자는 레스토랑 리스트를 스크롤하면서 클릭하거나, 지도에서 레스토랑 마커를 선택하여 레스토랑 정보를 탐색할 수 있습니다.

 - Kakao 지도 SDK를 사용하여 레스토랑의 위치를 마커로 표시합니다. 선택된 레스토랑을 기준으로 지도의 중심 위치가 변경되는데 선택된 레스토랑이 있는 경우 해당 레스토랑의 위도, 경도를 지도의 중심으로 설정합니다. 선택된 레스토랑이 없을 경우 기본 위치는 서울(37.5665, 126.978)로 설정됩니다.

 - 왼쪽 패널에서 레스토랑 리스트를 확인할 수 있습니다. 리스트에서 레스토랑을 클릭하면 지도의 중심이 해당 레스토랑으로 이동합니다.

 - useRestaurantsData 커스텀 훅을 사용하여 Supabase 데이터베이스에서 레스토랑 데이터를 가져옵니다. 데이터에는 레스토랑 이름, 주소, 위도, 경도 등의 정보가 포함됩니다.


# 개발기간
   
      2024.11.29(금)~2024.12.05(목)

# 와이어프레임
![프로젝트 소개 이미지](https://private-user-images.githubusercontent.com/183442766/392346718-5f43e57e-43b1-4352-a84f-d3c47304d415.PNG?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzMzMTA0NTIsIm5iZiI6MTczMzMxMDE1MiwicGF0aCI6Ii8xODM0NDI3NjYvMzkyMzQ2NzE4LTVmNDNlNTdlLTQzYjEtNDM1Mi1hODRmLWQzYzQ3MzA0ZDQxNS5QTkc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQxMjA0JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MTIwNFQxMTAyMzJaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1lMDk3YjIxMmI1MjY2MWQzNTAxYWMwOWI1NTI3YWE5ZGQ0ZGU1MDYzYTY4YTlhNWQ4YzNjMjU1N2Q2MTczNjk1JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.9dOcK0cCqEjhavbzefVhkKJ5RnUN9VWcpyg_8razSZI)

# supabase 구조
![프로젝트 소개 이미지](https://private-user-images.githubusercontent.com/183442766/392346788-7b03cb60-45bc-4b59-9c86-d45aabef9da7.PNG?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzMzMTA0NTIsIm5iZiI6MTczMzMxMDE1MiwicGF0aCI6Ii8xODM0NDI3NjYvMzkyMzQ2Nzg4LTdiMDNjYjYwLTQ1YmMtNGI1OS05Yzg2LWQ0NWFhYmVmOWRhNy5QTkc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQxMjA0JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MTIwNFQxMTAyMzJaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0wNDIyOGE0OTEzNWRlMWVhZjAzYWVlODBkMWNhMDg5NTVjNzRkOWYxY2RmZTRkZTQzZmE5ZjMyODkyNTM4MmJhJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.p6AafveomC1G_mnZq3Ce6IcJgZm4V1ZsXeYv6kKHIfc)

# 트러블 슈팅
 - 주제선정
<br>
 프로젝트 초기 단계에서 주제를 선정하는 데 시간이 걸렸습니다. 처음에 선정한 주제는 많은 사람들이 실질적으로 사용할만한 주제가 아닌듯하여 여러 아이디어를 검토해서 최종적으로 서울시 맛집 지도 서비스라는 주제를 선택하였습니다.

 - Supabase 데이터베이스 관리
<br>
데이터 설계 후 프로젝트를 진행하는 과정에서 칼럼 이름을 변경하면서 소통의 문제로 기존 쿼리가 작동하지 않는 문제 발생하였고 문제 해결을 위해 칼럼명을 변경할 때 팀원들과 공유하여 관련 코드 모두 업데이트했습니다.

- Props Drilling
<br>
여러 컴포넌트 간 데이터를 전달하기 위해 Props를 사용했으나 전달하는 과정이 복잡해졌습니다. 이를 해결하기 위해  최상단 컴포넌트에서 상태 관리로 문제를 해결하였습니다.
   

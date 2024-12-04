import React, { createContext, useState } from 'react';

// UserContext 생성
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // 로그인된 사용자 상태를 관리
  const [user, setUser] = useState(() => {
    // 로컬 스토리지에 사용자 정보가 있으면 해당 값으로 초기화
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null; // 없으면 null
  });

  return (
    // UserContext.Provider로 user와 setUser를 제공
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

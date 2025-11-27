import styled from "styled-components";

export const CategoryContainer = styled.div`
  background: #FAFAFA;
  border-radius: 24px;
  padding: 32px 0;
  margin: 24px 0 40px 0;
  box-shadow: 0px 0px 19.4px 0px #E7E7E8;
  gap: 24px;
`;


export const CategorySection = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0 21px;
  gap: 24px;
`;

export const CategoryTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: #352F36;
`;

export const CategoryItems = styled.ul`
  padding: 0 22px;
  display: flex;
  flex-wrap: wrap;
  gap: 52px;
`;

export const CategoryItem = styled.li`
  list-style: none;
  flex: 1 1 33%;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 48px;
  cursor: pointer;
`;

export const ImagePlaceholder = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #e9e9e9ff;
  margin-bottom: 16px;
`;

export const CategoryLabel = styled.div`
  font-weight: 500;
  font-size: 12px;
  color: #49444A;
  text-align: center;
  width: 120px;
  position: relative;  
`;

export const Divider = styled.div`
  width: 90%;
  height: 1px;
  background: #F0EFF1;
  margin: 20px 0 20px 20px
`;

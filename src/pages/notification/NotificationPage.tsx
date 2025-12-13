// src/pages/home/category/NotificationPage.tsx
import { useState, useEffect } from "react";
import SimpleHeader from "@components/shared/SimpleHeader";
import NotificationProposalItem from "@components/notification/NotificationProposalItem";
import styled from "styled-components";
import { getNotifications } from "@api/notification";
import type { notification } from "@types";

const List = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 8px 0 8px 0;
  background: var(--GrayScale-WT, #fafafa);
  border-radius: 20px;
  outline: 1.5px solid var(--GrayScale-GR10, #f0eff1);
  outline-offset: -1px;
  width: 100%;
`;

const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  color: #666;
  font-size: 14px;
`;

const ErrorMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  color: #dc3545;
  font-size: 14px;
`;

const EmptyContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  gap: 10px;
`;

const EmptyTitle = styled.div`
  color: black;
  font-size: 16px;
  font-family: Pretendard;
  font-weight: 500;
  line-height: 24px;
  word-wrap: break-word;
`;

const EmptyDescription = styled.div`
  color: rgba(0, 0, 0, 0.5);
  font-size: 12px;
  font-family: Pretendard;
  font-weight: 400;
  line-height: 18px;
  word-wrap: break-word;
`;

export function NotificationPage() {
  const [notifications, setNotifications] = useState<notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getNotifications();
        console.log("알림 목록:", data);
        setNotifications(data);
      } catch (e) {
        console.error("알림 조회 실패:", e);
        setError("알림을 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) {
    return (
      <>
        <SimpleHeader title={"알림"} />
        <LoadingMessage>알림을 불러오는 중입니다...</LoadingMessage>
      </>
    );
  }

  if (error) {
    return (
      <>
        <SimpleHeader title={"알림"} />
        <ErrorMessage>{error}</ErrorMessage>
      </>
    );
  }

  if (notifications.length === 0) {
    return (
      <>
        <SimpleHeader title={"알림"} />
        <EmptyContainer>
          <EmptyTitle>받은 제안이 없어요.</EmptyTitle>
          <EmptyDescription>
            내 블록을 보고 제안을 보내면 여기에 표시돼요.
          </EmptyDescription>
        </EmptyContainer>
      </>
    );
  }

  return (
    <>
      <SimpleHeader title={"알림"} />
      <List>
        {notifications.map((item, index) => (
          <NotificationProposalItem
            key={`${item.proposalId}-${index}`}
            senderName={item.senderName}
            senderProfileType={item.senderProfileType}
            proposalId={item.proposalId}
            // content={item.content}
          />
        ))}
      </List>
    </>
  );
}

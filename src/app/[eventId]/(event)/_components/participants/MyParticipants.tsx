import ParticipantCard from '@/components/ParticipantCard/ParticipantCard';
import { getParticipantsUserInfo } from '@/lib/apis/server/userApi';

interface MyParticipantsProps {
  eventId: string;
  accessToken: string;
  userId: number;
}

async function MyParticipants({
  accessToken,
  eventId,
  userId,
}: MyParticipantsProps) {
  const userInfo = await getParticipantsUserInfo(accessToken, eventId);

  return (
    <ParticipantCard
      eventId={eventId}
      info={{ ...userInfo }}
      participantRole={userInfo.role}
      userId={userId}
    />
  );
}

export default MyParticipants;

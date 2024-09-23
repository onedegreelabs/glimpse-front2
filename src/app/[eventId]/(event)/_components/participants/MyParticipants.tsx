import ParticipantCard from '@/components/ParticipantCard/ParticipantCard';
import { getParticipantsUserInfo } from '@/lib/apis/server/userApi';

interface MyParticipantsProps {
  eventId: string;
  accessToken: string;
}

async function MyParticipants({ accessToken, eventId }: MyParticipantsProps) {
  const userInfo = await getParticipantsUserInfo(accessToken, eventId);

  return (
    <ParticipantCard
      eventId={eventId}
      info={{ ...userInfo }}
      participantRole={userInfo.role}
      isUserCard
    />
  );
}

export default MyParticipants;

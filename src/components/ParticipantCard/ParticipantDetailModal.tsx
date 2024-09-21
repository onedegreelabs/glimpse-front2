import Modal from '../Modal';

interface ParticipantDetailModalProps {
  closeDetailView: () => void;
}

function ParticipantDetailModal({
  closeDetailView,
}: ParticipantDetailModalProps) {
  return <Modal closeHandler={closeDetailView}>dasdasdasd</Modal>;
}

export default ParticipantDetailModal;

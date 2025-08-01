export type ModalRef = {
  openModal: () => void;
  closeModal: () => void;
};

export interface ModalProps {
  onPress?: () => void;
  // title: string;
  // img: string;
  // url:string
}

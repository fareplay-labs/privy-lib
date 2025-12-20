export interface ModalCardProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  submit?: React.ReactNode;
  isVisible?: boolean;
  setIsVisible?: (isVisible: boolean) => void;
  className?: string;
  stepIdx?: number;
  onClose?: () => void;
  setStepIdx?: (idx: number) => void;
  maxHeight?: string;
  style?: React.CSSProperties;
  closeIcon?: any;
  caretLeftIcon?: any; 
  isMobileScreen?: any;
}

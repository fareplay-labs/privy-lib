import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button, ButtonEnum } from "../../components/shared/Button";
import {
  AccordionContainer,
  AccordionContent,
  AccordionDescription,
  AccordionHeader,
  AccordionTitle,
  ReadMoreButton,
} from "../styles";

interface FundsAccordionProps {
  title?: string;
  description?: React.ReactNode;
  fullContent?: React.ReactNode;
  children?: React.ReactNode;
  next: () => void;
  isOpen: boolean;
  id: string;
  onToggle: (id: string) => void;
  renderButton?: (
    props: React.ButtonHTMLAttributes<HTMLButtonElement>
  ) => React.ReactNode; // Optional custom button
  style?: React.CSSProperties;
  className?: string;
}

export const FundsAccordion: React.FC<FundsAccordionProps> = ({
  title,
  description,
  fullContent,
  children,
  next,
  isOpen,
  id,
  onToggle,
}) => {
  return (
    <AccordionContainer
      layout
      transition={{
        layout: { duration: 0.4, type: "spring" },
      }}
      onClick={next}
    >
      <AccordionHeader>
        <AccordionTitle>
          <h1>{title}</h1>
        </AccordionTitle>
        <AccordionDescription>
          {isOpen
            ? fullContent
            : `${(description ?? "").toString().substring(0, 50)}...`}
          <Button
            style={{
              border: "none",
              backgroundColor: "transparent",
              fontSize: 16,
            }}
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            buttonType={ButtonEnum.BASE}
            disabled={false}
          >
            &gt;
          </Button>
        </AccordionDescription>
      </AccordionHeader>
      {title !== "Buy Fare Chips" && (
        <motion.div style={{ display: "inline-flex" }}>
          <ReadMoreButton
            onClick={(e) => {
              e.stopPropagation();
              onToggle(id);
            }}
            buttonType={ButtonEnum.BASE}
            disabled={false}
          >
            {isOpen ? "Read less" : "Read more"}
          </ReadMoreButton>
        </motion.div>
      )}
      <AnimatePresence initial={false}>
        {isOpen && (
          <AccordionContent
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </AccordionContent>
        )}
      </AnimatePresence>
    </AccordionContainer>
  );
};

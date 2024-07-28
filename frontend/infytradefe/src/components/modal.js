import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

const ModalComponent = ({ title, children, buttons, isOpen, setIsOpen }) => {
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={setIsOpen} size={"2xl"}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>{children}</ModalBody>
              <ModalFooter>
                {buttons.map((btn, index) => (
                  <Button
                    key={index}
                    color={btn.color}
                    variant={btn.variant}
                    onPress={btn.onPress || onClose}
                  >
                    {btn.label}
                  </Button>
                ))}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalComponent;

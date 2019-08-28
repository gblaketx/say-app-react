import * as React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';

interface PasswordConfirmModalProps {
  isOpen: boolean;
  title: string;
  text: string;
  toggle: () => void;
  onConfirm: (event: React.FormEvent) => void;
}

const PasswordConfirmModal: React.FC<PasswordConfirmModalProps> = (
  { title, text, isOpen, onConfirm, toggle },
) => (
  <Modal isOpen={isOpen}>
    <Form onSubmit={onConfirm}>
      <ModalHeader toggle={toggle}>
        {title}
      </ModalHeader>
      <ModalBody>
        <div>
          {text}
        </div>
        <Input type="password" placeholder="password" name="passwordConfirm" />
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          type="submit"
        >
          Confirm
        </Button>
      </ModalFooter>
    </Form>
  </Modal>
);

// TODO: onconfirm

PasswordConfirmModal.propTypes = {
  /** The title of the modal. */
  title: PropTypes.string.isRequired,

  /** The text of the modal. */
  text: PropTypes.string.isRequired,

  /** Whether or not the modal is visible. */
  isOpen: PropTypes.bool.isRequired,

  /** Function that toggles the visibility of the modal. */
  toggle: PropTypes.func.isRequired,

  /** Fires on event confirmation. */
  onConfirm: PropTypes.func.isRequired,
};

export default React.memo(PasswordConfirmModal);

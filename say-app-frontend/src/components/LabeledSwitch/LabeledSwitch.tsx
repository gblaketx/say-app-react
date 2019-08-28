import * as React from 'react';
import PropTypes from 'prop-types';
import Switch from 'react-switch';
import styles from './LabeledSwitch.module.css';

interface LabeledSwitchProps {
  label: string;
  isChecked: boolean;
  onChange: (checked: boolean) => void;
}

/**
 * Displays a large toggle switch with an adjacent label.
 */
const LabeledSwitch: React.FC<LabeledSwitchProps> = (
  { isChecked, label, onChange },
) => (
  <div className={styles.centeredSwitch}>
    <span className={styles.switchLabel}>
      {label}
    </span>
    <Switch
      height={50}
      width={100}
      onColor="#428BCA"
      checked={isChecked}
      onChange={onChange}
    />
  </div>
);

LabeledSwitch.propTypes = {
  /** Whether or not the switch is checked. */
  isChecked: PropTypes.bool.isRequired,

  /** Label text that appears beside the switch. */
  label: PropTypes.string.isRequired,

  /**
   * Callback that fires when the switch state changes.
   * It is passed whether or not the switch will be checked.
   */
  onChange: PropTypes.func.isRequired,
};

export default LabeledSwitch;

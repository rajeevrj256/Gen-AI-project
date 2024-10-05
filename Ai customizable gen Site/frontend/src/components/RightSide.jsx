import React, { useContext } from 'react';
import styles from './RightSide.module.css';
import { UserInput } from '../store/Input_data';
import LoadingSpinner from './LoadingSpinner';

const RightSide = () => {
  const { fetchdata, fetching } = useContext(UserInput);

  return (
    <div className={styles.RightSide}>
      <div className={styles.textAreaWrapper}>
        {fetching && (
          <div className={styles.spinnerOverlay}>
            <LoadingSpinner />
          </div>
        )}
        <textarea
          className={styles.TextArea}
          value={fetchdata}
          readOnly
        />
      </div>
    </div>
  );
};

export default RightSide;
